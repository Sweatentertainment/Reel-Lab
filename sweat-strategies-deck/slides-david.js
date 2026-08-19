/* ------------------------------------------------------------------
   DAVID — seed deck

   WHICH DECK THIS IS A VARIANT OF. slides-labels-offer.js for the
   treatments and slides-investor.js for the investor shape. Everything
   visual is lifted: the bracketed act dividers, the .steps grid, the
   .stats figures, the .flow node rail, the .hl fill. Nothing new is
   designed except the charts, which are discussed below.

   SOURCE. DAVID_Seed_Deck_v1.pptx, twelve slides. THE COPY IS PJ'S AND
   IS KEPT. This was a design job, not a rewrite: every number, claim,
   caveat and turn of phrase comes from that file. Where a line has been
   cut it is because the layout carries it instead — never because it was
   improved. The one structural change is that slide 12 (team + ask) is
   split in two, because four people and a use-of-funds line and a
   closing statement on one 1920×1080 slide is what made the original
   feel cramped.

   THIS IS NOT A SWEAT DECK. DAVID is a separate company with its own
   investors reading this, so mount() is passed brand and legal overrides
   and the chrome says DAVID throughout. Sweat appears only where it
   belongs — in PJ's and Tobi's biographies on the team slide.

   THE CHARTS, AND THE ONE DELIBERATE PALETTE DECISION. The original had
   one clustered column chart (slide 06) and four slides of figures set as
   text. All of it is now drawn in the system's own idiom — horizontal
   bars and .stats figures rather than a chart library, because a chart
   library would import its own type, grid and palette and the deck would
   stop looking like one document.

   On the comparison slide the three deals are NOT three categorical hues.
   DAVID carries the accent and the two competitors are deliberately
   neutral grey, because they are context rather than peers — the eye
   should go to one bar. Running the palette validator on the accent
   #bef264 against #7a7a7a on DAVID's #141414 ground FAILS its
   lightness-band and chroma-floor checks, which is the validator
   correctly observing that the lime is very light and the grey is
   achromatic on purpose. The checks that decide whether a reader can
   separate the bars pass with room — CVD ΔE 35.1, normal-vision ΔE 36.4,
   both marks above 3:1 on the surface — and every bar carries a direct
   value label, so identity never rests on colour alone.

   THE PALETTE IS DAVID'S OWN, read out of the source pptx rather than
   chosen: #141414 grounds, lime #bef264 / #d9f99d accents and warm
   neutral greys are what their slides already use. The theme block in
   that file is the stock Office scheme and was ignored. It is applied as
   a scoped override in david-proposal.html, because deck.css is shared by
   ten decks and none of the others should move.

   FIGURES ARE REPRODUCED, NOT RECOMPUTED. The market slide keeps its
   "research in progress" caveat and the traction slide keeps its
   verification date, because an investor deck that quietly drops a hedge
   is worse than one that never had it. PJ removed the "est." marks from
   the traction figures himself; the basis is still stated underneath —
   gross calculated at a £22 average ticket — so the reader can still see
   what the number is made of.

   THE FINANCIALS COME FROM THE MODEL, NOT THE PPTX. Every figure on the
   plan slide and every pound on the ask slide is read out of
   David_Tickets_Business_Plan_v5.1.xlsx — tab 02 for revenue, EBITDA and
   headcount, tab 07 for the use-of-funds lines. They are labelled as
   projections twice on the slide that carries them, because a deck that
   lets a forecast sit next to achieved traction without saying which is
   which is the fastest way to lose a room.

   ONE FIGURE COMES FROM OUTSIDE THE SOURCE FILE, from the Music Venue
   Trust 2024 Annual Report and cited on the slide that carries it: 38.6%
   capacity utilisation on ticketed events at UK grassroots venues. It
   sits on the problem slide, because it is the evidence that shows do
   not sell — on the sales-engine slide it read as a stray benchmark with
   no clear referent. Everything else came out of DAVID_Seed_Deck_v1.pptx.
   ------------------------------------------------------------------ */

import { img, blobs } from './parts.js';

/* ------------------------------------------------------- local archetypes */

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
      <h2 class="display reveal" style="--d:.1s;font-size:120px;line-height:0.98;max-width:1620px">
        <span class="bracket bracket--light">${line}</span>
      </h2>
    </div>`,
});

/* A horizontal bar. `pct` is the fill as a percentage of the track, `hero`
   puts it in the accent and everything else in neutral grey.

   Rounded only on the data end and anchored flush to the baseline, so the
   bar reads as a measurement rather than a lozenge; the label sits outside
   the fill so it never depends on the fill being long enough to hold it. */
const bar = ({ label, value, pct, hero = false, sub = '' }) => `
  <div style="margin-bottom:26px">
    <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:10px">
      <span style="font-family:var(--sans);font-weight:${hero ? 800 : 600};font-size:23px;letter-spacing:-0.02em;color:${hero ? '#fff' : 'var(--head)'}">${label}</span>
      <span style="font-family:var(--sans);font-weight:800;font-size:26px;letter-spacing:-0.03em;font-variant-numeric:tabular-nums;color:${hero ? 'var(--blue)' : 'var(--head)'}">${value}</span>
    </div>
    <div style="height:14px;background:#ffffff14;border-radius:0 7px 7px 0">
      <div style="height:100%;width:${pct}%;background:${hero ? 'var(--blue)' : '#7a7a7a'};border-radius:0 7px 7px 0"></div>
    </div>
    ${sub ? `<div style="font-family:var(--mono);text-transform:uppercase;font-size:15px;letter-spacing:0.12em;color:var(--head);opacity:.9;margin-top:10px">${sub}</div>` : ''}
  </div>`;

/* A comparison group: rows measured against a common scale, stated in the
   label. Deliberately NOT a stacked bar — 13% and 25% are two separate
   quantities, and stacking them would imply they are parts of one whole,
   which is a picture telling a lie the numbers do not. Each row is drawn
   as its share of `max` and carries its own value. */
const cmp = ({ label, max, rows }) => `
  <div style="margin-bottom:40px">
    <div class="label" style="font-size:17px;margin-bottom:20px">${label}</div>
    ${rows.map((r) => `
      <div style="margin-bottom:20px">
        <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:9px;max-width:1500px">
          <span style="font-family:var(--sans);font-weight:${r.hero ? 800 : 600};font-size:22px;letter-spacing:-0.02em;color:${r.hero ? '#fff' : 'var(--head)'}">${r.name}</span>
          <span style="font-family:var(--sans);font-weight:800;font-size:26px;letter-spacing:-0.03em;font-variant-numeric:tabular-nums;color:${r.hero ? 'var(--blue)' : 'var(--head)'}">${r.value}</span>
        </div>
        <div style="height:16px;background:#ffffff14;border-radius:0 8px 8px 0;max-width:1500px">
          <div style="height:100%;width:${(r.n / max) * 100}%;background:${r.hero ? 'var(--blue)' : '#7a7a7a'};border-radius:0 8px 8px 0"></div>
        </div>
      </div>`).join('')}
  </div>`;

/* A sell-through figure with the proportion drawn under it. The number is
   the point; the track is there so two tours can be compared at a glance. */
const gauge = ({ pct, title, note, meta }) => `
  <div>
    <div class="label" style="font-size:18px;margin-bottom:22px">${title}</div>
    <div style="display:flex;align-items:baseline;gap:18px;margin-bottom:18px">
      <span class="display" style="font-size:118px;line-height:1;color:var(--blue)">${pct}%</span>
      <span style="font-family:var(--sans);font-weight:600;font-size:24px;color:var(--head)">sell-through</span>
    </div>
    <div style="height:14px;background:#ffffff14;border-radius:0 7px 7px 0;max-width:600px;margin-bottom:20px">
      <div style="height:100%;width:${pct}%;background:var(--blue);border-radius:0 7px 7px 0"></div>
    </div>
    <p class="body" style="font-size:20px;max-width:600px;margin-bottom:12px">${note}</p>
    <div style="font-family:var(--mono);text-transform:uppercase;font-size:15px;letter-spacing:0.12em;color:var(--head);opacity:.92">${meta}</div>
  </div>`;

export const SLIDES = [
  /* 01 — cover. Typographic rather than the Sweat artwork: this is DAVID's
     document and the Sweat cover carries a Sweat wordmark baked into the
     JPEG. Full bleed field, so chrome is off and the confidential line and
     the raise sit where the chrome would have been. */
  {
    section: 'Cover',
    chrome: 'none',
    html: `
      <div class="field field--dark"></div>
      ${blobs([
        { k: 'a', pos: 'left:-280px;top:-300px;opacity:.55' },
        { k: 'c', pos: 'right:-160px;bottom:-340px;opacity:.6' },
        { k: 'b', pos: 'left:40%;bottom:-460px;opacity:.4' },
      ])}
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:56px;font-size:19px">Private &amp; confidential · Seed round · August 2026</div>
        <h1 class="display reveal" style="--d:.08s;font-size:220px;line-height:0.86;color:#fff;margin-bottom:44px">DAVID.</h1>
        <p class="display reveal" style="--d:.18s;font-size:44px;line-height:1.24;font-weight:600;letter-spacing:-0.035em;max-width:1360px;color:#fff">
          The promoter, ticketing platform and marketing engine for the middle of the live music market.
        </p>
        <div class="rule reveal" style="--d:.3s;margin:56px 0 32px;max-width:1360px"></div>
        <div class="reveal" style="--d:.36s;display:flex;align-items:baseline;gap:40px;flex-wrap:wrap">
          <span style="font-family:var(--sans);font-weight:800;font-size:40px;letter-spacing:-0.04em;color:#fff">Raising £1m</span>
          <span style="font-family:var(--mono);text-transform:uppercase;font-size:20px;letter-spacing:0.18em;color:#fff;opacity:.92">david.tickets</span>
        </div>
        <p class="body reveal" style="--d:.44s;font-size:21px;max-width:1240px;margin-top:34px;opacity:.95">
          Founded by the marketing companies behind Bad Bunny, Raye, Thundercat, The Pixies and Swedish House Mafia.
        </p>
      </div>`,
  },

  /* 02 — the problem. Four figures across, which is the comfortable maximum
     for .steps with a sentence under each. The closing line was the punch
     of the original slide and keeps its own rule. */
  {
    section: 'The problem',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">The problem</div>
        <h2 class="display reveal" style="--d:.08s;font-size:82px;line-height:1.02;max-width:1500px;margin-bottom:20px">
          Touring is broken.
        </h2>
        <p class="body reveal" style="--d:.14s;font-size:25px;max-width:1400px;margin-bottom:52px">
          Everybody in the chain is being milked — and the shows still don't sell.
        </p>

        <ol class="steps reveal" style="--d:.24s;grid-template-columns:repeat(4,1fr)">
          <li><span>Fans are gouged</span>
            <div class="display" style="font-size:62px;line-height:1;color:var(--blue);margin-bottom:16px">25%+</div>
            <p class="body" style="font-size:18px;max-width:none">Booking fees of 25% and up layered on at checkout — then dynamic pricing on top.</p></li>
          <li><span>Artists get padded settlements</span>
            <div class="display" style="font-size:62px;line-height:1;color:var(--blue);margin-bottom:16px">Towels.</div>
            <p class="body" style="font-size:18px;max-width:none">Riders, reps, line items you never asked for and can't remove.</p></li>
          <li><span>The promoter keeps the data</span>
            <div class="display" style="font-size:62px;line-height:1;color:var(--blue);margin-bottom:16px">Not yours.</div>
            <p class="body" style="font-size:18px;max-width:none">The artist builds the audience and walks away with nothing.</p></li>
          <li><span>The marketing is a decade old</span>
            <div class="display" style="font-size:62px;line-height:1;color:var(--blue);margin-bottom:16px">2015</div>
            <p class="body" style="font-size:18px;max-width:none">Spend fixed low and blind — so tours get papered, cut down and cancelled.</p></li>
        </ol>

        <div class="rule reveal" style="--d:.44s;margin:48px 0 28px"></div>
        <div class="reveal" style="--d:.5s;display:grid;grid-template-columns:0.95fr 1.05fr;gap:90px;align-items:center;max-width:1728px">
          <p class="body" style="font-size:25px;max-width:none">
            The people who own live music make money whether or not the show sells.
            <strong style="color:var(--blue)">So it doesn't.</strong>
          </p>
          ${/* the one figure on this slide from outside the source file, and
                 the evidence for the sentence beside it: the average room is
                 more than half empty. It belongs here rather than on the sales
                 engine, where it read as a stray benchmark */ ''}
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

  /* 03 — the proof. The two tours were four stacked text blocks; drawn as
     gauges they can be compared at a glance, which is the whole point of
     putting them side by side. */
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
            meta: '4 of 5 shows sold out · £2.55 cost per ticket',
          })}
          ${gauge({
            pct: 92,
            title: 'ADMT · UK tour 2025',
            note: 'Ten cities across the UK.',
            meta: '3,522 tickets sold · ~£77k gross (est.) · £2.59 cost per ticket',
          })}
        </div>

        <div class="rule reveal" style="--d:.42s;margin:0 0 30px"></div>
        <p class="body reveal" style="--d:.48s;font-size:22px;max-width:1620px;margin-bottom:16px">
          <strong style="color:var(--blue)">The artists' teams bring us in.</strong>
          Both of these were Live Nation and AEG tours that had stopped selling — tours sit at 4–27%
          when our campaigns switch on, and these are the numbers after.
        </p>
        <p class="body reveal" style="--d:.54s;font-size:22px;max-width:1620px">
          One campaign across every market, one learning loop — a winning creative in Glasgow is live in
          Paris the next morning.
        </p>
      </div>`,
  },


  /* 04 — traction. The table is kept because it is genuinely a table — three
     rows against two measures — but set in the deck's own type with the
     figures right-aligned and tabular so the columns actually line up. The
     five live stats sit above it, because "last 7 days" is the number an
     investor looks for first. */
  {
    section: 'Traction',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Traction · verified 19 Aug 2026</div>
        <h2 class="display reveal" style="--d:.08s;font-size:72px;line-height:1.04;max-width:1500px;margin-bottom:44px">
          Live, selling, accelerating.
        </h2>

        <ol class="steps reveal" style="--d:.2s;grid-template-columns:repeat(5,1fr);max-width:1728px;margin-bottom:44px">
          <li><span>Last 7 days</span>
            <div class="display" style="font-size:54px;line-height:1;color:var(--blue);margin-bottom:12px">266</div>
            <p class="body" style="font-size:17px;max-width:none">tickets · £7,678 gross · 138 buyers</p></li>
          <li><span>On sale now</span>
            <div class="display" style="font-size:54px;line-height:1;color:var(--blue);margin-bottom:12px">£330k</div>
            <p class="body" style="font-size:17px;max-width:none">across 43 shows</p></li>
          <li><span>ADMT Feb ’27</span>
            <div class="display" style="font-size:54px;line-height:1;color:var(--blue);margin-bottom:12px">22.7%</div>
            <p class="body" style="font-size:17px;max-width:none">sold, six months out</p></li>
          <li><span>Sell-through</span>
            <div class="display" style="font-size:54px;line-height:1;color:var(--blue);margin-bottom:12px">92%</div>
            <p class="body" style="font-size:17px;max-width:none">across the last three tours</p></li>
          <li><span>Fans captured</span>
            <div class="display" style="font-size:54px;line-height:1;color:var(--blue);margin-bottom:12px">1,939</div>
            <p class="body" style="font-size:17px;max-width:none">artist-owned</p></li>
        </ol>

        <div class="rule reveal" style="--d:.36s;margin:0 0 26px"></div>

        <div class="reveal" style="--d:.42s;max-width:1728px;font-variant-numeric:tabular-nums">
          <div style="display:grid;grid-template-columns:1fr 200px 220px;gap:40px;padding:0 0 10px">
            <span></span>
            <span class="label" style="font-size:14px;text-align:right">Tickets sold</span>
            <span class="label" style="font-size:14px;text-align:right">Gross</span>
          </div>
          ${[
            ['David platform — since first tour on-sale, 8 May 2026 (14 weeks)', '1,982', '£54k', true],
            ['The engine that became David — pre-platform tours (ADMT, St Lundi, Scout)', '~5,650', '~£124k', false],
            ['Total sold by the machine', '~7,600', '~£179k', true],
          ].map(([label, tickets, gross, strong]) => `
            <div style="display:grid;grid-template-columns:1fr 200px 220px;gap:40px;padding:16px 0;border-bottom:1px solid var(--rule)">
              <span style="font-family:var(--sans);font-weight:${strong ? 700 : 500};font-size:20px;letter-spacing:-0.02em;color:${strong ? '#fff' : 'var(--head)'}">${label}</span>
              <span style="font-family:var(--sans);font-weight:800;font-size:24px;letter-spacing:-0.03em;text-align:right;color:${strong ? 'var(--blue)' : 'var(--head)'}">${tickets}</span>
              <span style="font-family:var(--sans);font-weight:800;font-size:24px;letter-spacing:-0.03em;text-align:right;color:${strong ? 'var(--blue)' : 'var(--head)'}">${gross}</span>
            </div>`).join('')}
        </div>

        <p class="body reveal" style="--d:.5s;font-size:17px;max-width:1728px;margin-top:26px;opacity:.92">
          Gross calculated at a £22 average ticket. All figures are tickets sold, not listed. Platform
          figure excludes £395 of pre-tour one-off sales (Mar–Apr).
        </p>
      </div>`,
  },
  act({ label: 'The insight', line: 'Everyone makes money when tickets sell' }),

  /* 05 — the insight, drawn. Was two columns of prose; the two sides of the
     deal are a comparison, and a comparison is a picture. The paragraphs
     that survive are the ones the bars cannot say: what the costs are and
     why the incumbent does not need the marketing to work. */
  {
    section: 'The insight',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">The insight</div>
        <h2 class="display reveal" style="--d:.08s;font-size:66px;line-height:1.08;max-width:1560px;margin-bottom:46px">
          We sell more — and charge far less.
        </h2>

        <div class="reveal" style="--d:.2s;max-width:1620px">
          ${cmp({
            label: 'What the fan pays on top of face value',
            max: 25,
            rows: [
              { name: 'David', value: '13%', n: 13, hero: true },
              { name: 'The old stack', value: '25%+', n: 25 },
            ],
          })}
          ${cmp({
            label: "What comes out of the artist's side",
            max: 20,
            rows: [
              { name: 'David · of gross', value: '7%', n: 7, hero: true },
              { name: 'The old stack · of net, after padded costs', value: '~20%', n: 20 },
            ],
          })}
        </div>

        <div class="rule reveal" style="--d:.4s;margin:14px 0 28px"></div>
        <div class="reveal" style="--d:.46s;display:grid;grid-template-columns:1fr 1fr;gap:110px;max-width:1620px">
          <p class="body" style="font-size:21px;max-width:none">
            Ours is the only artist-side deduction, and costs come off at receipted actuals.
            Theirs comes off a net already padded to protect their take.
          </p>
          <p class="body" style="font-size:21px;max-width:none">
            They win even half-empty, so the marketing never has to work.
            <strong style="color:var(--blue)">The artist wins on both sides.</strong>
          </p>
        </div>
      </div>`,
  },

  /* 06 — the model. The four steps were numbered in the original and they
     are a genuine sequence, so .flow is the right furniture rather than a
     grid: money moves left to right and ends with the artist. */
  {
    section: 'The model',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">The model</div>
        <h2 class="display reveal" style="--d:.08s;font-size:72px;line-height:1.04;max-width:1500px;margin-bottom:52px">
          Our only cut of the artist's<br>revenue is 7% of gross.
        </h2>

        <ol class="flow reveal" style="--d:.2s;grid-template-columns:repeat(4,1fr);max-width:1728px">
          ${[
            { n: 'Step 01', t: 'Fan pays face value +13%', b: 'The fee sits on top of the ticket — against 25%+ elsewhere — and funds the marketing.' },
            { n: 'Step 02', t: 'Costs come off at actuals', b: 'Receipted, zero markup. Optional lines are the artist’s call. No towels.' },
            { n: 'Step 03', t: 'David takes 7% of gross', b: 'That’s it. No profit split, no back end, no hidden spend.' },
            { n: 'Step 04', t: 'The rest is the artist’s', b: 'Weekly payouts from real sales. Itemised settlement within 7 days.', human: true },
          ].map((s) => `
            <li class="flow__node${s.human ? ' flow__node--human' : ''}">
              <div class="flow__n">${s.n}</div>
              <div class="flow__t">${s.t}</div>
              <p class="flow__b">${s.b}</p>
            </li>`).join('')}
        </ol>

        <div class="rule reveal" style="--d:.42s;margin:56px 0 30px"></div>
        <p class="body reveal" style="--d:.48s;font-size:22px;max-width:1620px;color:var(--head)">
          The old deal: pad the costs first, then take ~20% of what survives.
        </p>
      </div>`,
  },

  /* 07 — the comparison, and the slide the raise turns on. Was a clustered
     column chart; drawn as two grouped bar sets it fits the deck's type and
     lets the sold-out and 80% cases sit side by side without a legend,
     because every bar is labelled. */
  {
    section: 'The comparison',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Example settlement · Hoxton Hall, 350 cap</div>
        <h2 class="display reveal" style="--d:.08s;font-size:66px;line-height:1.06;max-width:1560px;margin-bottom:20px">
          The artist takes home ~45% more.
        </h2>
        <p class="body reveal" style="--d:.14s;font-size:20px;max-width:1560px;margin-bottom:42px;color:var(--head)">
          Artist take-home as a share of gross potential, on the same show settled three ways.
        </p>

        <div class="reveal" style="--d:.24s;display:grid;grid-template-columns:1fr 1fr 0.62fr;gap:90px;max-width:1728px">
          <div>
            <div class="label" style="font-size:17px;margin-bottom:26px">Sold out</div>
            ${bar({ label: 'DAVID', value: '58.4%', pct: 58.44, hero: true })}
            ${bar({ label: 'Trad. promoter', value: '44.6%', pct: 44.56 })}
            ${bar({ label: 'Modern competitor', value: '40.4%', pct: 40.4 })}
          </div>
          <div>
            <div class="label" style="font-size:17px;margin-bottom:26px">80% sold</div>
            ${bar({ label: 'DAVID', value: '35.2%', pct: 35.16, hero: true })}
            ${bar({ label: 'Trad. promoter', value: '24.4%', pct: 24.44 })}
            ${bar({ label: 'Modern competitor', value: '17.3%', pct: 17.26 })}
          </div>
          <div>
            <div class="label" style="font-size:17px;margin-bottom:26px">Per sold-out show</div>
            <dl class="stats" style="display:block">
              <div style="margin-bottom:26px"><dt>DAVID</dt><dd style="font-size:52px">£2,922</dd></div>
            </dl>
            <div style="font-family:var(--sans);font-weight:600;font-size:21px;color:var(--head);margin-bottom:8px;font-variant-numeric:tabular-nums">Trad. promoter &nbsp;£2,228</div>
            <div style="font-family:var(--sans);font-weight:600;font-size:21px;color:var(--head);font-variant-numeric:tabular-nums">Modern competitor &nbsp;£2,020</div>
          </div>
        </div>

      </div>`,
  },

  /* 08 — the sales engine, reframed. The first cut drew three cost bars,
     and read backwards: the incumbent's £1.50 looked like better value
     because cost was the only thing measured. Cost per ticket on its own
     is the wrong axis — cheap spend on a half-empty room is not cheap. So
     the slide now pairs what each side commits with what the room does,
     which is the actual argument and is entirely PJ's own figures.

     The 4-27% is stated as where tours sit WHEN WE ARE CALLED IN, not as
     what incumbent marketing finally achieves. Those tours did not run to
     completion on the old spend, so claiming it as their end result would
     be a number we do not have. */
  {
    section: 'The sales engine',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.92fr 1.08fr;align-items:center;gap:80px;height:100%">
        <div>
          <div class="label reveal" style="margin-bottom:26px">The sales engine</div>
          <h2 class="display reveal" style="--d:.08s;font-size:56px;line-height:1.1;margin-bottom:30px">
            Their spend is cheaper.<br>Their rooms are emptier.
          </h2>
          <p class="body reveal" style="--d:.14s;font-size:20px;max-width:640px;margin-bottom:30px">
            Cost per ticket on its own is the wrong measure. £1.50 into a half-empty room is
            not value — it is a budget too small to work, spent on targeting built years ago.
          </p>
          <ol class="steps reveal" style="--d:.2s;grid-template-columns:1fr;max-width:640px;row-gap:22px">
            <li><span>AI routing</span>
              <p class="body" style="font-size:18px;max-width:none">Dates land where the artist's own audience already is.</p></li>
            <li><span>AI campaign engine</span>
              <p class="body" style="font-size:18px;max-width:none">Creative, targeting and budget per city, driven to cost-per-ticket. Every market feeds one loop.</p></li>
            <li><span>It compounds</span>
              <p class="body" style="font-size:18px;max-width:none">The artist owns every buyer. This tour's audience is next tour's cheapest tickets sold.</p></li>
          </ol>
        </div>

        <div class="reveal" style="--d:.3s">
          <div class="label" style="font-size:17px;margin-bottom:34px">On a £20 ticket</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:70px;max-width:900px">
            ${[
              { who: 'David', hero: true, rows: [
                ['Committed', 'Up to £6.00', '30% of ticket price'],
                ['Delivered', 'Under £3.00', 'across the last three tours'],
                ['The room', '91–92%', 'sold'],
              ] },
              { who: 'Incumbents', hero: false, rows: [
                ['Committed', '£1.50–2.50', 'and spent blind'],
                ['Delivered', 'Not attributed', ''],
                ['The room', '4–27%', 'sold when we are called in'],
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
          <div class="rule" style="margin:20px 0 24px;max-width:900px"></div>
          <p class="body" style="font-size:20px;max-width:900px">
            We commit two to four times more per ticket, come in under half of it, and the gap
            goes back to the artist.
          </p>
        </div>
      </div>`,
  },

  /* 09 — why now. The operating-model figure is the headline here, so it is
     lifted out of the paragraph and set as a figure. */
  {
    section: 'Why now',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Why now</div>
        <h2 class="display reveal" style="--d:.08s;font-size:66px;line-height:1.08;max-width:1560px;margin-bottom:30px">
          AI makes the middle market servable — for the first time.
        </h2>
        <p class="body reveal" style="--d:.16s;font-size:22px;max-width:1560px;margin-bottom:46px">
          Advancing, contracting, settlement, tax and campaign management used to cost more in human hours
          than a mid-size show could carry. That is why the middle market was abandoned to fragmented local
          promoters. <strong style="color:var(--blue)">That cost has collapsed.</strong>
        </p>

        <div class="reveal" style="--d:.26s;display:grid;grid-template-columns:0.9fr 1.1fr;gap:110px;max-width:1680px;align-items:start">
          <div>
            <div class="display" style="font-size:88px;line-height:1;color:var(--blue);margin-bottom:18px">4,129</div>
            <div style="font-family:var(--sans);font-weight:700;font-size:26px;letter-spacing:-0.03em;margin-bottom:14px">shows a year, run by 10 people.</div>
            <p class="body" style="font-size:19px;max-width:600px">
              The Year-5 operating model — possible only because the machine does the advancing, the
              settlement and the marketing.
            </p>
          </div>
          <ol class="steps" style="grid-template-columns:1fr 1fr">
            <li><span>Streaming pays ~nothing</span>
              <p class="body" style="font-size:19px;max-width:none">Touring is the income now — artists need every pound of it.</p></li>
            <li><span>Transparency pressure</span>
              <p class="body" style="font-size:19px;max-width:none">Fee-disclosure rules are tightening across the UK and EU.</p></li>
          </ol>
        </div>
      </div>`,
  },
  act({ label: 'The business', line: 'A market nobody serves, and the plan to serve it' }),

  /* 10 — competition. The deck had no competition slide at all, which in
     a seed pack reads as unexamined rather than confident.

     GROUPED BY CATEGORY, NOT BY BRAND, deliberately. A per-company tick
     chart would force claims about DICE's marketing or AXS's data terms
     that we cannot source, and one wrong tick in a document that gets
     forwarded costs more than the whole slide is worth. Three rows,
     three columns, every cell defensible. */
  {
    section: 'Competition',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Competition</div>
        <h2 class="display reveal" style="--d:.08s;font-size:66px;line-height:1.06;max-width:1620px;margin-bottom:20px">
          Nobody else is paid to fill the room.
        </h2>
        <p class="body reveal" style="--d:.14s;font-size:22px;max-width:1560px;margin-bottom:46px">
          Ticketing platforms sell to the people who are already coming — they are a checkout, not a
          demand engine. Promoters do market the show, on a budget fixed before the tour goes on sale
          and measured afterwards by nobody. Neither of them loses money on a half-empty room.
        </p>

        <div class="reveal" style="--d:.26s;max-width:1728px">
          <div style="display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr;gap:40px;padding-bottom:14px">
            <span></span>
            ${['Fills the room', 'Artist keeps the data', 'Artist keeps the upside']
              .map((h) => `<span class="label" style="font-size:14px">${h}</span>`).join('')}
          </div>
          ${[
            ['Ticketing', 'Ticketmaster · AXS · DICE · See Tickets', ['No', 'No', '—'], false],
            ['Promoters', 'Live Nation · AEG · local promoters', ['Fixed, low, unmeasured', 'No', 'No'], false],
            ['DAVID', 'The marketing is the product', ['Yes', 'Yes', 'Yes'], true],
          ].map(([who, sub, cells, hero]) => `
            <div style="display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr;gap:40px;align-items:baseline;padding:24px 0;border-top:1px solid #ffffff1f">
              <div>
                <div style="font-family:var(--sans);font-weight:800;font-size:25px;letter-spacing:-0.04em;color:${hero ? 'var(--blue)' : '#fff'};margin-bottom:7px">${who}</div>
                <div style="font-family:var(--sans);font-weight:500;font-size:16px;color:var(--head)">${sub}</div>
              </div>
              ${cells.map((v) => `
                <span style="font-family:var(--sans);font-weight:${hero ? 800 : 600};font-size:${v.length > 6 ? 19 : 25}px;letter-spacing:-0.03em;color:${hero ? 'var(--blue)' : 'var(--head)'}">${v}</span>`).join('')}
            </div>`).join('')}
        </div>

        <div class="rule reveal" style="--d:.46s;margin:34px 0 26px"></div>
        <p class="body reveal" style="--d:.52s;font-size:22px;max-width:1680px">
          Every one of them gets paid on a half-empty room.
          <strong style="color:var(--blue)">We only get paid on a full one</strong> — our whole revenue is
          a share of tickets actually sold, so the incentive that is missing everywhere else is the only
          one we have.
        </p>
      </div>`,
  },

  /* 11 — market. The caveat in the original's eyebrow is kept verbatim: a
     deck that drops a hedge in the redesign is worse than one that never
     carried it — but "research in progress" printed in the eyebrow reads
     as unfinished homework rather than as honesty. The hedge is now where
     it belongs: the derivation is stated in full underneath, and the
     figures themselves are committed to. */
  {
    section: 'Market',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Market</div>
        <h2 class="display reveal" style="--d:.08s;font-size:66px;line-height:1.08;max-width:1620px;margin-bottom:52px">
          The middle is most of live music — and nobody runs it at scale.
        </h2>

        <ol class="steps reveal" style="--d:.22s;grid-template-columns:repeat(3,1fr);max-width:1680px">
          <li><span>UK live sector GVA alone</span>
            <div class="display" style="font-size:76px;line-height:1;color:var(--blue);margin-bottom:16px">£2.5bn</div>
            <p class="body" style="font-size:19px;max-width:none">Europe is a multiple of the UK.</p></li>
          <li><span>Attendance under 1,500 cap</span>
            <div class="display" style="font-size:76px;line-height:1;color:var(--blue);margin-bottom:16px">55%</div>
            <p class="body" style="font-size:19px;max-width:none">The middle isn't niche — it's the majority.</p></li>
          <li><span>Annual revenue pool</span>
            <div class="display" style="font-size:76px;line-height:1;color:var(--blue);margin-bottom:16px">£600m–1bn</div>
            <p class="body" style="font-size:19px;max-width:none">No pan-European incumbent to displace.</p></li>
        </ol>

        <div class="rule reveal" style="--d:.42s;margin:52px 0 30px"></div>
        <p class="body reveal" style="--d:.48s;font-size:21px;max-width:1680px">
          David at Year 5 — £30.7m revenue from 4,129 shows — is roughly 3–5% of that pool, with no
          pan-European incumbent to displace. Nobody else can be the promoter, the ticketer and the
          marketing engine at once without cannibalising their own fees.
        </p>
        <p class="body reveal" style="--d:.54s;font-size:17px;max-width:1680px;margin-top:16px;opacity:.75">
          Sector figures: UK Music. The revenue pool is our own estimate — European middle-market gross
          box office of £3–5bn at our 20% take rate — and is the one number on this slide we have derived
          rather than sourced.
        </p>
      </div>`,
  },

  /* 12 — the plan. This slide did not exist, and its absence was the
     largest hole in the pack: an investor cannot size a cheque against a
     deck with no revenue line in it.

     EVERY FIGURE HERE IS THE MODEL, NOT THE PAST, and the slide says so
     in the eyebrow and again in the footnote — David_Tickets_Business_
     Plan_v5.1, tab 02, base case. Revenue and EBITDA are drawn against
     one shared scale so the widening gap between them reads as the
     margin story, which is what the slide is for. Year 1 EBITDA is
     negative and therefore has no bar: a negative drawn pointing right
     would be a lie, so the number carries it alone. */
  {
    section: 'The plan',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">The plan · base case, business plan v5.1</div>
        <h2 class="display reveal" style="--d:.08s;font-size:66px;line-height:1.06;max-width:1620px;margin-bottom:20px">
          £30.7m of revenue and 73% margins by Year 5.
        </h2>
        <p class="body reveal" style="--d:.14s;font-size:21px;max-width:1560px;margin-bottom:40px">
          We take 20% of gross box office — 13% from the fan as a booking fee, 7% from the artist.
          The margin comes from the operating model: the same ten people run four thousand shows as
          run four hundred, because the advancing, the settlement and the tax are machine work.
        </p>

        <div class="reveal" style="--d:.26s;max-width:1728px">
          <div style="display:flex;gap:30px;margin-bottom:18px">
            ${[['Revenue', 'var(--blue)'], ['EBITDA', '#6f6f6f']].map(([k, col]) => `
              <span style="display:flex;align-items:center;gap:9px;font-family:var(--mono);text-transform:uppercase;font-size:12px;letter-spacing:0.12em;color:var(--head)">
                <span style="width:14px;height:14px;background:${col};display:inline-block"></span>${k}</span>`).join('')}
          </div>
          ${[
            ['Year 1', 0.34, -0.21, '£0.34m', '−£0.21m'],
            ['Year 2', 5.80, 3.53, '£5.8m', '£3.5m'],
            ['Year 3', 13.45, 9.14, '£13.4m', '£9.1m'],
            ['Year 4', 21.10, 14.96, '£21.1m', '£15.0m'],
            ['Year 5', 30.73, 22.41, '£30.7m', '£22.4m'],
          ].map(([yr, rev, eb, revL, ebL], i) => `
            <div style="display:grid;grid-template-columns:100px 1fr 280px;gap:28px;align-items:center;padding:9px 0">
              <span class="label" style="font-size:14px;color:${i === 4 ? 'var(--blue)' : 'var(--head)'}">${yr}</span>
              <div>
                <div style="height:17px;width:${(rev / 30.73) * 100}%;background:var(--blue);margin-bottom:5px;border-radius:0 9px 9px 0"></div>
                <div style="height:17px;width:${(Math.max(eb, 0) / 30.73) * 100}%;background:#6f6f6f;border-radius:0 9px 9px 0"></div>
              </div>
              <span style="font-family:var(--sans);font-weight:700;font-size:20px;letter-spacing:-0.03em;font-variant-numeric:tabular-nums;color:${i === 4 ? '#fff' : 'var(--head)'}">${revL} &nbsp;·&nbsp; ${ebL}</span>
            </div>`).join('')}
        </div>

        <div class="rule reveal" style="--d:.46s;margin:24px 0 22px"></div>
        <p class="body reveal" style="--d:.52s;font-size:21px;max-width:1680px;margin-bottom:12px">
          <strong style="color:var(--blue)">EBITDA-positive in April 2027</strong>, cash-generative from
          that August, on ten people at Year 5. Sensitivity runs from £10.2m to £61.5m of Year-5 revenue
          on the growth assumption alone.
        </p>
        <p class="body reveal" style="--d:.58s;font-size:17px;max-width:1680px;opacity:.75">
          Source: David Tickets business plan v5.1, base case. These are projections, not results —
          the achieved figures are on the traction slide.
        </p>
      </div>`,
  },

  /* 13 — go to market. The maths block was the strongest thing on the
     original slide and was set as small text; it now carries the right. */
  {
    section: 'Go to market',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:1.08fr 0.92fr;align-items:center;gap:90px;height:100%">
        <div>
          <div class="label reveal" style="margin-bottom:26px">Go to market</div>
          <h2 class="display reveal" style="--d:.08s;font-size:58px;line-height:1.08;margin-bottom:34px">
            Agents own the relationships.<br>AI does the work.
          </h2>
          <p class="body reveal" style="--d:.16s;font-size:21px;max-width:720px;margin-bottom:26px">
            <strong style="color:#fff">Five Tour Partnerships Managers</strong> — one genre space each,
            ex-booking-agent profile, already holding the relationships with managers and agents.
          </p>
          <p class="body reveal" style="--d:.22s;font-size:21px;max-width:720px;margin-bottom:26px">
            One point of contact for all of Europe — venue contracting, advancing, withholding tax,
            settlement and marketing, handled by the platform behind them.
          </p>
          <p class="body reveal" style="--d:.28s;font-size:21px;max-width:720px">
            <strong style="color:var(--blue)">Josh Ergatoudis, our first TPM, is in seat</strong> — a career
            booking agent who founded his own agency.
          </p>
        </div>

        <div class="reveal" style="--d:.34s">
          <div class="label" style="font-size:17px;margin-bottom:34px">The maths</div>
          <div style="display:flex;align-items:baseline;gap:20px;margin-bottom:18px">
            <span class="display" style="font-size:80px;line-height:1;color:var(--blue)">6</span>
            <span style="font-family:var(--sans);font-weight:600;font-size:26px;color:var(--head)">TPMs</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:20px;margin-bottom:18px">
            <span class="display" style="font-size:80px;line-height:1;color:var(--blue)">×25</span>
            <span style="font-family:var(--sans);font-weight:600;font-size:26px;color:var(--head)">tours a year</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:20px;margin-bottom:30px">
            <span class="display" style="font-size:80px;line-height:1;color:var(--blue)">×20</span>
            <span style="font-family:var(--sans);font-weight:600;font-size:26px;color:var(--head)">dates</span>
          </div>
          <div class="rule" style="margin:0 0 26px;max-width:640px"></div>
          <div style="font-family:var(--sans);font-weight:800;font-size:34px;letter-spacing:-0.04em;margin-bottom:10px">3,000 shows a year</div>
          <p class="body" style="font-size:20px;max-width:620px">Two tours a month per agent.</p>
        </div>
      </div>`,
  },

  /* 14 — the team. Split out from the original slide 12, which carried four
     people, the use of funds and the closing line together. Four biographies
     at a readable size is a slide on its own. */
  {
    section: 'Team',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Team</div>
        <h2 class="display reveal" style="--d:.08s;font-size:66px;line-height:1.06;max-width:1620px;margin-bottom:24px">
          Founded by two marketing companies.
        </h2>
        <p class="body reveal" style="--d:.14s;font-size:21px;max-width:1560px;margin-bottom:46px">
          Their collective roster includes Bad Bunny, Raye, Thundercat, The Pixies, Swedish House Mafia
          and many others.
        </p>

        <ol class="steps reveal" style="--d:.24s;grid-template-columns:repeat(4,1fr)">
          <li><span>CEO</span>
            <div style="font-family:var(--sans);font-weight:800;font-size:28px;letter-spacing:-0.04em;margin-bottom:12px">PJ Jarrett</div>
            <p class="body" style="font-size:18px;max-width:none">Founder of Sweat Strategies, Sweat Entertainment and Reel:lab. Technical lead — designed and built the David platform end to end.</p></li>
          <li><span>Co-founder</span>
            <div style="font-family:var(--sans);font-weight:800;font-size:28px;letter-spacing:-0.04em;margin-bottom:12px">Tom Rose</div>
            <p class="body" style="font-size:18px;max-width:none">CEO of Grape (formerly Propeller) — artist services across the UK, Germany and Norway: radio &amp; PR, management, label services.</p></li>
          <li><span>Co-founder · CMO</span>
            <div style="font-family:var(--sans);font-weight:800;font-size:28px;letter-spacing:-0.04em;margin-bottom:12px">Tobi Steinborn</div>
            <p class="body" style="font-size:18px;max-width:none">Co-founder of Sweat Strategies. Marketing lead — ran the campaigns behind Rules at £2.55 a ticket and 3,522 ADMT tickets at £2.59.</p></li>
          <li><span>Tour Partnerships Mgr</span>
            <div style="font-family:var(--sans);font-weight:800;font-size:28px;letter-spacing:-0.04em;margin-bottom:12px">Josh Ergatoudis</div>
            <p class="body" style="font-size:18px;max-width:none">Career booking agent — founded his own agency before joining as the first of the five TPMs.</p></li>
        </ol>
      </div>`,
  },

  /* 15 — the ask. Was three qualitative cards and a number. A seed ask
     without a use of funds and a date the money stops being needed is an
     incomplete ask, so the cards now carry the plan's own committed
     spend and the runway sits under them. The three named lines come
     straight out of the model's assumptions tab; the fourth is the
     arithmetic balance of the raise, which is what it actually is.

     Figures are white rather than the accent because the accent and the
     field--dark navy are close enough in value that blue on navy nearly
     disappears. */
  {
    section: 'The ask',
    html: `
      <div class="field field--dark"></div>
      ${blobs([
        { k: 'a', pos: 'right:-300px;top:-260px;opacity:.6' },
        { k: 'b', pos: 'left:-200px;bottom:-380px;opacity:.5' },
      ])}
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:30px">The ask</div>
        <h2 class="display reveal" style="--d:.08s;font-size:120px;line-height:0.96;color:#fff;margin-bottom:20px">
          £1m to go loud.
        </h2>
        <p class="body reveal" style="--d:.14s;font-size:22px;max-width:1560px;margin-bottom:44px">
          Eighteen months of build, five more tour partnerships managers, and the engine pointed at the market.
        </p>

        <ol class="steps reveal" style="--d:.24s;grid-template-columns:repeat(4,1fr);max-width:1728px">
          <li><span>Product</span>
            <div style="font-family:var(--sans);font-weight:800;font-size:46px;letter-spacing:-0.04em;color:#fff;margin-bottom:12px">£594k</div>
            <p class="body" style="font-size:18px;max-width:none">An eighteen-month build sprint. Advancing, settlement and tax through the machine rather than through people.</p></li>
          <li><span>Go to market</span>
            <div style="font-family:var(--sans);font-weight:800;font-size:46px;letter-spacing:-0.04em;color:#fff;margin-bottom:12px">£189k</div>
            <p class="body" style="font-size:18px;max-width:none">The agent conferences — Eurosonic, The Great Escape, ADE, Reeperbahn — and B2B marketing every month.</p></li>
          <li><span>Licences & setup</span>
            <div style="font-family:var(--sans);font-weight:800;font-size:46px;letter-spacing:-0.04em;color:#fff;margin-bottom:12px">£60k</div>
            <p class="body" style="font-size:18px;max-width:none">FCA payments opinion, contract templates, and VAT and tax registration in every territory we sell in.</p></li>
          <li><span>Team & working capital</span>
            <div style="font-family:var(--sans);font-weight:800;font-size:46px;letter-spacing:-0.04em;color:#fff;margin-bottom:12px">£157k</div>
            <p class="body" style="font-size:18px;max-width:none">The balance. Five more TPMs — they are the constraint on how many tours the platform can carry.</p></li>
        </ol>

        <div class="rule reveal" style="--d:.44s;margin:44px 0 30px"></div>
        <p class="display reveal" style="--d:.5s;font-size:34px;line-height:1.24;font-weight:700;letter-spacing:-0.035em;color:#fff;max-width:1620px">
          It is the last money we need. EBITDA-positive April 2027.
        </p>
        <p class="reveal" style="--d:.58s;font-size:24px;font-weight:700;margin-top:30px">
          <a href="https://david.tickets" style="color:#fff;opacity:.95">david.tickets</a>
        </p>
      </div>`,
  },
];
