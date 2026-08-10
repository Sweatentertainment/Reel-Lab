/* ------------------------------------------------------------------
   Labels & partners — the proposal

   The artist deck ("In 90 days you'll know") sells a question: have you
   got a song? A label already believes it has. What it wants is a hit,
   and what it's buying is speed, volume and a cost per new listener it
   can plan against. So the bones are the same as slides.js — problem,
   promise, process, verdict, reporting, offer — and the argument
   underneath them is different.

   Everything commercial here is PJ's, verbatim from his brief:
   the two routes, the three retainer tiers, the £550 one-off, both
   commission rates and the £1K scale minimum. Nothing is invented.

   Currency: PJ wrote the one-off as £550 and the scale minimum as £1K,
   so the retainer tiers are set in £ to match. The artist deck is in $
   — worth a look before this goes out.
   ------------------------------------------------------------------ */

import { img, spine, blobs, bend } from './parts.js';

export const SLIDES = [
  /* 01 — cover */
  {
    section: 'Proposal',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:70px">
        <div>
          <div class="label reveal" style="margin-bottom:40px">Labels &amp; partners · 2026</div>
          <h1 class="display reveal" style="--d:.1s;font-size:132px;line-height:0.96">Find the<br>hit. Faster.</h1>
          <p class="body reveal" style="--d:.24s;font-size:25px;max-width:520px;margin-top:44px">
            A testing operation that tells you which record earns the push,
            what a new listener costs, and how hard to go.
          </p>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;gap:48px">
          ${bend({ src: 'artist__disclosure__lens.jpg', name: 'Disclosure', w: 260, h: 286, soft: true })}
          ${bend({ src: 'artist__bonobo-compress__lens.jpg', name: 'Bonobo', w: 240, h: 292, right: true })}
        </div>
      </div>`,
  },

  /* 02 — the problem, in label terms. The artist version is "most artists
     never find out". A label's problem isn't ignorance, it's allocation. */
  {
    section: 'The problem',
    grain: true,
    html: `
      <div class="pad l-centre">
        <h2 class="display display--m reveal"><span class="bracket">Which one gets the money</span></h2>
        <div class="dashbox reveal" style="--d:.35s;width:118px;height:118px;margin-top:96px;font-size:44px;font-weight:300;color:#fff">?</div>
      </div>`,
  },

  /* 03 */
  {
    section: 'The problem',
    html: `
      <div class="field"></div>
      ${blobs([
        { k: 'a', pos: 'left:-180px;top:-260px' },
        { k: 'c', pos: 'right:6%;top:-200px;opacity:.85' },
        { k: 'b', pos: 'left:32%;bottom:-420px;opacity:.6' },
      ])}
      <div class="pad l-end">
        <div style="display:grid;grid-template-columns:1.05fr 0.72fr;align-items:end;gap:150px">
          <h2 class="display reveal" style="font-size:64px;font-weight:700;letter-spacing:-0.035em;line-height:1.1">
            You've got the roster and the catalogue. The hard part is knowing which record deserves a real budget.
          </h2>
          <p class="body reveal" style="--d:.2s;max-width:none;padding-bottom:12px">
            The decision usually gets made on instinct, a marketing meeting and a release date.
            By the time the numbers come back the money is spent and the window has closed.
            Testing turns that into an answer you can get in a week, for a fraction of the spend.
          </p>
        </div>
      </div>`,
  },

  /* 04 — the promise. The artist deck's is "In 90 days you'll know."
     For a label the promise is speed. */
  {
    section: 'The promise',
    html: `
      <div class="field"></div>
      ${blobs([
        { k: 'c', pos: 'left:14%;top:-180px' },
        { k: 'a', pos: 'right:-220px;top:8%;opacity:.6' },
        { k: 'b', pos: 'left:-260px;bottom:-300px;opacity:.7' },
      ])}
      <div class="pad l-end">
        <h2 class="display reveal" style="font-size:150px;color:#fff;white-space:nowrap">Live in 24 hours.</h2>
      </div>`,
  },

  /* 05 */
  {
    section: 'The promise',
    html: `
      <div class="field"></div>
      ${blobs([{ k: 'a', pos: 'left:-300px;top:-200px;opacity:.55' }, { k: 'c', pos: 'right:-160px;bottom:-260px;opacity:.7' }])}
      <div class="pad l-split" style="align-items:center;gap:110px">
        <div>
          <h2 class="display display--s reveal" style="font-weight:700;letter-spacing:-0.035em;margin-bottom:44px">
            Every campaign launched inside a day.
          </h2>
          <p class="body reveal" style="--d:.15s">
            Send us a record and it's testing tomorrow, not next month. Every test
            comes back with a validated cost per new listener, so the decision to
            scale is arithmetic rather than an argument.
          </p>
          <p class="body reveal" style="--d:.28s">
            A daily dashboard means you're never waiting on a report to find out
            what your money did.
          </p>
        </div>
        <div style="display:flex;align-items:center;justify-content:center">
          ${bend({ src: 'artist__blondish__lens.jpg', name: 'Blond:Ish', w: 500, h: 610, right: true })}
        </div>
      </div>`,
  },

  /* 06 — section title */
  {
    section: 'The process',
    html: `
      <div class="field"></div>
      ${blobs([
        { k: 'c', pos: 'left:8%;top:-240px;opacity:.8' },
        { k: 'a', pos: 'right:-180px;bottom:-300px;opacity:.55' },
      ])}
      <div class="pad l-centre">
        <h2 class="display display--l reveal" style="color:#fff"><span class="bracket bracket--light">How we find the hit?</span></h2>
      </div>`,
  },

  /* 07–10 — the four steps. "Find the sound" and "test the content at scale"
     are PJ's own headings. */
  ...[
    {
      n: '01', title: 'Find the sound',
      body: 'We test every part of the record to see which seconds actually stop someone scrolling.',
      src: 'artist__bonobo-compress__lens.jpg', name: 'Bonobo',
    },
    {
      n: '02', title: 'Test the content at scale',
      body: 'Dozens of variations per record, made by our editors, running against cold audiences in every market that matters.',
      src: 'artist__thundercat__lens.jpg', name: 'Thundercat',
    },
    {
      n: '03', title: 'Validate the cost',
      body: 'Every test returns a real cost per new listener. That number decides what gets the budget and what gets dropped.',
      src: 'artist__disclosure__lens.jpg', name: 'Disclosure',
    },
    {
      n: '04', title: 'Scale what converts',
      body: 'Budget follows the number, reallocated daily, country by country, for as long as it keeps paying.',
      src: 'artist__the-knocks-compress__lens.jpg', name: 'The Knocks',
    },
  ].map((s, k) => ({
    section: 'The process',
    grain: 'soft',
    html: `
      ${spine()}
      <div class="pad l-split" style="align-items:center;gap:70px">
        <div class="l-mid">
          <h3 class="reveal" style="font-family:var(--sans);font-weight:700;font-size:58px;letter-spacing:-0.04em;color:var(--blue);margin-bottom:60px">
            <span style="opacity:.75">${s.n}</span> ${s.title}
          </h3>
          <p class="body reveal" style="--d:.18s;font-size:30px;max-width:600px">${s.body}</p>
        </div>
        <div class="reveal" style="--d:.3s;display:flex;align-items:center;justify-content:center;padding:0 30px">
          ${bend({ src: s.src, name: s.name, w: 470, h: 620, right: k % 2 === 1 })}
        </div>
      </div>`,
  })),

  /* 11 — the verdict, retoned. A label doesn't need to be told to stop
     spending; it needs to know we'll call a record dead early enough to
     put the money on the next one. */
  {
    section: 'The verdict',
    grain: true,
    html: `
      <div class="pad l-centre">
        <h2 class="display display--m reveal" style="margin-bottom:56px">
          <span class="hl">Most records won't be the one.</span>
        </h2>
        <p class="body reveal" style="--d:.16s;max-width:1080px;text-align:center;font-size:26px">
          We'll tell you which ones aren't, in days rather than quarters, and move the budget to the next record on the list.
        </p>
        <p class="body reveal" style="--d:.26s;max-width:1080px;text-align:center;font-size:26px">
          Plenty of agencies will spend a marketing budget for as long as you keep approving it. We won't.
        </p>
        <p class="body reveal" style="--d:.36s;max-width:1080px;text-align:center;font-size:26px;color:var(--blue);font-weight:600;margin-top:34px">
          The value isn't in the records we scale. It's in the ones we stop.
        </p>
      </div>`,
  },

  /* 12 — reporting */
  {
    section: 'Reporting',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.8fr 1.2fr;align-items:center;gap:110px">
        <div>
          <h2 class="display reveal" style="font-size:56px;letter-spacing:-0.04em;line-height:1.28;margin-bottom:16px">
            <span class="hl">A dashboard, daily.</span>
          </h2>
          <h2 class="display reveal" style="--d:.12s;font-size:56px;letter-spacing:-0.04em;line-height:1.12;color:var(--head);margin-bottom:40px">
            Every record on it.
          </h2>
          <p class="body reveal" style="--d:.24s;font-size:23px">
            Sweat.fm is our own platform, not a third-party dashboard. Every test,
            every cost per listener, every market, updated daily and visible to
            your whole team.
          </p>
        </div>
        <div class="shot reveal" style="--d:.32s;max-width:840px;justify-self:center">
          <img src="${img('dashboard.jpg')}" alt="Sweat.fm dashboard: per-artist monthly listeners, streams, saves and playlist adds tracked daily">
        </div>
      </div>`,
  },

  /* 13 — offer section title. PJ's framing: two routes. */
  {
    section: 'The offer',
    grain: true,
    html: `
      <div class="pad l-centre">
        <h2 class="display display--l reveal"><span class="bracket">Partner or pay as you go</span></h2>
      </div>`,
  },

  /* 14 — the retainers. All PJ's numbers. */
  {
    section: 'The offer',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:30px">Partner · retainer</div>
        <h2 class="display reveal" style="--d:.06s;font-size:60px;line-height:1.14;margin-bottom:64px">
          <span class="hl">Ad spend included.</span> Every tier.
        </h2>

        <div class="reveal" style="--d:.16s;display:grid;grid-template-columns:repeat(3,auto);justify-content:start;gap:150px">
          <div>
            <div class="display" style="font-size:96px;line-height:1;color:var(--blue)">£2K</div>
            <div class="tier" style="margin-top:24px">4 tests a month</div>
          </div>
          <div>
            <div class="display" style="font-size:96px;line-height:1;color:var(--blue)">£4K</div>
            <div class="tier" style="margin-top:24px">9 tests a month</div>
          </div>
          <div>
            <div class="display" style="font-size:96px;line-height:1;color:var(--blue)">£8K</div>
            <div class="tier" style="margin-top:24px">20 tests a month</div>
          </div>
        </div>

        <div class="rule reveal" style="--d:.34s;margin:68px 0 40px"></div>

        <p class="reveal" style="--d:.4s;font-size:34px;font-weight:700;letter-spacing:-0.03em;line-height:1.4;max-width:1200px">
          Scale at just <span style="color:var(--blue)">10% commission</span> on retainer deals.
        </p>
      </div>`,
  },

  /* 15 — the one-off. */
  {
    section: 'The offer',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.66fr 1.34fr;align-items:center;gap:86px">
        <div class="reveal" style="display:flex;align-items:center;justify-content:center">
          ${bend({ src: 'artist__rules__lens.jpg', name: 'Rules', w: 420, h: 590 })}
        </div>

        <div style="display:flex;flex-direction:column;justify-content:center;gap:56px">
          <div>
            <div class="label reveal" style="margin-bottom:28px">Pay as you go</div>
            <h2 class="display reveal" style="--d:.06s;font-size:68px;line-height:1.2">
              <span class="hl">£550 a test.</span>
            </h2>
            <p class="reveal" style="--d:.12s;font-size:38px;font-weight:600;margin-top:28px">Ad spend included.</p>
            <p class="reveal" style="--d:.18s;font-size:23px;opacity:.62;margin-top:14px">
              One record, one campaign, no commitment.
            </p>
          </div>

          <div class="rule reveal" style="--d:.26s"></div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:56px">
            <div class="reveal" style="--d:.32s">
              <div class="tier">Scaling</div>
              <p class="body" style="font-size:23px;max-width:none">
                20% commission, against 10% on a retainer.
              </p>
            </div>
            <div class="reveal" style="--d:.38s">
              <div class="tier">Minimum scale</div>
              <p class="body" style="font-size:23px;max-width:none">
                £1,000 once a record is worth pushing.
              </p>
            </div>
          </div>
        </div>
      </div>`,
  },

  /* 16 — close */
  {
    section: 'Next',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:84px;line-height:1.08;margin-bottom:52px">
          Send us a record.<br>It's live tomorrow.
        </h2>
        <ol class="steps reveal" style="--d:.2s;max-width:1620px">
          <li><span>01</span>Pick the records — yours, or we'll go through the catalogue with you.</li>
          <li><span>02</span>First campaign live within 24 hours.</li>
          <li><span>03</span>Cost per new listener back within the week.</li>
          <li><span>04</span>Scale the ones that clear the number.</li>
        </ol>
        <div class="rule reveal" style="--d:.36s;margin:60px 0 40px"></div>
        <p class="body reveal" style="--d:.42s;font-size:21px;max-width:1000px;opacity:0.75">
          Other paid media, sales and CRM execution available on request.
        </p>
        <p class="reveal" style="--d:.5s;font-size:30px;font-weight:700;margin-top:34px">
          <a href="mailto:pj@sweatstrategies.com" style="color:var(--blue)">pj@sweatstrategies.com</a>
        </p>
      </div>`,
  },
];
