/* ------------------------------------------------------------------
   Statement ads — the C set
   Source: Sweat-Case-Studies-Labels-Anonymised.pdf (decks/), twelve cases.

   ANONYMOUS BY CONSTRUCTION. No artist, track, label or partner is named
   in this file, and no layout here carries photography — a face beside a
   figure identifies the campaign as surely as a name does. Every figure is
   real. If you add an ad here, it stays anonymous: that is the whole reason
   this set can run at all.

   Figures are converted from the deck's £ at roughly 1.27 and rounded for a
   clean read — they are not exact FX. Each entry carries the deck figure it
   came from in `source` so the two can be reconciled without opening the PDF.

   Every ad renders through statement.html at every size in SIZES, so the
   design cannot drift across the set. Copy is the only thing that varies.
   ------------------------------------------------------------------ */

export const CTA = 'Book a discovery call';

/* ------------------------------------------------------------------ design

   One switch for the whole set — flip a value and re-export, and all eleven
   change together. That is the point: nothing is set per ad.

   layout   'editorial'  the reference layout — label, hero, sub, upper-
                         weighted, enormous air, no CTA and no wordmark.
                         Modelled on the best-performing live ad.
            'statement'  bottom-weighted with the wordmark and the CTA pill.

   ground   'paper'      the light surface, ink on cream
            'dark'       the black ground

   cta      false        Meta renders its OWN call-to-action button under the
                         creative in feed, and a second one baked into the
                         image reads as a mistake — see README, "The CTA
                         question". Turn it on only for a placement that has
                         no platform button of its own.

   mark     false        the reference carries no logo either. On at your
                         discretion; it costs the ad some of its restraint.
*/
export const DESIGN = {
  layout: 'editorial',
  ground: 'paper',
  cta: false,
  mark: false,
  label: 'Paid media for music',
};

/* ------------------------------------------------------------------- sizes

   `safe` is the platform chrome that sits ON TOP of the creative, in pixels
   at that size — the copy is inset by it. Feed placements have none: the
   profile row and the CTA button are drawn outside the image. Stories and
   Reels have plenty, and the numbers below are the stricter Reels set, since
   one 9:16 export serves both.

   `gridCrop` marks a size that Instagram centre-crops to 1:1 in the profile
   grid. It does not affect a paid placement — it matters only if the same
   file is also posted organically.
*/
export const SIZES = {
  'portrait-1350': {
    w: 1080, h: 1350, uref: 1080,
    safe: { top: 0, right: 0, bottom: 0 },
    gridCrop: true,
  },
  'square-1080': {
    w: 1080, h: 1080, uref: 1080,
    safe: { top: 0, right: 0, bottom: 0 },
  },
  'story-1920': {
    w: 1080, h: 1920, uref: 960,
    /* top: avatar and handle row. bottom: caption, handle, audio ticker.
       right: the like / comment / share / audio rail. */
    safe: { top: 250, right: 180, bottom: 440 },
  },
};

/* pick: the four PJ flagged to test first lead the set */
export const STATEMENTS = [
  {
    id: 'C1',
    note: 'EP, compounding audience',
    hero: '48.9 million streams on one EP. In twelve months.',
    sub: "$28K spend. 18¢ CPR. Six streams per listener — that's an audience coming back, not passing through.",
    source: '48.9M in window · £22K · 14p',
  },
  {
    id: 'C2',
    note: 'Album, year-on-year',
    hero: '73.8 million streams. Up 437% year on year.',
    sub: '$23K spend. 20¢ CPR. Same catalogue, same artist — different strategy.',
    source: '73.8M in window · £18K · 16p',
  },
  {
    id: 'C3',
    note: 'Debut artist, zero following',
    hero: '257,000 streams in month one. No social media. No following.',
    sub: '$6K spend. 18¢ CPR. The track did the work.',
    source: '257K in window · £5K · 14p',
  },
  {
    id: 'C4',
    note: '11-year-old catalogue track',
    hero: 'An 11-year-old track. 4.3 million streams in 28 days.',
    sub: "$5K spend. 23¢ CPR. Catalogue doesn't decay on its own — it decays when nobody works it.",
    source: '4.35M in window · £4K · 18p',
  },
  {
    id: 'C5',
    note: 'Cheapest CPR in the deck',
    hero: '11 cents per result.',
    sub: 'A catalogue track nobody was spending on. 76K to 300K monthly listeners in six months.',
    source: '$0.11 CPR · $1–3K pcm — already in $, not converted',
  },
  {
    id: 'C6',
    note: 'Growth that held',
    hero: '5,000 to 50,000 streams a day. And it held there.',
    sub: "$15K spend. 20¢ CPR. Growth that doesn't fall back down once you stop watching it.",
    source: '2.02M in window · £12K · 16p',
  },
  {
    id: 'C7',
    note: 'Steady spend on a back catalogue record',
    hero: '$2K a month. Four months. 1,500 to 11,000 streams a day.',
    sub: '30¢ CPR. No new release, no new recording — just consistent, correctly-targeted spend on a record that was already out.',
    source: '466K in window · £1.5K pcm · 24p',
  },
  {
    id: 'C8',
    note: 'Cold-start dance record',
    hero: '0 to 18,000 streams a day. Three weeks.',
    sub: '$4K spend. 15¢ CPR.',
    source: '244K in window · £3K · 12p',
  },
  {
    id: 'C9',
    note: 'New single, three weeks',
    hero: 'Nothing on release day. 25,000 streams a day three weeks later.',
    sub: '$6K spend. 19¢ CPR. The line only bends once the spend finds the right audience.',
    source: '205K in window · £4.5K · 15p',
  },
  {
    id: 'C10',
    note: 'New release, first 90 days',
    hero: '0 to 7.2 million streams in 90 days.',
    sub: '$8K spend. 25¢ CPR. 25+ content variations tested before a dollar scaled.',
    /* NOTE: the live best-performing ad states this case as 8 million / 30¢,
       which is the V3 and proposal-doc figure (£6K · 24p). The anonymised
       deck states 7.2M · £6K · 20p, which is what the v5 brief follows and
       what is set above. Both are the same campaign — one of them needs to
       win before this ad runs alongside the live one. */
    source: '7.2M in window · £6K · 20p — live ad says 8M · 24p, see note',
  },
  {
    id: 'C11',
    note: 'Tickets',
    hero: '5,000 tickets sold on $8K of ad spend.',
    sub: '$85K gross. 11:1 return. Every dollar attributed.',
    source: '5,000 tickets · £6K · £66K gross · 11:1',
  },
];

export const byId = (id) => STATEMENTS.find((s) => s.id === id);
