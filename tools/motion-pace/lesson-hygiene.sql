-- lesson-hygiene.sql — make learned_lessons a controller instead of a landfill.
--
-- REVIEW BEFORE RUNNING. This edits production data in the Sweat Portal project
-- (learned_lessons). Steps 0–2 are read-only audits; run those first and read
-- the counts. Steps 3–6 mutate. Nothing here deletes a row — lessons are
-- retired by status, so every change is reversible with an UPDATE.
--
-- Context (measured 2026-07-28 on 388 active lessons / 1,924 generations):
--   * 191 global + 193 account lessons, all status='active', all distinct text.
--     ~100k characters of free prose concatenated into every prompt build.
--   * 42 lessons say "be faster" in 42 different ways. None supersede each
--     other, so the instruction is diluted, not reinforced.
--   * 68 active lessons contain slow vocabulary in their own remedy text
--     ("always include a slow deliberate camera move", "creeping dolly",
--     "gentle crane rise"). Those tokens land in the prompt and the video model
--     reads them literally.
--   * After the 140-lesson batch written on 2026-07-27 — mostly "too slow
--     paced" and "boring" feedback — slow-worded camera clauses went from
--     13.9% to 48.6% of prompts. The loop was running with the wrong sign.

-- ---------------------------------------------------------------------------
-- 0. Audit: how much prose is being injected per prompt build
-- ---------------------------------------------------------------------------
SELECT scope,
       count(*)                         AS lessons,
       sum(length(lesson))              AS total_chars,
       round(sum(length(lesson)) / 4.0) AS approx_tokens
FROM learned_lessons
WHERE status = 'active' AND target = 'visuals'
GROUP BY scope;

-- ---------------------------------------------------------------------------
-- 1. Audit: lessons whose own remedy text carries slow vocabulary.
--    These are the self-poisoning ones — written to fix slowness, phrased in a
--    way that causes it.
-- ---------------------------------------------------------------------------
SELECT id, scope, left(feedback, 60) AS from_feedback, lesson
FROM learned_lessons
WHERE status = 'active'
  AND lesson ~* '\y(slow|slowly|gentle|gently|subtle|subtly|drift|drifting|creep|creeping|gradual|gradually|languid|leisurely|unhurried|imperceptible)\y'
ORDER BY created_at DESC;

-- ---------------------------------------------------------------------------
-- 2. Audit: near-duplicate pace lessons competing with each other
-- ---------------------------------------------------------------------------
SELECT scope, count(*) AS pace_lessons
FROM learned_lessons
WHERE status = 'active'
  AND (feedback ~* '\y(slow|pace|paced|boring)\y' OR lesson ~* '\y(pace|paced|tempo|front-load|compress)\y')
GROUP BY scope;

-- ---------------------------------------------------------------------------
-- 3. Schema: give lessons the fields needed to reinforce, decay and be scored.
--    Without these, every repeat of the same feedback creates a new row and the
--    signal gets weaker each time instead of stronger.
-- ---------------------------------------------------------------------------
ALTER TABLE learned_lessons
  ADD COLUMN IF NOT EXISTS hits            integer     NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS controls        jsonb,      -- typed levers, see step 5
  ADD COLUMN IF NOT EXISTS retired_at      timestamptz,
  ADD COLUMN IF NOT EXISTS retired_reason  text,
  ADD COLUMN IF NOT EXISTS last_applied_at timestamptz,
  ADD COLUMN IF NOT EXISTS effect_score    numeric;    -- set by the pace metric, see README step 5

CREATE INDEX IF NOT EXISTS learned_lessons_active_idx
  ON learned_lessons (target, scope, account_id)
  WHERE status = 'active';

-- ---------------------------------------------------------------------------
-- 4. Retire the self-poisoning lessons.
--    Their intent (add camera movement, add energy) is preserved by the typed
--    controls in step 5 and by pace-lint at emit time. Reversible: set
--    status='active', retired_at=NULL to restore.
-- ---------------------------------------------------------------------------
UPDATE learned_lessons
SET status         = 'retired',
    retired_at     = now(),
    retired_reason = 'slow vocabulary in remedy text reached the video model verbatim'
WHERE status = 'active'
  AND lesson ~* '\y(slow|slowly|gentle|gently|subtle|subtly|drift|drifting|creep|creeping|gradual|gradually|languid|leisurely|unhurried|imperceptible)\y';

-- ---------------------------------------------------------------------------
-- 5. Replace 42 prose variations of "be faster" with two typed controls.
--    Typed controls are enforceable by code and cannot leak vocabulary into the
--    prompt. The prompt writer reads `controls`; the prose `lesson` is only for
--    humans reading the table.
-- ---------------------------------------------------------------------------
UPDATE learned_lessons
SET status         = 'retired',
    retired_at     = now(),
    retired_reason = 'superseded by typed pace controls'
WHERE status = 'active'
  AND target = 'visuals'
  AND (feedback ~* '\y(slow|slower|pace|paced|boring)\y' OR lesson ~* '\y(pace|paced|tempo|front-load|front load|compress)\y');

INSERT INTO learned_lessons (scope, target, lesson, feedback, status, controls)
VALUES
  ('global', 'visuals',
   'Pace floor: the first visible action starts within 0.5s, at most two overlapping beats, camera move is decisive and completes early. Never state the clip duration in the prompt.',
   'consolidated from 42 "too slow paced" / "boring" reports',
   'active',
   jsonb_build_object(
     'pace_target',        'fast',
     'max_beats',          2,
     'first_action_by_s',  0.5,
     'camera_energy',      'decisive',
     'state_duration',     false,
     'forbid_tokens',      jsonb_build_array('slow','slowly','gently','gentle','subtle','subtly',
                                             'imperceptible','barely','creep','creeping','drift',
                                             'drifting','gradual','gradually','settling','lingering'),
     'enforced_by',        'tools/motion-pace/pace-lint.mjs'
   )),
  ('global', 'visuals',
   'Camera moves must be short and decisive: a whip, snap or hard push that lands inside the first second and then holds. A camera move described as continuous across the clip reads as slow motion regardless of what the subject does.',
   'consolidated from camera-movement feedback ("boring", "camera needs to move")',
   'active',
   jsonb_build_object(
     'camera_energy',   'decisive',
     'camera_completes_by_s', 1.0,
     'forbid_tokens',   jsonb_build_array('slow','creeping','drifting','gentle','imperceptible'),
     'enforced_by',     'tools/motion-pace/pace-lint.mjs'
   ));

-- ---------------------------------------------------------------------------
-- 6. Cap what gets injected. Unbounded concatenation is why any single lesson
--    stopped mattering. Rank by reinforcement and recency; the prompt builder
--    should read from this view and take the top N (start at 12 global +
--    8 account) rather than SELECT *.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW active_lessons_ranked AS
SELECT id, scope, target, account_id, lesson, controls, hits, effect_score, created_at,
       row_number() OVER (
         PARTITION BY target, scope, account_id
         ORDER BY (controls IS NOT NULL) DESC,   -- typed controls first
                  hits DESC,
                  coalesce(effect_score, 0) DESC,
                  created_at DESC
       ) AS rank
FROM learned_lessons
WHERE status = 'active';

-- Verify what step 4–6 left behind:
--   SELECT status, count(*) FROM learned_lessons GROUP BY status;
--   SELECT count(*) FROM active_lessons_ranked WHERE rank <= 12 AND scope = 'global';
