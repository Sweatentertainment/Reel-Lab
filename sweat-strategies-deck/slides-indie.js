/* ------------------------------------------------------------------
   Case studies — Independent artists
   The smaller campaigns: modest spend, artist-funded, fast results.

   Every figure here comes from Sweat's own Independent Artists proposal
   or from the Spotify / Chartmetric / Sweat.fm screenshots in assets/img.
   Nothing is estimated.
   ------------------------------------------------------------------ */

import { img, spine, bend, caseChart, caseStats, bracketTitle, closer } from './parts.js';

export const SLIDES = [
  /* 01 — cover */
  {
    section: 'Case studies',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:70px">
        <div>
          <div class="label reveal" style="margin-bottom:40px">Independent artists · 2026</div>
          <h1 class="display reveal" style="--d:.1s;font-size:150px;line-height:0.94">Case<br>studies.</h1>
          <p class="body reveal" style="--d:.24s;font-size:25px;max-width:520px;margin-top:44px">
            Small budgets, run properly. What test-then-scale actually returns
            when the spend is an artist's own money.
          </p>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;gap:48px">
          ${bend({ src: 'the-listros__lens.jpg', name: 'The Listros', w: 300, h: 208, soft: true })}
          ${bend({ src: 'artist__st-lundi__lens.jpg', name: 'St Lundi', w: 250, h: 300, right: true })}
        </div>
      </div>`,
  },

  bracketTitle({ section: 'Case studies', text: 'What modest spend does', size: 108 }),

  /* 03 — Cristoph */
  caseChart({
    section: 'Cristoph',
    label: 'Cristoph × Michael Anthony — Spacer',
    headline: '0 to 20K daily<br>streams in 3 weeks.',
    body: `A cold start on a dance record. Find the seconds that stop the scroll,
           then put weight behind what's already converting.`,
    shot: 'spotify.jpg',
    alt: 'Spotify for Artists: Cristoph x Michael Anthony, Spacer — 243,611 streams over Jul 4–31, climbing to roughly 19K a day',
  }),

  /* 04 — The Listros */
  caseChart({
    section: 'The Listros',
    label: 'Unlocking catalogue value',
    headline: '0 to 300K<br>monthly listeners.',
    body: `Most artists ignore their catalogue. We found a track with algorithmic
           potential and scaled it systematically — huge growth on modest spend.`,
    shot: 'chartmetric.jpg',
    alt: 'Chartmetric: The Listros Spotify monthly listeners at 300.77K, up 224.5K (294.52%) over six months',
    card: { src: 'the-listros__lens.jpg', name: 'The Listros', w: 300, h: 208 },
  }),

  /* 05 — ADMT. Figures from the Independent Artists proposal; no chart to show. */
  caseStats({
    section: 'ADMT',
    label: 'Filling venues profitably',
    headline: '3,500 tickets sold.',
    stats: [
      { k: 'Ad spend', v: '£10K' },
      { k: 'Gross ticket revenue', v: '£70K' },
      { k: 'Return on ad spend', v: '7:1' },
    ],
    body: `We didn't just drive ticket sales — we made the tour profitable. DSP ads
           built awareness, retargeting converted the fans who were already listening,
           and attribution proved where every pound went.`,
  }),

  /* 06 — what the artist sees */
  {
    section: 'What you see',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.8fr 1.2fr;align-items:center;gap:110px">
        <div>
          <h2 class="display reveal" style="font-size:56px;letter-spacing:-0.04em;line-height:1.28;margin-bottom:16px">
            <span class="hl">Every number, daily.</span>
          </h2>
          <h2 class="display reveal" style="--d:.12s;font-size:56px;letter-spacing:-0.04em;line-height:1.12;color:var(--head);margin-bottom:40px">
            Not a monthly PDF.
          </h2>
          <p class="body reveal" style="--d:.24s;font-size:23px">
            Sweat.fm tracks every channel in one place, updated daily. You wake up
            knowing exactly what yesterday's spend did.
          </p>
        </div>
        <div class="shot reveal" style="--d:.32s;max-width:840px;justify-self:center">
          <img src="${img('dashboard.jpg')}" alt="Sweat.fm dashboard: Ormella at 107.9K monthly listeners, up 17.3%, with streams, saves and playlist adds tracked daily">
        </div>
      </div>`,
  },

  closer({
    section: 'Next',
    headline: 'Let\'s find your song.',
    body: `Ninety days, up to twelve of your tracks tested, and a straight answer
           about which one can carry a career.`,
  }),
];
