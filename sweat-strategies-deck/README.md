# Sweat Strategies — Proposal 2026

Miguel's V3 deck, rebuilt in the **sweatstrategies.com** design language.

- **Present it:** open `index.html` (any static server, or just open the file).
  `←` `→` / space / click to move, `F` for fullscreen, dots at the bottom to jump.
- **Send it:** `Sweat-Strategies-Proposal-2026.pdf` — 17 pages, 16:9.

## Where the design comes from

Everything visual is lifted from the live site (`Sweatentertainment/sweat-website`),
not re-invented:

| Treatment | Site source |
|---|---|
| Manrope 700/800, `letter-spacing: -0.05em`, 11rem-class display type | `global.css`, `header.css` |
| Black `#000`, heads `#c9c7c7`, blue `#0f65dd` / `#0c54b8` | `global.css` |
| **Bent artist cards** — `perspective: 600px` + `rotateY(±30deg)` | `main.css` `.ntk-card`, `.ntk-gsap-perspective-*` |
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
  The cover is Miguel's original, untouched.
- Offer updated: **$4,500 for three months, or $2,000 a month.**

### One thing to check

The offer slide still carries Miguel's "**Grow it** — $2,000 a month" tier at the
top, which now reads at the same price as the headline monthly rate. Worth
re-pricing one of the two or dropping the tier.

## Regenerating the PDF

```bash
npx http-server -p 8899 -s .          # serve the deck
node scripts/export-pdf.mjs           # needs playwright
```

It loads `index.html?print=1` — which stacks every slide at full size and freezes
the entrance animations on their end state — and prints at 1920×1080.
