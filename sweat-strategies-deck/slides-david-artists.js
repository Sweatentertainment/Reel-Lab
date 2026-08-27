/* ------------------------------------------------------------------
   DAVID — the artist and agent deck

   NOT THE SEED DECK. slides-david.js and slides-david-pitch.js argue
   that DAVID is worth investing in. This one argues that DAVID is worth
   touring with, to the two people who decide that: the artist and their
   booking agent. Josh carries it into meetings.

   Same engine, same palette, same treatments — and almost none of the
   same content, because almost none of the investor argument is a
   selling point. Out: the five-year model, the market sizing, the raise
   and its use of funds, the EBITDA margins, the three-phase roadmap, and
   the operating ratio. "Ten people run 4,129 shows" reassures an
   investor and worries an artist, who hears it as "nobody will pick up
   the phone".

   WHAT REPLACES IT IS THE MONEY AND THE ROOM. An artist wants two
   answers: will it sell, and what do I take home. Those are slides 05
   and 07 and everything else is support. The take-home comparison was
   the investor deck's strongest slide and it is even stronger here,
   because here the reader is the person who keeps the difference.

   THE AGENT IS AN ALLY, NEVER A TARGET. Josh is an ex-agent pitching
   agents. Every criticism in this deck lands on the promoter and the
   incumbent ticketer; the deal slide says out loud that the agent keeps
   the client and keeps the commission, because that is the first
   question in an agent's head and leaving it unanswered loses the room.

   "YOU" IS THE ARTIST THROUGHOUT. An agent reading on a client's behalf
   still reads it naturally; the reverse — writing to the agent about
   "the artist" — reads coldly to an artist and is the more common
   audience. One line on slide 06 addresses agents directly.

   FIGURES ARE THE SAME FIGURES. Nothing is inflated for a sales room:
   91/92% sell-through, under £3 a ticket, 58.4% take-home on the Hoxton
   Hall example, 7% of gross, 13% to the fan, 38.6% market average from
   MVT 2024. Where a number is an example rather than a promise it says
   so on the slide.

   NO PHOTOGRAPHY. The Sweat artist library is licensed to Sweat and
   these are not DAVID's acts. Typographic throughout, like the seed
   deck.

   JOSH'S DIRECT CONTACT IS NOT IN HERE because I do not have it. The
   close carries his name and david.tickets; add the email and phone
   before this goes to anyone.
   ------------------------------------------------------------------ */

import { blobs } from './parts.js';

/* ------------------------------------------------------- local archetypes */

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
      <h2 class="display reveal" style="--d:.1s;font-size:110px;line-height:0.98;max-width:1620px">
        <span class="bracket bracket--light">${line}</span>
      </h2>
    </div>`,
});

const bar = ({ label, value, pct, hero = false }) => `
  <div style="margin-bottom:26px">
    <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:10px">
      <span style="font-family:var(--sans);font-weight:${hero ? 800 : 600};font-size:23px;letter-spacing:-0.02em;color:${hero ? '#fff' : 'var(--head)'}">${label}</span>
      <span style="font-family:var(--sans);font-weight:800;font-size:26px;letter-spacing:-0.03em;font-variant-numeric:tabular-nums;color:${hero ? 'var(--blue)' : 'var(--head)'}">${value}</span>
    </div>
    <div style="height:14px;background:#ffffff14;border-radius:0 7px 7px 0">
      <div style="height:100%;width:${pct}%;background:${hero ? 'var(--blue)' : '#7a7a7a'};border-radius:0 7px 7px 0"></div>
    </div>
  </div>`;

const gauge = ({ pct, title, note, meta }) => `
  <div>
    <div class="label" style="font-size:18px;margin-bottom:22px">${title}</div>
    <div style="display:flex;align-items:baseline;gap:18px;margin-bottom:18px">
      <span class="display" style="font-size:118px;line-height:1;color:var(--blue)">${pct}%</span>
      <span style="font-family:var(--sans);font-weight:600;font-size:24px;color:var(--head)">sell-through</span>
    </div>
    <div style="height:14px;background:#ffffff14;border-radius:0 7px 7px 0;margin-bottom:20px;max-width:640px">
      <div style="height:100%;width:${pct}%;background:var(--blue);border-radius:0 7px 7px 0"></div>
    </div>
    <p class="body" style="font-size:20px;max-width:640px;margin-bottom:10px">${note}</p>
    <div style="font-family:var(--mono);text-transform:uppercase;font-size:14px;letter-spacing:0.1em;color:var(--head)">${meta}</div>
  </div>`;

export const SLIDES = [
  /* 01 — cover. The promise in one line, and it is a promise about the
     room rather than about the company. */
  {
    section: 'Cover',
    chrome: 'none',
    html: `
      <div class="field field--dark"></div>
      ${blobs([
        { k: 'a', pos: 'left:-280px;top:-300px;opacity:.55' },
        { k: 'c', pos: 'right:-160px;bottom:-340px;opacity:.6' },
      ])}
      <div class="pad l-mid">
        <h1 class="display reveal" style="font-size:230px;line-height:0.86;color:#fff;margin-bottom:44px">DAVID.</h1>
        <p class="display reveal" style="--d:.12s;font-size:46px;line-height:1.2;font-weight:600;letter-spacing:-0.035em;max-width:1440px;color:#fff">
          The promoter, the ticketing and the marketing — and we only make money when your show sells.
        </p>
        <div class="reveal" style="--d:.24s;margin-top:56px;font-family:var(--sans);font-weight:700;font-size:26px;letter-spacing:-0.03em;color:#fff">
          Josh Ergatoudis · Tour Partnerships
        </div>
      </div>`,
  },

  /* 02 — the problem, told from their side of the table. The seed deck's
     problem slide is about a broken industry; this one is about their
     last tour. Same four facts, all of them things that happened to the
     reader rather than to the sector. */
  {
    section: 'The problem',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Where the money goes</div>
        <h2 class="display reveal" style="--d:.08s;font-size:76px;line-height:1.03;max-width:1500px;margin-bottom:20px">
          Half the room. All the fees.<br>None of the data.
        </h2>
        <p class="body reveal" style="--d:.14s;font-size:24px;max-width:1440px;margin-bottom:50px">
          The people who promote and ticket your shows get paid whether or not the seats sell.
        </p>

        <ol class="steps reveal" style="--d:.24s;grid-template-columns:repeat(4,1fr)">
          <li><span>Your fans are charged</span>
            <div class="display" style="font-size:62px;line-height:1;color:var(--blue);margin-bottom:16px">25%+</div>
            <p class="body" style="font-size:18px;max-width:none">Booking fees on top of face value, then dynamic pricing on top of that. Your name is on the ticket.</p></li>
          <li><span>Your settlement is padded</span>
            <div class="display" style="font-size:62px;line-height:1;color:var(--blue);margin-bottom:16px">Towels.</div>
            <p class="body" style="font-size:18px;max-width:none">Riders, reps and line items you never asked for, marked up and unremovable.</p></li>
          <li><span>Your fans aren't yours</span>
            <div class="display" style="font-size:62px;line-height:1;color:var(--blue);margin-bottom:16px">Not yours.</div>
            <p class="body" style="font-size:18px;max-width:none">You built the audience. The promoter keeps the list, and you rent it back every tour.</p></li>
          <li><span>Your marketing is a decade old</span>
            <div class="display" style="font-size:62px;line-height:1;color:var(--blue);margin-bottom:16px">2015</div>
            <p class="body" style="font-size:18px;max-width:none">A budget fixed before you went on sale, spent on targeting built years ago, measured by nobody.</p></li>
        </ol>

        <div class="rule reveal" style="--d:.44s;margin:48px 0 28px"></div>
        <div class="reveal" style="--d:.5s;display:grid;grid-template-columns:0.95fr 1.05fr;gap:90px;align-items:center;max-width:1728px">
          <p class="body" style="font-size:25px;max-width:none">
            And then the show goes up half empty.
            <strong style="color:var(--blue)">Nobody loses money on that except you.</strong>
          </p>
          <div style="display:flex;align-items:baseline;gap:24px">
            <span class="display" style="font-size:82px;line-height:1;color:var(--blue);white-space:nowrap">38.6%</span>
            <span class="body" style="font-size:19px;max-width:420px">
              average sell-through at UK grassroots shows
              <span style="opacity:.8">— Music Venue Trust, 2024</span>
            </span>
          </div>
        </div>
      </div>`,
  },

  /* 03 — the proof. First thing after the problem, because an artist has
     heard the pitch before and the only thing that separates it from the
     last one is a room that actually sold. */
  {
    section: 'The proof',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">The proof</div>
        <h2 class="display reveal" style="--d:.08s;font-size:72px;line-height:1.04;max-width:1500px;margin-bottom:52px">
          When tours stop selling,<br>their teams already call us.
        </h2>

        <div class="reveal" style="--d:.22s;display:grid;grid-template-columns:1fr 1fr;gap:110px;max-width:1620px;margin-bottom:44px">
          ${gauge({
            pct: 91,
            title: 'Rules · European tour 2026',
            note: 'Five weeks out. Sales flat.',
            meta: '4 of 5 shows sold out · £2.55 a ticket',
          })}
          ${gauge({
            pct: 92,
            title: 'ADMT · UK tour 2025',
            note: 'Ten cities across the UK.',
            meta: '3,522 tickets sold · £2.59 a ticket',
          })}
        </div>

        <div class="rule reveal" style="--d:.42s;margin:0 0 30px"></div>
        <p class="body reveal" style="--d:.48s;font-size:22px;max-width:1620px">
          <strong style="color:var(--blue)">Both were Live Nation and AEG tours that had stopped selling.</strong>
          The artists' teams brought us in. Tours sit at 4–27% sold when our campaigns switch on — those are
          the numbers after.
        </p>
      </div>`,
  },

  act({ label: 'The money', line: 'What you actually take home' }),

  /* 05 — the money slide, and the reason this deck exists. In the seed
     deck this argued that the unit economics work. Here the reader is
     the person who keeps the difference, so the per-show pound figure
     is set as the headline number rather than as a side column. */
  {
    section: 'The money',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Example settlement · Hoxton Hall, 350 cap</div>
        <h2 class="display reveal" style="--d:.08s;font-size:72px;line-height:1.04;max-width:1560px;margin-bottom:20px">
          You take home ~45% more.
        </h2>
        <p class="body reveal" style="--d:.14s;font-size:21px;max-width:1560px;margin-bottom:44px;color:var(--head)">
          Your share of gross potential, on the same show settled three ways.
        </p>

        <div class="reveal" style="--d:.24s;display:grid;grid-template-columns:1fr 1fr 0.66fr;gap:90px;max-width:1728px">
          <div>
            <div class="label" style="font-size:17px;margin-bottom:26px">Sold out</div>
            ${bar({ label: 'With DAVID', value: '58.4%', pct: 58.44, hero: true })}
            ${bar({ label: 'Traditional promoter', value: '44.6%', pct: 44.56 })}
            ${bar({ label: 'Modern competitor', value: '40.4%', pct: 40.4 })}
          </div>
          <div>
            <div class="label" style="font-size:17px;margin-bottom:26px">80% sold</div>
            ${bar({ label: 'With DAVID', value: '35.2%', pct: 35.16, hero: true })}
            ${bar({ label: 'Traditional promoter', value: '24.4%', pct: 24.44 })}
            ${bar({ label: 'Modern competitor', value: '17.3%', pct: 17.26 })}
          </div>
          <div>
            <div class="label" style="font-size:17px;margin-bottom:26px">Yours, per sold-out show</div>
            <div class="display" style="font-size:76px;line-height:1;color:var(--blue);margin-bottom:20px">£2,922</div>
            <div style="font-family:var(--sans);font-weight:600;font-size:20px;color:var(--head);margin-bottom:8px;font-variant-numeric:tabular-nums">Traditional promoter &nbsp;£2,228</div>
            <div style="font-family:var(--sans);font-weight:600;font-size:20px;color:var(--head);font-variant-numeric:tabular-nums">Modern competitor &nbsp;£2,020</div>
          </div>
        </div>

        <div class="rule reveal" style="--d:.44s;margin:38px 0 26px"></div>
        <p class="body reveal" style="--d:.5s;font-size:21px;max-width:1728px">
          Worked on a real room at a real capacity. Your rooms and your deal will differ — the shape does not.
        </p>
      </div>`,
  },

  /* 06 — the deal. The flow is the seed deck's, because it is already
     written for the artist rather than for the investor. What is new is
     the last line, which answers the question in an agent's head before
     they ask it. */
  {
    section: 'The deal',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">The deal</div>
        <h2 class="display reveal" style="--d:.08s;font-size:72px;line-height:1.04;max-width:1500px;margin-bottom:52px">
          Our only cut of your<br>revenue is 7% of gross.
        </h2>

        <ol class="flow reveal" style="--d:.2s;grid-template-columns:repeat(4,1fr);max-width:1728px">
          ${[
            { n: 'Step 01', t: 'Your fan pays face +13%', b: 'The fee sits on top of the ticket — against 25%+ elsewhere — and it funds the marketing that fills the room.' },
            { n: 'Step 02', t: 'Costs come off at actuals', b: 'Receipted, zero markup. Optional lines are your call. No towels.' },
            { n: 'Step 03', t: 'We take 7% of gross', b: 'That is it. No profit split, no back end, no hidden spend.' },
            { n: 'Step 04', t: 'The rest is yours', b: 'Weekly payouts from real sales, and an itemised settlement within seven days.', human: true },
          ].map((s) => `
            <li class="flow__node${s.human ? ' flow__node--human' : ''}">
              <div class="flow__n">${s.n}</div>
              <div class="flow__t">${s.t}</div>
              <p class="flow__b">${s.b}</p>
            </li>`).join('')}
        </ol>

        <div class="rule reveal" style="--d:.42s;margin:52px 0 28px"></div>
        <div class="reveal" style="--d:.48s;display:grid;grid-template-columns:1fr 1fr;gap:90px;max-width:1728px">
          <p class="body" style="font-size:21px;max-width:none;color:var(--head)">
            The old deal: pad the costs first, then take around 20% of whatever survives.
          </p>
          <p class="body" style="font-size:21px;max-width:none">
            <strong style="color:var(--blue)">If you're the agent, nothing changes for you.</strong>
            You keep the client and you keep your commission. We replace the promoter, not you.
          </p>
        </div>
      </div>`,
  },

  /* 07 — the spend. The second reason to sign. Deliberately paired with
     the room, because a promoter quoting a cheaper cost per ticket is
     the objection this slide exists to kill. */
  {
    section: 'The marketing',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.92fr 1.08fr;align-items:center;gap:80px;height:100%">
        <div>
          <div class="label reveal" style="margin-bottom:26px">The marketing</div>
          <h2 class="display reveal" style="--d:.08s;font-size:58px;line-height:1.1;margin-bottom:30px">
            We put three to six times<br>more behind your ticket.
          </h2>
          <p class="body reveal" style="--d:.14s;font-size:20px;max-width:640px;margin-bottom:26px">
            A promoter will tell you their marketing is cheaper per ticket. It is — because there is barely
            any of it, and it goes out against targeting built years ago.
          </p>
          <p class="body reveal" style="--d:.2s;font-size:20px;max-width:640px">
            We commit up to <strong style="color:var(--blue)">30% of the ticket price</strong> to selling the
            show, and we come in at under half of what we committed. The gap goes back to you.
          </p>
        </div>

        <div class="reveal" style="--d:.3s">
          <div class="label" style="font-size:17px;margin-bottom:34px">Allocated spend per ticket · on a £20 ticket</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:70px;max-width:900px">
            ${[
              { who: 'DAVID', hero: true, rows: [
                ['Committed', 'Up to £6.00', '30% of ticket price'],
                ['Delivered', 'Under £3.00', 'across the last three tours'],
                ['The room', '91–92%', 'sold'],
              ] },
              { who: 'Traditional promoters', hero: false, rows: [
                ['Committed', '£1–2', 'and spent blind'],
                ['Delivered', 'Not attributed', ''],
                ['The room', '38.6%', 'the UK average — MVT 2024'],
              ] },
            ].map((c) => `
              <div>
                <div class="label" style="font-size:16px;margin-bottom:26px;color:${c.hero ? 'var(--blue)' : 'var(--head)'}">${c.who}</div>
                ${c.rows.map(([k, v, sub], i) => `
                  <div style="margin-bottom:26px">
                    <div style="font-family:var(--mono);text-transform:uppercase;font-size:13px;letter-spacing:0.12em;color:var(--head);margin-bottom:8px">${k}</div>
                    <div style="font-family:var(--sans);font-weight:800;font-size:${i === 2 ? 46 : 32}px;letter-spacing:-0.04em;font-variant-numeric:tabular-nums;color:${i === 2 ? (c.hero ? 'var(--blue)' : '#7a7a7a') : (c.hero ? '#fff' : 'var(--head)')};margin-bottom:6px">${v}</div>
                    <div style="font-family:var(--sans);font-weight:500;font-size:17px;color:var(--head)">${sub || '&nbsp;'}</div>
                  </div>`).join('')}
              </div>`).join('')}
          </div>
        </div>
      </div>`,
  },

  /* 08 — how the selling actually works. Three mechanisms, no platform
     vocabulary. The routing line is the one that makes an agent lean
     forward, because routing is their job and this is the first version
     of it that has evidence underneath. */
  {
    section: 'How it sells',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">How it sells</div>
        <h2 class="display reveal" style="--d:.08s;font-size:72px;line-height:1.04;max-width:1560px;margin-bottom:52px">
          Your own audience data,<br>pointed at your own tour.
        </h2>

        <ol class="steps reveal" style="--d:.22s;grid-template-columns:repeat(3,1fr);max-width:1728px">
          <li><span>We route it</span>
            <p class="body" style="font-size:20px;max-width:none">We connect your streaming, your socials and everyone who has ever bought a ticket, and we route the tour to the cities that data points at — not to the rooms a promoter happens to hold.</p></li>
          <li><span>We sell it</span>
            <p class="body" style="font-size:20px;max-width:none">Creative, targeting and budget set city by city and driven to the cost of a ticket actually sold. One campaign across every market: a winning ad in Glasgow is live in Paris the next morning.</p></li>
          <li><span>It compounds</span>
            <p class="body" style="font-size:20px;max-width:none">Every buyer is yours and stays yours. This tour's audience is the reason next tour's tickets are the cheapest you have ever sold.</p></li>
        </ol>

        <div class="rule reveal" style="--d:.44s;margin:52px 0 28px"></div>
        <p class="body reveal" style="--d:.5s;font-size:22px;max-width:1680px">
          <strong style="color:var(--blue)">One point of contact for all of Europe.</strong>
          Venue contracting, advancing, withholding tax, settlement and marketing all sit behind the same person.
        </p>
      </div>`,
  },

  /* 09 — the data. Its own slide because it is the thing no incumbent
     will match: they cannot hand the list over without giving up the
     asset their next negotiation rests on. */
  {
    section: 'Your audience',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:110px;height:100%">
        <div>
          <div class="label reveal" style="margin-bottom:26px">Your audience</div>
          <h2 class="display reveal" style="--d:.08s;font-size:68px;line-height:1.06;margin-bottom:30px">
            You keep every fan<br>who buys a ticket.
          </h2>
          <p class="body reveal" style="--d:.16s;font-size:22px;max-width:700px;margin-bottom:26px">
            Name, email, city, what they bought and when. Yours, exportable, on every show — and it is not a
            favour, it is in the contract.
          </p>
          <p class="body reveal" style="--d:.22s;font-size:22px;max-width:700px">
            No incumbent will match this, and it is not because they have not thought of it. That list is the
            asset their next negotiation with you rests on.
          </p>
        </div>
        <div class="reveal" style="--d:.3s">
          <div class="display" style="font-size:150px;line-height:1;color:var(--blue);margin-bottom:22px">1,939</div>
          <div style="font-family:var(--sans);font-weight:700;font-size:28px;letter-spacing:-0.03em;margin-bottom:16px">fans captured and handed back</div>
          <p class="body" style="font-size:20px;max-width:620px">
            In fourteen weeks, across the tours running on the platform now. Every one of them belongs to the
            artist who earned them.
          </p>
        </div>
      </div>`,
  },

  act({ label: 'Right now', line: 'What is already running' }),

  /* 11 — traction, as credibility rather than as an investor metric.
     The five-figure strip from the seed deck, minus the money the
     platform has made and minus anything that reads as a forecast. What
     an artist wants from this slide is "other people are doing this and
     it is working", which is the last line. */
  {
    section: 'Right now',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Live today · verified 19 Aug 2026</div>
        <h2 class="display reveal" style="--d:.08s;font-size:76px;line-height:1.04;margin-bottom:56px">
          Already selling, every day.
        </h2>

        <ol class="steps reveal" style="--d:.2s;grid-template-columns:repeat(4,1fr);max-width:1728px;margin-bottom:52px">
          <li><span>On sale now</span>
            <div class="display" style="font-size:66px;line-height:1;color:var(--blue);margin-bottom:14px">43</div>
            <p class="body" style="font-size:19px;max-width:none">shows across Europe and the UK</p></li>
          <li><span>Sold by the machine</span>
            <div class="display" style="font-size:66px;line-height:1;color:var(--blue);margin-bottom:14px">~7,600</div>
            <p class="body" style="font-size:19px;max-width:none">tickets, and counting</p></li>
          <li><span>Sell-through</span>
            <div class="display" style="font-size:66px;line-height:1;color:var(--blue);margin-bottom:14px">92%</div>
            <p class="body" style="font-size:19px;max-width:none">across the last three tours</p></li>
          <li><span>Cost of a ticket sold</span>
            <div class="display" style="font-size:66px;line-height:1;color:var(--blue);margin-bottom:14px">£2.55</div>
            <p class="body" style="font-size:19px;max-width:none">on Rules, Europe 2026</p></li>
        </ol>

        <div class="rule reveal" style="--d:.42s;margin:0 0 28px"></div>
        <p class="body reveal" style="--d:.48s;font-size:23px;max-width:1680px">
          The platform has been live fourteen weeks. The team behind it has been selling tours out for years —
          which is why the tours already on it were brought to us by other people's artists.
        </p>
      </div>`,
  },

  /* 12 — who they actually deal with. Josh first and biggest: he is the
     person in the room, and in a sales meeting the relationship is the
     product. The other three are one line each. */
  {
    section: 'Who you deal with',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Who you deal with</div>
        <h2 class="display reveal" style="--d:.08s;font-size:72px;line-height:1.04;max-width:1560px;margin-bottom:44px">
          One agent. Not a call centre.
        </h2>

        <div class="reveal" style="--d:.2s;display:grid;grid-template-columns:1fr 1.25fr;gap:100px;max-width:1728px;align-items:start">
          <div>
            <div class="label" style="font-size:16px;margin-bottom:20px">Your contact</div>
            <div class="display" style="font-size:60px;line-height:1;color:var(--blue);margin-bottom:18px">Josh Ergatoudis</div>
            <p class="body" style="font-size:21px;max-width:640px">
              A career booking agent who founded his own agency before joining DAVID. He holds the tour end to
              end — routing, offers, advancing, settlement — and the platform sits behind him.
            </p>
          </div>
          <ol class="steps" style="grid-template-columns:1fr 1fr;row-gap:34px">
            ${[
              ['Co-CEO', 'PJ Jarrett', 'Built the platform end to end. Founder of Sweat Strategies and Reel:lab.'],
              ['Co-CEO', 'Tom Rose', 'CEO of Grape — artist services across the UK, Germany and Norway.'],
              ['Co-founder · CMO', 'Tobi Steinborn', 'Ran the campaigns behind Rules and ADMT.'],
              ['Behind them', 'The engine', 'Advancing, settlement, tax and campaign management, handled by the platform.'],
            ].map(([role, name, line]) => `
              <li><span>${role}</span>
                <div style="font-family:var(--sans);font-weight:800;font-size:25px;letter-spacing:-0.04em;color:#fff;margin-bottom:10px">${name}</div>
                <p class="body" style="font-size:18px;max-width:none">${line}</p></li>`).join('')}
          </ol>
        </div>
      </div>`,
  },

  /* 13 — the close. A sales deck ends on the smallest possible next
     step, and the smallest possible next step here is a routing sheet,
     not a signature. */
  {
    section: 'Next',
    html: `
      <div class="field field--dark"></div>
      ${blobs([
        { k: 'a', pos: 'right:-300px;top:-260px;opacity:.6' },
        { k: 'b', pos: 'left:-200px;bottom:-380px;opacity:.5' },
      ])}
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:30px">Next</div>
        <h2 class="display reveal" style="--d:.08s;font-size:110px;line-height:0.98;color:#fff;margin-bottom:22px">
          Send us the routing.
        </h2>
        <p class="body reveal" style="--d:.14s;font-size:24px;max-width:1500px;margin-bottom:48px">
          Dates you are holding, or dates you want. We will come back with the rooms the data points at, the
          spend we would commit and what the settlement looks like at both sold out and 80%.
        </p>

        <ol class="steps reveal" style="--d:.24s;grid-template-columns:repeat(3,1fr);max-width:1728px">
          <li><span>You send</span>
            <p class="body" style="font-size:19px;max-width:none">A routing, or a market you have never cracked and want to.</p></li>
          <li><span>We come back</span>
            <p class="body" style="font-size:19px;max-width:none">Rooms, spend and a modelled settlement. Within a week, no cost, no commitment.</p></li>
          <li><span>You decide</span>
            <p class="body" style="font-size:19px;max-width:none">If the numbers do not beat what is on the table, do not take it.</p></li>
        </ol>

        <div class="rule reveal" style="--d:.44s;margin:48px 0 30px"></div>
        <p class="display reveal" style="--d:.5s;font-size:34px;line-height:1.26;font-weight:700;letter-spacing:-0.035em;color:#fff;max-width:1620px">
          Josh Ergatoudis · Tour Partnerships
        </p>
        <p class="reveal" style="--d:.58s;font-size:24px;font-weight:700;margin-top:22px">
          <a href="https://david.tickets" style="color:#fff;opacity:.95">david.tickets</a>
        </p>
      </div>`,
  },
];
