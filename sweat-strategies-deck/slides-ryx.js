/* ------------------------------------------------------------------
   Ry X — the album campaign, Europe and the US
   Bespoke proposal for SuzAnn Brantner, Lulu Dawson and Jamie Porten at
   Red Light Management, to take to Steve and then to Ry.

   SOURCES. The 20 Oct call with SuzAnn, the 27 Oct call with SuzAnn,
   Lulu and Jamie, both transcripts read in full, and SuzAnn's 28 Oct
   email asking for a quick campaign on "Lay" with PJ's reply pricing it.
   Every date, market, partner and budget line in here is theirs.

   THE ARGUMENT IS SUZANN'S. 20 Oct: "de facto product manager to try to
   poke and prod Orchard ... where we need the most help is in Europe".
   27 Oct: "someone from Ry's point of view, pushing". The real reader is
   Ry, via Steve, paying out of his own pocket, and "not a sell, sell,
   sell" type. So it is short, and nothing in it asks him to sell.

   MUST NOT: run down The Orchard (they hold distribution and the ad
   budget, and get invoiced for spend); promise a playlist; pitch a
   co-brand, countdown or clipping; pitch what is covered (Shore Fire,
   Circa, D Music, Diggers, Merch Collective, Firebird's brands deck);
   touch the April tour. No licensed photo of Ry X, so typographic.

   FEE, as said on the 27 Oct call: £5,000 a month Nov–Mar, media
   inclusive, no 20% on spend; or £20,000 up front, the Øneheart deal.
   The Lay quick start is in the deck without a price, at PJ's request
   (28 Oct): it starts straight away once approved.

   OPEN: day-to-day lead and Pierre's exact title; "Steve" has no surname
   in the record; the 19 Nov single is untitled in the transcripts.

   Cut hard on 28 Oct at PJ's request: too verbose, then "the wording
   just feels AI". January and the pitching slide went, every tidy
   aphorism went, Pierre came out of the team slide, "Accountable" went,
   and the roster slide came in. Plain sentences only.
   ------------------------------------------------------------------ */

import { img, blobs, browser, roster } from './parts.js';

/* ------------------------------------------------------- local archetypes */

/* A moment in the campaign — one per release, in date order. */
const moment = ({ n, date, title, sub = '', headline, body = '', points }) => ({
  section: 'The campaign',
  grain: 'soft',
  html: `
    <div class="pad l-mid">
      <div class="label reveal" style="margin-bottom:24px">${n}</div>
      <div class="reveal" style="--d:.05s;font-family:var(--sans);font-weight:800;font-size:30px;letter-spacing:-0.02em;color:var(--blue);margin-bottom:14px">${date}</div>
      <h2 class="display reveal" style="--d:.1s;font-size:88px;line-height:1;color:var(--head);margin-bottom:${sub ? 10 : 30}px">${title}</h2>
      ${sub ? `<div class="reveal" style="--d:.14s;font-family:var(--sans);font-weight:500;font-size:28px;letter-spacing:-0.02em;color:var(--head);opacity:.7;margin-bottom:30px">${sub}</div>` : ''}
      <h3 class="display reveal" style="--d:.18s;font-size:44px;line-height:1.2;max-width:1300px;margin-bottom:${body ? 22 : 0}px">${headline}</h3>
      ${body ? `<p class="body reveal" style="--d:.24s;font-size:22px;max-width:1180px">${body}</p>` : ''}

      <div class="rule reveal" style="--d:.32s;margin:50px 0 36px"></div>

      <ol class="steps reveal" style="--d:.38s;grid-template-columns:repeat(${points.length},1fr)">
        ${points.map((p, i) => `
          <li><span>${String(i + 1).padStart(2, '0')}</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">${p.t}</div>
            <p class="body" style="font-size:19px;max-width:none">${p.b}</p>
          </li>`).join('')}
      </ol>
    </div>`,
});

/* A section divider — the light bracket on the blue field. */
const act = ({ label, line }) => ({
  section: label,
  html: `
    <div class="field"></div>
    ${blobs([
      { k: 'a', pos: 'left:-260px;top:-260px;opacity:.65' },
      { k: 'c', pos: 'right:2%;bottom:-320px;opacity:.7' },
    ])}
    <div class="pad l-mid">
      <div class="label reveal" style="margin-bottom:40px">${label}</div>
      <h2 class="display reveal" style="--d:.1s;font-size:132px;line-height:0.98;max-width:1560px">
        <span class="bracket bracket--light">${line}</span>
      </h2>
    </div>`,
});

/* A titled card inside a steps list. */
const card = (role, name, line) => `
  <li><span>${role}</span>
    <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">${name}</div>
    <p class="body" style="font-size:19px;max-width:none">${line}</p></li>`;

/* A numbered point in a steps list. */
const pt = (t, b) => `
  <li><span></span>
    <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">${t}</div>
    <p class="body" style="font-size:19px;max-width:none">${b}</p></li>`;
const pts = (items) => items.map((p, i) => pt(p[0], p[1]).replace('<span></span>', `<span>${String(i + 1).padStart(2, '0')}</span>`)).join('');

export const OPTS = {
  legal: 'Prepared for Red Light Management. Commercial in confidence.<br>2026 Sweat Strategies.',
};

export const SLIDES = [
  /* 01 — cover */
  {
    section: 'Proposal',
    chrome: 'none',
    html: `
      <div style="position:absolute;inset:0;z-index:0">
        <img src="${img('cover.jpg')}" alt="" style="width:100%;height:100%;object-fit:cover">
      </div>
      <div class="reveal" style="--d:.5s;position:absolute;left:96px;bottom:172px;z-index:20">
        <div style="font-family:var(--mono);text-transform:uppercase;font-size:26px;letter-spacing:0.24em;color:#fff">
          Ry X &mdash; the album
        </div>
      </div>`,
  },

  /* 02 — the hook. SuzAnn's line, tightened, not in quote marks. */
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
        <div class="label reveal" style="margin-bottom:44px">The brief, in one line</div>
        <h1 class="display reveal" style="--d:.1s;font-size:124px;line-height:0.98;color:#fff;max-width:1700px">
          Someone in Europe<br>on Ry&rsquo;s side of<br>the table, pushing.
        </h1>
        <p class="body reveal" style="--d:.26s;font-size:25px;max-width:1100px;margin-top:52px">
          Someone who works only for Ry on this record. Who holds the plan across every
          market, runs the ads, builds the events and reports every week.
        </p>
      </div>`,
  },

  /* 03 — the map. Everyone named is staying. */
  {
    section: 'Where things are',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">What is already in place</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1500px;margin-bottom:22px">
          Who is already on it.
        </h2>
        <p class="body reveal" style="--d:.14s;font-size:22px;max-width:1240px;margin-bottom:44px">
          None of this changes. What is missing is someone in the middle of it, working for
          Ry &mdash; especially in Europe.
        </p>

        <ol class="steps reveal" style="--d:.22s;grid-template-columns:repeat(4,1fr);row-gap:44px">
          ${card('Distribution', 'The Orchard', 'The record, the ad budget, the German office.')}
          ${card('US publicity', 'Shore Fire', 'US press, reaching into the UK titles.')}
          ${card('Radio &amp; club', 'Circa', 'US non-comm and specialty; building out in Europe.')}
          ${card('Latin America', 'D Music', 'In conversation.')}
          ${card('Brands', 'Firebird', 'The sponsor deck, due this week.')}
          ${card('Physical', 'Diggers · Merch Collective', 'Vinyl in manufacture. D2C in place.')}
          ${card('Content', 'Videos for every song', 'Already shot.')}
          ${card('The gap', 'Europe, for Ry', 'The plan, the ads, the events and the chasing. That is us.')}
        </ol>
      </div>`,
  },

  act({ label: 'The job', line: 'Your product manager, in Europe' }),

  /* 05 — the job, in PJ's four parts from the call. */
  {
    section: 'The job',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">What we take on</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1500px;margin-bottom:52px">
          Four things,<br>November to March.
        </h2>

        <ol class="steps reveal" style="--d:.2s;grid-template-columns:repeat(4,1fr)">
          ${pts([
            ['The plan', 'A plan for the US, Germany, the UK and Belgium, held in one place. We sit between Red Light, Orchard and the partners, and we do the chasing.'],
            ['The ads', 'Tested before the budget goes on, scaled when they work, and reported on what a listener costs.'],
            ['Events', 'In-stores, radio sessions and the smaller shows. We find the rooms and the sponsor.'],
            ['Pitching', 'DSP and editorial through our network, when there is a reason to go.'],
          ])}
        </ol>

      </div>`,
  },

  act({ label: 'The campaign', line: 'Four releases, one album' }),

  /* 07 — the calendar. Their dates. */
  {
    section: 'The campaign',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">The shape of it</div>
        <h2 class="display reveal" style="--d:.08s;font-size:72px;line-height:1.06;max-width:1400px;margin-bottom:46px">
          October to April.
        </h2>

        <ol class="flow reveal" style="--d:.18s;grid-template-columns:repeat(5,1fr);max-width:1728px">
          ${[
            { n: '29 October', t: 'Lay', b: 'Out this week. Ads start as soon as this is approved.' },
            { n: '19 November', t: 'The November single', b: 'Album pre-save and vinyl pre-order open.' },
            { n: 'January', t: 'The third single', b: 'Scale up on what worked in November.' },
            { n: 'February', t: 'The album', b: '12th, 19th or 25th, depending on vinyl delivery.' },
            { n: 'April', t: 'The tour', b: 'Europe. Everything before it builds the audience for it.' },
          ].map((s, i) => `
            <li class="flow__node${i === 4 ? ' flow__node--human' : ''}">
              <div class="flow__n">${s.n}</div>
              <div class="flow__t">${s.t}</div>
              <p class="flow__b">${s.b}</p>
            </li>`).join('')}
        </ol>

        <div class="rule reveal" style="--d:.42s;margin:56px 0 32px"></div>
        <p class="body reveal" style="--d:.48s;font-size:23px;max-width:1420px">
          The album date depends on when the vinyl lands, so the plan is built to move a
          week or two with it.
        </p>
      </div>`,
  },

  moment({
    n: 'Release 01 of 04',
    date: '29 October',
    title: 'Lay',
    sub: 'Out this week',
    headline: 'A quick campaign on Lay, starting as soon as this is approved.',
    points: [
      { t: 'Our channels', b: 'Lay goes out on our third-party pages, to audiences that already follow this kind of music.' },
      { t: 'A small budget', b: 'Enough to see what a listener costs in the US, Germany, the UK and Belgium.' },
      { t: 'Straight away', b: 'The ads go live the day this is approved.' },
    ],
  }),

  moment({
    n: 'Release 02 of 04',
    date: '19 November',
    title: 'The November single',
    sub: 'Album pre-save and vinyl pre-order open',
    headline: 'The launch.',
    body: `Holy Water was performing well and the ads stopped before anyone noticed.
      This time someone is watching every day.`,
    points: [
      { t: 'Test the song', b: 'Each section against the same visual, then a range of cuts on the one that works.' },
      { t: 'Scale', b: 'Cost per listener checked daily, by market. Budget moves to what is working.' },
      { t: 'Drive the pre-save', b: 'The single leads to the album pre-save. That is the number we track.' },
      { t: 'Book February', b: 'Rough Trade, Amoeba, a German store, the radio sessions. They book months out, so we ask now.' },
    ],
  }),

  moment({
    n: 'Release 04 of 04',
    date: 'February',
    title: 'The album',
    sub: 'LA, New York, then Europe in the same week',
    headline: 'Release week, with Ry out and doing things.',
    body: `Red Light and Orchard US run the American dates. We run Europe and keep the
      week joined up.`,
    points: [
      { t: 'In-stores', b: 'Rough Trade in London and a German store through Orchard Germany.' },
      { t: 'Radio sessions', b: 'KCRW and KEXP in the US. We go after the European equivalents early.' },
      { t: 'Ads', b: 'Budget weighted around release week in every market, then kept running for the two weeks after.' },
      { t: 'Capture', b: 'Every event and session feeds the newsletter.' },
    ],
  }),

  act({ label: 'How', line: 'Paid media' }),

  /* 12 — the method. */
  {
    section: 'Paid media',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Paid media</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1500px;margin-bottom:24px">
          What does a listener cost?
        </h2>
        <p class="body reveal" style="--d:.14s;font-size:22px;max-width:1300px;margin-bottom:52px">
          Cost per click is what Meta reports. Cost per listener is what matters. We report it
          weekly, per cut and per market.
        </p>

        <ol class="steps reveal" style="--d:.24s;grid-template-columns:repeat(4,1fr)">
          ${pts([
            ['Find the sound', 'Each section of the song against the same visual, to find the part people stop for.'],
            ['Build the cuts', 'Up to twenty-five visuals on that section: film, the videos, Ry&rsquo;s own footage. Each market tested separately.'],
            ['Two kinds of page', 'Ry&rsquo;s content on his own pages. Our content on third-party pages with an audience already there.'],
            ['Weekly call', 'Push harder or hold back, decided with you from the numbers.'],
          ])}
        </ol>
      </div>`,
  },

  /* 13 — the real world. No co-brand, no countdown. */
  {
    section: 'Events',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Events</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1500px;margin-bottom:24px">
          The events he already does.
        </h2>
        <p class="body reveal" style="--d:.14s;font-size:22px;max-width:1340px;margin-bottom:52px">
          The sound baths and the small shows are the most Ry X part of the campaign. One in
          New York, one in Europe, a sponsor to cover it, and the right people in the room.
        </p>

        <ol class="steps reveal" style="--d:.24s;grid-template-columns:repeat(3,1fr)">
          ${pts([
            ['The sponsor', 'Firebird&rsquo;s deck, Orchard Germany&rsquo;s brands team, and our own contacts.'],
            ['Production', 'We know people in Europe who put these on well.'],
            ['Afterwards', 'Content for the campaign for weeks, and the names of everyone who came.'],
          ])}
        </ol>

        <div class="rule reveal" style="--d:.42s;margin:56px 0 30px"></div>
        <p class="body reveal" style="--d:.48s;font-size:22px;max-width:1420px">
          None of this asks Ry to sell anything. The newsletter is the only call to action.
        </p>
      </div>`,
  },

  act({ label: 'The team', line: 'Who we are' }),

  /* 15 — the team. Peter and Tobi, and what Sweat is. No Pierre, no titles
     that promise who runs the day to day. */
  {
    section: 'The team',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Sweat Strategies</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1500px;margin-bottom:24px">
          Fifteen people in London.
        </h2>
        <p class="body reveal" style="--d:.14s;font-size:22px;max-width:1340px;margin-bottom:48px">
          We run paid media, product management and campaigns for artists and labels across
          the UK, Europe and the US. We have run campaigns for Elderbrook, Bonobo, Maribou
          State, Disclosure and Swedish House Mafia, and we work with Atlantic, BMG, Ninja
          Tune, Red Light, Live Nation and CAA.
        </p>

        <ol class="steps reveal" style="--d:.26s;grid-template-columns:repeat(2,1fr);max-width:1500px">
          ${card('Founder', 'Peter Jarrett', 'Runs Sweat Music Group. Twenty years in music marketing, with campaigns for Swedish House Mafia, Disclosure and Bonobo, previously at Mercury and Sony Black Butter, alongside marketing campaigns for Atlantic, BMG and Ninja Tune.')}
          ${card('Co-founder &middot; Paid media', 'Tobi Steinborn', 'Runs the media. The campaigns behind Elderbrook, Ninja Tune and Better Noise, and the Red Light work already live.')}
        </ol>

        <div class="rule reveal" style="--d:.42s;margin:48px 0 28px"></div>
        <p class="body reveal" style="--d:.48s;font-size:21px;max-width:1400px;opacity:.9">
          You get a named day-to-day lead in the first week, and Peter on everything.
        </p>
      </div>`,
  },

  roster(),

  /* 17 — the weekly. */
  {
    section: 'The team',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.82fr 1.18fr;align-items:center;gap:70px">
        <div>
          <div class="label reveal" style="margin-bottom:26px">Reporting</div>
          <h2 class="display reveal" style="--d:.08s;font-size:60px;line-height:1.08;margin-bottom:24px">
            Every Monday,<br>without being asked.
          </h2>
          <p class="body reveal" style="--d:.16s;font-size:21px;max-width:none;margin-bottom:22px">
            A written report and the dashboard open all week: spend, cost per listener by
            market, what Spotify did, where every partner is, and what needs a decision.
          </p>
          <p class="body reveal" style="--d:.24s;font-size:21px;max-width:none;margin-top:0">
            You will not have to ask for a number.
          </p>
        </div>
        <div class="reveal" style="--d:.32s;max-width:1060px;justify-self:center;width:100%">
          ${browser({ src: 'dashboard.jpg', alt: 'Sweat campaign dashboard: spend, cost per result and markets, updated daily' })}
        </div>
      </div>`,
  },

  /* 18 — what we need. */
  {
    section: 'The team',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">From your side</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1400px;margin-bottom:52px">
          Five things and<br>we are running.
        </h2>

        <ol class="steps reveal" style="--d:.2s;grid-template-columns:repeat(3,1fr);row-gap:48px;max-width:1728px">
          ${pts([
            ['The vinyl date', 'It sets the album date and the February week.'],
            ['The money route', 'The ad budget sits with Orchard. We invoice them for spend.'],
            ['Access', 'Meta, Spotify for Artists, the videos, the newsletter. So Lay can start straight away.'],
            ['An intro to each partner', 'Orchard US and Germany, Shore Fire, Circa, Firebird. After that we do the chasing.'],
            ['An hour with Ry', 'Before we build anything.'],
          ])}
        </ol>
      </div>`,
  },

  /* 19 — the fee. Exactly what was said on the call. */
  {
    section: 'Engagement',
    html: `
      <div class="field field--dark"></div>
      ${blobs([
        { k: 'a', pos: 'right:-300px;top:-260px;opacity:.6' },
        { k: 'b', pos: 'left:-200px;bottom:-380px;opacity:.5' },
      ])}
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:34px">The engagement &middot; November to March</div>
        <h2 class="display reveal" style="--d:.08s;font-size:76px;line-height:1.04;margin-bottom:52px">
          Five months,<br>two ways to pay.
        </h2>

        <div class="reveal" style="--d:.2s;display:grid;grid-template-columns:1fr 1fr;gap:80px;max-width:1500px">
          <div>
            <div class="tier">Monthly</div>
            <div class="display" style="font-size:92px;line-height:1;margin-bottom:18px">£5,000<span style="font-size:36px;font-weight:500;letter-spacing:0">&nbsp;a month</span></div>
            <p class="body" style="font-size:21px;max-width:600px">
              Five payments, £25,000, invoiced monthly from 1 November.
            </p>
          </div>
          <div>
            <div class="tier">Up front</div>
            <div class="display" style="font-size:92px;line-height:1;margin-bottom:18px">£20,000</div>
            <p class="body" style="font-size:21px;max-width:600px">
              The same five months, <strong style="color:#fff">the fifth on us</strong>.
            </p>
          </div>
        </div>

        <div class="rule reveal" style="--d:.36s;margin:52px 0 28px"></div>
        <div class="reveal" style="--d:.42s;display:grid;grid-template-columns:1fr 1fr;gap:80px;max-width:1500px">
          <p class="body" style="font-size:20px;max-width:none">
            <strong style="color:#fff">Media included.</strong> No 20% on ad spend on top.
          </p>
          <p class="body" style="font-size:20px;max-width:none;margin-top:0">
            <strong style="color:#fff">On top, at cost:</strong> the ad spend itself, from
            Orchard&rsquo;s budget, and event hard costs.
          </p>
        </div>
      </div>`,
  },

  /* 20 — close. */
  {
    section: 'Next',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:82px;line-height:1.08;margin-bottom:24px">
          Lay is out tomorrow.<br>The launch is three weeks away.
        </h2>
        <p class="body reveal" style="--d:.12s;font-size:23px;max-width:1300px;margin-bottom:48px">
          If this looks right, it goes to Steve, then an hour with Ry. Lay starts the day
          it is approved and the rest from 1 November.
        </p>
        <ol class="steps reveal" style="--d:.2s;max-width:1620px">
          <li><span>01</span>Ads on Lay through our channels, as soon as this is approved.</li>
          <li><span>02</span>This goes to Steve, then to Ry.</li>
          <li><span>03</span>An hour with Ry, and the vinyl date.</li>
          <li><span>04</span>1 November: testing starts on the November single and the February asks go out.</li>
        </ol>
        <div class="rule reveal" style="--d:.36s;margin:60px 0 40px"></div>
        <p class="reveal" style="--d:.44s;font-size:30px;font-weight:700">
          <a href="mailto:pj@sweatstrategies.com" style="color:var(--blue)">pj@sweatstrategies.com</a>
        </p>
      </div>`,
  },
];
