# reel:lab

Marketing landing for **reel:lab** — Next.js (App Router), TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis, Framer Motion.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Brand assets (`/content` → optimised output)

1. Put **PNG** character stills and **MP4** loops in **`/content`** at the project root (see `src/lib/assets.ts` for expected base names).
2. Install **ffmpeg** if needed: `brew install ffmpeg`
3. Run:

```bash
npm run optimize:assets
```

This runs **`scripts/optimize-assets.sh`**, which:

- Writes **`public/images/characters/*.jpg`** (max 800px wide, JPEG, targets ≤200KB).
- Writes **`public/videos/characters/*.mp4`** (H.264, CRF 28, max 480px wide, `faststart`, targets ≤3MB).
- Recompresses existing **`public/images/*.{jpg,png}`** (hero, lifestyle, destination, etc.) the same way.

Character manifest and paths: **`src/lib/assets.ts`**. Optional salt-flat still: add `salt_flat.png` to `/content`, run the script → `public/images/characters/salt_flat.jpg` (already referenced in `saltFlatCharacter`).

**Site images** (non-characters):

| File | Section |
|------|---------|
| `01_hero_dj.jpg` | Hero |
| `02_lifestyle_swim.jpg` | What Is |
| `03_destination_como.jpg` | Mood Network mosaic |

Add **`public/og-image.png`** (1200×630) for social sharing. Set `NEXT_PUBLIC_SITE_URL` for production metadata (defaults to `https://reellab.com` in code).

### Video performance (runtime)

- Global cap: **4** in-view video tiles, **3** playing at once (`VideoBudgetProvider` + `ManagedCharacterMedia`).
- Videos use `preload="none"` until near-viewport, then `metadata`; play/pause via `IntersectionObserver`.

## Scripts

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run optimize:assets` — compress `/content` + site images (requires **ffmpeg**)
