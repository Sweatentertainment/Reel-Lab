/* ------------------------------------------------------------------
   Christopher Hunt — proposal
   Managing Partner, Hunt Equity Group (Naples, FL). CAIA, CFA III candidate.

   A VARIANT OF THE ARTIST DECK, NOT A NEW DESIGN. Every treatment here is
   lifted from slides.js — the tile-grid cover, the bracketed dividers, the
   bent artist cards with mono labels, the drawn spine on the process
   slides, the blue fill behind the price. If something needs changing,
   change it there first and carry it across, or the two will drift.

   WHO IT IS WRITTEN FOR. He does infrastructure finance and private equity
   for a living and is treating music as a new venture. He understands
   staged capital deployment and payback periods, so the deck argues in
   those terms: seven records are seven unpriced bets, testing is how you
   price them, and the value is in the ones you stop. No hype, no agency
   language.

   TWO THINGS SHAPE THE WHOLE DOCUMENT.

   1. It is not one project. The pop records and the club records want
      different audiences, creative and names, so the deck splits them
      throughout rather than treating the seven as a catalogue.

   2. He cannot be the face — professional reasons, his investors, and he
      raised the alter-ego idea himself. So the identity has to do the work
      his face would normally do, which is why page 19 exists at all.

   NAMES AND TITLES ARE DELIBERATELY ABSENT. The alter-ego names are not
   decided, so it is "the pop project" and "the club project" throughout.
   The seven track titles are never printed: they are profane and he is
   anonymous by design, and a deck is a thing that gets forwarded.

   TWO IMAGE SUBSTITUTIONS, FLAGGED TO PJ. The brief asked for Swedish
   House Mafia on 07 and Maribou State on 09. There is no licensed
   photograph of either — the only Maribou State asset in the library is a
   Spotify chart screenshot, and Swedish House Mafia has been asked for
   twice before and is still not possible. Press photography off the web is
   third-party copyright in a document going to an investor, so the two
   slots take Disclosure and Bonobo: the biggest name available goes in the
   most prominent slot, and Bonobo is both the closest in world to Maribou
   State and what the source deck already uses on "Find the sound".

   COLOUR. The brief cites #030303, #ECEBEA and #1167DC, which are the
   rendered values read off a PDF with grain over it. The tokens in
   deck.css are #000, #eeedeb and #0f65dd — the same colours before the
   grain. Using the tokens rather than hardcoding the sampled values keeps
   this deck on the system.
   ------------------------------------------------------------------ */

import { img, spine, blobs, tile, bend, roster, laptop } from './parts.js';

/* ------------------------------------------------------- local archetypes */

/* A process slide. Identical to the source deck's, which alternates the
   bend direction so four slides in a row do not read as one repeated frame. */
const process = ({ n, title, body, src, name }, k) => ({
  section: 'The process',
  grain: 'soft',
  html: `
    ${spine()}
    <div class="pad l-split" style="align-items:center;gap:70px">
      <div class="l-mid">
        <h3 class="reveal" style="font-family:var(--sans);font-weight:700;font-size:62px;letter-spacing:-0.04em;color:var(--blue);margin-bottom:64px">
          <span style="opacity:.75">${n}</span> ${title}
        </h3>
        <p class="body reveal" style="--d:.18s;font-size:31px;max-width:600px">${body}</p>
      </div>
      <div class="reveal" style="--d:.3s;display:flex;align-items:center;justify-content:center;padding:0 30px">
        ${bend({ src, name, w: 470, h: 620, right: k % 2 === 1 })}
      </div>
    </div>`,
});

/* The four next-steps. They close both the offer and the deck — the same
   four beats, worded slightly differently the second time, which is how the
   brief has it: the offer states them as terms, the close as an instruction. */
const steps = (items, delay = '.3s') => `
  <ol class="steps reveal" style="--d:${delay}">
    ${items.map((s, i) => `<li><span>0${i + 1}</span>${s}</li>`).join('')}
  </ol>`;

export const SLIDES = [
  /* 01 — cover. Miguel's artwork, used whole, exactly as the artist deck and
     the Øneheart proposal open. Its chrome is baked into the JPEG, hence
     chrome: 'none' — the wordmark and footer you can see are part of the
     image, not slide furniture.

     The client's name sits bottom-left on the deck's own 96px gutter rather
     than under the wordmark. Under the wordmark it fights the thing directly
     above it and needs a drop shadow to stay legible on bright sky, which is
     what makes a caption look stuck on; down here the ground is already dark
     and it reads unaided. */
  {
    section: 'Proposal',
    chrome: 'none',
    html: `
      <div style="position:absolute;inset:0;z-index:0">
        <img src="${img('cover.jpg')}" alt="" style="width:100%;height:100%;object-fit:cover">
      </div>
      <div class="reveal" style="--d:.5s;position:absolute;left:96px;bottom:172px;z-index:20">
        <div style="font-family:var(--mono);text-transform:uppercase;font-size:26px;letter-spacing:0.24em;color:#fff">
          Christopher Hunt
        </div>
      </div>`,
  },

  /* 02 — the hook. The source deck's grid treatment, its slide 02 there too.
     "FIND THE ONE." is shorter than "FIND THE SONG." so it sets narrower at
     the same size — left-aligned, so it simply ends sooner. */
  {
    section: 'Proposal',
    ground: 'light',
    chrome: 'dark',
    grain: 'soft',
    html: `
      ${tile({ src: 'artist__blondish__lens.jpg', name: 'Blond:Ish', x: 183, y: 129, w: 145, h: 150 })}
      ${tile({ src: 'artist__dolores-forever__lens.jpg', name: 'Dolores Forever', x: 490, y: 109, w: 268, h: 269 })}
      ${tile({ src: 'artist__rules__lens.jpg', name: 'Rules', x: 874, y: 189, w: 173, h: 173 })}
      ${tile({ src: 'Morly__lens.jpg', name: 'Morly', x: 1207, y: 145, w: 150, h: 147 })}
      ${tile({ src: 'artist__the-knocks-compress__lens.jpg', name: 'The Knocks', x: 1508, y: 164, w: 237, h: 218 })}

      ${tile({ src: 'artist__thundercat__lens.jpg', name: 'Thundercat', x: 183, y: 751, w: 239, h: 232 })}
      ${tile({ src: 'the-listros__lens.jpg', name: 'The Listros', x: 567, y: 730, w: 147, h: 150 })}
      ${tile({ src: 'artist__st-lundi__lens.jpg', name: 'St Lundi', x: 883, y: 774, w: 164, h: 173 })}
      ${tile({ src: 'artist__disclosure__lens.jpg', name: 'Disclosure', x: 1169, y: 698, w: 265, h: 265 })}
      ${tile({ src: 'artist__kid-apollo-compress__lens.jpg', name: 'Kid Apollo', x: 1626, y: 730, w: 119, h: 150 })}

      <div style="position:absolute;left:49px;right:49px;top:382px;height:316px;z-index:20;display:flex;align-items:center">
        <h1 class="display reveal"
            style="font-size:222px;line-height:1;letter-spacing:-0.022em;white-space:nowrap;color:#0b0b0d">FIND THE ONE.</h1>
      </div>`,
  },

  /* 02 — the roster, unchanged. Credibility before the problem. */
  roster(),

  /* 03 — the problem, as a divider. Bracket plus the dashed question box,
     the same pairing the source deck opens its problem section with. */
  {
    section: 'The problem',
    grain: true,
    html: `
      <div class="pad l-centre">
        <h2 class="display display--m reveal"><span class="bracket">Seven records. No answer yet</span></h2>
        <div class="dashbox reveal" style="--d:.35s;width:118px;height:118px;margin-top:96px;font-size:44px;font-weight:300;color:#fff">?</div>
      </div>`,
  },

  /* 04 — the problem. Argued as an information problem rather than a music
     one, because that is the frame he already thinks in. */
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
          <h2 class="display reveal" style="font-size:64px;font-weight:700;letter-spacing:-0.035em;line-height:1.1">
            You've got seven finished records. Somewhere in them there might be one that changes everything.
          </h2>
          <div class="reveal" style="--d:.2s;padding-bottom:12px">
            <p class="body" style="max-width:none">
              Right now all seven are equally likely. You could put $30,000 behind the one you love most and
              learn nothing — not whether it was the record, the audience or the creative. Then do it again
              on the next one, starting from zero.
            </p>
            <p class="body" style="max-width:none">
              That isn't a music problem. It's an information problem, and it's the cheapest one you'll
              ever have to fix.
            </p>
          </div>
        </div>
      </div>`,
  },

  /* 05 — the second half of the problem, and the reason this deck goes
     further than the standard testing one. */
  {
    section: 'The problem',
    html: `
      <div class="field field--dark"></div>
      ${blobs([
        { k: 'c', pos: 'left:10%;top:-220px;opacity:.75' },
        { k: 'a', pos: 'right:-240px;bottom:-280px;opacity:.6' },
      ])}
      <div class="pad l-end">
        <div style="display:grid;grid-template-columns:1.05fr 0.72fr;align-items:end;gap:150px">
          <h2 class="display reveal" style="font-size:64px;font-weight:700;letter-spacing:-0.035em;line-height:1.1">
            And it isn't one project.
          </h2>
          <div class="reveal" style="--d:.2s;padding-bottom:12px">
            <p class="body" style="max-width:none">
              The pop records and the club records want different audiences, different creative and
              different names. Put them on the same project and you blunt both.
            </p>
            <p class="body" style="max-width:none">
              On top of that, you can't be the face of it. So the identity has to do the work your face
              would normally do. That's a build, not a logo.
            </p>
          </div>
        </div>
      </div>`,
  },

  /* 06 — the promise, as a divider. */
  {
    section: 'The promise',
    html: `
      <div class="field"></div>
      ${blobs([
        { k: 'c', pos: 'left:14%;top:-180px' },
        { k: 'a', pos: 'right:-220px;top:8%;opacity:.6' },
        { k: 'b', pos: 'left:-260px;bottom:-300px;opacity:.7' },
      ])}
      <div class="pad l-end">
        <h2 class="display reveal" style="font-size:142px;color:#fff;white-space:nowrap">In 90 days you'll know.</h2>
      </div>`,
  },

  /* 07 — the promise. Brief asked for Swedish House Mafia; no licensed image
     exists, so the biggest name in the library takes the most prominent slot. */
  {
    section: 'The promise',
    html: `
      <div class="field"></div>
      ${blobs([{ k: 'a', pos: 'left:-300px;top:-200px;opacity:.55' }, { k: 'c', pos: 'right:-160px;bottom:-260px;opacity:.7' }])}
      <div class="pad l-split" style="align-items:center;gap:110px">
        <div>
          <h2 class="display display--s reveal" style="font-weight:700;letter-spacing:-0.035em;margin-bottom:44px">
            We test every record you've got.
          </h2>
          <p class="body reveal" style="--d:.15s">
            Up to 20. We could do all 13 you have now, plus anything you write in the next three months —
            you make records three hours a day from the gym, and that costs you nothing extra in fees.
            Only ad spend.
          </p>
          <p class="body reveal" style="--d:.28s">
            At the end of three months you'll know whether you've got a record that can scale, and exactly
            what it costs to push it. If you haven't got one yet, we'll tell you that too, and why.
          </p>
        </div>
        <div style="display:flex;align-items:center;justify-content:center">
          ${bend({ src: 'artist__disclosure__lens.jpg', name: 'Disclosure', w: 500, h: 610, right: true })}
        </div>
      </div>`,
  },

  /* 08 — the process, as a divider. */
  {
    section: 'The process',
    html: `
      <div class="field"></div>
      ${blobs([
        { k: 'c', pos: 'left:8%;top:-240px;opacity:.8' },
        { k: 'a', pos: 'right:-180px;bottom:-300px;opacity:.55' },
      ])}
      <div class="pad l-centre">
        <h2 class="display display--l reveal" style="color:#fff"><span class="bracket bracket--light">How we find it?</span></h2>
      </div>`,
  },

  /* 09–12 — the four process steps. Bonobo stands in for the requested
     Maribou State, which has no portrait in the library. */
  ...[
    {
      n: '01', title: 'Find the sound',
      body: 'We test every part of the record to see which seconds actually stop someone scrolling.',
      src: 'artist__bonobo-compress__lens.jpg', name: 'Bonobo',
    },
    {
      n: '02', title: 'Test the content at scale',
      body: 'Dozens of variations per record, made by our editors, running against cold audiences in every market that matters.',
      src: 'artist__the-knocks-compress__lens.jpg', name: 'The Knocks',
    },
    {
      n: '03', title: 'Validate the cost',
      body: 'Every test returns a real cost per new listener. That number decides what gets the budget and what gets dropped.',
      src: 'artist__blondish__lens.jpg', name: 'Blond:Ish',
    },
    {
      n: '04', title: 'Scale what converts',
      body: 'Budget follows the number, reallocated daily, country by country, for as long as it keeps paying.',
      src: 'artist__thundercat__lens.jpg', name: 'Thundercat',
    },
  ].map(process),

  /* 13 — the verdict. The line about the six we stop is the argument of the
     whole deck for this reader: he buys information, not optimism. */
  {
    section: 'The verdict',
    grain: true,
    html: `
      <div class="pad l-centre">
        <h2 class="display display--m reveal" style="margin-bottom:56px">
          <span class="hl">Most of these won't be the one.</span>
        </h2>
        <p class="body reveal" style="--d:.16s;max-width:1080px;text-align:center;font-size:26px">
          We'll tell you which ones aren't, in days rather than quarters, and move to the next record on the list.
        </p>
        <p class="body reveal" style="--d:.26s;max-width:1080px;text-align:center;font-size:26px">
          Plenty of agencies will spend a marketing budget for as long as you keep approving it. We won't.
        </p>
        <p class="body reveal" style="--d:.36s;max-width:1080px;text-align:center;font-size:26px;color:var(--blue);font-weight:600;margin-top:34px">
          The value isn't in the record we scale. It's in the six we stop.
        </p>
      </div>`,
  },

  /* 14 — reporting. */
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
            Every record on it.
          </h2>
          <p class="body reveal" style="--d:.24s;font-size:23px">
            Sweat.fm is our own platform, not a third-party dashboard. Every test, every cost per new
            listener, every market, updated daily. You will never have to ask us how it's going.
          </p>
        </div>
        <div class="reveal" style="--d:.32s;max-width:1060px;justify-self:center;width:100%">
          ${laptop({ src: 'dashboard.jpg', alt: 'Sweat.fm live dashboard' })}
        </div>
      </div>`,
  },

  /* 15 — the offer. Blue fill behind the price, exactly as the source deck. */
  {
    section: 'The offer',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.66fr 1.34fr;align-items:center;gap:86px">
        <div class="reveal" style="display:flex;align-items:center;justify-content:center">
          ${bend({ src: 'artist__kid-apollo-compress__lens.jpg', name: 'Kid Apollo', w: 420, h: 590 })}
        </div>

        <div style="display:flex;flex-direction:column;justify-content:center;gap:56px">
          <div>
            <h2 class="display reveal" style="font-size:68px;line-height:1.22;white-space:nowrap"><span class="hl">$6,000 for (3) three months.</span></h2>
            <p class="reveal" style="--d:.1s;font-size:40px;font-weight:600;margin-top:32px">Up to 20 songs.</p>
            <p class="reveal" style="--d:.16s;font-size:23px;opacity:.62;margin-top:14px">Ad spend on top — roughly $250 per track to get a clean read.</p>
          </div>

          <div class="rule reveal" style="--d:.24s"></div>

          <div>
            ${steps([
              "Sign off and send the audio — that's all we need to start.",
              'We split the records into two projects and build the matrix.',
              'First tests live within a week.',
              "Ninety days later, you'll know.",
            ])}
            <p class="reveal" style="--d:.4s;font-size:28px;font-weight:700;margin-top:44px">
              Ready? <a href="mailto:pj@sweatstrategies.com" style="color:var(--blue)">pj@sweatstrategies.com</a>
            </p>
          </div>
        </div>
      </div>`,
  },

  /* 16 — what happens next, as a divider. */
  {
    section: 'What happens next',
    grain: true,
    html: `
      <div class="pad l-centre">
        <h2 class="display display--l reveal"><span class="bracket">When we find your record</span></h2>
      </div>`,
  },

  /* 17 — scale it. */
  {
    section: 'What happens next',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.82fr 1.18fr;align-items:center;gap:90px">
        <div>
          <h2 class="display display--s reveal" style="line-height:1.02;margin-bottom:38px">
            We put it<br>everywhere<br>it converts.
          </h2>
          <p class="body reveal" style="--d:.16s;max-width:520px">
            A record that works on one platform rarely stops there. Once the tests tell us what's landing,
            we take the winning creative and put budget behind it across every channel that can turn a
            listener into a fan.
          </p>
        </div>

        <div style="display:flex;flex-direction:column;gap:46px">
          <div class="reveal" style="--d:.24s">
            <div class="tier">Scale it</div>
            <p class="body" style="font-size:25px;max-width:none">
              20% on ad spend above $5,000 a month. Below $5,000 a month there's no scaling fee at all.
              We push as hard as the data says we should.
            </p>
          </div>

          <div class="rule reveal" style="--d:.34s"></div>

          <div class="reveal" style="--d:.4s">
            <div class="label" style="margin-bottom:24px">Channels we run</div>
            <ul class="channels">
              <li>Meta</li><li>TikTok</li><li>YouTube</li><li>Spotify</li>
              <li>Apple</li><li>Live</li><li>Merch</li>
            </ul>
          </div>
        </div>
      </div>`,
  },

  /* 18 — build the world. New: no equivalent exists in the source deck,
     because no other client has needed the identity to stand in for them.
     Two routes side by side so the choice is legible at a glance — he will
     read this as buy-outright versus revenue-share and price it himself. */
  {
    section: 'What happens next',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.82fr 1.18fr;align-items:center;gap:90px">
        <div>
          <h2 class="display display--s reveal" style="line-height:1.02;margin-bottom:38px">
            A record that<br>works needs<br>somewhere<br>to land.
          </h2>
          <p class="body reveal" style="--d:.16s;max-width:520px;font-size:23px">
            <strong style="color:#fff">Two identities.</strong> The pop project and the club project,
            built separately so neither dilutes the other. Artwork, Spotify visuals, and a brand strong
            enough to front the whole thing so you never have to.
          </p>
          <p class="body reveal" style="--d:.22s;max-width:520px;font-size:23px">
            <strong style="color:#fff">Real production and real vocals</strong>, commissioned on any
            record that earns them. <strong style="color:#fff">Distribution handled.</strong>
          </p>
        </div>

        <div style="display:flex;flex-direction:column;gap:40px">
          ${/* the line introduces the two routes, so it sits above them —
                underneath it reads as a conclusion drawn from prices, which
                is the opposite of offering someone a choice */ ''}
          <p class="reveal" style="--d:.26s;font-size:27px;font-weight:600;line-height:1.5">
            Two ways to do it — your call which suits you.
          </p>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:56px">
            <div class="reveal" style="--d:.32s">
              <div class="tier">Route A</div>
              <p class="body" style="font-size:22px;max-width:none">
                $4,000 per project, plus $4,000 per song. Two projects is $8,000 to build both identities.
                You own everything outright.
              </p>
            </div>
            <div class="reveal" style="--d:.38s">
              <div class="tier">Route B</div>
              <p class="body" style="font-size:22px;max-width:none">
                25% in perpetuity on royalties. We carry the creative cost, handle distribution, and only
                make money when you do.
              </p>
            </div>
          </div>

          <div class="rule reveal" style="--d:.44s"></div>

          <p class="body reveal" style="--d:.48s;font-size:20px;max-width:none;opacity:.7">
            Both routes are separate to the testing and paid media fees on page 16.
          </p>
        </div>
      </div>`,
  },

  /* 19 — close. The same four beats as the offer, worded as an instruction
     rather than as terms. */
  {
    section: 'Next',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <h2 class="display reveal" style="font-size:82px;line-height:1.08;margin-bottom:52px">
          Send us the audio.<br>It's testing this week.
        </h2>
        ${steps([
          'Sign off and send the files — audio is all we need.',
          'We split the records into the two projects and build the matrix.',
          'First campaigns live within a week.',
          "Ninety days later, you'll know.",
        ], '.2s')}
        <div class="rule reveal" style="--d:.36s;margin:56px 0 36px"></div>
        <p class="reveal" style="--d:.44s;font-size:30px;font-weight:700">
          Ready? <a href="mailto:pj@sweatstrategies.com" style="color:var(--blue)">pj@sweatstrategies.com</a>
        </p>
        <p class="body reveal" style="--d:.5s;font-size:20px;margin-top:28px;opacity:.62">
          Artwork, branding, production and distribution available as set out on page 19.
        </p>
      </div>`,
  },
];
