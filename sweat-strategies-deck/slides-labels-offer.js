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

import { img, spine, blobs, bend, browser } from './parts.js';

export const SLIDES = [
  /* 01 — cover. Miguel's original, the same one that opens the artist deck:
     used whole, with its own baked-in chrome, so we don't double up on the
     slide furniture. */
  {
    section: 'Proposal',
    chrome: 'none',
    html: `
      <div style="position:absolute;inset:0;z-index:0">
        <img src="${img('cover.jpg')}" alt="" style="width:100%;height:100%;object-fit:cover">
      </div>`,
  },

  /* 02 — the hook */
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
          ${bend({ src: 'artist__thundercat__lens.jpg', name: 'Thundercat', w: 240, h: 292, right: true })}
        </div>
      </div>`,
  },

  /* 03 — who we work with. Sits here rather than late in the deck: a label
     reading a cold proposal wants to know who we are before it'll entertain
     our theory of its problem. "Currently running" is from PJ's own
     proposal doc, 4 Aug 2026. */
  {
    section: 'Who we work with',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:28px">Campaigns for</div>
        <p class="reveal" style="--d:.08s;font-family:var(--sans);font-weight:800;font-size:50px;line-height:1.28;letter-spacing:-0.04em;max-width:1620px">
          Swedish House Mafia · Thundercat · Barry Can't Swim ·
          Omar+ · St Lundi · ADMT
        </p>
        <div class="rule reveal" style="--d:.2s;margin:52px 0 36px"></div>
        <div class="label reveal" style="--d:.26s;margin-bottom:24px">Also on the books</div>
        <p class="reveal" style="--d:.32s;font-family:var(--sans);font-weight:700;font-size:31px;line-height:1.4;letter-spacing:-0.03em;max-width:1620px">
          Disclosure · Bonobo · Maribou State · Blond:Ish · Mark Tuan ·
          Leon Thomas · Harry T · Cristoph · The Listros · KOGIS · Ruthanne ·
          Kid Apollo · Dolores Forever · The Knocks · Rules · Morly · Scout · Ormella
        </p>
        <div class="rule reveal" style="--d:.38s;margin:48px 0 32px"></div>
        <div class="label reveal" style="--d:.44s;margin-bottom:24px">Labels &amp; partners</div>
        <ul class="channels reveal" style="--d:.5s">
          <li>Atlantic Records</li><li>BMG</li><li>Ninja Tune</li><li>Live Nation</li>
          <li>CAA</li><li>SJM</li><li>Disorder</li><li>Propeller</li><li>Redlight</li>
          <li>Too Lost</li><li>3000 Years</li><li>Funfair</li>
        </ul>
      </div>`,
  },

  /* 04 — the problem. PJ's underlying point is that in-house teams launch
     what they're given, but stated that way it accuses the person reading
     it, who may well run that team. Leading with the mechanism instead
     makes it a fact rather than a charge — and it sets up the retainer
     tiers, which are all about buying volume. */
  {
    section: 'The problem',
    grain: true,
    html: `
      <div class="pad l-centre">
        <h2 class="display display--m reveal"><span class="bracket">You can't optimise four assets</span></h2>
      </div>`,
  },

  /* 05 */
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
          <h2 class="display reveal" style="font-size:62px;font-weight:700;letter-spacing:-0.035em;line-height:1.12">
            A few edits go out. Nobody ever finds out whether a different one would have worked better.
          </h2>
          <p class="body reveal" style="--d:.2s;max-width:none;padding-bottom:12px">
            That isn't a criticism of the team — it's what the workflow allows.
            Assets arrive, spend goes behind them, and the numbers come back after
            the money's gone. When it underperforms there's no way to tell whether
            it was the record, the audience or the edit, because only a handful ever ran.
          </p>
        </div>
      </div>`,
  },

  /* 06 — the answer to it, stated as a contrast. Covers PJ's four points:
     content at scale, cost per result driven down, a straight read on what
     works, and speed. */
  {
    section: 'The difference',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:62px;line-height:1.14;margin-bottom:70px;max-width:1400px">
          <span class="hl">We don't launch creative.</span> We find out which creative works, then launch that.
        </h2>
        <ol class="steps reveal" style="--d:.18s">
          <li><span>01</span>
            <div>
              <div style="font-family:var(--sans);font-weight:700;font-size:26px;letter-spacing:-0.03em;margin-bottom:10px">Content at scale</div>
              <p class="body" style="font-size:20px;max-width:620px">Dozens of edits per record, not the handful you were handed.</p>
            </div>
          </li>
          <li><span>02</span>
            <div>
              <div style="font-family:var(--sans);font-weight:700;font-size:26px;letter-spacing:-0.03em;margin-bottom:10px">Cost driven down</div>
              <p class="body" style="font-size:20px;max-width:620px">Volume is what gets a cost per result low. A handful can't find the winner.</p>
            </div>
          </li>
          <li><span>03</span>
            <div>
              <div style="font-family:var(--sans);font-weight:700;font-size:26px;letter-spacing:-0.03em;margin-bottom:10px">A straight read</div>
              <p class="body" style="font-size:20px;max-width:620px">We tell you what's working and what isn't, and which of the two the record is.</p>
            </div>
          </li>
          <li><span>04</span>
            <div>
              <div style="font-family:var(--sans);font-weight:700;font-size:26px;letter-spacing:-0.03em;margin-bottom:10px">Days, not quarters</div>
              <p class="body" style="font-size:20px;max-width:620px">Live in 24 hours, read within the week, while the release window is still open.</p>
            </div>
          </li>
        </ol>
      </div>`,
  },

  /* 07 — the promise. The artist deck's is "In 90 days you'll know."
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

  /* 08 */
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

  /* 09 — section title */
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

  /* 10–13 — the four steps. "Find the sound" and "test the content at scale"
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
      src: 'artist__kid-apollo-compress__lens.jpg', name: 'Kid Apollo',
    },
    {
      n: '03', title: 'Validate the cost',
      body: 'Every test returns a real cost per new listener. That number decides what gets the budget and what gets dropped.',
      src: 'artist__dolores-forever__lens.jpg', name: 'Dolores Forever',
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

  /* 14 — the verdict, retoned. A label doesn't need to be told to stop
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

  /* 15 — reporting */
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
        <div class="reveal" style="--d:.32s;max-width:860px;justify-self:center;width:100%">
          ${browser({ src: 'dashboard.jpg', alt: 'Sweat.fm dashboard: per-artist monthly listeners, streams, saves and playlist adds tracked daily' })}
        </div>
      </div>`,
  },

  /* 16 — offer section title. PJ's framing: two routes. */
  {
    section: 'The offer',
    grain: true,
    html: `
      <div class="pad l-centre">
        <h2 class="display display--l reveal"><span class="bracket">Partner or pay as you go</span></h2>
      </div>`,
  },

  /* 17 — the retainers. All PJ's numbers. */
  {
    section: 'The offer',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:30px">Partner · retainer</div>
        <h2 class="display reveal" style="--d:.06s;font-size:60px;line-height:1.14;margin-bottom:20px">
          <span class="hl">The tests come with</span><br>the ad spend to run them.
        </h2>
        <p class="body reveal" style="--d:.12s;font-size:23px;max-width:900px;margin-bottom:58px">
          One monthly fee covers both. Nothing extra to approve before a record
          starts testing.
        </p>

        <div class="reveal" style="--d:.2s;display:grid;grid-template-columns:repeat(3,auto);justify-content:start;gap:150px">
          <div>
            <div class="display" style="font-size:92px;line-height:1;color:var(--blue)">£2K</div>
            <div class="tier" style="margin-top:22px">4 tests a month</div>
          </div>
          <div>
            <div class="display" style="font-size:92px;line-height:1;color:var(--blue)">£4K</div>
            <div class="tier" style="margin-top:22px">9 tests a month</div>
          </div>
          <div>
            <div class="display" style="font-size:92px;line-height:1;color:var(--blue)">£8K</div>
            <div class="tier" style="margin-top:22px">20 tests a month</div>
          </div>
        </div>

        <div class="rule reveal" style="--d:.36s;margin:58px 0 36px"></div>

        <p class="reveal" style="--d:.42s;font-size:32px;font-weight:700;letter-spacing:-0.03em;line-height:1.4;max-width:1300px">
          Scale at just <span style="color:var(--blue)">10% commission</span> on retainer deals.
        </p>
        <p class="body reveal" style="--d:.48s;font-size:21px;max-width:900px;margin-top:22px;opacity:0.75">
          Scaling budget is separate — you set it, and only once a record has
          earned it.
        </p>
      </div>`,
  },

  /* 18 — the one-off. */
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
            <p class="reveal" style="--d:.12s;font-size:36px;font-weight:600;margin-top:28px">Testing ad spend included.</p>
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

  /* 19 — close */
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
