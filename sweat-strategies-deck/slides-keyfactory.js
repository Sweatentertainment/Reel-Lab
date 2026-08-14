/* ------------------------------------------------------------------
   M07 — the live cycle
   Bespoke proposal for Jay Lee, Key Factory (executive producer of M07).

   Sources: the 13 Aug strategy call (transcript + summary in Lightfield,
   mtg_cmsoefhnr03siorpmejreb1n6). There is no email thread — Gmail holds
   only the Cal.com booking confirmation — so everything specific in here
   comes off the call: the Hanoi film and the ADE cinema premiere, the
   Kissing You video, the February 2026 and February 2027 EPs, the Your
   Army radio campaign, the $25K of in-house Meta spend, and the shape of
   the second record. None of it is invented.

   THE ARGUMENT IS JAY'S OWN. He said the goal of this cycle is "to
   transition the artist into a live performance" and "to drive bookings
   of the show in 2027", and then put the real question far better than
   we could: "I can have 100,000, 200,000, 300, 400 — but is anybody
   going to go to my concert?" The deck answers that one question and
   nothing else. Its whole claim is that the output of this cycle should
   be a named, contactable, geographically mapped audience rather than a
   monthly listener count.

   FOUR THINGS THIS DECK MUST NOT DO.

   1. It must not treat the previous $25K as wasted. Jay ran it in-house
      with his own marketing person, who will very likely read this. The
      spend is framed as having bought reach it was never asked to keep —
      which is true, and is a statement about how the platforms work
      rather than about anyone's competence.

   2. It must not argue that streaming is the goal. Jay called the
      monthly listener number "kind of a vanity metric" and said "we
      don't necessarily see streaming as monetisation". PJ pushed back on
      the call — "to get live bookings… it really helps to have Spotify
      really moving" — so slide 06 states the disagreement openly and
      lands on the honest position: the number is not the point, the
      mechanism is. Pretending to agree would have been worse than
      arguing.

   3. It must not promise ticket sales as a standalone service. PJ was
      explicit on the call: "you kind of need the first two parts of the
      funnel in place before it's really possible to do the third."
      Slide 14 says exactly that, in those terms.

   4. It must not print the 900 monthly listeners. Jay raised the figure
      himself and it is the crux, but it is a number the artist would
      read, and the argument does not need it. The contrast is carried by
      the million YouTube views instead — which credits the win rather
      than the shortfall and makes the same point harder.

   Not pitched, because Jay already has it covered: radio (Your Army
   delivered around a thousand European spins on the first EP and paid
   royalties), visual content and creative direction (Key Factory's own
   discipline — Jay described the project as visual-first and it is
   literally what his company does), and general social rollout (there is
   a marketing person in-house). sweat.fm and Real Lab are not mentioned
   because they did not come up on the call.

   No artist photography. There is no licensed image of M07 in the
   library and press shots off the web are third-party copyright in a
   document that will be forwarded. The deck is typographic, and the
   proof comes from the case studies in cases.js.
   ------------------------------------------------------------------ */

import { img, spine, blobs } from './parts.js';
import { named } from './cases.js';

/* ------------------------------------------------------- local archetypes */

/* A phase slide. One per act of the cycle, in date order. Each has to say
   something different or it should not exist — here they are audience
   discovery, the film as the acquisition engine, and the booking case. */
const phase = ({ n, date, title, headline, body, points }) => ({
  section: 'The campaign',
  grain: 'soft',
  html: `
    <div class="pad l-mid">
      <div class="label reveal" style="margin-bottom:24px">Phase ${n} of 03</div>
      <div class="reveal" style="--d:.05s;font-family:var(--sans);font-weight:800;font-size:30px;letter-spacing:-0.02em;color:var(--blue);margin-bottom:14px">${date}</div>
      <h2 class="display reveal" style="--d:.1s;font-size:92px;line-height:1;color:var(--head);margin-bottom:30px">${title}</h2>
      <h3 class="display reveal" style="--d:.18s;font-size:42px;line-height:1.2;max-width:1280px;margin-bottom:26px">${headline}</h3>
      <p class="body reveal" style="--d:.24s;font-size:22px;max-width:1160px">${body}</p>

      <div class="rule reveal" style="--d:.32s;margin:48px 0 34px"></div>

      <ol class="steps reveal" style="--d:.38s;grid-template-columns:repeat(${points.length},1fr)">
        ${points.map((p, i) => `
          <li><span>${String(i + 1).padStart(2, '0')}</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">${p.t}</div>
            <p class="body" style="font-size:18px;max-width:none">${p.b}</p>
          </li>`).join('')}
      </ol>
    </div>`,
});

/* A section divider — the bracket motif. */
const act = ({ label, line, mod = '' }) => ({
  section: label,
  html: `
    <div class="field ${mod}"></div>
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

/* The fan flow, exactly as PJ described it on the call. The destination is
   a city-tagged list rather than a Discord — M07 does not have one and
   inventing a channel he does not run would be pitching air. The list is
   also the thing a booking agent can actually read, which is the point. */
const FAN_FLOW = [
  { n: 'Step 01', t: 'A new follower', b: 'Someone follows the account off the back of the film, a video or an ad. That is the whole trigger.' },
  { n: 'Step 02', t: 'An automatic DM', b: 'A message within seconds — hello, and an offer of something they cannot get anywhere else.' },
  { n: 'Step 03', t: 'First-party capture', b: 'A name and an email, given willingly. It belongs to M07, not to the platform that made the introduction.' },
  { n: 'Step 04', t: 'Something to listen to', b: 'A demo or an unreleased cut lands in their inbox. The list is used before it is ever asked for anything.' },
  { n: 'Step 05', t: 'A voice note back', b: 'From the artist, once they have listened. This is where a follower becomes someone who turns up.', human: true },
];

export const SLIDES = [
  /* 01 — cover. The artwork carries its own chrome, so the title sits on
     the deck's 96px gutter, bottom left, on ground that is already dark. */
  {
    section: 'Proposal',
    chrome: 'none',
    html: `
      <div style="position:absolute;inset:0;z-index:0">
        <img src="${img('cover.jpg')}" alt="" style="width:100%;height:100%;object-fit:cover">
      </div>
      <div class="reveal" style="--d:.5s;position:absolute;left:96px;bottom:172px;z-index:20">
        <div style="font-family:var(--mono);text-transform:uppercase;font-size:26px;letter-spacing:0.24em;color:#fff">
          M07 — the live cycle
        </div>
      </div>`,
  },

  /* 02 — the hook. Jay's sentence, near enough verbatim, but set under a
     label rather than inside quote marks: he said it in the middle of a
     longer thought and attributing tightened words to him would be putting
     something in his mouth. The label does the attributing. */
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
        <div class="label reveal" style="margin-bottom:44px">The question this proposal answers</div>
        <h1 class="display reveal" style="--d:.1s;font-size:152px;line-height:0.94;color:#fff;max-width:1620px">
          Is anybody going<br>to go to the show?
        </h1>
        <p class="body reveal" style="--d:.26s;font-size:27px;max-width:1000px;margin-top:60px">
          You put it better than we would have. Everything in this document is
          built to make that question answerable by February, and the answer yes
          by the time the 2027 dates are being booked.
        </p>
      </div>`,
  },

  /* 03 — the map. Deliberately generous: everything named is an asset and
     stays. The gap is the space between them, not any one of them. */
  {
    section: 'The gap',
    grain: 'soft',
    html: `
      ${spine('', 750)}
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">What is already in place</div>
        <h2 class="display reveal" style="--d:.08s;font-size:76px;line-height:1.04;max-width:1400px;margin-bottom:44px">
          This cycle is already<br>unusually well built.
        </h2>

        <ol class="steps reveal" style="--d:.2s;grid-template-columns:repeat(3,1fr);max-width:1500px;row-gap:44px">
          <li><span>The world</span>
            <p class="body" style="font-size:19px;max-width:none">A visual-first project with a finished aesthetic, and the Kissing You video past a million views on YouTube.</p></li>
          <li><span>The film</span>
            <p class="body" style="font-size:19px;max-width:none">A live performance film shot in Hanoi, in the visual language the project already owns.</p></li>
          <li><span>The premiere</span>
            <p class="body" style="font-size:19px;max-width:none">A national cinema in central Amsterdam during ADE — a room largely made of the people who book shows.</p></li>
          <li><span>Radio</span>
            <p class="body" style="font-size:19px;max-width:none">Your Army delivered around a thousand spins across Europe on the first EP, and royalties that actually paid.</p></li>
          <li><span>Paid media</span>
            <p class="body" style="font-size:19px;max-width:none">Run in-house across the first cycle, by someone who already knows the accounts and the history.</p></li>
          <li><span>The record</span>
            <p class="body" style="font-size:19px;max-width:none">A second EP written for the stage rather than the playlist — rawer, more analog, more hardware.</p></li>
        </ol>

        <div class="rule reveal" style="--d:.4s;margin:52px 0 32px"></div>
        <p class="body reveal" style="--d:.46s;font-size:24px;max-width:1400px">
          Six real assets. What none of them produces on its own is a list of people you can invite.
        </p>
      </div>`,
  },

  act({ label: 'The gap', line: 'You cannot invite a monthly listener' }),

  /* 05 — the offer. PJ's three products in his own order, with reporting
     as the fourth because Jay is six hours out and will not be chasing. */
  {
    section: 'The plan',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">What we would run</div>
        <h2 class="display reveal" style="--d:.08s;font-size:72px;line-height:1.06;max-width:1420px;margin-bottom:20px">
          Find them, keep them,<br>then sell them a ticket.
        </h2>
        <p class="body reveal" style="--d:.16s;font-size:23px;max-width:1260px;margin-bottom:48px">
          Three things in a fixed order, because the third one does not work without
          the first two. You keep the creative, the film and the radio. We take the
          machinery underneath them.
        </p>

        <ol class="steps reveal" style="--d:.26s;grid-template-columns:repeat(4,1fr)">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Paid media</div>
            <p class="body" style="font-size:18px;max-width:none">Conversion testing on every section of every track, scaled country by country on the cuts and territories that genuinely respond.</p></li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Fan flows</div>
            <p class="body" style="font-size:18px;max-width:none">Every new follower turned into a name, an email and a city. First-party data that stays yours when the campaign stops.</p></li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Live demand</div>
            <p class="body" style="font-size:18px;max-width:none">The audience read as a map — where the people are, how many, how warm — and then converted when there are dates to convert them to.</p></li>
          <li><span>04</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Weekly reporting</div>
            <p class="body" style="font-size:18px;max-width:none">One written page every week. You are several time zones away for a good part of this and should never have to ask.</p></li>
        </ol>
      </div>`,
  },

  /* 06 — the disagreement, stated openly. This is the slide that decides
     whether the deck reads as bespoke. Jay called the listener count a
     vanity metric; PJ said on the call that Spotify moving is what makes
     live bookings easier. Both are right about different halves of it, and
     saying so is worth more than agreeing with the client. */
  {
    section: 'The plan',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Where we half agree</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1500px;margin-bottom:26px">
          Streaming is a bad target<br>and a good instrument.
        </h2>
        <p class="body reveal" style="--d:.16s;font-size:23px;max-width:1360px;margin-bottom:46px">
          You called the monthly listener count a vanity metric. As a goal for this
          cycle, we think you are right, and we are not going to ask you to buy one.
          But it is still the cheapest, fastest and most measurable way to put an
          unfamiliar record in front of a stranger — and that is the only part of it
          we are actually interested in.
        </p>

        <ol class="steps reveal" style="--d:.26s;grid-template-columns:repeat(3,1fr);max-width:1620px">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">The number is not the deliverable</div>
            <p class="body" style="font-size:18px;max-width:none">No monthly-listener target in this proposal. If one is useful for a distributor conversation we will set it, but it is not what we would be measured on.</p></li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">The mechanism is</div>
            <p class="body" style="font-size:18px;max-width:none">Paid media is how you reach people who have never heard of this project, at a cost per person you can see. Nothing else at this stage does that reliably.</p></li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">The deliverable is a list</div>
            <p class="body" style="font-size:18px;max-width:none">Names, emails and cities. Your question was how sticky those listeners are — a list is the only version of an audience where that question has an answer.</p></li>
        </ol>
      </div>`,
  },

  act({ label: 'The campaign', line: 'September to February', mod: 'field--dark' }),

  /* 08 — the calendar. The useful part is the tight date, and here it is
     October rather than the release: the film premieres in the first six
     weeks and it is the single biggest acquisition moment of the cycle.
     If capture is not live before it, the audience it creates is gone. */
  {
    section: 'The campaign',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">The shape of it</div>
        <h2 class="display reveal" style="--d:.08s;font-size:72px;line-height:1.06;max-width:1400px;margin-bottom:46px">
          Six months,<br>one destination.
        </h2>

        <ol class="flow reveal" style="--d:.18s;grid-template-columns:repeat(5,1fr);max-width:1728px">
          ${[
            { n: 'September', t: 'The cycle opens', b: 'Testing begins on the new material. We find out who this record is for.' },
            { n: 'October', t: 'ADE and the film', b: 'The premiere becomes the campaign. Every route out of it captures.' },
            { n: 'Nov — Dec', t: 'Scale what worked', b: 'Spend weighted onto the cuts, sounds and countries that responded.' },
            { n: 'January', t: 'Warm the list', b: 'The audience built since September hears from the artist before the press does.' },
            { n: 'February', t: 'The EP, and the map', b: 'The record lands, and the booking case goes to whoever pitches the 2027 dates.', human: true },
          ].map((s, i) => `
            <li class="flow__node${i === 4 ? ' flow__node--human' : ''}">
              <div class="flow__n">${s.n}</div>
              <div class="flow__t">${s.t}</div>
              <p class="flow__b">${s.b}</p>
            </li>`).join('')}
        </ol>

        <div class="rule reveal" style="--d:.42s;margin:56px 0 32px"></div>
        <p class="body reveal" style="--d:.48s;font-size:23px;max-width:1440px">
          <strong style="color:var(--blue)">The tight date is October, not February.</strong>
          The premiere is the largest single moment of attention in the whole cycle and it
          falls in week six. The capture flows have to be live and tested before it, which
          means building them in September — not around the release.
        </p>
      </div>`,
  },

  phase({
    n: '01',
    date: 'September',
    title: 'Find the audience',
    headline: 'The second EP is a different record. It probably wants different people.',
    body: `You described the first EP as the safer, more commercial one and this one as rawer,
      more analog, more hardware-driven. That is a real change, and the quiet assumption that
      the same audience follows across it is the one that costs a campaign its first two
      months. September is where we find out, on a budget small enough that being wrong is
      cheap rather than expensive.`,
    points: [
      { t: 'Test the record itself', b: 'Every section of every track against a control visual — intro, build, drop, breakdown — to find the eight seconds that actually stop someone.' },
      { t: 'Read the new audience', b: 'The live and hardware end of electronic run against the audience the first EP found, as competing hypotheses rather than an assumption.' },
      { t: 'Capture from day one', b: 'The flows live before the film premieres, so October arrives with somewhere for the attention to go.' },
    ],
  }),

  phase({
    n: '02',
    date: 'October',
    title: 'The film is the campaign',
    headline: 'A premiere is a moment of attention. Most of them leave nothing behind.',
    body: `The Hanoi film and the ADE screening are the strongest assets in this cycle and they
      are already made. The work is not producing them, it is making sure every person who sees
      a frame of it — in the cinema, in a trailer, in an ad — has somewhere to go that ends with
      us knowing their name and their city. This is a month of distribution, not production.`,
    points: [
      { t: 'Cut the film for paid', b: 'Trailer edits tested the same way the music is, so the film buys attention outside the room as well as inside it.' },
      { t: 'Weight it to the cities', b: 'Spend concentrated on the markets where 2027 dates are plausible, rather than wherever conversions happen to be cheapest that week.' },
      { t: 'Everything captures', b: 'Screening, trailer, socials and ads all route to the same flow. One premiere, one list, no leakage.' },
    ],
  }),

  phase({
    n: '03',
    date: 'February',
    title: 'The EP, and the case',
    headline: 'A booking agent does not want a stream count. They want a map.',
    body: `By release the useful output is not how many people listened, it is who and where.
      Five months of capture becomes a document that says: this many contactable people, in these
      cities, at this level of engagement, who have heard from the artist directly and opened it.
      That is a thing a promoter can price. A monthly listener figure is not.`,
    points: [
      { t: 'Release, properly supported', b: 'The EP gets the full campaign — but weighted with everything learned since September rather than started from scratch.' },
      { t: 'Hand over the map', b: 'Audience by city, depth by city, and the list itself. Yours, in a format an agent or promoter can act on.' },
      { t: 'Ready for the dates', b: 'When shows are confirmed, the ticketing campaign runs against a warm audience instead of a cold one, which is a far cheaper exercise than starting from nothing.' },
    ],
  }),

  /* 12 — the method. The one slide where Sweat talks about itself, so the
     proof sits beside it. Cristoph is chosen deliberately: a dance record
     starting from a cold audience is the closest thing in the book to
     M07's actual position. */
  {
    section: 'Paid media',
    grain: 'soft',
    html: `
      ${/* the gutter between the columns, not the middle of the left one */ ''}
      ${spine('', 45)}
      <div class="pad" style="display:grid;grid-template-columns:1.05fr 0.95fr;align-items:center;gap:90px;height:100%">
        <div>
          <div class="label reveal" style="margin-bottom:26px">How the paid media works</div>
          <h2 class="display reveal" style="--d:.08s;font-size:64px;line-height:1.06;margin-bottom:28px">
            We test the song,<br>not just the ad.
          </h2>
          <p class="body reveal" style="--d:.16s;font-size:21px;max-width:640px;margin-bottom:30px">
            Every section of the record runs against a control visual until one of them
            outperforms the rest, and then the creative is built to that sound. As spend
            scales we read Spotify for Artists alongside the ad platform and go country by
            country, because the cheapest conversion and the most valuable one are rarely
            in the same place.
          </p>
          <ol class="steps reveal" style="--d:.26s;grid-template-columns:repeat(2,1fr);max-width:660px">
            <li><span>01</span><p class="body" style="font-size:18px;max-width:none">Test every part of the song</p></li>
            <li><span>02</span><p class="body" style="font-size:18px;max-width:none">Build the creative to the winner</p></li>
            <li><span>03</span><p class="body" style="font-size:18px;max-width:none">Scale country by country</p></li>
            <li><span>04</span><p class="body" style="font-size:18px;max-width:none">Report it back weekly</p></li>
          </ol>
        </div>

        <div class="reveal" style="--d:.3s">
          <div class="label" style="font-size:18px;margin-bottom:28px">A dance record from a cold start</div>
          <h3 class="display" style="font-size:54px;line-height:1.04;margin-bottom:34px">Cristoph<br>— Spacer</h3>
          <dl class="stats" style="gap:70px;margin-bottom:34px">
            <div><dt>Streams</dt><dd>243K</dd></div>
            <div><dt>Cost per result</dt><dd>12p</dd></div>
          </dl>
          <dl class="stats" style="gap:70px">
            <div><dt>Spend</dt><dd>£3K</dd></div>
            <div><dt>To 18K a day in</dt><dd>3 wks</dd></div>
          </dl>
          <p class="body" style="font-size:19px;max-width:620px;margin-top:36px;opacity:.8">
            Zero on release day to roughly eighteen thousand streams a day three weeks
            later, reaching 140,514 listeners with fifteen thousand playlist adds. The
            useful part is the budget it took to find out what worked.
          </p>
        </div>
      </div>`,
  },

  /* 13 — the fan flow. The centre of this proposal, and the part nobody
     else pitches. The Kissing You line does the work of the 900-listener
     figure without printing it: it credits the win and states the gap. */
  {
    section: 'First-party data',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">The audience you keep</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1500px;margin-bottom:26px">
          A million people watched<br>Kissing You. We cannot name one.
        </h2>
        <p class="body reveal" style="--d:.16s;font-size:22px;max-width:1400px;margin-bottom:52px">
          That is not a criticism of the campaign — it is how the platforms are built. Views
          and listeners are rented, and the rental ends when the spend does. The $25,000 that
          went through Meta on the first cycle bought reach it was never asked to keep. This
          time we ask it to.
        </p>

        <ol class="flow reveal" style="--d:.26s;grid-template-columns:repeat(5,1fr)">
          ${FAN_FLOW.map((s) => `
            <li class="flow__node${s.human ? ' flow__node--human' : ''}">
              <div class="flow__n">${s.n}</div>
              <div class="flow__t">${s.t}</div>
              <p class="flow__b">${s.b}</p>
            </li>`).join('')}
        </ol>
      </div>`,
  },

  /* 14 — tickets, with the caveat PJ gave on the call stated as plainly as
     he gave it. Selling this as a standalone service would be the easiest
     thing in the deck to promise and the fastest to come apart. */
  {
    section: 'Live',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">From listeners to ticket buyers</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1440px;margin-bottom:26px">
          We are good at selling tickets.<br>Just not as the first thing.
        </h2>
        <p class="body reveal" style="--d:.16s;font-size:23px;max-width:1360px;margin-bottom:46px">
          Ticketing is the part of this we would be judged on in 2027, and it is also the part
          that fails when it is run on its own. A ticket campaign against a cold audience is
          just an expensive advert. Against five months of captured, warmed, city-tagged
          people it is a different exercise entirely — which is why the order in this proposal
          is not negotiable.
        </p>

        <ol class="steps reveal" style="--d:.26s;grid-template-columns:repeat(3,1fr);max-width:1620px">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Retarget, do not prospect</div>
            <p class="body" style="font-size:18px;max-width:none">The people most likely to buy are the ones already listening. Ticket spend goes to them first, at a fraction of the cost of finding someone new.</p></li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">The list goes first</div>
            <p class="body" style="font-size:18px;max-width:none">On-sale is announced to the captured audience before it is advertised to anyone. Early sales are what make a promoter comfortable.</p></li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Attribution that holds</div>
            <p class="body" style="font-size:18px;max-width:none">Every sale traced to the campaign that caused it, so the second run of dates is priced on evidence rather than on hope.</p></li>
        </ol>
      </div>`,
  },

  /* 15 — the proof for the slide above. Numbers supplied by PJ; there is
     no chart for this one, which is why it is a stats case rather than a
     screenshot. Figures are in sterling, as they were run. */
  named.admt,

  act({ label: 'How we work', line: 'One page, every week' }),

  /* 17 — the team. PJ on top as the accountable name, then the three
     named roles. Deliberately not "your single point of contact" — he may
     put someone else on the day-to-day and that is not a promise to make
     in writing. Titles are the ones PJ confirmed, not inferred. */
  {
    section: 'How we work',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Who does what</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1400px;margin-bottom:44px">
          One team, and one<br>person accountable.
        </h2>

        <div class="reveal" style="--d:.16s;max-width:1400px">
          <div style="display:flex;align-items:baseline;gap:26px;margin-bottom:14px">
            <div style="font-family:var(--sans);font-weight:800;font-size:44px;letter-spacing:-0.04em">Peter Jarrett</div>
            <div style="font-family:var(--mono);text-transform:uppercase;font-size:19px;letter-spacing:0.16em;color:var(--blue)">Accountable</div>
          </div>
          <p class="body" style="font-size:21px;max-width:1180px">
            Sits above the campaign and answers for it as a whole — the plan, the spend and
            anything that slips. In the room for the decisions that matter.
          </p>
        </div>

        <div class="rule reveal" style="--d:.26s;margin:44px 0 40px"></div>

        <ol class="steps reveal" style="--d:.32s;grid-template-columns:repeat(3,1fr)">
          <li><span>Senior Marketing Director</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">Tobias Steinborn</div>
            <p class="body" style="font-size:19px;max-width:none">Holds the six months as one calendar and runs the weekly. Works alongside your marketing person rather than over the top of them.</p></li>
          <li><span>Campaign Strategist</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">Oskar</div>
            <p class="body" style="font-size:19px;max-width:none">Plans each phase — what is tested, against whom, and what the result changes about the next one. Owns the capture flows end to end.</p></li>
          <li><span>Paid media</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">Holly</div>
            <p class="body" style="font-size:19px;max-width:none">Daily hands on the accounts. Builds the tests and the cuts, kills what is not working and scales what is, across all six months.</p></li>
        </ol>
      </div>`,
  },

  /* 18 — reporting. Genuinely bespoke: Jay is in Vietnam for another
     month and lives in Spain, so a fixed written rhythm is worth more to
     him than a standing call he has to take at midnight. */
  {
    section: 'How we work',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Reporting</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1400px;margin-bottom:26px">
          Every Monday,<br>without being asked.
        </h2>
        <p class="body reveal" style="--d:.16s;font-size:22px;max-width:1340px;margin-bottom:46px">
          Written, so it works across whatever time zone you are in that month, and a call
          whenever you want one rather than on a standing slot you have to take at two in the
          morning. You should never chase us for a number and never learn about a problem on
          the day it lands.
        </p>

        <ol class="steps reveal" style="--d:.26s;grid-template-columns:repeat(4,1fr)">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">What ran</div>
            <p class="body" style="font-size:18px;max-width:none">Spend, cost per result, the cuts and countries working and the ones we have switched off.</p></li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">What the list did</div>
            <p class="body" style="font-size:18px;max-width:none">Captures, opens, replies and where they are — the number this campaign is actually judged on.</p></li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">What the record did</div>
            <p class="body" style="font-size:18px;max-width:none">Streams, saves and the algorithmic picture, read against the spend rather than beside it.</p></li>
          <li><span>04</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">What is next</div>
            <p class="body" style="font-size:18px;max-width:none">The week ahead, and anything needing a decision from you with the date it is needed by.</p></li>
        </ol>
      </div>`,
  },

  /* 19 — what we need. Naming the client's side of the work is what makes
     the first fortnight fast. The fourth item is the genuinely bespoke
     one: the territory ambition changes where every pound of spend goes,
     and nobody has asked him for it yet. */
  {
    section: 'How we work',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">From your side</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1400px;margin-bottom:44px">
          Four things and<br>we can start.
        </h2>

        <ol class="steps reveal" style="--d:.2s;grid-template-columns:repeat(2,1fr);max-width:1500px;row-gap:44px">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">Access</div>
            <p class="body" style="font-size:19px;max-width:none">The Meta business assets and ad account you already ran, Spotify for Artists, and the Instagram account the flows attach to.</p></li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">The film, and the right to cut it</div>
            <p class="body" style="font-size:19px;max-width:none">Footage and stems in a form we can edit from, plus whatever the director's agreement allows us to run as advertising. This is the October plan, so it is the first thing to check.</p></li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">The release dates</div>
            <p class="body" style="font-size:19px;max-width:none">Singles, the EP, and the ADE screening date. Testing has to be finished before the premiere, not started around it.</p></li>
          <li><span>04</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">Where you want to be bookable</div>
            <p class="body" style="font-size:19px;max-width:none">The cities that would make 2027 a success. Every spending decision from September changes depending on the answer, so it is worth deciding early rather than at the end.</p></li>
        </ol>
      </div>`,
  },

  /* 20 — the fee. What sits on top is stated plainly, because a client who
     finds out about a cost later remembers that longer than the number. */
  {
    section: 'Engagement',
    html: `
      <div class="field field--dark"></div>
      ${blobs([
        { k: 'a', pos: 'right:-300px;top:-260px;opacity:.6' },
        { k: 'b', pos: 'left:-200px;bottom:-380px;opacity:.5' },
      ])}
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:34px">The engagement</div>
        <h2 class="display reveal" style="--d:.08s;font-size:76px;line-height:1.04;margin-bottom:52px">
          Six months,<br>September to February.
        </h2>

        <div class="reveal" style="--d:.2s;display:grid;grid-template-columns:1fr 1fr;gap:80px;max-width:1500px">
          <div>
            <div class="tier">The fee</div>
            <div class="display" style="font-size:96px;line-height:1;margin-bottom:20px">$5,000<span style="font-size:38px;font-weight:500"> pcm</span></div>
            <p class="body" style="font-size:21px;max-width:600px">
              Invoiced monthly from the start date. $30,000 across the term, covering the whole
              cycle from the first test in September through to the EP and the handover.
            </p>
          </div>
          <div>
            <div class="tier">On top, at cost</div>
            <div class="display" style="font-size:96px;line-height:1;margin-bottom:20px">Ad spend</div>
            <p class="body" style="font-size:21px;max-width:600px">
              Media is yours and set by you, paid to the platforms directly. Third-party software
              the flows need — Manychat and similar — is the only other cost, at a few hundred a
              month. <strong style="color:#fff">We never mark up either.</strong>
            </p>
          </div>
        </div>

        <div class="rule reveal" style="--d:.36s;margin:56px 0 30px"></div>
        <p class="body reveal" style="--d:.42s;font-size:21px;max-width:1440px">
          For context on the media: the first cycle ran roughly $25,000 through Meta. We are not
          asking for more than that, and the September phase is deliberately cheap — the point of
          it is to be wrong inexpensively before anything is scaled.
        </p>
      </div>`,
  },

  /* 21 — close. The date is real: the follow-up call is Wednesday 19 August
     and the cycle opens next month, which is the whole reason for urgency. */
  {
    section: 'Next',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:82px;line-height:1.08;margin-bottom:24px">
          The cycle opens<br>next month.
        </h2>
        <p class="body reveal" style="--d:.12s;font-size:23px;max-width:1340px;margin-bottom:48px">
          On Wednesday the useful things to settle are the ADE date, what we are allowed to cut
          from the film, and which cities 2027 is aimed at. Those three answers set the whole of
          September.
        </p>
        <ol class="steps reveal" style="--d:.2s;max-width:1620px">
          <li><span>01</span>Wednesday's call — scope, dates and territories.</li>
          <li><span>02</span>Access granted, film assets reviewed.</li>
          <li><span>03</span>Capture flows built and tested in September.</li>
          <li><span>04</span>Live and proven before the premiere.</li>
        </ol>
        <div class="rule reveal" style="--d:.36s;margin:56px 0 36px"></div>
        <p class="reveal" style="--d:.44s;font-size:30px;font-weight:700">
          <a href="mailto:pj@sweatstrategies.com" style="color:var(--blue)">pj@sweatstrategies.com</a>
        </p>
      </div>`,
  },
];
