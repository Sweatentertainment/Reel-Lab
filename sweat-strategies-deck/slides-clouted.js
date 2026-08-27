/* ------------------------------------------------------------------
   Clouted × Sweat Strategies — paid media

   WHERE THIS CAME FROM
   Gmail thread "[Paid Ads] Sweat Strategies x NGHTMRE — No Air"
   (pj@sweatstrategies.com ↔ Polly at Clouted, August 2026). PJ offered:
   "would you like me to make a paid media collaboration deck for
   Clouted x Sweat? That way you have something to share with clients
   that sells it in." Polly: "That sounds great."

   So the reader is NOT Clouted. The reader is a Clouted client, and
   Clouted is the one handing it over. That decides three things:

   · IT IS ONE VOICE. Per PJ: "the tone should be as it's coming from
     both of us." Nothing in here explains who does what, splits the two
     companies apart, or routes the client through Clouted — the header
     carries both names and everything under it says "we". A client
     reading their own proposal should not be reading about the supply
     chain behind it.

   · THE 20% CLOUTED TAKE IS NOT IN HERE. PJ, in the thread: "Then
     Clouted take 20% of our fees." That is the partner economics
     between the two companies. A client reading their own proposal
     should see what they pay, which is $850 and then 20% of further ad
     spend — nothing about how the fee is split behind them.

   · THE CASE STUDIES ARE THE ANONYMISED SET. This document leaves
     Sweat's hands and goes to third parties, which is exactly what
     slides-labels-anon.js exists for. Same figures, no artist names.
     OPTS.legal says so on every page, as it does there.

   THE RATES, from the same thread and confirmed by PJ against Polly's
   worked example ("That's correct"):
     · Test campaign $850 — half fee, half ad spend
     · Thereafter 20% of further ad spend
     · On a $1,500 budget: $555 to Sweat, $945 into the platforms

   DELIBERATELY LEFT OUT
   · Clouted's revenue share (above).
   · The $4,500 / 3-month and $2,000 PCM retainers from the standard
     proposal. The Clouted deal is priced per campaign; showing the
     retainer next to it invites a comparison nobody asked for.
   · A "who does what" slide, the ticketing and merch case studies, and
     the worked example of a $1,500 budget. All three were in the first
     cut; PJ took them out. The rates slide carries the arithmetic on
     its own.
   · laptop() on the reporting slide — its frame is an unlicensed stock
     comp, and this is a document going out to third-party clients.
     browser() is drawn and carries no licence risk.

   OUTSTANDING
   · The CLOUTED wordmark is set in type here because the PNGs Diego
     sent are email attachments with no download path from this machine.
     Drop CLOUTED-wordmark-white.png into assets/img/ and swap the
     <span> on slide 01 for an <img> — it is a one-line change. White is
     the one to ask for; the ground is black.
   ------------------------------------------------------------------ */

import { spine, blobs, bend, browser } from './parts.js';
import { anon as c } from './cases.js';

export const OPTS = {
  brand: 'Clouted × Sweat Strategies',
  legal: 'Case study data is anonymised — artist names, track titles and<br>'
    + 'artwork removed. All figures are unchanged. 2026 Clouted × Sweat Strategies.',
};

/* The act dividers all use the same treatment, so they're written once. */
const act = ({ section, title, light = false }) => ({
  section,
  grain: light ? 'soft' : true,
  html: `
    ${light ? '<div class="field"></div>' : ''}
    ${light ? blobs([
      { k: 'c', pos: 'left:8%;top:-240px;opacity:.8' },
      { k: 'a', pos: 'right:-180px;bottom:-300px;opacity:.55' },
    ]) : ''}
    <div class="pad l-centre">
      <h2 class="display display--l reveal"${light ? ' style="color:#fff"' : ''}>
        <span class="bracket${light ? ' bracket--light' : ''}">${title}</span>
      </h2>
    </div>`,
});

export const SLIDES = [
  /* 01 — cover. Typographic rather than the photographic cover.jpg used by
     the Sweat proposal: that image has the Sweat lockup baked into it, and
     this deck belongs to two companies. */
  {
    section: 'Paid media',
    chrome: 'none',
    grain: true,
    html: `
      ${blobs([
        { k: 'a', pos: 'left:-260px;top:-300px;opacity:.35' },
        { k: 'c', pos: 'right:-200px;bottom:-340px;opacity:.4' },
      ])}
      <div class="pad l-mid">
        <div class="reveal" style="display:flex;align-items:center;gap:44px;margin-bottom:78px">
          <span style="font-family:var(--sans);font-weight:800;font-size:44px;letter-spacing:0.02em;color:#fff">CLOUTED</span>
          <span style="font-family:var(--sans);font-weight:300;font-size:40px;opacity:.5;color:#fff">×</span>
          <span style="font-family:var(--sans);font-weight:800;font-size:44px;letter-spacing:-0.02em;color:#fff">SWEAT&nbsp;STRATEGIES</span>
        </div>
        <h1 class="display reveal" style="--d:.14s;font-size:186px;line-height:0.92;color:#fff">Paid<br>media.</h1>
        <p class="body reveal" style="--d:.3s;font-size:25px;max-width:680px;margin-top:52px">
          Campaigns that start as a test, prove themselves on the numbers,
          and only then get money behind them.
        </p>
      </div>`,
  },

  /* 02 — a short intro to the media, in the joint voice. Was a "who does
     what" slide splitting the two companies; PJ cut it — a client does not
     need the org chart, they need to know the media is good. */
  {
    section: 'Paid media',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display display--s reveal" style="margin-bottom:44px">Best-in-class paid media.</h2>
        <p class="body reveal" style="--d:.14s;font-size:26px;max-width:1240px">
          We build the creative, buy the ads and read the data daily, for
          major-label artists and independents alike. Nine figures of streams,
          bought at somewhere between fourteen and twenty-four pence a listener.
        </p>
        <p class="body reveal" style="--d:.24s;font-size:26px;max-width:1240px">
          Every campaign is measured on what it returned, not on impressions.
          That is the whole difference.
        </p>
        <div class="rule reveal" style="--d:.34s;margin:72px 0 40px"></div>
        <div class="reveal" style="--d:.4s">
          <div class="label" style="margin-bottom:26px">Labels &amp; partners</div>
          <ul class="channels">
            <li>Atlantic Records</li><li>BMG</li><li>Ninja Tune</li><li>Live Nation</li>
            <li>CAA</li><li>SJM</li><li>Too Lost</li><li>Propeller</li>
          </ul>
        </div>
      </div>`,
  },

  /* 03 — the problem, in the treatment PJ picked out of the V3 deck. */
  {
    section: 'The problem',
    grain: true,
    html: `
      <div class="pad l-centre">
        <h2 class="display display--m reveal"><span class="bracket">Most artists never find out</span></h2>
        <div class="dashbox reveal" style="--d:.35s;width:118px;height:118px;margin-top:96px;font-size:44px;font-weight:300;color:#fff">?</div>
      </div>`,
  },

  /* 04 */
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
            Most paid media is a bet placed with your money and settled with your money.
          </h2>
          <p class="body reveal" style="--d:.2s;max-width:none;padding-bottom:12px">
            You back the track you love, spend what you can afford, and hope. When it
            doesn't work you've got no idea whether it was the song, the audience or
            the ads. So the next release starts from zero again.
          </p>
        </div>
      </div>`,
  },

  /* 05 — the promise, and the hinge the whole offer turns on. */
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
        <h2 class="display reveal" style="font-size:108px;color:#fff;white-space:nowrap">Every campaign starts as a test.</h2>
      </div>`,
  },

  /* 06 */
  {
    section: 'The promise',
    html: `
      <div class="field"></div>
      ${blobs([{ k: 'a', pos: 'left:-300px;top:-200px;opacity:.55' }, { k: 'c', pos: 'right:-160px;bottom:-260px;opacity:.7' }])}
      <div class="pad l-split" style="align-items:center;gap:110px">
        <div>
          <h2 class="display display--s reveal" style="font-weight:700;letter-spacing:-0.035em;margin-bottom:44px">
            $850 buys you an answer.
          </h2>
          <p class="body reveal" style="--d:.15s">
            Before anybody asks you for a budget, we run the record against real
            audiences and find out what it does. Which cut of the song stops a
            scroll, which country reacts, what a listener costs.
          </p>
          <p class="body reveal" style="--d:.28s">
            If it's working, you scale it knowing the number. If it isn't, you've
            spent $850 instead of five thousand.
          </p>
        </div>
        <div style="display:flex;align-items:center;justify-content:center">
          ${bend({ src: 'artist__st-lundi__lens.jpg', name: 'St Lundi', w: 500, h: 610, right: true })}
        </div>
      </div>`,
  },

  /* 07 */
  act({ section: 'How it works', title: 'How it works', light: true }),

  /* 08–11 — the four process slides, the same treatment as the Sweat
     proposal. Different artists in the cards to the offer slides so no face
     appears twice. */
  ...[
    {
      n: '01', title: 'Find the sound',
      body: 'We test every part of the song to see which seconds actually stop someone scrolling.',
      src: 'artist__bonobo-compress__lens.jpg', name: 'Bonobo',
    },
    {
      n: '02', title: 'Build the content',
      body: "Up to 25 visuals per song, made by our editors, trained on what's already winning.",
      src: 'artist__blondish__lens.jpg', name: 'Blond:Ish',
    },
    {
      n: '03', title: 'Make the call',
      body: "We tell you whether it's worth scaling, and how hard to push.",
      src: 'artist__disclosure__lens.jpg', name: 'Disclosure',
    },
    {
      n: '04', title: 'Watch it land',
      body: "We track Spotify for Artists daily, country by country, and move the money to where it's converting.",
      src: 'artist__thundercat__lens.jpg', name: 'Thundercat',
    },
  ].map((s, k) => ({
    section: 'How it works',
    grain: 'soft',
    html: `
      ${spine()}
      <div class="pad l-split" style="align-items:center;gap:70px">
        <div class="l-mid">
          <h3 class="reveal" style="font-family:var(--sans);font-weight:700;font-size:62px;letter-spacing:-0.04em;color:var(--blue);margin-bottom:64px">
            <span style="opacity:.75">${s.n}</span> ${s.title}
          </h3>
          <p class="body reveal" style="--d:.18s;font-size:31px;max-width:600px">${s.body}</p>
        </div>
        <div class="reveal" style="--d:.3s;display:flex;align-items:center;justify-content:center;padding:0 30px">
          ${bend({ src: s.src, name: s.name, w: 470, h: 620, right: k % 2 === 1 })}
        </div>
      </div>`,
  })),

  /* 12 — the verdict. The one promise in the deck that costs us money to
     keep, which is why it stays in a document going out under two names. */
  {
    section: 'The verdict',
    grain: true,
    html: `
      <div class="pad l-centre">
        <h2 class="display display--m reveal" style="margin-bottom:56px">
          <span class="hl">We'll tell you if it's not working.</span>
        </h2>
        <p class="body reveal" style="--d:.16s;max-width:1080px;text-align:center;font-size:26px">
          Plenty of agencies will spend your money for as long as you'll keep giving it to them. We won't.
        </p>
        <p class="body reveal" style="--d:.26s;max-width:1080px;text-align:center;font-size:26px">
          If a record isn't converting, we say so, and we say what we'd try instead.
        </p>
        <p class="body reveal" style="--d:.36s;max-width:1080px;text-align:center;font-size:26px;color:var(--blue);font-weight:600;margin-top:34px">
          You're not paying us to be optimistic. You're paying us for an answer.
        </p>
      </div>`,
  },

  /* 13 */
  act({ section: 'The proof', title: 'The proof' }),

  /* 14–17 — anonymised case studies, largest first. The ticketing and merch
     cases were here too and PJ cut them; the deck stays on streaming, which
     is what the rates price. */
  c.asSoonAsIGetHome,   // 48.9M on one EP
  c.distracted,         // 73.8M over twelve months
  c.harryT,             // 0 to 7.2M in 90 days
  c.maribouState,       // a 2015 record, 4.3M in 28 days

  /* 18 — reporting. browser() rather than laptop(): see the header note. */
  {
    section: 'Reporting',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.76fr 1.24fr;align-items:center;gap:70px">
        <div>
          <h2 class="display reveal" style="font-size:56px;letter-spacing:-0.04em;line-height:1.28;margin-bottom:16px">
            <span class="hl">You'll see everything.</span>
          </h2>
          <h2 class="display reveal" style="--d:.12s;font-size:56px;letter-spacing:-0.04em;line-height:1.12;color:var(--head);margin-bottom:40px">
            We mean everything.
          </h2>
          <p class="body reveal" style="--d:.24s;font-size:23px">
            Live dashboard, updated daily. Written status report every week. Full
            review every month where we go through what the data's saying and what
            we're doing about it. Nothing held back and nothing rounded up.
          </p>
        </div>
        <div class="reveal" style="--d:.32s;max-width:1060px;justify-self:center;width:100%">
          ${browser({ src: 'dashboard.jpg', alt: 'Sweat live campaign dashboard' })}
        </div>
      </div>`,
  },

  /* 19 */
  act({ section: 'The rates', title: 'What it costs' }),

  /* 20 — the rates, exactly as agreed. Two numbers and nothing else on the
     left; the worked example on the right so nobody has to do the sum. */
  {
    section: 'The rates',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display display--s reveal" style="margin-bottom:56px">Two numbers.</h2>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:110px;max-width:1560px">
          <div class="reveal" style="--d:.14s">
            <div class="tier">The test campaign</div>
            <p style="font-family:var(--sans);font-weight:800;font-size:74px;letter-spacing:-0.04em;line-height:1;margin:0 0 22px">$850</p>
            <p class="body" style="font-size:22px;max-width:none">
              Half of it is our fee, for the testing phase and the content we make
              for it. The other half goes straight into ad spend. One flat price to
              find out what the record does.
            </p>
          </div>
          <div class="reveal" style="--d:.22s">
            <div class="tier">Once it's working</div>
            <p style="font-family:var(--sans);font-weight:800;font-size:74px;letter-spacing:-0.04em;line-height:1;margin:0 0 22px">20%</p>
            <p class="body" style="font-size:22px;max-width:none">
              of any further ad spend, as the management fee. No retainer, no
              minimum term. We earn more only when you've decided the record is
              worth pushing harder.
            </p>
          </div>
        </div>

        <div class="rule reveal" style="--d:.3s;margin:70px 0 44px"></div>

        <p class="reveal" style="--d:.36s;font-size:24px;font-weight:600;line-height:1.5;max-width:1300px">
          Ad spend is never marked up. Every dollar of it reaches the platforms and
          shows up in the reporting.
        </p>
      </div>`,
  },

  /* 21 — the wider offer, kept as an "ask us" rather than a menu with prices
     on it. PJ's steer: the deal we've agreed is the streaming campaign, and
     everything else is priced per job. */
  {
    section: 'Other paid media',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.82fr 1.18fr;align-items:center;gap:90px">
        <div>
          <h2 class="display display--s reveal" style="line-height:1.02;margin-bottom:38px">
            Everything<br>else, on<br>request.
          </h2>
          <p class="body reveal" style="--d:.16s;max-width:520px">
            The rates above cover the streaming campaign. A record that's working
            rarely stops there — tickets, merch, a fan capture flow, a full
            multi-channel rollout. Ask and we'll quote it per campaign.
          </p>
        </div>

        <div style="display:flex;flex-direction:column;gap:44px">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:56px">
            <div class="reveal" style="--d:.24s">
              <div class="tier">Scale it</div>
              <p class="body" style="font-size:23px;max-width:none">
                Winning creative, put behind budget across every channel that turns
                a listener into a fan. Priced on the spend.
              </p>
            </div>
            <div class="reveal" style="--d:.3s">
              <div class="tier">Own it</div>
              <p class="body" style="font-size:23px;max-width:none">
                Fan capture, tour and ticketing campaigns, merch. Quoted per
                campaign, on what it needs.
              </p>
            </div>
          </div>

          <p class="reveal" style="--d:.36s;font-size:25px;font-weight:600;line-height:1.5">
            Ads rent your listeners. A fan capture flow means you own the audience instead.
          </p>

          <div class="rule reveal" style="--d:.42s"></div>

          <div class="reveal" style="--d:.46s">
            <div class="label" style="margin-bottom:24px">Channels we run</div>
            <ul class="channels">
              <li>Meta</li><li>TikTok</li><li>YouTube</li><li>Spotify</li>
              <li>Apple</li><li>Live</li><li>Merch</li>
            </ul>
          </div>
        </div>
      </div>`,
  },

  /* 22 — the close. The next step goes through Clouted, because that is the
     relationship this deck is protecting. */
  {
    section: 'Next',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.66fr 1.34fr;align-items:center;gap:86px">
        <div class="reveal" style="display:flex;align-items:center;justify-content:center">
          ${bend({ src: 'artist__kid-apollo-compress__lens.jpg', name: 'Kid Apollo', w: 420, h: 590 })}
        </div>

        <div style="display:flex;flex-direction:column;justify-content:center;gap:62px">
          <div>
            <h2 class="display reveal" style="font-size:68px;line-height:1.22"><span class="hl">Start with one record.</span></h2>
            <p class="reveal" style="--d:.12s;font-size:23px;opacity:.62;margin-top:18px">
              $850, and about a week before you know something.
            </p>
          </div>

          <div class="rule reveal" style="--d:.2s"></div>

          <div>
            <ol class="steps reveal" style="--d:.26s">
              <li><span>01</span>Tell us which record you want tested.</li>
              <li><span>02</span>We pick the cuts and the markets together.</li>
              <li><span>03</span>Test live within a week.</li>
              <li><span>04</span>You get the answer, and decide what to spend.</li>
            </ol>
            <p class="reveal" style="--d:.36s;font-size:26px;font-weight:700;margin-top:44px;line-height:1.5">
              Ready when you are —
              <a href="mailto:pj@sweatstrategies.com" style="color:var(--blue)">pj@sweatstrategies.com</a>
            </p>
          </div>
        </div>
      </div>`,
  },
];
