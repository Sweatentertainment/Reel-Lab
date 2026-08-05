/* ------------------------------------------------------------------
   Sweat Strategies — deck content
   Wording from Miguel's V3 deck, with PJ's edits applied:
     · cut 3, 4, 5, 16, 17, 18
     · 19 + 20 merged into one Reporting slide
     · vibe/stock photography replaced with sweatstrategies.com artists
     · offer updated to $4,500 / 3 months or $2,000 PCM
   Edit copy here — layout and styling live in deck.css.
   ------------------------------------------------------------------ */

const IMG = 'assets/img';
/* every image goes through here so the standalone build can swap in data URIs */
export const img = (name) => `${IMG}/${name}`;

/* the site's scroll-drawn spine — sweat-website/index.html */
export const SPINE_PATH =
  'M61.1635 0.5C61.1635 0.5 61.1635 398.555 61.1635 408.742C61.1635 418.929 62.8489 451.754 56.107 460.81C49.3651 469.864 26.6098 474.392 26.6098 497.03C26.6098 519.668 85.6033 520.8 86.4464 542.306C87.2888 563.812 22.3965 562.679 22.3965 596.637C22.3965 630.593 108.358 621.538 108.358 648.703C108.358 675.869 3.85551 669.078 3.85551 700.771C3.85551 732.464 119.314 710.958 119.314 751.706C119.314 792.454 1.32764 769.816 1.32764 807.168C1.32764 844.521 115.1 823.015 115.1 858.104C115.1 893.192 11.4405 884.137 11.4405 916.961C11.4405 949.786 99.088 932.808 99.088 967.897C99.088 1002.99 35.038 992.798 35.038 1024.49C35.038 1056.18 72.9618 1046 72.9618 1070.9C72.9618 1095.8 35.038 1109.38 35.038 1133.15C35.038 1156.92 99.088 1165.98 99.088 1182.95C99.088 1199.93 11.4405 1206.73 11.4405 1237.29C11.4405 1267.84 119.314 1257.66 119.314 1289.36C119.314 1321.05 2.17001 1305.2 2.17001 1343.68C2.17001 1382.17 119.314 1362.93 119.314 1395.75C119.314 1428.58 2.17001 1412.73 2.17001 1451.22C2.17001 1489.7 110.886 1463.67 110.886 1504.42C110.886 1545.16 19.8679 1524.78 19.8679 1556.48C19.8679 1588.17 85.6033 1585.91 85.6033 1609.67C85.6033 1633.45 33.5296 1643.97 33.5296 1670C33.5296 1696.04 61.1635 1692.6 61.1635 1717.5C61.1635 1742.4 61.1635 2023.95 61.1635 2023.95';

/* ---------------------------------------------------------- fragments */

/* dx nudges the spine off dead-centre so it lands in a slide's real gutter
   rather than through a column of text */
const spine = (mod = '', dx = 0) =>
  `<div class="pathline ${mod}"${dx ? ` style="transform:translateX(${dx}px)"` : ''}><svg viewBox="0 0 120 1620" preserveAspectRatio="xMidYMid meet"><path d="${SPINE_PATH}"/></svg></div>`;

const blobs = (list) =>
  list.map((b) => `<div class="blob blob--${b.k}" style="${b.pos}"></div>`).join('');

/* a straight artist image, placed to Miguel's scatter — no perspective, no
   caption, positions measured off his slide 2 and scaled to the 1920 canvas */
const tile = ({ src, name, x, y, w, h }) => `
  <img class="tile" src="${img(src)}" alt="${name}"
       style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">`;

/* a bent artist card — site treatment: perspective 600px + rotateY(±30deg) */
const bend = ({ src, name, w, h, right = false, soft = false, style = '' }) => `
  <div class="bend ${right ? 'bend--right' : ''} ${soft ? 'bend--soft' : ''}" style="${style}">
    <div class="bend__inner">
      ${name ? `<div class="bend__cap">${name}</div>` : ''}
      <div style="width:${w}px;height:${h}px;overflow:hidden">
        <img src="${img(src)}" alt="${name || ''}">
      </div>
    </div>
  </div>`;

/* ------------------------------------------------------------ slides */

export const SLIDES = [
  /* 01 — cover. Miguel's original, which PJ signed off on: used whole, with its
     own baked-in chrome, so we don't double up on the slide furniture. */
  {
    section: 'Proposal',
    chrome: 'none',
    html: `
      <div style="position:absolute;inset:0;z-index:0">
        <img src="${img('cover.jpg')}" alt="" style="width:100%;height:100%;object-fit:cover">
      </div>`,
  },

  /* 02 — the hook. Miguel's treatment: light ground, black type, straight
     images in a scattered grid. No bend and no gradient here. */
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
            style="font-size:222px;line-height:1;letter-spacing:-0.022em;white-space:nowrap;color:#0b0b0d">FIND THE SONG.</h1>
      </div>`,
  },

  /* 03 — was 06. black grainy, bracketed. */
  {
    section: 'The Problem',
    grain: true,
    html: `
      <div class="pad l-centre">
        <h2 class="display display--m reveal"><span class="bracket">Most artists never find out</span></h2>
        <div class="dashbox reveal" style="--d:.35s;width:118px;height:118px;margin-top:96px;font-size:44px;font-weight:300;color:#fff">?</div>
      </div>`,
  },

  /* 04 — was 07 */
  {
    section: 'The Problem',
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
            You've got a catalogue. Somewhere in it there might be a song that could change everything.
          </h2>
          <p class="body reveal" style="--d:.2s;max-width:none;padding-bottom:12px">
            Most artists never find out which one. They back the track they love, spend what they can afford, and hope.
            When it doesn't work they've got no idea whether it was the song, the audience or the ads.
            So they do the same thing on the next release, starting from zero again.
          </p>
        </div>
      </div>`,
  },

  /* 05 — was 08 */
  {
    section: 'The Promise',
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

  /* 06 — was 09 */
  {
    section: 'The Promise',
    html: `
      <div class="field"></div>
      ${blobs([{ k: 'a', pos: 'left:-300px;top:-200px;opacity:.55' }, { k: 'c', pos: 'right:-160px;bottom:-260px;opacity:.7' }])}
      <div class="pad l-split" style="align-items:center;gap:110px">
        <div>
          <h2 class="display display--s reveal" style="font-weight:700;letter-spacing:-0.035em;margin-bottom:44px">
            We test up to 12 of your songs.
          </h2>
          <p class="body reveal" style="--d:.15s">
            At the end of three months you'll know whether you've got a song that can scale your career,
            and exactly what it costs to push it.
          </p>
          <p class="body reveal" style="--d:.28s">If you haven't got one yet, we'll tell you that too, and why.</p>
        </div>
        <div style="display:flex;align-items:center;justify-content:center">
          ${bend({ src: 'artist__st-lundi__lens.jpg', name: 'St Lundi', w: 500, h: 610, right: true })}
        </div>
      </div>`,
  },

  /* 07 — was 10. section title, bracketed. */
  {
    section: 'The Process',
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

  /* 08–11 — was 11–14. PJ: put the artists we actually work with in here. */
  ...[
    {
      n: '01', title: 'Find the sound',
      body: 'We test every part of the song to see which seconds actually stop someone scrolling.',
      src: 'artist__bonobo-compress__lens.jpg', name: 'Bonobo',
    },
    {
      n: '02', title: 'Build the content',
      body: "Up to 25 visuals per song, made by our editors, trained on what's already winning.",
      src: 'artist__blondish__lens.jpg', name: 'Blond:Ish',
    },
    {
      n: '03', title: 'Make the call',
      body: "We tell you whether it's worth scaling, and how hard to push.",
      src: 'artist__disclosure__lens.jpg', name: 'Disclosure',
    },
    {
      n: '04', title: 'Watch it land',
      body: "We track Spotify for Artists daily, country by country, and move the money to where it's converting.",
      src: 'artist__thundercat__lens.jpg', name: 'Thundercat',
    },
  ].map((s, k) => ({
    section: 'The Process',
    grain: 'soft',
    html: `
      ${spine()}
      <div class="pad l-split" style="align-items:center;gap:70px">
        <div class="l-mid">
          <h3 class="reveal" style="font-family:var(--sans);font-weight:700;font-size:62px;letter-spacing:-0.04em;color:var(--blue);margin-bottom:64px">
            <span style="opacity:.75">${s.n}</span> ${s.title}
          </h3>
          <p class="body reveal" style="--d:.18s;font-size:31px;max-width:600px">${s.body}</p>
        </div>
        <div class="reveal" style="--d:.3s;display:flex;align-items:center;justify-content:center;padding:0 30px">
          ${bend({ src: s.src, name: s.name, w: 470, h: 620, right: k % 2 === 1 })}
        </div>
      </div>`,
  })),

  /* 12 — was 15 */
  {
    section: 'The Verdict',
    grain: true,
    html: `
      <div class="pad l-centre">
        <h2 class="display display--m reveal" style="margin-bottom:56px">
          <span class="hl">We'll tell you if it's not working.</span>
        </h2>
        <p class="body reveal" style="--d:.16s;max-width:1080px;text-align:center;font-size:26px">
          Plenty of agencies will spend your money for as long as you'll keep giving it to them. We won't.
        </p>
        <p class="body reveal" style="--d:.26s;max-width:1080px;text-align:center;font-size:26px">
          If a song isn't converting, we say so and move to the next one. That's the whole point of testing 12 of them.
        </p>
        <p class="body reveal" style="--d:.36s;max-width:1080px;text-align:center;font-size:26px;color:var(--blue);font-weight:600;margin-top:34px">
          You're not paying us to be optimistic. You're paying us for an answer.
        </p>
      </div>`,
  },

  /* 13 — 19 + 20 merged */
  {
    section: 'Reporting',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.8fr 1.2fr;align-items:center;gap:110px">
        <div>
          <h2 class="display reveal" style="font-size:56px;letter-spacing:-0.04em;line-height:1.28;margin-bottom:16px">
            <span class="hl">You'll see everything.</span>
          </h2>
          <h2 class="display reveal" style="--d:.12s;font-size:56px;letter-spacing:-0.04em;line-height:1.12;color:var(--head);margin-bottom:40px">
            We mean everything.
          </h2>
          <p class="body reveal" style="--d:.24s;font-size:23px">
            Live dashboard, updated daily. Written status report every week.
            Full review every month where we go through what the data's saying and what we're doing about it.
          </p>
        </div>
        <div class="shot reveal" style="--d:.32s;max-width:840px;justify-self:center">
          <img src="${img('dashboard.jpg')}" alt="Sweat.fm live dashboard">
        </div>
      </div>`,
  },

  /* 14 — was 21 */
  {
    section: 'Case study: The Listros',
    grain: 'soft',
    html: `
      <div class="pad l-split" style="align-items:center;gap:120px">
        <div>
          <div class="label reveal" style="font-size:18px;margin-bottom:34px">Unlocking catalogue value</div>
          <h2 class="display reveal" style="--d:.1s;font-size:70px;margin-bottom:38px">0 to 300K<br>monthly listeners.</h2>
          <p class="body reveal" style="--d:.22s;font-size:23px;max-width:480px">
            Most artists ignore their catalogue. We found a track with algorithmic potential and scaled it
            systematically. Huge growth on modest spend.
          </p>
          <div class="reveal" style="--d:.34s;margin-top:64px">
            ${bend({ src: 'the-listros__lens.jpg', name: 'The Listros', w: 320, h: 222, soft: true })}
          </div>
        </div>
        <div class="shot reveal" style="--d:.3s;max-width:690px;justify-self:center">
          <img src="${img('chartmetric.jpg')}" alt="Chartmetric: The Listros Spotify monthly listeners, 300.77K">
        </div>
      </div>`,
  },

  /* 15 — was 22 */
  {
    section: 'Case study: Cristoph',
    grain: 'soft',
    html: `
      <div class="pad l-split" style="align-items:center;gap:120px">
        <div>
          <h2 class="display reveal" style="font-size:70px;margin-bottom:34px">0 to 8M streams<br>in 90 days.</h2>
          <div class="kicker reveal" style="--d:.14s;font-size:25px;margin-bottom:30px">£6K spend · 24p cost per listener</div>
          <p class="body reveal" style="--d:.24s;font-size:23px;max-width:480px">
            Breaking a new release. 25+ content variations tested before we scaled a penny.
            The testing framework was the reason it worked.
          </p>
        </div>
        <div class="shot reveal" style="--d:.3s;max-width:690px;justify-self:center">
          <img src="${img('spotify.jpg')}" alt="Spotify for Artists: Spacer, 243,611 streams">
        </div>
      </div>`,
  },

  /* 16 — the offer. Was V3's slide 24; PJ moved it ahead of the closing
     section title, and it now carries the price alone — the scaling tiers
     moved to slide 18 where they belong. Price per PJ: $4.5k / 3mo, $2k PCM. */
  {
    section: 'The offer',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:0.66fr 1.34fr;align-items:center;gap:86px">
        <div class="reveal" style="display:flex;align-items:center;justify-content:center">
          ${bend({ src: 'artist__kid-apollo-compress__lens.jpg', name: 'Kid Apollo', w: 420, h: 590 })}
        </div>

        <div style="display:flex;flex-direction:column;justify-content:center;gap:62px">
          <div>
            <h2 class="display reveal" style="font-size:68px;line-height:1.22;white-space:nowrap"><span class="hl">$4,500 for (3) three months.</span></h2>
            <p class="reveal" style="--d:.1s;font-size:40px;font-weight:600;margin-top:32px">Or $2,000 a month.</p>
            <p class="reveal" style="--d:.16s;font-size:23px;opacity:.62;margin-top:14px">Ad spend on top, minimum $1,000 a month.</p>
          </div>

          <div class="rule reveal" style="--d:.24s"></div>

          <div>
            <ol class="steps reveal" style="--d:.3s">
              <li><span>01</span>Book a call — where you are now, where you want to get to.</li>
              <li><span>02</span>We pick the songs together.</li>
              <li><span>03</span>First tests live within a week.</li>
              <li><span>04</span>Ninety days later, you'll know.</li>
            </ol>
            <p class="reveal" style="--d:.4s;font-size:28px;font-weight:700;margin-top:44px">
              Ready? <a href="mailto:pj@sweatstrategies.com" style="color:var(--blue)">pj@sweatstrategies.com</a>
            </p>
          </div>
        </div>
      </div>`,
  },

  /* 17 — was V3's 23. Black, grainy, bracketed — the treatment PJ picked out
     of old slide 6. Now the lead-in to what scaling looks like. */
  {
    section: 'What happens next',
    grain: true,
    html: `
      <div class="pad l-centre">
        <h2 class="display display--l reveal"><span class="bracket">When we find your song</span></h2>
      </div>`,
  },

  /* 18 — new. The scaling and multi-platform offer. The two tiers are Miguel's
     wording, lifted off the old offer slide; the framing copy is new. */
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
            A song that works on one platform rarely stops there. Once the tests
            tell us what's landing, we take the winning creative and put budget
            behind it across every channel that can turn a listener into a fan.
          </p>
        </div>

        <div style="display:flex;flex-direction:column;gap:44px">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:56px">
            <div class="reveal" style="--d:.24s">
              <div class="tier">Scale it</div>
              <p class="body" style="font-size:23px;max-width:none">
                20% on ad spend above $5,000 a month. We push as hard as the data says we should.
              </p>
            </div>
            <div class="reveal" style="--d:.3s">
              <div class="tier">Grow it</div>
              <p class="body" style="font-size:23px;max-width:none">
                $2,000 a month. YouTube and TikTok, plus we build your fan capture flow.
              </p>
            </div>
          </div>

          <p class="reveal" style="--d:.36s;font-size:25px;font-weight:600;line-height:1.5">
            Ads rent your listeners. A fan capture flow means you own the audience instead.
          </p>

          <div class="rule reveal" style="--d:.42s"></div>

          <div class="reveal" style="--d:.46s">
            <div class="label" style="margin-bottom:24px">Channels we run</div>
            <ul class="channels">
              <li>Meta</li><li>TikTok</li><li>YouTube</li><li>Spotify</li>
              <li>Apple</li><li>Live</li><li>Merch</li>
            </ul>
          </div>
        </div>
      </div>`,
  },
];
