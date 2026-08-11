/* ------------------------------------------------------------------
   Shared slide fragments. Every deck builds from these, so a change to
   the bend or the spine lands everywhere at once.
   ------------------------------------------------------------------ */

const IMG = 'assets/img';

/* every image goes through here so the standalone build can swap in data URIs */
export const img = (name) => `${IMG}/${name}`;

/* the site's scroll-drawn spine — sweat-website/index.html */
export const SPINE_PATH =
  'M61.1635 0.5C61.1635 0.5 61.1635 398.555 61.1635 408.742C61.1635 418.929 62.8489 451.754 56.107 460.81C49.3651 469.864 26.6098 474.392 26.6098 497.03C26.6098 519.668 85.6033 520.8 86.4464 542.306C87.2888 563.812 22.3965 562.679 22.3965 596.637C22.3965 630.593 108.358 621.538 108.358 648.703C108.358 675.869 3.85551 669.078 3.85551 700.771C3.85551 732.464 119.314 710.958 119.314 751.706C119.314 792.454 1.32764 769.816 1.32764 807.168C1.32764 844.521 115.1 823.015 115.1 858.104C115.1 893.192 11.4405 884.137 11.4405 916.961C11.4405 949.786 99.088 932.808 99.088 967.897C99.088 1002.99 35.038 992.798 35.038 1024.49C35.038 1056.18 72.9618 1046 72.9618 1070.9C72.9618 1095.8 35.038 1109.38 35.038 1133.15C35.038 1156.92 99.088 1165.98 99.088 1182.95C99.088 1199.93 11.4405 1206.73 11.4405 1237.29C11.4405 1267.84 119.314 1257.66 119.314 1289.36C119.314 1321.05 2.17001 1305.2 2.17001 1343.68C2.17001 1382.17 119.314 1362.93 119.314 1395.75C119.314 1428.58 2.17001 1412.73 2.17001 1451.22C2.17001 1489.7 110.886 1463.67 110.886 1504.42C110.886 1545.16 19.8679 1524.78 19.8679 1556.48C19.8679 1588.17 85.6033 1585.91 85.6033 1609.67C85.6033 1633.45 33.5296 1643.97 33.5296 1670C33.5296 1696.04 61.1635 1692.6 61.1635 1717.5C61.1635 1742.4 61.1635 2023.95 61.1635 2023.95';

/* dx nudges the spine off dead-centre so it lands in a slide's real gutter
   rather than through a column of text */
export const spine = (mod = '', dx = 0) =>
  `<div class="pathline ${mod}"${dx ? ` style="transform:translateX(${dx}px)"` : ''}><svg viewBox="0 0 120 1620" preserveAspectRatio="xMidYMid meet"><path d="${SPINE_PATH}"/></svg></div>`;

export const blobs = (list) =>
  list.map((b) => `<div class="blob blob--${b.k}" style="${b.pos}"></div>`).join('');

/* a straight artist image, absolutely placed — Miguel's scatter treatment */
export const tile = ({ src, name, x, y, w, h }) => `
  <img class="tile" src="${img(src)}" alt="${name}"
       style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">`;

/* a bent artist card — site treatment: rotateY on a long perspective */
export const bend = ({ src, name, w, h, right = false, soft = false, style = '' }) => `
  <div class="bend ${right ? 'bend--right' : ''} ${soft ? 'bend--soft' : ''}" style="${style}">
    <div class="bend__inner">
      ${name ? `<div class="bend__cap">${name}</div>` : ''}
      <div style="width:${w}px;height:${h}px;overflow:hidden">
        <img src="${img(src)}" alt="${name || ''}">
      </div>
    </div>
  </div>`;

/* Screenshots in a device frame — a screenshot floating on a slide reads as
   a screenshot; in a device it reads as a product.

   laptop() is the one in use. Its frame is the mockup PJ supplied, cut off
   its checkerboard by scripts/cut-laptop.mjs, which leaves the display as a
   hole in the PNG — so the screenshot sits behind the frame and shows
   through it, rather than being pasted on top and having to be perspective-
   matched.

   browser() is the drawn alternative, kept because a laptop screen is a
   fixed 16:10 and letterboxes anything much wider. */

export const laptop = ({ src, alt }) => `
  <div class="lap">
    <div class="lap__screen"><img src="${img(src)}" alt="${alt}"></div>
    <img class="lap__frame" src="${img('laptop.png')}" alt="">
  </div>`;

export const browser = ({ src, alt, url = 'sweat.fm' }) => `
  <div class="brw">
    <div class="brw__bar">
      <span class="brw__dot"></span><span class="brw__dot"></span><span class="brw__dot"></span>
      <span class="brw__url">${url}</span>
    </div>
    <div class="brw__view"><img src="${img(src)}" alt="${alt}"></div>
  </div>`;

/* An Instagram voice note, drawn rather than screenshotted — a real one carries
   a real fan's handle and profile picture, and this deck gets forwarded.

   The waveform is deterministic on purpose: Math.random() would redraw it on
   every render, so the PDF and the live deck would disagree. */
export const voicenote = ({ time = '0:14', bars = 46, alt = 'Voice note from the artist' }) => {
  const wave = Array.from({ length: bars }, (_, i) => {
    const h = 18 + Math.round(30 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)));
    return `<i style="height:${h}px"></i>`;
  }).join('');
  return `
    <div class="vn" role="img" aria-label="${alt}">
      <span class="vn__play"></span>
      <span class="vn__wave">${wave}</span>
      <span class="vn__time">${time}</span>
    </div>`;
};

/* ------------------------------------------------------------- the roster */

/* Defined once and used by all three decks that carry it, so a name added
   here appears everywhere rather than in whichever file got remembered. */

export const ARTISTS = [
  'Swedish House Mafia', 'Disclosure', 'Bonobo', 'Maribou State', 'Thundercat',
  'Elderbrook', "Barry Can't Swim", 'Kerri Chandler', 'Blond:Ish', 'Carlita',
  'Mark Tuan', 'Leon Thomas', 'Omar+', 'St Lundi', 'ADMT', 'Harry T',
  'Cristoph', 'Sam Alfred', 'Gaskin', 'The Listros', 'KOGIS', 'Ruthanne',
  'Ethan Walsh', 'Kid Apollo', 'Boy Loco', 'Dolores Forever', 'The Knocks',
  'Rules', 'Morly', 'Scout', 'Ormella',
];

export const PARTNERS = [
  'Atlantic Records', 'BMG', 'Ninja Tune', 'Live Nation', 'CAA', 'SJM',
  'Disorder', 'Propeller', 'Redlight', 'Too Lost', '3000 Years', 'Funfair',
  'Circuit Group', 'Chosen Music',
];

/* `note` is the paragraph under the lists. The anonymised case-study deck
   uses it to say the data has been anonymised; the proposals pass nothing,
   because there they'd be claiming something that isn't true of them. */
export const roster = ({ note = '' } = {}) => ({
  section: 'Artists & partners',
  grain: 'soft',
  html: `
    <div class="pad l-mid">
      <div class="label reveal" style="margin-bottom:32px">Artists</div>
      <p class="reveal" style="--d:.1s;font-family:var(--sans);font-weight:700;font-size:40px;line-height:1.36;letter-spacing:-0.035em;max-width:1620px">
        ${/* nowrap per name, or the line breaks land inside them — "Barry /
             Can't Swim" reads as two acts */ ''}
        ${ARTISTS.map((a) => `<span style="white-space:nowrap">${a}</span>`).join(' · ')}
      </p>
      <div class="rule reveal" style="--d:.26s;margin:60px 0 40px"></div>
      <div class="label reveal" style="--d:.32s;margin-bottom:26px">Labels &amp; partners</div>
      <ul class="channels reveal" style="--d:.38s">
        ${PARTNERS.map((p) => `<li>${p}</li>`).join('')}
      </ul>
      ${note ? `<p class="body reveal" style="--d:.46s;font-size:21px;max-width:1060px;margin-top:56px;opacity:0.75">${note}</p>` : ''}
    </div>`,
});

/* ------------------------------------------------------- slide archetypes */

/* a case study carried by a chart: the number on the left, the evidence right */
export const caseChart = ({ section, label, headline, kicker = '', body, shot, alt, card }) => ({
  section,
  grain: 'soft',
  html: `
    <div class="pad" style="display:grid;grid-template-columns:0.82fr 1.18fr;align-items:center;gap:90px;height:100%">
      <div>
        ${label ? `<div class="label reveal" style="font-size:18px;margin-bottom:32px">${label}</div>` : ''}
        <h2 class="display reveal" style="--d:.1s;font-size:66px;margin-bottom:${kicker ? 26 : 32}px">${headline}</h2>
        ${kicker ? `<div class="kicker reveal" style="--d:.16s;font-size:24px;margin-bottom:26px">${kicker}</div>` : ''}
        <p class="body reveal" style="--d:.24s;font-size:22px;max-width:470px">${body}</p>
        ${card ? `<div class="reveal" style="--d:.34s;margin-top:48px">${bend({ ...card, soft: true })}</div>` : ''}
      </div>
      <div class="shot reveal" style="--d:.3s;max-width:880px;justify-self:center">
        <img src="${img(shot)}" alt="${alt}">
      </div>
    </div>`,
});

/* a case study carried by figures, where there's no chart to show */
export const caseStats = ({ section, label, headline, stats, body, card }) => ({
  section,
  grain: 'soft',
  html: `
    ${card ? spine('', -300) : ''}
    <div class="pad" style="display:grid;grid-template-columns:${card ? '0.62fr 1.38fr' : '1fr'};align-items:center;gap:90px">
      ${card ? `<div class="reveal" style="display:flex;align-items:center;justify-content:center">${bend(card)}</div>` : ''}
      <div class="l-mid">
        <div class="label reveal" style="font-size:18px;margin-bottom:32px">${label}</div>
        <h2 class="display reveal" style="--d:.08s;font-size:${card ? 68 : 96}px;max-width:1100px">${headline}</h2>
        <dl class="stats reveal" style="--d:.2s;margin-top:64px">
          ${stats.map((s) => `<div><dt>${s.k}</dt><dd>${s.v}</dd></div>`).join('')}
        </dl>
        <p class="body reveal" style="--d:.32s;font-size:23px;max-width:${card ? 620 : 820}px;margin-top:60px">${body}</p>
      </div>
    </div>`,
});
