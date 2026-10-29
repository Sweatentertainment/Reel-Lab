/* Bake the site's lens character into a photograph.
 *
 *   put the untreated file in  img/_raw/bonobo.webp
 *   node scripts/lens.mjs
 *   ->  img/bonobo.jpg
 *
 * sweatstrategies.com renders its artist images through a WebGL shader
 * (sweat-website/src/shaders/fragmentShader.glsl) that samples R, G and B at
 * progressively offset UVs — so the pictures carry a soft barrel bulge and
 * colour fringing that grows toward the edges, rather than sitting flat
 * behind a hard frame. Every image in img/ has been through this.
 *
 * A shader can't survive a PNG or PDF export, so the same maths is applied
 * here once, offline. Do not run it over screenshots or charts: warping data
 * misrepresents it.
 *
 * The two constants ARE the look. Changing them puts an image out of step
 * with the rest of the library and with the site.
 */

import { chromium } from 'playwright';
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const raw = join(root, 'img/_raw');
const out = join(root, 'img');

const K = -0.115;      // barrel: <0 bulges the middle outward
const FRINGE = 0.0115; // radial channel separation, red out / blue in

if (!existsSync(raw)) {
  mkdirSync(raw, { recursive: true });
  console.log('created img/_raw — drop untreated photography in there and re-run');
  process.exit(0);
}

const sources = readdirSync(raw).filter((f) => /\.(webp|jpe?g|png)$/i.test(f));

if (!sources.length) {
  console.log('img/_raw is empty — nothing to treat');
  process.exit(0);
}

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('about:blank');

for (const file of sources) {
  const b64 = readFileSync(join(raw, file)).toString('base64');
  const ext = extname(file).toLowerCase();
  const mime = ext === '.webp' ? 'image/webp' : ext === '.png' ? 'image/png' : 'image/jpeg';

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

    const dst = document.createElement('canvas');
    dst.width = w; dst.height = h;
    const dctx = dst.getContext('2d');
    const o = dctx.createImageData(w, h);

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

    dctx.putImageData(o, 0, 0);
    return dst.toDataURL('image/jpeg', 0.9);
  }, { b64, mime, K, FRINGE });

  const name = `${basename(file, extname(file))}.jpg`;
  const buf = Buffer.from(url.split(',')[1], 'base64');
  writeFileSync(join(out, name), buf);
  console.log(`img/${name}  ${(buf.length / 1024).toFixed(0)}KB`);
}

await browser.close();
