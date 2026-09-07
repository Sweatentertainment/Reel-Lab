/* Render the ad set to the A/B test kit.
 *
 *   npx http-server -p 8899 -s .     # from sweat-brand/
 *   node scripts/export-png.mjs                    # every variant × ad × size
 *   node scripts/export-png.mjs --variant A        # one cell
 *   node scripts/export-png.mjs --id C4            # one ad
 *   node scripts/export-png.mjs --size portrait-1350
 *   node scripts/export-png.mjs --format png       # lossless instead of jpeg
 *   node scripts/export-png.mjs --scale 2          # 2x
 *
 * Writes ab-test/<variant-slug>/<id>__<variant>__<w>x<h>.jpg, plus a
 * manifest.csv and a contact sheet. The variant and the size are in the
 * FILENAME as well as the path, because Meta's asset library flattens
 * folders on upload — once they are in there the directory is gone and an
 * ad called C4.jpg is unidentifiable.
 *
 * JPEG by default. The grain is noise, which PNG cannot compress, so the
 * lossless set runs about 700KB an asset and 132 of them is most of a
 * gigabyte. At q92 the same asset is nearer 200KB, and the platform
 * re-encodes on upload regardless. --format png if something needs it.
 *
 * The set, the sizes and the variants all come from ads/statements.js.
 * Nothing is listed here.
 */

import { chromium } from 'playwright';
import { mkdirSync, writeFileSync, rmSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

import { STATEMENTS, SIZES, VARIANTS, DESIGN } from '../ads/statements.js';

const root = new URL('..', import.meta.url).pathname;
const out = join(root, 'ab-test');
const argv = process.argv.slice(2);

const arg = (flag, fallback) => {
  const i = argv.indexOf(flag);
  return i === -1 ? fallback : argv[i + 1];
};

const scale = Number(arg('--scale', 1));
const port = arg('--port', 8899);
const format = arg('--format', 'jpeg') === 'png' ? 'png' : 'jpeg';
const onlyId = arg('--id', null);
const onlySize = arg('--size', null);
const onlyVariant = arg('--variant', null);

const ads = onlyId ? STATEMENTS.filter((s) => s.id === onlyId) : STATEMENTS;
const sizes = Object.keys(SIZES).filter((s) => !onlySize || s === onlySize);
const variants = Object.keys(VARIANTS).filter((v) => !onlyVariant || v === onlyVariant);

const bail = (msg) => { console.error(msg); process.exit(1); };
if (!ads.length) bail(`no ad ${onlyId} — ids are ${STATEMENTS.map((s) => s.id).join(', ')}`);
if (!sizes.length) bail(`no size ${onlySize} — sizes are ${Object.keys(SIZES).join(', ')}`);
if (!variants.length) bail(`no variant ${onlyVariant} — variants are ${Object.keys(VARIANTS).join(', ')}`);

/* A full run owns the variant folders, so renaming a cell cannot leave a
   stale one behind for someone to upload by mistake. Only the directories
   go — top-level files are documentation, and the ones this script writes
   are overwritten below anyway. */
const full = !onlyId && !onlySize && !onlyVariant;
if (full && existsSync(out)) {
  for (const e of readdirSync(out, { withFileTypes: true })) {
    if (e.isDirectory()) rmSync(join(out, e.name), { recursive: true, force: true });
  }
}

const ext = format === 'png' ? 'png' : 'jpg';
const browser = await chromium.launch();
const problems = [];
const rows = [];

for (const v of variants) {
  const variant = VARIANTS[v];
  const dir = join(out, `${v}-${variant.slug}`);
  mkdirSync(dir, { recursive: true });

  for (const size of sizes) {
    for (const ad of ads) {
      const page = await browser.newPage({ deviceScaleFactor: scale });
      page.on('pageerror', (e) => problems.push(`${v}/${ad.id}/${size}: ${e}`));
      page.on('requestfailed', (r) => problems.push(`${v}/${ad.id}/${size}: failed ${r.url()}`));

      const qs = new URLSearchParams({
        id: ad.id,
        size,
        layout: variant.layout,
        ground: variant.ground,
        cta: variant.cta ? '1' : '0',
        mark: variant.mark ? '1' : '0',
      });

      await page.goto(`http://127.0.0.1:${port}/ads/statement.html?${qs}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.body.classList.add('is-exporting'));

      const el = page.locator('.ad').first();
      const box = await el.evaluate((node) => {
        const cs = getComputedStyle(node);
        return { w: Number(cs.getPropertyValue('--cw')), h: Number(cs.getPropertyValue('--ch')) };
      });

      if (!box.w || !box.h) {
        problems.push(`${v}/${ad.id}/${size}: .ad has no --cw/--ch`);
        await page.close();
        continue;
      }

      /* size the viewport to the ad so nothing is clipped by a short window,
         and let the webfont settle — an un-hinted first paint would put the
         fallback metrics in the file, and the hero is fitted by measurement */
      await page.setViewportSize({ width: box.w, height: box.h });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(300);

      const w = box.w * scale;
      const h = box.h * scale;
      const file = `${ad.id}__${v}__${w}x${h}.${ext}`;

      await el.screenshot({
        path: join(dir, file),
        ...(format === 'jpeg' ? { type: 'jpeg', quality: 92 } : {}),
      });

      rows.push({ file, path: `${v}-${variant.slug}/${file}`, variant: v, ...variant, id: ad.id, size, w, h, ad });
      await page.close();
    }
  }
  console.log(`${v}  ${variant.slug.padEnd(16)}  ${rows.filter((r) => r.variant === v).length} assets`);
}

await browser.close();

/* ------------------------------------------------------------- manifest */

/* Written so results can be joined back to the creative afterwards: the ad
   platform reports on a filename, and this is what turns that filename back
   into a cell and a piece of copy. */
const csv = (s) => `"${String(s).replace(/"/g, '""')}"`;

if (full) {
  writeFileSync(join(out, 'manifest.csv'),
    ['file,variant,layout,ground,ad,size,width,height,hero,sub']
      .concat(rows.map((r) => [
        csv(r.path), r.variant, r.layout, r.ground, r.id, r.size, r.w, r.h,
        csv(r.ad.hero), csv(r.ad.sub),
      ].join(',')))
      .join('\n') + '\n');

  /* ---------------------------------------------------------- contact sheet */

  const cells = Object.entries(VARIANTS).filter(([v]) => variants.includes(v));
  const primary = sizes.includes('portrait-1350') ? 'portrait-1350' : sizes[0];

  const sheet = `<!doctype html>
<meta charset="utf-8">
<title>Sweat — A/B kit</title>
<style>
  :root { color-scheme: light dark; }
  body { font: 15px/1.5 system-ui, sans-serif; margin: 0; padding: 40px; background: #16181c; color: #eee; }
  h1 { font-size: 22px; margin: 0 0 6px; }
  p  { color: #9aa0a8; max-width: 70ch; }
  h2 { font-size: 15px; margin: 44px 0 4px; text-transform: uppercase; letter-spacing: .12em; }
  h2 span { color: #6f7681; font-weight: 400; letter-spacing: 0; text-transform: none; }
  .row { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 14px; margin-top: 14px; }
  figure { margin: 0; }
  img { width: 100%; display: block; border-radius: 5px; background: #000; }
  figcaption { color: #6f7681; font-size: 12px; margin-top: 6px; font-family: ui-monospace, monospace; }
</style>
<h1>A/B kit — ${rows.length} assets</h1>
<p>Four cells, a 2&times;2 of layout &times; ground. Copy and furniture are identical
across all of them, so the only difference between A and B is the ground and the
only difference between A and C is the layout. Showing ${primary}; every ad is
also built at ${sizes.filter((s) => s !== primary).join(' and ')}.</p>
${cells.map(([v, cfg]) => `
<h2>${v} — ${cfg.slug} <span>${cfg.layout} layout, ${cfg.ground} ground</span></h2>
<div class="row">
${rows.filter((r) => r.variant === v && r.size === primary).map((r) => `
  <figure><img src="${r.path}" alt="${r.id}" loading="lazy"><figcaption>${r.id}</figcaption></figure>`).join('')}
</div>`).join('')}
`;

  writeFileSync(join(out, 'index.html'), sheet);
}

console.log(`\n${rows.length} assets in ab-test/${full ? '  ·  manifest.csv + index.html written' : ''}`);

if (problems.length) {
  console.error(`\n${problems.join('\n')}`);
  process.exit(1);
}
