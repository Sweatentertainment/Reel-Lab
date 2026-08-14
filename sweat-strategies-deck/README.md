# Sweat Strategies — Proposal 2026

Miguel's V3 deck, rebuilt in the **sweatstrategies.com** design language.

- **Present it:** open `index.html` (any static server, or just open the file).
  `←` `→` / space / click to move, `F` for fullscreen, dots at the bottom to jump.
- **Send it:** `../sweat-brand/decks/Sweat-Strategies-Proposal-2026.pdf` — 17 pages, 16:9.

The exported PDFs live in [`../sweat-brand/`](../sweat-brand/) with the design
system they were built from, so the sendable decks and the kit for making
everything else sit in one place. This folder is where they are *authored*.

## Six decks, one engine

| Deck | Page | Content | PDF in `../sweat-brand/decks/` |
|---|---|---|---|
| Proposal — artists | `index.html` | `slides.js` | `Sweat-Strategies-Proposal-2026.pdf` (17pp) |
| Proposal — labels | `labels-proposal.html` | `slides-labels-offer.js` | `Sweat-Labels-Proposal-2026.pdf` (19pp) |
| Proposal — cross-platform | `cross-platform-proposal.html` | `slides-cross-platform.js` | `Sweat-Cross-Platform-Proposal-2026.pdf` (24pp) |
| Case studies — independent artists | `case-studies-indie.html` | `slides-indie.js` | `…-Independent-Artists.pdf` (16pp) |
| Case studies — labels & partners | `case-studies-labels.html` | `slides-labels.js` | `…-Labels.pdf` (12pp) |
| Case studies — labels, anonymised | `case-studies-labels-anon.html` | `slides-labels-anon.js` | `…-Labels-Anonymised.pdf` (14pp) |
| **Bespoke** — Øneheart / naturecore | `oneheart-proposal.html` | `slides-oneheart.js` | `Sweat-Oneheart-Naturecore-Proposal.pdf` (20pp) |
| **Bespoke** — Christopher Hunt | `chrishunt-proposal.html` | `slides-chrishunt.js` | `Sweat-Christopher-Hunt-Proposal.pdf` (20pp) |
| **Bespoke** — M07 / Key Factory | `keyfactory-proposal.html` | `slides-keyfactory.js` | `Sweat-M07-Proposal.pdf` (21pp) |

`deck.js` exports `mount(SLIDES)`; each page imports its own slide set and calls
it. Shared fragments and slide archetypes (`caseChart`, `caseStats`, `bend`,
`spine`) live in `parts.js`.

**No proposal carries case studies.** They came out so a proposal and a
case-study deck can be sent as two documents.

**The artist and label proposals argue different things.** The artist deck sells a question —
*have you got a song?* — and promises an answer in 90 days. A label already
believes it has the record; it wants a hit, and it buys speed, volume and a cost
per new listener it can plan against. So the label deck keeps the same bones
(problem, promise, process, verdict, reporting, offer) and changes the argument:
the promise is **live in 24 hours** rather than *in 90 days you'll know*, the
verdict slide leads on killing records early rather than on honesty about spend,
and the offer is PJ's two routes — partner retainer or pay as you go.

| | Artists | Labels |
|---|---|---|
| Promise | In 90 days you'll know | Live in 24 hours |
| Unit | Up to 12 songs over three months | 4, 9 or 20 tests a month |
| Price | $4,500 / 3 months, or $2,000 pcm | £2K / £4K / £8K pcm, ad spend included |
| One-off | — | £550 a test, ad spend included |
| Scaling | 20% on ad spend above $5,000 pcm | 10% on retainer, 20% pay as you go, £1K minimum |

Everything commercial in the label deck is PJ's, verbatim from his brief. Note
the currency split: he gave the one-off as £550 and the scale minimum as £1K, so
the retainer tiers are set in £ to match — while the artist deck is in $.

## The cross-platform deck

The third proposal, for **established artists buying paid media across every
platform** rather than testing one record. The other two both argue about
streaming; this one argues that the channels are not interchangeable.

| | Artists | Labels | Cross-platform |
|---|---|---|---|
| Reader | An artist with a song | A label with a record | An established artist already spending |
| Setup | Most artists never find out | You can't optimise four assets | No two platforms behave the same |
| Scope | Streaming | Streaming | Streaming, live, ticketing, TikTok, YouTube, merch, CRM |
| Price | On the slide | On the slide | **None — scoped via conversation** |

**The setup is a principle, not a problem.** An earlier cut opened the section
with "every platform gets bought the same way", which is an accusation aimed at
whoever is currently buying — and set as a full-bleed bracket it read as the
deck's selling point rather than its setup. It now asserts the thing that is
actually true and actually useful: the platforms are different animals.

**Everything converts. The route is what changes.** Slide 05 carries it:
*all of it is there to convert, what changes is the campaign that gets you
there*. On some channels spending straight at the sale is the cheapest way
there; on others it is slower, or it is putting money behind what is already
working and letting the sale follow. Two things to hold on to in any copy edit.
Every channel slide states what we *do* there — none of them argues that
something doesn't work, and TikTok in particular must not read as "conversion
campaigns fail here". And none of it is argued in ad-platform vocabulary:
earlier cuts leaned on campaign types, objectives, pixels and cost per result,
which is the media buyer's language rather than the reader's.

Three things make it different from the other two decks:

**It carries the whole estate, not one channel.** Five channel slides, each
stating what actually works there rather than pretending one playbook covers
them all:

| Channel | The argument |
|---|---|
| Live | Ticket sales run as a campaign rather than a blast — the standard practice is a wall of spend at on-sale and again on pay-day weekend against targeting built years ago. We test content first, spend slower and more consistently with ramp-ups at the moments that matter, and read cold and warm funnels apart with hook rate, hold rate and conversion daily. |
| Ticketing | We can take the ticketing itself through **david.tickets**, at no cost to the artist, with the artist and their team getting full live access to their own ticket data. |
| TikTok | Grow the audience on the content that is already working: audience targeting campaigns pointed at the posts that earned attention on their own, or influencer seeding where the record needs to be in other people's videos. |
| YouTube | The goal is traction: watched, held to the end, picked up. Engagement and reach campaigns buy that. |
| Merch | A drop only works if the whole path behind it does: funnels built and tested end to end, drop optimisation, Shopify store management. |

All of it is PJ's brief, tightened but not extended — nothing was invented to
make a slide look fuller. The criticism on the Live slide is aimed at the
standard practice rather than at the promoters named in the chips underneath it,
the same way the label deck's problem slide is phrased at the workflow rather
than at the team.

**The streaming method is unchanged.** Slides 09–12 are the label deck's four
steps, word for word. It's the part with the evidence behind it, and rewriting
it for a different reader would only make two documents disagree.

**The CRM fan flow gets its own act.** Six steps on one rule — new follower,
automatic DM offering an exclusive, first-party capture, the email with the
demo, the listen, then the Instagram voice note that admits the automation and
hands over to the artist. The last node is marked in white rather than blue,
because that is where a person takes over.

The voice note itself had a slide of its own until PJ folded the two together.
It is the payoff of the sequence rather than a separate idea, and on one slide
the quote sits directly under the node it belongs to.

The voice note is **drawn** (`voicenote()` in `parts.js`, `.vn` in `deck.css`)
rather than screenshotted: a real one carries a real fan's handle and profile
picture, and this deck gets forwarded. Its waveform is generated from a fixed
sine rather than `Math.random()`, so the PDF and the live deck can't disagree.

**No prices, at PJ's instruction.** The engagement slide says pricing is scoped
to the work, gives the reason (the mix is different for everyone at this level,
so a fixed package either overcharges the quiet months or under-resources the
loud ones), and asks for the three things a scope needs.

The cover carries this deck's own title, **Full Funnel Deck**, set as a mono
caption under the chrome wordmark. Its position is measured off the artwork
rather than set to the deck's `--pad`: the wordmark's right edge sits ~45px from
the frame, so a caption on the usual 96px gutter would read as misaligned with
the thing directly above it.

Artist photography is the four biggest names in the library — Disclosure,
Thundercat, Blond:Ish, Bonobo — one each on the four streaming slides and
nowhere else. The hook is typographic instead of carrying cards, which is what
keeps every face in the deck a top-tier one.

Three things to check before it goes out. PJ's voice-note script reads "i'm glad
you here"; the slide sets it as "I'm glad you're here". The reporting slide stops
at what sweat.fm actually shows — campaigns, costs and markets — so if the
platform starts carrying live and merch, that's the line to widen. And
**david.tickets** is set as written in the brief; it needs a check against however
the product is actually branded.

**The case-study decks are evidence documents, not pitches.** No method, no
roster, no reporting product, no offer and no call to action — one case study
per slide, each with its number, the window it covers, and the screenshot that
proves it. The one exception is the Artists & partners slide in the anonymised
deck, which exists precisely because the results carry no names.

**The roster slide is shared.** `ARTISTS`, `PARTNERS` and `roster()` live in
`parts.js`, and all three decks that carry the slide call it — both proposals
and the anonymised case studies. Adding a name means editing one array. The
proposals pass no `note`; the anonymised deck passes the paragraph explaining
what has been removed, which would be a false claim in a proposal.

In the label proposal this replaced a two-tier "Campaigns for / Also on the
books" split. The split carried more information, but it meant the proposal
and the case-study deck disagreed about who was on the books.

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

## The reporting slide

Both proposals show the sweat.fm dashboard on a laptop. Two scripts build it.

`scripts/prep-dashboard.mjs` takes PJ's raw 4112×2296 capture and does two
things. It crops to just under the Top Countries header, because the grab
ends mid-row and a sliced table row reads as a broken image rather than a
scrolled screen. And it paints out the site's own scroll spine, which the
capture caught running down the middle of the dashboard — fine in the gutters,
but where it crosses a chart card and an ad thumbnail it just looks like
damage. Each affected row is bridged across from the pixels either side. The
search band is deliberately narrow and skips the rows the campaign table
covers: widen it and it starts eating the Impr. and CPM columns.

`scripts/cut-laptop.mjs` cuts the machine out of the stock mockup PJ supplied.
The transparency checkerboard is baked into the JPEG, so two flood fills knock
it out — one from the border, one seeded in the middle of the display, which
leaves the screen as a hole in the PNG. The screenshot then sits *behind* the
frame and shows through it, so there is nothing to perspective-match. The
script prints the display's position as four percentages; those are what
`.lap__screen` is set to in `deck.css`, so re-run it rather than nudging them
by eye if the mockup is ever swapped.

The cut edge is unmixed rather than thresholded — the outline pixels are a
blend of laptop and checker, and solving `P = aF + (1-a)B` recovers a real
alpha. A hard mask left a light halo, which is invisible on white and obvious
on the black slide the frame actually sits on. The same sum drops the mockup's
drawn contact shadow, which resolves to a very low alpha and would otherwise
be a grey smudge under the machine.

**Two things to settle before this goes out.** The mockup is an iStock preview
file (`istockphoto-1402355455-612x612.jpg`) — the free comp, not a licensed
asset — so it needs a licence or a replacement before the deck is sent to
anyone. And the dashboard on screen is a live KOGIS campaign, showing £994.61
spent against an £8,000 budget: fine in the artist deck, worth a thought in a
deck going to other labels.

## Files

```
index.html         artist proposal shell
labels-proposal.html label proposal shell
cross-platform-proposal.html  cross-platform proposal shell
case-studies-*.html  case-study shells
deck.css           the design system — tokens, slide archetypes, print rules
parts.js           shared fragments and slide archetypes
cases.js           the case studies, named and anonymised
slides*.js         the content, one object per slide  ← edit copy here
deck.js            mount(SLIDES): render, navigation, motion, PDF mode
scripts/           export-pdf.mjs, build-standalone.mjs, lens.mjs,
                   prep-shots.mjs, anonymise.mjs, prep-dashboard.mjs,
                   cut-laptop.mjs
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
node scripts/export-pdf.mjs                         # needs playwright
node scripts/export-pdf.mjs case-studies-indie.html \
  ../sweat-brand/decks/Sweat-Case-Studies-Independent-Artists.pdf
```

With no arguments it writes the artist proposal to
`../sweat-brand/decks/`. Pass a page and an output path for any of the others —
the filenames are in the table at the top.

It loads `index.html?print=1` — which stacks every slide at full size and freezes
the entrance animations on their end state — and prints at 1920×1080.
