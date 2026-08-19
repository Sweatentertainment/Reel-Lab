# The design system

`sweat-brand/` holds the tokens the decks and the ads are both built from,
lifted from sweatstrategies.com rather than reinterpreted. That is the whole
reason an ad made here and a deck and the site look like the same company.

## Tokens

`system/tokens.json` is the source of truth, in W3C Design Tokens (DTCG)
format so it imports to Figma through Tokens Studio. `system/tokens.css` is
**generated** — edit the JSON and rebuild, never edit the CSS:

```bash
cd sweat-brand && node scripts/build-tokens.mjs
```

### Colour

| Token | Value | Where it goes |
|---|---|---|
| `black` | `#000000` | the default ground |
| `paper` | `#eeedeb` | the light ground |
| `head` | `#c9c7c7` | secondary headings, dates, muted display type |
| `blue` | `#0f65dd` | the accent — figures, labels, the `.hl` fill |
| `blue-deep` | `#0c54b8` | gradient depth |
| `blue-bright` | `#2a7bff` | highlights, focus states |
| `field-dark` | `#061a3c` | the `.field--dark` ground |

Plus `white`, and four transparent utilities: `line`, `muted`, `rule`,
`chip-border`.

There is one accent and it is blue. A deck that introduces a second accent
colour has stopped being on the system.

### Type

**Manrope** for everything, weights 400–800, with a mono stack for labels
and figures. Sizes are authored at a 1920 reference: `display-xl` 176,
`display-l` 132, `display-m` 96, `display-s` 72, `head` 66, `kicker` 30,
`body` 27, `body-s` 22, `figure` 68, `label` 20.

Tracking is tight and negative on display (`-0.052em`) and wide and positive
on labels (`0.16em`) — that contrast is most of what makes the type look
like Sweat rather than like Inter on a black background. Display leading is
0.92, which is why a `.hl` fill needs the looser line-height `deck.css`
applies automatically.

### Spacing

`space.pad` is 96px and it is the frame gutter on every slide and every ad.
The rest is a 14 / 26 / 40 / 60 / 96 scale. `radius.pill` is marked
`$extensions.sweat.fixed` so the build leaves it at 999px instead of scaling
it.

## The `--u` scale unit

Sizes are authored once at 1920 and scaled per surface:

```css
--cw: 1920;                              /* the surface width, unitless */
--uref: 1920;                            /* the type-scale reference */
--u: calc(var(--cw) * 1px / var(--uref));
```

`--uref` is the knob. At 1920 a slide shrinks proportionally; the ads run
1080, the story format 960, landscape 1200 — a lower `--uref` makes type
larger relative to the frame, which is what a phone-sized surface needs.

Two things that have gone wrong here and should not again:

**Keep the `* 1px`.** `calc(var(--cw) / 1920)` produces a unitless number,
so `font-size: calc(176 * 1)` is invalid and silently does nothing.

**Never multiply a safe zone by `--u`.** Platform chrome is measured in
absolute device pixels. `--u` tracks `--uref`, which is a typography knob
someone may retune per size, and on any surface where `--uref` exceeds the
width `--u` drops below 1 and the creative ends up inset *less* than the
platform covers. Safe values are always `* 1px`.

## The ads

`sweat-brand/ads/` is the statement ad set — eleven ads (the C set), pure
text, no photography, no screenshots, no CTA burned into the image.
`statements.js` holds the copy and the design switches; `statement.html` is
one renderer that draws both layouts.

```bash
npm run serve                        # in one terminal
npm run export                       # 11 ads × 4 cells × 3 sizes
npm run export -- --variant A --id C4 --size story-1920
```

**Anonymous by construction.** No artist, track, label or partner is named
anywhere in the set and there is no photography, because a face beside a
figure identifies a campaign as surely as a name does. That is what lets
them run at all. Every figure in them is real.

**No CTA in the image.** Meta draws its own call-to-action button under the
creative, so a second one baked in reads as a mistake and spends the
strongest real estate saying the same thing twice. Put the specific CTA in
the primary text where it can be edited and tested.

**Safe zones** live in `SIZES` in `statements.js` and the copy is inset by
them automatically. Feed placements need none — the profile row and button
sit outside the image. Stories/Reels need 250 top, 180 right, 440 bottom,
which is the stricter Reels set because one export serves both.

```bash
node scripts/check-safe.mjs          # measures all 132 assets, trusts nothing
ads/statement.html?id=C7&size=story-1920&safe=1   # see the overlay
```

## Photography

`sweat-brand/img/` and `sweat-strategies-deck/assets/img/` hold the
licensed, already-treated photography. Thirteen artists, and that is the
whole set:

```bash
ls sweat-strategies-deck/assets/img/*lens*.jpg | sed 's|.*/||'
```

`scripts/lens.mjs` applies the house treatment to a new photo. Nothing goes
into a deck that has not been through it.

Two standing rules. **Never pull a press shot off the web** — it is
third-party copyright in a document going to a label or an investor. And
**`laptop.png` is an unlicensed iStock comp**; three older PDFs still carry
it on their reporting slide, nothing new should, and `browser()` in
`parts.js` is the drawn replacement.

## Adding to the system

Anything that will be used more than once belongs in the system rather than
in the deck that needed it first. A new colour goes in `tokens.json` and
gets rebuilt; a new treatment goes in `deck.css` or `system.css` with a
comment explaining the reasoning, which is the convention throughout both
files. A new fragment goes in `parts.js` so every deck can reach it.

Because `deck.js`, `deck.css`, `parts.js` and `cases.js` are shared by nine
decks, say so explicitly when you change one — the change is invisible in
the deck you were working on and visible in eight you were not.
