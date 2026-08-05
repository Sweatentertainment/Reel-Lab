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

const root = new URL('..', import.meta.url).pathname;
const out = process.argv[2] || join(root, 'deck-standalone.html');

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

/* ---- js: concatenate the two modules, stripping the import/export seam ---- */

/* swap the image resolver for a data-URI lookup keyed on bare filename */
const byName = Object.fromEntries(
  [...assets].filter(([k]) => k.startsWith('assets/img/')).map(([k, v]) => [k.slice('assets/img/'.length), v])
);

const slides = readFileSync(join(root, 'slides.js'), 'utf8')
  .replace(
    /^export const img = \(name\) => `\$\{IMG\}\/\$\{name\}`;$/m,
    `const __IMG__ = ${JSON.stringify(byName)};\nconst img = (name) => __IMG__[name];`
  )
  .replace(/^export\s+const/gm, 'const');

const deck = readFileSync(join(root, 'deck.js'), 'utf8')
  .replace(/^import\s+\{[^}]*\}\s+from\s+'\.\/slides\.js';\s*$/m, '');

const js = inlineAssets(`${slides}\n${deck}`);

/* ---- page ---- */

const html = `<title>Sweat Strategies — Proposal 2026</title>
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
