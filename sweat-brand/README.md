# Sweat Strategies — brand kit

The approved decks, and the design system they were built from, in one folder.
The system is the same one that runs [sweatstrategies.com](https://sweatstrategies.com) —
lifted from the site rather than reinterpreted — so an ad made here and the
site and the decks all look like the same company.

```
decks/      the six approved PDFs, 16:9, ready to send
system/     the design system: tokens, treatments, the typeface
ads/        four ad templates you edit and re-export
img/        the licensed photography, already treated
out/        exported PNGs — what you actually upload
scripts/    build the tokens, treat a new photo, export the ads
```

## The decks

| Deck | Pages | For |
|---|---|---|
| `Sweat-Strategies-Proposal-2026.pdf` | 17 | An artist with a song |
| `Sweat-Labels-Proposal-2026.pdf` | 19 | A label with a record |
| `Sweat-Cross-Platform-Proposal-2026.pdf` | 24 | Full Funnel Deck — an established artist already spending |
| `Sweat-Case-Studies-Independent-Artists.pdf` | 16 | Evidence, every case |
| `Sweat-Case-Studies-Labels.pdf` | 12 | Evidence, above 10K streams a day |
| `Sweat-Case-Studies-Labels-Anonymised.pdf` | 14 | Evidence, no names — for email |

Authored in [`../sweat-strategies-deck/`](../sweat-strategies-deck/). Edit copy
there and re-export; these are the output, not the source.

> Three of these still carry an unlicensed iStock laptop mockup on their
> reporting slide. It is **not** in this folder and nothing here uses it, but
> the PDFs above do — see the notes in the deck README before sending one to a
> client.

## Making an ad

```bash
npm install                 # once
npm run serve               # in one terminal
npm run export              # in another — every template to out/
```

Then: open `ads/square-1080.html`, edit the copy in place, reload, re-export.
That is the whole loop. The templates are plain HTML — there is no build step
between what you write and what comes out.

```bash
npm run export -- story-1920.html     # just one
npm run export:2x                     # 2x, for print or a retina placement
```

| Template | Size | Shape |
|---|---|---|
| `square-1080.html` | 1080×1080 | Feed post. Typographic — the headline is the picture. |
| `portrait-1350.html` | 1080×1350 | Feed post 4:5. A bent artist card over the figures. |
| `story-1920.html` | 1080×1920 | Story / Reel / TikTok. Full-bleed photograph, copy over the fade. |
| `landscape-1200.html` | 1200×628 | Link preview, display banner. One number, one line. |

### A new size

Copy the nearest template and change two numbers:

```html
<div class="ad grain" style="--cw:1440; --ch:1440">
```

`--cw` and `--ch` are the pixel size, and the exporter reads them off the
element — so the file is the only place its dimensions are written down. Every
size in the system is a multiple of `--u`, which is derived from `--cw`, so the
whole thing rescales on its own.

## How the scale works

The deck is authored at 1920×1080 and every size in `tokens.json` is the number
it takes there — display type at 176px, the gutter at 96px, and so on. In CSS
each one is emitted as `calc(N * var(--u))`.

```
--u  =  --cw × 1px ÷ --uref
```

`--uref` is the width at which those numbers land at face value. Leave it at
1920 and an ad is a straight proportional shrink of a slide. **The templates
run it at 1080**, because an ad is read on a phone at a fraction of the size a
slide is projected at, and a proportional shrink leaves the type too small to
carry. Two of them tune it further: the story runs 960, which brings the type
up about 12% on a tall canvas that would otherwise look empty, and the
landscape runs 1200 because there the constraint is height, not width.

If an ad feels off, `--uref` is almost always the knob — not the individual
font sizes.

## The system

`system/tokens.json` is the source of truth. `system/tokens.css` is generated
from it:

```bash
npm run tokens        # tokens.json -> tokens.css
```

Edit the JSON, never the CSS. `tokens.json` is in
[W3C Design Tokens format](https://tr.designtokens.org/), so the same file
imports straight into **Figma** via Tokens Studio — colours, type scale,
tracking and spacing arrive as variables, and Figma and the ad templates stay
in step because they are reading the same file.

`system/system.css` is the treatments — everything with a look rather than a
value. Load `tokens.css` first, then `system.css`, then write markup.

### What's in it

| | |
|---|---|
| **Ground** | `#000`. Everything starts black. One light surface, `--color-paper`. |
| **Accent** | `--color-blue` `#0f65dd` — brackets, kickers, figures, the highlight fill, the CTA. `--color-blue-deep` for full-bleed fields. |
| **Display type** | Manrope 800 at `letter-spacing: -0.052em`, leading 0.92. The tracking is the signature; it is what makes a head read as one mass rather than a row of words. |
| **Labels** | Mono, uppercase, `letter-spacing: 0.16em`. Always tracked out, never in. |
| **Grain** | A fine film grain over the ground. PJ's note: "black grainy". |
| **Colour blurs** | `.blob` — a blue field under a 120px blur, thrown off a corner. The site's hamburger treatment. |
| **The spine** | `.spine` — the site's own scroll-drawn SVG path. Use `--spine-x` to push it into a gutter; dead centre is where the copy is. |
| **Bent cards** | `.bend` — `rotateY(±38deg)` on a 1700px perspective, so a card turns hard but still lies flat. The site's `.ntk-card`. |
| **Brackets** | `.bracket` — `(like this)` or `[like this]`, in blue. PJ: "I like the black background and brackets around the title slides as a theme". |
| **Highlight** | `.hl` — a blue fill behind a word. Clones across line breaks rather than boxing the block. |

Class-by-class, `system/system.css` is commented — including why each rule is
the way it is.

## The photography

Every image in `img/` has been through the site's lens treatment: a soft barrel
bulge and colour fringing that grows toward the edges, sampled per channel.
The site does it live in a WebGL shader; a shader cannot survive a PNG or PDF
export, so `scripts/lens.mjs` applies the same maths once, offline.

To add a photograph:

```bash
cp somewhere/new-artist.jpg img/_raw/
npm run lens                  # -> img/new-artist.jpg, treated
```

An untreated image dropped straight into an ad will sit visibly flat against
everything else in the system.

**Sixteen files, all licensed** — thirteen artist shots plus the wordmark and
favicon. Disclosure, Bonobo, Thundercat, Blond:Ish, The Knocks, St Lundi,
Morly, Dolores Forever, Kid Apollo, Rules, Betsy, RobRobRob x Tailor, The
Listros, Harry T. That is the whole set: Swedish House Mafia, Lykke Li and
Rudimental are not in it and cannot be added without supplied or licensed
photography.

Harry T's is 447×447 — too small for anything larger than a small card. Check a
file's real size before putting it in a full-bleed slot rather than letting it
upscale.

## House rules

Four things the deck work established the hard way.

**1. A photograph next to a figure claims that figure.** Whatever the caption
says, a face beside a number reads as that number's artist. The V3 deck put
Harry T's 0→8M / £6K / 24p against Cristoph and it had to be unpicked. If you
have not got a photograph of the artist who owns the number, run the ad
typographically — `landscape-1200.html` is built that way on purpose.

**2. Never warp a chart or a screenshot.** The lens treatment is for
photography only. Bending data misrepresents it.

**3. State what we do, not what doesn't work.** No channel line should argue
that something fails — that is the Full Funnel Deck's rule and it holds
everywhere. And none of it in ad-platform vocabulary: campaign objectives,
pixels and cost-per-result are the media buyer's language, not the reader's.

**4. Criticise the practice, never the reader.** The label deck's problem slide
is phrased at the workflow, because the person reading it probably runs that
team. Same for anything here.

## Files

```
decks/                     six approved PDFs
system/
  tokens.json              source of truth — also the Figma import
  tokens.css               GENERATED by npm run tokens
  system.css               the treatments
  fonts/                   Manrope variable, 200–800
ads/
  frame.js                 draws the spine, fits the preview to the window
  square-1080.html         1080×1080
  portrait-1350.html       1080×1350
  story-1920.html          1080×1920
  landscape-1200.html      1200×628
img/                       licensed photography, lens-treated
  _raw/                    drop untreated files here for npm run lens
out/                       exported PNGs
scripts/
  build-tokens.mjs         tokens.json -> tokens.css
  lens.mjs                 bake the site's lens into a photograph
  export-png.mjs           templates -> out/, at native size
```
