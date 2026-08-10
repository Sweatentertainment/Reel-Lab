/* ------------------------------------------------------------------
   Case studies — Independent artists
   The smaller campaigns: modest spend, artist-funded, fast results.

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
          <div class="label reveal" style="margin-bottom:40px">Independent artists</div>
          <h1 class="display reveal" style="--d:.1s;font-size:150px;line-height:0.94">Case<br>studies.</h1>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;gap:48px">
          ${bend({ src: 'the-listros__lens.jpg', name: 'The Listros', w: 300, h: 208, soft: true })}
          ${bend({ src: 'artist__st-lundi__lens.jpg', name: 'St Lundi', w: 250, h: 300, right: true })}
        </div>
      </div>`,
  },

  /* 02 — Cristoph [SP] */
  caseChart({
    section: 'Cristoph',
    label: 'Cristoph × Michael Anthony — Spacer',
    headline: '0 to 18K daily<br>streams in 3 weeks.',
    kicker: '243,611 streams · 140,514 listeners',
    body: `A cold start on a dance record, released 10 July. Fifteen thousand
           playlist adds and twelve thousand saves inside the first three weeks.`,
    shot: 'cs-cristoph-spacer.jpg',
    alt: 'Spotify for Artists: Cristoph x Michael Anthony, Spacer — 243,611 streams and 140,514 listeners, 7–31 July 2026, climbing from zero to roughly 18K a day',
  }),

  /* 03 — KOGIS [SP] */
  caseChart({
    section: 'KOGIS',
    label: 'KOGIS — Keeping Your Head Up',
    headline: '205K streams<br>in three weeks.',
    kicker: 'Released 17 July · 25,470 on the best day',
    body: `Nothing on release day and 25K a day three weeks later. The line only
           bends once the spend finds the audience that responds.`,
    shot: 'cs-kogis-head-up.jpg',
    alt: 'Spotify for Artists: KOGIS, Keeping Your Head Up — 205,234 streams and 119,805 listeners, 10 July to 6 August 2026, peaking at 25,470 on 5 August',
  }),

  /* 04 — Ruthanne [SP] */
  caseChart({
    section: 'Ruthanne',
    label: 'Ruthanne — The Moment',
    headline: '466K streams<br>on a back catalogue<br>album.',
    kicker: 'Four months · 213,754 listeners',
    body: `Released October 2025 and worked from March. Eighteen thousand playlist
           adds and thirty-eight thousand saves, on a record that was already out.`,
    shot: 'cs-ruthanne-the-moment.jpg',
    alt: 'Spotify for Artists: Ruthanne, The Moment — 466,218 streams and 213,754 listeners, 24 March to 24 July 2026, rising from about 1,500 to 10,000 a day',
  }),

  /* 05 — Forever. Artist not shown in the screenshot. [SP] */
  caseChart({
    section: 'Forever',
    label: 'Forever',
    headline: '257K streams<br>in the first month.',
    kicker: 'Peak day 19,930 · 101,943 listeners',
    body: `Released 12 June, straight into a climb. Twelve thousand playlist adds
           and nearly sixteen thousand saves inside thirty days.`,
    shot: 'cs-forever.jpg',
    alt: 'Spotify for Artists: Forever — 257,251 streams and 101,943 listeners, 12 June to 12 July 2026, peaking at 19,930 on 10 July',
  }),

  /* 06 — House of the Silent. Artist not shown in the screenshot. [SP] */
  caseChart({
    section: 'House of the Silent',
    label: 'House of the Silent',
    headline: '0 to 1,400<br>a day in eight<br>weeks.',
    kicker: '38,506 streams · 21,144 listeners',
    body: `A small release, worked properly. Twenty-seven hundred playlist adds off
           a track with under forty thousand streams to its name.`,
    shot: 'cs-house-of-the-silent.jpg',
    alt: 'Spotify for Artists: House of the Silent — 38,506 streams and 21,144 listeners, 7 June to 6 August 2026, climbing to 1,469 on 4 August',
  }),

  /* 07 — the smallest one. Artist not shown. [SP] */
  caseChart({
    section: 'Breathe Easy',
    label: 'Breathe Easy',
    headline: '0 to 4,000<br>a day in a week.',
    kicker: 'Released 31 July · 10,209 streams',
    body: `The first week of a brand new record. This is what the start of a
           campaign looks like before anyone has scaled anything.`,
    shot: 'cs-breathe-easy.jpg',
    alt: 'Spotify for Artists: Breathe Easy — 10,209 streams and 6,939 listeners, 10 July to 6 August 2026, rising to roughly 4,000 a day in the final week',
  }),

  /* 08 — artist-level growth on a very small account. Artist not shown. [SP] */
  caseChart({
    section: 'Artist growth',
    label: 'A developing artist',
    headline: 'Streams up 949%<br>in four months.',
    kicker: 'Listeners +421% · Playlist adds +1,807%',
    body: `From an 8.8K-monthly-listener account. Monthly active listeners up
           1,081% and saves up 805% — the engagement grew with the reach rather
           than lagging behind it.`,
    shot: 'cs-audience-streams.jpg',
    alt: 'Spotify for Artists audience overview: 13K listeners up 420.8%, 67K streams up 948.7%, 1.1K monthly active listeners up 1,080.9%, 1.3K playlist adds up 1,807.1%, 7 April to 6 August 2026',
  }),

  /* 09 — The Listros. Chart shows 300.77K, up 224.5K over six months, so the
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

  /* 10 — ADMT. Figures from [NF]; V3 had 3,500 tickets on £10K at 7:1. */
  caseStats({
    section: 'ADMT',
    label: 'Filling venues profitably',
    headline: '5,000 tickets<br>on £6K of spend.',
    stats: [
      { k: 'Ad spend', v: '£6K' },
      { k: 'Gross ticket revenue', v: '£70K' },
      { k: 'Return on ad spend', v: '11:1' },
    ],
    body: `DSP ads built the awareness, retargeting converted the fans who were
           already listening, and attribution proved where every pound went.`,
  }),
];
