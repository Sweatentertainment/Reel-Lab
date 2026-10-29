/* ------------------------------------------------------------------
   House Music With Love — the autumn test
   Bespoke proposal for Alex Esser, House Music With Love (Malmö).

   A VARIANT OF THE LABEL DECK, NOT A NEW DESIGN. The bones are
   slides-labels-offer.js — problem, difference, process, verdict,
   reporting, offer — and every treatment is lifted from it: the whole
   cover, the roster slide, the bracketed section titles, the bent artist
   cards on the process slides, the blue figures on the offer. What
   changes is that this one argues about one number instead of a method.

   Sources: the 13 August call (Lightfield mtg_cmsi0jdxt0pmaokpn159e5z7p,
   transcript and summary) and Alex's two emails of the same day. Every
   figure attributed to HMWL is his, said out loud on the call: 650K
   Spotify playlist followers, 250K on SoundCloud, €6,000 a month on
   playlist ads, 14–30 cents CPR through HypeEdit, two releases every two
   weeks, a Meta pixel running five years, and the target of "at least 2
   or 3,000 plays a day… around 10K a day is what we are looking for".

   THE ARGUMENT IS HIS, AND SO IS THE FORMAT OF IT. He said he wants to
   "A/B test against an agency which seems to be specialised in this",
   and PJ said "whenever we're A/B tested against another agency, we
   always win". So the deck does not ask to replace anything. It proposes
   the test he already said he wanted, and spends its middle showing what
   would move the number. The economics are PJ's own line: at €6,000 a
   month, a third off the CPR pays the fee, and a third is less than the
   spread already sitting between his best market and his worst.

   FIVE THINGS THIS DECK MUST NOT DO.

   1. It must not pitch playlist curation. "We prefer to do the playlists
      by ourselves as well." We advertise to the playlists; we do not ask
      to run them. Slide 17 says so in as many words, because it is the
      single most likely reason for him to say no.

   2. It must not tell him to rip out HypeEdit. His pixel has "been
      working quite well for five years". PJ offered our own link with
      "slightly deeper data" — offered, not insisted, and that is how it
      is written.

   3. It must not criticise his current campaigns or his numbers. He is
      ex-Deezer (Head of the Nordics) and came from finance and start-up
      investing before that. He will read a deck the way an investor
      reads one. The 14–30 cent band is therefore presented as arithmetic
      — a spread that is itself the opportunity — not as a failing.

   4. It must not pretend the fee is small at his current spend. He spotted
      it on the call: "we don't really spend 20,000 per month". At €6,000
      a month the 10% is €600 and the €2,000 minimum is what he would pay,
      so the deck states that plainly and puts the break-even beside it
      rather than hoping he does not multiply.

   5. It must not overclaim the result. "Below ten in tier one" is PJ's
      typical range, not a promise, and the deck marks it as a projection
      on his own numbers. The whole point of proposing a test is that the
      test settles it.

   Not pitched, because they did not come up as an offer on the call:
   Real Lab, the grapevine ticketing partnership, and anything to do with
   touring. HMWL is a label with playlists, not a live operation.

   CASE STUDIES ARE THE ANONYMISED CUT. PJ told him on the call the case
   studies are anonymised — "the names are blurred" — and Alex said "I'm
   fine with that". So the three proof slides come from `anon`, not
   `named`, and the roster slide does the naming instead. He asked for
   two things by email: case studies with example CPRs, and links to a
   few electronic campaigns. This deck answers the first; the second is
   an email, not a slide.

   ONE NAME DELIBERATELY LEFT OUT. He named two autumn priorities: Hernán
   Cattáneo, and a six-million-monthly-listener act the transcript renders
   as "Swedish Gnarly", which is almost certainly a mishearing. Cattáneo
   is named because he appears in Alex's own email signature too; the
   other is referred to by its listener count only. Getting an artist's
   name wrong on page four of a proposal is not recoverable.
   ------------------------------------------------------------------ */

import { img, spine, blobs, bend, roster, browser } from './parts.js';
import { anon } from './cases.js';

export const SLIDES = [
  /* 01 — cover. Miguel's original, used whole with its baked-in chrome,
     exactly as the label deck opens. The project line sits on the deck's
     own 96px gutter, low left, where the ground is already dark. */
  {
    section: 'Proposal',
    chrome: 'none',
    html: `
      <div style="position:absolute;inset:0;z-index:0">
        <img src="${img('cover.jpg')}" alt="" style="width:100%;height:100%;object-fit:cover">
      </div>
      <div class="reveal" style="--d:.5s;position:absolute;left:96px;bottom:172px;z-index:20">
        <div style="font-family:var(--mono);text-transform:uppercase;font-size:26px;letter-spacing:0.24em;color:#fff">
          House Music With Love — autumn 2026
        </div>
      </div>`,
  },

  /* 02 — the hook. His number, not ours. Set under a label rather than in
     quotation marks: he said the longer, looser version of this on the
     call and a tightened paraphrase in quote marks with his name on it
     would be putting words in his mouth. */
  {
    section: 'Proposal',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:70px">
        <div>
          <div class="label reveal" style="margin-bottom:40px">The target, in your words</div>
          <h1 class="display reveal" style="--d:.1s;font-size:132px;line-height:0.96">10,000<br>a day.</h1>
          <p class="body reveal" style="--d:.24s;font-size:25px;max-width:540px;margin-top:44px">
            Two or three thousand plays a day to justify the signing, ten thousand
            to call it a win. This proposal is about one thing only: what each of
            those plays costs you, and how much lower that number can go.
          </p>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;gap:48px">
          ${bend({ src: 'artist__disclosure__lens.jpg', name: 'Disclosure', w: 260, h: 286, soft: true })}
          ${bend({ src: 'artist__blondish__lens.jpg', name: 'Blond:Ish', w: 240, h: 292, right: true })}
        </div>
      </div>`,
  },

  /* 03 — the roster, in the same position the label deck puts it. A label
     reading a cold proposal wants to know who we are before it will
     entertain our theory of its problem. */
  roster(),

  /* 04 — what is already working. Deliberately generous and entirely his
     own figures: this is a label running a competent operation, and the
     deck has to say so before it says anything about the cost. */
  {
    section: 'The problem',
    grain: 'soft',
    html: `
      ${/* clear of the third column, which ends at 1596 */ ''}
      ${spine('', 750)}
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">Where you are</div>
        <h2 class="display reveal" style="--d:.08s;font-size:76px;line-height:1.04;max-width:1400px;margin-bottom:44px">
          None of this needs<br>fixing.
        </h2>

        <ol class="steps reveal" style="--d:.2s;grid-template-columns:repeat(3,1fr);max-width:1500px;row-gap:44px">
          <li><span>Reach</span>
            <p class="body" style="font-size:19px;max-width:none">650,000 followers across the Spotify playlists and 250,000 on SoundCloud, built over ten years from a blog rather than bought.</p></li>
          <li><span>Cadence</span>
            <p class="body" style="font-size:19px;max-width:none">Two releases every two weeks, so every record gets a fortnight of actual promotion rather than a launch day.</p></li>
          <li><span>Discipline</span>
            <p class="body" style="font-size:19px;max-width:none">Tier one only — US, UK, France, Sweden, Germany — and a deliberate no to the markets where the traffic is cheap and the royalty is a tenth.</p></li>
          <li><span>Infrastructure</span>
            <p class="body" style="font-size:19px;max-width:none">A Meta pixel that has been learning for five years, HypeEdit for the links, and VPN checks on the playlist positions worldwide.</p></li>
          <li><span>Strategy</span>
            <p class="body" style="font-size:19px;max-width:none">Per-single spend on top of the playlist budget, because it moves passive listeners into active ones and that is what feeds Discovery Mode.</p></li>
          <li><span>Roster</span>
            <p class="body" style="font-size:19px;max-width:none">Ninety-odd artists, and an autumn that opens with Hernán Cattáneo and a six-million-monthly-listener release.</p></li>
        </ol>

        <div class="rule reveal" style="--d:.4s;margin:52px 0 32px"></div>
        <p class="body reveal" style="--d:.46s;font-size:24px;max-width:1400px">
          There is one number in the whole operation with real room left in it, and it is the cost.
        </p>
      </div>`,
  },

  /* 05 — the problem, set as his own figure. The label deck uses a bracket
     title here; the bracket is doing more work in this one because the
     number inside it is the client's. */
  {
    section: 'The problem',
    grain: true,
    html: `
      <div class="pad l-centre">
        <h2 class="display display--m reveal"><span class="bracket">14 to 30 cents</span></h2>
      </div>`,
  },

  /* 06 — why the band matters. Stated as arithmetic rather than as a
     failing: he is ex-Deezer and came out of finance, and the fastest way
     to lose him is a slide that reads as a critique of his media buying. */
  {
    section: 'The problem',
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
            The spread is the opportunity. Your worst market already costs twice your best one.
          </h2>
          <p class="body reveal" style="--d:.2s;max-width:none;padding-bottom:12px">
            That is not a criticism of how the campaigns are run — it is what happens
            when the creative is fixed and only the targeting moves. The band tells you
            the audience is reachable at fourteen; what it does not tell you is which
            sound, which edit and which second of the record got you there, because
            only a handful of variations ever ran.
          </p>
        </div>
      </div>`,
  },

  /* 07 — the arithmetic. The most important slide in the deck for this
     reader. Everything on it is either his figure or PJ's stated typical
     range, and the projection is labelled as one. The final line is the
     honest version of PJ's "break even instantly": a third off is inside
     the spread he already lives with. */
  {
    section: 'The problem',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">The same €6,000 a month</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1440px;margin-bottom:46px">
          A third off pays for us.<br>The rest is yours.
        </h2>

        ${/* equal columns rather than auto: with `auto` the widths follow the
               copy underneath, and the three figures end up unevenly spaced */ ''}
        <div class="reveal" style="--d:.2s;display:grid;grid-template-columns:repeat(3,1fr);gap:110px;max-width:1400px;margin-bottom:52px">
          <div>
            <div class="display" style="font-size:92px;line-height:1;color:var(--head)">20¢</div>
            <div class="tier" style="margin-top:22px;color:var(--head)">Today, mid-band</div>
            <p class="body" style="font-size:19px;max-width:none;margin-top:16px">30,000 results a month.</p>
          </div>
          <div>
            <div class="display" style="font-size:92px;line-height:1;color:var(--blue)">13¢</div>
            <div class="tier" style="margin-top:22px">Break-even</div>
            <p class="body" style="font-size:19px;max-width:none;margin-top:16px">The same 30,000 results, and the fee has paid for itself.</p>
          </div>
          <div>
            <div class="display" style="font-size:92px;line-height:1;color:var(--blue)">10¢</div>
            <div class="tier" style="margin-top:22px">Tier one, typical</div>
            <p class="body" style="font-size:19px;max-width:none;margin-top:16px">60,000 results for the same money.</p>
          </div>
        </div>

        <div class="rule reveal" style="--d:.36s;margin:0 0 32px"></div>
        <p class="body reveal" style="--d:.42s;font-size:23px;max-width:1500px">
          <strong style="color:var(--blue)">A third is less than the distance you already cover.</strong>
          Fourteen to thirty is a spread of more than half. We are proposing to close a third
          of it — and to find out inside a week rather than argue about it. Ten cents is where
          we normally land in tier one on playlist campaigns; it is a projection on your
          numbers, not a promise, which is exactly why the next section is a test.
        </p>
      </div>`,
  },

  /* 08 — section title. PJ's own framing of the engagement, and Alex's:
     he said he wanted to A/B test an agency, PJ said we always win one. */
  {
    section: 'The process',
    html: `
      <div class="field"></div>
      ${blobs([
        { k: 'c', pos: 'left:8%;top:-240px;opacity:.8' },
        { k: 'a', pos: 'right:-180px;bottom:-300px;opacity:.55' },
      ])}
      <div class="pad l-centre">
        <h2 class="display display--l reveal" style="color:#fff"><span class="bracket bracket--light">So A/B test us</span></h2>
      </div>`,
  },

  /* 09–12 — the four steps, in the label deck's treatment. Steps 01–03 are
     the house method; 04 is the one written specifically for this label,
     because advertising into a playlist placement is a different exercise
     from advertising a track and it is where most of his money goes.

     Faces are house and electronic throughout and ordered by profile,
     biggest first — this deck goes to a house label, so the artists on it
     should be the ones that buy us the meeting. */
  ...[
    {
      n: '01', title: 'Find the sound',
      body: 'Every section of the record runs against a control visual until one of them wins on cost. The hook stops being an opinion.',
      src: 'artist__bonobo-compress__lens.jpg', name: 'Bonobo',
    },
    {
      n: '02', title: 'Test the content at scale',
      body: 'Up to twenty-five pieces per release, built from the audio alone. You send us the track; nothing else is asked of the artist.',
      src: 'artist__the-knocks-compress__lens.jpg', name: 'The Knocks',
    },
    {
      n: '03', title: 'Read the country, not just the cost',
      body: 'If the US converts at fourteen and Germany at sixteen but Germany listens 0.7 times more, the spend belongs in Germany. Cheapest and most valuable are rarely the same market.',
      src: 'artist__st-lundi__lens.jpg', name: 'St Lundi',
    },
    {
      n: '04', title: 'Advertise into the playlist',
      body: 'New track in the top five, then drive to the song in its playlist context rather than on its own. It reads as discovery instead of an advert, and the save rate goes with it.',
      src: 'Morly__lens.jpg', name: 'Morly',
    },
  ].map((s, k) => ({
    section: 'The process',
    grain: 'soft',
    html: `
      ${spine()}
      <div class="pad l-split" style="align-items:center;gap:70px">
        <div class="l-mid">
          <h3 class="reveal" style="font-family:var(--sans);font-weight:700;font-size:52px;letter-spacing:-0.04em;color:var(--blue);margin-bottom:50px">
            <span style="opacity:.75">${s.n}</span> ${s.title}
          </h3>
          <p class="body reveal" style="--d:.18s;font-size:27px;max-width:600px">${s.body}</p>
        </div>
        <div class="reveal" style="--d:.3s;display:flex;align-items:center;justify-content:center;padding:0 30px">
          ${bend({ src: s.src, name: s.name, w: 470, h: 620, right: k % 2 === 1 })}
        </div>
      </div>`,
  })),

  /* 13 — the lead-in to the proof, and it earns its place twice over. It
     answers his email ask in as many words, and it heads off the one thing
     a numerate reader would otherwise catch on his own: the cases run in
     sterling and dollars, so 12p is not the sub-ten-cent figure on page
     seven. Twelve pence is roughly fourteen euro cents. Letting three
     consecutive slides imply otherwise to an ex-Deezer finance guy would
     cost more credibility than the slides are worth. */
  {
    section: 'The proof',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">What you asked for</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1440px;margin-bottom:40px">
          Three campaigns,<br>with the cost on them.
        </h2>
        <p class="body reveal" style="--d:.16s;font-size:23px;max-width:1420px;margin-bottom:34px">
          Anonymised, as agreed on the call — the names are blurred, the numbers are not,
          and every figure is read straight off the account beside it.
        </p>
        <div class="rule reveal" style="--d:.24s;margin:0 0 32px"></div>
        <p class="body reveal" style="--d:.3s;font-size:21px;max-width:1420px;opacity:.85">
          Two things to read them with. All three are <strong style="color:var(--blue)">release</strong>
          campaigns rather than playlist campaigns, which are a different and cheaper exercise —
          the sub-ten figure on page seven is the playlist number. And each is shown in the currency
          the account ran in, so twelve pence is nearer fourteen of your cents than ten.
        </p>
      </div>`,
  },

  /* 14–16 — the proof itself. Anonymised, because that is what PJ told him
     he would send. Chosen for relevance rather than size — a cold-start
     dance record, an eleven-year-old catalogue single, and a catalogue
     track worked on a sustained monthly budget, which is the closest thing
     in the book to how HMWL actually spends. */
  anon.cristoph,
  anon.maribouState,
  anon.theListros,

  /* 16 — the verdict. The label deck's slide, retoned for someone releasing
     two records a fortnight: at that cadence the useful service is being
     told early which ones not to spend on. */
  {
    section: 'The verdict',
    grain: true,
    html: `
      <div class="pad l-centre">
        <h2 class="display display--m reveal" style="margin-bottom:56px">
          <span class="hl">Most records won't be the one.</span>
        </h2>
        <p class="body reveal" style="--d:.16s;max-width:1080px;text-align:center;font-size:26px">
          Two releases a fortnight is fifty-two a year. A €200 test over forty-eight to seventy-two hours tells us which of them deserve the fortnight of promotion you were going to give them anyway.
        </p>
        <p class="body reveal" style="--d:.26s;max-width:1080px;text-align:center;font-size:26px">
          Plenty of agencies will spend a budget for as long as you keep approving it. We won't.
        </p>
        <p class="body reveal" style="--d:.36s;max-width:1080px;text-align:center;font-size:26px;color:var(--blue);font-weight:600;margin-top:34px">
          The value isn't in the records we scale. It's in the ones we stop.
        </p>
      </div>`,
  },

  /* 17 — what stays his. The most important slide for closing this one. He
     said on the call he prefers to run the playlists himself and asked
     twice about whose Meta account the campaigns sit in; a proposal that
     leaves either question open invites a no on the wrong grounds. */
  {
    section: 'The verdict',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:26px">What does not change</div>
        <h2 class="display reveal" style="--d:.08s;font-size:70px;line-height:1.06;max-width:1440px;margin-bottom:46px">
          We are not asking to<br>run your label.
        </h2>

        <ol class="steps reveal" style="--d:.2s;grid-template-columns:repeat(2,1fr);max-width:1500px;row-gap:44px">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">The playlists stay yours</div>
            <p class="body" style="font-size:19px;max-width:none">You said you prefer to curate them yourselves, and you should — ten years of brand is not something an agency should be handed. We advertise to them. We do not touch what goes in them.</p></li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">Your Meta account, your pixel</div>
            <p class="body" style="font-size:19px;max-width:none">Everything runs inside your own business account, so five years of pixel learning keeps compounding and the audiences stay yours the day this ends.</p></li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">HypeEdit stays until it loses</div>
            <p class="body" style="font-size:19px;max-width:none">Ours reports deeper, but yours has worked for five years. Run both across the test and keep whichever reads truer — that is a decision for the data, not for this document.</p></li>
          <li><span>04</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:24px;letter-spacing:-0.03em;margin-bottom:10px">You keep promoting too</div>
            <p class="body" style="font-size:19px;max-width:none">You said you want to keep control of some of it. Good — that is what makes the comparison worth anything. Run yours beside ours on the same window and read the two numbers.</p></li>
        </ol>
      </div>`,
  },

  /* 18 — reporting. The drawn browser frame rather than laptop(): the
     laptop mockup in the library is an unlicensed iStock comp, and this
     document is going to a label. */
  {
    section: 'Reporting',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.76fr 1.24fr;align-items:center;gap:70px">
        <div>
          <h2 class="display reveal" style="font-size:56px;letter-spacing:-0.04em;line-height:1.28;margin-bottom:16px">
            <span class="hl">A dashboard, daily.</span>
          </h2>
          <h2 class="display reveal" style="--d:.12s;font-size:56px;letter-spacing:-0.04em;line-height:1.12;color:var(--head);margin-bottom:40px">
            Every release on it.
          </h2>
          <p class="body reveal" style="--d:.24s;font-size:23px">
            Sweat.fm is our own platform rather than a third-party dashboard. Every
            test, every cost per result, every market, updated daily. Creative comes
            to you as a link — you click approve and the system does the rest.
          </p>
        </div>
        <div class="reveal" style="--d:.32s;max-width:1000px;justify-self:center;width:100%">
          ${browser({ src: 'dashboard.jpg', alt: 'Sweat.fm dashboard: per-release monthly listeners, streams, saves and playlist adds tracked daily' })}
        </div>
      </div>`,
  },

  /* 19 — offer section title */
  {
    section: 'The offer',
    grain: true,
    html: `
      <div class="pad l-centre">
        <h2 class="display display--l reveal"><span class="bracket">Start with the autumn</span></h2>
      </div>`,
  },

  /* 20 — the pilot. This is the actual ask, and it is the one both of them
     landed on unprompted: he said "we should try to test some pilot
     projects", PJ said "let's see if we can find a few pilots this
     autumn". Written as a comparison rather than a handover, because a
     comparison is what he said he wanted. */
  {
    section: 'The offer',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:30px">The pilot</div>
        <h2 class="display reveal" style="--d:.06s;font-size:60px;line-height:1.14;margin-bottom:20px">
          <span class="hl">Three singles.</span><br>Run beside your own.
        </h2>
        <p class="body reveal" style="--d:.12s;font-size:23px;max-width:1000px;margin-bottom:52px">
          Pick three from the autumn schedule. We test each one the way we would test
          any record, you keep running yours the way you always have, and at the end
          of the window there are two cost-per-result numbers on the same table.
        </p>

        <ol class="steps reveal" style="--d:.2s;grid-template-columns:repeat(4,1fr)">
          <li><span>01</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">You send audio</div>
            <p class="body" style="font-size:18px;max-width:none">Three tracks and nothing else. No briefs, no assets, no time from the artists.</p></li>
          <li><span>02</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Live in 24 hours</div>
            <p class="body" style="font-size:18px;max-width:none">Every section of every track, against a control visual, on a €200 test spend each.</p></li>
          <li><span>03</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">Read in 72 hours</div>
            <p class="body" style="font-size:18px;max-width:none">A real cost per result per track, by country, and a straight recommendation on which to scale.</p></li>
          <li><span>04</span>
            <div style="font-family:var(--sans);font-weight:700;font-size:23px;letter-spacing:-0.03em;margin-bottom:10px">You compare</div>
            <p class="body" style="font-size:18px;max-width:none">Against the fourteen to thirty you already know. If we do not beat it, you have lost a fortnight and learned something.</p></li>
        </ol>
      </div>`,
  },

  /* 21 — the retainer. PJ's numbers from the call, and the honest reading
     of them at HMWL's actual spend rather than at the headline. He did the
     multiplication live on the call; the deck does it for him instead of
     hoping he forgets. */
  {
    section: 'The offer',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:30px">Then the retainer</div>
        <h2 class="display reveal" style="--d:.06s;font-size:60px;line-height:1.14;margin-bottom:20px">
          <span class="hl">10% of ad spend.</span><br>€2,000 a month minimum.
        </h2>
        <p class="body reveal" style="--d:.12s;font-size:23px;max-width:1000px;margin-bottom:52px">
          That covers the playlist campaigns and every release in the month — testing,
          creative, the country reads and the dashboard. Ad spend is separate and stays
          yours, paid to Meta directly out of your own account.
        </p>

        <div class="reveal" style="--d:.2s;display:grid;grid-template-columns:repeat(2,auto);justify-content:start;gap:150px">
          <div>
            <div class="display" style="font-size:92px;line-height:1;color:var(--blue)">€2K</div>
            <div class="tier" style="margin-top:22px">Up to €20,000 of spend</div>
          </div>
          <div>
            <div class="display" style="font-size:92px;line-height:1;color:var(--blue)">10%</div>
            <div class="tier" style="margin-top:22px">Above that</div>
          </div>
        </div>

        <div class="rule reveal" style="--d:.36s;margin:52px 0 32px"></div>
        <p class="body reveal" style="--d:.42s;font-size:21px;max-width:1440px">
          <strong style="color:var(--blue)">You said you don't spend €20,000 a month, and you don't have to.</strong>
          At €6,000 the minimum is what you pay, which is why the break-even on page seven
          matters more than the rate does — the fee is meant to come out of the saving,
          not out of the budget. The headroom is there for the months the autumn earns it.
        </p>
      </div>`,
  },

  /* 22 — close. His own deadline: he took these calls in August precisely
     because October and November are lost to the release schedule. */
  {
    section: 'Next',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:84px;line-height:1.08;margin-bottom:28px">
          Before October<br>swallows it.
        </h2>
        <p class="body reveal" style="--d:.12s;font-size:23px;max-width:1300px;margin-bottom:48px">
          You said you were taking these meetings now because autumn gets swamped. Three
          tracks and a start date is all the pilot needs, and September is the last month
          it fits in.
        </p>
        <ol class="steps reveal" style="--d:.2s;max-width:1620px">
          <li><span>01</span>Pick three from the autumn schedule.</li>
          <li><span>02</span>Send the audio — nothing else.</li>
          <li><span>03</span>Live within 24 hours, read within the week.</li>
          <li><span>04</span>Compare the number, then decide about the playlists.</li>
        </ol>
        <div class="rule reveal" style="--d:.36s;margin:60px 0 40px"></div>
        <p class="reveal" style="--d:.44s;font-size:30px;font-weight:700">
          <a href="mailto:pj@sweatstrategies.com" style="color:var(--blue)">pj@sweatstrategies.com</a>
        </p>
      </div>`,
  },
];
