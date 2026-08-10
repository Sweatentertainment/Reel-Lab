/* ------------------------------------------------------------------
   Case studies — Independent artists
   The smaller campaigns: modest spend, artist-funded, fast results.

   SOURCES. Every figure traces to one of:
     [SP]  Spotify for Artists / Chartmetric screenshots in assets/img
     [NF]  SweatProposalNewtonFaulkner, PJ's own doc, 4 Aug 2026
     [AD]  ADMT — Advertising Campaign Structure & Budget Framework
     [V3]  Miguel's V3 deck
   Where [NF] and [V3] disagree, [NF] wins — it's PJ's own writing and the
   most recent. Those three conflicts are listed in the README for a
   decision before this goes to a client.
   ------------------------------------------------------------------ */

import { img, bend, caseChart, caseStats, bracketTitle, closer, bigThree, ladder } from './parts.js';

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

  /* 03 — the three numbers up front [NF] */
  bigThree({
    section: 'At a glance',
    label: 'Three campaigns, three problems',
    headline: 'Nothing here cost<br>more than £6,000.',
    items: [
      { v: '12p', k: 'The Listros', note: 'Cost per monthly listener taking a catalogue track from 76K to 300K.' },
      { v: '11:1', k: 'ADMT', note: 'Return on ad spend on the live side — £6K in, £70K of tickets out.' },
      { v: '20p', k: 'Harry T', note: 'Cost per listener across 8M streams in 90 days on £6K of spend.' },
    ],
    foot: `None of these are new-release budgets. They're the kind of spend an
           artist can fund out of their own pocket and see back inside a quarter.`,
  }),

  /* 04 — the method [AD] */
  ladder({
    section: 'How it works',
    label: 'Test before you scale',
    headline: 'We spend a little<br>to find out where<br>the money goes.',
    steps: [
      { t: 'Test the track', d: '£250 against a new release, a couple of hundred a track across a catalogue. Enough to get a real cost per result, not a guess.' },
      { t: 'Read the number', d: 'Cost per result is the whole decision. Below 15p a track is working. 15–25p it needs shaping. Above 25p we say so.' },
      { t: 'Put weight behind it', d: 'A track under 15p gets the real budget. One above 25p gets £1,000 and an honest conversation, not a campaign.' },
      { t: 'Move the money', d: 'Reallocated weekly on cost, intent and audience quality. Budget follows what converts.' },
    ],
    foot: `This is why the numbers on the next few slides came off small budgets.
           The testing is the product — the scaling is just arithmetic once you
           know what a listener costs.`,
  }),

  /* 05 — Cristoph [SP] */
  caseChart({
    section: 'Cristoph',
    label: 'Cristoph × Michael Anthony — Spacer',
    headline: '0 to 20K daily<br>streams in 3 weeks.',
    body: `A cold start on a dance record. Find the seconds that stop the scroll,
           then put weight behind what's already converting.`,
    shot: 'spotify.jpg',
    alt: 'Spotify for Artists: Cristoph x Michael Anthony, Spacer — 243,611 streams over Jul 4–31, climbing to roughly 19K a day',
  }),

  /* 06 — The Listros. Chart shows 300.77K, up 224.5K over six months, so the
     start is ~76K — not zero, as V3 had it. [SP] + 12p from [NF] */
  caseChart({
    section: 'The Listros',
    label: 'Unlocking catalogue value',
    headline: '76K to 300K<br>monthly listeners.',
    kicker: 'Six months · 12p a listener',
    body: `Most artists ignore their catalogue. We found a track that was already
           half-working, proved it responded, and scaled it. No new release, no
           new recording — just spend pointed at the right thing.`,
    shot: 'chartmetric.jpg',
    alt: 'Chartmetric: The Listros Spotify monthly listeners at 300.77K, up 224.5K (294.52%) over six months',
    card: { src: 'the-listros__lens.jpg', name: 'The Listros', w: 300, h: 208 },
  }),

  /* 07 — Harry T. Indie framing: the spend, not the stream count. [SP] + [NF] */
  caseChart({
    section: 'Harry T',
    label: 'Breaking a new release',
    headline: '£6,000 of spend.<br>8M streams.',
    kicker: '90 days · 20p a listener',
    body: `25+ content variations tested before we scaled a penny. Every one of
           those tests cost less than a night in a studio, and the one that worked
           paid for all of them.`,
    shot: 'harry-spotify.jpg',
    alt: 'Spotify for Artists: Harry T, 4AM — 9,132,436 streams and 1,540,114 listeners, 13.2M all-time',
    card: { src: 'artist__harry-t__lens.jpg', name: 'Harry T', w: 250, h: 250 },
  }),

  /* 08 — ADMT. Figures from [NF]; V3 had 3,500 tickets on £10K at 7:1. */
  caseStats({
    section: 'ADMT',
    label: 'Filling venues profitably',
    headline: '5,000 tickets<br>on £6K of spend.',
    stats: [
      { k: 'Ad spend', v: '£6K' },
      { k: 'Gross ticket revenue', v: '£70K' },
      { k: 'Return on ad spend', v: '11:1' },
    ],
    body: `We didn't just drive ticket sales — we made the tour profitable. DSP ads
           built the awareness, retargeting converted the fans who were already
           listening, and attribution proved where every pound went.`,
  }),

  /* 09 — who else */
  {
    section: 'Who we work with',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:44px">A few of the artists on the books</div>
        <div class="reveal" style="--d:.12s;display:grid;grid-template-columns:repeat(5,1fr);justify-items:center;align-items:center;margin-bottom:64px">
          ${bend({ src: 'artist__st-lundi__lens.jpg', name: 'St Lundi', w: 210, h: 250, soft: true })}
          ${bend({ src: 'artist__rules__lens.jpg', name: 'Rules', w: 210, h: 250, right: true, soft: true })}
          ${bend({ src: 'Morly__lens.jpg', name: 'Morly', w: 210, h: 250, soft: true })}
          ${bend({ src: 'artist__dolores-forever__lens.jpg', name: 'Dolores Forever', w: 210, h: 250, right: true, soft: true })}
          ${bend({ src: 'artist__betsy-2__lens.jpg', name: 'Betsy', w: 210, h: 250, soft: true })}
        </div>
        <p class="reveal" style="--d:.3s;font-family:var(--sans);font-weight:700;font-size:34px;line-height:1.4;letter-spacing:-0.03em;max-width:1500px">
          St Lundi · ADMT · Harry T · The Listros · Cristoph · Rules · Morly ·
          Dolores Forever · Kid Apollo · Scout · Ormella · Ruthanne · robrobrob
        </p>
      </div>`,
  },

  /* 10 — the weekly report */
  {
    section: 'What you get',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.85fr 1.15fr;align-items:center;gap:100px">
        <div>
          <div class="label reveal" style="margin-bottom:30px">Every week</div>
          <h2 class="display reveal" style="--d:.08s;font-size:58px;letter-spacing:-0.04em;line-height:1.14;margin-bottom:36px">
            A straight read<br>on the week.
          </h2>
          <p class="body reveal" style="--d:.2s;font-size:22px;max-width:480px">
            What the spend did, what it cost, what changed, and what we're doing
            about it. Written in English, not exported from a platform.
          </p>
        </div>
        <div class="shot reveal" style="--d:.3s;max-width:760px;justify-self:center">
          <img src="${img('report.jpg')}" alt="Sweat.fm weekly performance report: DSP spend and cost per content view, social growth, Spotify super listeners and active listeners, with recommended actions">
        </div>
      </div>`,
  },

  /* 11 — the dashboard */
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
