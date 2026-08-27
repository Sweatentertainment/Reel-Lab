# A/B kit — 132 assets

Eleven ads, four design cells, three sizes. Open `index.html` to see them all;
`manifest.csv` is the lookup that turns a filename back into a cell.

```
A-editorial-paper/    A   editorial layout, paper ground   ← closest to the current best performer
B-editorial-dark/     B   editorial layout, black ground
C-statement-paper/    C   statement layout, paper ground
D-statement-dark/     D   statement layout, black ground
```

## What is actually being tested

A clean 2×2 — layout crossed with ground, and **nothing else moves**.

|  | paper | dark |
|---|---|---|
| **editorial** — upper-weighted, huge air below | A | B |
| **statement** — bottom-weighted, tighter | C | D |

The CTA and the wordmark are off in all four. That is deliberate: if A carried
a logo and B did not, a win for A would not tell you whether the ground or the
logo did it, and four cells running at once will not give you the traffic to
untangle it afterwards. **Test the frame first, then test furniture inside the
winner.**

Copy is identical across the cells too, so the eleven ads are the sample rather
than a variable. Every cell gets the same eleven arguments to make.

## Reading the result

- **A vs B** and **C vs D** → does the ground matter?
- **A vs C** and **B vs D** → does the layout matter?

If both comparisons move in the same direction each time, you have a clean
answer. If they contradict (A beats B but D beats C), the two interact and the
honest read is that ground and layout are not independent — pick the single
best cell and move on rather than reasoning about them separately.

Judge on **cost per result**, not CTR. A frame that wins attention and loses
bookings is not the winner.

## Filenames

```
C4__A__1080x1350.jpg
│    │   └ pixel size
│    └ variant
└ ad
```

The variant and the size are in the filename as well as the folder because
**Meta's asset library flattens folders on upload**. Once they are in there the
directory is gone, and eleven files called `C4.jpg` are unidentifiable.

## Sizes

| Size | Placement |
|---|---|
| 1080×1350 | Feed 4:5 — **start here**, it is the primary placement |
| 1080×1080 | Feed square |
| 1080×1920 | Stories / Reels |

Run the test on 4:5 first. The other two are built and ready so that rolling
the winner out does not need a second round of production.

## Regenerating

Everything here is generated — do not hand-edit an asset, it will be
overwritten. Copy lives in `../ads/statements.js`, the cells in `VARIANTS` in
the same file.

```bash
cd ..
npm run serve          # one terminal
npm run export         # the other — about four minutes for all 132
```

```bash
npm run export -- --variant A          # one cell
npm run export -- --size portrait-1350 # one size, all cells
npm run export -- --format png         # lossless
```

JPEG at q92 by default. The grain is noise, which PNG cannot compress — the
lossless set runs about 700KB an asset and 132 of those is most of a gigabyte,
where this kit is 22MB. The platform re-encodes on upload regardless.

## Before you spend anything

**C10 has a conflict.** The live best-performing ad states that case as
**8 million streams / 30¢**; C10 here says **7.2M / 25¢**, following the
anonymised deck and the v5 brief. Same campaign, two sets of numbers — if C10
runs while that ad is still live they contradict each other in market. Settle
it and re-export before this ad goes in.
