/* ------------------------------------------------------------------
   Case studies — Labels & partners, ANONYMISED

   The same cases and the same numbers as slides-labels.js, with nothing
   that identifies which artist produced which result. This is the copy
   that can go out over email.

   What's removed, per case:
     · the screenshot's entire header — artwork, release type, track
       title, all-time streams, release date (scripts/anonymise.mjs)
     · the artist photo cards
     · the artist and release names in the section and label

   What stays: every figure, every date range, every chart.

   Instead, one slide up front lists the artists and partners as a group,
   so a reader knows who Sweat works with without knowing which line on
   which chart belongs to whom.
   ------------------------------------------------------------------ */

import { bend } from './parts.js';
import { anon as c } from './cases.js';

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
          <p class="body reveal" style="--d:.24s;font-size:23px;max-width:520px;margin-top:40px">
            Results shown without the artist attached. Every figure is the
            real one, straight off Spotify for Artists.
          </p>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;gap:48px">
          ${bend({ src: 'artist__disclosure__lens.jpg', name: '', w: 260, h: 286, soft: true })}
          ${bend({ src: 'artist__blondish__lens.jpg', name: '', w: 240, h: 292, right: true })}
        </div>
      </div>`,
  },

  /* 02 — the roster, as a group */
  {
    section: 'Artists & partners',
    grain: 'soft',
    html: `
      <div class="pad l-mid">
        <div class="label reveal" style="margin-bottom:32px">Artists</div>
        <p class="reveal" style="--d:.1s;font-family:var(--sans);font-weight:700;font-size:40px;line-height:1.36;letter-spacing:-0.035em;max-width:1620px">
          Swedish House Mafia · Disclosure · Bonobo · Maribou State · Thundercat ·
          Barry Can't Swim · Blond:Ish · Mark Tuan · Leon Thomas · Omar+ ·
          St Lundi · ADMT · Harry T · Cristoph · The Listros · KOGIS · Ruthanne ·
          Kid Apollo · Dolores Forever · The Knocks · Rules · Morly · Scout ·
          Ormella
        </p>
        <div class="rule reveal" style="--d:.26s;margin:60px 0 40px"></div>
        <div class="label reveal" style="--d:.32s;margin-bottom:26px">Labels &amp; partners</div>
        <ul class="channels reveal" style="--d:.38s">
          <li>Atlantic Records</li><li>BMG</li><li>Ninja Tune</li><li>Live Nation</li>
          <li>CAA</li><li>SJM</li><li>Disorder</li><li>Propeller</li><li>Redlight</li>
          <li>Too Lost</li><li>3000 Years</li><li>Funfair</li>
        </ul>
        <p class="body reveal" style="--d:.46s;font-size:21px;max-width:1000px;margin-top:56px;opacity:0.75">
          The campaigns that follow are drawn from this roster. We've kept the
          results and left the names off — happy to talk through any of them
          in person.
        </p>
      </div>`,
  },

  /* The EP leads, per PJ — it's the strongest opener. Everything after it
     runs largest first, as in the named deck. */
  c.asSoonAsIGetHome,    // averaged 134K a day
  c.distracted,          // averaged 202K a day
  c.harryT,              // averaged  76K a day
  c.maribouState,        // averaged 155K a day over 28 days
  c.fromGoodToBad,       // averaged  18K a day, peak above 50K
  c.ruthanne,            // climbed to 11K a day
  c.forever,             // peak day 19,930
  c.cristoph,            // climbed to 18K a day
  c.kogis,               // peak day 25,470

  /* not measured in daily streams */
  c.theListros,          // monthly listeners
  c.markTuan,            // merch revenue
  c.admt,                // tickets
];
