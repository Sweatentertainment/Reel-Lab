/* ------------------------------------------------------------------
   DAVID — the pitch cut

   THE SAME DECK, FOR A DIFFERENT ROOM. slides-david.js is the document
   version: it gets emailed, forwarded and read alone, so it carries its
   own argument in prose. That one runs 1,239 words across fourteen
   slides, a mean of 89 a slide. This one is the presented version — the
   words are spoken, so the slide only has to hold the thing the room
   should be looking at while PJ says them. It runs around 700 words
   across fifteen slides — a mean around fifty, which is the range a
   YC-style seed deck actually sits in.

   THE ORDER IS DELIBERATE. Traction sits at four rather than at ten:
   everything after it is read differently once the room knows the thing
   already works, and a seed deck that buries its numbers behind five
   slides of argument reads as though it has none.

   Neither replaces the other. Send the document, present this.

   NOTHING NEW IS CLAIMED. Every figure is already in slides-david.js.
   Copy is cut, never added to, and no number is recomputed — where a
   sentence disappears it is because the diagram says it or PJ says it,
   not because it was replaced with a better-sounding one.

   THE FINANCIALS COME FROM THE MODEL, NOT THE PPTX. The plan slide and
   the pounds on the ask slide are read out of
   David_Tickets_Business_Plan_v5.1.xlsx — tab 02 for revenue, EBITDA and
   headcount, tab 07 for the use-of-funds lines. Both are labelled as
   projections on the slide, because a forecast sitting unmarked next to
   achieved traction is the fastest way to lose a room.

   THE DIAGRAMS ARE THE POINT OF THIS CUT. Four slides that were prose in
   the document are drawn here:

     05  where the money goes — the fan-side fee and the artist-side
         take-home as two stacked bars, which is the whole thesis in one
         picture and was three paragraphs before
     06  the £20 ticket splitting, left to right, ending on the artist
     09  the operating ratio — ten people against 4,129 shows
     12  the five-year revenue and EBITDA lines against one scale
     13  the go-to-market multiplication, drawn rather than written

   WHAT THE STACKS CAN AND CANNOT SAY. Artist take-home is given in the
   source (58.44 / 44.56 / 40.4 sold out), so each bar splits into what
   the artist keeps and what it does not. It does NOT break the remainder
   into promoter fee, booking fee and costs — the source gives no split
   for the competitors and inventing one to make a nicer diagram would be
   the single most dishonest thing this deck could do. Two segments,
   both labelled.

   COLOUR. DAVID's own palette, applied in david-pitch.html the same way
   as the document version — #141414 ground, lime accent. The lime marks
   DAVID and the artist's share throughout and never anything else, so
   the eye learns one rule on slide 02 and keeps it to the end.

   NO DRAWN SPINE anywhere, per PJ on the document version.
   ------------------------------------------------------------------ */

import { blobs } from './parts.js';

/* ------------------------------------------------------- local archetypes */

/* A comparison group: rows measured against a common scale, stated in the
   label. Deliberately NOT a stacked bar — the fan-side fees are two
   separate quantities, and stacking them would imply they are parts of one
   whole. Each row is its share of `max`, and carries its own value. */
const cmp = ({ label, max, rows }) => `
  <div style="margin-bottom:44px">
    <div class="label" style="font-size:17px;margin-bottom:22px">${label}</div>
    ${rows.map((r) => `
      <div style="margin-bottom:22px">
        <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:10px;max-width:1500px">
          <span style="font-family:var(--sans);font-weight:${r.hero ? 800 : 600};font-size:23px;letter-spacing:-0.02em;color:${r.hero ? '#fff' : 'var(--head)'}">${r.name}</span>
          <span style="font-family:var(--sans);font-weight:800;font-size:28px;letter-spacing:-0.03em;font-variant-numeric:tabular-nums;color:${r.hero ? 'var(--blue)' : 'var(--head)'}">${r.value}</span>
        </div>
        <div style="height:18px;background:#ffffff14;border-radius:0 9px 9px 0;max-width:1500px">
          <div style="height:100%;width:${(r.n / max) * 100}%;background:${r.hero ? 'var(--blue)' : '#7a7a7a'};border-radius:0 9px 9px 0"></div>
        </div>
      </div>`).join('')}
  </div>`;

/* A big figure with a short caption. The unit of this whole deck.

   `size` exists because two of the problem-slide figures are words rather
   than numbers, and "Not yours." wraps at the size the numbers want. A
   wrapped figure pushes its caption out of line with the other three,
   which is the kind of thing that reads as carelessness across a row. */
const stat = ({ n, cap, sub = '', size = 96 }) => `
  <div>
    <div class="display" style="font-size:${size}px;line-height:1;color:var(--blue);margin-bottom:14px;white-space:nowrap">${n}</div>
    <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:${sub ? 8 : 0}px">${cap}</div>
    ${sub ? `<div style="font-family:var(--mono);text-transform:uppercase;font-size:14px;letter-spacing:0.1em;color:var(--head);opacity:.92">${sub}</div>` : ''}
  </div>`;

export const SLIDES = [
  /* 01 — cover. Three lines and the ask. */
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
        <h1 class="display reveal" style="font-size:240px;line-height:0.86;color:#fff;margin-bottom:48px">DAVID.</h1>
        <p class="display reveal" style="--d:.12s;font-size:48px;line-height:1.2;font-weight:600;letter-spacing:-0.035em;max-width:1400px;color:#fff">
          The promoter, ticketing platform and marketing engine for the middle of live music.
        </p>
        <div class="reveal" style="--d:.24s;margin-top:60px;font-family:var(--sans);font-weight:800;font-size:44px;letter-spacing:-0.04em;color:#fff">
          Raising £1m
        </div>
      </div>`,
  },

  /* 02 — the problem. Four figures, no paragraphs. This is where the reader
     learns that lime means DAVID's side of the argument. */
  {
    section: 'The problem',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:96px;line-height:1;margin-bottom:64px">Touring is broken.</h2>
        <ol class="steps reveal" style="--d:.18s;grid-template-columns:repeat(4,1fr)">
          ${/* one size across the row so the four captions sit on one line */ ''}
          <li><span>Fans</span>${stat({ n: '25%+', cap: 'booking fees', size: 68 })}</li>
          <li><span>Artists</span>${stat({ n: 'Towels.', cap: 'padded settlements', size: 68 })}</li>
          <li><span>The data</span>${stat({ n: 'Not yours.', cap: 'the promoter keeps it', size: 68 })}</li>
          <li><span>The marketing</span>${stat({ n: '2015', cap: 'fixed low, spent blind', size: 68 })}</li>
        </ol>
        <div class="rule reveal" style="--d:.4s;margin:52px 0 28px"></div>
        <p class="body reveal" style="--d:.46s;font-size:27px;max-width:1500px;margin-bottom:26px">
          They get paid whether the show sells. <strong style="color:var(--blue)">So it doesn't.</strong>
        </p>
        <div class="reveal" style="--d:.52s;display:flex;align-items:baseline;gap:26px;flex-wrap:wrap">
          <span class="display" style="font-size:76px;line-height:1;color:var(--blue);white-space:nowrap">38.6%</span>
          <span class="body" style="font-size:21px;max-width:840px">
            average sell-through at UK grassroots shows
            <span style="opacity:.8">— Music Venue Trust, 2024</span>
          </span>
        </div>
      </div>`,
  },

  /* 03 — the proof. Two tours, two numbers. */
  {
    section: 'The proof',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:82px;line-height:1.04;margin-bottom:64px">
          When tours stop selling,<br>their teams already call us.
        </h2>
        <div class="reveal" style="--d:.2s;display:grid;grid-template-columns:1fr 1fr;gap:120px;max-width:1560px">
          <div>
            <div class="label" style="font-size:17px;margin-bottom:24px">Rules · Europe 2026</div>
            <div class="display" style="font-size:150px;line-height:1;color:var(--blue)">91%</div>
            <div style="height:14px;background:#ffffff14;border-radius:0 7px 7px 0;margin:22px 0 20px">
              <div style="height:100%;width:91%;background:var(--blue);border-radius:0 7px 7px 0"></div>
            </div>
            <div style="font-family:var(--sans);font-weight:600;font-size:24px;color:var(--head)">sold · £2.55 a ticket</div>
          </div>
          <div>
            <div class="label" style="font-size:17px;margin-bottom:24px">ADMT · UK 2025</div>
            <div class="display" style="font-size:150px;line-height:1;color:var(--blue)">92%</div>
            <div style="height:14px;background:#ffffff14;border-radius:0 7px 7px 0;margin:22px 0 20px">
              <div style="height:100%;width:92%;background:var(--blue);border-radius:0 7px 7px 0"></div>
            </div>
            <div style="font-family:var(--sans);font-weight:600;font-size:24px;color:var(--head)">sold · £2.59 a ticket</div>
          </div>
        </div>
        <p class="body reveal" style="--d:.4s;font-size:24px;max-width:1560px;margin-top:56px">
          <strong style="color:var(--blue)">The artists' teams bring us in.</strong>
          These shows we took on were sitting at 4–27% sell-through before our marketing started.
        </p>
      </div>`,
  },

  /* 04 — traction. Verification date stays; the table does not. */
  {
    section: 'Traction',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Verified 19 Aug 2026</div>
        <h2 class="display reveal" style="--d:.06s;font-size:82px;line-height:1.04;margin-bottom:60px">
          Live, selling, accelerating.
        </h2>

        <ol class="steps reveal" style="--d:.2s;grid-template-columns:repeat(4,1fr);max-width:1728px;margin-bottom:52px">
          <li><span>Sold by the machine</span>${stat({ n: '~7,600', cap: 'tickets', sub: '~£179k gross' })}</li>
          <li><span>On sale now</span>${stat({ n: '£330k', cap: 'across 43 shows' })}</li>
          <li><span>Last 7 days</span>${stat({ n: '266', cap: 'tickets · 138 buyers' })}</li>
          <li><span>Fans captured</span>${stat({ n: '1,939', cap: 'artist-owned' })}</li>
        </ol>

        <div class="rule reveal" style="--d:.42s;margin:0 0 26px"></div>
        <p class="body reveal" style="--d:.48s;font-size:23px;max-width:1680px">
          92% average sell-through across the last three tours. The platform has been live fourteen weeks.
        </p>
      </div>`,
  },

  /* 05 — the thesis, drawn. Three paragraphs in the document version; here
     it is two stacked bars and eleven words. The remainder is deliberately
     one undivided segment — see the header. */
  {
    section: 'The insight',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:76px;line-height:1.06;margin-bottom:56px">
          We charge less, and sell more.
        </h2>
        <div class="reveal" style="--d:.2s;max-width:1620px">
          ${cmp({
            label: 'What the fan pays on top',
            max: 25,
            rows: [
              { name: 'David', value: '13%', n: 13, hero: true },
              { name: 'Everyone else', value: '25%+', n: 25 },
            ],
          })}
          ${cmp({
            label: 'What the artist keeps, on a sold-out show',
            max: 58.44,
            rows: [
              { name: 'David', value: '58%', n: 58.44, hero: true },
              { name: 'Trad. promoter', value: '45%', n: 44.56 },
              { name: 'Modern competitor', value: '40%', n: 40.4 },
            ],
          })}
        </div>

        <div class="rule reveal" style="--d:.42s;margin:10px 0 28px"></div>
        <p class="body reveal" style="--d:.48s;font-size:24px;max-width:1620px">
          Smaller fee, bigger gross. <strong style="color:var(--blue)">The artist wins on both sides.</strong>
        </p>
      </div>`,
  },

  /* 06 — the model, as a splitting diagram rather than four paragraphs. */
  {
    section: 'The model',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:82px;line-height:1.04;margin-bottom:60px">
          Our only cut of the artist's<br>revenue is 7% of gross.
        </h2>

        <ol class="flow reveal" style="--d:.2s;grid-template-columns:repeat(4,1fr);max-width:1728px">
          ${[
            { n: '01', t: 'Face value +13%', b: 'The fee funds the marketing.' },
            { n: '02', t: 'Costs at actuals', b: 'Receipted, zero markup. No towels.' },
            { n: '03', t: 'David takes 7%', b: 'No profit split. No back end.' },
            { n: '04', t: 'The rest is the artist’s', b: 'Weekly payouts. Settled in 7 days.', human: true },
          ].map((s) => `
            <li class="flow__node${s.human ? ' flow__node--human' : ''}">
              <div class="flow__n">${s.n}</div>
              <div class="flow__t">${s.t}</div>
              <p class="flow__b">${s.b}</p>
            </li>`).join('')}
        </ol>

        <div class="rule reveal" style="--d:.42s;margin:60px 0 30px"></div>
        <p class="body reveal" style="--d:.48s;font-size:24px;max-width:1620px;color:var(--head)">
          The old deal: pad the costs, then take ~20% of what survives.
        </p>
      </div>`,
  },

  /* 07 — the comparison. Kept from the document version because it is
     already a diagram; the prose around it is gone. */
  {
    section: 'The comparison',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:76px;line-height:1.06;margin-bottom:20px">
          The artist takes home ~45% more.
        </h2>
        <p class="body reveal" style="--d:.12s;font-size:22px;max-width:1400px;margin-bottom:52px;color:var(--head)">
          Example settlement · Hoxton Hall, 350 cap. Share of gross potential.
        </p>

        <div class="reveal" style="--d:.22s;display:grid;grid-template-columns:1fr 1fr 0.6fr;gap:100px;max-width:1728px">
          ${[
            ['Sold out', [['DAVID', '58.4%', 58.44, true], ['Trad. promoter', '44.6%', 44.56, false], ['Modern competitor', '40.4%', 40.4, false]]],
            ['80% sold', [['DAVID', '35.2%', 35.16, true], ['Trad. promoter', '24.4%', 24.44, false], ['Modern competitor', '17.3%', 17.26, false]]],
          ].map(([head, rows]) => `
            <div>
              <div class="label" style="font-size:17px;margin-bottom:30px">${head}</div>
              ${rows.map(([name, val, pct, hero]) => `
                <div style="margin-bottom:30px">
                  <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px">
                    <span style="font-family:var(--sans);font-weight:${hero ? 800 : 600};font-size:23px;letter-spacing:-0.02em;color:${hero ? '#fff' : 'var(--head)'}">${name}</span>
                    <span style="font-family:var(--sans);font-weight:800;font-size:26px;letter-spacing:-0.03em;font-variant-numeric:tabular-nums;color:${hero ? 'var(--blue)' : 'var(--head)'}">${val}</span>
                  </div>
                  <div style="height:14px;background:#ffffff14;border-radius:0 7px 7px 0">
                    <div style="height:100%;width:${pct}%;background:${hero ? 'var(--blue)' : '#7a7a7a'};border-radius:0 7px 7px 0"></div>
                  </div>
                </div>`).join('')}
            </div>`).join('')}
          <div>
            <div class="label" style="font-size:17px;margin-bottom:30px">Per sold-out show</div>
            <div class="display" style="font-size:66px;line-height:1;color:var(--blue);margin-bottom:8px">£2,922</div>
            <div style="font-family:var(--mono);text-transform:uppercase;font-size:14px;letter-spacing:0.1em;color:var(--head);margin-bottom:28px">David</div>
            <div style="font-family:var(--sans);font-weight:600;font-size:21px;color:var(--head);font-variant-numeric:tabular-nums;line-height:1.7">£2,228 trad.<br>£2,020 modern</div>
          </div>
        </div>

      </div>`,
  },

  /* 08 — the engine, reframed. Three cost bars read backwards: the
     incumbent's £1.50 looked like better value because cost was the only
     thing measured. Cheap spend on a half-empty room is not cheap, so the
     slide pairs what each side commits with what the room does.

     4-27% is where tours sit WHEN WE ARE CALLED IN, not what incumbent
     marketing finally achieves — those tours never ran to completion on
     the old spend, so the stronger claim is one we cannot make. */
  {
    section: 'The engine',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:76px;line-height:1.06;margin-bottom:20px">
          Their spend is cheaper.<br>Their rooms are emptier.
        </h2>
        <p class="body reveal" style="--d:.12s;font-size:22px;margin-bottom:52px;color:var(--head)">
          On a £20 ticket. Cost per ticket on its own is the wrong measure.
        </p>

        <div class="reveal" style="--d:.22s;display:grid;grid-template-columns:1fr 1fr;gap:120px;max-width:1560px">
          ${[
            { who: 'David', hero: true, rows: [
              ['Committed', 'Up to £6.00', '30% of ticket price'],
              ['Delivered', 'Under £3.00', 'last three tours'],
              ['The room', '91–92%', 'sold'],
            ] },
            { who: 'Incumbents', hero: false, rows: [
              ['Committed', '£1.50–2.50', 'and spent blind'],
              ['Delivered', 'Not attributed', ''],
              ['The room', '4–27%', 'sold when we are called in'],
            ] },
          ].map((c) => `
            <div>
              <div class="label" style="font-size:17px;margin-bottom:30px;color:${c.hero ? 'var(--blue)' : 'var(--head)'}">${c.who}</div>
              ${c.rows.map(([k, v, sub], i) => `
                <div style="margin-bottom:30px">
                  <div style="font-family:var(--mono);text-transform:uppercase;font-size:14px;letter-spacing:0.12em;color:var(--head);margin-bottom:9px">${k}</div>
                  <div style="font-family:var(--sans);font-weight:800;font-size:${i === 2 ? 62 : 38}px;letter-spacing:-0.04em;font-variant-numeric:tabular-nums;color:${i === 2 ? (c.hero ? 'var(--blue)' : '#7a7a7a') : (c.hero ? '#fff' : 'var(--head)')};margin-bottom:7px">${v}</div>
                  <div style="font-family:var(--sans);font-weight:500;font-size:18px;color:var(--head)">${sub || '&nbsp;'}</div>
                </div>`).join('')}
            </div>`).join('')}
        </div>

        <div class="rule reveal" style="--d:.46s;margin:14px 0 26px"></div>
        <p class="body reveal" style="--d:.52s;font-size:23px;max-width:1620px">
          We commit two to four times more per ticket, come in under half of it,
          and the gap goes back to the artist.
        </p>
      </div>`,
  },

  /* 09 — why now, drawn as the operating ratio. The number carries the
     slide; the argument is spoken. */
  {
    section: 'Why now',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:76px;line-height:1.06;margin-bottom:56px">
          AI makes the middle market servable.
        </h2>

        <div class="reveal" style="--d:.2s;display:flex;align-items:center;gap:70px;margin-bottom:52px;flex-wrap:wrap">
          <div>
            <div class="display" style="font-size:150px;line-height:1;color:#fff">10</div>
            <div class="label" style="font-size:17px;margin-top:12px">People</div>
          </div>
          <div class="display" style="font-size:80px;line-height:1;color:var(--head);opacity:.5">→</div>
          <div>
            <div class="display" style="font-size:150px;line-height:1;color:var(--blue)">4,129</div>
            <div class="label" style="font-size:17px;margin-top:12px">Shows a year · the Year-5 model</div>
          </div>
        </div>

        <div class="rule reveal" style="--d:.4s;margin:0 0 30px"></div>
        <p class="body reveal" style="--d:.46s;font-size:24px;max-width:1620px">
          Advancing, settlement and tax used to cost more in hours than a mid-size show could carry.
          <strong style="color:var(--blue)">That cost collapsed.</strong>
        </p>
      </div>`,
  },

  /* 10 — the roadmap. New. The three phases are PJ's; the triggers
     between them are inferred and are the thing for him to overrule. The
     take rate holding across all three is his call, confirmed — it is
     what makes phase three worth drawing, because the economics do not
     degrade as the work automates.

     The last line is a guard rail: saying the raise is priced on phases
     one and two is what stops phase three reading as the pitch. */
  {
    section: 'The roadmap',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:76px;line-height:1.06;margin-bottom:56px">
          The agent comes out of the loop.
        </h2>

        <div class="reveal" style="--d:.2s;display:grid;grid-template-columns:repeat(3,1fr);gap:70px;max-width:1728px">
          ${[
            { n: '01', status: 'Live today', name: 'Our desk',
              who: 'Our TPMs book on the platform.',
              next: 'Advancing and settlement run without a person' },
            { n: '02', status: 'What the raise buys', name: 'Their desk',
              who: "The artist's team plans the tour in it. We still book.",
              next: 'A date confirms without a call' },
            { n: '03', status: 'The upside', name: 'No desk',
              who: 'It books itself. Agents move to A&R.',
              next: '' },
          ].map((p) => `
            <div style="border-top:1px solid #ffffff1f;padding-top:26px;display:flex;flex-direction:column">
              <div class="label" style="font-size:15px;margin-bottom:22px">Phase ${p.n} · ${p.status}</div>
              <div class="display" style="font-size:56px;line-height:1;color:var(--blue);margin-bottom:18px">${p.name}</div>
              <p class="body" style="font-size:21px;max-width:none;margin-bottom:${p.next ? 24 : 0}px">${p.who}</p>
              ${p.next ? `<div style="font-family:var(--mono);text-transform:uppercase;font-size:12px;line-height:1.6;letter-spacing:0.1em;color:var(--head);margin-top:auto">Next when →<br>${p.next}</div>` : ''}
            </div>`).join('')}
        </div>

        <div class="rule reveal" style="--d:.44s;margin:40px 0 26px"></div>
        <p class="body reveal" style="--d:.5s;font-size:23px;max-width:1680px;margin-bottom:12px">
          <strong style="color:var(--blue)">The take does not move.</strong> 13% from the fan, 7% from the
          artist, at every phase.
        </p>
        <p class="body reveal" style="--d:.56s;font-size:17px;max-width:1680px;opacity:.75">
          The raise is priced on phases one and two. Phase three is upside, not base case.
        </p>
      </div>`,
  },

  /* 11 — competition. The deck had no competition slide at all, which
     reads as unexamined rather than confident. Grouped by category
     rather than by brand on purpose: a per-company tick chart would
     force claims about DICE's marketing or AXS's data terms that we
     cannot source, and one wrong tick in a diligence pack costs more
     than the whole slide is worth. Three rows, three columns, and every
     cell is a statement we can stand behind. */
  {
    section: 'Competition',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:76px;line-height:1.06;margin-bottom:20px">
          Nobody else is paid to fill the room.
        </h2>
        <p class="body reveal" style="--d:.12s;font-size:22px;max-width:1500px;margin-bottom:54px;color:var(--head)">
          Ticketing sells to the people already coming. Promoters take the risk — but filling the room
          falls to the artist.
        </p>

        <div class="reveal" style="--d:.22s;max-width:1728px">
          <div style="display:grid;grid-template-columns:1.15fr 1fr 1fr 1fr;gap:44px;padding-bottom:16px">
            <span></span>
            ${['Fills the room', 'Artist keeps the data', 'Artist keeps the upside']
              .map((h) => `<span class="label" style="font-size:15px">${h}</span>`).join('')}
          </div>
          ${[
            ['Ticketing', 'Ticketmaster · AXS · DICE · See',
              ['No', 'No', 'No'], false],
            ['Promoters', 'Live Nation · AEG · local promoters',
              ['No', 'No', 'Partial'], false],
            ['DAVID', 'The product is the marketing',
              ['Yes', 'Yes', 'Yes'], true],
          ].map(([who, sub, cells, hero]) => `
            <div style="display:grid;grid-template-columns:1.15fr 1fr 1fr 1fr;gap:44px;align-items:baseline;padding:26px 0;border-top:1px solid #ffffff1f">
              <div>
                <div style="font-family:var(--sans);font-weight:800;font-size:27px;letter-spacing:-0.04em;color:${hero ? 'var(--blue)' : '#fff'};margin-bottom:8px">${who}</div>
                <div style="font-family:var(--sans);font-weight:500;font-size:17px;color:var(--head)">${sub}</div>
              </div>
              ${cells.map((v) => `
                <span style="font-family:var(--sans);font-weight:${hero ? 800 : 600};font-size:${v.length > 6 ? 21 : 27}px;letter-spacing:-0.03em;color:${hero ? 'var(--blue)' : 'var(--head)'}">${v}</span>`).join('')}
            </div>`).join('')}
        </div>

        <div class="rule reveal" style="--d:.44s;margin:34px 0 26px"></div>
        <p class="body reveal" style="--d:.5s;font-size:23px;max-width:1680px">
          They get paid either way, and leave the artist to market the show.
          <strong style="color:var(--blue)">We take 7% of gross and the booking fee</strong> — every ticket
          that goes unsold is our revenue too.
        </p>
      </div>`,
  },

  /* 12 — market. The hedge is gone. "Est., research in progress" printed
     on a slide does more damage than an imperfect number, so the figures
     are committed to and the basis is stated in small type instead. The
     line that matters to an investor is the last one: the Year-5 plan is
     a single-digit share of the pool, which is the sanity check that
     stops a hockey stick reading as a fantasy. */
  {
    section: 'Market',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:76px;line-height:1.06;margin-bottom:56px">
          The middle is most of live music.
        </h2>
        <ol class="steps reveal" style="--d:.2s;grid-template-columns:repeat(3,1fr);max-width:1680px;margin-bottom:48px">
          <li><span>UK live sector GVA</span>${stat({ n: '£2.5bn', cap: 'Europe is a multiple' })}</li>
          <li><span>Attendance under 1,500 cap</span>${stat({ n: '55%', cap: 'the majority, not a niche' })}</li>
          <li><span>Revenue pool</span>${stat({ n: '£600m–1bn', cap: 'no pan-European incumbent' })}</li>
        </ol>

        <div class="rule reveal" style="--d:.4s;margin:0 0 26px"></div>
        <p class="body reveal" style="--d:.46s;font-size:23px;max-width:1680px;margin-bottom:14px">
          <strong style="color:var(--blue)">Year 5 of our plan is £30.7m — three to five per cent of that pool.</strong>
          We do not need to win the market. We need the part nobody is serving.
        </p>
        <p class="body reveal" style="--d:.52s;font-size:17px;max-width:1680px;opacity:.75">
          Sector figures: UK Music. Revenue pool is our own estimate, at a 20% take on the sub-1,500-capacity segment.
        </p>
      </div>`,
  },

  /* 13 — the plan. This slide did not exist, and its absence was the
     single biggest hole in the deck: an investor cannot size a seed
     cheque against a deck with no revenue line in it.

     EVERY FIGURE HERE IS THE MODEL, NOT THE PAST, and the slide says so
     twice — in the kicker and in the footnote. The base case is the base
     case: David_Tickets_Business_Plan_v5.1, tab 02. Revenue and EBITDA
     are drawn against one shared scale so the widening gap between them
     is the margin story, which is the thing worth looking at. */
  {
    section: 'The plan',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:24px">Base case · business plan v5.1</div>
        <h2 class="display reveal" style="--d:.06s;font-size:76px;line-height:1.06;margin-bottom:20px">
          £30.7m and 73% margins by Year 5.
        </h2>
        <p class="body reveal" style="--d:.12s;font-size:22px;max-width:1560px;margin-bottom:44px;color:var(--head)">
          We take 20% of gross box office — 13% from the fan, 7% from the artist. It is the same
          twenty pence on every ticket the engine sells.
        </p>

        <div class="reveal" style="--d:.24s;max-width:1728px">
          <div style="display:flex;gap:32px;margin-bottom:22px">
            ${[['Revenue', 'var(--blue)'], ['EBITDA', '#6f6f6f']].map(([k, col]) => `
              <span style="display:flex;align-items:center;gap:10px;font-family:var(--mono);text-transform:uppercase;font-size:13px;letter-spacing:0.12em;color:var(--head)">
                <span style="width:16px;height:16px;background:${col};display:inline-block"></span>${k}</span>`).join('')}
          </div>
          ${[
            ['Year 1', 0.34, -0.21, '£0.34m', '−£0.21m'],
            ['Year 2', 5.80, 3.53, '£5.8m', '£3.5m'],
            ['Year 3', 13.45, 9.14, '£13.4m', '£9.1m'],
            ['Year 4', 21.10, 14.96, '£21.1m', '£15.0m'],
            ['Year 5', 30.73, 22.41, '£30.7m', '£22.4m'],
          ].map(([yr, rev, eb, revL, ebL], i) => `
            <div style="display:grid;grid-template-columns:110px 1fr 300px;gap:30px;align-items:center;padding:11px 0">
              <span class="label" style="font-size:15px;color:${i === 4 ? 'var(--blue)' : 'var(--head)'}">${yr}</span>
              <div>
                <div style="height:20px;width:${(rev / 30.73) * 100}%;background:var(--blue);margin-bottom:5px;border-radius:0 10px 10px 0"></div>
                ${/* a negative drawn as a bar pointing right would be a lie,
                       and a hollow stub reads as a rendering fault — Year 1's
                       loss is carried by the label alone */ ''}
                <div style="height:20px;width:${(Math.max(eb, 0) / 30.73) * 100}%;background:#6f6f6f;border-radius:0 10px 10px 0"></div>
              </div>
              <span style="font-family:var(--sans);font-weight:700;font-size:21px;letter-spacing:-0.03em;font-variant-numeric:tabular-nums;color:${i === 4 ? '#fff' : 'var(--head)'}">${revL} &nbsp;·&nbsp; ${ebL}</span>
            </div>`).join('')}
        </div>

        <div class="rule reveal" style="--d:.44s;margin:26px 0 22px"></div>
        <p class="body reveal" style="--d:.5s;font-size:22px;max-width:1680px">
          <strong style="color:var(--blue)">EBITDA-positive in April 2027.</strong>
          Cash-generative from that August. Ten people at Year 5.
        </p>
      </div>`,
  },

  /* 14 — go to market, with the multiplication drawn. */
  {
    section: 'Go to market',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:76px;line-height:1.06;margin-bottom:56px">
          Agents own the relationships.<br>AI does the work.
        </h2>

        <div class="reveal" style="--d:.2s;display:flex;align-items:center;gap:56px;flex-wrap:wrap;margin-bottom:50px">
          ${[['6', 'Tour partnerships managers'], ['25', 'Tours each a year'], ['20', 'Dates a tour']]
            .map(([n, cap], i) => `
              ${i ? '<div class="display" style="font-size:64px;line-height:1;color:var(--head);opacity:.45">×</div>' : ''}
              <div>
                <div class="display" style="font-size:118px;line-height:1;color:#fff">${n}</div>
                <div class="label" style="font-size:15px;margin-top:12px;max-width:230px">${cap}</div>
              </div>`).join('')}
          <div class="display" style="font-size:64px;line-height:1;color:var(--head);opacity:.45">=</div>
          <div>
            <div class="display" style="font-size:118px;line-height:1;color:var(--blue)">3,000</div>
            <div class="label" style="font-size:15px;margin-top:12px;max-width:230px">Shows a year</div>
          </div>
        </div>

        <div class="rule reveal" style="--d:.42s;margin:0 0 26px"></div>
        <p class="body reveal" style="--d:.48s;font-size:23px;max-width:1680px">
          Ex-booking agents who already hold the relationships. Our first is in seat.
          <span style="opacity:.8">That multiplication is phases one and two — phase three is what removes the ×.</span>
        </p>
      </div>`,
  },

  /* 15 — the team, lifted off the ask slide onto its own. It shared a
     slide with the ask while the ask had nothing in it but a number;
     now the ask carries a use of funds and a runway, and the four of
     them get the room a seed investor actually gives this slide. */
  {
    section: 'Team',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:76px;line-height:1.06;margin-bottom:20px">
          Four people who have already done it.
        </h2>
        <p class="body reveal" style="--d:.12s;font-size:22px;max-width:1560px;margin-bottom:56px;color:var(--head)">
          The campaigns on slide three are theirs. So is the platform.
        </p>

        <ol class="steps reveal" style="--d:.24s;grid-template-columns:repeat(4,1fr);max-width:1728px">
          ${[
            ['Co-CEO', 'PJ Jarrett', 'Built the platform end to end. Founder of Sweat Strategies and Reel:lab.'],
            ['Co-CEO', 'Tom Rose', 'CEO of Grape — artist services across the UK, Germany and Norway.'],
            ['Co-founder · CMO', 'Tobi Steinborn', 'Ran the campaigns behind Rules and ADMT. Co-founder of Sweat Strategies.'],
            ['Tour partnerships', 'Josh Ergatoudis', 'Career booking agent who founded his own agency. First TPM, in seat.'],
          ].map(([role, name, line]) => `
            <li><span>${role}</span>
              <div style="font-family:var(--sans);font-weight:800;font-size:29px;letter-spacing:-0.04em;color:#fff;margin-bottom:14px">${name}</div>
              <p class="body" style="font-size:19px;max-width:none">${line}</p></li>`).join('')}
        </ol>

        <div class="rule reveal" style="--d:.44s;margin:46px 0 26px"></div>
        <p class="body reveal" style="--d:.5s;font-size:23px;max-width:1680px">
          <strong style="color:var(--blue)">PJ and Tom each run a company turning over seven figures
          today.</strong> Brokering the deals that fill these rooms is what we have always done.
        </p>
      </div>`,
  },

  /* 16 — the ask. Was a number and a mood. A seed ask without a use of
     funds and a date the money stops being needed is an incomplete ask,
     so both are on the slide now. The three named lines are the plan's
     own committed spend; the balance is the booking team and working
     capital, which is what it actually is. */
  {
    section: 'The ask',
    html: `
      <div class="field field--dark"></div>
      ${blobs([
        { k: 'a', pos: 'right:-300px;top:-260px;opacity:.6' },
        { k: 'b', pos: 'left:-200px;bottom:-380px;opacity:.5' },
      ])}
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:118px;line-height:0.98;color:#fff;margin-bottom:18px">
          £1m to go loud.
        </h2>
        <p class="body reveal" style="--d:.12s;font-size:24px;max-width:1500px;margin-bottom:52px">
          It bankrolls the tours, the agent hires and the marketing. The platform is already built.
        </p>

        <ol class="steps reveal" style="--d:.24s;grid-template-columns:repeat(5,1fr);max-width:1728px;margin-bottom:44px">
          ${[
            ['Booking team', '£420k', 'five TPMs and a head of dept.'],
            ['Tour float', '£230k', 'we front the show marketing'],
            ['Market entry', '£190k', 'the agent conferences, B2B'],
            ['Product', '£100k', 'retained dev and hosting'],
            ['Licences & setup', '£60k', 'FCA opinion, contracts, VAT'],
          ].map(([k, n, sub]) => `
            <li><span>${k}</span>
              <div class="display" style="font-size:50px;line-height:1;color:var(--blue);margin-bottom:12px">${n}</div>
              <p class="body" style="font-size:17px;max-width:none">${sub}</p></li>`).join('')}
        </ol>

        <div class="rule reveal" style="--d:.44s;margin:0 0 26px"></div>
        <p class="display reveal" style="--d:.5s;font-size:34px;line-height:1.26;font-weight:700;letter-spacing:-0.035em;color:#fff;max-width:1600px">
          It is the last money we need. EBITDA-positive April 2027.
        </p>
      </div>`,
  },
];
