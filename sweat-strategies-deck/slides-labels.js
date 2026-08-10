/* ------------------------------------------------------------------
   Case studies — Labels & partners

   Only campaigns that took a record above 10,000 streams a day, biggest
   first. Every kicker states the rate it's included on — an averaged
   figure where the whole window clears the bar, a peak-day tooltip
   where the climb crosses it — so the threshold is checkable off the
   chart rather than taken on trust.

   Left out on that rule: House of the Silent (peak 1,469 a day),
   Breathe Easy (~4,000) and the developing-artist growth slide (~550).
   All three are in the independent-artists deck. ADMT is a ticketing
   result rather than a streaming one, so it sits there too.

   The Listros and Mark Tuan stay: one is measured in monthly listeners
   and the other in merch revenue, so the daily-streams rule doesn't
   reach either of them.

   Evidence only. No method, no roster, no offer, no call to action —
   those live in the proposal deck this is meant to accompany.

   The cases themselves live in cases.js, shared with the indie deck.
   ------------------------------------------------------------------ */

import { bend } from './parts.js';
import {
  distracted, asSoonAsIGetHome, harryT, maribouState, fromGoodToBad,
  ruthanne, forever, cristoph, kogis,
  theListros, markTuan,
} from './cases.js';

export const SLIDES = [
  /* 01 — title */
  {
    section: 'Case studies',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:70px">
        <div>
          <div class="label reveal" style="margin-bottom:40px">Labels &amp; partners</div>
          <h1 class="display reveal" style="--d:.1s;font-size:150px;line-height:0.94">Case<br>studies.</h1>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;gap:48px">
          ${bend({ src: 'artist__disclosure__lens.jpg', name: 'Disclosure', w: 260, h: 286, soft: true })}
          ${bend({ src: 'artist__blondish__lens.jpg', name: 'Blond:Ish', w: 240, h: 292, right: true })}
        </div>
      </div>`,
  },

  /* above 10K streams a day, largest first */
  distracted,          // averaged 202K a day
  asSoonAsIGetHome,    // averaged 134K a day
  harryT,              // averaged  76K a day
  maribouState,        // averaged 155K a day over 28 days
  fromGoodToBad,       // averaged  18K a day, release week above 50K
  ruthanne,            // climbed to 11K a day
  forever,             // peak day 19,930
  cristoph,            // climbed to 18K a day
  kogis,               // peak day 25,470

  /* not measured in daily streams */
  theListros,          // monthly listeners
  markTuan,            // merch revenue
];
