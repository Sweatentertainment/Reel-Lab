/* ------------------------------------------------------------------
   Flatten a deck into ONE self-contained HTML file.

   The deck normally needs four JS modules, a stylesheet, a font and an
   image sitting next to each other on a server. That is fine for local
   review and for the PDF export, but it cannot be dropped somewhere as a
   single link. This renders the deck in print mode — every slide stacked
   at full size with the entrance animations frozen — lifts the resulting
   DOM, and inlines the stylesheet, the font and every image as data
   URIs. The output has no external requests at all.

   Scaling is the one thing that has to stay live: the slides are a fixed
   1920x1080 with no reflow, so the page scales the whole stack to the
   viewport width and sets its own height to match. That is the only
   script in the output.

     node scripts/export-standalone.mjs <deck>.html <out>.html [port]
   ------------------------------------------------------------------ */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const req = createRequire(join(process.cwd(), 'package.json'));
let chromium;
try { ({ chromium } = req('playwright')); }
catch { ({ chromium } = await import('playwright')); }

const argv = process.argv.slice(2);
/* The deck's own <title> is prefixed with the agency name, which is right
   for a browser tab sitting next to six other Sweat decks and wrong for a
   page that is published under its own name. */
const ti = argv.indexOf('--title');
const titleOverride = ti === -1 ? null : argv.splice(ti, 2)[1];

const [page_, out, port = '8877'] = argv;
if (!page_ || !out) {
  console.error('usage: export-standalone.mjs <deck>.html <out>.html [port] [--title "…"]');
  process.exit(1);
}

const root = dirname(fileURLToPath(import.meta.url)) + '/..';

const MIME = {
  ttf: 'font/ttf', otf: 'font/otf', woff: 'font/woff', woff2: 'font/woff2',
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
  webp: 'image/webp', svg: 'image/svg+xml',
};

const dataURI = (rel) => {
  const ext = rel.split('.').pop().toLowerCase();
  const buf = readFileSync(join(root, rel));
  return `data:${MIME[ext] ?? 'application/octet-stream'};base64,${buf.toString('base64')}`;
};

/* ------------------------------------------------------------- render it */

const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await tab.goto(`http://127.0.0.1:${port}/${page_}?print=1`, { waitUntil: 'networkidle' });
await tab.waitForSelector('.slide');

/* A deck may carry its own <style> block — the DAVID deck rethemes the tokens
   there so the ten decks sharing deck.css stay put. Inlining deck.css alone
   silently drops that, and the export comes out in the wrong brand's colours. */
const pageStyles = await tab.evaluate(() =>
  [...document.querySelectorAll('style')].map((s) => s.textContent).join('\n'));

const { title, body, count } = await tab.evaluate(() => ({
  title: document.title,
  body: document.getElementById('scaler').innerHTML,
  count: document.querySelectorAll('.slide').length,
}));

await browser.close();

/* ------------------------------------------------------------ inline it */

/* The stylesheet keeps its own url() references, so the font goes in here
   rather than being hunted for in the markup. */
let css = readFileSync(join(root, 'deck.css'), 'utf8')
  .replace(/url\("(assets\/[^"]+)"\)/g, (_, rel) => `url("${dataURI(rel)}")`);

/* After deck.css, so a deck's own overrides still win. */
if (pageStyles.trim()) css += `\n\n/* ---- from the deck's page ---- */\n${pageStyles}`;

/* Every <img src="assets/…"> in the rendered DOM. */
let html = body.replace(/src="(assets\/[^"]+)"/g, (_, rel) => `src="${dataURI(rel)}"`);

const leftovers = [...html.matchAll(/(?:src|href)="((?!data:|mailto:|#)[^"]+)"/g)].map((m) => m[1]);
if (leftovers.length) console.warn('warning — un-inlined references:', [...new Set(leftovers)]);

writeFileSync(out, `<title>${titleOverride ?? title}</title>
<style>
${css}

/* ---- standalone: the deck as one scrolling document -------------------- */
/* Print mode already stacks the slides at full size with the animations
   frozen. All that is left is fitting a fixed 1920px stack to whatever
   width it is being read at. */
/* deck.css locks the viewport for the presenter — html, body { height:100%;
   overflow:hidden } — which is right for a deck you drive with arrow keys and
   fatal for a page you scroll. Both have to be released explicitly; setting a
   body height without this produces a document that is the right size and
   still refuses to move. */
html, body { margin: 0; height: auto; overflow: visible; overflow-x: hidden;
             background: var(--black); }

/* Each slide scales itself and then pulls the following one up by whatever
   the scale removed, so the document's own flow produces the right height.
   An earlier cut scaled one tall wrapper and set body height from script —
   which works until something upstream owns the body box, and then the page
   will not scroll at all. Layout should not depend on JS it does not have to. */
#doc { width: 100%; }
#doc .slide { position: relative; inset: auto; opacity: 1; visibility: visible;
              width: var(--w); height: var(--h);
              transform-origin: top left; transform: scale(var(--s, 1));
              margin-bottom: calc((var(--s, 1) - 1) * 1080px); }
#doc .slide .reveal { filter: none; opacity: 1; transform: none; animation: none !important; }
#doc .slide .pathline path { stroke-dashoffset: 0 !important; animation: none !important; }

/* The one interactive thing in the whole document is the contact link. */
#doc a:focus-visible { outline: 3px solid var(--blue-bright, #2a7bff); outline-offset: 4px; }
@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
</style>

<div id="doc">${html}</div>

<script>
  /* The slides are a fixed 1920x1080 and do not reflow, so the page is
     scaled to the viewport rather than laid out to it. This sets the one
     number the CSS needs; the height falls out of normal flow. */
  function fit() {
    document.documentElement.style.setProperty(
      '--s', document.documentElement.clientWidth / 1920);
  }
  addEventListener('resize', fit);
  fit();
</script>
`);

console.log(`wrote ${out} — ${count} slides, ${(readFileSync(out).length / 1e6).toFixed(1)}MB`);
