#!/usr/bin/env node
/**
 * retime — deterministically fix a clip that came back slow.
 *
 * Prompting is probabilistic; retiming is not. Even after the prompt fixes land,
 * some share of renders will still come back sluggish, and regenerating costs a
 * dollar and five minutes for another roll of the dice. Speeding the clip up
 * costs a few seconds of CPU and always works.
 *
 * This is the reason nothing slow ever has to ship, independent of how well the
 * prompt side is doing.
 *
 *   node retime.mjs in.mp4 out.mp4 --factor 1.6
 *   node retime.mjs in.mp4 out.mp4 --auto            # measure, then pick the factor
 *   node retime.mjs in.mp4 out.mp4 --auto --smooth   # motion-interpolate to keep it fluid
 *
 * Speeding up shortens the clip: a 16s clip at 1.6x becomes 10s. For short-form
 * that is usually an improvement, but check it against the edit's timing needs.
 *
 * Requires ffmpeg on PATH.
 */

import { spawn } from 'node:child_process';
import { measurePace, DEFAULT_THRESHOLDS } from './measure-pace.mjs';

const MIN_FACTOR = 1.0;
const MAX_FACTOR = 2.5;

/**
 * Build the ffmpeg video filter chain for a speed change.
 *
 * setpts=PTS/f drops frames to speed up, which can look steppy past ~1.5x.
 * minterpolate synthesises intermediate frames instead, so motion stays fluid —
 * at a real cost in encode time (often slower than realtime).
 */
export function buildFilter(factor, { smooth = false, fps = 30 } = {}) {
  const setpts = `setpts=PTS/${factor}`;
  return smooth ? `${setpts},minterpolate=fps=${fps}:mi_mode=mci:mc_mode=aobmc:vsbmc=1` : `${setpts},fps=${fps}`;
}

function clampFactor(factor) {
  if (!Number.isFinite(factor)) throw new Error(`invalid factor: ${factor}`);
  return Math.min(MAX_FACTOR, Math.max(MIN_FACTOR, factor));
}

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn('ffmpeg', args);
    let stderr = '';
    proc.stderr.on('data', (d) => (stderr += d));
    proc.on('error', (err) =>
      reject(err.code === 'ENOENT' ? new Error('ffmpeg not found on PATH') : err),
    );
    proc.on('close', (code) =>
      code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}: ${stderr.trim().slice(0, 400)}`)),
    );
  });
}

/**
 * Retime a clip.
 *
 * @param {string} input
 * @param {string} output
 * @param {object} [opts]
 * @param {number} [opts.factor] Explicit speed factor. Ignored when auto is set.
 * @param {boolean} [opts.auto] Measure the clip and derive the factor.
 * @param {boolean} [opts.smooth] Motion-interpolate rather than drop frames.
 * @param {number} [opts.fps=30] Output frame rate.
 * @param {boolean} [opts.keepAudio=false] These renders are usually muted in the edit.
 */
export async function retime(input, output, opts = {}) {
  const { auto = false, smooth = false, fps = 30, keepAudio = false } = opts;

  let factor = opts.factor;
  let before = null;

  if (auto) {
    before = await measurePace(input);
    if (before.verdict === 'ok') return { skipped: true, reason: 'already within pace thresholds', before };
    factor = before.suggestedRetime;
  }

  factor = clampFactor(factor ?? 1.5);
  if (factor === 1) return { skipped: true, reason: 'factor resolved to 1x', before };

  const args = [
    '-nostdin', '-hide_banner', '-loglevel', 'error', '-y',
    '-i', input,
    '-filter:v', buildFilter(factor, { smooth, fps }),
    ...(keepAudio ? ['-filter:a', `atempo=${Math.min(2, factor)}`] : ['-an']),
    '-c:v', 'libx264', '-crf', '20', '-preset', 'medium', '-movflags', '+faststart',
    output,
  ];

  await runFfmpeg(args);

  const after = auto ? await measurePace(output).catch(() => null) : null;
  return { skipped: false, factor, before, after, output };
}

function parseArgs(argv) {
  const positional = [];
  const flags = { fps: 30 };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--auto') flags.auto = true;
    else if (arg === '--smooth') flags.smooth = true;
    else if (arg === '--keep-audio') flags.keepAudio = true;
    else if (arg === '--factor') flags.factor = Number(argv[++i]);
    else if (arg === '--fps') flags.fps = Number(argv[++i]);
    else if (!arg.startsWith('--')) positional.push(arg);
  }
  return { positional, flags };
}

async function main() {
  const { positional, flags } = parseArgs(process.argv.slice(2));
  const [input, output] = positional;
  if (!input || !output) {
    console.error('usage: retime.mjs <in.mp4> <out.mp4> [--factor N | --auto] [--smooth] [--fps N] [--keep-audio]');
    process.exit(2);
  }
  if (!flags.auto && flags.factor === undefined) {
    console.error('specify --factor N or --auto');
    process.exit(2);
  }

  try {
    const result = await retime(input, output, flags);
    if (result.skipped) {
      console.log(`· skipped: ${result.reason}`);
      return;
    }
    console.log(`✓ ${output} — ${result.factor}x${flags.smooth ? ' (interpolated)' : ''}`);
    if (result.before) {
      const after = result.after ? `${result.after.motionEnergy} (${result.after.verdict})` : 'unmeasured';
      console.log(`  motionEnergy ${result.before.motionEnergy} → ${after}`);
    }
  } catch (err) {
    console.error(`✖ ${err.message}`);
    process.exit(1);
  }
}

export { DEFAULT_THRESHOLDS };

if (import.meta.url === `file://${process.argv[1]}`) main();
