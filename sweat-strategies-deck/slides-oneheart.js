/* ------------------------------------------------------------------
   Øneheart — naturecore
   Bespoke proposal for Marc Sheinman, 7980 Music / Red Light Management.

   Sources: the 11 Aug strategy call (transcript + summary in Lightfield,
   mtg_cmsogmses00odoho70kr05ekv) and Marc's brief email of the same day.
   Everything specific in here — the singles and their dates, the partner
   list, the Tokyo and Paris videos, the Discord, the visa position, the
   Boiler Room / Elevator Series ambition — is theirs, not invented.

   THE ARGUMENT IS MARC'S OWN. He described what Platoon gave him: "they
   have Dream Team sort of in the middle of everything… so they were able
   to sit in the middle of everything and then we can be managers". And
   what he wants now: "almost being a central cog to it all". The deck
   sells exactly that and nothing else — we are the middle.

   THREE THINGS THIS DECK MUST NOT DO.

   1. It must not criticise Broke. Marc was candid on the call about being
      frustrated with them, but he also said every budget has to be "signed
      off by broke" — so this document can and probably will be read by
      them. The gap is therefore framed as a positive: streaming is covered,
      and the part nobody owns is the world-building around it. Nothing in
      here needs Broke to be doing a bad job for the argument to hold.

   2. It must not mention Real Lab. PJ explicitly ruled it out on the call:
      "I wasn't even thinking of real lab for you because it's very much in
      beta mode at the moment."

   3. It must not promise touring or a Boiler Room booking. Øneheart is
      Russian on a Schengen visa — Marc: "it's really hard to tour as a
      Russian artist" — and that is unresolved. The positioning slide says
      what we can actually do, which is build the evidence that gets those
      bookings and hand it to the people who pitch.

   Also not pitched, because Marc said they are covered: DSP pitching (Red
   Light internally, plus Broke), artwork and creative direction (done,
   with a dedicated creative director), and full social rollout — "I think
   we can sort of handle that as long as we sort of maybe get a bit of
   advice".

   No artist photography. There is no licensed image of Øneheart in the
   library, and press photography off the web is third-party copyright in a
   document going to a label. The deck is typographic throughout.
   ------------------------------------------------------------------ */

import { img, spine, blobs } from './parts.js';

/* ------------------------------------------------------- local archetypes */

/* A release slide. One per single, in date order. The date is set in the
   head grey above the title so flipping through reads as a calendar. */
const release = ({ n, date, title, feat = '', headline, body, points }) => ({
  section: 'The campaign',
  grain: 'soft',
  html: `
    <div class="pad l-mid">
      <div class="label reveal" style="margin-bottom:24px">Release ${n} of 03</div>
      <div class="reveal" style="--d:.05s;font-family:var(--sans);font-weight:800;font-size:30px;letter-spacing:-0.02em;color:var(--blue);margin-bottom:14px">${date}</div>
      <h2 class="display reveal" style="--d:.1s;font-size:92px;line-height:1;color:var(--head);margin-bottom:${feat ? 10 : 30}px">${title}</h2>
      ${feat ? `<div class="reveal" style="--d:.14s;font-family:var(--sans);font-weight:500;font-size:30px;letter-spacing:-0.02em;color:var(--head);opacity:.7;margin-bottom:30px">${feat}</div>` : ''}
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

/* A section divider — the bracket motif PJ likes on title slides. */
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

/* The fan flow — five nodes on one rule. Discord is the destination rather
   than an afterthought, because Øneheart's is already active and busy. */
const FAN_FLOW = [
  { n: 'Step 01', t: 'A new follower', b: 'Someone follows the account off the back of a video or an ad. That is the whole trigger.' },
  { n: 'Step 02', t: 'An automatic DM', b: 'A message within seconds — hello, and an offer of something they cannot get anywhere else.' },
  { n: 'Step 03', t: 'First-party capture', b: 'They leave an email. It belongs to Øneheart, not to the platform that introduced them.' },
  { n: 'Step 04', t: 'The drop', b: 'Laylo handles the release-day push to that list, so the audience is owned rather than rented.' },
  { n: 'Step 05', t: 'Into the Discord', b: 'The most engaged land where Jess already runs an active community — the deepest tier of the world.', human: true },
];

export const SLIDES = [
  /* 01 — cover. Miguel's original artwork with its chrome baked in, so the
     project title is set off the artwork rather than the deck's --pad. */
  {
    section: 'Proposal',
    chrome: 'none',
    html: `
      <div style="position:absolute;inset:0;z-index:0">
        <img src="${img('cover.jpg')}" alt="" style="width:100%;height:100%;object-fit:cover">
      </div>
      <div class="reveal" style="--d:.5s;position:absolute;right:45px;top:700px;z-index:20;text-align:right">
        <div style="font-family:var(--mono);text-transform:uppercase;font-size:30px;letter-spacing:0.22em;color:#fff;text-shadow:0 2px 24px rgba(0,0,0,0.55)">
          Øneheart — naturecore
        </div>
        <div style="font-family:var(--mono);text-transform:uppercase;font-size:17px;letter-spacing:0.2em;color:#fff;opacity:.72;margin-top:16px;text-shadow:0 2px 24px rgba(0,0,0,0.55)">
          Prepared for Marc Sheinman · 7980 Music
        </div>
      </div>`,
  },

  /* 02 — the hook, in Marc's own words. Quoting the brief back is the fastest
     way to show the call was heard; once is enough, so this is the only
     verbatim quote in the deck. */
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
        <div class="label reveal" style="margin-bottom:44px">Øneheart · naturecore · September – January</div>
        <h1 class="display reveal" style="--d:.1s;font-size:130px;line-height:0.98;color:#fff;max-width:1560px">
          “Almost being a central<br>cog to it all.”
        </h1>
        <p class="body reveal" style="--d:.26s;font-size:27px;max-width:980px;margin-top:52px">
          Your words on the call. There is a good team around this record already —
          what there isn't is one person whose job is the whole of it.
          That is the job we are proposing to take.
        </p>
      </div>`,
  },

  /* 03 — the map. Deliberately flattering: every partner named is staying.
     The gap is the white space between them, not any one of them. */
  {
    section: 'The role',
    grain: 'soft',
    html: `
      ${/* clear of the third column, which ends at 1596 */ ''}
      ${spine('', 750)}
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">What is already in place</div>
        <h2 class="display reveal" style="--d:.08s;font-size:76px;line-height:1.04;max-width:1400px;margin-bottom:44px">
          This campaign is<br>already well staffed.
        </h2>

        <ol class="steps reveal" style="--d:.2s;grid-template-columns:repeat(3,1fr);max-width:1500px;row-gap:44px">
          <li><span>Creative</span>
            <p class="body" style="font-size:19px;max-width:none">A dedicated creative director. Artwork, formats and direction finished. Videos already shot in Tokyo and Paris.</p></li>
          <li><span>PR</span>
            <p class="body" style="font-size:19px;max-width:none">Lucid, already delivering — you described the recent coverage as strong positioning.</p></li>
          <li><span>UGC</span>
            <p class="body" style="font-size:19px;max-width:none">We Generate and Something Something running creator and burner activity.</p></li>
          <li><span>Community</span>
            <p class="body" style="font-size:19px;max-width:none">An active Discord, managed by Jess at q3p — one of the few genuinely busy artist communities in this space.</p></li>
          <li><span>Streaming</span>
            <p class="body" style="font-size:19px;max-width:none">DSP pitching covered twice over: Red Light internally, and Broke on the distribution side.</p></li>
          <li><span>Rollout</span>
            <p class="body" style="font-size:19px;max-width:none">Social handled in-house, with a second opinion when you want one — which is how you said you wanted it.</p></li>
        </ol>

        <div class="rule reveal" style="--d:.4s;margin:52px 0 32px"></div>
        <p class="body reveal" style="--d:.46s;font-size:24px;max-width:1300px">
          Six specialists, all good at their part. Nobody whose job is the space between them.
        </p>
      </div>`,
  },

  act({ label: 'The role', line: 'We are the middle' }),

  /* 05 — the offer, stated plainly. Four things, and the fourth is the one
     nobody else will touch. */
  {
    section: 'The role',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">The orchestrator</div>
        <h2 class="display reveal" style="--d:.08s;font-size:72px;line-height:1.06;max-width:1420px;margin-bottom:20px">
          One plan, one calendar,<br>one person to chase.
        </h2>
        <p class="body reveal" style="--d:.16s;font-size:23px;max-width:1240px;margin-bottom:48px">
          We sit above the partners rather than beside them. Everyone keeps doing what
          they are good at; we hold the plan they all work to, and we own the parts
          that currently have no owner.
        </p>

        <ol class="steps reveal" style="--d:.26s;grid-template-columns:repeat(4,1fr)">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Project management</div>
            <p class="body" style="font-size:18px;max-width:none">One calendar across Lucid, We Generate, Jess, the creative director and Broke. Deadlines set, assets chased, dependencies flagged before they bite.</p></li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Paid media</div>
            <p class="body" style="font-size:18px;max-width:none">We run it. Conversion testing per record, scaled on the cuts and territories that actually respond.</p></li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">First-party data</div>
            <p class="body" style="font-size:18px;max-width:none">Capture flows into Laylo and the Discord, so the audience this era builds is owned rather than rented.</p></li>
          <li><span>04</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Physical</div>
            <p class="body" style="font-size:18px;max-width:none">Vinyl and CD organised end to end — spec, quotes, plant, test pressings, delivery dates that hold.</p></li>
        </ol>

        <div class="rule reveal" style="--d:.44s;margin:50px 0 30px"></div>
        <p class="body reveal" style="--d:.5s;font-size:22px;max-width:1300px">
          And a written report every week, so you can see all of it from one page.
        </p>
      </div>`,
  },

  act({ label: 'The campaign', line: 'September to Christmas', mod: 'field--dark' }),

  /* 07 — the calendar. The physical deadline is the useful part: it is the
     one date on this slide that is already tight, and saying so is more
     valuable than another promise. */
  {
    section: 'The campaign',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">The shape of it</div>
        <h2 class="display reveal" style="--d:.08s;font-size:72px;line-height:1.06;max-width:1400px;margin-bottom:46px">
          Three releases,<br>one era.
        </h2>

        <ol class="flow reveal" style="--d:.18s;grid-template-columns:repeat(5,1fr);max-width:1728px">
          ${[
            { n: 'September 4', t: 'internet is not safe', b: 'The era opens. A new sound, so a new audience read.' },
            { n: 'October 2', t: 'don’tneedtoknow', b: 'With Baobei. Two audiences to test into, not one.' },
            { n: 'November 20', t: 'digitalEscape + album', b: 'Focus single into naturecore. Physical lands here.' },
            { n: 'December', t: 'The album campaign', b: 'Scaling what worked, into the Christmas window.' },
            { n: 'January', t: 'Handover', b: 'Everything documented, the audience owned and warm.' },
          ].map((s, i) => `
            <li class="flow__node${i === 4 ? ' flow__node--human' : ''}">
              <div class="flow__n">${s.n}</div>
              <div class="flow__t">${s.t}</div>
              <p class="flow__b">${s.b}</p>
            </li>`).join('')}
        </ol>

        <div class="rule reveal" style="--d:.42s;margin:56px 0 32px"></div>
        <p class="body reveal" style="--d:.48s;font-size:23px;max-width:1400px">
          <strong style="color:var(--blue)">One date is already tight.</strong>
          Vinyl lead times run 12–16 weeks and it is August. If physical is to land with
          the album on 20 November, the specification and the order need signing off in
          the first fortnight of this engagement — which is the first thing we would do.
        </p>
      </div>`,
  },

  release({
    n: '01',
    date: 'September 4',
    title: 'internet is not safe',
    headline: 'A new sound needs a new audience read — not the old one carried over.',
    body: `Øneheart's existing audience arrived through ambient. naturecore moves into techno
      and hyper-pop, and the safe assumption — that the same listeners follow — is the one that
      quietly costs a campaign its first six weeks. This release is where we find out who the
      record is actually for, on a budget small enough that being wrong is cheap.`,
    points: [
      { t: 'Test the record itself', b: 'Intro, verse, bridge, chorus, second verse — every section against a control visual, to find the part of the song that stops the scroll.' },
      { t: 'Read the new audience', b: 'Interest and lookalike sets built from the electronic side rather than the ambient one, run against each other rather than assumed.' },
      { t: 'Capture from day one', b: 'The follow-to-DM flow live at release, so the audience this record finds is kept rather than rented for a week.' },
    ],
  }),

  release({
    n: '02',
    date: 'October 2',
    title: 'don’tneedtoknow',
    feat: 'featuring Baobei',
    headline: 'A feature is two audiences. Most campaigns only ever buy one of them.',
    body: `The collaboration is the mechanism here. Baobei's audience has never been asked to
      care about Øneheart and should be addressed on its own terms, with its own creative and its
      own read — not folded into one campaign and averaged. The video is already shot, which means
      the month is spent on distribution rather than production.`,
    points: [
      { t: 'Split the read', b: 'Baobei\'s audience and Øneheart\'s run as separate tests, so we learn which one the record actually travels through.' },
      { t: 'Cut for each', b: 'The winning sound from September, re-cut against the new video for both audiences rather than one master edit for everyone.' },
      { t: 'Compound September', b: 'Everyone captured on the first single is warm for this one — the second release is the first time the list earns its keep.' },
    ],
  }),

  release({
    n: '03',
    date: 'November 20',
    title: 'digitalEscape + naturecore',
    feat: 'featuring ledbyher · subject to clearance',
    headline: 'The album is where the three months are supposed to add up.',
    body: `Everything learned in September and October — the sound that works, the audience it
      works on, the territories that respond — is spent here rather than started here. Physical
      lands with the record, the positioning push runs alongside it, and the campaign carries
      through the Christmas window rather than stopping on release day.`,
    points: [
      { t: 'Scale, don\'t start', b: 'Budget weighted to the album because by 20 November we know what to weight it toward.' },
      { t: 'Physical on the date', b: 'Vinyl and CD in hand, D2C live, the drop pushed to the list and the Discord first.' },
      { t: 'Hold through December', b: 'Album campaigns die on release day by default. The spend keeps running into the strongest listening fortnight of the year.' },
      { t: 'Cover the clearance risk', b: 'If ledbyher does not clear, the slot needs a plan rather than a gap. We hold a version of the month that works either way.' },
    ],
  }),

  /* 11 — the method. This is the one slide where Sweat is talking about
     itself, so it carries the proof — and the proof is deliberately from
     inside Red Light, because that is the hardest evidence to argue with. */
  {
    section: 'Paid media',
    grain: 'soft',
    html: `
      ${/* the gutter between the two columns, not the middle of the left one */ ''}
      ${spine('', 45)}
      <div class="pad" style="display:grid;grid-template-columns:1.05fr 0.95fr;align-items:center;gap:90px;height:100%">
        <div>
          <div class="label reveal" style="margin-bottom:26px">How the paid media works</div>
          <h2 class="display reveal" style="--d:.08s;font-size:64px;line-height:1.06;margin-bottom:28px">
            We test the song,<br>not just the ad.
          </h2>
          <p class="body reveal" style="--d:.16s;font-size:21px;max-width:640px;margin-bottom:30px">
            Every section of the record is run against a control visual until one of them
            outperforms the rest. Then twenty-five cuts are built to that sound. As spend
            scales, our own tooling reads Spotify for Artists alongside the ad platform,
            so territories are chosen on where the record is genuinely resonating rather
            than on whichever market is briefly cheapest.
          </p>
          <ol class="steps reveal" style="--d:.26s;grid-template-columns:repeat(2,1fr);max-width:660px">
            <li><span>01</span><p class="body" style="font-size:18px;max-width:none">Test every part of the song</p></li>
            <li><span>02</span><p class="body" style="font-size:18px;max-width:none">25 cuts to the winner</p></li>
            <li><span>03</span><p class="body" style="font-size:18px;max-width:none">Scale on cultural resonance</p></li>
            <li><span>04</span><p class="body" style="font-size:18px;max-width:none">Report it back weekly</p></li>
          </ol>
        </div>

        <div class="reveal" style="--d:.3s">
          <div class="label" style="font-size:18px;margin-bottom:28px">Already running inside Red Light</div>
          <h3 class="display" style="font-size:54px;line-height:1.04;margin-bottom:34px">RuthAnne<br>— Complete Me</h3>
          <dl class="stats" style="gap:70px;margin-bottom:34px">
            <div><dt>Algorithmic streams</dt><dd>+941%</dd></div>
            <div><dt>Cost per listener</dt><dd>19p</dd></div>
          </dl>
          <dl class="stats" style="gap:70px">
            <div><dt>Monthly spend</dt><dd>£2K</dd></div>
            <div><dt>Month on month</dt><dd>+474%</dd></div>
          </dl>
          <p class="body" style="font-size:19px;max-width:620px;margin-top:36px;opacity:.8">
            2 June – 4 August, with Matt Johnson's team. The same method, at a
            fraction of this budget, on a record with none of naturecore's
            preparation behind it.
          </p>
        </div>
      </div>`,
  },

  /* 12 — positioning. Marc said this matters as much as streams, so it gets
     its own slide — and an honest one about what we can and cannot do. */
  {
    section: 'Positioning',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Beyond the streaming number</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1440px;margin-bottom:26px">
          Where he sits matters<br>as much as what he does.
        </h2>
        <p class="body reveal" style="--d:.16s;font-size:23px;max-width:1300px;margin-bottom:46px">
          You were clear that editorial, press and a stage like Boiler Room or the Elevator
          Series are worth as much to this era as the streams are. We are not going to claim
          we book those. What we can do is make them easier to say yes to, and make sure the
          people pitching have something current to pitch with.
        </p>

        <ol class="steps reveal" style="--d:.26s;grid-template-columns:repeat(3,1fr);max-width:1620px">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Evidence, kept current</div>
            <p class="body" style="font-size:18px;max-width:none">A live picture of momentum — audience, territories, engagement — that Lucid and Red Light can put in front of a booker or an editor in the week it matters, not a month later.</p></li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Credibility in the room</div>
            <p class="body" style="font-size:18px;max-width:none">Spend weighted toward the electronic audience that these platforms actually come from, so the numbers say the right thing about who is listening.</p></li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">A plan that survives the visa</div>
            <p class="body" style="font-size:18px;max-width:none">Touring is unresolved and may stay that way this year. Nothing in this campaign depends on a live date — if one lands, we turn spend onto it inside a week.</p></li>
        </ol>
      </div>`,
  },

  /* 13 — the CRM flow. The part nobody else is pitching, so it gets a slide
     rather than a bullet. Discord is the destination because his already
     works — that is a genuine asset most artists at this level do not have. */
  {
    section: 'First-party data',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">The audience you keep</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1440px;margin-bottom:26px">
          Five months of spend<br>should leave something behind.
        </h2>
        <p class="body reveal" style="--d:.16s;font-size:22px;max-width:1320px;margin-bottom:52px">
          A campaign that ends with a streaming number and nothing else has rented an audience.
          This one ends with a list, a Discord that grew, and a direct line to the people who
          came in through naturecore — which is what the next record starts from.
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

  /* 14 — physical. PJ was straight on the call that this is feasible but
     time-consuming and needs pricing separately, so the slide is straight
     about the timeline rather than optimistic about it. */
  {
    section: 'Physical',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Vinyl and CD</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1400px;margin-bottom:26px">
          The physical is a<br>deadline, not a decision.
        </h2>
        <p class="body reveal" style="--d:.16s;font-size:22px;max-width:1300px;margin-bottom:46px">
          Artwork and formats are already finished, which removes the slowest part.
          What remains is a manufacturing schedule that has to start now to land on
          20 November. We have run this many times and know the plants worth using.
        </p>

        <ol class="steps reveal" style="--d:.26s;grid-template-columns:repeat(4,1fr)">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Spec and quote</div>
            <p class="body" style="font-size:18px;max-width:none">Formats, weights, colourways, quantities. Three quotes, a recommendation, and a number you sign off once.</p></li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Plant and proofs</div>
            <p class="body" style="font-size:18px;max-width:none">Artwork delivered to the plant's template, test pressings checked and approved, nothing left to a courier's word.</p></li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Into the store</div>
            <p class="body" style="font-size:18px;max-width:none">D2C set up and stocked, pre-order live in good time, fulfilment arranged before the record lands rather than after.</p></li>
          <li><span>04</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Sold, not just made</div>
            <p class="body" style="font-size:18px;max-width:none">The drop goes to the list and the Discord first, with paid support behind it — the same discipline as the record.</p></li>
        </ol>

        <div class="rule reveal" style="--d:.44s;margin:48px 0 28px"></div>
        <p class="body reveal" style="--d:.5s;font-size:21px;max-width:1400px;opacity:.85">
          Manufacturing costs sit outside this fee and are yours at cost — we organise and
          carry the schedule, you own the stock.
        </p>
      </div>`,
  },

  act({ label: 'How we work', line: 'One page, every week' }),

  /* 16 — the team. PJ asked for the org shape explicitly: him on top, the
     four pillars underneath.

     NAMES NEED CONFIRMING. Tobias, Holly and Oskar are taken from the
     Sweat calendar and Lightfield; their exact remits here are inferred
     from which client calls they sit on, not stated by anyone. Check
     before this goes out. */
  {
    section: 'How we work',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Who does what</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1400px;margin-bottom:44px">
          One name accountable,<br>four people working.
        </h2>

        <div class="reveal" style="--d:.16s;max-width:1400px">
          <div style="display:flex;align-items:baseline;gap:26px;margin-bottom:14px">
            <div style="font-family:var(--sans);font-weight:800;font-size:44px;letter-spacing:-0.04em">Peter Jarrett</div>
            <div style="font-family:var(--mono);text-transform:uppercase;font-size:19px;letter-spacing:0.16em;color:var(--blue)">Orchestrator</div>
          </div>
          <p class="body" style="font-size:21px;max-width:1180px">
            Your single point of contact and the person accountable for the campaign as a whole.
            On the weekly, in the partner threads, and answerable for anything that slips.
          </p>
        </div>

        <div class="rule reveal" style="--d:.26s;margin:44px 0 40px"></div>

        <ol class="steps reveal" style="--d:.32s;grid-template-columns:repeat(4,1fr)">
          <li><span>Campaign management</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Tobias Steinborn</div>
            <p class="body" style="font-size:18px;max-width:none">Holds the calendar across Lucid, We Generate, Jess and the creative director. Runs the weekly and chases the assets.</p></li>
          <li><span>Paid media</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Oskar</div>
            <p class="body" style="font-size:18px;max-width:none">Builds and runs the tests, the cuts and the scaling — daily hands on the accounts across all three releases.</p></li>
          <li><span>CRM &amp; first-party</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Holly</div>
            <p class="body" style="font-size:18px;max-width:none">The capture flows, the Laylo drops and the handover into the Discord. Owns the list from first email to album release.</p></li>
          <li><span>Production</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Label management</div>
            <p class="body" style="font-size:18px;max-width:none">Manufacturing, plants, proofs and delivery dates — the physical schedule and the D2C store behind it.</p></li>
        </ol>
      </div>`,
  },

  /* 17 — the weekly. Marc's complaint about his distributor was that they are
     "not particularly forthcoming"; the answer to that is a fixed rhythm he
     never has to ask for, stated as a promise rather than as a contrast. */
  {
    section: 'How we work',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Reporting</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1400px;margin-bottom:26px">
          Every Monday,<br>without being asked.
        </h2>
        <p class="body reveal" style="--d:.16s;font-size:22px;max-width:1300px;margin-bottom:46px">
          A written report each week and a half-hour call whenever you want one. You should
          never have to chase us for a number, and you should never learn about a problem
          on the day it lands.
        </p>

        <ol class="steps reveal" style="--d:.26s;grid-template-columns:repeat(4,1fr)">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">What ran</div>
            <p class="body" style="font-size:18px;max-width:none">Spend, cost per result, the cuts and territories working and the ones we have turned off.</p></li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">What the record did</div>
            <p class="body" style="font-size:18px;max-width:none">Streams, saves and the algorithmic picture, read against the spend rather than beside it.</p></li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Where the partners are</div>
            <p class="body" style="font-size:18px;max-width:none">PR, UGC, Discord, physical — one line each, on track or not, with the blocker named.</p></li>
          <li><span>04</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">What is next</div>
            <p class="body" style="font-size:18px;max-width:none">The week ahead and anything that needs a decision from you, with the date it is needed by.</p></li>
        </ol>
      </div>`,
  },

  /* 18 — what we need. A proposal that only lists what the agency will do
     hides the client's side of the work; naming it now is what makes the
     first fortnight fast. */
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
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">The media budget confirmed</div>
            <p class="body" style="font-size:19px;max-width:none">You mentioned the spend sits with Broke. We need the figure and the sign-off route, because the September test has to be live before the 4th.</p></li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">Access</div>
            <p class="body" style="font-size:19px;max-width:none">Ad accounts, Spotify for Artists, Meta business assets, and the audio and video for all three releases.</p></li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">An introduction to each partner</div>
            <p class="body" style="font-size:19px;max-width:none">Lucid, We Generate and Jess. One thread each, so the first weekly has everyone already in the room.</p></li>
          <li><span>04</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">A decision on physical</div>
            <p class="body" style="font-size:19px;max-width:none">Yes or no inside the first fortnight. After that, 20 November stops being achievable and the conversation changes.</p></li>
        </ol>
      </div>`,
  },

  /* 19 — the fee. Two genuinely different totals rather than two ways of
     paying the same one, so the up-front option is worth something. */
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
          Five months,<br>two ways to do it.
        </h2>

        <div class="reveal" style="--d:.2s;display:grid;grid-template-columns:1fr 1fr;gap:80px;max-width:1500px">
          <div>
            <div class="tier">Monthly</div>
            <div class="display" style="font-size:96px;line-height:1;margin-bottom:20px">£5,000<span style="font-size:38px;font-weight:500"> pcm</span></div>
            <p class="body" style="font-size:21px;max-width:600px">
              Five payments across the term. £25,000 in total, invoiced monthly from the start date.
            </p>
          </div>
          <div>
            <div class="tier">Two payments</div>
            <div class="display" style="font-size:96px;line-height:1;margin-bottom:20px">£20,000</div>
            <p class="body" style="font-size:21px;max-width:600px">
              £10,000 on day one and £10,000 on day 75. The same five months of work for
              <strong style="color:#fff">£5,000 less</strong> — committing up front is worth something to us, so it is worth something to you.
            </p>
          </div>
        </div>

        <div class="rule reveal" style="--d:.36s;margin:56px 0 30px"></div>
        <p class="body reveal" style="--d:.42s;font-size:21px;max-width:1400px">
          Fee only. Media spend and manufacturing are separate and at cost — we never mark up
          either. September to January, covering all three releases and the album.
        </p>
      </div>`,
  },

  /* 20 — close */
  {
    section: 'Next',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:82px;line-height:1.08;margin-bottom:24px">
          The first single is<br>three weeks out.
        </h2>
        <p class="body reveal" style="--d:.12s;font-size:23px;max-width:1300px;margin-bottom:48px">
          If this is the right shape, the useful next step is a short call to confirm the
          budget route and the physical decision — both of those set the first fortnight.
        </p>
        <ol class="steps reveal" style="--d:.2s;max-width:1620px">
          <li><span>01</span>A call this week to confirm scope and budget.</li>
          <li><span>02</span>Access granted, partners introduced.</li>
          <li><span>03</span>Physical specced and ordered.</li>
          <li><span>04</span>September tests live before the 4th.</li>
        </ol>
        <div class="rule reveal" style="--d:.36s;margin:56px 0 36px"></div>
        <p class="reveal" style="--d:.44s;font-size:30px;font-weight:700">
          <a href="mailto:pj@sweatstrategies.com" style="color:var(--blue)">pj@sweatstrategies.com</a>
        </p>
      </div>`,
  },
];
