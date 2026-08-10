/* ------------------------------------------------------------------
   Case studies — Labels & partners
   The bigger results: scaled spend, multi-channel, revenue beyond streams.

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
          <div class="label reveal" style="margin-bottom:40px">Labels &amp; partners</div>
          <h1 class="display reveal" style="--d:.1s;font-size:150px;line-height:0.94">Case<br>studies.</h1>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;gap:48px">
          ${bend({ src: 'artist__disclosure__lens.jpg', name: 'Disclosure', w: 260, h: 286, soft: true })}
          ${bend({ src: 'artist__blondish__lens.jpg', name: 'Blond:Ish', w: 240, h: 292, right: true })}
        </div>
      </div>`,
  },

  /* 02 — Harry T [SP] + [NF] */
  caseChart({
    section: 'Harry T',
    label: 'Breaking a new release',
    headline: '0 to 8M streams<br>in 90 days.',
    kicker: '£6K spend · 20p cost per listener',
    body: `25+ content variations tested before we scaled a penny. The testing
           framework was the reason it worked.`,
    shot: 'harry-spotify.jpg',
    alt: 'Spotify for Artists: Harry T, 4AM — 9,132,436 streams and 1,540,114 listeners, 13.2M all-time',
    card: { src: 'artist__harry-t__lens.jpg', name: 'Harry T', w: 250, h: 250 },
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

  /* 04 — Mark Tuan. No chart and no photograph we can stand behind. [V3] */
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
