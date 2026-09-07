/* Inline the whole deck into one self-contained HTML file.
 *
 *   node scripts/build-standalone.mjs [outfile]
 *
 * Every asset becomes a data URI and both modules are concatenated into a
 * single inline script, so the result works with no server and no network —
 * which is what hosting it as a shareable page requires.
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = new URL('..', import.meta.url).pathname;
const slidesFile = process.argv[2] || 'slides.js';
const out = process.argv[3] || join(root, 'deck-standalone.html');
const title = process.argv[4] || 'Sweat Strategies — Proposal 2026';

const MIME = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.ttf': 'font/ttf',
};

const dataUri = (path) => {
  const type = MIME[extname(path).toLowerCase()];
  if (!type) throw new Error(`no mime for ${path}`);
  return `data:${type};base64,${readFileSync(path).toString('base64')}`;
};

/* ---- assets ---- */

const assets = new Map();
for (const dir of ['assets/img', 'assets/fonts']) {
  for (const f of readdirSync(join(root, dir))) {
    assets.set(`${dir.startsWith('assets/img') ? 'assets/img' : 'assets/fonts'}/${f}`, dataUri(join(root, dir, f)));
  }
}

const inlineAssets = (text) => {
  let result = text;
  // longest keys first so e.g. artist__bonobo-compress.webp wins over any prefix
  for (const key of [...assets.keys()].sort((a, b) => b.length - a.length)) {
    result = result.split(key).join(assets.get(key));
  }
  return result;
};

/* ---- css ---- */

const css = inlineAssets(readFileSync(join(root, 'deck.css'), 'utf8'));

/* ---- js: concatenate parts + slides + engine, stripping the module seams ---- */

/* Swap the image resolver for a data-URI lookup keyed on bare filename.
   Only images this deck actually names get inlined — assets/img holds the
   originals for every deck plus the raw uploads, and carrying all of them
   would triple the page for no reason. */
const slidesSrc = readFileSync(join(root, slidesFile), 'utf8');

/* the case-study decks keep their cases in a shared module; the proposal
   doesn't, so only pull it in when the slide file actually imports it */
const usesCases = /from '\.\/cases\.js'/.test(slidesSrc);
const casesSrc = usesCases ? readFileSync(join(root, 'cases.js'), 'utf8') : '';

/* Work out which images to inline by importing the slide module and reading
   the markup it actually produces, rather than grepping the source. Source
   text over-matches badly: cases.js names both the identifying screenshot
   and its anonymised crop for every case, so a text scan put the originals
   inside the anonymised build — which is the one deck whose whole purpose
   is not to carry them. */
const { SLIDES } = await import(pathToFileURL(join(root, slidesFile)).href);
const rendered = SLIDES.map((s) => s.html).join('\n');
const used = new Set([...rendered.matchAll(/assets\/img\/([^"')\s]+)/g)].map((m) => m[1]));

const byName = Object.fromEntries(
  [...assets]
    .filter(([k]) => k.startsWith('assets/img/'))
    .map(([k, v]) => [k.slice('assets/img/'.length), v])
    .filter(([name]) => used.has(name)),
);
console.log(`  ${used.size} images referenced, ${Object.keys(byName).length} inlined`);

const parts = readFileSync(join(root, 'parts.js'), 'utf8').replace(
  /^export const img = \(name\) => `\$\{IMG\}\/\$\{name\}`;$/m,
  `const __IMG__ = ${JSON.stringify(byName)};\nconst img = (name) => __IMG__[name];`
);

const slides = readFileSync(join(root, slidesFile), 'utf8');

const deck = readFileSync(join(root, 'deck.js'), 'utf8');

/* Same directory, no name collisions — plain concatenation is a valid bundle
   once the import lines and export keywords are stripped. Renamed imports
   are the one thing that can't just be deleted: `import { named as c }`
   leaves `c` undefined, so it becomes a local alias instead. */
const strip = (src) => src
  .replace(/^import\s+\{([^}]*)\}\s+from\s+'\.\/[^']*';\s*$/gm, (_, names) =>
    names
      .split(',')
      .map((n) => n.trim().match(/^(\S+)\s+as\s+(\S+)$/))
      .filter(Boolean)
      .map(([, from, to]) => `const ${to} = ${from};`)
      .join('\n'))
  .replace(/^import\s+[^;]*from\s+'\.\/[^']*';\s*$/gm, '')
  .replace(/^export\s+(const|function)/gm, '$1');

/* cases before slides — the slide file references the case constants */
const js = inlineAssets(
  `${strip(parts)}\n${strip(casesSrc)}\n${strip(slides)}\n${strip(deck)}\n`
  + `mount(SLIDES, typeof OPTS === 'undefined' ? {} : OPTS);`,
);

/* ---- page ---- */

const html = `<title>${title}</title>
<style>
${css}
</style>

<div id="stage">
  <div id="scaler"></div>
</div>

<nav id="rail" aria-label="Slides"></nav>
<div id="hint">← → to move</div>

<script type="module">
${js}
</script>
`;

writeFileSync(out, html);
console.log(`wrote ${out} — ${(Buffer.byteLength(html) / 1024 / 1024).toFixed(2)}MB`);
