/* Render a deck and report anything wrong with it.
 *
 *   cd sweat-strategies-deck
 *   npx http-server -p 8877 -s . &
 *   node ../.claude/skills/client-proposal-deck/scripts/check-deck.mjs \
 *     oneheart-proposal.html --shots /tmp/deck
 *
 *   --port 8877        where the deck is being served
 *   --shots <dir>      write a PNG per slide, so you can actually look at them
 *   --only 2,7,11      shots for just these slides (1-indexed)
 *
 * Loads the page with ?print=1 so entrance animations are frozen on their end
 * state and every slide is laid out at once — the same mode the PDF export
 * uses, so what this checks is what gets sent.
 *
 * It reports three things:
 *
 *   console errors and failed requests — a missing asset is invisible on a
 *     black slide until it is a white gap in the PDF;
 *   text overflowing the 1080 canvas — the canvas is fixed and nothing
 *     reflows, so one word too many silently clips;
 *   slide count.
 *
 * Overflow is measured only on text inside .pad. The blobs and the spine SVG
 * are meant to bleed off the frame, and flagging them would bury the real
 * findings in noise.
 *
 * IT CANNOT TELL YOU IF THE DECK LOOKS GOOD. The spine running through a
 * column of copy, a title stranded on bright artwork, a heading colliding with
 * the wordmark — all of those pass this check and all of them were real bugs.
 * Use --shots and read the images.
 */

import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';

/* Resolve playwright from the DECK folder, not from this script's directory.
   A bare `import 'playwright'` resolves relative to this file, and the skill
   lives outside the project that has it installed — so it would fail every
   time even though playwright is sitting right there next to the deck.
   require() rather than import(): playwright is CommonJS, and dynamically
   importing a CJS file by URL does not reliably expose its named exports. */
const req = createRequire(join(process.cwd(), 'package.json'));
let chromium;
try {
  ({ chromium } = req('playwright'));
} catch {
  ({ chromium } = await import('playwright')); // globally installed
}
if (!chromium) {
  console.error('playwright not found — run npm install in the deck folder');
  process.exit(1);
}

const argv = process.argv.slice(2);
const arg = (flag, fallback) => {
  const i = argv.indexOf(flag);
  return i === -1 ? fallback : argv[i + 1];
};

const page_ = argv.find((a) => a.endsWith('.html'));
if (!page_) {
  console.error('usage: check-deck.mjs <page.html> [--port 8877] [--shots <dir>] [--only 1,2,3]');
  process.exit(1);
}

const port = arg('--port', 8877);
const shots = arg('--shots', null);
const only = arg('--only', null)?.split(',').map((n) => Number(n.trim()));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

const problems = [];
page.on('pageerror', (e) => problems.push(`page error: ${e}`));
page.on('requestfailed', (r) => problems.push(`failed request: ${r.url()}`));

await page.goto(`http://127.0.0.1:${port}/${page_}?print=1`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1800); // let the webfont settle before measuring

const count = await page.$$eval('.slide', (s) => s.length);

/* Measure against each slide's own box rather than the viewport: in print mode
   the slides are stacked, so viewport coordinates are meaningless. */
const overflow = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll('.slide').forEach((slide, i) => {
    const r = slide.getBoundingClientRect();
    slide.querySelectorAll('.pad *').forEach((el) => {
      if (!el.textContent.trim()) return;
      const b = el.getBoundingClientRect();
      const over = [];
      if (b.bottom > r.top + 1080) over.push(`${Math.round(b.bottom - r.top - 1080)}px past the bottom`);
      if (b.top < r.top) over.push(`${Math.round(r.top - b.top)}px above the top`);
      if (b.right > r.left + 1920) over.push(`${Math.round(b.right - r.left - 1920)}px past the right`);
      if (over.length) {
        out.push(`slide ${i + 1}: ${over.join(', ')} — "${el.textContent.trim().slice(0, 44)}"`);
      }
    });
  });
  return [...new Set(out)];
});

if (shots) {
  mkdirSync(shots, { recursive: true });
  const wanted = only || Array.from({ length: count }, (_, i) => i + 1);
  for (const n of wanted) {
    await page.locator('.slide').nth(n - 1).screenshot({
      path: join(shots, `${String(n).padStart(2, '0')}.png`),
    });
  }
}

await browser.close();

console.log(`slides: ${count}`);
console.log(`overflow: ${overflow.length ? '\n  ' + overflow.join('\n  ') : 'none'}`);
console.log(`problems: ${problems.length ? '\n  ' + problems.join('\n  ') : 'none'}`);
if (shots) console.log(`\nwrote ${(only || []).length || count} PNGs to ${shots} — now go and look at them`);

process.exit(overflow.length || problems.length ? 1 : 0);
