/* ------------------------------------------------------------------
   Case studies — Independent artists

   Every case study we have, biggest first, so an artist can see the
   ceiling and then find the campaign that looks like theirs. The tail
   of this deck — House of the Silent, Breathe Easy, the developing
   artist — is the point of it: results at a scale an artist can
   actually picture, including a record in its first week.

   Evidence only. No method, no roster, no offer, no call to action —
   those live in the proposal deck this is meant to accompany.

   The cases themselves live in cases.js, shared with the labels deck.
   ------------------------------------------------------------------ */

import { bend } from './parts.js';
import { named as c } from './cases.js';

export const SLIDES = [
  /* 01 — title */
  {
    section: 'Case studies',
    grain: 'soft',
    html: `
      <div class="pad" style="display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:70px">
        <div>
          <div class="label reveal" style="margin-bottom:40px">Independent artists</div>
          <h1 class="display reveal" style="--d:.1s;font-size:150px;line-height:0.94">Case<br>studies.</h1>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;gap:48px">
          ${bend({ src: 'the-listros__lens.jpg', name: 'The Listros', w: 300, h: 208, soft: true })}
          ${bend({ src: 'artist__st-lundi__lens.jpg', name: 'St Lundi', w: 250, h: 300, right: true })}
        </div>
      </div>`,
  },

  /* streams, largest first */
  c.distracted,          // 73.8M
  c.asSoonAsIGetHome,    // 48.9M
  c.harryT,              //  7.2M
  c.maribouState,        //  4.3M
  c.fromGoodToBad,       //  2.0M
  c.ruthanne,            //  466K
  c.forever,             //  257K
  c.cristoph,            //  244K
  c.kogis,               //  205K
  c.houseOfTheSilent,    // 38.5K
  c.breatheEasy,         // 10.2K
  c.artistGrowth,        // account-level growth on an 8.8K-listener artist

  /* not measured in streams */
  c.theListros,          // monthly listeners
  c.admt,                // tickets
  c.markTuan,            // merch revenue
];
