# The deck engine

`deck.js` is content-agnostic — each page imports its own slide module and
calls `mount(SLIDES)`. You are only writing content. Do not edit `deck.js`,
`deck.css`, `parts.js` or `cases.js`, because every other deck renders off
them.

- [The two files you create](#the-two-files-you-create)
- [The slide object](#the-slide-object)
- [Classes](#classes)
- [Fragments from parts.js](#fragments-from-partsjs)
- [Case studies from cases.js](#case-studies-from-casesjs)
- [Local archetypes](#local-archetypes)
- [Layout traps](#layout-traps)
- [Verifying and exporting](#verifying-and-exporting)

## The two files you create

**`<name>-proposal.html`** — copy any existing shell and change the
`<title>` and the import. Nothing else varies.

```html
<script type="module">
  import { SLIDES } from './slides-<name>.js';
  import { mount } from './deck.js';
  mount(SLIDES);
</script>
```

`mount` takes an optional second argument but only reads `opts.legal`, which
replaces the footer line. Do not pass an options object for anything else.

**`slides-<name>.js`** — exports `SLIDES`, an array of slide objects.

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

## Classes

Read `deck.css` when you need something not listed here; it is commented
throughout with the reasoning.

**Layout** — `.pad` is the frame gutter and every slide's content sits in
one. Combine with `.l-mid` (vertically centred), `.l-end` (bottom),
`.l-centre` (centred both ways), `.l-split` (two columns) or
`.l-split--wide-left`.

**Type** — `.display` with `--xl` / `--l` / `--m` / `--s` for headings;
`.body` for copy; `.label` for the mono uppercase eyebrow; `.kicker` for a
blue sub-headline; `.tier` for a small blue label above a price.

**Furniture** — `.rule` is a hairline divider. `.stats` is a `<dl>` of big
blue figures. `.channels` is a row of pill chips. `.steps` is the numbered
grid used for most multi-column content — a `<li>` with a `<span>` label,
then whatever you like inside. `.flow` is the connected-node journey used
for timelines and sequences: `<li class="flow__node">` with `.flow__n`,
`.flow__t`, `.flow__b`, and `flow__node--human` to mark the last node in
white. `.dashbox` and `.halfmedia` exist for media-heavy slides.

**Grounds** — `.field` paints the blue gradient, `.field--dark` the deep
navy. Both go before `.pad` in the markup, as a sibling.

**Motion** — add `reveal` to anything that should animate in, and stagger
with `style="--d:.2s"`. Frozen on their end state in print, so PDFs are
unaffected.

**Emphasis** — `.bracket` wraps a phrase in blue brackets,
`.bracket--light` on a blue field, `.bracket--sq` for square ones. `.hl` is
a blue fill behind a word. `.display:has(.hl)` gets a looser line-height
automatically, because a fill is taller than the type and laps the line
above at display leading.

## Fragments from parts.js

```js
import { img, spine, blobs, bend, roster, browser, voicenote } from './parts.js';

img('cover.jpg')                      // resolves the assets path
spine('', dx)                         // the site's drawn centre line, nudged by dx px
blobs([{ k: 'a', pos: 'left:-220px;top:-240px;opacity:.7' }])
bend({ src, name, w, h, right, soft }) // a bent artist card with a mono label
roster()                              // the full artists + partners slide, ready-made
browser({ src, alt, url })            // a drawn browser frame around a screenshot
voicenote({ time, bars })             // a drawn Instagram voice note
```

`tile()`, `laptop()`, `caseChart()` and `caseStats()` also exist.

**`laptop()` is off limits for new work** — its frame is an unlicensed
iStock comp. `browser()` is the drawn alternative and looks better anyway.

`bend()` needs a licensed artist image. `ARTISTS` and `PARTNERS` are
exported from `parts.js` and are the single source of truth for the roster,
so a name added there appears in every deck that carries it.

## Case studies from cases.js

`cases.js` defines each case once and renders it two ways:

```js
import { named, anon } from './cases.js';

named.cristoph      // with the artist, the release and the artwork
anon.cristoph       // same numbers, header cropped, artist card dropped
```

Each is a complete slide object — drop it straight into `SLIDES`.

Use **`anon`** whenever the deck goes out over email, to a prospect, or to
anyone who has been told the case studies are anonymised. Use **`named`**
when the audience already knows the roster and the client would not mind.

The catalogue, roughly: `distracted`, `asSoonAsIGetHome`, `harryT`,
`maribouState`, `fromGoodToBad`, `ruthanne`, `forever`, `cristoph`,
`kogis`, `houseOfTheSilent`, `breatheEasy`, `artistGrowth`, `theListros`,
`admt`, `markTuan`. Read the file for what each one proves — picking the
one that matches the reader's own situation is worth more than picking the
biggest number.

**Every figure in there is real** and read off the screenshot beside it.
Spend and CPR come from Sweat's own records because Spotify does not show
them. Do not edit these to make a point; if a case does not fit, use a
different case.

## Local archetypes

Anything repeated three or more times in one deck should be a helper at the
top of the module rather than copy-pasted markup. Two that recur:

```js
/* a section divider — the bracket motif */
const act = ({ label, line, mod = '' }) => ({
  section: label,
  html: `<div class="field ${mod}"></div>
         ${blobs([{ k: 'a', pos: 'left:-260px;top:-260px;opacity:.65' },
                  { k: 'c', pos: 'right:2%;bottom:-320px;opacity:.7' }])}
         <div class="pad l-mid">
           <div class="label reveal" style="margin-bottom:40px">${label}</div>
           <h2 class="display reveal" style="--d:.1s;font-size:132px;line-height:0.98;max-width:1560px">
             <span class="bracket bracket--light">${line}</span>
           </h2>
         </div>`,
});

/* one per release, phase or step */
const phase = ({ n, date, title, headline, body, points }) => ({ ... });
```

Copy them from `slides-oneheart.js` or `slides-keyfactory.js`.

## Layout traps

The canvas is exactly 1920×1080 and there is no reflow, so these are real
and they have all bitten before.

**The spine lands on your text.** `spine('')` draws down the centre at
x=960, which is where copy usually is. Pass a `dx` that puts it in an actual
gutter. For a two-column `1fr 1fr` grid inside `.pad` with a 110px gap, the
gutter centre is near x=906, so `dx` is about −55. For a three-column grid,
often nowhere — leave it out rather than forcing it.

**`auto` grid columns space unevenly.** `repeat(3,auto)` sizes each column
to its own content, so three big figures with captions of different lengths
end up at irregular intervals and read as a mistake. Use `repeat(3,1fr)`
with a `max-width` when the columns should feel evenly placed.

**The cover's chrome is baked into the artwork.** `cover.jpg` has the
wordmark and footer rendered into the JPEG, which is why covers set
`chrome: 'none'`. Place the project title away from the wordmark —
bottom-left on the 96px gutter works, and lands on dark ground so it needs
no shadow. If a title needs a drop shadow to be legible, it is in the wrong
place.

**Type does not shrink.** A headline one word too long will collide or
overflow. Shorten the copy rather than dropping the font size, which breaks
the type scale.

**Grids do not wrap gracefully.** `.steps` with five columns at 1728px wide
gives each about 320px, which is not enough for a sentence. Four is the
comfortable maximum for copy, five for labels only.

**`.body` has a `max-width`.** Long copy in a wide slot looks strangely
narrow until you pass `max-width:none` or a wider value inline.

**Flex `justify-content: flex-end` overflows past the start edge**, which
`scrollHeight` cannot see. If you write any fitting logic, measure from the
first child's top to the last child's bottom.

## Verifying and exporting

```bash
npx http-server -p 8877 -s .
node <skill>/scripts/check-deck.mjs <name>-proposal.html --shots /tmp/deck
node scripts/export-pdf.mjs <name>-proposal.html ../sweat-brand/decks/<File>.pdf 8877
```

`?print=1` stacks every slide at full size and freezes the entrance
animations, which is what both the PDF export and the standalone flattener
rely on. Confirm the page count equals the slide count before sending.
