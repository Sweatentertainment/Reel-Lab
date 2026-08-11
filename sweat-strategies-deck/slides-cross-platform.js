/* ------------------------------------------------------------------
   Established artists — cross-platform paid media

   The third proposal. The artist deck sells a question (have you got a
   song?) and the label deck sells speed and volume on one channel. An
   established artist has neither problem: there is a record, there is an
   audience, and there is already spend going out. What they don't have is
   one operation running all of it.

   So the argument here is that the channels are not interchangeable —
   a conversion campaign is right for a ticket link and wrong for TikTok —
   and that the streaming method (unchanged from the label deck, because
   it's the proven one) is the same discipline applied to every other
   platform. The CRM section is the part nobody else pitches, so it gets
   its own act rather than a bullet.

   Channel copy is PJ's brief, tightened but not extended: Live is
   conversion plus promoter partners, TikTok is boosting winners and
   influencer seeding rather than conversion, YouTube is engagement and
   reach for traction, merch is funnels, drops and Shopify management.
   Nothing has been added to make a slide look fuller.

   No prices. PJ: pricing based on scope, via conversation. The engagement
   slide says exactly that and asks for the three things a scope needs.

   Artist photography is the four biggest names in the library — Disclosure,
   Thundercat, Blond:Ish, Bonobo — one each on the four streaming slides,
   and nowhere else. The hook is typographic rather than carrying cards,
   which is what keeps every face in this deck a top-tier one.
   ------------------------------------------------------------------ */

import { img, spine, blobs, bend, roster, laptop, voicenote } from './parts.js';

/* ---------------------------------------------------------- local archetypes */

/* A channel slide. The channel name is set big and in the head grey above the
   argument, so flipping through the deck reads as a list of platforms rather
   than a run of similar-looking type. `points` is the mechanism, `chips` the
   evidence — only Live has any. */
const channel = ({ n, name, headline, body, points, label = '', chipsLabel = '', chips = [] }) => ({
  section: 'Paid media',
  grain: 'soft',
  html: `
    <div class="pad l-mid">
      <div class="label reveal" style="margin-bottom:26px">${label || `Paid media · ${n} of 04`}</div>
      <h2 class="display reveal" style="--d:.06s;font-size:104px;line-height:1;color:var(--head);margin-bottom:30px">${name}</h2>
      <h3 class="display reveal" style="--d:.12s;font-size:44px;line-height:1.2;max-width:1300px;margin-bottom:28px">${headline}</h3>
      <p class="body reveal" style="--d:.2s;font-size:22px;max-width:1180px">${body}</p>

      <div class="rule reveal" style="--d:.3s;margin:52px 0 36px"></div>

      ${/* two points across the full 1728 leaves each rule twice as long as the
            copy under it, so the shorter sets are capped rather than stretched */ ''}
      <ol class="steps reveal" style="--d:.36s;grid-template-columns:repeat(${points.length},1fr);${points.length < 3 ? 'max-width:1150px' : ''}">
        ${points.map((p, i) => `
          <li><span>${String(i + 1).padStart(2, '0')}</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">${p.t}</div>
            <p class="body" style="font-size:19px;max-width:none">${p.b}</p>
          </li>`).join('')}
      </ol>

      ${chips.length ? `
        <div class="reveal" style="--d:.46s;margin-top:46px">
          <div class="label" style="font-size:17px;margin-bottom:20px">${chipsLabel}</div>
          <ul class="channels">${chips.map((c) => `<li>${c}</li>`).join('')}</ul>
        </div>` : ''}
    </div>`,
});

/* The fan flow. Six nodes on one rule — see `.flow` in deck.css for why it's a
   connected journey rather than six cards. */
const FAN_FLOW = [
  {
    n: 'Step 01', t: 'A new follower',
    b: 'Someone follows the account. That is the whole trigger — nothing has to be posted, sent or remembered.',
  },
  {
    n: 'Step 02', t: 'An automatic DM',
    b: 'A message from the artist within seconds: hello, and would you like an exclusive track?',
  },
  {
    n: 'Step 03', t: 'First-party capture',
    b: 'They say yes and leave an email address. It belongs to the artist, not to the platform it came from.',
  },
  {
    n: 'Step 04', t: 'The email',
    b: 'An introduction to the artist and the demo they were promised, sent straight away.',
  },
  {
    n: 'Step 05', t: 'They listen',
    b: 'Someone who followed an hour ago has now heard something nobody else has.',
  },
  {
    n: 'Step 06', t: 'The voice note',
    b: 'An Instagram voice note, in the artist’s own voice — which is where the automation hands over to a person.',
    human: true,
  },
];

export const SLIDES = [
  /* 01 — cover. Miguel's original, as on both other proposals, with this deck's
     own title set under the chrome wordmark.

     Positions are measured off the artwork rather than set to the deck's `--pad`:
     the wordmark's right edge sits ~45px from the frame, so a caption aligned to
     the usual 96px gutter would read as misaligned with the thing directly above
     it. The cover carries its own baked-in chrome, hence `chrome: 'none'`. */
  {
    section: 'Proposal',
    chrome: 'none',
    html: `
      <div style="position:absolute;inset:0;z-index:0">
        <img src="${img('cover.jpg')}" alt="" style="width:100%;height:100%;object-fit:cover">
      </div>
      <div class="reveal" style="--d:.5s;position:absolute;right:45px;top:712px;z-index:20;text-align:right">
        <div style="font-family:var(--mono);text-transform:uppercase;font-size:30px;letter-spacing:0.22em;color:#fff;text-shadow:0 2px 24px rgba(0,0,0,0.55)">
          Full Funnel Deck
        </div>
      </div>`,
  },

  /* 02 — the hook. Typographic rather than carrying artist cards: the four
     names worth showing are spoken for by the streaming slides, and a smaller
     one here would undercut the first thing the reader sees. */
  {
    section: 'Proposal',
    html: `
      <div class="field"></div>
      ${blobs([
        { k: 'a', pos: 'left:-220px;top:-240px;opacity:.7' },
        { k: 'c', pos: 'right:4%;top:-160px;opacity:.85' },
        { k: 'b', pos: 'left:38%;bottom:-440px;opacity:.55' },
      ])}
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:44px">Artists &amp; management · 2026</div>
        <h1 class="display reveal" style="--d:.1s;font-size:154px;line-height:0.94;color:#fff">We run<br>all of it.</h1>
        <p class="body reveal" style="--d:.26s;font-size:27px;max-width:900px;margin-top:52px">
          Streaming, live, TikTok, YouTube, merch — and the CRM underneath them.
          One team buying every channel the way that channel actually works.
        </p>
      </div>`,
  },

  /* 03 — the roster, from parts.js. Same reasoning as the label deck: an
     established artist's manager wants to know who else we do this for before
     they'll read our theory of their problem. */
  roster(),

  /* 04 — the principle, not a problem. An earlier cut ran this as "every
     platform gets bought the same way", which reads as an accusation aimed at
     whoever is currently buying — and set as a full-bleed bracket it looked
     like the deck's selling point rather than its setup. The thing worth
     asserting is that the platforms are genuinely different animals. */
  {
    section: 'The principle',
    grain: true,
    html: `
      <div class="pad l-centre">
        ${/* kept short enough to hold one line at display--m — the longer cut
              of this wrapped onto "...behave the / same", which reads as a
              mistake on a slide that is nothing but the line */ ''}
        <h2 class="display display--m reveal"><span class="bracket">No two platforms behave the same</span></h2>
      </div>`,
  },

  /* 05 — and what follows from it. Everything is meant to convert; what
     differs is the route that gets there for the least money. An earlier cut
     argued this in ad-platform terms — campaign types, objectives, pixels —
     which is the buyer's vocabulary, not the reader's. Kept on outcomes. */
  {
    section: 'The principle',
    html: `
      <div class="field"></div>
      ${blobs([
        { k: 'c', pos: 'left:-160px;top:-220px' },
        { k: 'a', pos: 'right:-200px;bottom:-320px;opacity:.6' },
      ])}
      <div class="pad l-end">
        <div style="display:grid;grid-template-columns:1.05fr 0.72fr;align-items:end;gap:150px">
          <h2 class="display reveal" style="font-size:62px;font-weight:700;letter-spacing:-0.035em;line-height:1.12">
            All of it is there to convert. What changes is the campaign that gets you there.
          </h2>
          <p class="body reveal" style="--d:.2s;max-width:none;padding-bottom:12px">
            Tickets, streams, subscribers, merch — every channel has an outcome we're
            driving somebody towards. What differs is the route. On some, spending
            straight at the sale is the cheapest way there. On others it's slower, or
            it's putting money behind what's already working and letting the sale
            follow. We buy each one the way that reaches the outcome for the least
            money, not the way that looks the most direct.
          </p>
        </div>
      </div>`,
  },

  /* 06 — the answer, as a contrast. This is the "we do all your paid media"
     slide PJ asked for, stated as an operating model rather than a boast. */
  {
    section: 'The difference',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:62px;line-height:1.14;margin-bottom:70px;max-width:1480px">
          <span class="hl">One team across every platform.</span> Each one bought the way it actually works.
        </h2>
        <ol class="steps reveal" style="--d:.18s">
          <li><span>01</span>
            <div>
              <div style="font-family:var(--sans);font-weight:700;font-size:26px;letter-spacing:-0.03em;margin-bottom:10px">One operation</div>
              <p class="body" style="font-size:20px;max-width:620px">Streaming, live, TikTok, YouTube, merch and CRM, run by the same people against the same numbers.</p>
            </div>
          </li>
          <li><span>02</span>
            <div>
              <div style="font-family:var(--sans);font-weight:700;font-size:26px;letter-spacing:-0.03em;margin-bottom:10px">Tested, not assumed</div>
              <p class="body" style="font-size:20px;max-width:620px">The same discipline behind every channel: many variants, cold audiences, and the winner takes the budget.</p>
            </div>
          </li>
          <li><span>03</span>
            <div>
              <div style="font-family:var(--sans);font-weight:700;font-size:26px;letter-spacing:-0.03em;margin-bottom:10px">A single read</div>
              <p class="body" style="font-size:20px;max-width:620px">One place to see what every pound did, rather than four reports that count things differently.</p>
            </div>
          </li>
          <li><span>04</span>
            <div>
              <div style="font-family:var(--sans);font-weight:700;font-size:26px;letter-spacing:-0.03em;margin-bottom:10px">An audience you own</div>
              <p class="body" style="font-size:20px;max-width:620px">Every campaign feeds a list you keep, not a follower count you rent.</p>
            </div>
          </li>
        </ol>
      </div>`,
  },

  /* 07 — the map. Signposts the three acts that follow: the streaming method,
     the other four channels, then the CRM. */
  {
    section: 'The difference',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:34px">What we run</div>
        <h2 class="display reveal" style="--d:.08s;font-size:74px;line-height:1.1;margin-bottom:58px;max-width:1400px">
          Every channel, bought its own way.
        </h2>
        <ul class="channels reveal" style="--d:.18s">
          <li>Streaming</li><li>Live</li><li>Ticketing</li><li>TikTok</li><li>YouTube</li><li>Merch</li><li>CRM &amp; fan flow</li>
        </ul>
        <div class="rule reveal" style="--d:.3s;margin:60px 0 40px"></div>
        <p class="body reveal" style="--d:.36s;font-size:22px;max-width:1100px">
          Paid media, the creative testing behind it, the ticketing if you want it,
          and the CRM that keeps what all of it buys. What follows is the streaming
          method first, because it is the one with the longest record behind it, then
          the same discipline everywhere else.
        </p>
      </div>`,
  },

  /* 08 — streaming section title */
  {
    section: 'Streaming',
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

  /* 09–12 — the four steps, unchanged from the label deck. It is the method
     with the evidence behind it, and rewriting it for a different reader
     would only make the two documents disagree. */
  ...[
    {
      n: '01', title: 'Find the sound',
      body: 'We test every part of the record to see which seconds actually stop someone scrolling.',
      src: 'artist__bonobo-compress__lens.jpg', name: 'Bonobo',
    },
    {
      n: '02', title: 'Test the content at scale',
      body: 'Dozens of variations per record, made by our editors, running against cold audiences in every market that matters.',
      src: 'artist__disclosure__lens.jpg', name: 'Disclosure',
    },
    {
      n: '03', title: 'Validate the cost',
      body: 'Every test returns a real cost per new listener. That number decides what gets the budget and what gets dropped.',
      src: 'artist__thundercat__lens.jpg', name: 'Thundercat',
    },
    {
      n: '04', title: 'Scale what converts',
      body: 'Budget follows the number, reallocated daily, country by country, for as long as it keeps paying.',
      src: 'artist__blondish__lens.jpg', name: 'Blond:Ish',
    },
  ].map((s, k) => ({
    section: 'Streaming',
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

  /* 13 — the pivot. Everything so far has been one channel; the rest of the
     deck is the other four. */
  {
    section: 'Paid media',
    grain: true,
    html: `
      <div class="pad l-centre">
        <h2 class="display display--m reveal"><span class="bracket">The same discipline, everywhere else</span></h2>
      </div>`,
  },

  /* 14–17 — the four channels. PJ's brief, tightened. */
  /* Live gets two slides — it's the channel with the most to say and the one
     place we can take the whole job, ticketing included. The criticism is
     aimed at the standard practice rather than at the promoters named two
     slides later, for the same reason the label deck's problem slide is
     phrased at the workflow rather than the team. */
  channel({
    n: '01', name: 'Live',
    headline: 'Ticket sales, run as a campaign rather than a blast.',
    body: `Tour advertising usually goes out the way it always has: a wall of spend
      at on-sale and another on pay-day weekend, against targeting that was built
      years ago and hasn't been questioned since. It sells the tickets that were
      going to sell anyway, at the price the auction happens to be that week, and
      tells you nothing about the rest of the room.`,
    points: [
      { t: 'Tested content first', b: 'Creative tested the way we test a record, before any budget goes behind it.' },
      { t: 'Slower, steadier spend', b: 'Consistent pressure across the whole on-sale rather than two spikes and silence, ramped up at the moments that actually matter.' },
      { t: 'Read every day', b: 'Cold and warm funnels tracked apart, with hook rate, hold rate and conversion read daily — not after the show.' },
    ],
    chipsLabel: "Shows we've worked on with",
    chips: ['Live Nation', 'AEG', 'Communion One'],
  }),

  channel({
    label: 'Paid media · Live · ticketing',
    name: 'Ticketing',
    headline: 'We can run the ticketing too, at no cost to the artist.',
    body: `Through <strong style="font-weight:700">david.tickets</strong> we can take
      the ticketing itself. It costs the artist nothing, and it closes the loop the
      advertising opens: instead of waiting on someone else's weekly summary, the
      artist and the team get full access to their own ticket data — which is the way
      it should have worked all along.`,
    points: [
      { t: 'No cost to the artist', b: 'The ticketing is handled at no cost to you.' },
      { t: 'Your data, in full', b: 'Live access for the artist and the team, not a report on somebody else’s schedule.' },
      { t: 'One closed loop', b: 'The spend, the funnel and the sale all read in the same place, on the same day.' },
    ],
  }),

  channel({
    n: '02', name: 'TikTok',
    headline: 'Grow the audience on the content that is already working.',
    body: `Audience targeting campaigns, pointed at the posts that have already earned
      attention on their own. Reach and audience growth is what the platform gives you,
      so that is what we buy — and where the record needs to be in other people's videos
      rather than in an ad, we seed it through our influencer networks instead.`,
    points: [
      { t: 'Content that is already working', b: 'The budget goes behind posts that have proven they hold attention, not behind untested assets.' },
      { t: 'Audience targeting', b: 'Built to reach and grow the audience the post actually found, rather than a demographic guess.' },
      { t: 'Influencer seeding', b: 'Our own networks, for when the record needs to be in other people’s videos rather than in an ad.' },
    ],
  }),

  channel({
    n: '03', name: 'YouTube',
    headline: 'Engagement and reach, to generate traction.',
    body: `The goal here is traction: a release being watched, held to the end and
      picked up. So that is what the campaigns are built to buy — enough of the right
      people in front of it, often enough, for it to start moving on its own.`,
    points: [
      { t: 'Engagement campaigns', b: 'Built to get watched and interacted with, which is what the platform rewards.' },
      { t: 'Reach campaigns', b: 'Impressions against the audiences that matter, at the volume it takes to register.' },
    ],
  }),

  channel({
    n: '04', name: 'Merch',
    headline: 'Funnels, drops, and the store behind them.',
    body: `A drop only works if the whole path behind it does, not just the ad
      pointing at it. We build and test the funnel end to end, plan and measure the
      drop, and manage the Shopify store the traffic lands on.`,
    points: [
      { t: 'Funnels', b: 'Built and tested from the ad through to the checkout.' },
      { t: 'Drop optimisation', b: 'Planned, timed and measured, so a launch is not a single day of guessing.' },
      { t: 'Shopify store management', b: 'The store run as part of the work, not handed back as someone else’s problem.' },
    ],
  }),

  /* 18 — CRM section title. The part of this deck nobody else is pitching, so
     it gets its own act rather than a bullet on the difference slide. */
  {
    section: 'CRM',
    grain: true,
    html: `
      <div class="pad l-centre">
        <h2 class="display display--m reveal"><span class="bracket">The audience you actually own</span></h2>
      </div>`,
  },

  /* 19 — why it matters, before the mechanism. */
  {
    section: 'CRM',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:78px;line-height:1.08;margin-bottom:56px;max-width:1500px">
          <span class="hl">A follower is rented.</span><br>An email address isn't.
        </h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:110px;max-width:1560px">
          <p class="body reveal" style="--d:.18s;font-size:23px;max-width:none">
            Every platform decides who sees you and changes its mind without telling
            anyone. A list you built yourself is the only audience that survives that,
            and the only one you can reach on the day a record, a tour or a drop goes live.
          </p>
          ${/* margin-top:0 undoes `.body + .body`, which would otherwise drop the
                second column a line below the first — they're siblings, even
                though the grid puts them in separate cells */ ''}
          <p class="body reveal" style="--d:.28s;font-size:23px;max-width:none;margin-top:0">
            So there is a capture underneath everything else in this deck. The paid
            media buys the attention; the CRM is what keeps it. Here is the flow we
            build, end to end.
          </p>
        </div>
      </div>`,
  },

  /* 20 — the flow, with step 06 landing underneath it. The voice note had a
     slide of its own until PJ folded the two together: it's the payoff of the
     sequence rather than a separate idea, and on one slide the quote sits
     directly under the node it belongs to.

     The voice note is drawn rather than screenshotted — see voicenote() in
     parts.js. */
  {
    section: 'CRM',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">CRM · the fan flow</div>
        <h2 class="display reveal" style="--d:.08s;font-size:58px;line-height:1.1;margin-bottom:74px;max-width:1500px">
          From a new follower to a real conversation.
        </h2>
        <ol class="flow reveal" style="--d:.2s">
          ${FAN_FLOW.map((s) => `
            <li class="flow__node ${s.human ? 'flow__node--human' : ''}">
              <div class="flow__n">${s.n}</div>
              <div class="flow__t">${s.t}</div>
              <p class="flow__b">${s.b}</p>
            </li>`).join('')}
        </ol>

        <div class="rule reveal" style="--d:.4s;margin:60px 0 46px"></div>

        <div style="display:grid;grid-template-columns:430px 1fr;gap:64px;align-items:center">
          <div class="reveal" style="--d:.46s">
            ${voicenote({ time: '0:14', alt: 'Voice note from the artist, fourteen seconds' })}
          </div>
          <div>
            <p class="reveal" style="--d:.52s;font-family:var(--sans);font-weight:700;font-size:34px;letter-spacing:-0.03em;line-height:1.28;margin-bottom:18px">
              &ldquo;Hey — obviously this was automated. But I'm a real person, and I'm
              glad you're here. I'm in my DMs if you want to say hey.&rdquo;
            </p>
            <p class="body reveal" style="--d:.58s;font-size:19px;max-width:none;opacity:0.75">
              Admitting it is what makes the rest of the sequence survive a fan who can
              tell. Everything before this runs on its own; the artist records the voice
              note once.
            </p>
          </div>
        </div>
      </div>`,
  },

  /* 22 — reporting. Same platform slide as the other two proposals. The copy
     stops at what the dashboard actually shows: campaigns, costs and markets.
     If sweat.fm starts carrying live and merch, this is the line to widen. */
  {
    section: 'Reporting',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.76fr 1.24fr;align-items:center;gap:70px">
        <div>
          <h2 class="display reveal" style="font-size:56px;letter-spacing:-0.04em;line-height:1.28;margin-bottom:16px">
            <span class="hl">A dashboard, daily.</span>
          </h2>
          <h2 class="display reveal" style="--d:.12s;font-size:56px;letter-spacing:-0.04em;line-height:1.12;color:var(--head);margin-bottom:40px">
            Not a monthly report.
          </h2>
          <p class="body reveal" style="--d:.24s;font-size:23px">
            Sweat.fm is our own platform, not a third-party dashboard. Every campaign,
            every cost per result, every market, updated daily and visible to your
            whole team — so nobody is waiting on a deck to find out what the money did.
          </p>
        </div>
        <div class="reveal" style="--d:.32s;max-width:1060px;justify-self:center;width:100%">
          ${laptop({ src: 'dashboard.jpg', alt: 'Sweat.fm dashboard: per-artist monthly listeners, streams, saves and playlist adds tracked daily' })}
        </div>
      </div>`,
  },

  /* 23 — the engagement. PJ: no prices, scope via conversation. Stated as a
     reason rather than as a dodge, and followed by the three things a scope
     actually needs, so the ask is concrete. */
  {
    section: 'The engagement',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:30px">The engagement</div>
        <h2 class="display reveal" style="--d:.06s;font-size:60px;line-height:1.14;margin-bottom:24px">
          <span class="hl">Pricing is scoped to the work.</span>
        </h2>
        <p class="body reveal" style="--d:.12s;font-size:23px;max-width:1180px;margin-bottom:22px">
          No tiers. At this level the mix is different for everyone — a tour on sale,
          a record cycle, a store doing real numbers, or all three inside the same
          quarter. A fixed package either overcharges for the quiet months or
          under-resources the loud ones.
        </p>
        <p class="body reveal" style="--d:.18s;font-size:23px;max-width:1180px;margin-bottom:56px">
          Tell us what's coming and what it needs to do, and we'll come back with a
          scope, a plan per channel and a number.
        </p>

        <div class="rule reveal" style="--d:.28s;margin:0 0 36px"></div>

        <ol class="steps reveal" style="--d:.34s;grid-template-columns:repeat(3,1fr)">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">What's coming</div>
            <p class="body" style="font-size:19px;max-width:none">The next twelve months — releases, tour, drops, and what's already committed.</p>
          </li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">What's running now</div>
            <p class="body" style="font-size:19px;max-width:none">Where the spend sits today, who is placing it, and what it's returning.</p>
          </li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">What it has to do</div>
            <p class="body" style="font-size:19px;max-width:none">The number that would make the year a success, so the plan is built backwards from it.</p>
          </li>
        </ol>
      </div>`,
  },

  /* 24 — close */
  {
    section: 'Next',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:84px;line-height:1.08;margin-bottom:52px">
          Let's have the<br>conversation.
        </h2>
        <ol class="steps reveal" style="--d:.2s;max-width:1620px">
          <li><span>01</span>A call about the next twelve months.</li>
          <li><span>02</span>We look at what's running now and what it's returning.</li>
          <li><span>03</span>A scope, a plan per channel, and a number.</li>
          <li><span>04</span>First campaigns live.</li>
        </ol>
        <div class="rule reveal" style="--d:.36s;margin:60px 0 40px"></div>
        <p class="reveal" style="--d:.44s;font-size:30px;font-weight:700">
          <a href="mailto:pj@sweatstrategies.com" style="color:var(--blue)">pj@sweatstrategies.com</a>
        </p>
      </div>`,
  },
];
