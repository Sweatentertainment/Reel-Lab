# Sweat Strategies — Proposal 2026

Miguel's V3 deck, rebuilt in the **sweatstrategies.com** design language.

- **Present it:** open `index.html` (any static server, or just open the file).
  `←` `→` / space / click to move, `F` for fullscreen, dots at the bottom to jump.
- **Send it:** `Sweat-Strategies-Proposal-2026.pdf` — 16 pages, 16:9.

## Four decks, one engine

| Deck | Page | Content | PDF |
|---|---|---|---|
| Proposal | `index.html` | `slides.js` | `Sweat-Strategies-Proposal-2026.pdf` (16pp) |
| Case studies — independent artists | `case-studies-indie.html` | `slides-indie.js` | `…-Independent-Artists.pdf` (16pp) |
| Case studies — labels & partners | `case-studies-labels.html` | `slides-labels.js` | `…-Labels.pdf` (12pp) |
| Case studies — labels, anonymised | `case-studies-labels-anon.html` | `slides-labels-anon.js` | `…-Labels-Anonymised.pdf` (14pp) |

`deck.js` exports `mount(SLIDES)`; each page imports its own slide set and calls
it. Shared fragments and slide archetypes (`caseChart`, `caseStats`, `bend`,
`spine`) live in `parts.js`.

**The proposal carries no case studies.** They came out so the proposal and a
case-study deck can be sent as two documents.

**The case-study decks are evidence documents, not pitches.** No method, no
roster, no reporting product, no offer and no call to action — one case study
per slide, each with its number, the window it covers, and the screenshot that
proves it. The one exception is the Artists & partners slide in the anonymised
deck, which exists precisely because the results carry no names.

The cases live in **`cases.js`**, one definition each, rendered two ways:

| | |
|---|---|
| `named` | the artist, the release and the artwork |
| `anon` | the same numbers with nothing identifying |

Adding a case study means adding one entry to `cases.js` and listing it in
whichever decks should carry it.

### How the decks differ

**Independent artists carries every case**, biggest first. The tail is the point
of it: House of the Silent at 1,469 streams a day, Breathe Easy in its first
week at 10,209 streams total, and a developing artist whose whole account is
8.8K monthly listeners. An artist needs to see the campaign that looks like
theirs, not only the ceiling.

**Labels carries only campaigns that took a record above 10,000 streams a day.**
Every kicker states the rate it qualified on — an averaged figure where the
whole window clears the bar, a peak-day tooltip where the climb crosses it — so
the threshold is checkable off the chart rather than taken on trust.

| Case | Streams in window | Rate | In labels |
|---|---|---|---|
| Distracted | 73.8M | ~202K/day avg | yes |
| As Soon As I Get Home | 48.9M | ~134K/day avg | yes |
| Harry T — 4AM | 7.2M | ~76K/day avg | yes |
| Maribou State — Midas | 4.35M | ~155K/day avg | yes |
| From Good To Bad | 2.02M | ~18K/day avg | yes |
| Ruthanne — The Moment | 466K | climbs to ~11K/day | yes |
| Forever | 257K | peak 19,930 | yes |
| Cristoph — Spacer | 244K | climbs to ~18K/day | yes |
| KOGIS | 205K | peak 25,470 | yes |
| House of the Silent | 38.5K | peak 1,469 | no |
| Breathe Easy | 10.2K | peak ~4,000 | no |
| Developing artist | 67K | ~550/day | no |

The Listros and Mark Tuan are in both: one is measured in monthly listeners and
the other in merch revenue, so the daily-streams rule doesn't reach either.
ADMT is a ticketing result rather than a streaming one, so it sits in the indie
deck and — at PJ's request — at the end of the anonymised one.

**The anonymised labels deck** carries the same cases, for sending over email.
It leads with the EP campaign rather than the largest number, then runs largest
first, and closes on the ADMT ticketing case — which the named labels deck
doesn't carry, because it isn't a streaming result.

The deck states its own anonymisation: on the cover, on the roster slide, and
in the footer of every single slide, via `OPTS.legal` exported from the slide
module and read by both the page shell and the standalone build.

`scripts/anonymise.mjs` crops the entire header off each
screenshot — artwork, release type, track title, all-time streams and release
date — the artist photo cards are dropped, and the section and label are
replaced with a generic description. Every figure, date range and chart stays.

Cropping replaced an earlier attempt at blurring the artwork and title in
place, which wasn't safe enough: a two-line title only had its second line
caught, and pale artwork wasn't detected as artwork at all.

Three cases override the shared copy for the anonymised cut, via `anonHeadline`,
`anonKicker` and `anonBody`:

- **Maribou State** quotes the all-time stream count, which the crop removes.
- **From Good To Bad** is relabelled "3 month project growth" and leads on the
  climb from 5K to 50K a day, because naming the release type is a step
  towards naming the release. Note the window on the chart is 10 Feb – 31 May,
  nearer sixteen weeks than three months.
- **Forever** is framed as a debut track from an artist with no social presence,
  launched as a test — PJ's description of the campaign, not something the
  chart shows.

## Where the case-study numbers come from

Every figure on a chart slide is read straight off the screenshot beside it.
Where a slide quotes a per-day rate it is either a tooltip value from the chart
("peak day") or the period total divided by the days in the window
("averaged"). Nothing is estimated.

The screenshots live in `assets/img` as `cs-*.jpg`, processed from PJ's
originals by `scripts/prep-shots.mjs`, which collapses the dead white band in
each Spotify header and downscales to 1500px. The collapse is confined to the
top 42% of each image so no plotted area is ever squashed.

**Spend and CPR are not on the screenshots.** Spotify for Artists doesn't show
what a campaign cost, so every spend and every CPR figure comes from Sweat's
own numbers, supplied by PJ. Same for ADMT's ticket figures, Mark Tuan's merch
revenue, and The Listros' 2M monthly-stream peak. Everything else — streams,
listeners, playlist adds, saves, date ranges — is read off the chart beside it.

ADMT's gross is £66K rather than the £70K carried over from V3, which is what
makes 11:1 against £6K of spend arithmetically true.

**Two things still need a decision before either deck goes to a client:**

1. **Artist names.** Six screenshots show the release but not the artist, so
   those cases are titled by release: *Distracted*, *As Soon As I Get Home*,
   *From Good To Bad*, *Forever*, *House of the Silent*, *Breathe Easy*, plus
   the developing-artist case. They need naming.
2. **ADMT.** V3 says 3,500 tickets on £10K at 7:1; the proposal doc says 5,000
   tickets on £6K at 11:1. The decks follow the proposal doc.

Two conflicts are **resolved** by the newer screenshots:

- **Harry T.** V3 claimed 8M in 90 days off a five-month chart. The filtered
  view (28 Sep – 31 Dec 2025) reads **7,199,480**, so the headline is now 7.2M
  and the chart proves it.
- **The Listros.** V3 said "0 to 300K". The Chartmetric shot reads 300.77K, up
  224.5K over six months, so the track started around 76K. Corrected.

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
cases.js           the case studies, named and anonymised
slides*.js         the content, one object per slide  ← edit copy here
deck.js            mount(SLIDES): render, navigation, motion, PDF mode
scripts/           export-pdf.mjs, build-standalone.mjs, lens.mjs,
                   prep-shots.mjs, anonymise.mjs
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
