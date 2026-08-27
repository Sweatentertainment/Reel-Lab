# Investor and fundraising decks

Every other deck in the folder sells a service to someone deciding whether
to spend a marketing budget. An investor deck sells a company to someone
deciding whether to own part of it, and almost everything about the reader
changes.

The service decks answer *will this work for my record*. An investor
answers a different question — *how big does this get, why is it you, why
now, and what does my money buy* — and will read every claim as a forecast
they may be held to. That is why this reference exists: the treatments carry
over unchanged, the argument does not.

## Before you write a slide

**Establish what the raise actually is.** Amount, instrument, stage, what
the money is for and what it buys. None of this is in the repo and no part
of it can be inferred — a deck with the wrong number on the ask slide is
worse than no deck. Ask, and if the answer is not settled, build everything
else and leave that slide explicitly marked as the one number outstanding.

**Establish which entity.** Sweat Strategies the agency, Real Lab, and
david.tickets are different businesses with different stories. PJ has
described david.tickets as going for a round; do not assume a request for
"an investor deck" means the agency unless he says so.

**Decide what is confidential.** Client names, spend figures and CPRs sit
in the repo because they serve a proposal going to one reader. An investor
deck circulates. Ninja Tune, Atlantic and Swedish House Mafia are already
public on the website and safe to name. A client's spend and cost per result
are not automatically safe, and `cases.js` carries an anonymised cut of
every one of them for exactly this reason. Default to `anon` and let PJ
upgrade specific cases to `named`.

## What the repo can tell you

Real, checkable, already used in documents that have gone out:

- **The roster and the partners.** `ARTISTS` and `PARTNERS` in `parts.js`
  are the source of truth. `roster()` renders them as a finished slide.
- **The case studies.** `cases.js` — fifteen campaigns with streams, spend,
  cost per result, dates and the screenshots behind them. The strongest for
  an investor are the ones that show *unit economics rather than size*:
  `theListros` (a sustained monthly spend at $0.11), `admt` (5,000 tickets
  on £6K, 11:1 on ad spend), `cristoph` and `kogis` (two cold starts, same
  method, same three-week shape), `markTuan` (a streaming audience
  converted to $68K of merch).
- **The product.** Paid media built on testing every section of a record;
  fan flows capturing first-party data; ticketing; the sweat.fm dashboard;
  an AI creative system trained on winning ads. `slides-cross-platform.js`
  describes the whole estate and is the best in-repo statement of what the
  company does.
- **The pricing.** Live in the label, artist and bespoke decks. Retainers
  plus commission on scaled spend is the model.

## What only PJ can tell you — ask, do not estimate

Revenue and its trajectory. Headcount and who is on payroll. Client count,
retention and churn. Gross margin and how much of the retainer is people.
Cap table, prior raises, existing investors. Runway. The pipeline. Anything
about Real Lab or david.tickets beyond what he has said out loud.

Inventing any of these produces a document that reads convincingly and
falls apart in the first diligence call. If a slide needs a number you do
not have, build the slide and leave the figure marked, then name it in the
handover. A deck with three obvious gaps is a working draft; a deck with
three invented numbers is a liability.

## A shape that works

Roughly eighteen to twenty-two slides, in acts with the bracket dividers.
Reorder it to fit the actual story — this is a starting point.

| | |
|---|---|
| Cover | Company, and the raise in one line if it is settled |
| The one-liner | What the company is, in a sentence a stranger repeats correctly |
| Why now | What changed in the market that makes this the moment |
| The problem | Stated as a mechanism, not a complaint |
| *Act divider* | |
| The product | What it actually does — the testing method is the differentiator |
| The proof | Case studies, unit economics first |
| The proof, again | A second case that shows it repeats rather than got lucky |
| *Act divider* | |
| Who we work with | `roster()` — the hardest slide in the deck to argue with |
| The model | How money is made: retainers, commission, what scales |
| The numbers | Revenue, growth, retention — PJ's figures only |
| The market | Sized honestly, bottom-up, not "1% of a $30bn market" |
| Why us | The team, and the specific reason this team wins |
| *Act divider* | |
| The plan | What the next 12–24 months build |
| Use of funds | What the money does, in four or five lines |
| The ask | Amount, instrument, and what closes |
| Close | The next step and a name |

**The proof slides are the deck.** Sweat's advantage over a pitch is that
it has real campaigns with real costs attached, and an investor will spend
longer on those two slides than on the market slide. Lead with cost per
result and repeatability rather than with the biggest stream count — a
number that shows the method works twice is worth more than a number that
shows it worked enormously once.

**Size the market bottom-up.** Recorded music marketing spend reasoned up
from what a label actually pays per release beats a top-down slice of an
industry total, which every investor has learned to discount.

## Tone

The service decks are allowed to be warm and to argue with the reader. An
investor deck should be plainer and more numerate. Cut the second adjective
everywhere. Where a service deck says "we always win an A/B test", an
investor deck says what the win rate is or does not make the claim.

Two habits from the other decks carry over and are worth keeping: naming a
constraint honestly rather than papering over it, and never putting a
tightened paraphrase in quote marks.

## Treatments

Everything visual comes from `slides-labels-offer.js` — the bracketed act
dividers, the `.stats` figures in blue, the `bend()` artist cards, the
`.steps` grid, the `.hl` fill on the line that matters. `references/engine.md`
has the mechanics.

One difference worth making deliberately: an investor deck usually wants
more figures on screen than a proposal does. `.stats` and `caseStats()` are
built for that, and a slide of three big blue numbers with one line each
reads better than a paragraph making the same claim.
