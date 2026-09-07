/* Turn PJ's raw Spotify for Artists screenshots into deck assets.
 *
 *   node scripts/prep-shots.mjs
 *
 * Each screenshot carries a tall band of dead white between the release
 * header and the nav, which wastes half the slide. This collapses any blank
 * run longer than 70px down to 26px — but only in the top 42% of the image,
 * so a chart with a flat stretch is never squashed — then downscales to
 * 1500px and writes JPEG.
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const DIR = 'assets/img';
const MAP = {
  '11.26.45': 'cs-ruthanne-the-moment',
  '11.27.59': 'cs-cristoph-spacer',
  '11.28.21': 'cs-breathe-easy',
  '11.28.31': 'cs-kogis-head-up',
  '11.29.02': 'cs-as-soon-as-i-get-home',
  '11.30.22': 'cs-maribou-midas',
  '11.30.53': 'cs-distracted',
  '11.31.48': 'cs-forever',
  '11.33.44': 'cs-audience-listeners',
  '11.33.55': 'cs-audience-streams',
  '11.34.38': 'cs-house-of-the-silent',
  '11.37.15': 'cs-harry-t-4am-90',
  '11.38.24': 'cs-from-good-to-bad',
};

const b = await chromium.launch();
const p = await b.newPage();
for (const [key, out] of Object.entries(MAP)) {
  const src = fs.readdirSync(DIR).find((f) => f.includes(key));
  if (!src) { console.log(`MISSING ${key}`); continue; }
  const data = 'data:image/png;base64,' + fs.readFileSync(path.join(DIR, src)).toString('base64');
  const jpg = await p.evaluate(async (d) => {
    const img = new Image();
    await new Promise((r) => { img.onload = r; img.src = d; });
    const W = img.width, H = img.height;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const x = c.getContext('2d');
    x.drawImage(img, 0, 0);
    const px = x.getImageData(0, 0, W, H).data;

    /* a row is blank if every sampled pixel is near-white */
    const blank = new Array(H);
    for (let y = 0; y < H; y++) {
      let b = true;
      for (let s = 0; s < W; s += 7) {
        const i = (y * W + s) * 4;
        if (px[i] < 246 || px[i + 1] < 246 || px[i + 2] < 246) { b = false; break; }
      }
      blank[y] = b;
    }

    /* collapse long blank runs, but only above the chart (top 42%) so no
       plotted area is ever squashed */
    const LIMIT = Math.floor(H * 0.42), MIN = 70, KEEP = 26;
    const keep = [];
    let y = 0;
    while (y < H) {
      if (blank[y] && y < LIMIT) {
        let e = y;
        while (e < H && blank[e]) e++;
        const run = e - y;
        if (run >= MIN) { for (let k = 0; k < KEEP; k++) keep.push(y + k); }
        else for (let k = y; k < e; k++) keep.push(k);
        y = e;
      } else { keep.push(y); y++; }
    }

    const c2 = document.createElement('canvas');
    c2.width = W; c2.height = keep.length;
    const x2 = c2.getContext('2d');
    keep.forEach((sy, dy) => x2.drawImage(c, 0, sy, W, 1, 0, dy, W, 1));

    /* downscale to a sane delivery width */
    const TW = 1500, sc = Math.min(1, TW / W);
    const c3 = document.createElement('canvas');
    c3.width = Math.round(W * sc); c3.height = Math.round(keep.length * sc);
    const x3 = c3.getContext('2d');
    x3.imageSmoothingQuality = 'high';
    x3.fillStyle = '#fff'; x3.fillRect(0, 0, c3.width, c3.height);
    x3.drawImage(c2, 0, 0, c3.width, c3.height);
    return { u: c3.toDataURL('image/jpeg', 0.84), w: c3.width, h: c3.height, was: H, now: keep.length };
  }, data);

  fs.writeFileSync(path.join(DIR, out + '.jpg'), Buffer.from(jpg.u.split(',')[1], 'base64'));
  const kb = Math.round(fs.statSync(path.join(DIR, out + '.jpg')).size / 1024);
  console.log(`${out}.jpg  ${jpg.w}x${jpg.h}  ${kb}KB  (trimmed ${jpg.was - jpg.now}px)`);
}
await b.close();
