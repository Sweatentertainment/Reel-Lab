/**
 * Tests for the pure parts of measure-pace and retime — parsing, scoring and
 * filter construction. The ffmpeg calls themselves are not exercised here;
 * verify those against real renders with `--calibrate` before trusting the
 * default thresholds.
 *
 * Run: node --test tools/motion-pace/measure-pace.test.mjs
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseMetadata, summarise, DEFAULT_THRESHOLDS } from './measure-pace.mjs';
import { buildFilter } from './retime.mjs';

/** Synthesise the interleaved output ffmpeg's metadata=print filter emits. */
function ffmpegOutput(energies, fps = 30) {
  return energies
    .map((e, i) => `frame:${i} pts:${i * 1000} pts_time:${(i / fps).toFixed(4)}\nlavfi.signalstats.YAVG=${e.toFixed(6)}`)
    .join('\n');
}

test('parses frame time and energy pairs', () => {
  const samples = parseMetadata(ffmpegOutput([255, 4.0, 5.0, 6.0]));
  // The leading black-frame difference is dropped.
  assert.equal(samples.length, 3);
  assert.deepEqual(samples.map((s) => s.energy), [4, 5, 6]);
  assert.ok(samples[0].t > 0);
});

test('ignores malformed lines without inventing samples', () => {
  const samples = parseMetadata('garbage\nlavfi.signalstats.YAVG=9.0\nframe:1 pts_time:0.5\n');
  assert.equal(samples.length, 0);
});

test('a busy clip passes', () => {
  const samples = parseMetadata(ffmpegOutput([255, ...Array(60).fill(8.0)]));
  const result = summarise(samples);
  assert.equal(result.verdict, 'ok');
  assert.deepEqual(result.reasons, []);
  assert.equal(result.suggestedRetime, 1);
});

test('a slow clip fails and reports why', () => {
  const samples = parseMetadata(ffmpegOutput([255, ...Array(60).fill(1.2)]));
  const result = summarise(samples);
  assert.equal(result.verdict, 'slow');
  assert.ok(result.reasons.some((r) => r.startsWith('motionEnergy')));
  assert.ok(result.suggestedRetime > 1);
});

test('a clip that is busy overall but dead on the hook is caught', () => {
  // Two seconds of nothing, then a burst — exactly the "slow atmospheric
  // build-up" pattern the lessons kept complaining about.
  const energies = [255, ...Array(60).fill(0.2), ...Array(60).fill(12)];
  const result = summarise(parseMetadata(ffmpegOutput(energies)));
  assert.equal(result.verdict, 'slow');
  assert.ok(result.reasons.some((r) => r.startsWith('hookEnergy')), JSON.stringify(result.reasons));
});

test('dead frame ratio is reported', () => {
  const energies = [255, ...Array(50).fill(0.1), ...Array(50).fill(20)];
  const result = summarise(parseMetadata(ffmpegOutput(energies)));
  assert.ok(result.deadFrameRatio > 0.45 && result.deadFrameRatio < 0.55, `got ${result.deadFrameRatio}`);
});

test('suggested retime is clamped to a sane range', () => {
  const nearZero = summarise(parseMetadata(ffmpegOutput([255, ...Array(30).fill(0.001)])));
  assert.ok(nearZero.suggestedRetime <= 2.5);
  const fast = summarise(parseMetadata(ffmpegOutput([255, ...Array(30).fill(50)])));
  assert.equal(fast.suggestedRetime, 1);
});

test('thresholds are overridable', () => {
  const samples = parseMetadata(ffmpegOutput([255, ...Array(30).fill(1.0)]));
  assert.equal(summarise(samples).verdict, 'slow');
  assert.equal(
    summarise(samples, { ...DEFAULT_THRESHOLDS, minMotionEnergy: 0.5, minHookEnergy: 0.5 }).verdict,
    'ok',
  );
});

test('grain-robust scale: the documented pace reference points classify correctly', () => {
  // Measured from fixtures of identical content at different playback speeds.
  const atPace = (energy) => summarise(parseMetadata(ffmpegOutput([255, ...Array(90).fill(energy)]))).verdict;
  assert.equal(atPace(2.163), 'ok', 'normal pace should pass');
  assert.equal(atPace(1.095), 'slow', '2x slowed should fail');
  assert.equal(atPace(0.554), 'slow', '4x slowed should fail');
});

test('empty input yields a slow verdict rather than a crash', () => {
  const result = summarise([]);
  assert.equal(result.frames, 0);
  assert.equal(result.verdict, 'slow');
});

test('retime filter drops frames by default and interpolates on --smooth', () => {
  assert.equal(buildFilter(1.6), 'setpts=PTS/1.6,fps=30');
  assert.match(buildFilter(1.6, { smooth: true }), /^setpts=PTS\/1\.6,minterpolate=fps=30:mi_mode=mci/);
  assert.match(buildFilter(2, { fps: 24 }), /fps=24$/);
});
