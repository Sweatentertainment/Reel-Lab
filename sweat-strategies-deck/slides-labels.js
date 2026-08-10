/* ------------------------------------------------------------------
   Case studies — Labels & partners
   The bigger results: scaled spend, catalogue, revenue beyond streams.

   This is an evidence document, not a pitch. One case study per slide:
   the number, the window it covers, and the screenshot that proves it.
   No method, no roster, no offer, no call to action — those live in the
   proposal deck this is meant to accompany.

   SOURCES.
     [SP]  Spotify for Artists / Chartmetric screenshots in assets/img.
           Every figure on these slides is read straight off the
           screenshot beside it — streams, listeners, dates, all of it.
     [NF]  SweatProposalNewtonFaulkner, PJ's own doc, 4 Aug 2026
     [V3]  Miguel's V3 deck

   ARTIST NAMES. Several screenshots show the release but not the artist,
   so those slides are titled by release and marked below. They need
   naming before this goes out.
   ------------------------------------------------------------------ */

import { bend, caseChart, caseStats } from './parts.js';

export const SLIDES = [
  /* 01 — title */
  {
    section: 'Case studies',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:70px">
        <div>
          <div class="label reveal" style="margin-bottom:40px">Labels &amp; partners</div>
          <h1 class="display reveal" style="--d:.1s;font-size:150px;line-height:0.94">Case<br>studies.</h1>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;gap:48px">
          ${bend({ src: 'artist__disclosure__lens.jpg', name: 'Disclosure', w: 260, h: 286, soft: true })}
          ${bend({ src: 'artist__blondish__lens.jpg', name: 'Blond:Ish', w: 240, h: 292, right: true })}
        </div>
      </div>`,
  },

  /* 02 — Harry T. The screenshot is now filtered to the actual 90-day window
     (28 Sep – 31 Dec 2025), which reads 7,199,480 — not the 8M V3 claimed
     off a five-month view. Headline follows the chart. [SP] + 20p from [NF] */
  caseChart({
    section: 'Harry T',
    label: 'Harry T — 4AM',
    headline: '0 to 7.2M streams<br>in 90 days.',
    kicker: '£6K spend · 20p cost per listener',
    body: `1.3 million listeners, 278,021 playlist adds and 401,579 saves in the
           first three months. 25+ content variations tested before we scaled a
           penny.`,
    shot: 'cs-harry-t-4am-90.jpg',
    alt: 'Spotify for Artists: Harry T, 4AM — 7,199,480 streams and 1,302,137 listeners, 28 September to 31 December 2025',
    card: { src: 'artist__harry-t__lens.jpg', name: 'Harry T', w: 250, h: 250 },
  }),

  /* 03 — Distracted. Artist not shown in the screenshot. [SP] */
  caseChart({
    section: 'Distracted',
    label: 'Distracted — album',
    headline: '73.8M streams<br>in twelve months.',
    kicker: 'Up 437% year on year',
    body: `14.6 million listeners, 3 million playlist adds and 5.9 million saves.
           The record went from 13.7M streams the previous year to 73.8M.`,
    shot: 'cs-distracted.jpg',
    alt: 'Spotify for Artists: Distracted — 73,766,220 streams and 14,608,972 listeners, 7 August 2025 to 6 August 2026, up 437.5% on the previous period',
  }),

  /* 04 — As Soon As I Get Home. Artist not shown in the screenshot. [SP] */
  caseChart({
    section: 'As Soon As I Get Home',
    label: 'As Soon As I Get Home — EP',
    headline: '48.9M streams<br>on one EP.',
    kicker: '8 million listeners · 6.1 streams each',
    body: `1.16 million playlist adds and 656,650 saves. Six streams per listener
           says the audience came back rather than passing through once.`,
    shot: 'cs-as-soon-as-i-get-home.jpg',
    alt: 'Spotify for Artists: As Soon As I Get Home — 48,893,352 streams and 8,048,437 listeners over twelve months to 6 August 2026',
  }),

  /* 05 — Maribou State. The catalogue argument, on a 2015 record. [SP] */
  caseChart({
    section: 'Maribou State',
    label: 'Maribou State — Midas',
    headline: '4.3M streams<br>in 28 days on a<br>2015 record.',
    kicker: 'Up 14.1% on the previous month',
    body: `Eleven years old, 234 million all-time, and still moving. Catalogue
           doesn't decay on its own — it decays when nobody works it.`,
    shot: 'cs-maribou-midas.jpg',
    alt: 'Spotify for Artists: Maribou State, Midas — 4,352,888 streams and 1,917,533 listeners, 10 July to 6 August 2026, up 14.1% on the previous period',
  }),

  /* 06 — From Good To Bad. Artist not shown in the screenshot. [SP] */
  caseChart({
    section: 'From Good To Bad',
    label: 'From Good To Bad And Then Back Again',
    headline: '2M streams<br>across an album<br>campaign.',
    kicker: '545,129 listeners · 119,946 saves',
    body: `Built over sixteen weeks from about 5,000 a day to a release-week peak
           above 50,000, then held at four times where it started.`,
    shot: 'cs-from-good-to-bad.jpg',
    alt: 'Spotify for Artists: From Good To Bad And Then Back Again — 2,016,983 streams and 545,129 listeners, 10 February to 31 May 2026',
  }),

  /* 07 — The Listros. Chart shows 300.77K, up 224.5K over six months, so the
     start is ~76K — not zero, as V3 had it. [SP] + 12p from [NF] */
  caseChart({
    section: 'The Listros',
    label: 'Unlocking catalogue value',
    headline: '76K to 300K<br>monthly listeners.',
    kicker: 'Six months · 12p a listener',
    body: `No new release and no new recording. A back-catalogue track that was
           already half-working, proved out on a test budget and then scaled.`,
    shot: 'chartmetric.jpg',
    alt: 'Chartmetric: The Listros Spotify monthly listeners at 300.77K, up 224.5K (294.52%) over six months',
    card: { src: 'the-listros__lens.jpg', name: 'The Listros', w: 300, h: 208 },
  }),

  /* 08 — Mark Tuan. No chart and no photograph we can stand behind. [V3] */
  caseStats({
    section: 'Mark Tuan',
    label: 'Multi-channel revenue',
    headline: '$68K in merch<br>sales in two weeks.',
    stats: [
      { k: 'Merch revenue', v: '$68K' },
      { k: 'Campaign length', v: '2 weeks' },
      { k: 'Targeting', v: 'High-intent' },
    ],
    body: `A campaign that converted a streaming audience into merch buyers —
           integrated strategy turning listeners into revenue.`,
  }),
];
