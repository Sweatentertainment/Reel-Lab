---
name: sweat-deck
description: >-
  Build anything in the Sweat Strategies design language — investor and
  fundraising decks, pitch and sales decks, internal and board decks,
  one-pagers, case-study decks, ads and branded assets — on the existing
  1920×1080 deck engine in `sweat-strategies-deck/` and the token system in
  `sweat-brand/`. Use this whenever PJ asks to make, build, put together,
  design or export a deck, pitch, presentation, slides or a branded asset,
  and whenever he says "in our design system", "on brand", "like the other
  decks", "same design as", or names an existing Sweat deck as the model.
  Use it even when he does not say the word "deck" — "put a fundraising
  story together", "I need something for the board", "make a one-pager for
  this" all land here. Also use it for design-system questions: what the
  tokens are, which artist photography is licensed, how the ads are built,
  how to export a PDF or a shareable link. For a bespoke proposal aimed at
  ONE named client with a real email thread or call transcript behind it,
  the separate client-proposal-deck skill does the research and the argument
  first — use that one instead, and come back here for the mechanics.
---

# Sweat deck

Everything Sweat sends out is built on one engine and one token set, and the
reason it all looks like the same company is that nobody re-invents the
design per document. Your job on any new deck is almost never to design
something — it is to choose which existing deck it is a variant of, work out
what it argues, and then build it carefully enough that it holds together at
1920×1080.

The output is a slide module, a page shell, a PDF, and usually a shareable
link.

## Where everything lives

```
sweat-strategies-deck/      the engine and every deck authored on it
  deck.js  deck.css  parts.js  cases.js     shared — do not edit lightly
  slides-<name>.js                          one per deck: the content
  <name>-proposal.html                      one per deck: the shell
  scripts/                                  export-pdf, standalone, image prep
  assets/img/                               licensed photography, screenshots

sweat-brand/                the design system and the sendable output
  system/tokens.json                        DTCG source of truth
  system/tokens.css  system.css             generated + treatments
  decks/                                    the approved PDFs
  ads/                                      the statement ad set
```

`deck.js`, `deck.css`, `parts.js` and `cases.js` are shared by every deck in
the folder. Changing one to fix one slide silently changes eight documents,
so treat them as read-only unless the change is genuinely systemic — and if
it is, say so when you hand over.

## The shape of the job

1. **Pick the parent deck.** Which existing one is this a variant of?
2. **Write the argument down** in one sentence before writing a slide.
3. **Check the assets exist** — photography especially.
4. **Write** the slide module and the shell.
5. **Render it and look at every slide as an image.** Not optional.
6. **Export**, publish, and hand back with the open questions named.

### 1. Pick the parent deck

There are nine decks in the folder already and one of them is nearly always
the right starting point. Open its slide module and lift its treatments
rather than inventing new ones — matching an existing deck is a copy job,
and any flourish you add is drift that shows up as inconsistency later.

| If it is… | Start from |
|---|---|
| An investor or fundraising deck | `references/investor-deck.md`, then `slides-labels-offer.js` for treatments |
| A pitch to a label or partner | `slides-labels-offer.js` |
| A pitch to an artist | `slides.js` |
| An established artist already spending | `slides-cross-platform.js` |
| Evidence only, no offer | `slides-labels.js` / `slides-indie.js` |
| Evidence that goes out over email | `slides-labels-anon.js` |
| A bespoke document for one named client | `slides-oneheart.js` (and the client-proposal-deck skill) |

PJ will usually tell you which. If he names one, follow it closely — he
asked for that deck, not an improved version of it.

### 2. Write the argument down

A deck makes one argument. Before writing any slide, write the single
sentence it is trying to land, and check it came from the subject rather
than from you. If you cannot state it in a sentence, the deck will not
state it in twenty slides.

Then decide what the deck must **not** do. This matters more than it
sounds, and it is where decks go wrong:

- **Assume it will be forwarded.** Decks reach distributors, investors,
  managers and artists nobody mentioned. Frame every gap so the argument
  holds without anyone being criticised — "nobody owns the middle" survives
  forwarding; "your label is neglecting you" does not.
- **Do not put a paraphrase in quotation marks.** If you tighten something
  someone said, set it without quote marks under a label like "the brief,
  in one line". Attributing polished words to someone who said messier ones
  is exactly the kind of thing they notice.
- **Do not promise what cannot be delivered.** Naming a constraint honestly
  reads as competence; a vague promise reads as a salesman.
- **A photograph beside a figure claims that figure.** Never put an artist's
  face next to numbers that are not theirs. This has gone wrong before and
  it is the single most damaging error the deck system can produce.
- **Say which currency.** Sweat's case studies ran in £ and $; readers think
  in their own. A reader comparing 12p to their own 14¢ and concluding we
  beat them is a credibility problem you created. State it plainly.

Record all of this in a comment block at the top of the slide module —
where the content came from, what the argument is, and what the deck
deliberately excludes and why. The next person to edit it is often PJ in a
hurry, and they need to know which omissions were decisions.

### 3. Check the assets exist

Confirm before you build, not after:

```bash
ls sweat-strategies-deck/assets/img/*lens*.jpg | sed 's|.*/||'
```

Thirteen artists are licensed and that is the whole set. Swedish House
Mafia, Lykke Li and Rudimental have each been asked for more than once and
still are not in it — a name in the roster does not mean there is a
photograph. Watch for near-misses: `cs-maribou-midas.jpg` is a Spotify chart
screenshot, not a portrait, and will not work in a card.

When a requested artist is missing, substitute rather than stall — the deck
is usually wanted the same day. Take the biggest available name for the most
prominent slot, then tell PJ plainly which slots changed and why. Never
solve it by pulling a press shot off the web: that is third-party copyright
in a document going to a label or an investor.

`laptop()` in `parts.js` is off limits for anything new — its frame is an
unlicensed iStock comp. Use `browser()`, which is drawn.

### 4. Write it

Read `references/engine.md` for the slide object, the classes, the fragments
in `parts.js` and the layout traps. Two files to create:

```
sweat-strategies-deck/slides-<name>.js      the content
sweat-strategies-deck/<name>-proposal.html  the shell
```

`scripts/new-deck.mjs` scaffolds both with the header comment block in
place:

```bash
node .claude/skills/sweat-deck/scripts/new-deck.mjs <name> "<Deck title>"
```

Anything repeated three or more times in one deck should be a local helper
at the top of the module rather than copy-pasted markup. `slides-oneheart.js`
and `slides-keyfactory.js` both open with a `phase()` and an `act()` helper
worth copying.

### 5. Render it and look at it

**Read every slide as an image before you export.** This is the step that
gets skipped and the step that catches things nothing else does — a drawn
spine running through a column of body copy, a heading colliding with the
wordmark, a title needing a drop shadow because it sits on bright artwork,
three figures unevenly spaced because a grid used `auto` columns. None of
these are visible in the source.

```bash
cd sweat-strategies-deck
npx http-server -p 8877 -s . &          # if nothing is serving yet
node ../.claude/skills/sweat-deck/scripts/check-deck.mjs \
  <name>-proposal.html --shots /tmp/deck
```

It reports console errors, failed requests and any text overflowing the
canvas, and writes a PNG per slide. Then actually open the PNGs — the script
catches overflow, not ugliness. Overflow from `.blob` and the spine SVG is
expected; they bleed off the frame by design.

### 6. Export and hand over

Everything below runs from `sweat-strategies-deck/`, and `scripts/` means
that folder's own scripts — the skill's live at
`../.claude/skills/sweat-deck/scripts/`.

```bash
node scripts/export-pdf.mjs <name>-proposal.html \
  ../sweat-brand/decks/Sweat-<Name>.pdf 8877
```

Confirm the page count equals the slide count before sending it anywhere.

For a link rather than a file there are two routes, and they are not the
same thing:

- `scripts/export-standalone.mjs` flattens the deck to **one scrolling
  document** with everything inlined. This is what you publish as an
  Artifact — it reads well on a phone and needs no navigation.
- `scripts/build-standalone.mjs` inlines the **interactive deck** into one
  file, arrow keys and all. Use it when someone wants to present from a
  single file.

```bash
node scripts/export-standalone.mjs <name>-proposal.html /tmp/<name>.html 8877 \
  --title "<Short name>"
```

Then add the deck to the tables in both READMEs, commit, and hand back with:

- **The argument you built it on**, and where it came from.
- **What you deliberately left out**, so PJ can overrule it.
- **What still needs checking** — anything inferred, any figure taken on
  trust, any third-party fact that is load-bearing. Be specific: "confirm
  the vinyl lead time, it's what makes the first-fortnight deadline true"
  is useful; "check the details" is not.

Expect revisions. PJ edits hard and fast, and because the copy lives in one
file they turn round quickly.

## References

- `references/engine.md` — the slide object, CSS classes, `parts.js`
  fragments, `cases.js`, and the layout traps. Read before writing markup.
- `references/investor-deck.md` — what changes when the reader is writing a
  cheque rather than buying a service. Read before an investor or
  fundraising deck.
- `references/system.md` — tokens, colour, type scale, the `--u` scale unit,
  the ad set and safe zones. Read for anything that is not a deck, or when
  changing the system itself.
