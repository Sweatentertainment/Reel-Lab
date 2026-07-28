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
--   * ~40 lessons say "be faster" in ~40 different ways. None supersede each
--     other, so the instruction is diluted, not reinforced.
--   * 67 active lessons contain slow vocabulary in their own remedy text. Most
--     are correct guidance that merely names what it warns against; only 2
--     actually prescribe slow camera movement. See step 4 — the distinction
--     matters, and conflating them destroys good lessons.
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
-- 4. Retire ONLY the lessons that prescribe slow camera movement.
--
--    A first pass at this retired every lesson containing slow vocabulary (67
--    rows) and every lesson derived from pace-or-boring feedback (172 rows).
--    Both were wrong. Reading the actual rows:
--
--      * Of the 9 lessons that mention a camera alongside slow vocabulary, only
--        2 PRESCRIBE slowness. The other 7 are correct anti-slow guidance that
--        merely names the thing it is warning against ("never default to a
--        static tripod shot of a sedan gently rolling forward"). Retiring those
--        would delete the very lessons that were right.
--      * Of the 172 matched by pace-or-boring feedback, 144 are about
--        composition and framing ("every frame must contain visible tension"),
--        not pace at all.
--
--    So: retire the 2 that actively instruct the model to move slowly. Token
--    leakage from the remaining correct-but-slow-worded lessons is handled at
--    the emit boundary by pace-lint, which is the right layer for it — that
--    keeps the guidance and drops only the vocabulary.
--
--    Reversible: set status='active', retired_at=NULL to restore.
-- ---------------------------------------------------------------------------
UPDATE learned_lessons
SET status         = 'retired',
    retired_at     = now(),
    retired_reason = 'prescribed slow camera movement; superseded by typed camera_energy control'
WHERE status = 'active'
  AND id IN (
    -- "always include a slow deliberate camera move (creeping dolly, gentle
    --  crane rise, or drifting lateral track)"
    'b7402044-2414-4fb9-b9d9-8498c93e4738',
    -- "always include a deliberate camera move — e.g. a slow orbit, crane lift,
    --  or dolly push"
    '371fa330-4a8f-49ba-9f3b-866ee13f30e8'
  );

-- ---------------------------------------------------------------------------
-- 5. Add typed controls that outrank the prose.
--    Typed controls are enforceable by code and cannot leak vocabulary into the
--    prompt. The prompt writer reads `controls`; the prose `lesson` is only for
--    humans reading the table. These sort first in the ranked view (step 6), so
--    they lead rather than compete with the ~40 prose lessons about pace —
--    which stay active, since each carries account-specific nuance worth
--    keeping now that injection is capped.
-- ---------------------------------------------------------------------------
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
