/* ------------------------------------------------------------------
   Case studies — Labels & partners
   The bigger results: scaled spend, multi-channel, revenue beyond streams.

   Every figure here comes from Sweat's own Independent Artists proposal
   or from the Spotify / Sweat.fm screenshots in assets/img. Nothing is
   estimated. Slots waiting on further evidence are noted in the README.
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
          <div class="label reveal" style="margin-bottom:40px">Labels &amp; partners · 2026</div>
          <h1 class="display reveal" style="--d:.1s;font-size:150px;line-height:0.94">Case<br>studies.</h1>
          <p class="body reveal" style="--d:.24s;font-size:25px;max-width:520px;margin-top:44px">
            What the same framework returns with real budget behind it — across
            streaming, merch and live.
          </p>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;gap:48px">
          ${bend({ src: 'artist__disclosure__lens.jpg', name: 'Disclosure', w: 260, h: 286, soft: true })}
          ${bend({ src: 'artist__blondish__lens.jpg', name: 'Blond:Ish', w: 240, h: 292, right: true })}
        </div>
      </div>`,
  },

  bracketTitle({ section: 'Case studies', text: 'What scale does', size: 120 }),

  /* 03 — Harry T */
  caseChart({
    section: 'Harry T',
    label: 'Breaking a new release',
    headline: '0 to 8M streams<br>in 90 days.',
    kicker: '£6K spend · 24p cost per listener',
    body: `25+ content variations tested before we scaled a penny. The testing
           framework was the reason it worked.`,
    shot: 'harry-spotify.jpg',
    alt: 'Spotify for Artists: Harry T, 4AM — 9,132,436 streams and 1,540,114 listeners, 13.2M all-time',
    card: { src: 'artist__harry-t__lens.jpg', name: 'Harry T', w: 250, h: 250 },
  }),

  /* 04 — Mark Tuan. Figures from the Independent Artists proposal. */
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

  /* 05 — the roster */
  {
    section: 'Who we work with',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:36px">Artists</div>
        <p class="reveal" style="--d:.1s;font-family:var(--sans);font-weight:700;font-size:44px;line-height:1.35;letter-spacing:-0.03em;max-width:1600px">
          Disclosure · Blond:Ish · Bonobo · Thundercat · Mark Tuan · Leon Thomas ·
          ADMT · St Lundi · Harry T · Kid Apollo · The Listros · Dolores Forever ·
          The Knocks · Rules · Morly · Scout · Ormella · Ruthanne
        </p>
        <div class="rule reveal" style="--d:.24s;margin:64px 0 44px"></div>
        <div class="label reveal" style="--d:.3s;margin-bottom:28px">Labels &amp; partners</div>
        <ul class="channels reveal" style="--d:.36s">
          <li>BMG</li><li>Ninja Tune</li><li>Live Nation</li><li>CAA</li><li>SJM</li>
          <li>Disorder</li><li>Propeller</li><li>Redlight</li><li>Too Lost</li>
          <li>3000 Years</li><li>Funfair</li>
        </ul>
      </div>`,
  },

  /* 06 — reporting at scale */
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
