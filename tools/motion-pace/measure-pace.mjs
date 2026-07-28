#!/usr/bin/env node
/**
 * measure-pace — objective motion energy for a rendered clip.
 *
 * The reason "too slow paced" feedback never converged is that nothing measured
 * pace. A human typed a vibe into a box, a lesson was written from it, and
 * nobody could tell whether the next render was actually faster. This gives
 * every render a number, which makes three things possible:
 *
 *   1. reject slow clips automatically, before a human ever opens them
 *   2. tell whether a lesson changed anything (compare cohorts before/after)
 *   3. retire lessons that move the number by nothing
 *
 * Method: decode small and greyscale, difference each frame against the one
 * before it (tblend), and take the mean luma of the difference (signalstats
 * YAVG). That value is mean inter-frame pixel displacement — high when things
 * move, near zero when the frame is static. Slow motion shows up as a low mean
 * with low variance: the clip is busy, but nothing travels far per frame.
 *
 * Usage:
 *   node measure-pace.mjs clip.mp4
 *   node measure-pace.mjs clip.mp4 --json
 *   node measure-pace.mjs --calibrate good/*.mp4      # derive your thresholds
 *
 * Requires ffmpeg on PATH.
 */

import { spawn } from 'node:child_process';
import { basename } from 'node:path';

/**
 * Defaults are a starting point, NOT a calibrated truth. Scene busyness moves
 * the absolute numbers a lot — a crowded club shot reads higher than a portrait
 * at the same pace. Run --calibrate over a folder of clips you consider
 * correctly paced and a folder you rejected as slow, then set these to sit
 * between the two distributions.
 *
 * Reference points on this scale, from the synthetic fixtures (same content,
 * different playback speed): normal pace 2.16, 2x slow 1.10, 4x slow 0.55.
 */
export const DEFAULT_THRESHOLDS = {
  minMotionEnergy: 1.5, // mean inter-frame difference across the clip
  minHookEnergy: 1.5, // same, over the first second — short-form lives or dies here
  maxDeadFrameRatio: 0.5, // share of frames with almost no change at all
  deadFrameLevel: 0.3, // what counts as "almost no change"
};

/**
 * Filter chain. The denoise and downscale are not incidental — film grain is
 * temporally uncorrelated, so naive frame differencing counts it as motion.
 * Measured on a static grainy clip vs a moving one:
 *
 *   scale=192,gray                    static-grainy 3.25  moving 0.90   (inverted)
 *   scale=96,gray,hqdn3d,gblur        static-grainy 0.07  moving 0.93   (13.8x apart)
 *
 * With reel:lab's heavy 16mm grain house style the naive chain rated a
 * 4x-slowed grainy clip above a full-speed clean one. hqdn3d strips the
 * temporal noise; the downscale removes what is left of the high-frequency
 * grain. The cost is sensitivity to very small moving objects, which matters
 * far less than being wrong about grain.
 */
const FILTER =
  'scale=96:-2,format=gray,hqdn3d=4:4:12:12,gblur=sigma=0.8,tblend=all_mode=difference,signalstats,metadata=print:file=-';

/** Aim this far above the floor when suggesting a retime factor. */
const RETIME_HEADROOM = 1.2;

function runFfmpeg(input) {
  return new Promise((resolve, reject) => {
    const args = ['-nostdin', '-hide_banner', '-loglevel', 'error', '-i', input, '-vf', FILTER, '-an', '-f', 'null', '-'];
    const proc = spawn('ffmpeg', args);
    let stdout = '';
    let stderr = '';
    proc.stdout.on('data', (d) => (stdout += d));
    proc.stderr.on('data', (d) => (stderr += d));
    proc.on('error', (err) =>
      reject(err.code === 'ENOENT' ? new Error('ffmpeg not found on PATH') : err),
    );
    proc.on('close', (code) => {
      if (code !== 0) return reject(new Error(`ffmpeg exited ${code}: ${stderr.trim().slice(0, 400)}`));
      resolve(stdout);
    });
  });
}

/** Parse the interleaved `frame:.. pts_time:..` / `lavfi.signalstats.YAVG=..` stream. */
export function parseMetadata(stdout) {
  const samples = [];
  let pending = null;
  for (const line of stdout.split('\n')) {
    const frame = line.match(/pts_time:([0-9.]+)/);
    if (frame) {
      pending = Number(frame[1]);
      continue;
    }
    const yavg = line.match(/lavfi\.signalstats\.YAVG=([0-9.]+)/);
    if (yavg && pending !== null) {
      samples.push({ t: pending, energy: Number(yavg[1]) });
      pending = null;
    }
  }
  // The first difference frame is against a black frame, so it reads as a full
  // white flash. Drop it or it inflates every clip's score.
  return samples.slice(1);
}

const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

function percentile(xs, p) {
  if (!xs.length) return 0;
  const sorted = [...xs].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))];
}

/** Compute pace metrics from parsed samples. */
export function summarise(samples, thresholds = DEFAULT_THRESHOLDS) {
  const energies = samples.map((s) => s.energy);
  const hook = samples.filter((s) => s.t <= 1.0).map((s) => s.energy);
  const duration = samples.length ? samples[samples.length - 1].t : 0;

  const motionEnergy = mean(energies);
  const hookEnergy = mean(hook.length ? hook : energies);
  const deadFrameRatio = energies.length
    ? energies.filter((e) => e < thresholds.deadFrameLevel).length / energies.length
    : 1;

  const reasons = [];
  if (motionEnergy < thresholds.minMotionEnergy) reasons.push(`motionEnergy ${motionEnergy.toFixed(2)} < ${thresholds.minMotionEnergy}`);
  if (hookEnergy < thresholds.minHookEnergy) reasons.push(`hookEnergy ${hookEnergy.toFixed(2)} < ${thresholds.minHookEnergy}`);
  if (deadFrameRatio > thresholds.maxDeadFrameRatio) reasons.push(`deadFrameRatio ${(deadFrameRatio * 100).toFixed(0)}% > ${(thresholds.maxDeadFrameRatio * 100).toFixed(0)}%`);

  return {
    frames: samples.length,
    duration: Number(duration.toFixed(2)),
    motionEnergy: Number(motionEnergy.toFixed(3)),
    hookEnergy: Number(hookEnergy.toFixed(3)),
    peakEnergy: Number(percentile(energies, 95).toFixed(3)),
    deadFrameRatio: Number(deadFrameRatio.toFixed(3)),
    verdict: reasons.length ? 'slow' : 'ok',
    reasons,
    /**
     * Speed factor that would bring this clip up to the motion-energy floor.
     *
     * Energy scales close to linearly with playback speed, but slightly
     * sub-linearly in practice (measured: 1.15 retimed 1.3x landed at 1.48, not
     * 1.50). Without headroom the "fixed" clip fails the same check that asked
     * for the fix, so aim above the floor rather than exactly at it.
     */
    suggestedRetime: Number(
      Math.min(2.5, Math.max(1, (thresholds.minMotionEnergy * RETIME_HEADROOM) / Math.max(motionEnergy, 0.01))).toFixed(2),
    ),
  };
}

/** Measure one clip. Accepts a local path or a URL ffmpeg can open. */
export async function measurePace(input, thresholds = DEFAULT_THRESHOLDS) {
  const samples = parseMetadata(await runFfmpeg(input));
  if (!samples.length) throw new Error(`no frames decoded from ${input}`);
  return { input, ...summarise(samples, thresholds) };
}

async function calibrate(files) {
  const rows = [];
  for (const f of files) {
    try {
      rows.push(await measurePace(f));
    } catch (err) {
      console.error(`  skip ${basename(f)}: ${err.message}`);
    }
  }
  if (!rows.length) return console.error('nothing measured');
  const energies = rows.map((r) => r.motionEnergy);
  const hooks = rows.map((r) => r.hookEnergy);
  console.log(`\nMeasured ${rows.length} clips`);
  console.log(`  motionEnergy  min ${Math.min(...energies).toFixed(2)}  p25 ${percentile(energies, 25).toFixed(2)}  median ${percentile(energies, 50).toFixed(2)}  max ${Math.max(...energies).toFixed(2)}`);
  console.log(`  hookEnergy    min ${Math.min(...hooks).toFixed(2)}  p25 ${percentile(hooks, 25).toFixed(2)}  median ${percentile(hooks, 50).toFixed(2)}  max ${Math.max(...hooks).toFixed(2)}`);
  console.log(`\nIf these are clips you consider correctly paced, set minMotionEnergy near p25 (${percentile(energies, 25).toFixed(2)}).`);
  console.log('Run again over a folder of clips you rejected as slow; the threshold belongs between the two medians.\n');
}

async function main() {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.error('usage: measure-pace.mjs <clip.mp4 ...> [--json] [--calibrate]');
    process.exit(2);
  }
  const json = args.includes('--json');
  const isCalibrate = args.includes('--calibrate');
  const files = args.filter((a) => !a.startsWith('--'));

  if (isCalibrate) return calibrate(files);

  const results = [];
  for (const file of files) {
    try {
      results.push(await measurePace(file));
    } catch (err) {
      results.push({ input: file, error: err.message });
    }
  }

  if (json) {
    console.log(JSON.stringify(results.length === 1 ? results[0] : results, null, 2));
  } else {
    for (const r of results) {
      if (r.error) {
        console.log(`✖ ${basename(r.input)} — ${r.error}`);
        continue;
      }
      const mark = r.verdict === 'ok' ? '✓' : '✖';
      console.log(
        `${mark} ${basename(r.input)}  energy ${r.motionEnergy}  hook ${r.hookEnergy}  dead ${(r.deadFrameRatio * 100).toFixed(0)}%  ${r.duration}s`,
      );
      if (r.reasons.length) console.log(`    slow: ${r.reasons.join('; ')}  → retime ${r.suggestedRetime}x`);
    }
  }
  process.exit(results.some((r) => r.error || r.verdict === 'slow') ? 1 : 0);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
