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
   Lay quick start from the email: £250 + 20% on spend, credited.

   OPEN: day-to-day lead and Pierre's exact title; "Steve" has no surname
   in the record; the 19 Nov single is untitled in the transcripts.

   Cut hard on 28 Oct at PJ's request: "too verbose, needs to be a bit
   simpler". January and the pitching slide went; body paragraphs on
   the release slides became one line or nothing.
   ------------------------------------------------------------------ */

import { img, blobs, browser } from './parts.js';

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
          One person whose only artist on this record is Ry X. Holds the plan in every
          market, runs the media, builds the moments on the ground, reports every week.
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
          A lot of good people,<br>each with a lane.
        </h2>
        <p class="body reveal" style="--d:.14s;font-size:22px;max-width:1240px;margin-bottom:44px">
          None of this changes. What is missing is the person in the middle of it, on
          Ry&rsquo;s side &mdash; especially in Europe.
        </p>

        <ol class="steps reveal" style="--d:.22s;grid-template-columns:repeat(4,1fr);row-gap:44px">
          ${card('Distribution', 'The Orchard', 'The record, the ad budget, the German office.')}
          ${card('US publicity', 'Shore Fire', 'US press, reaching into the UK titles.')}
          ${card('Radio &amp; club', 'Circa', 'US non-comm and specialty; building out in Europe.')}
          ${card('Latin America', 'D Music', 'In conversation.')}
          ${card('Brands', 'Firebird', 'The sponsor deck, due this week.')}
          ${card('Physical', 'Diggers · Merch Collective', 'Vinyl in manufacture. D2C in place.')}
          ${card('Content', 'Videos for every song', 'Already shot.')}
          ${card('The gap', 'Europe, from Ry&rsquo;s side', 'The plan, the media, the chasing. This.')}
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
            ['The plan, per market', 'US, Germany, the UK, Belgium. One plan, held in one place, between Red Light, Orchard and every partner. We do the chasing.'],
            ['The media', 'Tested before it is spent, scaled while it works, reported on what a listener costs &mdash; not what a click costs.'],
            ['The real world', 'In-stores, stripped-down radio, the close events. We find the rooms and the sponsor.'],
            ['Pitching, when it counts', 'Through our network, for the record it is &mdash; alt-pop, not dance. No playlist is promised.'],
          ])}
        </ol>

        <div class="rule reveal" style="--d:.4s;margin:56px 0 30px"></div>
        <p class="body reveal" style="--d:.46s;font-size:22px;max-width:1400px">
          <strong style="color:var(--blue)">The same job we do on Elderbrook for Red Light,</strong>
          and did for &Oslash;neheart.
        </p>
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
            { n: '29 October', t: 'Lay', b: 'Out this week. The first read, through our channels.' },
            { n: '19 November', t: 'The November single', b: 'Pre-save and vinyl pre-order open. The launch.' },
            { n: 'January', t: 'The third single', b: 'Scale what November found.' },
            { n: 'February', t: 'The album', b: '12th, 19th or 25th &mdash; the vinyl decides.' },
            { n: 'April', t: 'Europe on tour', b: 'Not ours. Every fan captured before then is a cheaper ticket.' },
          ].map((s, i) => `
            <li class="flow__node${i === 4 ? ' flow__node--human' : ''}">
              <div class="flow__n">${s.n}</div>
              <div class="flow__t">${s.t}</div>
              <p class="flow__b">${s.b}</p>
            </li>`).join('')}
        </ol>

        <div class="rule reveal" style="--d:.42s;margin:56px 0 32px"></div>
        <p class="body reveal" style="--d:.48s;font-size:23px;max-width:1420px">
          <strong style="color:var(--blue)">One date sets the rest.</strong> The album lands when
          the vinyl does. Everything here is built to move a week either way.
        </p>
      </div>`,
  },

  moment({
    n: 'Release 01 of 04',
    date: '29 October',
    title: 'Lay',
    sub: 'Already moving',
    headline: 'The first number arrives before anyone has signed anything.',
    points: [
      { t: 'Our channels', b: 'Lay in front of warm audiences from tomorrow, the way we run Elderbrook.' },
      { t: 'A small spend', b: 'Enough to learn what a listener costs in the US, Germany, the UK and Belgium. Not enough to matter if the answer is no.' },
      { t: 'Credited', b: '£250 plus 20% on spend. Comes off month one if the campaign goes ahead.' },
    ],
  }),

  moment({
    n: 'Release 02 of 04',
    date: '19 November',
    title: 'The November single',
    sub: 'Album pre-save and vinyl pre-order open',
    headline: 'The launch. The first time the budget is spent knowing something.',
    body: `Holy Water was working, and the ads had stopped before anyone could see it.
      This time the person watching is the person with their hand on the budget.`,
    points: [
      { t: 'Test the record', b: 'Every section of the song against one visual, then cuts of the winner.' },
      { t: 'Scale what works', b: 'Cost per listener read daily, by market. Budget moves the same day.' },
      { t: 'Count the pre-save', b: 'The single is the way in. The album is what we count.' },
      { t: 'Make the asks', b: 'Rough Trade, Amoeba, a German store, the radio sessions. Booked months out, so they start now.' },
    ],
  }),

  moment({
    n: 'Release 04 of 04',
    date: 'February',
    title: 'The album',
    sub: 'LA, New York, then Europe inside the week',
    headline: 'The record lands with Ry in the room.',
    body: `Ry wants to be out doing things this time. Red Light and Orchard US hold the
      American leg; we hold Europe, and hold the week together.`,
    points: [
      { t: 'In-stores', b: 'Rough Trade, a German store through Orchard Germany, the two US dates in one route.' },
      { t: 'Stripped-down radio', b: 'KCRW and KEXP in the US. We find the European equivalents, early.' },
      { t: 'Spend to the week', b: 'Weighted around release in every market, then held for the fortnight after.' },
      { t: 'Capture at every door', b: 'Through the newsletter, Ry&rsquo;s way. No countdown.' },
    ],
  }),

  act({ label: 'How', line: 'Testing, not spending' }),

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
          Cost per click is what Meta tells you. Cost per listener is what decides whether to
          spend more. We report it weekly, per cut and per market, and scale on it.
        </p>

        <ol class="steps reveal" style="--d:.24s;grid-template-columns:repeat(4,1fr)">
          ${pts([
            ['Find the sound', 'Every section of the song against the same visual. The part that holds is the part we build on.'],
            ['Cut around it', 'Up to twenty-five visuals on the winner: film, the videos, Ry&rsquo;s own footage. Each market separately.'],
            ['Both kinds of page', 'Ry&rsquo;s content on his pages. Ours on third-party pages that already have the audience.'],
            ['Decide weekly', 'Go harder, or hold it for the next one. With the numbers, with you, the same day.'],
          ])}
        </ol>
      </div>`,
  },

  /* 13 — the real world. No co-brand, no countdown. */
  {
    section: 'The real world',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">The real world</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1500px;margin-bottom:24px">
          The moments he already makes.
        </h2>
        <p class="body reveal" style="--d:.14s;font-size:22px;max-width:1340px;margin-bottom:52px">
          The sound baths and the close events are the most Ry X thing in the campaign.
          One in New York, one in Europe, a sponsor to pay for it, and the right people in the room.
        </p>

        <ol class="steps reveal" style="--d:.24s;grid-template-columns:repeat(3,1fr)">
          ${pts([
            ['The sponsor', 'Firebird&rsquo;s deck, Orchard Germany&rsquo;s brands team, our own relationships. One partner, run from one place.'],
            ['The room', 'Built by people in Europe who do this well. Not a promoter&rsquo;s marketing budget.'],
            ['What it leaves', 'Weeks of content, and the list of who came.'],
          ])}
        </ol>

        <div class="rule reveal" style="--d:.42s;margin:56px 0 30px"></div>
        <p class="body reveal" style="--d:.48s;font-size:22px;max-width:1420px">
          <strong style="color:var(--blue)">Nothing here asks Ry to sell.</strong> No drop, no
          countdown, no co-brand. The newsletter is the only call to action.
        </p>
      </div>`,
  },

  act({ label: 'How we work', line: 'One team, one weekly' }),

  /* 15 — the team. Day-to-day lead left open on purpose. */
  {
    section: 'How we work',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Who does what</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1400px;margin-bottom:48px">
          Label people.
        </h2>

        <div class="reveal" style="--d:.16s;max-width:1400px">
          <div style="display:flex;align-items:baseline;gap:26px;margin-bottom:14px">
            <div style="font-family:var(--sans);font-weight:800;font-size:44px;letter-spacing:-0.04em">Peter Jarrett</div>
            <div style="font-family:var(--mono);text-transform:uppercase;font-size:19px;letter-spacing:0.16em;color:var(--blue)">Accountable</div>
          </div>
          <p class="body" style="font-size:21px;max-width:1180px">
            A&amp;R at Universal Publishing and Mercury, brand at 72andSunny, a label through
            The Orchard. Sets the strategy and is in the room for the decisions.
          </p>
        </div>

        <div class="rule reveal" style="--d:.26s;margin:48px 0 44px"></div>

        <ol class="steps reveal" style="--d:.32s;grid-template-columns:repeat(2,1fr);max-width:1500px">
          ${card('Product management', 'Pierre Hall', 'Bella Union, DFA Records, then senior product manager at Believe. Has done this job from inside the label.')}
          ${card('Paid media', 'Tobi Steinborn', 'Co-founder. Runs the media behind Elderbrook, Ninja Tune and Better Noise.')}
        </ol>

        <div class="rule reveal" style="--d:.42s;margin:44px 0 28px"></div>
        <p class="body reveal" style="--d:.48s;font-size:21px;max-width:1400px;opacity:.9">
          A named day-to-day lead in week one. Peter accountable throughout.
        </p>
      </div>`,
  },

  /* 16 — the weekly. */
  {
    section: 'How we work',
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
            You never chase a number.
          </p>
        </div>
        <div class="reveal" style="--d:.32s;max-width:1060px;justify-self:center;width:100%">
          ${browser({ src: 'dashboard.jpg', alt: 'Sweat campaign dashboard: spend, cost per result and markets, updated daily' })}
        </div>
      </div>`,
  },

  /* 17 — what we need. */
  {
    section: 'How we work',
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
            ['Access', 'Meta, Spotify for Artists, the videos, the newsletter. So Lay can start tomorrow.'],
            ['One intro per partner', 'Orchard US and Germany, Shore Fire, Circa, Firebird. After that the chasing is ours.'],
            ['An hour with Ry', 'Before anything is built.'],
          ])}
        </ol>
      </div>`,
  },

  /* 18 — the fee. Exactly what was said on the call. */
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
          Five months,<br>two ways to do it.
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
              The deal &Oslash;neheart took.
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
            Orchard&rsquo;s budget; event hard costs; any software. Lay starts tomorrow at
            £250 plus 20% on its spend, credited against month one.
          </p>
        </div>
      </div>`,
  },

  /* 19 — close. */
  {
    section: 'Next',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:82px;line-height:1.08;margin-bottom:24px">
          Lay is out tomorrow.<br>The launch is three weeks away.
        </h2>
        <p class="body reveal" style="--d:.12s;font-size:23px;max-width:1300px;margin-bottom:48px">
          The quick start runs either way. If the rest looks right: Steve, then an hour
          with Ry, and we are in from 1 November.
        </p>
        <ol class="steps reveal" style="--d:.2s;max-width:1620px">
          <li><span>01</span>Lay live through our channels, from tomorrow.</li>
          <li><span>02</span>This goes to Steve, then to Ry.</li>
          <li><span>03</span>An hour with Ry, and the vinyl date.</li>
          <li><span>04</span>1 November: the November single in test, the February asks out.</li>
        </ol>
        <div class="rule reveal" style="--d:.36s;margin:60px 0 40px"></div>
        <p class="reveal" style="--d:.44s;font-size:30px;font-weight:700">
          <a href="mailto:pj@sweatstrategies.com" style="color:var(--blue)">pj@sweatstrategies.com</a>
        </p>
      </div>`,
  },
];
