/* ------------------------------------------------------------------
   DAVID — the pitch cut

   THE SAME DECK, FOR A DIFFERENT ROOM. slides-david.js is the document
   version: it gets emailed, forwarded and read alone, so it carries its
   own argument in prose. That one runs 1,239 words across fourteen
   slides, a mean of 89 a slide. This one is the presented version — the
   words are spoken, so the slide only has to hold the thing the room
   should be looking at while PJ says them. It runs under 350 words across
   twelve slides, a mean nearer 28, which is the range a YC-style seed
   deck actually sits in.

   Neither replaces the other. Send the document, present this.

   NOTHING NEW IS CLAIMED. Every figure is already in slides-david.js and
   came from DAVID_Seed_Deck_v1.pptx. Copy is cut, never added to, and no
   number is recomputed — where a sentence disappears it is because the
   diagram says it or PJ says it, not because it was replaced with a
   better-sounding one.

   THE DIAGRAMS ARE THE POINT OF THIS CUT. Four slides that were prose in
   the document are drawn here:

     04  where the money goes — the fan-side fee and the artist-side
         take-home as two stacked bars, which is the whole thesis in one
         picture and was three paragraphs before
     05  the £20 ticket splitting, left to right, ending on the artist
     08  the operating ratio — ten people against 4,129 shows
     11  the go-to-market multiplication, drawn rather than written

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
          <span class="display" style="font-size:76px;line-height:1;color:var(--blue);white-space:nowrap">21.9 → 10.9</span>
          <span class="body" style="font-size:21px;max-width:620px">
            shows on the average UK tour, 1993 to 2024
            <span style="opacity:.8">— Music Venue Trust</span>
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
          <strong style="color:var(--blue)">Live Nation and AEG bring us their tours.</strong>
          Both of these arrived undersold.
        </p>
      </div>`,
  },

  /* 04 — the thesis, drawn. Three paragraphs in the document version; here
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

  /* 05 — the model, as a splitting diagram rather than four paragraphs. */
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

  /* 06 — the comparison. Kept from the document version because it is
     already a diagram; the prose around it is gone. */
  {
    section: 'The comparison',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:76px;line-height:1.06;margin-bottom:20px">
          The artist takes home ~45% more.
        </h2>
        <p class="body reveal" style="--d:.12s;font-size:22px;margin-bottom:52px;color:var(--head)">
          Share of gross potential — Hoxton Hall, 350 capacity.
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
            <div class="label" style="font-size:17px;margin-bottom:30px">Per sold-out show · Hoxton Hall</div>
            <div class="display" style="font-size:66px;line-height:1;color:var(--blue);margin-bottom:8px">£2,922</div>
            <div style="font-family:var(--mono);text-transform:uppercase;font-size:14px;letter-spacing:0.1em;color:var(--head);margin-bottom:28px">David</div>
            <div style="font-family:var(--sans);font-weight:600;font-size:21px;color:var(--head);font-variant-numeric:tabular-nums;line-height:1.7">£2,228 trad.<br>£2,020 modern</div>
          </div>
        </div>

      </div>`,
  },

  /* 07 — the engine, reframed. Three cost bars read backwards: the
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
                  <div style="font-family:var(--sans);font-weight:500;font-size:18px;color:var(--head)">${sub}</div>
                </div>`).join('')}
            </div>`).join('')}
        </div>

        <div class="rule reveal" style="--d:.46s;margin:14px 0 26px"></div>
        <p class="body reveal" style="--d:.52s;font-size:23px;max-width:1620px">
          <strong style="color:var(--head)">38.6%</strong> is what the average UK grassroots room does
          — Music Venue Trust, 2024.
        </p>
      </div>`,
  },

  /* 08 — why now, drawn as the operating ratio. The number carries the
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

  /* 09 — market. Three figures, and the estimate mark stays. */
  {
    section: 'Market',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Market · est., research in progress</div>
        <h2 class="display reveal" style="--d:.06s;font-size:76px;line-height:1.06;margin-bottom:64px">
          The middle is most of live music.
        </h2>
        <ol class="steps reveal" style="--d:.2s;grid-template-columns:repeat(3,1fr);max-width:1680px">
          <li><span>UK live sector GVA</span>${stat({ n: '£2.5bn', cap: 'Europe is a multiple' })}</li>
          <li><span>Attendance under 1,500 cap</span>${stat({ n: '55%', cap: 'the majority, not a niche' })}</li>
          <li><span>Revenue pool</span>${stat({ n: '£600m–1bn', cap: 'and no pan-European incumbent' })}</li>
        </ol>
      </div>`,
  },

  /* 10 — traction. Verification date stays; the table does not. */
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

  /* 11 — go to market, with the multiplication drawn. */
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
        </p>
      </div>`,
  },

  /* 12 — team and ask on one slide, which is where a pitch deck ends. */
  {
    section: 'The ask',
    html: `
      <div class="field field--dark"></div>
      ${blobs([
        { k: 'a', pos: 'right:-300px;top:-260px;opacity:.6' },
        { k: 'b', pos: 'left:-200px;bottom:-380px;opacity:.5' },
      ])}
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:130px;line-height:0.98;color:#fff;margin-bottom:20px">
          £1m to go loud.
        </h2>
        <p class="body reveal" style="--d:.12s;font-size:25px;max-width:1500px;margin-bottom:52px">
          Five tour partnerships managers · the build finished · the engine pointed at the market.
        </p>

        ${/* One line each — names alone read as a list of strangers, and the
               reason to back this team is what each of them has already done.
               Kept to a single line so the slide is still spoken over rather
               than read; the document version carries the full biographies. */ ''}
        <ol class="steps reveal" style="--d:.24s;grid-template-columns:repeat(4,1fr);max-width:1728px">
          ${[
            ['CEO', 'PJ Jarrett', 'Built the platform end to end. Founder of Sweat Strategies and Reel:lab.'],
            ['Co-founder', 'Tom Rose', 'CEO of Grape — artist services across the UK, Germany and Norway.'],
            ['Co-founder · CMO', 'Tobi Steinborn', 'Ran the campaigns behind Rules and ADMT. Co-founder of Sweat Strategies.'],
            ['Tour partnerships', 'Josh Ergatoudis', 'Career booking agent who founded his own agency. First TPM, in seat.'],
          ].map(([role, name, line]) => `
            <li><span>${role}</span>
              <div style="font-family:var(--sans);font-weight:800;font-size:26px;letter-spacing:-0.04em;color:#fff;margin-bottom:12px">${name}</div>
              <p class="body" style="font-size:18px;max-width:none">${line}</p></li>`).join('')}
        </ol>

        <div class="rule reveal" style="--d:.42s;margin:52px 0 30px"></div>
        <p class="display reveal" style="--d:.48s;font-size:36px;line-height:1.26;font-weight:700;letter-spacing:-0.035em;color:#fff;max-width:1500px">
          Touring is broken — we're fixing it.
        </p>
      </div>`,
  },
];
