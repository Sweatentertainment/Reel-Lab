/* Turn PJ's raw sweat.fm dashboard capture into a deck asset.
 *
 *   node scripts/prep-dashboard.mjs
 *
 * Two things are wrong with the raw grab for deck use.
 *
 * It runs on past the useful part: the last country row is sliced in half at
 * the foot, so it's cropped to just under the Top Countries header, which is a
 * clean edge and reads as a screen you've scrolled rather than a broken image.
 *
 * And the site's own scroll spine — the wavy white line the marketing pages
 * draw down the middle — is captured on top of the dashboard. In the gutters
 * it looks deliberate; where it crosses a chart card and one of the ad
 * thumbnails it just looks like damage. It's only a few pixels wide, so each
 * row is repaired by interpolating straight across it from the untouched
 * pixels either side.
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const DIR = 'assets/img';
const SRC = 'Screenshot 2026-08-10 at 17.44.48.png';
const OUT = 'dashboard.jpg';

/* measured off the original: the Top Countries header sits at ~1888, its
   first data row is cut off by the bottom of the grab */
const CROP_BOTTOM = 2145;
const TARGET_W = 2200;
/* The spine wanders inside this band. It has to be kept tight: the campaign
   table's Impr. and CPM columns sit just outside it, and a wider search
   picks their digits as the brightest thing in the row and paints them out.

   The card the table sits in is opaque and covers the spine, so repair is
   also gated to the rows where the line is actually on show — the sliver
   above the card, and everything from the charts down. */
const SPINE_BAND = [1975, 2115];
const SPINE_ROWS = (y) => y < 42 || y > 545;

const data = 'data:image/png;base64,' + fs.readFileSync(path.join(DIR, SRC)).toString('base64');

const b = await chromium.launch();
const p = await b.newPage();
const jpg = await p.evaluate(async ({ d, cropBottom, targetW, band, rowsSrc }) => {
  const rows = eval(`(${rowsSrc})`);
  const img = new Image();
  await new Promise((r) => { img.onload = r; img.src = d; });
  const W = img.width;
  const H = Math.min(img.height, cropBottom);

  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const x = c.getContext('2d');
  x.drawImage(img, 0, 0);

  /* ---- paint the spine out, row by row ---- */
  const id = x.getImageData(band[0], 0, band[1] - band[0], H);
  const px = id.data;
  const BW = band[1] - band[0];
  const lum = (X, Y) => { const i = (Y * BW + X) * 4; return (px[i] + px[i + 1] + px[i + 2]) / 3; };
  const FEATHER = 7; /* bridge from this far outside the line's soft edges */
  let repaired = 0;
  for (let Y = 0; Y < H; Y++) {
    if (!rows(Y)) continue;

    /* the line is the brightest thing in the band and it sits on ground far
       darker than itself, so threshold against the row's own floor */
    const row = [];
    for (let X = 0; X < BW; X++) row.push(lum(X, Y));
    const floor = [...row].sort((a, z) => a - z)[Math.floor(BW * 0.2)];
    const cut = floor + 24;

    /* widest run over the cut — the line is continuous, stray text is not */
    let bestA = -1, bestB = -1, a = -1;
    for (let X = 0; X <= BW; X++) {
      if (X < BW && row[X] > cut) { if (a < 0) a = X; }
      else if (a >= 0) {
        if (X - a > bestB - bestA) { bestA = a; bestB = X; }
        a = -1;
      }
    }
    if (bestA < 0 || bestB - bestA > 60) continue; /* nothing, or not a line */

    const l = Math.max(0, bestA - FEATHER), r = Math.min(BW - 1, bestB + FEATHER);
    repaired++;
    const li = (Y * BW + l) * 4, ri = (Y * BW + r) * 4;
    for (let X = l + 1; X < r; X++) {
      const t = (X - l) / (r - l);
      const i = (Y * BW + X) * 4;
      for (let ch = 0; ch < 3; ch++) px[i + ch] = px[li + ch] * (1 - t) + px[ri + ch] * t;
    }
  }
  x.putImageData(id, band[0], 0);

  /* ---- downscale to a sane delivery width ---- */
  const sc = Math.min(1, targetW / W);
  const c2 = document.createElement('canvas');
  c2.width = Math.round(W * sc);
  c2.height = Math.round(H * sc);
  const x2 = c2.getContext('2d');
  x2.imageSmoothingQuality = 'high';
  /* the dashboard's own ground, so any rounding seam matches it */
  x2.fillStyle = '#0a0a0a';
  x2.fillRect(0, 0, c2.width, c2.height);
  x2.drawImage(c, 0, 0, W, H, 0, 0, c2.width, c2.height);
  return { u: c2.toDataURL('image/jpeg', 0.88), w: c2.width, h: c2.height, was: img.height, repaired };
}, { d: data, cropBottom: CROP_BOTTOM, targetW: TARGET_W, band: SPINE_BAND, rowsSrc: SPINE_ROWS.toString() });
await b.close();

fs.writeFileSync(path.join(DIR, OUT), Buffer.from(jpg.u.split(',')[1], 'base64'));
const kb = Math.round(fs.statSync(path.join(DIR, OUT)).size / 1024);
console.log(`${OUT}  ${jpg.w}x${jpg.h}  ${kb}KB  (cropped from ${jpg.was}px tall, ${jpg.repaired} rows de-spined)`);
