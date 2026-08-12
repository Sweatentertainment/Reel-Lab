# Sweat Strategies — brand kit

The approved decks, and the design system they were built from, in one folder.
The system is the same one that runs [sweatstrategies.com](https://sweatstrategies.com) —
lifted from the site rather than reinterpreted — so an ad made here and the
site and the decks all look like the same company.

```
decks/      the six approved PDFs, 16:9, ready to send
system/     the design system: tokens, treatments, the typeface
ads/        the statement ads — copy in statements.js, one renderer
img/        the licensed photography, already treated
ab-test/    132 exported assets, four design cells — what you upload
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

## The ads

Eleven statement ads — **the C set** — drawn from the twelve case studies in
`decks/Sweat-Case-Studies-Labels-Anonymised.pdf`. Pure text, no screenshots,
no photography, no CTA in the image (see below).

**Anonymous by construction.** No artist, track, label or partner is named
anywhere in the set, and the layout carries no photography — a face beside a
figure identifies a campaign as surely as a name does. That is what lets these
run at all. Every figure is real.

```bash
npm install                 # once
npm run serve               # in one terminal
npm run export              # in another — 11 ads × 4 cells × 3 sizes
```

```bash
npm run export -- --variant A          # one design cell
npm run export -- --id C4              # one ad
npm run export -- --size story-1920    # one size
npm run export -- --format png         # lossless instead of jpeg
```

Output lands in `ab-test/<cell>/<id>__<variant>__<w>x<h>.jpg`, with a
`manifest.csv` and a contact sheet — see [`ab-test/README.md`](ab-test/README.md)
for how the test is set up and how to read it. To preview one in a browser:
`ads/statement.html?id=C4&size=story-1920`.

### The four cells

A clean 2×2 of layout × ground, with the CTA and the wordmark held off in all
of them so neither can confound the result.

|  | paper | dark |
|---|---|---|
| **editorial** | A | B |
| **statement** | C | D |

`VARIANTS` in `statements.js` defines them. 11 ads × 4 cells × 3 sizes = 132
assets, 22MB, about four minutes to build.

| | Ad | Hero |
|---|---|---|
| **C1** | EP, compounding audience | 48.9 million streams on one EP. In twelve months. |
| **C2** | Album, year-on-year | 73.8 million streams. Up 437% year on year. |
| **C3** | Debut artist, zero following | 257,000 streams in month one. No social media. No following. |
| **C4** | 11-year-old catalogue track | An 11-year-old track. 4.3 million streams in 28 days. |
| **C5** | Cheapest CPR in the deck | 11 cents per result. |
| **C6** | Growth that held | 5,000 to 50,000 streams a day. And it held there. |
| **C7** | Steady spend, back catalogue | $2K a month. Four months. 1,500 to 11,000 streams a day. |
| **C8** | Cold-start dance record | 0 to 18,000 streams a day. Three weeks. |
| **C9** | New single, three weeks | Nothing on release day. 25,000 streams a day three weeks later. |
| **C10** | New release, first 90 days | 0 to 7.2 million streams in 90 days. |
| **C11** | Tickets | 5,000 tickets sold on $8K of ad spend. |

Sizes: `portrait-1350` (1080×1350, the primary placement), `square-1080` and
`story-1920`.

### The treatment is one switch

`DESIGN` at the top of `statements.js` sets the look for the whole set — flip
a value, re-export, all eleven change together.

```js
export const DESIGN = {
  layout: 'editorial',   // or 'statement'
  ground: 'paper',       // or 'dark'
  cta: false,
  mark: false,
  label: 'Paid media for music',
};
```

**`editorial`** is the current set: label, hero, sub, upper-weighted, enormous
air below, no CTA and no logo. It is modelled on the best-performing live ad.
The hero breaks a sentence at a time — *"…in 90 days."* finishes and *"On a new
artist."* starts fresh rather than running on — which is most of where that
layout's rhythm comes from.

**`statement`** is the alternative: bottom-weighted, tighter, with the wordmark
and CTA pill available. Compare any combination without re-exporting:

```
ads/statement.html?id=C10&layout=statement&ground=dark&cta=1
```

### The CTA question

**The set ships without one, and that is deliberate.** Meta draws its *own*
call-to-action button underneath the creative in feed — Learn More, Book Now,
Apply Now — so a second CTA baked into the image is two buttons stacked, which
reads as a mistake and spends the ad's strongest real estate saying the same
thing twice. The best-performing live ad has no CTA in the image at all.

Ours being more specific than Meta's is a real point, but the fix is not to
burn it into a PNG. Put it where it can still be changed:

- pick **Book Now** as the Meta CTA button, which is the closest option;
- put *"Book a discovery call"* in the primary text, where it can be edited and
  A/B tested without re-exporting the kit.

Set `cta: true` only for a placement that draws no button of its own.

### Safe zones and overlays

`safe` in each `SIZES` entry is the platform chrome drawn **on top of** the
creative, and the copy is inset by it automatically. See it before you spend
money finding out:

```
ads/statement.html?id=C7&size=story-1920&safe=1
```

| Size | Top | Right | Bottom | Why |
|---|---|---|---|---|
| `portrait-1350` | — | — | — | Feed draws the profile row and the CTA button *outside* the image. Nothing overlaps. |
| `square-1080` | — | — | — | Same. |
| `story-1920` | 250 | 180 | 440 | Avatar and handle at the top; caption, handle and audio ticker at the bottom; the like/comment/share rail down the right. |

The 9:16 numbers are the **stricter Reels set**, not the Stories set, because
one export serves both — Stories alone would only need about 250 at the bottom.

Safe values are **absolute platform pixels**, multiplied by `1px` and never by
`--u`. `--u` tracks `--uref`, which is a typography knob someone may retune per
size; scaling the chrome inset by it means the inset moves when the type does,
and on any size whose `--uref` exceeds its width `--u` drops below 1 and the ad
ends up inset *less* than the platform covers.

`scripts/check-safe.mjs` measures every asset rather than trusting the CSS:

```bash
node scripts/check-safe.mjs
```

It renders all 132, takes the real bounding box of everything that puts ink on
the frame — copy, wordmark, CTA — and fails if any of it lands inside a safe
zone. Eyeballing one ad with `?safe=1` proves one ad; the hero is fitted by
measurement and the two layouts anchor from opposite edges, so which ad comes
closest to the chrome is not knowable by looking.

One thing the overlay marks that is not chrome: the blue dashed lines on the
4:5 are the **1:1 that Instagram centre-crops a 4:5 to in the profile grid**.
It does not affect a paid placement. It only matters if the same file is also
posted organically — and the editorial layout survives it, because the copy
sits in the upper middle rather than along the bottom edge.

### Editing, adding, resizing

Everything lives in **`ads/statements.js`**. Change the copy there and
re-export; nothing else lists the ads, including the export script. A new ad is
a new entry. A new size is a new line in `SIZES`:

```js
export const SIZES = {
  'landscape-1200': { w: 1200, h: 628, uref: 1200 },
};
```

`w` and `h` are the pixel size and `uref` is the type scale — see below.

Each entry also carries a `source` field with the deck figure it came from
(`48.9M in window · £22K · 14p`), so a number can be reconciled against the
deck without opening the PDF. The $ figures are converted from £ at roughly
1.27 and rounded for a clean read — they are not exact FX.

> **C10 disagrees with the live ad.** The best-performing ad currently running
> states this case as **8 million streams / 30¢**, which is the V3 and
> proposal-doc figure (£6K · 24p). The anonymised deck states **7.2M · £6K ·
> 20p**, which is what the v5 brief follows and what `statements.js` carries —
> 7.2M / 25¢. Same campaign, two sets of numbers. One of them needs to win
> before C10 runs alongside the live one.

### One layout, eleven lengths

The heroes run from 21 characters to 62. A single fixed size would either
shrink the short ones into a corner or overflow the long ones, and choosing a
size per ad would be eleven decisions that drift apart. So the box is identical
on every ad and the type is **measured** into it — `fitHero()` in
`statement.html` searches down from the deck's `display--xl` and stops at the
first size that fits. The ads differ in point size but not in composition,
which is what reads as a set.

## How the scale works

The deck is authored at 1920×1080 and every size in `tokens.json` is the number
it takes there — display type at 176px, the gutter at 96px, and so on. In CSS
each one is emitted as `calc(N * var(--u))`.

```
--u  =  --cw × 1px ÷ --uref
```

`--uref` is the width at which those numbers land at face value. Leave it at
1920 and an ad is a straight proportional shrink of a slide. **The ads run it
at 1080**, because an ad is read on a phone at a fraction of the size a slide
is projected at, and a proportional shrink leaves the type too small to carry.
The story tunes it further to 960, which brings everything up about 12% on a
tall canvas that would otherwise look empty.

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

Five things the deck work established the hard way.

**0. The C set stays anonymous.** It is drawn from the anonymised deck, and
that is the only reason a client's real spend and real CPR can go out as a
public ad at all. Naming an artist, or putting a face on one of these, undoes
it — including indirectly: a photograph of the artist whose figures the ad
carries identifies them just as well as the name would.

**1. A photograph next to a figure claims that figure.** Whatever the caption
says, a face beside a number reads as that number's artist. The V3 deck put
Harry T's 0→8M / £6K / 24p against Cristoph and it had to be unpicked. If you
have not got a photograph of the artist who owns the number, run the ad
typographically — which is what the whole C set does.

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
  statements.js            THE COPY — eleven ads, DESIGN, SIZES  ← edits live here
  statement.html           the one renderer: both layouts, every size, safe overlay
  frame.js                 draws the spine, fits the preview to the window
img/                       licensed photography, lens-treated
  _raw/                    drop untreated files here for npm run lens
ab-test/                   THE DELIVERABLE — 132 assets, generated
  README.md                how the test is set up and how to read it
  manifest.csv             filename -> cell, ad, size, copy
  index.html               contact sheet
  A-editorial-paper/       C1..C11 at three sizes
  B-editorial-dark/
  C-statement-paper/
  D-statement-dark/
scripts/
  build-tokens.mjs         tokens.json -> tokens.css
  lens.mjs                 bake the site's lens into a photograph
  export-png.mjs           the set × the cells -> ab-test/, at native size
```

The photography in `img/` is not used by the C set — it is there for the
treatments in `system.css` (bent cards, full-bleed media) when something other
than a statement ad is needed.
