/* Render the ad templates to PNG at native size.
 *
 *   npx http-server -p 8899 -s .          # from sweat-brand/
 *   node scripts/export-png.mjs           # every template -> out/
 *   node scripts/export-png.mjs story-1920.html
 *   node scripts/export-png.mjs --scale 2 # 2x, for print or retina
 *
 * The size comes off the .ad element's own --cw / --ch, so a template that
 * changes its dimensions exports at the new ones without touching this file.
 * <body> gets .is-exporting, which turns off the preview fit scaling, so the
 * output is native size whatever the window did.
 */

import { chromium } from 'playwright';
import { readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const argv = process.argv.slice(2);

const arg = (flag, fallback) => {
  const i = argv.indexOf(flag);
  return i === -1 ? fallback : argv[i + 1];
};

const scale = Number(arg('--scale', 1));
const port = arg('--port', 8899);
const named = argv.filter((a) => a.endsWith('.html'));

const pages = named.length
  ? named
  : readdirSync(join(root, 'ads')).filter((f) => f.endsWith('.html')).sort();

mkdirSync(join(root, 'out'), { recursive: true });

const browser = await chromium.launch();
const problems = [];

for (const file of pages) {
  const page = await browser.newPage({ deviceScaleFactor: scale });
  page.on('pageerror', (e) => problems.push(`${file}: ${e}`));
  page.on('requestfailed', (r) => problems.push(`${file}: failed ${r.url()}`));

  await page.goto(`http://127.0.0.1:${port}/ads/${file}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.body.classList.add('is-exporting'));

  const ad = page.locator('.ad').first();
  const box = await ad.evaluate((el) => {
    const cs = getComputedStyle(el);
    return { w: Number(cs.getPropertyValue('--cw')), h: Number(cs.getPropertyValue('--ch')) };
  });

  if (!box.w || !box.h) {
    problems.push(`${file}: .ad has no --cw/--ch`);
    await page.close();
    continue;
  }

  /* size the viewport to the ad so nothing is clipped by a short window, and
     let the webfont settle before the shot — an un-hinted first paint puts
     the fallback metrics in the PNG */
  await page.setViewportSize({ width: box.w, height: box.h });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  const out = join(root, 'out', file.replace(/\.html$/, `${scale > 1 ? `@${scale}x` : ''}.png`));
  await ad.screenshot({ path: out });

  console.log(`${file}  ->  out/${out.split('/').pop()}  ${box.w * scale}x${box.h * scale}`);
  await page.close();
}

await browser.close();

if (problems.length) {
  console.error(`\n${problems.join('\n')}`);
  process.exit(1);
}
