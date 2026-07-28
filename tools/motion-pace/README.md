# motion-pace — why the videos come out slow, and how to stop it

Diagnosis and tooling for the slow-motion problem in the reel:lab generation
pipeline. Measured 2026-07-28 against the Sweat Portal Supabase project
(`learned_lessons`, `video_generations`).

The short version: **the feedback loop is working, but with the wrong sign.**
"Too slow paced" feedback is being turned into lessons whose remedy text is
written in slow vocabulary, and those words go straight into the next prompt.
Video models condition on token presence, not on sentence logic — so a lesson
saying *"always include a slow deliberate camera move"* makes the next clip
slower, not faster.

---

## What the data shows

**1. Almost every prompt contains slow vocabulary.** Last 30 days, by model:

| Model | Clip length | Generations | Prompts with slow words |
|---|---|---|---|
| `sora-2-lite` | 16s | 891 | 80.6% |
| `kling-v3-turbo` | 15s | 730 | 84.8% |
| `gemini-omni-flash` | 10s | 213 | 87.8% |

**2. The opening camera clause is the main carrier.** Across 798 prompts from
the last 7 days:

- **99.9%** open with a camera clause — it is a fixed slot in the template
- **41.7%** of those opening clauses contain `slow / imperceptible / barely / gentle / drift / creep`
- **24.8%** state the clip length in the prompt (*"over sixteen seconds"*)
- **69.9%** use the `First… Then… Finally…` three-beat chain

That opening clause sets the temporal energy for the entire clip. A verbatim
example generated on 2026-07-28, *after* a week of "too slow paced" feedback:

> "The camera holds on a low locked-off angle looking up at the man on the
> ledge, then executes one **very slow**, heavy push-in **over the full sixteen
> seconds**, **drifting no more than a foot** closer…"

Three separate slow-motion instructions before the subject has moved at all.

**3. The feedback made it worse.** 140 lessons were written on 2026-07-27, most
from "too slow paced" and "boring" reports. Comparing prompts generated before
and after that batch:

| Metric | Before 07-27 (n=1,033) | After 07-27 (n=615) |
|---|---|---|
| Slow-worded camera clause | 13.9% | **48.6%** |
| Three-beat chain | 80.7% | 67.8% |
| Slow words anywhere | 76.2% | 75.8% |

Slow camera clauses **tripled** immediately after the complaint round. The
mechanism is visible in the lesson text itself — these are real rows, both
written on 07-27 from "boring" feedback:

> *"always include a **slow** deliberate camera move (**creeping** dolly,
> **gentle** crane rise, or **drifting** lateral track)"*

> *"always include a deliberate camera move — e.g. a **slow** orbit, crane lift,
> or dolly push"*

The lesson-writer diagnosed the problem correctly (the camera needed to move)
and then phrased the fix in film-school vocabulary. Those exact words reached
the video model.

**4. The signal is diluted past the point of mattering.** 388 active lessons
(191 global + 193 account), all `status='active'`, all distinct — roughly
**100,000 characters** of free prose concatenated into every prompt build. 42 of
them say "be faster" in 42 different ways, none superseding the others, competing
with ~340 lessons about grain, clothing, lighting and composition. Nothing
reinforces; nothing decays.

**5. Nothing is measured.** `video_generations` stores no pace metric. "Too
slow" is a human vibe typed into a box, and there has never been a way to tell
whether the next render was actually faster — so no lesson could ever be
confirmed or retired.

**6. Clip length is a structural cause.** 15–16 second single-shot
image-to-video from one still is longer than any current i2v model has real
action for. Asked to fill 16 seconds from one frame, the model interpolates —
which is what slow motion *is*.

---

## The fixes, in order of impact

### 1. Lint the prompt at the emit boundary — `pace-lint.mjs`

The last thing to touch the string before it goes to fal. It strips duration
anchors and micro-displacement phrasing, swaps every slow token for a decisive
one, and blocks prompts that have no tempo anchor at all. Because it runs at the
boundary, it does not matter what the prompt writer or the lesson store produced
upstream.

```js
import { enforcePace } from './tools/motion-pace/pace-lint.mjs';

const { prompt, report } = enforcePace(motionPrompt);
if (!report.ok) {
  // NO_TEMPO_ANCHOR — nothing in the prompt implies speed. Regenerate.
  return regenerate({ reason: report.blocking });
}
await fal.subscribe(model, { input: { prompt, /* … */ } });
```

On the production example above it produces:

> "The camera holds on a low locked-off angle looking up at the man on the ledge,
> then executes one **fast**, heavy push-in, **sweeping** closer — weighted and
> deliberate."

…and reports the `First/Then/Finally` chain as a `BEAT_OVERRUN` warning.

This is the single highest-leverage change: it addresses the ~80% of prompts
carrying slow vocabulary, and it cannot regress when someone edits a template.

### 2. Stop naming the clip duration in the prompt

24.8% of prompts say "over sixteen seconds". The API's `duration` parameter
already sets length; repeating it in prose tells the model to spread the action
across the whole span. The lint strips this, but it should also come out of
whatever template emits it.

### 3. Shorten the clips

15–16s is beyond what the models can fill. Generate 5s at real tempo and cut
together, or keep 16s and expect to retime. This is the largest structural lever
and the one the lint cannot fix on its own.

### 4. Measure every render — `measure-pace.mjs`

Gives each clip a motion-energy number via ffmpeg frame differencing, plus a
separate score for the first second (short-form lives or dies on the hook).

```bash
node tools/motion-pace/measure-pace.mjs render.mp4
# ✖ render.mp4  energy 1.15  hook 1.03  dead 50%  11.9s
#     slow: motionEnergy 1.15 < 1.5; hookEnergy 1.03 < 1.5  → retime 1.57x
```

Store `motionEnergy` and `hookEnergy` on `video_generations`. That single column
is what makes feedback count: slow clips get rejected before a human sees them,
and a lesson can finally be evaluated by whether it moved the number.

**The grain problem.** Film grain is temporally uncorrelated, so naive frame
differencing counts it as motion — and reel:lab's house look is heavy 16mm
grain. Measured on identical content at different playback speeds:

| clip | grain-robust chain | naive chain |
|---|---|---|
| normal pace | 2.16 | 2.77 |
| 2x slowed | 1.10 | 1.39 |
| 4x slowed | 0.55 | 0.70 |
| normal pace **+ grain** | 2.21 | 5.26 |
| 4x slowed **+ grain** | 0.62 | **3.26** |

The naive chain rates a 4x-slowed grainy clip (3.26) above a full-speed clean
one (2.77) — it would pass exactly the clips you are trying to catch. The
shipped chain denoises with `hqdn3d` and downscales hard before differencing,
which makes the score grain-invariant (2.16 vs 2.21) and linear in pace. The
cost is sensitivity to very small moving objects, which matters far less.

**Still calibrate the thresholds.** Absolute values depend on how busy the scene
is — a crowded club shot reads higher than a portrait at the same pace:

```bash
node tools/motion-pace/measure-pace.mjs --calibrate approved/*.mp4
node tools/motion-pace/measure-pace.mjs --calibrate rejected-as-slow/*.mp4
```

Set the threshold between the two medians.

### 5. Make lessons typed and bounded — `lesson-hygiene.sql` *(applied)*

Retiring lessons in bulk turned out to be the wrong instinct, and the first
draft of this file did it. Reading the rows changed the plan:

- of the 9 lessons naming a camera alongside slow vocabulary, only **2**
  prescribe slowness — the other 7 are *correct* anti-slow guidance that merely
  names what it warns against ("never default to a static tripod shot of a sedan
  gently rolling forward")
- of the 172 lessons matched by pace-or-boring feedback, **144 are about
  composition**, not pace

So the applied migration is surgical: it retires the 2 prescriptive-slow
lessons, adds non-slow replacements preserving their per-account intent, and
adds two global typed controls (`pace_target`, `max_beats`, `camera_energy`,
`forbid_tokens`) that rank above all prose. Everything else stays active —
token leakage from correct-but-slow-worded lessons is handled at the emit
boundary by pace-lint, which keeps the guidance and drops only the vocabulary.

It also adds `hits` so repeated feedback reinforces one lesson instead of
creating a new one, `effect_score` so a lesson that never moves the pace metric
can be retired automatically, and `active_lessons_ranked` so the builder injects
the top N rather than all 390.

Result: 390 active, 2 retired, 4 carrying typed controls, with the two global
controls ranking #1 and #2. Nothing was deleted — every change reverses with an
`UPDATE`.

### 6. Keep the retime escape hatch — `retime.mjs`

Prompting is probabilistic; retiming is not. Regenerating costs ~$1 and several
minutes for another roll of the dice — speeding the clip up costs seconds of CPU
and always works.

```bash
node tools/motion-pace/retime.mjs slow.mp4 fixed.mp4 --auto
node tools/motion-pace/retime.mjs slow.mp4 fixed.mp4 --auto --smooth   # interpolated
```

With this in the pipeline, nothing slow has to ship regardless of how the prompt
side is performing. Verified end to end: a 2x-slowed grainy clip went from
`motionEnergy 1.15` to `1.77` in one `--auto` pass and cleared the threshold.

Two limits worth knowing:

- Speeding up shortens the clip — 16s at 1.6x becomes 10s, usually an
  improvement for short-form, but check it against the edit's timing.
- The factor is clamped at 2.5x, so a clip more than ~2.5x too slow cannot be
  rescued. A 4x-slowed fixture only reached 1.42 against a 1.5 floor and was
  correctly still reported as slow — that is the signal to regenerate rather
  than ship.

---

## Status

| Step | State |
|---|---|
| 1. `pace-lint` at the emit boundary | **built and tested — not yet wired in** (needs the pipeline app) |
| 2. Stop naming the duration | covered by the lint; also remove from the template |
| 3. Shorten the clips | **not done** — a pipeline decision |
| 4. Measure every render | **built and verified**; thresholds need calibrating on real clips |
| 5. Lesson hygiene | **applied to production** |
| 6. Retime escape hatch | **built and verified end to end** |

Steps 1–3 attack the ~80% of prompts carrying slow vocabulary and the duration
anchor that stretches them. Step 6 catches whatever still comes back slow.
Steps 4–5 are what stop the problem returning: once pace is a number, a lesson
that does not move it gets retired instead of accumulating.

**The largest remaining gap is step 1.** The lint only helps once it sits at the
fal call site, which lives in the pipeline app, not this repo. Until then the
lessons that carry slow vocabulary in a negated context — deliberately left
active, because they are correct — still leak those tokens into prompts.

**Honest caveat on the baseline.** The share of renders that are slow *because
of the prompt* is inferred from prompt-text statistics; nothing has ever measured
the renders themselves, and the storage host is not reachable from CI. The
verification above used synthetic fixtures with known ground truth. Run
`--calibrate` over a batch of real clips first — that will give both the correct
thresholds and the real baseline slow rate, which is still unknown.

---

## Files

| File | What it is |
|---|---|
| `pace-lint.mjs` | Emit-boundary prompt guard. Pure JS, no deps. |
| `pace-lint.test.mjs` | Regression corpus — real 2026-07-28 production prompts. |
| `measure-pace.mjs` | ffmpeg motion-energy metric + threshold calibration. |
| `measure-pace.test.mjs` | Tests for the parsing/scoring logic. |
| `retime.mjs` | Deterministic speed fix for clips that come back slow. |
| `lesson-hygiene.sql` | Audits + migration for the lesson store. Review before running. |

```bash
npm run test:motion-pace   # 23 tests, no dependencies
```

`measure-pace.mjs` and `retime.mjs` require `ffmpeg` on PATH. Their pure logic is
unit-tested; the ffmpeg invocations have not been exercised in CI and should be
run against a real clip once before being wired into the pipeline.
