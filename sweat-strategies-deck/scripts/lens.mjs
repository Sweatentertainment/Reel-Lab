/* Bake the site's lens character into the artist photography.
 *
 *   node scripts/lens.mjs
 *
 * sweatstrategies.com renders its artist images through a WebGL shader
 * (src/shaders/fragmentShader.glsl) that samples R, G and B at progressively
 * offset UVs — so the pictures carry a soft barrel bulge and colour fringing
 * that grows toward the edges, rather than sitting flat behind a hard frame.
 *
 * A shader can't survive a PDF export, so the same maths is applied here once,
 * offline, and the results are written back as *__lens.jpg. Screenshots are
 * deliberately excluded: warping a dashboard would misrepresent the data.
 */

import { chromium } from 'playwright';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dir = join(root, 'assets/img');

const K = -0.075;      // barrel: <0 bulges the middle outward
const FRINGE = 0.0115; // radial channel separation, red out / blue in

const sources = readdirSync(dir).filter(
  (f) => (f.startsWith('artist__') || f === 'Morly.webp' || f === 'the-listros.webp') && !f.includes('__lens')
);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('about:blank');

for (const file of sources) {
  const b64 = readFileSync(join(dir, file)).toString('base64');
  const mime = file.endsWith('.webp') ? 'image/webp' : 'image/jpeg';

  const url = await page.evaluate(async ({ b64, mime, K, FRINGE }) => {
    const img = new Image();
    img.src = `data:${mime};base64,${b64}`;
    await img.decode();

    const w = img.width;
    const h = img.height;

    const src = document.createElement('canvas');
    src.width = w; src.height = h;
    src.getContext('2d').drawImage(img, 0, 0);
    const s = src.getContext('2d').getImageData(0, 0, w, h).data;

    const out = document.createElement('canvas');
    out.width = w; out.height = h;
    const octx = out.getContext('2d');
    const o = octx.createImageData(w, h);

    const cx = w / 2;
    const cy = h / 2;

    // bilinear sample of one channel, clamped at the edges
    const sample = (fx, fy, ch) => {
      const x = Math.min(w - 1, Math.max(0, fx));
      const y = Math.min(h - 1, Math.max(0, fy));
      const x0 = Math.floor(x), y0 = Math.floor(y);
      const x1 = Math.min(w - 1, x0 + 1), y1 = Math.min(h - 1, y0 + 1);
      const tx = x - x0, ty = y - y0;
      const at = (px, py) => s[(py * w + px) * 4 + ch];
      const top = at(x0, y0) * (1 - tx) + at(x1, y0) * tx;
      const bot = at(x0, y1) * (1 - tx) + at(x1, y1) * tx;
      return top * (1 - ty) + bot * ty;
    };

    for (let y = 0; y < h; y++) {
      const v = (y - cy) / cy;
      for (let x = 0; x < w; x++) {
        const u = (x - cx) / cx;
        const r2 = u * u + v * v;
        const base = 1 + K * r2;
        const i = (y * w + x) * 4;

        // each channel takes a slightly different path out from centre
        for (let ch = 0; ch < 3; ch++) {
          const f = base + (1 - ch) * FRINGE * r2;
          o.data[i + ch] = sample(cx + u * f * cx, cy + v * f * cy, ch);
        }
        o.data[i + 3] = 255;
      }
    }

    octx.putImageData(o, 0, 0);
    return out.toDataURL('image/jpeg', 0.9);
  }, { b64, mime, K, FRINGE });

  const name = file.replace(/\.(webp|jpg|jpeg|png)$/i, '__lens.jpg');
  const buf = Buffer.from(url.split(',')[1], 'base64');
  writeFileSync(join(dir, name), buf);
  console.log(`${name}  ${(buf.length / 1024).toFixed(0)}KB`);
}

await browser.close();
