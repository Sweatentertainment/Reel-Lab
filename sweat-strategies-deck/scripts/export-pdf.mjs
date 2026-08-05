/* Render the deck to a 16:9 PDF.
 *
 *   npx http-server -p 8899 -s .
 *   node scripts/export-pdf.mjs [outfile] [port]
 *
 * Loads index.html?print=1, which stacks every slide at full size and freezes
 * the entrance animations on their end state, then prints at 1920x1080.
 */

import { chromium } from 'playwright';

const out = process.argv[2] || 'Sweat-Strategies-Proposal-2026.pdf';
const port = process.argv[3] || 8899;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

const problems = [];
page.on('pageerror', (e) => problems.push(String(e)));
page.on('requestfailed', (r) => problems.push(`failed: ${r.url()}`));

await page.goto(`http://127.0.0.1:${port}/index.html?print=1`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500); // let the webfont settle before paginating

await page.pdf({ path: out, width: '1920px', height: '1080px', printBackground: true });
await browser.close();

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`wrote ${out}`);
