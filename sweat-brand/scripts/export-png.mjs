/* Render the statement ads to PNG at native size.
 *
 *   npx http-server -p 8899 -s .     # from sweat-brand/
 *   node scripts/export-png.mjs                    # the whole set, every size
 *   node scripts/export-png.mjs --id C4            # one ad, every size
 *   node scripts/export-png.mjs --size story-1920  # every ad, one size
 *   node scripts/export-png.mjs --scale 2          # 2x, for print or retina
 *
 * The set comes from ads/statements.js, so adding an ad there is the only
 * edit needed — nothing in this file lists them. Output goes to
 * out/<size>/<id>.png.
 *
 * <body> gets .is-exporting, which turns off the preview fit scaling, so the
 * PNG is native size whatever the window did.
 */

import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

import { STATEMENTS, SIZES } from '../ads/statements.js';

const root = new URL('..', import.meta.url).pathname;
const argv = process.argv.slice(2);

const arg = (flag, fallback) => {
  const i = argv.indexOf(flag);
  return i === -1 ? fallback : argv[i + 1];
};

const scale = Number(arg('--scale', 1));
const port = arg('--port', 8899);
const onlyId = arg('--id', null);
const onlySize = arg('--size', null);

const ads = onlyId ? STATEMENTS.filter((s) => s.id === onlyId) : STATEMENTS;
const sizes = Object.keys(SIZES).filter((s) => !onlySize || s === onlySize);

if (!ads.length) {
  console.error(`no ad with id ${onlyId} — ids are ${STATEMENTS.map((s) => s.id).join(', ')}`);
  process.exit(1);
}
if (!sizes.length) {
  console.error(`no size ${onlySize} — sizes are ${Object.keys(SIZES).join(', ')}`);
  process.exit(1);
}

const browser = await chromium.launch();
const problems = [];
let n = 0;

for (const size of sizes) {
  const dir = join(root, 'out', size);
  mkdirSync(dir, { recursive: true });

  for (const ad of ads) {
    const page = await browser.newPage({ deviceScaleFactor: scale });
    page.on('pageerror', (e) => problems.push(`${ad.id}/${size}: ${e}`));
    page.on('requestfailed', (r) => problems.push(`${ad.id}/${size}: failed ${r.url()}`));

    await page.goto(
      `http://127.0.0.1:${port}/ads/statement.html?id=${ad.id}&size=${size}`,
      { waitUntil: 'networkidle' }
    );
    await page.evaluate(() => document.body.classList.add('is-exporting'));

    const el = page.locator('.ad').first();
    const box = await el.evaluate((node) => {
      const cs = getComputedStyle(node);
      return { w: Number(cs.getPropertyValue('--cw')), h: Number(cs.getPropertyValue('--ch')) };
    });

    if (!box.w || !box.h) {
      problems.push(`${ad.id}/${size}: .ad has no --cw/--ch`);
      await page.close();
      continue;
    }

    /* size the viewport to the ad so nothing is clipped by a short window,
       and let the webfont settle — an un-hinted first paint would put the
       fallback metrics in the PNG, and the hero is fitted by measurement */
    await page.setViewportSize({ width: box.w, height: box.h });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);

    const suffix = scale > 1 ? `@${scale}x` : '';
    await el.screenshot({ path: join(dir, `${ad.id}${suffix}.png`) });

    n += 1;
    console.log(`${size}/${ad.id}${suffix}.png  ${box.w * scale}x${box.h * scale}  ${ad.note}`);
    await page.close();
  }
}

await browser.close();

console.log(`\n${n} ad${n === 1 ? '' : 's'} written to out/`);

if (problems.length) {
  console.error(`\n${problems.join('\n')}`);
  process.exit(1);
}
