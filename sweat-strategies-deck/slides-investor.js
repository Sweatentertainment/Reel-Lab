/* ------------------------------------------------------------------
   Sweat Strategies — investor deck

   WHICH DECK THIS IS A VARIANT OF. slides-labels-offer.js. Every
   treatment here is lifted from it — the bracketed act dividers, the
   .steps grid, the bend() artist cards, the roster slide, the big blue
   figures on the commercial slides. Nothing new is designed. What
   changes is the reader: the label deck answers "will this work for my
   record", this one answers "how big does this get, why you, why now,
   and what does my money buy".

   SOURCES. Everything factual comes out of this repo and nowhere else.
   The roster and partner list are ARTISTS and PARTNERS in parts.js. Every
   campaign figure is from cases.js, where each one is read off the
   Spotify or Chartmetric screenshot beside it — spend and CPR come from
   Sweat's own records because the platforms don't report them. The method
   is described in slides-labels-offer.js and slides-cross-platform.js.
   The named team is the one on the Øneheart and M07 team slides
   (slides-oneheart.js, slides-keyfactory.js) — the four names and the
   three role descriptions are theirs, generalised off the single client
   they were written about. The creative volume ("up to twenty-five pieces
   per release, built from the audio alone") and the approve-by-link
   behaviour of sweat.fm are slides-hmwl.js.

   WHAT IS NOT IN THE REPO AND SO IS NOT IN THIS DECK. There is no
   biography for anyone on the team slide — the two bespoke decks give
   Peter Jarrett a role and an accountability, not a career — so the track
   record is marked rather than written. There is no founding date, no
   headcount, no statement about where the team was hired from, and no
   history of what playlists, radio or press used to deliver. An earlier
   cut of this file carried all five and they have been taken out: an
   invented CV on a fundraising deck is the single worst thing this
   document could contain, because it is the one claim a reader can check
   without asking us.

   THE ARGUMENT. Music marketing is still bought on opinion, and Sweat
   turned it into a measurement business — then found that the same
   testing machine that finds a cheap stream also sells a ticket and a
   T-shirt, which is where the margin actually is. Streams are the wedge
   because they are easy to sell and easy to prove; the estate around them
   is the business.

   EVERY FINANCIAL IS A PLACEHOLDER, ON PURPOSE. Revenue, growth,
   retention, margin, headcount, runway, the raise and the valuation are
   things only PJ knows. They are rendered as an unmissable blue [TBC]
   rather than estimated, because a deck with three invented numbers reads
   convincingly and then falls apart in the first diligence call. Slides
   14, 16, 17, 20 and 21 are the ones carrying them.

   WHAT THIS DECK MUST NOT DO.

   1. It must not name a client's spend or cost per result. Ninja Tune,
      Atlantic and the roster are public on the website and safe. What a
      given campaign cost is not, and an investor deck circulates further
      than a proposal does — so every case study here is the anonymised
      cut from cases.js. PJ can upgrade specific ones to `named` if a
      client has agreed.

   2. It must not put a face beside a figure that is not theirs. The
      artist cards sit on slides that make no numerical claim, and the
      case-study slides carry no photography at all.

   3. It must not state a market size it cannot source. Slide 15 argues
      account expansion, which the repo can support. Slide 16 sets the
      market out bottom-up — releases, the share of them with a budget,
      spend per release — and marks all four inputs, because a top-down
      slice of an industry total is what every investor has learned to
      discount and this repo does not carry one anyway. The only market
      figure the deck asserts is the real per-release spend range from
      cases.js, which is on that slide as the anchor.

   4. It must not claim a win rate. PJ says on calls that Sweat wins
      A/B tests against other agencies; that is a sales line, not a
      measured figure, and an investor will ask what the denominator is.

   CURRENCY. The campaigns ran in sterling and dollars and both appear.
   Every figure on slide 10 is labelled with its currency for that reason
   — a reader silently converting is a reader we have misled.
   ------------------------------------------------------------------ */

/* No spine() — see slide 10 for why this deck doesn't carry the centre line. */
import { img, blobs, bend, roster, browser } from './parts.js';
import { anon } from './cases.js';

/* ------------------------------------------------------- local archetypes */

/* A section divider — the bracket motif, straight from the label deck. */
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

/* An outstanding figure. Rendered at full display weight in the accent so
   it cannot be skimmed past — the point of a placeholder is that whoever
   reads the draft trips over it.

   `light` switches it to white for the blue grounds. The accent and the
   field--dark navy are close enough in value that blue-on-navy nearly
   disappears, which is invisible in the source and obvious the moment you
   look at the slide. */
const tbc = (label, { light = false } = {}) => `
  <div>
    <div class="display" style="font-size:92px;line-height:1;color:${light ? '#fff' : 'var(--blue)'}">[TBC]</div>
    <div class="tier" style="margin-top:22px${light ? ';color:#fff;opacity:.75' : ''}">${label}</div>
  </div>`;

export const SLIDES = [
  /* 01 — cover. The artwork carries its own chrome, hence chrome:'none'. */
  {
    section: 'Sweat Strategies',
    chrome: 'none',
    html: `
      <div style="position:absolute;inset:0;z-index:0">
        <img src="${img('cover.jpg')}" alt="" style="width:100%;height:100%;object-fit:cover">
      </div>
      <div class="reveal" style="--d:.5s;position:absolute;left:96px;bottom:172px;z-index:20">
        <div style="font-family:var(--mono);text-transform:uppercase;font-size:26px;letter-spacing:0.24em;color:#fff">
          Sweat Strategies — investment deck
        </div>
      </div>`,
  },

  /* 02 — the one-liner. The sentence a stranger has to be able to repeat
     back correctly, so it names the mechanism rather than the ambition. */
  {
    section: 'The company',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:70px">
        <div>
          <div class="label reveal" style="margin-bottom:40px">What we are</div>
          <h1 class="display reveal" style="--d:.1s;font-size:110px;line-height:0.98">Music<br>marketing,<br>measured.</h1>
          <p class="body reveal" style="--d:.24s;font-size:25px;max-width:560px;margin-top:44px">
            We test every part of a record against real audiences before anyone spends
            at scale, then put the budget behind the version that already won. The
            output is a cost per result a label can plan against.
          </p>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;gap:48px">
          ${bend({ src: 'artist__disclosure__lens.jpg', name: 'Disclosure', w: 260, h: 286, soft: true })}
          ${bend({ src: 'artist__thundercat__lens.jpg', name: 'Thundercat', w: 240, h: 292, right: true })}
        </div>
      </div>`,
  },

  /* 03 — why now. An earlier cut argued this off the decline of playlists,
     radio and press over five years, and off PJ having watched it from
     inside a label. Neither is in this repo and neither is ours to assert
     on a fundraising deck, so the slide now argues the change off our own
     campaigns instead: a record with no editorial behind it and no social
     following goes from nothing to a scaled audience in three weeks, and
     an eleven-year-old catalogue track moves without a new recording.
     Both are in cases.js and both are checkable. */
  {
    section: 'The company',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Why now</div>
        <h2 class="display reveal" style="--d:.08s;font-size:76px;line-height:1.04;max-width:1500px;margin-bottom:44px">
          A record no longer needs<br>anyone's permission.
        </h2>

        <ol class="steps reveal" style="--d:.2s;grid-template-columns:repeat(3,1fr);max-width:1560px">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">The audience can be bought directly</div>
            <p class="body" style="font-size:19px;max-width:none">Two of the campaigns in this deck went from nothing on release day to 18,000 and 25,000 streams a day inside three weeks. A third was a debut from an artist with no social media at all.</p></li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">And the catalogue can be reopened</div>
            <p class="body" style="font-size:19px;max-width:none">An eleven-year-old record moved 4.3 million streams in 28 days with no new recording behind it. Catalogue does not decay on its own — it decays when nobody works it.</p></li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">But it is still bought on opinion</div>
            <p class="body" style="font-size:19px;max-width:none">The money moved and the method did not. Most of it is still spent on a handful of edits somebody liked, with no read on whether another would have worked better.</p></li>
        </ol>
      </div>`,
  },

  /* 04 — the problem. The label deck's slide, and the right one: it states
     a mechanism rather than accusing whoever currently runs the budget. */
  {
    section: 'The company',
    html: `
      <div class="field"></div>
      ${blobs([
        { k: 'a', pos: 'left:-180px;top:-260px' },
        { k: 'c', pos: 'right:6%;top:-200px;opacity:.85' },
        { k: 'b', pos: 'left:32%;bottom:-420px;opacity:.6' },
      ])}
      <div class="pad l-end">
        <div style="display:grid;grid-template-columns:1.05fr 0.72fr;align-items:end;gap:150px">
          <h2 class="display reveal" style="font-size:62px;font-weight:700;letter-spacing:-0.035em;line-height:1.12">
            A few edits go out. Nobody ever finds out whether a different one would have worked better.
          </h2>
          <p class="body reveal" style="--d:.2s;max-width:none;padding-bottom:12px">
            That is not a criticism of anyone's team — it is what the workflow allows.
            Assets arrive, spend goes behind them, and the numbers come back after the
            money has gone. When it underperforms there is no way to tell whether it was
            the record, the audience or the edit, because only a handful ever ran.
          </p>
        </div>
      </div>`,
  },

  act({ label: 'The product', line: 'We sell measurement' }),

  /* 06 — the method. The actual differentiator and the thing that is hard
     to copy, so it gets stated as a process rather than as adjectives. */
  {
    section: 'The product',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">How it works</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1440px;margin-bottom:26px">
          We don't launch creative. We find out which creative works, then launch that.
        </h2>
        <p class="body reveal" style="--d:.16s;font-size:22px;max-width:1440px;margin-bottom:46px">
          A campaign starts as an experiment costing a couple of hundred and finishes as
          a scaling decision made on arithmetic. The expensive part of music marketing is
          not the media — it is spending it behind the wrong thirty seconds.
        </p>

        <ol class="steps reveal" style="--d:.26s;grid-template-columns:repeat(4,1fr)">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Test the song</div>
            <p class="body" style="font-size:18px;max-width:none">Every section of the record against a control visual, so the hook is measured rather than chosen.</p></li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Build to the winner</div>
            <p class="body" style="font-size:18px;max-width:none">Up to twenty-five variants cut to the winning sound, from the audio alone, run against each other until the cost stops falling.</p></li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Read the country</div>
            <p class="body" style="font-size:18px;max-width:none">Cost per result weighed against how much each market actually listens. Cheapest and most valuable are rarely the same place.</p></li>
          <li><span>04</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Scale, or stop</div>
            <p class="body" style="font-size:18px;max-width:none">A read in 72 hours. Most records don't earn the budget, and saying so early is the service.</p></li>
        </ol>
      </div>`,
  },

  /* 07 — the platform. sweat.fm is named twice later as the thing that
     makes the business look less like an agency, so it has to be seen
     rather than asserted. The drawn browser() frame, not laptop(): the
     laptop mockup in the library is an unlicensed iStock comp and this
     document goes to investors and their lawyers. Copy is the reporting
     slide from slides-hmwl.js, unchanged. */
  {
    section: 'The product',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.76fr 1.24fr;align-items:center;gap:70px">
        <div>
          <h2 class="display reveal" style="font-size:56px;letter-spacing:-0.04em;line-height:1.28;margin-bottom:16px">
            <span class="hl">A dashboard, daily.</span>
          </h2>
          <h2 class="display reveal" style="--d:.12s;font-size:56px;letter-spacing:-0.04em;line-height:1.12;color:var(--head);margin-bottom:40px">
            Every record on it.
          </h2>
          <p class="body reveal" style="--d:.24s;font-size:23px">
            Sweat.fm is our own platform rather than a third-party dashboard. Every
            test, every cost per result, every market, updated daily. Creative comes
            to the client as a link — they click approve and the system does the rest.
          </p>
        </div>
        <div class="reveal" style="--d:.32s;max-width:1000px;justify-self:center;width:100%">
          ${browser({ src: 'dashboard.jpg', alt: 'Sweat.fm dashboard: per-artist monthly listeners, streams, saves and playlist adds tracked daily' })}
        </div>
      </div>`,
  },

  /* 08–09 — the proof, and the order matters. Two cold starts on dance
     records months apart, landing in the same shape on similar money, is a
     claim about repeatability rather than about size. An investor will
     spend longer on these two slides than on any other in the deck.
     Anonymised, because this document circulates. */
  anon.cristoph,
  anon.kogis,

  /* 10 — the slide the whole raise rests on. The same testing machine
     pointed at a ticket and at a T-shirt, both roughly eleven to one.
     Currencies are labelled because they genuinely differ. */
  {
    section: 'The product',
    grain: 'soft',
    html: `
      ${/* NO SPINE HERE. It was drawn at dx -55, which is genuinely the
            gutter of the two-column grid below — but the label, the headline
            and the body above it run the full width, so the line came down
            through "They are not the business." and clipped the full stop.
            engine.md's advice about nudging the spine into a gutter only
            holds when the whole slide is that grid; this one is a header
            plus a grid, and there is no x that misses both. Left out
            rather than forced. */ ''}
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">The same machine, pointed elsewhere</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1500px;margin-bottom:26px">
          Streams are the wedge.<br>They are not the business.
        </h2>
        <p class="body reveal" style="--d:.16s;font-size:22px;max-width:1500px;margin-bottom:52px">
          A cheap stream is easy to sell and easy to prove, which is how we get in. But an
          audience that has been found and measured converts to things worth considerably
          more than a stream, and the campaign that does it is the same campaign.
        </p>

        <div class="reveal" style="--d:.28s;display:grid;grid-template-columns:1fr 1fr;gap:110px;max-width:1620px">
          <div>
            <div class="label" style="font-size:18px;margin-bottom:24px">Touring artist · ticketing · £</div>
            <h3 class="display" style="font-size:46px;line-height:1.04;margin-bottom:30px">5,000 tickets<br>on £6K of spend.</h3>
            <dl class="stats" style="gap:64px">
              <div><dt>Gross ticket revenue</dt><dd>£66K</dd></div>
              <div><dt>Return on ad spend</dt><dd>11:1</dd></div>
            </dl>
            <p class="body" style="font-size:18px;max-width:600px;margin-top:30px;opacity:.8">
              Awareness built on DSP ads, converted by retargeting the fans already listening.
            </p>
          </div>
          <div>
            <div class="label" style="font-size:18px;margin-bottom:24px">Merch · two weeks · $</div>
            <h3 class="display" style="font-size:46px;line-height:1.04;margin-bottom:30px">$68K of merch<br>on $6K of spend.</h3>
            <dl class="stats" style="gap:64px">
              <div><dt>Campaign length</dt><dd>2 wks</dd></div>
              <div><dt>Return on ad spend</dt><dd>11:1</dd></div>
            </dl>
            <p class="body" style="font-size:18px;max-width:600px;margin-top:30px;opacity:.8">
              A streaming audience converted into buyers, on the same accounts and the same method.
            </p>
          </div>
        </div>
      </div>`,
  },

  act({ label: 'The business', line: 'Who already buys it', mod: 'field--dark' }),

  /* 12 — the roster. The hardest slide in the deck to argue with, and the
     one piece of evidence that needs no explanation.

     It takes the `note`, which the other proposals leave empty: this deck
     runs the anonymised case studies, and a named roster sitting eight
     slides after four anonymised campaigns needs to say plainly that the
     two are not a matching exercise. */
  roster({
    note: `Campaign figures in this deck are anonymised. The artists and partners
           above are published on sweatstrategies.com.`,
  }),

  /* 13 — the model. How revenue behaves, stated as a mechanism so the
     scaling question answers itself. */
  {
    section: 'The business',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">How we make money</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1440px;margin-bottom:26px">
          A retainer to think,<br>a percentage to scale.
        </h2>
        <p class="body reveal" style="--d:.16s;font-size:22px;max-width:1440px;margin-bottom:46px">
          Clients pay a monthly fee that covers testing, creative and reporting, plus a
          commission on the media we scale once a record has earned it. The fee makes the
          revenue predictable; the commission means we are paid more when the client
          spends more, and the client only spends more when something is working.
        </p>

        <ol class="steps reveal" style="--d:.26s;grid-template-columns:repeat(3,1fr);max-width:1560px">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">Recurring by default</div>
            <p class="body" style="font-size:19px;max-width:none">Labels release continuously, so the work is a standing operation rather than a project. Retainers run monthly or quarterly.</p></li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">Upside tied to results</div>
            <p class="body" style="font-size:19px;max-width:none">Commission on scaled media only. A campaign we stop early costs the client nothing more and costs us nothing to have run.</p></li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">Priced per test, not per hour</div>
            <p class="body" style="font-size:19px;max-width:none">The unit is a record tested, which is why the same team can carry many more clients than a headcount model would allow.</p></li>
        </ol>
      </div>`,
  },

  /* 14 — the numbers. Deliberately unfinished. These are the figures an
     investor reads first and the ones this repo cannot source, so they are
     marked rather than estimated. */
  {
    section: 'The business',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Where we are · to be supplied</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1440px;margin-bottom:46px">
          ${/* an earlier cut opened this "the agency is roughly a year old",
                which is not in the repo and is exactly the kind of fact a
                reader checks on Companies House before the first call */ ''}
          Where the trading<br>figures sit.
        </h2>

        <div class="reveal" style="--d:.2s;display:grid;grid-template-columns:repeat(4,1fr);gap:80px;max-width:1620px;margin-bottom:48px">
          ${tbc('Annual run rate')}
          ${tbc('Growth, year on year')}
          ${tbc('Clients on retainer')}
          ${tbc('Net revenue retention')}
        </div>

        <div class="rule reveal" style="--d:.36s;margin:0 0 32px"></div>
        <p class="body reveal" style="--d:.42s;font-size:21px;max-width:1500px">
          <strong style="color:var(--blue)">These four come out of Sweat's own accounts</strong>
          and are left blank in this draft rather than estimated — an estimate here is the
          first thing to come apart in diligence. Everything else in this deck is checkable:
          the roster, the partners and every campaign figure are real and documented.
        </p>
      </div>`,
  },

  /* 15 — land and expand. The growth argument the evidence actually
     supports: we enter on streaming and the same relationship covers more
     of the estate over time. The sizing is left open on purpose. */
  {
    section: 'The business',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">How an account grows</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1440px;margin-bottom:46px">
          We arrive on one record<br>and end up on the estate.
        </h2>

        <ol class="flow reveal" style="--d:.18s;grid-template-columns:repeat(5,1fr);max-width:1728px">
          ${[
            { n: 'Entry', t: 'One record', b: 'A single test on a single release. Small, cheap, and easy to say yes to.' },
            { n: 'Then', t: 'The catalogue', b: 'The back catalogue is where the cost per result is lowest and nobody is working it.' },
            { n: 'Then', t: 'First-party data', b: 'Capture flows turning the audience the ads found into a list the artist owns.' },
            { n: 'Then', t: 'Live and merch', b: 'The same audience, converted to the things that actually carry margin.' },
            { n: 'Now', t: 'The whole estate', b: 'Every channel, one operation, one dashboard — and a much larger share of the budget.', human: true },
          ].map((s, i) => `
            <li class="flow__node${i === 4 ? ' flow__node--human' : ''}">
              <div class="flow__n">${s.n}</div>
              <div class="flow__t">${s.t}</div>
              <p class="flow__b">${s.b}</p>
            </li>`).join('')}
        </ol>

        <div class="rule reveal" style="--d:.42s;margin:52px 0 30px"></div>
        <p class="body reveal" style="--d:.48s;font-size:21px;max-width:1560px">
          Each step is already running somewhere on the book: the catalogue cases, the
          capture flows, the ticketing and the merch campaign are all in this deck. What
          the next slide sizes is how much of that estate there is to go at.
        </p>
      </div>`,
  },

  /* 16 — the market, built upwards. An earlier cut of this deck had no
     market slide and a line on the slide before saying one was still to
     be done, which on a fundraising deck reads as an admission rather
     than as a decision. This is the honest version: the four inputs a
     bottom-up size needs, each one marked, and the one market figure the
     repo genuinely supports — the real per-release spend range out of
     cases.js — underneath as the anchor.

     A top-down slice of an industry total would have been easy to write
     and is the version every investor has learned to discount. */
  {
    section: 'The business',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">The market · inputs to confirm</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1440px;margin-bottom:26px">
          Sized from what one<br>release actually costs.
        </h2>
        <p class="body reveal" style="--d:.16s;font-size:22px;max-width:1440px;margin-bottom:44px">
          Built upwards from a release rather than downwards from an industry total.
          Four inputs, each one confirmable from our own book and from the terms we
          already sell on.
        </p>

        <ol class="steps reveal" style="--d:.24s;grid-template-columns:repeat(4,1fr)">
          ${[
            { n: '01', t: 'Releases a year', b: 'Inside the labels, distributors and management companies we already sell to.' },
            { n: '02', t: 'That carry a budget', b: 'The share of them with real marketing money behind them rather than a post and a hope.' },
            { n: '03', t: 'Spend per release', b: 'What one release absorbs in testing and scaled media across its window.' },
            { n: '04', t: 'Share we can hold', b: 'The three above multiplied, then the part of it one operation can actually run.' },
          ].map((s) => `
            <li><span>${s.n}</span>
              <div style="margin-bottom:12px"><span class="display" style="font-size:52px;line-height:1;color:var(--blue)">[TBC]</span></div>
              <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">${s.t}</div>
              <p class="body" style="font-size:18px;max-width:none">${s.b}</p></li>`).join('')}
        </ol>

        <div class="rule reveal" style="--d:.4s;margin:44px 0 28px"></div>
        <p class="body reveal" style="--d:.46s;font-size:21px;max-width:1560px">
          What we can already anchor: the campaigns in this deck ran on anything from
          £1,500 a month against a catalogue album to £22,000 across a single EP window,
          and one US account sustained $1,000–$3,000 a month for six months.
        </p>
      </div>`,
  },

  /* 17 — the team. The four names and the three role descriptions are the
     Øneheart and M07 team slides, generalised off the one client they were
     written about. Nothing else about these people is in the repo.

     An earlier cut of this slide gave PJ a twenty-year CV — A&R at three
     majors, advertising in Amsterdam, a label of his own — and said the
     team had been hired out of ecommerce rather than music. None of that
     is anywhere in this repository. It is also the single most checkable
     thing on a fundraising deck, so it is now a marked gap rather than a
     paragraph. The role line is "Orchestrator", which is the title the two
     bespoke decks actually use for him; "Founder" was an inference. */
  {
    section: 'The business',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Who does it</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1400px;margin-bottom:40px">
          One team, and one<br>person accountable.
        </h2>

        <div class="reveal" style="--d:.16s;max-width:1500px">
          <div style="display:flex;align-items:baseline;gap:26px;margin-bottom:14px">
            <div style="font-family:var(--sans);font-weight:800;font-size:44px;letter-spacing:-0.04em">Peter Jarrett</div>
            <div style="font-family:var(--mono);text-transform:uppercase;font-size:19px;letter-spacing:0.16em;color:var(--blue)">Orchestrator</div>
          </div>
          <p class="body" style="font-size:21px;max-width:1300px">
            Sits above every campaign and is accountable for the operation as a whole —
            the plan, the partners and the commercial terms.
          </p>
        </div>

        <div class="rule reveal" style="--d:.26s;margin:40px 0 36px"></div>

        <ol class="steps reveal" style="--d:.32s;grid-template-columns:repeat(3,1fr)">
          <li><span>Senior Marketing Director</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">Tobias Steinborn</div>
            <p class="body" style="font-size:19px;max-width:none">Holds the campaigns across clients and partners, and owns the weekly rhythm every account runs to.</p></li>
          <li><span>Campaign Strategist</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">Oskar</div>
            <p class="body" style="font-size:19px;max-width:none">Designs what gets tested, against whom, and what each result changes about the next release.</p></li>
          <li><span>Paid media</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">Holly</div>
            <p class="body" style="font-size:19px;max-width:none">Daily hands on the accounts — building the tests, killing what fails, scaling what clears.</p></li>
        </ol>

        <div class="rule reveal" style="--d:.44s;margin:36px 0 26px"></div>
        <div class="reveal" style="--d:.5s;display:flex;align-items:center;gap:40px">
          <div>
            <div class="tier">Track record &amp; headcount</div>
            <div class="display" style="font-size:56px;line-height:1;color:var(--blue)">[TBC]</div>
          </div>
          <p class="body" style="font-size:20px;max-width:1100px;opacity:.8;margin:0">
            What each of them ran before this, and who else is on payroll. Worth writing
            properly — for most investors the team slide is the one that decides it.
          </p>
        </div>
      </div>`,
  },

  act({ label: 'The raise', line: 'What the money does' }),

  /* 19 — the plan. Structured so PJ can drop real commitments in without
     rewriting the slide. */
  {
    section: 'The raise',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">The next eighteen months</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1440px;margin-bottom:46px">
          More accounts, and more<br>of each account.
        </h2>

        <ol class="steps reveal" style="--d:.2s;grid-template-columns:repeat(2,1fr);max-width:1500px;row-gap:44px">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">Sell the estate, not the record</div>
            <p class="body" style="font-size:19px;max-width:none">The existing accounts are the cheapest growth available. Ticketing, merch and first-party data are already built and already proven inside them.</p></li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">Productise the testing</div>
            <p class="body" style="font-size:19px;max-width:none">Creative is already built from the audio alone — up to twenty-five pieces per release. The further that goes, the more records one strategist can carry, which is the whole margin question.</p></li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">Sweat.fm as the surface</div>
            <p class="body" style="font-size:19px;max-width:none">Clients already approve creative and read results there. It is the part of the business that looks least like an agency and most like software.</p></li>
          <li><span>04</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">Depth in electronic, then out</div>
            <p class="body" style="font-size:19px;max-width:none">The roster is concentrated in dance and electronic, which is where the method was proven. The catalogue cases show it travels.</p></li>
        </ol>
      </div>`,
  },

  /* 20 — use of funds. Split marked rather than invented. */
  {
    section: 'The raise',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Use of funds</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1440px;margin-bottom:46px">
          Three places,<br>in this order.
        </h2>

        <div class="reveal" style="--d:.2s;display:grid;grid-template-columns:repeat(3,1fr);gap:110px;max-width:1500px;margin-bottom:44px">
          <div>
            ${tbc('Engineering')}
            <p class="body" style="font-size:19px;max-width:none;margin-top:16px">The creative system and sweat.fm — the two things that decide how many records one person can carry.</p>
          </div>
          <div>
            ${tbc('Strategists')}
            <p class="body" style="font-size:19px;max-width:none;margin-top:16px">Client capacity is the binding constraint on new business today, and strategists are what relieves it.</p>
          </div>
          <div>
            ${tbc('Working capital')}
            <p class="body" style="font-size:19px;max-width:none;margin-top:16px">Media is frequently fronted before it is recovered. Growth in an agency is largely a cash-timing problem.</p>
          </div>
        </div>

        <div class="rule reveal" style="--d:.36s;margin:0 0 30px"></div>
        <p class="body reveal" style="--d:.42s;font-size:21px;max-width:1500px">
          The three headings are the argument and they hold whatever the split turns out to
          be. The percentages are set with the round.
        </p>
      </div>`,
  },

  /* 21 — the ask. The one slide that cannot go out with a placeholder on
     it, which is exactly why it is marked this loudly. */
  {
    section: 'The raise',
    html: `
      <div class="field field--dark"></div>
      ${blobs([
        { k: 'a', pos: 'right:-300px;top:-260px;opacity:.6' },
        { k: 'b', pos: 'left:-200px;bottom:-380px;opacity:.5' },
      ])}
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:34px">The ask</div>
        <h2 class="display reveal" style="--d:.08s;font-size:76px;line-height:1.04;margin-bottom:52px">
          What we are raising,<br>and what closes it.
        </h2>

        <div class="reveal" style="--d:.2s;display:grid;grid-template-columns:repeat(4,1fr);gap:80px;max-width:1620px">
          ${tbc('Amount', { light: true })}
          ${tbc('Instrument', { light: true })}
          ${tbc('Valuation', { light: true })}
          ${tbc('Committed so far', { light: true })}
        </div>

        <div class="rule reveal" style="--d:.36s;margin:56px 0 30px"></div>
        <p class="body reveal" style="--d:.42s;font-size:21px;max-width:1500px">
          ${/* was "...the four things nobody but PJ can supply", which is a
                note to the author sitting on a slide addressed to a reader.
                The marker stays loud; the sentence is now the reader's. */ ''}
          <strong style="color:#fff">This deck does not go out with this slide unfinished.</strong>
          Amount, instrument, valuation and what is already committed are the four things
          a reader checks first, and they are the four this draft does not yet carry.
        </p>
      </div>`,
  },

  /* 22 — close */
  {
    section: 'Next',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:82px;line-height:1.08;margin-bottom:28px">
          The evidence is<br>already written down.
        </h2>
        <p class="body reveal" style="--d:.12s;font-size:23px;max-width:1400px;margin-bottom:48px">
          Every campaign figure in this deck comes off a screenshot we can show you, on
          accounts you can be walked through live. The quickest way to test whether any of
          this is real is to ask for that walkthrough.
        </p>
        <ol class="steps reveal" style="--d:.2s;max-width:1620px">
          <li><span>01</span>A session in the ad accounts and in sweat.fm, with the back end open.</li>
          <li><span>02</span>The client book, the contracts and the accounts.</li>
          <li><span>03</span>The trading figures, and the terms.</li>
        </ol>
        <div class="rule reveal" style="--d:.36s;margin:56px 0 36px"></div>
        <p class="reveal" style="--d:.44s;font-size:30px;font-weight:700">
          <a href="mailto:pj@sweatstrategies.com" style="color:var(--blue)">pj@sweatstrategies.com</a>
        </p>
      </div>`,
  },
];
