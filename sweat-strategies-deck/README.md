# Sweat Strategies — Proposal 2026

Miguel's V3 deck, rebuilt in the **sweatstrategies.com** design language.

- **Present it:** open `index.html` (any static server, or just open the file).
  `←` `→` / space / click to move, `F` for fullscreen, dots at the bottom to jump.
- **Send it:** `Sweat-Strategies-Proposal-2026.pdf` — 19 pages, 16:9.

## Three decks, one engine

| Deck | Page | Content | PDF |
|---|---|---|---|
| Proposal | `index.html` | `slides.js` | `Sweat-Strategies-Proposal-2026.pdf` (19pp) |
| Case studies — independent artists | `case-studies-indie.html` | `slides-indie.js` | `Sweat-Case-Studies-Independent-Artists.pdf` (12pp) |
| Case studies — labels & partners | `case-studies-labels.html` | `slides-labels.js` | `Sweat-Case-Studies-Labels.pdf` (13pp) |

`deck.js` exports `mount(SLIDES)`; each page imports its own slide set and calls
it. Shared fragments and slide archetypes (`caseChart`, `caseStats`, `bigThree`,
`ladder`, `bracketTitle`, `closer`, `bend`, `spine`) live in `parts.js`, so a
change to the bend or the spine lands in all three decks at once.

The two case-study decks split by campaign scale: independent artists carry the
smaller, artist-funded campaigns and lead on cost per result; labels carry the
outcome, the catalogue argument and the roster. Slides with no chart to show use
the stat-block or big-figure archetype rather than borrowing an unrelated image.

## Where the case-study numbers come from

Every figure traces to one of:

| Tag | Source |
|---|---|
| `[SP]` | Spotify for Artists / Chartmetric screenshots in `assets/img` |
| `[NF]` | `SweatProposalNewtonFaulkner`, PJ's own doc, 4 Aug 2026 |
| `[AD]` | `ADMT — Advertising Campaign Structure & Budget Framework` |
| `[V3]` | Miguel's V3 deck |

Nothing is estimated. Where `[NF]` and `[V3]` disagree the decks follow `[NF]`
— it's PJ's own writing and the most recent — but **three conflicts need a
decision before either deck goes to a client:**

| Figure | `[V3]` says | `[NF]` says | Decks currently use |
|---|---|---|---|
| ADMT | 3,500 tickets, £10K spend, 7:1 | 5,000 tickets, £6K spend, 11:1 | `[NF]` |
| Harry T cost per listener | 24p | 20p | `[NF]` |
| The Listros | "0 to 300K" | 70K → 400K in six months, 12p | 76K → 300K, from the chart |

On the last one: V3's "0 to 300K" can't be right. The Chartmetric screenshot on
that slide reads 300.77K, up 224.5K over six months, so the track started around
76K, not zero. `[NF]` says it has since reached 400K — if that's current, the
chart needs re-exporting to match.

Still outstanding from the proposal deck: the Harry T chart spans 9 Sep 2025 to
1 Feb 2026, about five months, under a headline claiming 90 days. A view
filtered to late Sep–late Dec would make the chart prove the claim.

The catalogue-play slide in the labels deck uses the shape of the `[NF]`
proposal without naming the label — that document is marked confidential.

## Where the design comes from

Everything visual is lifted from the live site (`Sweatentertainment/sweat-website`),
not re-invented:

| Treatment | Site source |
|---|---|
| Manrope 700/800, `letter-spacing: -0.05em`, 11rem-class display type | `global.css`, `header.css` |
| Black `#000`, heads `#c9c7c7`, blue `#0f65dd` / `#0c54b8` | `global.css` |
| **Bent artist cards** — `rotateY(±38deg)` at a long `1700px` perspective, so they turn further but lie flatter | `main.css` `.ntk-card`, `.ntk-gsap-perspective-*` |
| **The line down the middle** — the actual SVG path, drawn on slide entry | `index.html`, `scripts/pathLine.js` |
| **Colour blurs** — blue fields under `blur(120px)`, text resolving out of `blur(10px)` | `header.css` `.ntk-text--scroller`, `nav.css` |
| Mono uppercase labels for artist names | `main.css` `.ntk-card__title` (Cousine) |

Artist photography is the site's own (`public/assets/images/artist__*.webp`).

## Files

```
index.html         proposal shell
case-studies-*.html  case-study shells
deck.css           the design system — tokens, slide archetypes, print rules
parts.js           shared fragments and slide archetypes
slides*.js         the content, one object per slide  ← edit copy here
deck.js            mount(SLIDES): render, navigation, motion, PDF mode
scripts/           export-pdf.mjs, build-standalone.mjs, lens.mjs
assets/            Manrope + artist photography + the case-study screenshots
```

Copy and layout are separated on purpose: reworking wording means editing
`slides.js` only.

## Changes from V3

Applied from PJ's notes on the V3 thread:

- Cut slides 3, 4, 5, 16, 17, 18.
- Merged 19 + 20 into one Reporting slide.
- Section-title slides are black, grainy and bracketed — the treatment PJ picked
  out of old slide 6, now used on "Most artists never find out" and
  "When we find your song".
- Stock/vibe photography replaced throughout with artists from the site.
  The cover is Miguel's original, untouched. Slide 2 keeps Miguel's own
  treatment — light ground, straight images, no gradient.
- Artist photography is run through `scripts/lens.mjs`, which bakes in the
  barrel bulge and RGB fringing the site gets from its WebGL shader. A shader
  can't survive a PDF export, so the maths is applied once, offline.
- Dark slides are flat pure black with a fine, low film grain — no gradient
  washes and no visible noise.
- Slide 2 is laid out to Miguel's own measurements, taken off his slide and
  scaled to the 1920 canvas: small scattered images, no captions, headline
  running nearly edge to edge.
- The spine is kept faint and now runs only on the four process slides (8–11),
  where it carries the sequence. Everywhere else it's off.
- V3 credited the 0→8M / £6K / 24p figures to Cristoph, but they're Harry T's —
  the Spotify screenshot on that slide is Cristoph's own release, "Spacer".
  Split into two: Harry T carries the 90-day numbers with the "4AM" chart and
  his own artist card, and Cristoph gets a slide with the Spacer chart and
  0→20K daily streams in three weeks.
- Offer updated: **$4,500 for three months, or $2,000 a month**, and moved
  ahead of the closing section title. The Grow it tier is re-priced to
  **$2,500 a month, or $6,000 for three months**, which clears the collision
  where it used to read at the same rate as the headline monthly price.
- New closing slide on scaling and the multi-platform offer. The two tiers are
  Miguel's wording, moved off the old offer slide; the framing copy is new and
  needs a read before this goes to a client.

## Regenerating the PDF

```bash
npx http-server -p 8899 -s .                        # serve the decks
node scripts/export-pdf.mjs index.html out.pdf      # needs playwright
node scripts/export-pdf.mjs case-studies-indie.html out.pdf
```

It loads `index.html?print=1` — which stacks every slide at full size and freezes
the entrance animations on their end state — and prints at 1920×1080.
