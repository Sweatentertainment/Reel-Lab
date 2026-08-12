# The deck engine

Everything lives in `sweat-strategies-deck/`. `deck.js` is content-agnostic —
each page imports its own slide module and calls `mount(SLIDES)`. You are only
writing content; do not edit `deck.js`, `deck.css` or `parts.js`, because six
other decks render off them.

## The two files you create

**`<client>-proposal.html`** — copy `cross-platform-proposal.html` and change
the `<title>` and the import. Nothing else varies.

```html
<script type="module">
  import { SLIDES } from './slides-<client>.js';
  import { mount } from './deck.js';
  mount(SLIDES);
</script>
```

`mount` takes an optional second argument but only reads `opts.legal`, which
replaces the footer line. Do not pass an options object for anything else.

**`slides-<client>.js`** — exports `SLIDES`, an array of slide objects.

## The slide object

```js
{
  section: 'The campaign',   // shows in the footer next to the slide number
  grain: 'soft',             // 'soft' | true | omit — film grain over the ground
  chrome: 'none',            // omit for normal chrome; 'none' on a full-bleed cover
  ground: 'light',           // optional, for the one light slide
  html: `...`,               // the slide's markup
}
```

## Classes worth knowing

Read `deck.css` when you need something not listed here; it is commented
throughout with the reasoning.

**Layout** — `.pad` is the frame gutter and every slide's content sits in one.
Combine with `.l-mid` (vertically centred), `.l-end` (bottom), `.l-centre`
(centred both ways) or `.l-split` (two columns).

**Type** — `.display` with `--xl` / `--l` / `--m` / `--s` for headings;
`.body` for copy; `.label` for the mono uppercase eyebrow; `.kicker` for a blue
sub-headline; `.tier` for a small blue label above a price.

**Furniture** — `.rule` is a hairline divider. `.stats` is a `<dl>` of big blue
figures. `.channels` is a row of pill chips. `.steps` is the numbered grid used
for most multi-column content — a `<li>` with a `<span>` label, then whatever
you like inside. `.flow` is the connected-node journey used for timelines and
sequences: `<li class="flow__node">` with `.flow__n`, `.flow__t`, `.flow__b`,
and `flow__node--human` to mark the last node in white.

**Motion** — add `reveal` to anything that should animate in, and stagger with
`style="--d:.2s"`. Frozen on their end state in print, so PDFs are unaffected.

**Emphasis** — `.bracket` wraps a phrase in blue brackets, `.bracket--light`
on a blue field, `.bracket--sq` for square ones. `.hl` is a blue fill behind a
word.

## Fragments from `parts.js`

```js
import { img, spine, blobs } from './parts.js';

img('cover.jpg')                     // resolves the assets path
spine('', dx)                        // the site's drawn centre line, nudged by dx px
blobs([{ k: 'a', pos: 'left:-220px;top:-240px;opacity:.7' }])
```

`roster()`, `bend()`, `caseChart()` and `caseStats()` also exist — see
`parts.js`. `bend()` needs a licensed artist image, so most bespoke decks will
not use it.

## Local archetypes

Anything repeated three or more times in one deck should be a local helper at
the top of the slide module rather than copy-pasted markup. Two that recur:

```js
// one per release / phase
const release = ({ n, date, title, headline, body, points }) => ({ ... });

// a section divider — the bracket motif
const act = ({ label, line, mod = '' }) => ({
  section: label,
  html: `<div class="field ${mod}"></div>
         ${blobs([...])}
         <div class="pad l-mid">
           <div class="label reveal">${label}</div>
           <h2 class="display reveal" style="font-size:132px">
             <span class="bracket bracket--light">${line}</span>
           </h2>
         </div>`,
});
```

Copy them from `slides-oneheart.js` — it is the closest model for a bespoke
client deck.

## Layout traps

The canvas is exactly 1920×1080 and there is no reflow, so these are real.

**The spine lands on your text.** `spine('')` draws down the centre at x=960,
which is where copy usually is. Pass a `dx` that puts it in an actual gutter:
for a two-column split, the gap between the columns; for a full-width grid,
often nowhere — leave it out rather than forcing it.

**The cover's chrome is baked into the artwork.** `cover.jpg` has the wordmark
and footer rendered into the JPEG, which is why covers set `chrome: 'none'`.
Place the project title away from the wordmark — bottom-left on the 96px gutter
works, and lands on dark ground so it needs no shadow. If a title needs a drop
shadow to be legible, it is in the wrong place.

**Type does not shrink.** A headline that is one word too long will collide or
overflow. Shorten the copy rather than dropping the font size, which breaks the
type scale.

**Grids do not wrap gracefully.** `.steps` with five columns at 1728px wide
gives each about 320px, which is not enough for a sentence. Four is the
comfortable maximum for copy, five for labels only.

**`.body` has a `max-width`.** Long copy in a wide slot will look strangely
narrow until you pass `max-width:none` or a wider value inline.

## Verifying

Bundled: `scripts/check-deck.mjs`. It renders every slide with animations
frozen, reports console errors, failed requests and text overflowing the
canvas, and writes a PNG per slide with `--shots`.

Overflow from `.blob` and the spine SVG is expected — they bleed off the frame
by design. The script only inspects text inside `.pad`.

## Exporting

```bash
npx http-server -p 8877 -s .
node scripts/export-pdf.mjs <client>-proposal.html \
  ../sweat-brand/decks/Sweat-<Client>-Proposal.pdf 8877
```

Loads the page with `?print=1`, which stacks every slide at full size and
freezes the entrance animations, then prints at 1920×1080. Confirm the page
count equals the slide count before sending it anywhere.
