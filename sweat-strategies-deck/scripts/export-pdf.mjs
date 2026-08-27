/* Render the deck to a 16:9 PDF.
 *
 *   npx http-server -p 8899 -s .
 *   node scripts/export-pdf.mjs [page.html] [outfile] [port]
 *
 * Loads the page with ?print=1, which stacks every slide at full size and freezes
 * the entrance animations on their end state, then prints at 1920x1080.
 */

import { chromium } from 'playwright';

/* the approved PDFs live in the brand folder, alongside the design system —
   see ../sweat-brand/README.md */
const page_ = process.argv[2] || 'index.html';
const out = process.argv[3] || '../sweat-brand/decks/Sweat-Strategies-Proposal-2026.pdf';
const port = process.argv[4] || 8899;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

const problems = [];
page.on('pageerror', (e) => problems.push(String(e)));
page.on('requestfailed', (r) => problems.push(`failed: ${r.url()}`));

await page.goto(`http://127.0.0.1:${port}/${page_}?print=1`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500); // let the webfont settle before paginating

await page.pdf({ path: out, width: '1920px', height: '1080px', printBackground: true });
await browser.close();

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`wrote ${out}`);
