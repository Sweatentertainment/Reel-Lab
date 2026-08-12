---
name: client-proposal-deck
description: >-
  Build a bespoke Sweat Strategies proposal deck for a named client, researched
  from their email thread and the Lightfield call transcript, rendered in the
  sweatstrategies.com design language and exported to a 16:9 PDF. Use this
  whenever PJ asks to make, build, write or pull together a proposal, pitch or
  deck for a specific client, prospect, artist, label or manager — including
  when he just says "make a proposal for <name or email>", "deck for the
  <company> thread", "put a pitch together for X", or refers to a conversation
  or call he has had with someone. Use it even when he does not say the word
  "deck". This is the skill for a proposal aimed at ONE named client with a
  real email or call behind it; the separate artist-pitch-deck skill is the
  generic .pptx template with an intake questionnaire, and is not this.
---

# Client proposal deck

A proposal only feels bespoke when the reader recognises their own problem in
it. Everything here is in service of that: research first, argue back in their
language, and leave out anything they did not ask for.

The output is a new deck on the existing engine in `sweat-strategies-deck/` —
a slide module, a page shell, and a PDF in `sweat-brand/decks/`.

## Two ways this starts

**PJ names a client and you go and find out.** Research the email and the
call, ask the two questions the research could not answer, then build. Steps
1–6 below.

**PJ hands you a written brief.** Sometimes he has already done the thinking
and writes the deck out page by page, with the copy, the fee and the footer
order. Then the job is layout and judgement, not discovery — skip the
research and the questions, and follow his structure exactly. He wrote it
because he wants that deck, not your improved version of it.

When a brief arrives like that, the useful work moves to three things:

- **Which existing deck is it a variant of?** He will usually say. Open that
  slide module and lift its treatments rather than inventing new ones —
  matching an existing deck is a copy job, and any flourish you add is drift.
- **Do the assets he asked for exist?** Check before you build, not after.
- **What does the brief not say?** Section names, image slots, whether a
  repeated block is deliberate. Follow the brief where it is explicit and use
  the source deck's answer where it is silent.

Either way the back half is the same: write it, render it, **look at it**,
export, hand back with the open questions named.

## The shape of the job

1. **Research** — the email thread and the call transcript. Do this before
   asking PJ anything. Skip if he supplied the brief.
2. **Ask** — only what the research could not answer. Usually two questions.
3. **Plan** — find the client's own sentence that the deck is going to argue.
4. **Write** the slide module.
5. **Render and look at it.** Not optional; see below.
6. **Export**, commit, and hand back with the open questions named.

## 1. Research

Read `references/research.md` for the exact tool calls. In short:

- **Gmail** — search the thread by client name, artist name or project. The
  first message from them is usually the brief; read the whole thread because
  PJ's reply often contains a promise about scope or timing that the deck has
  to honour.
- **Lightfield** — find the meeting, read `$postMeetingSummary`, then download
  and read the **full transcript**. The summary tells you what was discussed;
  the transcript tells you how they said it, which is what you need.

The transcript is the highest-value document in this whole process. Read it
properly rather than skimming for facts. You are looking for four things:

- **The sentence that is the brief.** Clients almost always say the thing they
  want out loud, in a slightly rambling way, once. Øneheart's was "almost being
  a central cog to it all". Find it — the deck is going to be built on it.
- **What they already have.** Every partner, every asset, every thing that is
  finished. Naming these back is what proves you listened, and it stops you
  pitching work they do not need.
- **What they explicitly do not need.** Marc said he could handle the social
  rollout himself. Pitching it anyway would have said "I wasn't listening."
- **The constraints.** Visas, clearances, budgets that need someone else's
  sign-off, deadlines that are already tight. These are where a proposal earns
  trust, because naming a constraint honestly is worth more than a promise.

Also check what Sweat is already doing for this client or their company —
proof from inside their own organisation is the hardest kind to argue with.

## 2. Ask PJ only what you could not find out

Do the research first so you ask two good questions instead of six lazy ones.
In practice the things that are genuinely unknowable from the source material
are:

- **The fee and how it is structured.** Always ask. Get the exact figures and
  whether the options are alternative totals or alternative payment schedules —
  those are different offers and clients read them differently. If the numbers
  PJ gives do not reconcile (a monthly rate that does not multiply to the
  stated total), say so and offer the readings rather than silently picking one.
- **Who is on the team and what they are called.** Never infer titles from who
  attends which call. Ask.

Anything else, work it out from the research and state your assumption when you
hand the deck over.

## 3. Find the argument

A good proposal makes one argument. Before writing a slide, write the one
sentence the deck is trying to land, and check it came from them rather than
from you.

Then decide **what the deck must not do**. This matters more than it sounds and
it is where a bespoke deck goes wrong:

- **Assume it will be forwarded.** If the client's budget needs signing off by
  a distributor, that distributor will read this. Frame every gap so the
  argument holds without anyone being criticised. You can say "nobody owns the
  middle" without saying "your label is neglecting you", and the first one
  survives being forwarded.
- **Leave out anything PJ ruled out on the call.** If he said a product is in
  beta and he was not pitching it, it does not go in the deck.
- **Do not promise what cannot be delivered.** If touring is blocked by a visa,
  say the plan does not depend on a live date. Honesty about a constraint reads
  as competence; a vague promise reads as a salesman.
- **Do not put a paraphrase in quotation marks.** If you tighten something the
  client said, set it without quote marks under a label like "the brief, in one
  line". Attributing polished words to someone who said messier ones is the kind
  of thing a client notices and resents.
- **Do not use photography you are not licensed for.** Press shots off the web
  are third-party copyright in a document going to a label. If there is no
  licensed image of the artist, run the deck typographically — it looks
  deliberate, not thin.

## 4. Write the slide module

Read `references/deck-engine.md` for the slide object shape, the archetypes,
the CSS classes and the layout traps. Files to create:

```
sweat-strategies-deck/slides-<client>.js     the content
sweat-strategies-deck/<client>-proposal.html the shell (copy an existing one)
```

Open the slide module with a comment block recording where the content came
from, what the argument is, and what the deck deliberately excludes and why.
The next person to edit it — often PJ, often in a hurry — needs to know which
omissions were decisions rather than oversights.

### Check the images exist before you build

If the brief names artists for the image slots, confirm each one is in the
library first:

```bash
ls sweat-strategies-deck/assets/img/*__lens.jpg | sed 's|.*/||;s|__lens.jpg||'
```

Thirteen artists are licensed and that is the whole set. Swedish House Mafia,
Lykke Li and Rudimental have each been asked for more than once and still are
not in it — a name appearing in the roster does not mean there is a photograph
of them. Watch for near-misses too: `cs-maribou-midas.jpg` is a Spotify chart
screenshot, not a portrait, and will not work in a card.

When a requested artist is missing, substitute rather than stall — the deck is
usually wanted the same day. Take the biggest available name for the most
prominent slot, and for a process or method slide take whichever artist the
source deck already uses there. Then tell PJ plainly which two slots changed
and why. Never solve it by pulling a press shot off the web: it is third-party
copyright in a document going to a label or an investor.

### A shape that works

Roughly twenty slides, in three or four acts with a divider between them. This
is a starting point, not a template — reorder it to fit the client's actual
problem:

| | |
|---|---|
| Cover | Project name, nothing else |
| The hook | Their sentence, set big |
| What they already have | Every partner named, all staying. The gap is the space between them |
| *Act divider* | |
| The offer | What we take on, in three or four columns |
| *Act divider* | |
| The calendar | Their dates. Flag the one that is already tight |
| One slide per release / phase | What we actually do, differently each time |
| The method | How the work works, with the proof beside it |
| The thing nobody else pitches | Whatever their gap actually is |
| *Act divider* | |
| The team | PJ on top, then the named roles |
| Reporting | The rhythm they never have to ask for |
| What we need from them | Names their side of the work |
| The fee | |
| Close | The next step, and a date |

Per-release slides earn their place only if each says something different. If
you find yourself writing the same three bullets three times, collapse them
into one slide.

### On the fee slide

State plainly what sits **on top** of the fee: ad spend, third-party software,
manufacturing, anything billed at cost. A client who discovers a cost later
remembers that more than the number itself.

### On the team slide

Put PJ at the top as the accountable name, then the named roles beneath. Resist
writing "your single point of contact" unless PJ has said so — he may put
someone else on the day-to-day, and a promise like that has to be walked back
later.

## 5. Render it and look at it

**Read every slide as an image before you export.** Three separate layout bugs
in the Øneheart build were invisible in the source and obvious on screen: the
drawn spine running straight through a column of body copy, a title needing a
drop shadow because it had been placed over bright artwork, a heading colliding
with the wordmark. None of these are catchable by reading code.

Bundled script, run it from `sweat-strategies-deck/`:

```bash
npx http-server -p 8877 -s . &            # if nothing is serving yet
node ../.claude/skills/client-proposal-deck/scripts/check-deck.mjs \
  <client>-proposal.html --shots /tmp/deck
```

It reports console errors, failed requests and any text overflowing the 1080
canvas, and writes a PNG per slide. Then actually open the PNGs — the script
catches overflow, not ugliness.

Watch for:

- **The spine through the copy.** `spine('', dx)` defaults to dead centre,
  which is where the text is. Push it into a real gutter or leave it out.
- **Decorative overflow is fine.** Blobs and the spine SVG are meant to bleed
  off the frame; the script only flags text inside `.pad`.

## 6. Export and hand over

```bash
node scripts/export-pdf.mjs <client>-proposal.html \
  ../sweat-brand/decks/Sweat-<Client>-Proposal.pdf 8877
```

Check the page count matches the slide count. Add the deck to the tables in
`sweat-strategies-deck/README.md` and `sweat-brand/README.md`, commit, and send
PJ the PDF.

Then tell him, in plain terms:

- **The argument you built it on**, and which of their sentences it came from.
- **What you deliberately left out**, and why. He needs to be able to overrule
  these.
- **What still needs checking before it goes.** Anything you inferred, any
  figure you took on trust, any lead time or third-party fact that is
  load-bearing for an ask in the deck. Be specific — "confirm the vinyl lead
  time, it's what makes the first-fortnight deadline true" is useful; "check
  the details" is not.

Expect revisions. PJ edits hard and quickly, and the copy lives in one file so
turning them round is fast.
