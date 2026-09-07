/* Measure every asset against its safe zones.
 *
 *   npx http-server -p 8899 -s .
 *   node scripts/check-safe.mjs
 *
 * Renders every variant x size x ad, measures the real bounding box of
 * everything that renders ink — the copy block's children, the wordmark, the
 * CTA — and checks each one lands inside the safe area for that size.
 *
 * Eyeballing one ad with ?safe=1 proves one ad. The hero is fitted by
 * measurement and the layouts anchor from opposite edges, so the ad most
 * likely to breach is whichever one happens to have the longest copy in the
 * layout that grows toward the chrome, and that is not knowable by looking.
 *
 * Exits non-zero on any breach.
 */

import { chromium } from 'playwright';
import { STATEMENTS, SIZES, VARIANTS } from '../ads/statements.js';

const port = process.argv.includes('--port')
  ? process.argv[process.argv.indexOf('--port') + 1] : 8899;

const browser = await chromium.launch();
const breaches = [];
const worst = {};
let n = 0;

for (const [v, cfg] of Object.entries(VARIANTS)) {
  for (const [sizeName, size] of Object.entries(SIZES)) {
    const safe = size.safe || { top: 0, right: 0, bottom: 0 };

    for (const ad of STATEMENTS) {
      const page = await browser.newPage();
      const qs = new URLSearchParams({
        id: ad.id, size: sizeName,
        layout: cfg.layout, ground: cfg.ground,
        cta: cfg.cta ? '1' : '0', mark: cfg.mark ? '1' : '0',
      });

      await page.goto(`http://127.0.0.1:${port}/ads/statement.html?${qs}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.body.classList.add('is-exporting'));
      await page.setViewportSize({ width: size.w, height: size.h });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(150);

      /* every element that puts ink on the ad, measured against the frame */
      const ink = await page.evaluate(() => {
        const ad = document.querySelector('.ad');
        const frame = ad.getBoundingClientRect();
        const nodes = [
          ...document.querySelectorAll('.blk > *'),
          ...document.querySelectorAll('.mark, .cta'),
        ];
        return nodes
          .filter((el) => el.getClientRects().length && el.textContent.trim())
          .map((el) => {
            const r = el.getBoundingClientRect();
            return {
              tag: el.className || el.tagName,
              top: r.top - frame.top,
              bottom: frame.bottom - r.bottom,
              left: r.left - frame.left,
              right: frame.right - r.right,
            };
          });
      });

      for (const el of ink) {
        const checks = [
          ['top', el.top, safe.top],
          ['bottom', el.bottom, safe.bottom],
          ['right', el.right, safe.right],
        ];
        for (const [edge, actual, required] of checks) {
          const key = `${sizeName}/${edge}`;
          if (worst[key] === undefined || actual < worst[key].actual) {
            worst[key] = { actual: Math.round(actual), required, where: `${v}/${ad.id}` };
          }
          if (actual < required - 0.5) {
            breaches.push(
              `${v}/${ad.id}/${sizeName}  ${el.tag} is ${Math.round(actual)}px from the ${edge}, needs ${required}`
            );
          }
        }
      }

      n += 1;
      await page.close();
    }
  }
}

await browser.close();

console.log(`checked ${n} assets\n`);
console.log('tightest clearance found, per size and edge:');
for (const [key, w] of Object.entries(worst)) {
  const slack = w.actual - w.required;
  console.log(
    `  ${key.padEnd(22)} ${String(w.actual).padStart(5)}px  (needs ${String(w.required).padStart(3)})` +
    `  ${slack >= 0 ? `+${slack} clear` : `${slack} BREACH`}   ${w.where}`
  );
}

if (breaches.length) {
  console.error(`\n${breaches.length} breach(es):\n${breaches.join('\n')}`);
  process.exit(1);
}
console.log('\nall clear');
