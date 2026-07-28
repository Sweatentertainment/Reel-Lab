/**
 * Tests for pace-lint. Run: node --test tools/motion-pace/pace-lint.test.mjs
 *
 * The three PRODUCTION_PROMPTS are copied verbatim from video_generations rows
 * written on 2026-07-28, i.e. after the "too slow paced" feedback round. They
 * are the regression corpus: if the lint stops cleaning these, it has broken.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lintMotionPrompt, _internals } from './pace-lint.mjs';

const PRODUCTION_PROMPTS = [
  `The camera pushes in on a very slow, almost imperceptible dolly toward the man's back, closing roughly two feet over sixteen seconds, deepening the spatial relationship between him and the mirror arc. First, the man's right arm lifts outward from his side in a slow deliberate arc — elbow straightening, shoulder rotating — while the leftmost mirror's reflection stays perfectly frozen. Then the reflections in the second and third panels turn their heads at mismatched speeds, one drifting downward, the other snapping sharply left. Finally his raised right hand clenches slowly into a fist, fingers curling one by one.`,

  `The camera holds on a locked low wide angle looking down the full length of the tunnel, but executes one very slow creep forward — barely two feet over sixteen seconds — deepening the perspective into the vaulted concrete passage. First, the pale powdery dust piled on the foreground concrete ledge detonates straight upward in a sharp vertical burst. Then, one beat later, the packed silhouettes deep in the tunnel spring upward in unison — knees extending, arms thrown high.`,

  `The camera holds on a low locked-off angle looking up at the man on the ledge, then executes one very slow, heavy push-in over the full sixteen seconds, drifting no more than a foot closer — weighted and deliberate.

First, the phone tilts past his fingertips and drops in a swift arc, screen-light spinning. Then his left palm slams flat onto the rough ledge, fingers splaying for grip. Finally his right hand shoots down past the parapet and snatches the phone against open air, jacket fabric slowly settling.`,
];

/** Every tempo token the lint claims to remove, as a single detector. */
const BANNED = /\b(?:very slow|slow|slowly|slow motion|slow-motion|gentle|gently|subtle|subtly|imperceptible|imperceptibly|gradual|gradually|creep|creeps|creeping|drift|drifts|drifting|languid|languidly|leisurely|unhurried|floaty|lingering|lingers|softly|delicate|delicately|calmly|serene|dreamy|settles|settling|settled)\b/i;

test('production prompts: no banned tempo token survives', () => {
  for (const [i, prompt] of PRODUCTION_PROMPTS.entries()) {
    const { prompt: cleaned } = lintMotionPrompt(prompt);
    const hit = cleaned.match(BANNED);
    assert.equal(hit, null, `prompt ${i} still contains "${hit?.[0]}"\n${cleaned}`);
  }
});

test('production prompts: duration anchors are removed', () => {
  // Note: a bare "second" is legitimate ("the second panel"); only the
  // over/across/within-N-seconds anchor spreads motion across the clip.
  const NUM = '(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|twenty|\\d{1,2})';
  const ANCHOR = new RegExp(
    `\\b(?:over|across|within|during|through(?:out)?|in)\\s+(?:the\\s+)?(?:full\\s+|entire\\s+|whole\\s+)?${NUM}[\\s-]?seconds?\\b` +
      `|\\b(?:full|entire|whole)\\s+(?:clip|shot|take|duration)\\b`,
    'i',
  );
  for (const [i, prompt] of PRODUCTION_PROMPTS.entries()) {
    assert.match(prompt, ANCHOR, `fixture ${i} should contain an anchor to begin with`);
    const { prompt: cleaned } = lintMotionPrompt(prompt);
    const hit = cleaned.match(ANCHOR);
    assert.equal(hit, null, `prompt ${i} still states a duration ("${hit?.[0]}"):\n${cleaned}`);
  }
});

test('production prompts: all pass and all are modified', () => {
  for (const prompt of PRODUCTION_PROMPTS) {
    const result = lintMotionPrompt(prompt);
    assert.equal(result.ok, true, JSON.stringify(result.blocking));
    assert.equal(result.changed, true);
    assert.ok(result.repairs.length >= 3, 'expected several repairs');
  }
});

test('production prompts: beat overrun is reported on the long chains', () => {
  // Prompts 0 and 2 use the full First/Then/Finally chain the lessons told it to
  // stop using; prompt 1 stops at two beats and is legitimately within the limit.
  const overruns = PRODUCTION_PROMPTS.map(
    (p) => lintMotionPrompt(p).warnings.some((w) => w.rule === 'BEAT_OVERRUN'),
  );
  assert.deepEqual(overruns, [true, false, true]);
});

test('is idempotent — a second pass changes nothing', () => {
  for (const prompt of PRODUCTION_PROMPTS) {
    const once = lintMotionPrompt(prompt).prompt;
    const twice = lintMotionPrompt(once);
    assert.equal(twice.prompt, once);
    assert.equal(twice.changed, false);
  }
});

test('preserves capitalisation', () => {
  assert.match(lintMotionPrompt('Slowly he turns and slams the door.').prompt, /^Sharply\b/);
  assert.match(lintMotionPrompt('THE CAMERA MOVES SLOWLY as he slams it.').prompt, /SHARPLY/);
});

test('a prompt with no tempo anchor is blocking, not silently passed', () => {
  const result = lintMotionPrompt('The camera observes the room. The curtain moves in the air.');
  assert.equal(result.ok, false);
  assert.equal(result.blocking[0].rule, 'NO_TEMPO_ANCHOR');
});

test('negation is a warning by default and blocking in strict mode', () => {
  const p = 'The camera whips left, never slowing, with no cuts.';
  assert.ok(lintMotionPrompt(p).warnings.some((w) => w.rule === 'NEGATION'));
  assert.equal(lintMotionPrompt(p, { strict: true }).ok, false);
});

test('empty input is rejected rather than passed through', () => {
  for (const bad of ['', '   ', null, undefined, 42]) {
    const result = lintMotionPrompt(bad);
    assert.equal(result.ok, false);
    assert.equal(result.blocking[0].rule, 'EMPTY');
  }
});

test('digit and word duration forms are both stripped', () => {
  for (const form of ['over 16 seconds', 'across sixteen seconds', 'over the full clip', 'within 10 seconds']) {
    const { prompt: cleaned } = lintMotionPrompt(`The camera whips left ${form} as he slams the door.`);
    assert.ok(!/seconds?|full clip/i.test(cleaned), `"${form}" survived as: ${cleaned}`);
  }
});

test('leaves an already-fast prompt alone', () => {
  const fast = 'The camera whips left as the door slams. His hand snaps up and grabs the rail.';
  const result = lintMotionPrompt(fast);
  assert.equal(result.changed, false);
  assert.equal(result.ok, true);
  assert.equal(result.repairs.length, 0);
});

test('tidies punctuation left behind by deletions', () => {
  const { prompt: cleaned } = lintMotionPrompt(
    'The camera snaps in, barely a foot, toward the door as it slams.',
  );
  assert.ok(!/,\s*,/.test(cleaned), cleaned);
  assert.ok(!/\s+,/.test(cleaned), cleaned);
});

test('swap table has no self-referential replacements', () => {
  // A replacement that itself contains a banned token would reintroduce slowness.
  for (const [pattern, replacement] of _internals.TEMPO_SWAPS) {
    if (typeof replacement === 'string' && !replacement.includes('$')) {
      assert.equal(BANNED.test(replacement), false, `${pattern} -> "${replacement}" reintroduces a banned token`);
    }
  }
});
