/* ------------------------------------------------------------------
   Scaffold a new deck on the Sweat engine.

     node .claude/skills/sweat-deck/scripts/new-deck.mjs <name> "<Title>"

   Writes sweat-strategies-deck/slides-<name>.js and
   sweat-strategies-deck/<name>-proposal.html, with the header comment
   block already in place and a cover slide that renders.

   The header block is the point of this script as much as the files are.
   Every deck in the folder opens with one recording where the content came
   from, what the argument is, and what the deck deliberately leaves out —
   because the next person to edit it is usually PJ in a hurry, and they
   need to know which omissions were decisions rather than oversights. It
   is the first thing to get skipped and the first thing to be missed.

   Refuses to overwrite. If the files exist, edit them.
   ------------------------------------------------------------------ */

import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const [name, title] = process.argv.slice(2);

if (!name || !/^[a-z0-9][a-z0-9-]*$/.test(name)) {
  console.error('usage: new-deck.mjs <name> "<Title>"');
  console.error('  <name> is lowercase, digits and hyphens — it becomes the filename');
  process.exit(1);
}

/* Walk up from the script to the repo root, so this works from anywhere. */
const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../../../..');
const deckDir = join(root, 'sweat-strategies-deck');

if (!existsSync(deckDir)) {
  console.error(`no sweat-strategies-deck/ at ${root} — run this from inside the repo`);
  process.exit(1);
}

const deckTitle = title || name;
const slides = join(deckDir, `slides-${name}.js`);
const shell = join(deckDir, `${name}-proposal.html`);

for (const f of [slides, shell]) {
  if (existsSync(f)) {
    console.error(`${f} already exists — edit it rather than scaffolding over it`);
    process.exit(1);
  }
}

const SLIDES = `/* ------------------------------------------------------------------
   ${deckTitle}

   WHICH DECK THIS IS A VARIANT OF. Name it, and lift its treatments
   rather than inventing new ones — matching an existing deck is a copy
   job and any flourish added here is drift.

   SOURCES. Where every specific figure and name came from. Anything
   attributed to the reader should be theirs, not invented.

   THE ARGUMENT. The one sentence this deck is trying to land, and whose
   sentence it is. If it cannot be stated here it will not be stated in
   twenty slides.

   WHAT THIS DECK MUST NOT DO. The exclusions, and why each one is a
   decision rather than an oversight. Assume the document gets forwarded
   to people nobody mentioned.

   PHOTOGRAPHY. Which licensed images are used, or a note that the deck
   runs typographically because none exists for this subject.
   ------------------------------------------------------------------ */

import { img, spine, blobs, bend, roster, browser } from './parts.js';
import { named, anon } from './cases.js';

/* ------------------------------------------------------- local archetypes */

/* A section divider — the bracket motif. */
const act = ({ label, line, mod = '' }) => ({
  section: label,
  html: \`
    <div class="field \${mod}"></div>
    \${blobs([
      { k: 'a', pos: 'left:-260px;top:-260px;opacity:.65' },
      { k: 'c', pos: 'right:2%;bottom:-320px;opacity:.7' },
    ])}
    <div class="pad l-mid">
      <div class="label reveal" style="margin-bottom:40px">\${label}</div>
      <h2 class="display reveal" style="--d:.1s;font-size:132px;line-height:0.98;max-width:1560px">
        <span class="bracket bracket--light">\${line}</span>
      </h2>
    </div>\`,
});

export const SLIDES = [
  /* 01 — cover. The artwork carries its own chrome, which is why this sets
     chrome:'none'. The title sits on the deck's own 96px gutter, low left,
     where the ground is already dark and needs no shadow. */
  {
    section: 'Proposal',
    chrome: 'none',
    html: \`
      <div style="position:absolute;inset:0;z-index:0">
        <img src="\${img('cover.jpg')}" alt="" style="width:100%;height:100%;object-fit:cover">
      </div>
      <div class="reveal" style="--d:.5s;position:absolute;left:96px;bottom:172px;z-index:20">
        <div style="font-family:var(--mono);text-transform:uppercase;font-size:26px;letter-spacing:0.24em;color:#fff">
          ${deckTitle}
        </div>
      </div>\`,
  },

  /* 02 — the hook. One sentence, set big. Theirs, not yours. */
  {
    section: 'Proposal',
    html: \`
      <div class="field"></div>
      \${blobs([
        { k: 'a', pos: 'left:-220px;top:-240px;opacity:.7' },
        { k: 'c', pos: 'right:4%;top:-160px;opacity:.85' },
      ])}
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:44px">Replace this label</div>
        <h1 class="display reveal" style="--d:.1s;font-size:132px;line-height:0.96;color:#fff;max-width:1560px">
          The one line<br>this deck argues.
        </h1>
        <p class="body reveal" style="--d:.26s;font-size:27px;max-width:1000px;margin-top:60px">
          A sentence or two underneath it, saying what the rest of the deck does about that.
        </p>
      </div>\`,
  },

  act({ label: 'Section', line: 'A short bracketed line' }),

  /* Build the rest here. Read references/engine.md for the classes and the
     layout traps, and copy treatments from the parent deck rather than
     inventing them. */
];
`;

const SHELL = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sweat Strategies — ${deckTitle}</title>
  <link rel="shortcut icon" href="assets/img/sweat-favicon.png" type="image/x-icon">
  <meta name="robots" content="noindex,nofollow">
  <link rel="stylesheet" href="deck.css">
</head>
<body>
  <div id="stage">
    <div id="scaler"></div>
  </div>

  <nav id="rail" aria-label="Slides"></nav>
  <div id="hint">← → to move</div>

  <script type="module">
    import { SLIDES } from './slides-${name}.js';
    import { mount } from './deck.js';
    mount(SLIDES);
  </script>
</body>
</html>
`;

mkdirSync(deckDir, { recursive: true });
writeFileSync(slides, SLIDES);
writeFileSync(shell, SHELL);

console.log(`wrote slides-${name}.js and ${name}-proposal.html

next:
  cd sweat-strategies-deck
  npx http-server -p 8877 -s . &
  node ../.claude/skills/sweat-deck/scripts/check-deck.mjs ${name}-proposal.html --shots /tmp/${name}

then fill in the header comment block before you fill in the slides — it is
the part that gets skipped and the part the next editor needs.`);
