/* ------------------------------------------------------------------
   The case studies themselves — one definition each, shared by both
   case-study decks so the two can never drift apart. The deck files
   just choose which ones to show and in what order.

   Every figure on a chart case is read straight off the screenshot
   beside it: streams, listeners, playlist adds, saves, dates. Where a
   slide quotes a per-day rate, it is either a tooltip value from the
   chart ("peak day") or the period total divided by the number of days
   in the window ("averaged"). Nothing is estimated.

   Two figures come from SweatProposalNewtonFaulkner (PJ's own doc,
   4 Aug 2026) rather than a screenshot: ADMT's ticket numbers and the
   cost-per-listener figures. Mark Tuan's merch number comes from
   Miguel's V3 deck.

   ARTIST NAMES. Six screenshots show the release but not the artist, so
   those cases are titled by release and marked below. They need naming.
   ------------------------------------------------------------------ */

import { caseChart, caseStats } from './parts.js';

/* ---------------------------------------------- above 10K streams a day */

/* artist not shown in the screenshot */
export const distracted = caseChart({
  section: 'Distracted',
  label: 'Distracted — album',
  headline: '73.8M streams<br>in twelve months.',
  kicker: 'Averaged 202K a day · up 437% year on year',
  body: `14.6 million listeners, 3 million playlist adds and 5.9 million saves.
         The record went from 13.7M streams the previous year to 73.8M.`,
  shot: 'cs-distracted.jpg',
  alt: 'Spotify for Artists: Distracted — 73,766,220 streams and 14,608,972 listeners, 7 August 2025 to 6 August 2026, up 437.5% on the previous period',
});

/* artist not shown in the screenshot */
export const asSoonAsIGetHome = caseChart({
  section: 'As Soon As I Get Home',
  label: 'As Soon As I Get Home — EP',
  headline: '48.9M streams<br>on one EP.',
  kicker: 'Averaged 134K a day · 8 million listeners',
  body: `1.16 million playlist adds and 656,650 saves. Six streams per listener
         says the audience came back rather than passing through once.`,
  shot: 'cs-as-soon-as-i-get-home.jpg',
  alt: 'Spotify for Artists: As Soon As I Get Home — 48,893,352 streams and 8,048,437 listeners over twelve months to 6 August 2026',
});

/* The screenshot is filtered to the actual 90-day window (28 Sep – 31 Dec
   2025), which reads 7,199,480 — not the 8M V3 claimed off a five-month
   view. The headline follows the chart. */
export const harryT = caseChart({
  section: 'Harry T',
  label: 'Harry T — 4AM',
  headline: '0 to 7.2M streams<br>in 90 days.',
  kicker: '£6K spend · 20p cost per listener',
  body: `1.3 million listeners, 278,021 playlist adds and 401,579 saves in the
         first three months, averaging 76K streams a day. 25+ content variations
         tested before we scaled a penny.`,
  shot: 'cs-harry-t-4am-90.jpg',
  alt: 'Spotify for Artists: Harry T, 4AM — 7,199,480 streams and 1,302,137 listeners, 28 September to 31 December 2025',
  card: { src: 'artist__harry-t__lens.jpg', name: 'Harry T', w: 250, h: 250 },
});

export const maribouState = caseChart({
  section: 'Maribou State',
  label: 'Maribou State — Midas',
  headline: '4.3M streams<br>in 28 days on a<br>2015 record.',
  kicker: 'Averaged 155K a day · up 14.1% on the month before',
  body: `Eleven years old, 234 million all-time, and still moving. Catalogue
         doesn't decay on its own — it decays when nobody works it.`,
  shot: 'cs-maribou-midas.jpg',
  alt: 'Spotify for Artists: Maribou State, Midas — 4,352,888 streams and 1,917,533 listeners, 10 July to 6 August 2026, up 14.1% on the previous period',
});

/* artist not shown in the screenshot */
export const fromGoodToBad = caseChart({
  section: 'From Good To Bad',
  label: 'From Good To Bad And Then Back Again',
  headline: '2M streams<br>across an album<br>campaign.',
  kicker: 'Averaged 18K a day · release week above 50K',
  body: `Built over sixteen weeks from about 5,000 a day to a release-week peak
         above 50,000, then held at four times where it started. 545,129
         listeners and 119,946 saves.`,
  shot: 'cs-from-good-to-bad.jpg',
  alt: 'Spotify for Artists: From Good To Bad And Then Back Again — 2,016,983 streams and 545,129 listeners, 10 February to 31 May 2026',
});

export const ruthanne = caseChart({
  section: 'Ruthanne',
  label: 'Ruthanne — The Moment',
  headline: '466K streams<br>on a back catalogue<br>album.',
  kicker: 'From 1,500 to 11,000 a day · four months',
  body: `Released October 2025 and worked from March. Eighteen thousand playlist
         adds and thirty-eight thousand saves, on a record that was already out.`,
  shot: 'cs-ruthanne-the-moment.jpg',
  alt: 'Spotify for Artists: Ruthanne, The Moment — 466,218 streams and 213,754 listeners, 24 March to 24 July 2026, rising from about 1,500 to 11,000 a day',
});

/* artist not shown in the screenshot */
export const forever = caseChart({
  section: 'Forever',
  label: 'Forever',
  headline: '257K streams<br>in the first month.',
  kicker: 'Peak day 19,930 · 101,943 listeners',
  body: `Released 12 June, straight into a climb. Twelve thousand playlist adds
         and nearly sixteen thousand saves inside thirty days.`,
  shot: 'cs-forever.jpg',
  alt: 'Spotify for Artists: Forever — 257,251 streams and 101,943 listeners, 12 June to 12 July 2026, peaking at 19,930 on 10 July',
});

export const cristoph = caseChart({
  section: 'Cristoph',
  label: 'Cristoph × Michael Anthony — Spacer',
  headline: '0 to 18K daily<br>streams in 3 weeks.',
  kicker: '243,611 streams · 140,514 listeners',
  body: `A cold start on a dance record, released 10 July. Fifteen thousand
         playlist adds and twelve thousand saves inside the first three weeks.`,
  shot: 'cs-cristoph-spacer.jpg',
  alt: 'Spotify for Artists: Cristoph x Michael Anthony, Spacer — 243,611 streams and 140,514 listeners, 7–31 July 2026, climbing from zero to roughly 18K a day',
});

export const kogis = caseChart({
  section: 'KOGIS',
  label: 'KOGIS — Keeping Your Head Up',
  headline: '0 to 25K daily<br>streams in 3 weeks.',
  kicker: 'Peak day 25,470 · 205,234 streams',
  body: `Nothing on release day and 25K a day three weeks later. The line only
         bends once the spend finds the audience that responds.`,
  shot: 'cs-kogis-head-up.jpg',
  alt: 'Spotify for Artists: KOGIS, Keeping Your Head Up — 205,234 streams and 119,805 listeners, 10 July to 6 August 2026, peaking at 25,470 on 5 August',
});

/* ---------------------------------------------- below 10K streams a day */

/* artist not shown in the screenshot */
export const houseOfTheSilent = caseChart({
  section: 'House of the Silent',
  label: 'House of the Silent',
  headline: '0 to 1,400<br>a day in eight<br>weeks.',
  kicker: '38,506 streams · 21,144 listeners',
  body: `A small release, worked properly. Twenty-seven hundred playlist adds off
         a track with under forty thousand streams to its name.`,
  shot: 'cs-house-of-the-silent.jpg',
  alt: 'Spotify for Artists: House of the Silent — 38,506 streams and 21,144 listeners, 7 June to 6 August 2026, climbing to 1,469 on 4 August',
});

/* artist not shown in the screenshot */
export const breatheEasy = caseChart({
  section: 'Breathe Easy',
  label: 'Breathe Easy',
  headline: '0 to 4,000<br>a day in a week.',
  kicker: 'Released 31 July · 10,209 streams',
  body: `The first week of a brand new record. This is what the start of a
         campaign looks like before anyone has scaled anything.`,
  shot: 'cs-breathe-easy.jpg',
  alt: 'Spotify for Artists: Breathe Easy — 10,209 streams and 6,939 listeners, 10 July to 6 August 2026, rising to roughly 4,000 a day in the final week',
});

/* artist not shown in the screenshot */
export const artistGrowth = caseChart({
  section: 'Artist growth',
  label: 'A developing artist',
  headline: 'Streams up 949%<br>in four months.',
  kicker: 'Listeners +421% · Playlist adds +1,807%',
  body: `From an 8.8K-monthly-listener account. Monthly active listeners up
         1,081% and saves up 805% — the engagement grew with the reach rather
         than lagging behind it.`,
  shot: 'cs-audience-streams.jpg',
  alt: 'Spotify for Artists audience overview: 13K listeners up 420.8%, 67K streams up 948.7%, 1.1K monthly active listeners up 1,080.9%, 1.3K playlist adds up 1,807.1%, 7 April to 6 August 2026',
});

/* ------------------------------------------- not measured in daily streams */

/* Chartmetric shows monthly listeners, not streams a day, so the 10K rule
   doesn't apply to this one either way. Chart reads 300.77K, up 224.5K over
   six months, so the track started around 76K — not zero, as V3 had it. */
export const theListros = caseChart({
  section: 'The Listros',
  label: 'Unlocking catalogue value',
  headline: '76K to 300K<br>monthly listeners.',
  kicker: 'Six months · 12p a listener',
  body: `No new release and no new recording. A back-catalogue track that was
         already half-working, proved out on a test budget and then scaled.`,
  shot: 'chartmetric.jpg',
  alt: 'Chartmetric: The Listros Spotify monthly listeners at 300.77K, up 224.5K (294.52%) over six months',
  card: { src: 'the-listros__lens.jpg', name: 'The Listros', w: 300, h: 208 },
});

/* Figures from the proposal doc; V3 had 3,500 tickets on £10K at 7:1. */
export const admt = caseStats({
  section: 'ADMT',
  label: 'Filling venues profitably',
  headline: '5,000 tickets<br>on £6K of spend.',
  stats: [
    { k: 'Ad spend', v: '£6K' },
    { k: 'Gross ticket revenue', v: '£70K' },
    { k: 'Return on ad spend', v: '11:1' },
  ],
  body: `DSP ads built the awareness, retargeting converted the fans who were
         already listening, and attribution proved where every pound went.`,
});

/* No chart and no photograph we can stand behind — V3 put a Thundercat card
   against these numbers. */
export const markTuan = caseStats({
  section: 'Mark Tuan',
  label: 'Multi-channel revenue',
  headline: '$68K in merch<br>sales in two weeks.',
  stats: [
    { k: 'Merch revenue', v: '$68K' },
    { k: 'Campaign length', v: '2 weeks' },
    { k: 'Targeting', v: 'High-intent' },
  ],
  body: `A campaign that converted a streaming audience into merch buyers —
         integrated strategy turning listeners into revenue.`,
});
