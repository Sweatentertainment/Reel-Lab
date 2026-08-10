/* ------------------------------------------------------------------
   Case studies — Labels & partners
   The bigger results: scaled spend, multi-channel, revenue beyond streams.

   SOURCES. Every figure traces to one of:
     [SP]  Spotify for Artists / Chartmetric screenshots in assets/img
     [NF]  SweatProposalNewtonFaulkner, PJ's own doc, 4 Aug 2026
     [AD]  ADMT — Advertising Campaign Structure & Budget Framework
     [V3]  Miguel's V3 deck
   Where [NF] and [V3] disagree, [NF] wins — it's PJ's own writing and the
   most recent. Those conflicts are listed in the README for a decision
   before this goes to a client.

   NOTE: the catalogue-play slide deliberately does not name the label it
   was written for. That proposal is marked confidential.
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
          <div class="label reveal" style="margin-bottom:40px">Labels &amp; partners · 2026</div>
          <h1 class="display reveal" style="--d:.1s;font-size:150px;line-height:0.94">Case<br>studies.</h1>
          <p class="body reveal" style="--d:.24s;font-size:25px;max-width:520px;margin-top:44px">
            What the same framework returns with real budget behind it — across
            streaming, catalogue, merch and live.
          </p>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;gap:48px">
          ${bend({ src: 'artist__disclosure__lens.jpg', name: 'Disclosure', w: 260, h: 286, soft: true })}
          ${bend({ src: 'artist__blondish__lens.jpg', name: 'Blond:Ish', w: 240, h: 292, right: true })}
        </div>
      </div>`,
  },

  bracketTitle({ section: 'Case studies', text: 'What scale does', size: 120 }),

  /* 03 — the three numbers up front [SP] [NF] [V3] */
  bigThree({
    section: 'At a glance',
    label: 'Three campaigns, three revenue lines',
    headline: 'Streaming, catalogue,<br>merch. Same method.',
    items: [
      { v: '8M', k: 'Harry T · streaming', note: 'Streams in 90 days on £6K of spend, at 20p a listener.' },
      { v: '300K', k: 'The Listros · catalogue', note: 'Monthly listeners off a back-catalogue track, at 12p a listener.' },
      { v: '$68K', k: 'Mark Tuan · merch', note: 'Merch revenue in two weeks from an audience that came for the music.' },
    ],
    foot: `Different problems, one method. Test cheaply, read the cost per result,
           then put the budget where the number says.`,
  }),

  /* 04 — Harry T [SP] + [NF] */
  caseChart({
    section: 'Harry T',
    label: 'Breaking a new release',
    headline: '0 to 8M streams<br>in 90 days.',
    kicker: '£6K spend · 20p cost per listener',
    body: `25+ content variations tested before we scaled a penny. The testing
           framework was the reason it worked — and the reason it was cheap.`,
    shot: 'harry-spotify.jpg',
    alt: 'Spotify for Artists: Harry T, 4AM — 9,132,436 streams and 1,540,114 listeners, 13.2M all-time',
    card: { src: 'artist__harry-t__lens.jpg', name: 'Harry T', w: 250, h: 250 },
  }),

  /* 05 — The Listros: the catalogue argument, which is the label argument [SP] [NF] */
  caseChart({
    section: 'The Listros',
    label: 'Unlocking catalogue value',
    headline: '76K to 300K<br>monthly listeners.',
    kicker: 'Six months · 12p a listener',
    body: `No new release. No new recording. A back-catalogue track that was
           already half-working, proved out on a test budget and then scaled.
           Most catalogues have one of these in them.`,
    shot: 'chartmetric.jpg',
    alt: 'Chartmetric: The Listros Spotify monthly listeners at 300.77K, up 224.5K (294.52%) over six months',
    card: { src: 'the-listros__lens.jpg', name: 'The Listros', w: 300, h: 208 },
  }),

  /* 06 — Cristoph [SP] */
  caseChart({
    section: 'Cristoph',
    label: 'Cristoph × Michael Anthony — Spacer',
    headline: '0 to 20K daily<br>streams in 3 weeks.',
    body: `A cold start on a dance record. Find the seconds that stop the scroll,
           then put weight behind what's already converting.`,
    shot: 'spotify.jpg',
    alt: 'Spotify for Artists: Cristoph x Michael Anthony, Spacer — 243,611 streams over Jul 4–31, climbing to roughly 19K a day',
  }),

  /* 07 — Mark Tuan. No chart and no photograph we can stand behind. [V3] */
  caseStats({
    section: 'Mark Tuan',
    label: 'Multi-channel revenue',
    headline: '$68K in merch<br>sales in two weeks.',
    stats: [
      { k: 'Merch revenue', v: '$68K' },
      { k: 'Campaign length', v: '2 weeks' },
      { k: 'Targeting', v: 'High-intent' },
    ],
    body: `Streaming doesn't pay the bills on its own. We built a campaign that
           converted a streaming audience into merch buyers — integrated strategy
           turning listeners into revenue.`,
  }),

  /* 08 — the catalogue play. Method, not a result. Client unnamed on purpose. */
  ladder({
    section: 'The catalogue play',
    label: 'What we do with a back catalogue',
    headline: 'Four albums nobody<br>is working is four<br>albums of upside.',
    steps: [
      { t: 'Test the catalogue', d: 'A couple of hundred pounds a track across the records you already own. You find out which ones can carry a campaign.' },
      { t: 'Tie it to the live', d: 'Tour dates go live and the live ads run next to the catalogue work, so the streaming and the ticketing feed each other.' },
      { t: 'Spend by territory', d: 'Territory-led budget for the markets that convert, not a flat global buy. Geo-blocked releases get pushed where they can actually land.' },
      { t: 'Then the release', d: 'Pre-orders, pre-saves and the rollout — landing to an audience that has been growing for a year, not a cold one.' },
    ],
    foot: `Where a track isn't converting we say so and move the budget. Plenty of
           agencies will spend your money for as long as you keep giving it to
           them. We won't.`,
  }),

  /* 09 — scaling rules [AD] */
  bigThree({
    section: 'Scaling rules',
    label: 'What decides the budget',
    headline: 'Cost per result sets<br>the spend. Not a plan<br>agreed in January.',
    items: [
      { v: '&lt;15p', k: 'Scale it', note: 'A track under 15p gets £10K behind it, and another £10K if it clears a million streams in month one.' },
      { v: '15–25p', k: 'Shape it', note: '£3K while we work the creative and the targeting. It can get there, but not yet.' },
      { v: '&gt;25p', k: 'Leave it', note: '£1K and an honest conversation. Some tracks are not the one, and we will tell you which.' },
    ],
  }),

  /* 10 — currently running + the roster [NF] */
  {
    section: 'Who we work with',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:30px">Currently running</div>
        <p class="reveal" style="--d:.08s;font-family:var(--sans);font-weight:800;font-size:52px;line-height:1.28;letter-spacing:-0.04em;max-width:1600px">
          Swedish House Mafia · Thundercat · Barry Can't Swim ·
          Omar+ · St Lundi · ADMT
        </p>
        <div class="rule reveal" style="--d:.2s;margin:56px 0 40px"></div>
        <div class="label reveal" style="--d:.26s;margin-bottom:24px">Also on the books</div>
        <p class="reveal" style="--d:.32s;font-family:var(--sans);font-weight:700;font-size:32px;line-height:1.38;letter-spacing:-0.03em;max-width:1600px">
          Disclosure · Blond:Ish · Bonobo · Mark Tuan · Leon Thomas · Harry T ·
          The Listros · Cristoph · Kid Apollo · Dolores Forever · The Knocks ·
          Rules · Morly · Scout · Ormella · Ruthanne
        </p>
        <div class="rule reveal" style="--d:.38s;margin:52px 0 36px"></div>
        <div class="label reveal" style="--d:.44s;margin-bottom:24px">Labels &amp; partners</div>
        <ul class="channels reveal" style="--d:.5s">
          <li>BMG</li><li>Ninja Tune</li><li>Live Nation</li><li>CAA</li><li>SJM</li>
          <li>Disorder</li><li>Propeller</li><li>Redlight</li><li>Too Lost</li>
          <li>3000 Years</li><li>Funfair</li>
        </ul>
      </div>`,
  },

  /* 11 — the weekly report */
  {
    section: 'Reporting',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.85fr 1.15fr;align-items:center;gap:100px">
        <div>
          <div class="label reveal" style="margin-bottom:30px">Every week, every artist</div>
          <h2 class="display reveal" style="--d:.08s;font-size:58px;letter-spacing:-0.04em;line-height:1.14;margin-bottom:36px">
            A straight read<br>on the week.
          </h2>
          <p class="body reveal" style="--d:.2s;font-size:22px;max-width:480px">
            What the spend did, what it cost, what changed, and what we're doing
            about it. One of these per artist, written in English rather than
            exported from a platform.
          </p>
        </div>
        <div class="shot reveal" style="--d:.3s;max-width:760px;justify-self:center">
          <img src="${img('report.jpg')}" alt="Sweat.fm weekly performance report: DSP spend and cost per content view, social growth, Spotify super listeners and active listeners, with recommended actions">
        </div>
      </div>`,
  },

  /* 12 — reporting at scale */
  {
    section: 'Reporting',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.8fr 1.2fr;align-items:center;gap:110px">
        <div>
          <h2 class="display reveal" style="font-size:56px;letter-spacing:-0.04em;line-height:1.28;margin-bottom:16px">
            <span class="hl">One dashboard.</span>
          </h2>
          <h2 class="display reveal" style="--d:.12s;font-size:56px;letter-spacing:-0.04em;line-height:1.12;color:var(--head);margin-bottom:40px">
            Every artist on it.
          </h2>
          <p class="body reveal" style="--d:.24s;font-size:23px">
            Sweat.fm is our own platform, not a third-party dashboard. Meta, TikTok,
            YouTube, DSPs, tickets and merch tracked against one roster, updated daily.
          </p>
        </div>
        <div class="shot reveal" style="--d:.32s;max-width:840px;justify-self:center">
          <img src="${img('dashboard.jpg')}" alt="Sweat.fm dashboard: per-artist monthly listeners, streams, saves and playlist adds tracked daily">
        </div>
      </div>`,
  },

  closer({
    section: 'Next',
    headline: 'Bring us a roster.',
    body: `We'll take the catalogue, find what has room to move, and prove it on a
           small budget before anyone commits a real one.`,
  }),
];
