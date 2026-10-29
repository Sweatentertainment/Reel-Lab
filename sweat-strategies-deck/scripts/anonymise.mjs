/* Build anonymised copies of the case-study screenshots.
 *
 *   node scripts/anonymise.mjs
 *
 * For a version that can go out over email without naming the artist, the
 * release artwork and the track title have to go while every number stays
 * readable.
 *
 * Blurring them was the first attempt and it isn't safe enough: a two-line
 * title only had its second line caught, and pale artwork wasn't detected
 * as artwork at all. So this crops the whole header off instead — artwork,
 * type label, title, all-time streams and release date, everything above
 * the "Overview / Location / Playlists" nav. Nothing identifying survives,
 * and there's no blur left for anyone to squint through.
 *
 * What's kept is the part that matters: the nav, the date range, the stats
 * row and the chart. Note that the all-time stream count goes with the
 * header, so anon copy must not quote it.
 *
 * The nav row is found rather than assumed. Every header puts the artwork
 * hard against the left margin, so scanning below the artwork for the first
 * inked row that starts within 60px of the edge lands on "Overview".
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const DIR = 'assets/img';
const SHOTS = [
  'cs-distracted', 'cs-as-soon-as-i-get-home', 'cs-harry-t-4am-90',
  'cs-maribou-midas', 'cs-from-good-to-bad', 'cs-ruthanne-the-moment',
  'cs-forever', 'cs-cristoph-spacer', 'cs-kogis-head-up',
];

const b = await chromium.launch();
const p = await b.newPage();

for (const name of SHOTS) {
  const src = path.join(DIR, `${name}.jpg`);
  const data = 'data:image/jpeg;base64,' + fs.readFileSync(src).toString('base64');

  const out = await p.evaluate(async (d) => {
    const img = new Image();
    await new Promise((r) => { img.onload = r; img.src = d; });
    const W = img.width, H = img.height;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const x = c.getContext('2d');
    x.drawImage(img, 0, 0);
    const px = x.getImageData(0, 0, W, H).data;
    const dark = (cx, cy) => {
      const i = (cy * W + cx) * 4;
      return px[i] < 232 || px[i + 1] < 232 || px[i + 2] < 232;
    };

    /* every artwork thumbnail is well clear of 260px tall at this width, so
       start looking for the nav below that */
    const FLOOR = Math.round(W * 0.17);
    let navY = -1;
    for (let y = FLOOR; y < Math.round(W * 0.4); y++) {
      let first = -1;
      for (let cx = 0; cx < Math.round(W * 0.45); cx++) {
        if (dark(cx, y)) { first = cx; break; }
      }
      if (first >= 0 && first < 60) { navY = y; break; }
    }
    if (navY < 0) return { error: 'no nav row found' };

    const top = Math.max(0, navY - 16);
    const c2 = document.createElement('canvas');
    c2.width = W; c2.height = H - top;
    const x2 = c2.getContext('2d');
    x2.fillStyle = '#fff';
    x2.fillRect(0, 0, c2.width, c2.height);
    x2.drawImage(c, 0, top, W, H - top, 0, 0, W, H - top);

    return { u: c2.toDataURL('image/jpeg', 0.86), top, h: H - top };
  }, data);

  if (out.error) { console.log(`${name}: ${out.error}`); continue; }
  fs.writeFileSync(path.join(DIR, `${name}__anon.jpg`), Buffer.from(out.u.split(',')[1], 'base64'));
  console.log(`${name}__anon.jpg  cropped ${out.top}px of header, ${out.h}px tall`);
}
await b.close();
