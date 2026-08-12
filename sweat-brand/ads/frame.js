/* Shared ad furniture.
 *
 * Two jobs, both of which would otherwise be copy-pasted into every template:
 *
 *   1. The spine. It is a 2KB SVG path lifted from the site — writing
 *      <div class="spine"></div> gets it drawn.
 *   2. Preview fit. A 1080x1920 story does not fit a laptop window, so each
 *      .ad is scaled down to fit on screen. scripts/export-png.mjs adds
 *      .is-exporting to <body>, which turns the scaling off, so the PNG
 *      always comes out at native size no matter what window rendered it.
 *
 * Everything else an ad needs is a class in system.css. No layout lives here.
 */

/* sweat-website/index.html — the path the site draws down the centre on scroll */
export const SPINE_PATH =
  'M61.1635 0.5C61.1635 0.5 61.1635 398.555 61.1635 408.742C61.1635 418.929 62.8489 451.754 56.107 460.81C49.3651 469.864 26.6098 474.392 26.6098 497.03C26.6098 519.668 85.6033 520.8 86.4464 542.306C87.2888 563.812 22.3965 562.679 22.3965 596.637C22.3965 630.593 108.358 621.538 108.358 648.703C108.358 675.869 3.85551 669.078 3.85551 700.771C3.85551 732.464 119.314 710.958 119.314 751.706C119.314 792.454 1.32764 769.816 1.32764 807.168C1.32764 844.521 115.1 823.015 115.1 858.104C115.1 893.192 11.4405 884.137 11.4405 916.961C11.4405 949.786 99.088 932.808 99.088 967.897C99.088 1002.99 35.038 992.798 35.038 1024.49C35.038 1056.18 72.9618 1046 72.9618 1070.9C72.9618 1095.8 35.038 1109.38 35.038 1133.15C35.038 1156.92 99.088 1165.98 99.088 1182.95C99.088 1199.93 11.4405 1206.73 11.4405 1237.29C11.4405 1267.84 119.314 1257.66 119.314 1289.36C119.314 1321.05 2.17001 1305.2 2.17001 1343.68C2.17001 1382.17 119.314 1362.93 119.314 1395.75C119.314 1428.58 2.17001 1412.73 2.17001 1451.22C2.17001 1489.7 110.886 1463.67 110.886 1504.42C110.886 1545.16 19.8679 1524.78 19.8679 1556.48C19.8679 1588.17 85.6033 1585.91 85.6033 1609.67C85.6033 1633.45 33.5296 1643.97 33.5296 1670C33.5296 1696.04 61.1635 1692.6 61.1635 1717.5C61.1635 1742.4 61.1635 2023.95 61.1635 2023.95';

const spines = () => {
  for (const el of document.querySelectorAll('.spine:empty')) {
    el.innerHTML =
      `<svg viewBox="0 0 120 1620" preserveAspectRatio="xMidYMid slice">` +
      `<path d="${SPINE_PATH}"/></svg>`;
  }
};

/* Scale each ad to fit the window, and reserve the height it actually
   occupies once scaled — a transform does not affect layout, so without this
   the page under-scrolls. */
const fit = () => {
  if (document.body.classList.contains('is-exporting')) return;

  for (const ad of document.querySelectorAll('.ad')) {
    const w = Number(getComputedStyle(ad).getPropertyValue('--cw'));
    const h = Number(getComputedStyle(ad).getPropertyValue('--ch'));
    if (!w || !h) continue;

    const room = { w: window.innerWidth - 80, h: window.innerHeight - 80 };
    const scale = Math.min(1, room.w / w, room.h / h);

    ad.style.setProperty('--fit', scale);
    ad.style.marginBottom = `${h * scale - h}px`;
  }
};

spines();
fit();
addEventListener('resize', fit);
