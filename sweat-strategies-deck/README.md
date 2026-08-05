# Sweat Strategies — Proposal 2026

Miguel's V3 deck, rebuilt in the **sweatstrategies.com** design language.

- **Present it:** open `index.html` (any static server, or just open the file).
  `←` `→` / space / click to move, `F` for fullscreen, dots at the bottom to jump.
- **Send it:** `Sweat-Strategies-Proposal-2026.pdf` — 19 pages, 16:9.

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
index.html   shell
deck.css     the design system — tokens, slide archetypes, print rules
slides.js    the content, one object per slide  ← edit copy here
deck.js      render, navigation, motion, PDF mode
assets/      Manrope + artist photography + the case-study screenshots
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
  Split into two: Harry T carries the 90-day numbers, and Cristoph gets his own
  slide with the Spacer chart and 0→20K daily streams in three weeks.
- Offer updated: **$4,500 for three months, or $2,000 a month**, and moved
  ahead of the closing section title.
- New closing slide on scaling and the multi-platform offer. The two tiers are
  Miguel's wording, moved off the old offer slide; the framing copy is new and
  needs a read before this goes to a client.

### Waiting on

The Harry T slide is set as a stat block because the "4AM" Spotify for Artists
screenshot isn't in the repo yet. Drop it in `assets/img/` and it can take the
same chart treatment as the other two case studies.

### One thing to check

"**Grow it** — $2,000 a month" (slide 18) is the same number as the headline
monthly rate on slide 16. They're on separate slides now, so it reads far less
oddly, but the two still collide. Worth re-pricing one or dropping the tier.

## Regenerating the PDF

```bash
npx http-server -p 8899 -s .          # serve the deck
node scripts/export-pdf.mjs           # needs playwright
```

It loads `index.html?print=1` — which stacks every slide at full size and freezes
the entrance animations on their end state — and prints at 1920×1080.
