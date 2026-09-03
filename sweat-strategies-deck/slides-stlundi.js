/* ------------------------------------------------------------------
   St Lundi — paid media proposal

   WHERE THIS CAME FROM
   The "PJ x St Lundi — Ads Brief" call, 26 August 2026, organised by
   Lewis Cleaver. Transcript read in full. Present: Tom Rose and Lewis
   Cleaver (Grape), Joe Kettle and Brooke Christopher (ONErpm), Joe
   Riccitelli (Gold'n Retriever, US), Josefine Ridell (content), and
   Archie. It builds on the content strategy call of 5 August.

   THE BRIEF, AND IT IS EXPLICIT. Joe Kettle, at the end of the call:
   "what would be great from our side, from the ONErpm side, is to see
   some kind of written proposal — fee, cost, expected kind of results
   ... just kind of how we'd be looking over the next kind of three
   month period with two singles and an EP. As a kind of skeleton
   timeline, and just kind of the scope of services and the costs
   involved in that." And: "it's kind of different pillars that you
   have."

   So this deck is not a general capability pitch. It answers five
   things because five things were asked for: the pillars, a three-month
   skeleton, the fee, the costs on top, and what results look like.
   Tom Rose opened the call with "the overall message is that we would
   like you to work with us, please" — the deck does not need to sell
   the idea, only to make it easy to sign off.

   THE ARGUMENT, IN THEIR WORDS
   Tom: "it just seems to be a complete numbers game at the moment —
   creating as much content as we possibly can and getting that up on
   TikTok in any frame in any way possible ... as long as there's a bit
   of a strategy behind it. And then we can learn from all of these
   things with the paid ads. So certain things that potentially work on
   TikTok — if we're able to then test those and see whether they
   actually convert well as ads as well."

   That is the deck: volume and paid media as one loop rather than two
   teams. It is his sentence, not ours.

   WHAT THE DECK DELIBERATELY DOES NOT DO
   · It does not criticise anyone currently running the work. Joe Kettle
     is the buyer AND the incumbent — ONErpm's in-house media team is
     placing the ads today, and Brooke is running the HQ page and the
     Words of the Wild burner. The gap is framed as workload and method,
     never as failure. Everything they have stays and is named.
   · It does not print the CPR comparison. ONErpm's current cost per
     result is roughly double what our campaigns run at. That is a
     powerful thing for PJ to say on a call and a hostile thing to put
     in a document Joe's own team reads. Left out on purpose.
   · It does not put Archie at the front of the trend content. Tom asked
     for the opposite: keep his own channels to the high-quality work
     with Josefine, and "maybe we don't necessarily want Archie to be at
     the forefront" of the viral material. Slide 15 exists because of
     that sentence.
   · It does not promise numbers. Joe pre-empted it himself — "I know
     they're hard to generate." So slide 21 gives the numbers we hold
     ourselves to and the benchmarks we read, and says plainly that they
     are not a guarantee.
   · It does not oversell reel:lab. PJ described it on the call as beta,
     120 accounts, "quite experimental". The slide says so. Tom asked
     for it by name, so leaving it out would be ignoring the ask;
     dressing it up would be worse.
   · It does not use laptop() on the reporting slide — that frame is an
     unlicensed stock comp, and this document goes to a distributor.
     browser() is drawn.

   OPEN, AND FLAGGED TO PJ
   · The fee reads £750/month Meta-only and £1,250/month all-platform as
     the St Lundi price, at 50% off a £1,500 / £2,500 list. That is the
     reading of PJ's note; if the discount comes off £750 instead, it is
     two numbers on slide 22.
   · The timeline is a skeleton with no dates in it, because Tom said
     the EP timeline "we also need to discuss ... we'll discuss that on
     our weekly" the following day. Dates drop into slide 20 once that
     lands.
   ------------------------------------------------------------------ */

import { img, spine, blobs, bend, roster, browser, voicenote } from './parts.js';

/* ---------------------------------------------------------- local archetypes */

/* Lifted from slides-cross-platform.js so the two decks look like one system.
   The channel name sits big in the head grey above the argument. */
const channel = ({ name, headline, body, points, label = '', chipsLabel = '', chips = [], note = '' }) => ({
  section: 'The pillars',
  grain: 'soft',
  html: `
    <div class="pad l-mid">
      <div class="label reveal" style="margin-bottom:26px">${label}</div>
      <h2 class="display reveal" style="--d:.06s;font-size:104px;line-height:1;color:var(--head);margin-bottom:30px">${name}</h2>
      <h3 class="display reveal" style="--d:.12s;font-size:44px;line-height:1.2;max-width:1300px;margin-bottom:28px">${headline}</h3>
      <p class="body reveal" style="--d:.2s;font-size:22px;max-width:1180px">${body}</p>

      <div class="rule reveal" style="--d:.3s;margin:52px 0 36px"></div>

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

      ${note ? `<p class="body reveal" style="--d:.5s;font-size:19px;max-width:1180px;margin-top:44px;opacity:.72">${note}</p>` : ''}
    </div>`,
});

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
      <h2 class="display display--m reveal"${light ? ' style="color:#fff"' : ''}>
        <span class="bracket${light ? ' bracket--light' : ''}">${title}</span>
      </h2>
    </div>`,
});

/* The fan flow PJ described on the call, in the order he described it. */
const FAN_FLOW = [
  { n: 'Step 01', t: 'A new follower', b: 'Someone follows the account. That is the whole trigger — nothing has to be posted, sent or remembered.' },
  { n: 'Step 02', t: 'An automatic DM', b: 'A message from Archie within seconds: hello, and would you like to hear something first?' },
  { n: 'Step 03', t: 'First-party capture', b: 'They say yes and leave an email address. It belongs to Archie, not to the platform it came from.' },
  { n: 'Step 04', t: 'The email', b: 'An introduction and the track they were promised, sent straight away.' },
  { n: 'Step 05', t: 'They listen', b: 'Someone who followed an hour ago has now heard something nobody else has.' },
  { n: 'Step 06', t: 'The voice note', b: 'An Instagram voice note in Archie’s own voice — which is where the automation hands over to a person.', human: true },
];

export const OPTS = {
  legal: 'Prepared for St Lundi, Grape, ONErpm and Gold’n Retriever Entertainment.<br>'
    + 'Commercial in confidence. 2026 Sweat Strategies.',
};

export const SLIDES = [
  /* 01 — cover. Same artwork and caption placement as the cross-platform deck
     this is a variant of; only the caption changes. */
  {
    section: 'Proposal',
    chrome: 'none',
    html: `
      <div style="position:absolute;inset:0;z-index:0">
        <img src="${img('cover.jpg')}" alt="" style="width:100%;height:100%;object-fit:cover">
      </div>
      <div class="reveal" style="--d:.5s;position:absolute;right:45px;top:712px;z-index:20;text-align:right">
        <div style="font-family:var(--mono);text-transform:uppercase;font-size:30px;letter-spacing:0.22em;color:#fff;text-shadow:0 2px 24px rgba(0,0,0,0.55)">
          St Lundi &middot; Paid Media
        </div>
      </div>`,
  },

  /* 02 — the hook, which is Tom's sentence rather than ours. The tightened
     line is set without quote marks; the verbatim quote underneath it is
     exactly what he said, off the transcript. */
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
        <div class="label reveal" style="margin-bottom:40px">Three months &middot; two singles and an EP</div>
        <h1 class="display reveal" style="--d:.1s;font-size:128px;line-height:0.98;color:#fff">As much content<br>as possible &mdash;<br>and a way to know.</h1>
        <p class="body reveal" style="--d:.26s;font-size:24px;max-width:1000px;margin-top:48px">
          &ldquo;It just seems to be a complete numbers game at the moment. Creating as
          much content as we possibly can &hellip; as long as there&rsquo;s a bit of a
          strategy behind it. And then we can learn from all of these things with the
          paid ads.&rdquo;
        </p>
        <p class="reveal" style="--d:.34s;font-family:var(--mono);text-transform:uppercase;font-size:15px;letter-spacing:0.18em;opacity:.6;margin-top:20px">
          Tom Rose, 26 August
        </p>
      </div>`,
  },

  /* 03 — the roster. Joe Riccitelli and Brooke were meeting us for the first
     or second time; this is who else does this for. */
  roster(),

  /* 04 — the problem, in Brooke's words rather than ours. She said "volume is
     the issue" on the call. Naming their own diagnosis back is the difference
     between a proposal and a criticism. */
  {
    section: 'The problem',
    grain: true,
    html: `
      <div class="pad l-centre">
        <h2 class="display display--m reveal"><span class="bracket">Volume is the issue</span></h2>
        <p class="reveal" style="--d:.34s;font-family:var(--mono);text-transform:uppercase;font-size:15px;letter-spacing:0.18em;opacity:.55;margin-top:64px">
          Brooke Christopher, on the call
        </p>
      </div>`,
  },

  /* 05 — what is already in place. Everyone named, everyone staying. The gap
     is the space between them, not anybody's work. */
  {
    section: 'The problem',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:60px;line-height:1.14;margin-bottom:26px;max-width:1500px">
          There is already a lot here.
        </h2>
        <p class="body reveal" style="--d:.1s;font-size:22px;max-width:1180px;margin-bottom:52px">
          None of it needs replacing. Archie and Josefine are making the best content
          he has ever had; ONErpm has a media team and an influencer team; Brooke has
          two pages running; Grape and Gold&rsquo;n Retriever have the shows.
        </p>

        <ol class="steps reveal" style="--d:.2s;grid-template-columns:repeat(4,1fr)">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">The content</div>
            <p class="body" style="font-size:19px;max-width:none">Archie and Josefine, plus the Infinity Cove shoot, the Dopamine video and the live session.</p>
          </li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">The media</div>
            <p class="body" style="font-size:19px;max-width:none">ONErpm&rsquo;s in-house team on the official ads, and the influencer team that worked Alaska.</p>
          </li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">The pages</div>
            <p class="body" style="font-size:19px;max-width:none">The HQ page and Words of the Wild, both live, both hungry for more than one person can cut.</p>
          </li>
          <li><span>04</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">The shows</div>
            <p class="body" style="font-size:19px;max-width:none">Nashville, LA and New York on sale, with a team either side of the Atlantic behind them.</p>
          </li>
        </ol>

        <div class="rule reveal" style="--d:.36s;margin:56px 0 38px"></div>

        <p class="reveal" style="--d:.42s;font-size:26px;font-weight:600;line-height:1.5;max-width:1400px">
          What is missing is the thing in the middle: a number that says which of it
          worked, and therefore what to make next.
        </p>
      </div>`,
  },

  /* 06 — the operating model, as one loop. This is Tom's sentence turned into
     a mechanism: what posts tells us what to test, what converts tells us what
     to make. */
  {
    section: 'The difference',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:62px;line-height:1.14;margin-bottom:70px;max-width:1480px">
          <span class="hl">One loop, not two teams.</span> Organic tells us what to test. Paid tells us what to make.
        </h2>
        <ol class="steps reveal" style="--d:.18s">
          <li><span>01</span>
            <div>
              <div style="font-family:var(--sans);font-weight:700;font-size:26px;letter-spacing:-0.03em;margin-bottom:10px">Post it, then prove it</div>
              <p class="body" style="font-size:20px;max-width:620px">Whatever holds attention organically gets put behind cold spend to find out whether it converts, or just entertained.</p>
            </div>
          </li>
          <li><span>02</span>
            <div>
              <div style="font-family:var(--sans);font-weight:700;font-size:26px;letter-spacing:-0.03em;margin-bottom:10px">Tested, not assumed</div>
              <p class="body" style="font-size:20px;max-width:620px">Many variants against cold audiences at small money. The winner takes the budget; the rest get dropped without argument.</p>
            </div>
          </li>
          <li><span>03</span>
            <div>
              <div style="font-family:var(--sans);font-weight:700;font-size:26px;letter-spacing:-0.03em;margin-bottom:10px">Archie stays out of the churn</div>
              <p class="body" style="font-size:20px;max-width:620px">His channels keep the high-quality work with Josefine. The trend volume runs elsewhere, which is the whole point of it.</p>
            </div>
          </li>
          <li><span>04</span>
            <div>
              <div style="font-family:var(--sans);font-weight:700;font-size:26px;letter-spacing:-0.03em;margin-bottom:10px">A single read</div>
              <p class="body" style="font-size:20px;max-width:620px">One dashboard the whole group can see, so ONErpm, Grape and Gold&rsquo;n Retriever are looking at the same day&rsquo;s numbers.</p>
            </div>
          </li>
        </ol>
      </div>`,
  },

  /* 07 — the pillars, signposted. Joe's word, not ours: "it's kind of
     different pillars that you have". */
  {
    section: 'The pillars',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:34px">Scope of services</div>
        <h2 class="display reveal" style="--d:.08s;font-size:74px;line-height:1.1;margin-bottom:58px;max-width:1400px">
          Five pillars.
        </h2>
        <ul class="channels reveal" style="--d:.18s">
          <li>Meta</li><li>TikTok</li><li>reel:lab</li><li>Live &amp; ticketing</li><li>CRM &amp; fan flow</li>
        </ul>
        <div class="rule reveal" style="--d:.3s;margin:60px 0 40px"></div>
        <p class="body reveal" style="--d:.36s;font-size:22px;max-width:1150px">
          Meta is the engine and the one with the longest record behind it, so the
          method comes first. Then the four that feed it. YouTube sits inside the Meta
          pillar rather than beside it &mdash; engagement and reach campaigns on the
          videos, not a separate operation.
        </p>
      </div>`,
  },

  /* 08 */
  act({ section: 'Meta', title: 'How we find the hit?', light: true }),

  /* 09–12 — the method. Unchanged from the label and cross-platform decks
     because it is the one with the evidence behind it, with St Lundi in the
     first card since it is his deck and he is in the licensed library. */
  ...[
    {
      n: '01', title: 'Find the sound',
      body: 'We cut the record into sections and test each one against a control visual, to see which seconds actually stop someone scrolling.',
      src: 'artist__st-lundi__lens.jpg', name: 'St Lundi',
    },
    {
      n: '02', title: 'Test the content at scale',
      body: 'Dozens of variations around the winning sound — film clips, meme clips, mood videos — against cold audiences in every market that matters.',
      src: 'artist__disclosure__lens.jpg', name: 'Disclosure',
    },
    {
      n: '03', title: 'Validate the cost',
      body: 'Every test returns a real cost per new listener. That number decides what gets the budget and what gets dropped.',
      src: 'artist__thundercat__lens.jpg', name: 'Thundercat',
    },
    {
      n: '04', title: 'Scale what converts',
      body: 'Budget follows the number, reallocated daily, country by country. America can be the cheapest and Germany still the one worth more per listener.',
      src: 'artist__bonobo-compress__lens.jpg', name: 'Bonobo',
    },
  ].map((s, k) => ({
    section: 'Meta',
    grain: 'soft',
    html: `
      ${spine()}
      <div class="pad l-split" style="align-items:center;gap:70px">
        <div class="l-mid">
          <h3 class="reveal" style="font-family:var(--sans);font-weight:700;font-size:58px;letter-spacing:-0.04em;color:var(--blue);margin-bottom:60px">
            <span style="opacity:.75">${s.n}</span> ${s.title}
          </h3>
          <p class="body reveal" style="--d:.18s;font-size:28px;max-width:620px">${s.body}</p>
        </div>
        <div class="reveal" style="--d:.3s;display:flex;align-items:center;justify-content:center;padding:0 30px">
          ${bend({ src: s.src, name: s.name, w: 470, h: 620, right: k % 2 === 1 })}
        </div>
      </div>`,
  })),

  /* 13 — Meta, as the pillar. The pre-release testing is the thing agreed on
     5 August; it is restated here because the EP is the reason the deck
     exists. */
  channel({
    label: 'Pillar 01',
    name: 'Meta',
    headline: 'Every song tested before release, so the money knows where to go.',
    body: `Twenty-one songs are coming. Micro-spends against cold audiences on each of
      them, before release, tell us which ones can carry a campaign — so the budget
      goes hard at the moment that deserves it rather than spreading evenly across a
      cycle and hoping. On the released records we run UGC-style creative rather than
      &ldquo;out now, stream here&rdquo;, and we boost what earns attention on its own.`,
    points: [
      { t: 'Pre-release micro-testing', b: 'Every song on the EP, at small money, against cold audiences — the plan agreed on 5 August.' },
      { t: 'UGC over announcements', b: 'Creative built to be watched rather than obeyed, then put behind spend once it proves it holds.' },
      { t: 'Read on Spotify, not on Meta', b: 'Spotify for Artists is the scoreboard: which markets convert, which retain, and what a listener really costs.' },
    ],
    note: `Runs on Archie&rsquo;s page or on a fan page, whichever the team prefers &mdash;
      both work, and it is a preference rather than a performance question.`,
  }),

  /* 14 — TikTok. ONErpm already has an influencer team; this is written to sit
     alongside it, not to replace it. */
  channel({
    label: 'Pillar 02',
    name: 'TikTok',
    headline: 'Put money behind what already earned attention.',
    body: `Audience targeting pointed at the posts that have already done something on
      their own. Reach and audience growth is what the platform gives you, so that is
      what we buy — and anything that performs here becomes a Meta test the same week,
      which is the loop Tom described.`,
    points: [
      { t: 'Winners only', b: 'Spend goes behind posts that have proven they hold attention, never behind untested assets.' },
      { t: 'Straight into the Meta tests', b: 'What works organically gets a cold-audience test within days, so TikTok stops being a separate scoreboard.' },
      { t: 'Seeding where it fits', b: 'Our networks are there if the record needs to be in other people’s videos — alongside the ONErpm influencer team, not instead of it.' },
    ],
  }),

  /* 15 — reel:lab. This slide exists because Tom asked for it by name: could
     AI content lip-syncing Archie's songs take the trend workload off him. It
     is in beta and the slide says so, because he will find that out anyway and
     it is better he reads it here. */
  channel({
    label: 'Pillar 03 · in beta',
    name: 'reel:lab',
    headline: 'The trend volume, without Archie having to be in it.',
    body: `Tom&rsquo;s ask on the call: keep Archie&rsquo;s own channels for the
      high-quality work with Josefine, and find another way to be present in trends.
      reel:lab is our own product for exactly that — branded fan accounts posting
      original AI content, each with its own identity, able to cross-pollinate. For
      St Lundi we would build out sub-brands around the record and run lip-sync and
      performance content through them. The ones that win become Meta ads.`,
    points: [
      { t: 'Sub-brands, not clones', b: 'Distinct accounts with their own look and subject, so the output does not read as one bot posting fifty times.' },
      { t: 'Lip-sync and performance', b: 'The trend-shaped content that works as an ad, made without needing another day of Archie’s time.' },
      { t: 'Winners become ads', b: 'Anything that performs organically goes into the same cold-audience testing as everything else.' },
    ],
    note: `Said plainly: reel:lab is in beta. 120 accounts live today, scaling towards
      1,000 by Christmas. Some of it is working well and some of it is experimental,
      and it is priced per scope rather than folded into the retainer &mdash; so it can
      be tried on one EP without committing the campaign to it.`,
  }),

  /* 16 — Live, and ticketing. Three US shows are on sale and Joe Riccitelli
     was on the call, so this is not hypothetical for them. */
  channel({
    label: 'Pillar 04',
    name: 'Live &amp; ticketing',
    headline: 'Nashville, LA and New York, run as campaigns rather than blasts.',
    body: `Tour advertising usually goes out as a wall of spend at on-sale and another
      on pay-day weekend, against targeting nobody has questioned in years. It sells
      the tickets that were going to sell anyway and tells you nothing about the rest
      of the room. We test the creative first, spend steadily across the whole on-sale,
      and read cold and warm funnels apart, every day.`,
    points: [
      { t: 'Tested content first', b: 'Creative tested the way we test a record, before any budget goes behind it.' },
      { t: 'Steady, not spiked', b: 'Consistent pressure across the on-sale, ramped at the moments that actually move.' },
      { t: 'Ticketing at no cost', b: 'Through david.tickets we can take the ticketing itself for nothing, and the team gets live access to its own ticket data.' },
    ],
    chipsLabel: "Shows we've worked on with",
    chips: ['Live Nation', 'AEG', 'Communion One'],
  }),

  /* 17 */
  act({ section: 'CRM', title: 'The audience you actually own' }),

  /* 18 — why, before the mechanism. */
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
            Every platform decides who sees Archie and changes its mind without telling
            anyone. A list he built himself is the only audience that survives that, and
            the only one reachable on the day a single, an EP or a show goes live.
          </p>
          <p class="body reveal" style="--d:.28s;font-size:23px;max-width:none;margin-top:0">
            So there is a capture underneath everything else in this deck. The paid media
            buys the attention; the CRM keeps it. This is the flow, end to end &mdash; and
            it runs on its own once it is built.
          </p>
        </div>
      </div>`,
  },

  /* 19 — the flow, with the voice note landing under the node it belongs to.
     The wording is PJ's own from the call, tightened. */
  {
    section: 'CRM',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">CRM &middot; the fan flow</div>
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
              &ldquo;Hey &mdash; obviously this was automated. But I'm a real person, and I'm
              glad you're here. I'm in my DMs if you want to say hey.&rdquo;
            </p>
            <p class="body reveal" style="--d:.58s;font-size:19px;max-width:none;opacity:0.75">
              Admitting it is what makes the sequence survive a fan who can tell.
              Everything before this runs on its own; Archie records the voice note once.
            </p>
          </div>
        </div>
      </div>`,
  },

  /* 20 — reporting. Written for a group of four organisations, which is the
     actual reporting problem here: Joe and Archie both flagged on 5 August that
     communication needed to be tighter. browser() rather than laptop() — see
     the header note. */
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
            Sweat.fm is our own platform. Every campaign, every cost per result, every
            market, updated daily &mdash; and visible to ONErpm, Grape and Gold&rsquo;n
            Retriever at the same time, so four organisations are reading one set of
            numbers instead of forwarding each other three.
          </p>
        </div>
        <div class="reveal" style="--d:.32s;max-width:1060px;justify-self:center;width:100%">
          ${browser({ src: 'dashboard.jpg', alt: 'Sweat.fm dashboard: campaigns, cost per result and markets, updated daily' })}
        </div>
      </div>`,
  },

  /* 21 — the skeleton timeline Joe asked for. Deliberately without dates: Tom
     said the EP timeline was going to their weekly the next day. Months rather
     than dates is the honest version, and the slide says why. */
  {
    section: 'The three months',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:30px">Skeleton timeline</div>
        <h2 class="display reveal" style="--d:.06s;font-size:64px;line-height:1.1;margin-bottom:54px;max-width:1400px">
          Three months, two singles and an EP.
        </h2>

        <ol class="steps reveal" style="--d:.18s;grid-template-columns:repeat(3,1fr)">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:25px;letter-spacing:-0.03em;margin-bottom:12px">Month one &middot; single one</div>
            <p class="body" style="font-size:19px;max-width:none">
              Handover of the Meta account and the pixel. Sound tests on single one and
              on every unreleased song we have audio for. Alaska read through discovery
              mode. First reel:lab sub-brands live if that pillar is in.
            </p>
          </li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:25px;letter-spacing:-0.03em;margin-bottom:12px">Month two &middot; single two</div>
            <p class="body" style="font-size:19px;max-width:none">
              Single two launches on a sound we have already tested rather than a guess.
              Content scaled around the winners. Fan flow built and switched on. US show
              campaigns running against the on-sales.
            </p>
          </li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:25px;letter-spacing:-0.03em;margin-bottom:12px">Month three &middot; the EP</div>
            <p class="body" style="font-size:19px;max-width:none">
              The EP goes out knowing which track carries it and what a listener costs
              in each market. Budget weighted to that, not spread evenly. Full read on
              the quarter, and a decision on the next two EPs.
            </p>
          </li>
        </ol>

        <div class="rule reveal" style="--d:.36s;margin:56px 0 36px"></div>

        <p class="body reveal" style="--d:.42s;font-size:21px;max-width:1300px">
          Deliberately no dates in it. Tom flagged that the EP timeline was going to
          your weekly &mdash; give us those dates and this becomes a calendar rather
          than a shape, in an afternoon.
        </p>
      </div>`,
  },

  /* 22 — expected results. Joe asked for them and said himself they are hard
     to generate, so this is the numbers we work to and the benchmarks we read,
     stated as that and not as a forecast. Anything else would be a promise we
     would have to walk back in month two. */
  {
    section: 'What good looks like',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:30px">Expected results</div>
        <h2 class="display reveal" style="--d:.06s;font-size:60px;line-height:1.12;margin-bottom:22px;max-width:1400px">
          <span class="hl">The numbers we hold ourselves to.</span>
        </h2>
        <p class="body reveal" style="--d:.12s;font-size:22px;max-width:1200px;margin-bottom:52px">
          Not a forecast. Nobody can promise a result on an unreleased record, and it
          was said on the call that these are hard to generate. What we can do is name
          exactly which numbers decide things, what we have hit on comparable campaigns,
          and agree now what would count as working.
        </p>

        <ol class="steps reveal" style="--d:.2s;grid-template-columns:repeat(4,1fr)">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Cost per listener</div>
            <p class="body" style="font-size:19px;max-width:none">The number that decides everything. Across the campaigns in our case studies it runs 14p to 24p.</p>
          </li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Hook and hold</div>
            <p class="body" style="font-size:19px;max-width:none">Read per asset. It is what tells us a piece of content is worth scaling before the spend proves it.</p>
          </li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Spotify retention</div>
            <p class="body" style="font-size:19px;max-width:none">Above 1% is good, above 2% is strong &mdash; the benchmark the team is already using on Alaska.</p>
          </li>
          <li><span>04</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Emails captured</div>
            <p class="body" style="font-size:19px;max-width:none">The one output that keeps its value after the campaign stops. Reported weekly like everything else.</p>
          </li>
        </ol>

        <div class="rule reveal" style="--d:.4s;margin:56px 0 34px"></div>

        <p class="reveal" style="--d:.46s;font-size:24px;font-weight:600;line-height:1.5;max-width:1400px">
          And the promise that costs us money to keep: if a song is not converting, we
          say so and move to the next one.
        </p>
      </div>`,
  },

  /* 23 — the fee. Two rates, both at half list, plus what sits on top. The ad
     spend figures are the team's own from 5 August, so they should recognise
     them rather than have to price them. */
  {
    section: 'The fee',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:30px">Fees &amp; costs</div>
        <h2 class="display reveal" style="--d:.06s;font-size:60px;line-height:1.12;margin-bottom:52px">
          <span class="hl">Half our list price.</span>
        </h2>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:110px;max-width:1560px">
          <div class="reveal" style="--d:.14s">
            <div class="tier">Meta only</div>
            <div style="display:flex;align-items:baseline;gap:20px;margin-bottom:16px">
              <p style="font-family:var(--sans);font-weight:800;font-size:76px;letter-spacing:-0.04em;line-height:1;margin:0">&pound;750</p>
              <p style="font-family:var(--sans);font-size:26px;margin:0;opacity:.45;text-decoration:line-through">&pound;1,500</p>
            </div>
            <p class="body" style="font-size:21px;max-width:none">
              A month. The engine on its own &mdash; sound testing, creative testing,
              the buying, and the Spotify read behind it. &pound;2,250 across the three
              months.
            </p>
          </div>
          <div class="reveal" style="--d:.22s">
            <div class="tier">All platforms</div>
            <div style="display:flex;align-items:baseline;gap:20px;margin-bottom:16px">
              <p style="font-family:var(--sans);font-weight:800;font-size:76px;letter-spacing:-0.04em;line-height:1;margin:0">&pound;1,250</p>
              <p style="font-family:var(--sans);font-size:26px;margin:0;opacity:.45;text-decoration:line-through">&pound;2,500</p>
            </div>
            <p class="body" style="font-size:21px;max-width:none">
              A month. Meta plus TikTok, YouTube, the live campaigns and the CRM fan
              flow, run as one operation. &pound;3,750 across the three months.
            </p>
          </div>
        </div>

        <div class="rule reveal" style="--d:.3s;margin:64px 0 38px"></div>

        <div class="reveal" style="--d:.36s">
          <div class="label" style="margin-bottom:22px">On top of the fee</div>
          <ol class="steps" style="grid-template-columns:repeat(3,1fr)">
            <li><span>01</span>
              <div style="font-family:var(--sans);font-weight:700;font-size:22px;letter-spacing:-0.03em;margin-bottom:10px">Ad spend</div>
              <p class="body" style="font-size:19px;max-width:none">Billed at cost, never marked up. The testing plan we agreed runs about &pound;700 an EP &mdash; roughly &pound;10 an asset, &pound;50&ndash;150 a song.</p>
            </li>
            <li><span>02</span>
              <div style="font-family:var(--sans);font-weight:700;font-size:22px;letter-spacing:-0.03em;margin-bottom:10px">reel:lab</div>
              <p class="body" style="font-size:19px;max-width:none">Quoted per scope once you decide how many sub-brands and how much volume. Not folded into the retainer.</p>
            </li>
            <li><span>03</span>
              <div style="font-family:var(--sans);font-weight:700;font-size:22px;letter-spacing:-0.03em;margin-bottom:10px">Influencer seeding</div>
              <p class="body" style="font-size:19px;max-width:none">Per campaign, at cost plus our fee &mdash; and only where the ONErpm team is not already covering it.</p>
            </li>
          </ol>
        </div>

        <p class="reveal" style="--d:.46s;font-size:21px;margin-top:44px;opacity:.72">
          Three months, then a decision on the next two EPs. No longer tie-in than that.
        </p>
      </div>`,
  },

  /* 24 — what we need from them. Naming their side of the work is what makes a
     first month start on time rather than three weeks late on access. */
  {
    section: 'What we need',
    grain: true,
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:66px;line-height:1.1;margin-bottom:54px">
          What we&rsquo;d need from you.
        </h2>
        <ol class="steps reveal" style="--d:.18s;grid-template-columns:repeat(4,1fr)">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Access</div>
            <p class="body" style="font-size:19px;max-width:none">Meta Business Manager, the pixel, and Spotify for Artists. Read-only is enough to start.</p>
          </li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">The audio</div>
            <p class="body" style="font-size:19px;max-width:none">Rough or finished, for every song we are testing ahead of release. Nothing leaves our hands.</p>
          </li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">The dates</div>
            <p class="body" style="font-size:19px;max-width:none">Single one, single two, the EP, and the Infinity Cove shoot &mdash; whatever the weekly settles on.</p>
          </li>
          <li><span>04</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">One approver</div>
            <p class="body" style="font-size:19px;max-width:none">One name who can sign off creative same-day. With four organisations on the call, this is the thing that decides pace.</p>
          </li>
        </ol>
      </div>`,
  },

  /* 25 — close. Tom's line back at him, and a date rather than "let's talk". */
  {
    section: 'Next',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:84px;line-height:1.08;margin-bottom:20px">
          Let&rsquo;s start with<br>single one.
        </h2>
        <p class="body reveal" style="--d:.1s;font-size:23px;max-width:1100px;margin-bottom:48px">
          You said you&rsquo;d like us to work with you. This is the shape of it &mdash;
          pick a tier, send the dates, and we can be testing sound inside a week.
        </p>
        <ol class="steps reveal" style="--d:.2s;max-width:1620px">
          <li><span>01</span>Pick a tier &mdash; Meta, or all platforms.</li>
          <li><span>02</span>Access and audio over, dates confirmed off your weekly.</li>
          <li><span>03</span>Sound tests live within a week.</li>
          <li><span>04</span>Three months later, a decision on the next two EPs.</li>
        </ol>
        <div class="rule reveal" style="--d:.36s;margin:60px 0 40px"></div>
        <p class="reveal" style="--d:.44s;font-size:30px;font-weight:700">
          <a href="mailto:pj@sweatstrategies.com" style="color:var(--blue)">pj@sweatstrategies.com</a>
        </p>
      </div>`,
  },
];
