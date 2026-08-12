# Research: the email thread and the call

Both sources are needed. The email carries the facts — dates, names, links,
the partner list. The transcript carries the language, the frustrations and the
things people say once and never write down. A deck built on the email alone
reads like a form letter.

## Gmail

Search broadly. Client names get spelled inconsistently and project names are
often stylised (`naturecore`, `naturec0re`), so search on several terms at once
rather than guessing which one PJ used.

```
mcp__Gmail__search_threads   query: "Øneheart OR oneheart OR naturecore"
mcp__Gmail__get_thread       threadId: <id>, messageFormat: FULL_CONTENT
```

A long thread will blow the tool-result limit and be written to a file instead.
Do not try to read that file with Read — it does not chunk well. Parse it:

```python
import json, re
d = json.load(open(PATH))
for m in d["messages"]:
    print(m.get("sender"), m.get("date"))
    print((m.get("plaintextBody") or "").strip()[:4000])
```

Read every message, not just the client's first one. PJ's replies often contain
a commitment — a deadline, a scope, a promise to cover something specific —
that the deck then has to honour.

Collect from the email: exact release dates and titles, every partner and what
they do, links to creative and assets, who is cc'd (they are also an audience
for this deck).

## Lightfield

Meetings are not searchable by keyword, so list and scan titles. The one you
want is usually named for the client or booked by them.

```
mcp__Lightfield__read_from_lightfield   path: /v1/meetings?limit=25
```

Then retrieve the meeting itself, which gives you the prep notes, the summary
and the transcript file ID:

```
mcp__Lightfield__read_from_lightfield   path: /v1/meetings/<mtg_id>   expand: true
```

Three useful fields:

- **`$meetingPrep`** — the existing relationship: other campaigns with this
  company, their numbers, deal stages. This is where you find proof from inside
  the client's own organisation.
- **`$postMeetingSummary`** — a good structured read of what was covered. Use
  it to orient, not as the source.
- **`relationships.$transcript`** — the file ID. Get it.

```
mcp__Lightfield__read_from_lightfield   path: /v1/files/<fil_id>/url
```

The URL is presigned and expires in an hour. `curl` it to the scratchpad, then
collapse it into speaker turns — raw transcripts are one line per timestamp and
are painful to read straight:

```python
import re
turns, cur = [], None
for line in open(PATH):
    m = re.match(r'Speaker (.+):', line)
    if m:
        turns.append([m.group(1), []]); continue
    line = re.sub(r'^\[\d+:\d+\]\s*', '', line).strip()
    if line and turns: turns[-1][1].append(line)
# merge consecutive turns by the same speaker, then print
```

Read the whole thing. The first few minutes are usually small talk and the
temptation is to skip to the business — but the brief often arrives sideways,
in the middle of an aside, phrased better than it will ever be phrased again.

## What you are mining for

Keep a note as you read, under these headings:

- **The sentence.** What they said they need, in their words.
- **Already covered.** Partners, assets, work in flight. Everything here is a
  thing not to pitch, and a thing to name back approvingly.
- **Explicitly not wanted.** Say it back as a boundary you respected.
- **Constraints.** Visas, clearances, lead times, budget held by a third party.
- **What success means to them.** Often not the obvious metric — Marc cared
  about positioning and bookings as much as streams, and a deck that only
  promised streams would have missed him.
- **Anything PJ ruled out.** He sometimes mentions a product and immediately
  says he is not pitching it. That is binding.
- **Who else will read this.** If a third party signs off the budget, they are
  an audience whether or not they are on the email.
