/* Cut the laptop out of PJ's stock mockup and measure its screen opening.
 *
 *   node scripts/cut-laptop.mjs
 *
 * The source is a 612x408 illustration of a laptop sitting on a transparency
 * checkerboard — the checker is baked into the JPEG, so it has to be knocked
 * out rather than simply used as alpha.
 *
 * Two flood fills do it: one from the border, which clears everything around
 * the laptop, and one from the middle of the screen, which clears the display
 * so the dashboard can show through from behind. Both accept only neutral,
 * bright pixels (the checker's two tones are 227 and 246 grey), so the silver
 * of the body — and its specular highlights, which run to 255 but aren't
 * connected to either seed — survive.
 *
 * The script prints the screen opening as percentages of the trimmed frame.
 * Those numbers are what `.lap__screen` in deck.css is positioned with, so if
 * the source image is ever swapped, re-run this and copy them across.
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const DIR = 'assets/img';
const SRC = 'istockphoto-1402355455-612x612.jpg';
const OUT = 'laptop.png';
const SCALE = 3; /* it's a small source and it carries a whole slide */

const data = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(DIR, SRC)).toString('base64');

const b = await chromium.launch();
const p = await b.newPage();
const res = await p.evaluate(async ({ d, scale }) => {
  const img = new Image();
  await new Promise((r) => { img.onload = r; img.src = d; });
  const W = img.width, H = img.height;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const x = c.getContext('2d');
  x.drawImage(img, 0, 0);
  const id = x.getImageData(0, 0, W, H);
  const px = id.data;

  /* the checkerboard: grey, and one of two bright tones. Anything coloured or
     darker than the darker tone is the laptop. */
  const isGround = (i) => {
    const r = px[i], g = px[i + 1], bl = px[i + 2];
    const mx = Math.max(r, g, bl), mn = Math.min(r, g, bl);
    return mx - mn <= 8 && mn >= 216;
  };

  const seen = new Uint8Array(W * H);
  const fill = (seeds) => {
    const box = { x0: W, y0: H, x1: 0, y1: 0, n: 0 };
    const stack = [...seeds];
    while (stack.length) {
      const q = stack.pop();
      if (q < 0 || q >= W * H || seen[q]) continue;
      if (!isGround(q * 4)) continue;
      seen[q] = 1;
      const qx = q % W, qy = (q / W) | 0;
      if (qx < box.x0) box.x0 = qx;
      if (qx > box.x1) box.x1 = qx;
      if (qy < box.y0) box.y0 = qy;
      if (qy > box.y1) box.y1 = qy;
      box.n++;
      if (qx > 0) stack.push(q - 1);
      if (qx < W - 1) stack.push(q + 1);
      if (qy > 0) stack.push(q - W);
      if (qy < H - 1) stack.push(q + W);
    }
    return box;
  };

  /* 1. everything outside the laptop */
  const border = [];
  for (let X = 0; X < W; X++) { border.push(X); border.push((H - 1) * W + X); }
  for (let Y = 0; Y < H; Y++) { border.push(Y * W); border.push(Y * W + W - 1); }
  fill(border);

  /* 2. the display, walled off from the border fill by the bezel */
  const screen = fill([((H >> 1) * W) + (W >> 1)]);

  /* A hard mask leaves a light fringe: the pixels along the laptop's outline
     are a blend of the laptop and the checker behind it, and against the
     deck's black slides that blend reads as a halo. So the edge is unmixed
     instead — P = a*F + (1-a)*B, with B the checker's mean tone and F taken
     from the nearest pixel that is clear of the boundary. Solving for a
     gives a real alpha, and the pixel is repainted as F so no ground tone
     survives in it.

     The same sum disposes of the soft contact shadow the mockup is drawn
     with, which is a faint darkening of the checker and so resolves to a
     very low alpha — hence the gate. On a black slide that shadow would be
     a grey smudge under the machine. */
  const B = 236;
  const GATE = 0.45;
  const near = (i, d) => {
    for (let dy = -d; dy <= d; dy++) {
      for (let dx = -d; dx <= d; dx++) {
        const j = i + dy * W + dx;
        if (j >= 0 && j < W * H && seen[j]) return true;
      }
    }
    return false;
  };

  const edge = [];
  for (let i = 0; i < W * H; i++) if (!seen[i] && near(i, 2)) edge.push(i);

  const solid = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) if (!seen[i]) solid[i] = 1;
  for (const i of edge) solid[i] = 0;

  const out = new Map();
  for (const i of edge) {
    /* nearest pixel clear of the boundary, for the laptop's own colour */
    let F = null;
    for (let d = 1; d <= 6 && !F; d++) {
      for (let dy = -d; dy <= d && !F; dy++) {
        for (let dx = -d; dx <= d && !F; dx++) {
          const j = i + dy * W + dx;
          if (j >= 0 && j < W * H && solid[j]) F = [px[j * 4], px[j * 4 + 1], px[j * 4 + 2]];
        }
      }
    }
    if (!F) { out.set(i, null); continue; }
    let a = 0;
    for (let ch = 0; ch < 3; ch++) {
      const den = B - F[ch];
      a += Math.abs(den) < 6 ? 1 : (B - px[i * 4 + ch]) / den;
    }
    a = Math.min(1, Math.max(0, a / 3));
    out.set(i, a < GATE ? null : [F, a]);
  }

  /* alpha out the ground and the edge, then find what's left */
  let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let i = 0; i < W * H; i++) {
    let keep = !seen[i];
    if (out.has(i)) {
      const e = out.get(i);
      if (!e) { keep = false; }
      else {
        px[i * 4] = e[0][0]; px[i * 4 + 1] = e[0][1]; px[i * 4 + 2] = e[0][2];
        px[i * 4 + 3] = Math.round(e[1] * 255);
      }
    }
    if (!keep) { px[i * 4 + 3] = 0; continue; }
    const ix = i % W, iy = (i / W) | 0;
    if (ix < x0) x0 = ix;
    if (ix > x1) x1 = ix;
    if (iy < y0) y0 = iy;
    if (iy > y1) y1 = iy;
  }
  x.putImageData(id, 0, 0);

  /* trim to the laptop and upscale — smoothing feathers the cut edge */
  const tw = x1 - x0 + 1, th = y1 - y0 + 1;
  const c2 = document.createElement('canvas');
  c2.width = Math.round(tw * scale);
  c2.height = Math.round(th * scale);
  const x2 = c2.getContext('2d');
  x2.imageSmoothingQuality = 'high';
  x2.drawImage(c, x0, y0, tw, th, 0, 0, c2.width, c2.height);

  const pct = (v) => +(v * 100).toFixed(3);
  return {
    u: c2.toDataURL('image/png'),
    w: c2.width,
    h: c2.height,
    trim: [x0, y0, tw, th],
    screenPx: [screen.x0, screen.y0, screen.x1 - screen.x0 + 1, screen.y1 - screen.y0 + 1],
    /* the display, as a percentage of the trimmed frame — what CSS needs */
    screen: {
      left: pct((screen.x0 - x0) / tw),
      top: pct((screen.y0 - y0) / th),
      width: pct((screen.x1 - screen.x0 + 1) / tw),
      height: pct((screen.y1 - screen.y0 + 1) / th),
      ratio: +((screen.x1 - screen.x0 + 1) / (screen.y1 - screen.y0 + 1)).toFixed(3),
    },
  };
}, { d: data, scale: SCALE });
await b.close();

fs.writeFileSync(path.join(DIR, OUT), Buffer.from(res.u.split(',')[1], 'base64'));
const kb = Math.round(fs.statSync(path.join(DIR, OUT)).size / 1024);
console.log(`${OUT}  ${res.w}x${res.h}  ${kb}KB`);
console.log(`  trimmed to ${res.trim[2]}x${res.trim[3]} at ${res.trim[0]},${res.trim[1]}`);
console.log(`  screen ${res.screenPx.join(' ')}  ratio ${res.screen.ratio}`);
console.log('  css:', JSON.stringify(res.screen));
