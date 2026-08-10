/* ------------------------------------------------------------------
   Case studies — Independent artists
   The smaller campaigns: modest spend, artist-funded, fast results.

   This is an evidence document, not a pitch. One case study per slide:
   the number, what it took, and the screenshot that proves it. No
   method, no roster, no offer, no call to action — those live in the
   proposal deck this is meant to accompany.

   SOURCES. Every figure traces to one of:
     [SP]  Spotify for Artists / Chartmetric screenshots in assets/img
     [NF]  SweatProposalNewtonFaulkner, PJ's own doc, 4 Aug 2026
     [V3]  Miguel's V3 deck
   Where [NF] and [V3] disagree, [NF] wins — it's PJ's own writing and the
   most recent. Those conflicts are listed in the README for a decision.
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
    headline: '0 to 20K daily<br>streams in 3 weeks.',
    body: `A cold start on a dance record. Find the seconds that stop the scroll,
           then put weight behind what's already converting.`,
    shot: 'spotify.jpg',
    alt: 'Spotify for Artists: Cristoph x Michael Anthony, Spacer — 243,611 streams over Jul 4–31, climbing to roughly 19K a day',
  }),

  /* 03 — The Listros. Chart shows 300.77K, up 224.5K over six months, so the
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

  /* 04 — ADMT. Figures from [NF]; V3 had 3,500 tickets on £10K at 7:1. */
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
