/* ------------------------------------------------------------------
   Ry X — the album campaign, Europe and the US
   Bespoke proposal for SuzAnn Brantner, Lulu Dawson and Jamie Porten at
   Red Light Management, to take to Steve and then to Ry.

   SOURCES. Two calls, both transcripts read in full: the 20 Oct call
   with SuzAnn alone, and the 27 Oct call with SuzAnn, Lulu and Jamie.
   Plus SuzAnn's email of 28 Oct asking for a quick campaign on "Lay",
   and PJ's reply pricing it. Everything specific in here — the dates,
   the markets, the partners, the budget lines, the in-store and radio
   wish-list, the sound baths — is theirs.

   THE ARGUMENT IS SUZANN'S OWN. 20 Oct: "what it looks like if you
   became our de facto product manager to try to poke and prod Orchard."
   And: "where we need the most help is in Europe, which is where you're
   based." 27 Oct, with the team on: "so that there is someone from Ry's
   point of view, pushing ... versus just, oh, you're a number of how
   many artists that we put out." And the reason it has to be a
   proposal at all: "this is not something that's in the budget to pay
   you ... we're going to have to go propose it to him, that it's
   something he should spend money out of his pocket for." So the real
   reader is Ry, via Steve. The deck is written to be read by the person
   paying for it, who is an artist and — SuzAnn, twice — "not a sell,
   sell, sell" type.

   WHAT THE DECK MUST NOT DO.

   1. It must not run down The Orchard. SuzAnn was candid — the
      international teams "don't feel like they're engaging", the US plan
      arrived the day before a holiday and was "general, run-of-the-mill"
      — but Orchard holds the distribution, the $24.5k ad budget, and is
      the party we would invoice for spend. The gap is framed as a job
      nobody has, not a job someone is failing at. Nothing in here needs
      Orchard to be doing badly for the argument to hold.

   2. It must not promise a playlist. PJ on the call: "We do DSP pitching
      quite rarely ... if you're hitting people up every week about things
      it becomes less impactful." And SuzAnn's Amazon story: "I love him,
      but there's no playlist for him." Pitching is in the scope because
      PJ offered it; the slide says when and why, not what it will get.

   3. No co-brands, no countdowns, no clipping. SuzAnn: "He isn't a
      co-brand type of guy ... he's not going to be like, here's my
      countdown, sign up for my co-brand drop. He's an artist." And on
      the influencer line: "not fucking doing clipping, hate that." The
      activations in here are the ones he already does — the closer
      events, sound baths, in-stores, stripped-down radio.

   4. Nothing that is already covered. US publicity is Shore Fire (Josh).
      Club promo and US non-comm radio is Circa. Latin America is D
      Music. Manufacturing is Diggers. D2C is the Merch Collective. The
      brands deck is coming from Firebird. All named on slide 03 as
      staying; none pitched against.

   5. No touring. The European tour is April, after the album, and is
      not ours. The German shows in Cologne and Berlin are Orchard
      Germany's. Release week travel — LA, New York, then Europe — is
      their plan and the deck builds around it rather than adding to it.

   No artist photography: there is no licensed image of Ry X in the
   library. Typographic throughout, like Øneheart.

   THE FEE IS WHAT PJ SAID ON THE CALL, with SuzAnn writing it down:
   £5,000 a month for full project management, ads inclusive with no 20%
   on top; or £20,000 for the five months paid up front, the fifth free,
   which is the Øneheart deal and PJ offered it. November to March. The
   "Lay" quick start from PJ's 28 Oct email — £250 plus 20% on spend,
   credited against month one if the campaign goes ahead — is on the
   fee slide too, because it is live before anyone has signed.

   OPEN, FLAGGED TO PJ
   · Who runs it day to day, and Pierre's exact title. PJ named Pierre
     Hall on the call (Bella Union, DFA, Believe) and said someone with
     live experience has just been offered a job. The team slide has
     Peter, Pierre and Tobi; day-to-day ownership is left open on purpose.
   · "Steve" has no surname anywhere in the record. Not used in the deck.
   · The 19 November single has no title in the transcripts. The deck
     calls it "the November single".
   ------------------------------------------------------------------ */

import { img, blobs, browser } from './parts.js';

/* ------------------------------------------------------- local archetypes */

/* A moment in the campaign — one per release, in date order. The date sits
   in blue above the title so flipping through reads as a calendar. */
const moment = ({ n, date, title, sub = '', headline, body, points }) => ({
  section: 'The campaign',
  grain: 'soft',
  html: `
    <div class="pad l-mid">
      <div class="label reveal" style="margin-bottom:24px">${n}</div>
      <div class="reveal" style="--d:.05s;font-family:var(--sans);font-weight:800;font-size:30px;letter-spacing:-0.02em;color:var(--blue);margin-bottom:14px">${date}</div>
      <h2 class="display reveal" style="--d:.1s;font-size:88px;line-height:1;color:var(--head);margin-bottom:${sub ? 10 : 30}px">${title}</h2>
      ${sub ? `<div class="reveal" style="--d:.14s;font-family:var(--sans);font-weight:500;font-size:28px;letter-spacing:-0.02em;color:var(--head);opacity:.7;margin-bottom:30px">${sub}</div>` : ''}
      <h3 class="display reveal" style="--d:.18s;font-size:42px;line-height:1.2;max-width:1300px;margin-bottom:26px">${headline}</h3>
      <p class="body reveal" style="--d:.24s;font-size:22px;max-width:1180px">${body}</p>

      <div class="rule reveal" style="--d:.32s;margin:46px 0 34px"></div>

      <ol class="steps reveal" style="--d:.38s;grid-template-columns:repeat(${points.length},1fr)">
        ${points.map((p, i) => `
          <li><span>${String(i + 1).padStart(2, '0')}</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">${p.t}</div>
            <p class="body" style="font-size:18px;max-width:none">${p.b}</p>
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

/* A titled card inside a steps list — used on the map, the job, the team. */
const card = (role, name, line) => `
  <li><span>${role}</span>
    <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">${name}</div>
    <p class="body" style="font-size:19px;max-width:none">${line}</p></li>`;

export const OPTS = {
  legal: 'Prepared for Red Light Management. Commercial in confidence.<br>2026 Sweat Strategies.',
};

export const SLIDES = [
  /* 01 — cover. The artwork with its chrome baked in; the project title on
     the deck's gutter, bottom left, where the ground is already dark. */
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

  /* 02 — the hook. SuzAnn's line, tightened, set under a label rather than
     in quote marks — she said the longer version on the call and this is
     not word for word. */
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
          Not another partner with a lane. One person whose only artist on this
          record is Ry X, who holds the plan across every market, runs the media,
          builds the real-world moments, and reports every week on what the money did.
        </p>
      </div>`,
  },

  /* 03 — the map. Everyone named is staying, and the slide says so. The gap
     is in the middle, not in anybody's work. */
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
          None of this needs replacing. What is missing is the person who sits in the
          middle of it from Ry&rsquo;s point of view &mdash; particularly in Europe, where
          the distributor&rsquo;s attention is spread across a roster.
        </p>

        <ol class="steps reveal" style="--d:.22s;grid-template-columns:repeat(4,1fr);row-gap:40px">
          ${card('Distribution', 'The Orchard', 'The record, the ad budget, and the German office now engaged.')}
          ${card('US publicity', 'Shore Fire', 'Josh, pitching US press and reaching into the bigger UK titles.')}
          ${card('Radio &amp; club', 'Circa', 'US non-comm and specialty, club promo &mdash; and building out in Europe.')}
          ${card('Latin America', 'D Music', 'Project management for Anglo artists in the region, in conversation.')}
          ${card('Brands', 'Firebird', 'The deck for sponsors, due this week; Orchard Germany&rsquo;s brands team behind it.')}
          ${card('Physical', 'Diggers · Merch Collective', 'Vinyl in manufacture, shipping to the EU and the US; D2C in place.')}
          ${card('Content', 'Videos for every song', 'Already shot. The campaign is distribution, not production.')}
          ${card('The gap', 'Europe, from Ry&rsquo;s side', 'A plan per market, the media, the moments on the ground, and the chasing. This proposal.')}
        </ol>
      </div>`,
  },

  act({ label: 'The job', line: 'Your product manager, in Europe' }),

  /* 05 — the job, in PJ's own four parts from the call: "full project
     management, which includes advertising, putting together these
     activations ... support with pitching, in stores, all of that." */
  {
    section: 'The job',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">What we take on</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1500px;margin-bottom:48px">
          Four things, one team,<br>November to March.
        </h2>

        <ol class="steps reveal" style="--d:.2s;grid-template-columns:repeat(4,1fr)">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:25px;letter-spacing:-0.03em;margin-bottom:12px">The plan, per market</div>
            <p class="body" style="font-size:19px;max-width:none">US, Germany, the UK and Belgium each get their own read and their own plan, held in one place. We sit between Red Light, Orchard&rsquo;s offices and every partner, and we do the chasing so you are not.</p></li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:25px;letter-spacing:-0.03em;margin-bottom:12px">The media</div>
            <p class="body" style="font-size:19px;max-width:none">Every release tested before it is spent on, scaled while it is working, and reported on cost per acquisition &mdash; not cost per click. Run on Ry&rsquo;s pages and on our third-party pages, the way the Elderbrook campaign runs now.</p></li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:25px;letter-spacing:-0.03em;margin-bottom:12px">The real world</div>
            <p class="body" style="font-size:19px;max-width:none">The in-stores, the stripped-down radio, the closer events. We find the rooms and the collaborators in Europe, help land a sponsor, and get the right people into the room.</p></li>
          <li><span>04</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:25px;letter-spacing:-0.03em;margin-bottom:12px">Pitching, when it counts</div>
            <p class="body" style="font-size:19px;max-width:none">DSP and editorial, through our network, for the record as what it is &mdash; and only at the moments that deserve it. Going to the well is something you can only do so many times.</p></li>
        </ol>

        <div class="rule reveal" style="--d:.4s;margin:52px 0 30px"></div>
        <p class="body reveal" style="--d:.46s;font-size:22px;max-width:1400px">
          <strong style="color:var(--blue)">The same shape as &Oslash;neheart.</strong> Marc Sheinman
          brought us in to be the middle of that campaign, and it is what we already do on
          Elderbrook for Red Light. Nothing in this proposal is new to us; it is new to this record.
        </p>
      </div>`,
  },

  act({ label: 'The campaign', line: 'Four releases, one album' }),

  /* 07 — the calendar. Their dates. The one that is not fixed is the one
     that matters, so it says so. */
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
            { n: '29 October', t: 'Lay', b: 'Out this week, unpitched. The first read on the record, through third-party channels, from tomorrow.' },
            { n: '19 November', t: 'The November single', b: 'The real launch: album pre-save and vinyl pre-order open. The campaign starts here in earnest.' },
            { n: 'January', t: 'The third single', b: 'Scaling what November found. The in-store and radio asks are already out.' },
            { n: 'February', t: 'The album', b: '12th, 19th or 25th — the vinyl decides. LA, New York, then Europe inside release week.' },
            { n: 'April', t: 'Europe on tour', b: 'Not ours — but every fan captured between now and then is a cheaper ticket sold.' },
          ].map((s, i) => `
            <li class="flow__node${i === 4 ? ' flow__node--human' : ''}">
              <div class="flow__n">${s.n}</div>
              <div class="flow__t">${s.t}</div>
              <p class="flow__b">${s.b}</p>
            </li>`).join('')}
        </ol>

        <div class="rule reveal" style="--d:.42s;margin:56px 0 32px"></div>
        <p class="body reveal" style="--d:.48s;font-size:23px;max-width:1420px">
          <strong style="color:var(--blue)">One date sets everything else.</strong>
          The album lands when the vinyl lands at Orchard, and the in-stores, the radio sessions
          and the European week all hang off it. Until it is confirmed, every plan in here is built
          to move a week either way without breaking.
        </p>
      </div>`,
  },

  moment({
    n: 'Release 01 of 04',
    date: '29 October',
    title: 'Lay',
    sub: 'Already moving',
    headline: 'The first number arrives before anyone has signed anything.',
    body: `Lay goes out this week unpitched, into Spotify&rsquo;s wellness week, because Ry
      wanted it out. That makes it the ideal test: no editorial to wait on, no pre-save to
      protect, just the record against real audiences through our third-party channels, exactly
      as we run it for Elderbrook. By the time the November single is live we know which part
      of this record stops a scroll, and in which country.`,
    points: [
      { t: 'Third-party channels', b: 'Our own pages, warm audiences already there, Lay in front of them from tomorrow.' },
      { t: 'A small spend, a real read', b: 'Enough to learn what a listener costs by market — the US, Germany, the UK, Belgium — not enough to matter if the answer is no.' },
      { t: 'It counts against month one', b: 'The quick start is £250 plus 20% on spend, and comes off the first month if the full campaign goes ahead.' },
    ],
  }),

  moment({
    n: 'Release 02 of 04',
    date: '19 November',
    title: 'The November single',
    sub: 'Album pre-save and vinyl pre-order open',
    headline: 'This is the launch. It should be the first time the budget is spent knowing something.',
    body: `Ry has told his audience the album is coming; this is the day it becomes real to them,
      with the pre-save and the vinyl both live. Holy Water showed what happens when the ads work
      and nobody is watching: it was doing well, and by the time anyone could see that, the ads had
      stopped. This time the person watching is the person with their hand on the budget.`,
    points: [
      { t: 'Test the record itself', b: 'Every section of the song against a control visual, then up to twenty-five cuts of the winner — film, the videos, Ry&rsquo;s own content.' },
      { t: 'Scale while it is working', b: 'Cost per acquisition read daily, by market. When a cut is converting, the budget moves to it that day, not after the month closes.' },
      { t: 'The pre-save is the outcome', b: 'The campaign drives at the album, not the single: the single is the way in, the pre-save is what we count.' },
      { t: 'The asks go out now', b: 'Rough Trade, Amoeba, a German store, the radio sessions. They are booked months out, so the February week starts being built in November.' },
    ],
  }),

  moment({
    n: 'Release 03 of 04',
    date: 'January',
    title: 'The third single',
    headline: 'By now the campaign has a memory, and January spends it.',
    body: `Two singles in, we know the sound that converts, the markets that respond and what a
      listener costs in each of them. January is not a new test. It is the first release that
      opens warm &mdash; to the list the first two built, to the pre-saves, to the people who
      bought the vinyl early &mdash; and it holds that audience through to the album.`,
    points: [
      { t: 'Open to a warm audience first', b: 'The capture from October and November reached before a pound goes on cold reach.' },
      { t: 'Weight the markets', b: 'If Germany is converting at half the cost of the UK, Germany gets more of the budget. Decided from the numbers, with you, in the weekly.' },
      { t: 'Lock the February week', b: 'Dates, rooms and the European sessions confirmed and advanced, so release week is run rather than discovered.' },
    ],
  }),

  moment({
    n: 'Release 04 of 04',
    date: 'February',
    title: 'The album',
    sub: 'LA on the Monday, New York, then Europe by the weekend',
    headline: 'The record lands with Ry in the room, in the places that matter to it.',
    body: `Ry wants to be out and doing things this time, and his audience wants him in a room:
      in-stores, stripped-down sessions, the kind of close events he already plays. Red Light
      and Orchard&rsquo;s US team hold the American leg. We hold the European one &mdash; the
      rooms, the advancing, the marketing around each stop, and the capture at every door &mdash;
      and we hold the week together across the Atlantic so it reads as one campaign.`,
    points: [
      { t: 'The in-stores', b: 'Rough Trade in London, a German store through Orchard Germany, and the two US dates built into one route.' },
      { t: 'Stripped-down radio', b: 'KCRW and KEXP are the US wish-list; we find the European equivalents and make the asks early, while there is still a calendar.' },
      { t: 'Spend to the week', b: 'The album budget weighted around release week in every market, then held into the fortnight after, when album campaigns usually go quiet.' },
      { t: 'Capture everywhere', b: 'Every room, every session, every stop feeds the list — in Ry&rsquo;s own way, through the newsletter, not a countdown.' },
    ],
  }),

  act({ label: 'How', line: 'Testing, not spending' }),

  /* 13 — the method. The one slide where Sweat talks about itself. The
     contrast is with the cost-per-click answer SuzAnn got, phrased as the
     question rather than at the person who could not answer it. */
  {
    section: 'Paid media',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Paid media</div>
        <h2 class="display reveal" style="--d:.08s;font-size:68px;line-height:1.08;max-width:1500px;margin-bottom:24px">
          The question is what a listener costs.<br>Everything else is a click.
        </h2>
        <p class="body reveal" style="--d:.14s;font-size:22px;max-width:1300px;margin-bottom:46px">
          Cost per click is what Meta tells you. Cost per acquisition is what happens after the
          click &mdash; who actually arrived at the record &mdash; and it is the number that decides
          whether to spend more. We report it weekly, per cut and per market, and we scale on it.
        </p>

        <ol class="steps reveal" style="--d:.24s;grid-template-columns:repeat(4,1fr)">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Find the sound</div>
            <p class="body" style="font-size:18px;max-width:none">Every section of the song against the same control visual. The part that holds attention is the part the campaign is built on.</p></li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Cut in every direction</div>
            <p class="body" style="font-size:18px;max-width:none">Up to twenty-five visuals around the winning sound: film, the videos, Ry&rsquo;s own footage. Against cold audiences, in each market separately.</p></li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Run on both kinds of page</div>
            <p class="body" style="font-size:18px;max-width:none">Ry&rsquo;s content on his pages; our content on third-party pages that already have the audience. Both read against Spotify for Artists.</p></li>
          <li><span>04</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Decide, together, weekly</div>
            <p class="body" style="font-size:18px;max-width:none">Go harder on this one, or hold it for the next? An honest conversation about the data, with the people who can act on it the same day.</p></li>
        </ol>

        <div class="rule reveal" style="--d:.42s;margin:50px 0 30px"></div>
        <p class="body reveal" style="--d:.48s;font-size:21px;max-width:1420px;opacity:.9">
          It does not tell you a song is better or worse. It tells you how effectively paid media
          can work on it &mdash; which is the thing worth knowing before the budget goes out.
        </p>
      </div>`,
  },

  /* 14 — the real world. Built on what he already does and on SuzAnn's
     "people love him in the wellness space". No co-brand, no countdown. */
  {
    section: 'The real world',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">The real world</div>
        <h2 class="display reveal" style="--d:.08s;font-size:68px;line-height:1.08;max-width:1500px;margin-bottom:24px">
          The moments he already makes,<br>with the right people in the room.
        </h2>
        <p class="body reveal" style="--d:.14s;font-size:22px;max-width:1340px;margin-bottom:46px">
          The closer events &mdash; the sound baths, the meditations &mdash; are the most
          Ry X thing in the campaign, and people love him in that space. The job is not to
          invent an activation. It is to put one of those in New York and one in Europe, find
          the sponsor that makes it pay for itself, and have the DSPs, the press and the
          partners in the room when it happens.
        </p>

        <ol class="steps reveal" style="--d:.24s;grid-template-columns:repeat(3,1fr)">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">The sponsor</div>
            <p class="body" style="font-size:18px;max-width:none">Firebird&rsquo;s deck goes to brands this week; Orchard Germany has offered its brands team; we add our own relationships. Three routes to one partner, run from one place.</p></li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">The collaborators</div>
            <p class="body" style="font-size:18px;max-width:none">We know the people in Europe who build this kind of experience well. The room, the sound, the light &mdash; done by someone who has done it before, not by a promoter&rsquo;s marketing budget.</p></li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">What it leaves behind</div>
            <p class="body" style="font-size:18px;max-width:none">Content the campaign can run for weeks, and a list of the people who came. The real world is part of digital now; this is where the fans get captured, on Ry&rsquo;s terms.</p></li>
        </ol>

        <div class="rule reveal" style="--d:.42s;margin:50px 0 30px"></div>
        <p class="body reveal" style="--d:.48s;font-size:21px;max-width:1420px">
          <strong style="color:var(--blue)">Nothing here asks Ry to sell.</strong> No drop, no
          countdown, no co-brand. His newsletter is the only call to action in the deck, because
          it is the one he already makes.
        </p>
      </div>`,
  },

  /* 15 — pitching. Honest about the record and about the well. */
  {
    section: 'Pitching',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Pitching</div>
        <h2 class="display reveal" style="--d:.08s;font-size:68px;line-height:1.08;max-width:1500px;margin-bottom:24px">
          Rarely, deliberately,<br>and for the record it is.
        </h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:100px;max-width:1600px">
          <p class="body reveal" style="--d:.16s;font-size:22px;max-width:none">
            This album is not a dance record, and it will not be pitched as one. In the UK it reads
            as alternative pop; in the US it sits with the indie and alternative editors rather than
            the electronic ones. We pitch it to the people whose playlists it actually belongs on,
            through a network that is global and that we do not go to every week.
          </p>
          <p class="body reveal" style="--d:.26s;font-size:22px;max-width:none;margin-top:0">
            Which is why Lay is not being pitched, and why the November single is. You can only go to
            the well so many times, so we go when the record has a pre-save behind it, a date, and a
            story &mdash; and we go with the numbers from the first campaign in hand, which is the
            thing an editor cannot get anywhere else.
          </p>
        </div>

        <div class="rule reveal" style="--d:.38s;margin:52px 0 30px"></div>
        <p class="body reveal" style="--d:.44s;font-size:21px;max-width:1420px;opacity:.9">
          No playlist is promised in this document. What is promised is that every ask is made at
          the right moment, to the right person, with evidence &mdash; and that you will know what
          was asked and what came back.
        </p>
      </div>`,
  },

  act({ label: 'How we work', line: 'One team, one weekly' }),

  /* 17 — the team. Peter accountable; the two names PJ gave on the call.
     Who runs it day to day is deliberately left open — see the header. */
  {
    section: 'How we work',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Who does what</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1400px;margin-bottom:44px">
          Label people, running it<br>the way a label should.
        </h2>

        <div class="reveal" style="--d:.16s;max-width:1400px">
          <div style="display:flex;align-items:baseline;gap:26px;margin-bottom:14px">
            <div style="font-family:var(--sans);font-weight:800;font-size:44px;letter-spacing:-0.04em">Peter Jarrett</div>
            <div style="font-family:var(--mono);text-transform:uppercase;font-size:19px;letter-spacing:0.16em;color:var(--blue)">Accountable</div>
          </div>
          <p class="body" style="font-size:21px;max-width:1180px">
            Twenty years in: A&amp;R at Universal Publishing and Mercury, a producer signed to Black
            Butter, then brand and creative at 72andSunny, then a label through The Orchard. Sets the
            strategy and is in the room for the decisions that matter.
          </p>
        </div>

        <div class="rule reveal" style="--d:.26s;margin:44px 0 40px"></div>

        <ol class="steps reveal" style="--d:.32s;grid-template-columns:repeat(2,1fr);max-width:1500px">
          ${card('Product management', 'Pierre Hall', 'Label manager at Bella Union for years, DFA Records, then senior product manager at Believe. Has run exactly this job from inside the label.')}
          ${card('Paid media', 'Tobi Steinborn', 'Co-founder, runs the media. The campaigns behind Elderbrook, Ninja Tune and all of Better Noise, and the Red Light work already live.')}
        </ol>

        <div class="rule reveal" style="--d:.42s;margin:40px 0 28px"></div>
        <p class="body reveal" style="--d:.48s;font-size:21px;max-width:1400px;opacity:.9">
          Fifteen people now, from two at the start of the year. The campaign gets a named
          day-to-day lead from this team in the first week; Peter stays accountable for all of it.
        </p>
      </div>`,
  },

  /* 18 — the weekly. SuzAnn's whole experience of this record has been
     waiting for a number. The answer is a rhythm she never has to ask for. */
  {
    section: 'How we work',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.82fr 1.18fr;align-items:center;gap:70px">
        <div>
          <div class="label reveal" style="margin-bottom:26px">Reporting</div>
          <h2 class="display reveal" style="--d:.08s;font-size:60px;line-height:1.08;margin-bottom:24px">
            Every week,<br>without being asked.
          </h2>
          <p class="body reveal" style="--d:.16s;font-size:21px;max-width:none;margin-bottom:22px">
            A written report every Monday and the dashboard open all week: spend, cost per
            acquisition by cut and by market, what the record did on Spotify, where every partner
            is, and what needs a decision from you and by when.
          </p>
          <p class="body reveal" style="--d:.24s;font-size:21px;max-width:none;margin-top:0">
            You should never have to chase a number, and never find out an ad stopped after it did.
          </p>
        </div>
        <div class="reveal" style="--d:.32s;max-width:1060px;justify-self:center;width:100%">
          ${browser({ src: 'dashboard.jpg', alt: 'Sweat campaign dashboard: spend, cost per result and markets, updated daily' })}
        </div>
      </div>`,
  },

  /* 19 — what we need. Their side of the work, so the first week is fast. */
  {
    section: 'How we work',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">From your side</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1400px;margin-bottom:44px">
          Five things and<br>we are running.
        </h2>

        <ol class="steps reveal" style="--d:.2s;grid-template-columns:repeat(3,1fr);row-gap:40px;max-width:1728px">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">The vinyl date</div>
            <p class="body" style="font-size:19px;max-width:none">The day it is confirmed, the album date is, and the February week can be booked. Everything in here is built to wait for it.</p></li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">The money route</div>
            <p class="body" style="font-size:19px;max-width:none">The ad budget sits with Orchard. We invoice them for spend and run it; you said you would work that out with them, and we will help.</p></li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">Access</div>
            <p class="body" style="font-size:19px;max-width:none">Meta business assets, Spotify for Artists, the videos for every song, and the newsletter &mdash; so Lay can start tomorrow.</p></li>
          <li><span>04</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">One thread per partner</div>
            <p class="body" style="font-size:19px;max-width:none">Orchard&rsquo;s US and German teams, Shore Fire, Circa, Firebird. One introduction each; after that the chasing is ours.</p></li>
          <li><span>05</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">An hour with Ry</div>
            <p class="body" style="font-size:19px;max-width:none">Before anything is built. It is better to go with his energy than against it, and we need to hear from him what feels right and what does not.</p></li>
        </ol>
      </div>`,
  },

  /* 20 — the fee. Exactly what was said on the call, and the Lay quick
     start from the email. Two real totals, not two payment plans. */
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
        <h2 class="display reveal" style="--d:.08s;font-size:76px;line-height:1.04;margin-bottom:48px">
          Five months,<br>two ways to do it.
        </h2>

        <div class="reveal" style="--d:.2s;display:grid;grid-template-columns:1fr 1fr;gap:80px;max-width:1500px">
          <div>
            <div class="tier">Monthly</div>
            <div class="display" style="font-size:92px;line-height:1;margin-bottom:18px">£5,000<span style="font-size:36px;font-weight:500;letter-spacing:0">&nbsp;a month</span></div>
            <p class="body" style="font-size:21px;max-width:600px">
              Five payments, £25,000 across the term, invoiced monthly from 1 November.
            </p>
          </div>
          <div>
            <div class="tier">Up front</div>
            <div class="display" style="font-size:92px;line-height:1;margin-bottom:18px">£20,000</div>
            <p class="body" style="font-size:21px;max-width:600px">
              The same five months for <strong style="color:#fff">£5,000 less</strong> &mdash; four
              paid up front and the fifth on us. The deal &Oslash;neheart took.
            </p>
          </div>
        </div>

        <div class="rule reveal" style="--d:.36s;margin:48px 0 28px"></div>
        <div class="reveal" style="--d:.42s;display:grid;grid-template-columns:1fr 1fr;gap:80px;max-width:1500px">
          <p class="body" style="font-size:20px;max-width:none">
            <strong style="color:#fff">The fee includes the media.</strong> No 20% on ad spend on
            top &mdash; the management of every pound of it is in the retainer, along with the
            product management, the activations, the pitching and the in-stores.
          </p>
          <p class="body" style="font-size:20px;max-width:none;margin-top:0">
            <strong style="color:#fff">On top, at cost, never marked up:</strong> the ad spend itself,
            from Orchard&rsquo;s budget; the hard costs of each event, which the sponsor should carry;
            and any third-party software. Lay starts tomorrow at £250 plus 20% on its spend, credited
            against month one.
          </p>
        </div>
      </div>`,
  },

  /* 21 — close. Lay is moving regardless; the decision is about the rest. */
  {
    section: 'Next',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:82px;line-height:1.08;margin-bottom:24px">
          Lay is out tomorrow.<br>The launch is three weeks away.
        </h2>
        <p class="body reveal" style="--d:.12s;font-size:23px;max-width:1300px;margin-bottom:48px">
          The quick start runs either way. If the shape of the rest is right, the next step
          is yours with Steve, then an hour with Ry, and we are in from 1 November.
        </p>
        <ol class="steps reveal" style="--d:.2s;max-width:1620px">
          <li><span>01</span>Lay live through our channels, from tomorrow.</li>
          <li><span>02</span>This goes to Steve, and then to Ry.</li>
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
