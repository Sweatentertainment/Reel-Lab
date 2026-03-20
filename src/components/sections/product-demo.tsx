"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { Check, Film, Rocket, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { productDemoGrid } from "@/lib/assets";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const STEPS = [
  { n: 1, label: "Pick Your Face" },
  { n: 2, label: "Select Genre" },
  { n: 3, label: "Set the Story" },
  { n: 4, label: "We Take Over" },
] as const;

const CROSSFADE_MS = 300;
const STORY_LIST_FADE_MS = 200;

type GenreId =
  | "deep-house"
  | "dnb"
  | "hip-hop"
  | "techno"
  | "pop"
  | "afrobeats"
  | "rnb"
  | "indie"
  | "latin"
  | "custom";

type BrandStory = { name: string; description: string };

const BRAND_STORIES_BY_GENRE: Record<
  Exclude<GenreId, "custom">,
  readonly BrandStory[]
> = {
  "deep-house": [
    {
      name: "Sunset Circuit",
      description:
        "Warm, golden-hour energy. Speaks to the Ibiza-to-Bali crowd — playlist curators, travel content lovers, and daytime terrace regulars. Content leans aspirational: ocean, golden light, slow motion.",
    },
    {
      name: "Low Light",
      description:
        "Late-night intimacy. Think rooftop sets, candlelit venues, and 2am conversations. Targets the 25-35 tastemaker who discovers music through mood, not hype.",
    },
    {
      name: "Nomad Frequency",
      description:
        "Location-driven storytelling. Every post ties the music to a place — a coastline, a city, a forgotten road. Built for the audience that follows DJs for the lifestyle, not just the drops.",
    },
  ],
  dnb: [
    {
      name: "Rave Tape",
      description:
        "Raw energy, warehouse nostalgia. Designed for the core DnB community — event-goers, vinyl collectors, pirate radio heads. Content is fast, gritty, unapologetic.",
    },
    {
      name: "Liquid State",
      description:
        "Smooth and melodic. Targets the crossover audience — people who came from lo-fi or ambient and want something with more pulse. Softer visuals, atmospheric edits.",
    },
    {
      name: "Night Shift",
      description:
        "Dark, industrial, no-nonsense. Appeals to the heads-down-eyes-closed crowd. Minimal visuals, heavy sub-bass energy, zero fluff.",
    },
  ],
  "hip-hop": [
    {
      name: "Block Journal",
      description:
        "Street-level storytelling. Real, raw, editorial. Targets hip hop purists — lyric-focused, culture-aware, anti-algorithm. Content feels like a documentary, not a TikTok.",
    },
    {
      name: "Gold Standard",
      description:
        "Aspirational and polished. Speaks to the mainstream hip hop audience — playlist followers, sneaker culture, lifestyle content. High production, clean cuts.",
    },
    {
      name: "Underground Press",
      description:
        "Counter-culture positioning. For the audience that finds artists before they blow. Lo-fi aesthetic, limited drops, scarcity-driven engagement.",
    },
  ],
  techno: [
    {
      name: "Concrete",
      description:
        "Industrial minimalism. No faces, no names, just sound. Targets the Berlin-to-Tbilisi underground — anti-brand, pro-anonymity. Grainy, monochrome, stripped back.",
    },
    {
      name: "System",
      description:
        "Futuristic and clean. Appeals to the design-conscious techno fan — Resident Advisor readers, festival-goers, synthesiser nerds. Sleek visuals, data-driven aesthetic.",
    },
    {
      name: "Ritual",
      description:
        "Hypnotic and spiritual. Positions the music as experience, not entertainment. Slow builds, repetitive visuals, trance-state content. Targets the deep listeners.",
    },
  ],
  pop: [
    {
      name: "Main Character",
      description:
        "Bold, centre-stage energy. Built for the Gen Z and millennial pop audience — trend-forward, highly shareable, made for Reels and TikTok duets. Bright, saturated, fast cuts.",
    },
    {
      name: "Soft Focus",
      description:
        "Indie-pop warmth. Targets the bedroom pop listener — Pinterest-friendly, pastel aesthetic, lyric-driven content. Gentle, authentic, anti-corporate.",
    },
    {
      name: "Headline",
      description:
        "Tabloid energy without the cringe. Speaks to pop culture obsessives who live for the moment and the meme. Reactive content, fast turnaround, culturally plugged in.",
    },
  ],
  afrobeats: [
    {
      name: "Joywave",
      description:
        "Vibrant, celebratory, unapologetically African. Targets the global Afrobeats audience — diaspora communities, dance culture, and crossover fans. Colourful, high-energy, movement-driven content.",
    },
    {
      name: "World Stage",
      description:
        "Global positioning. For the Afrobeats-to-mainstream crossover — festival stages, fashion tie-ins, international collaborations. Polished, editorial, world-stage ready.",
    },
    {
      name: "Motherland",
      description:
        "Roots-first storytelling. Connects the music to culture, heritage, and community. Targets the audience that wants depth behind the sound, not just the dance.",
    },
  ],
  rnb: [
    {
      name: "Pillow Talk",
      description:
        "Intimate, sensual, confessional. Targets the R&B purist — late-night playlist listeners, SZA-to-Frank Ocean fans. Soft lighting, close-up shots, emotion-led.",
    },
    {
      name: "Velvet",
      description:
        "Luxe and polished. Speaks to the aspirational R&B audience — fashion-forward, premium positioning. Think editorial shoots, city nights, understated glamour.",
    },
    {
      name: "Honest",
      description:
        "Vulnerability as a brand. Stripped back, lyric-first, no filter. Targets the audience that connects through authenticity — voice notes, handwritten, raw content.",
    },
  ],
  indie: [
    {
      name: "Zine",
      description:
        "DIY, anti-mainstream, self-published energy. Targets the indie purist — Bandcamp buyers, local scene supporters, anti-algorithm. Collage aesthetic, lo-fi, handmade.",
    },
    {
      name: "Daylight",
      description:
        "Warm indie. Targets the casual indie listener — coffee shop playlists, festival discovery, Sunday morning vibes. Natural light, analogue textures, easy warmth.",
    },
    {
      name: "Stranger",
      description:
        "Weird and proud. For the alt audience that wants something that doesn't fit a box. Surreal visuals, unexpected edits, deliberately uncomfortable. Cult following potential.",
    },
  ],
  latin: [
    {
      name: "Fuego",
      description:
        "High-energy, dance-first, impossible to ignore. Targets the reggaeton and Latin pop mainstream — party content, choreography, viral-ready hooks.",
    },
    {
      name: "Barrio",
      description:
        "Street-level credibility. Speaks to the community — neighbourhood energy, family, real life. Authentic, unpolished, deeply human content.",
    },
    {
      name: "Tropicalia",
      description:
        "Lush, cinematic, Pan-American. Blends Latin music with global aesthetics — nature, colour, spirituality. Targets the crossover audience discovering Latin music through curated content.",
    },
  ],
};

function brandStoriesForGenre(genre: GenreId): readonly BrandStory[] {
  if (genre === "custom") return [];
  return BRAND_STORIES_BY_GENRE[genre];
}

const GENRES: {
  id: GenreId;
  label: string;
  contentStyle: string;
  targetDemo: string;
  trendingSources: string;
  dashed?: boolean;
}[] = [
  {
    id: "deep-house",
    label: "Deep House",
    contentStyle: "Warm, golden-hour visuals. Slow reveals. Sunset energy.",
    targetDemo: "18-34, lifestyle-led, playlist curators, travel content engaged",
    trendingSources: "TikTok sounds, Spotify editorial, RA listings",
  },
  {
    id: "dnb",
    label: "Drum & Bass",
    contentStyle: "High-contrast motion, strobe-adjacent cuts, bass-face moments, warehouse grit.",
    targetDemo: "18-28, festival-goers, SoundCloud diggers, gaming crossover",
    trendingSources: "YouTube live sets, Reddit r/DnB, Boiler Room clips, Twitch DJs",
  },
  {
    id: "hip-hop",
    label: "Hip Hop",
    contentStyle: "Street-credible framing, lyric-forward hooks, culture-reference captions.",
    targetDemo: "16-30, urban fashion, sneaker and sports culture adjacency",
    trendingSources: "TikTok rap challenges, X/Twitter discourse, Spotify RapCaviar moves",
  },
  {
    id: "techno",
    label: "Techno",
    contentStyle: "Minimal, strobe discipline, industrial textures, late-night Berlin energy.",
    targetDemo: "22-40, club subscribers, vinyl collectors, European tour flyers",
    trendingSources: "Resident Advisor, SoundCloud repost chains, IG club stories",
  },
  {
    id: "pop",
    label: "Pop",
    contentStyle: "Bright, polish-heavy, trend-native transitions, chorus-first hooks.",
    targetDemo: "13-28, radio-adjacent, Shorts/TikTok native, fan-cam culture",
    trendingSources: "TikTok For You, YouTube Shorts charts, radio shazam spikes",
  },
  {
    id: "afrobeats",
    label: "Afrobeats",
    contentStyle: "Rhythm-first edits, dance challenges, warm palettes, diaspora pride.",
    targetDemo: "18-35, global South + UK/EU hubs, dance and fashion crossover",
    trendingSources: "TikTok dance tags, Apple Music Africa Now, UK chart movers",
  },
  {
    id: "rnb",
    label: "R&B",
    contentStyle: "Moody lighting, intimate close-ups, slow-burn storytelling.",
    targetDemo: "18-32, streaming playlist loyalists, late-night scrollers",
    trendingSources: "Spotify R&B playlists, IG Reels slow jams, TikTok duet trends",
  },
  {
    id: "indie",
    label: "Indie / Alt",
    contentStyle: "Grain, film borders, DIY aesthetics, authentic “live room” moments.",
    targetDemo: "18-30, Bandcamp buyers, subculture aesthetics, thrift and zine overlap",
    trendingSources: "Indie TikTok, rateyourmusic buzz, college radio spikes",
  },
  {
    id: "latin",
    label: "Latin",
    contentStyle: "Percussion-forward edits, reggaeton/regional hybrids, high-energy color.",
    targetDemo: "16-34, US LatAm + global Spanish-speaking, dance-first",
    trendingSources: "TikTok Latin charts, YouTube música trending, regional Spotify tops",
  },
  {
    id: "custom",
    label: "+ Custom",
    contentStyle: "Tailored to your subgenre — we map references, tempo, and visual language to your brief.",
    targetDemo: "Defined in onboarding — niche communities, geo targets, and platform mix per artist.",
    trendingSources: "Custom source pack from your niche: forums, playlists, and scene accounts we agree in scope.",
    dashed: true,
  },
];

export default function ProductDemo() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const mockRef = useRef<HTMLDivElement>(null);
  const crossfadeTimeoutRef = useRef<number | null>(null);

  const [active, setActive] = useState(1);
  const [selectedChar, setSelectedChar] = useState(0);
  const grid = productDemoGrid;
  const safeCharIdx = Math.min(selectedChar, Math.max(0, grid.length - 1));
  const [selectedStory, setSelectedStory] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState<GenreId | null>(null);
  const [storyListOpaque, setStoryListOpaque] = useState(true);
  const [visible, setVisible] = useState(true);

  const progress = (active / STEPS.length) * 100;

  const genreForStories: GenreId = selectedGenre ?? "deep-house";
  const storiesForStep3 = brandStoriesForGenre(genreForStories);
  const defaultGenreStories = BRAND_STORIES_BY_GENRE["deep-house"];
  const resolvedStories =
    genreForStories === "custom"
      ? []
      : storiesForStep3.length > 0
        ? storiesForStep3
        : defaultGenreStories;
  const activeStory =
    resolvedStories[Math.min(selectedStory, Math.max(0, resolvedStories.length - 1))] ??
    defaultGenreStories[0];

  useEffect(() => {
    setSelectedStory(0);
  }, [selectedGenre]);

  useEffect(() => {
    if (active !== 3) return;
    setStoryListOpaque(false);
    const t = window.setTimeout(() => setStoryListOpaque(true), 30);
    return () => clearTimeout(t);
  }, [active, selectedGenre]);

  const clearCrossfadeTimer = useCallback(() => {
    if (crossfadeTimeoutRef.current != null) {
      clearTimeout(crossfadeTimeoutRef.current);
      crossfadeTimeoutRef.current = null;
    }
  }, []);

  const goStep = useCallback(
    (step: number) => {
      clearCrossfadeTimer();
      setVisible(false);
      crossfadeTimeoutRef.current = window.setTimeout(() => {
        crossfadeTimeoutRef.current = null;
        setActive(step);
        setVisible(true);
      }, CROSSFADE_MS);
    },
    [clearCrossfadeTimer],
  );

  const nextStep = useCallback(() => {
    if (active >= STEPS.length) return;
    goStep(active + 1);
  }, [active, goStep]);

  useEffect(() => {
    return () => clearCrossfadeTimer();
  }, [clearCrossfadeTimer]);

  useEffect(() => {
    if (typeof window === "undefined" || reduced) return;
    const mock = mockRef.current;
    const root = rootRef.current;
    if (!mock || !root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mock,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  const genre = GENRES.find((g) => g.id === genreForStories) ?? GENRES[0];

  return (
    <section
      ref={rootRef}
      id="product"
      className="relative bg-bg-primary py-section"
    >
      <div className="mx-auto max-w-[900px] px-4 md:px-6">
        <p className="text-center font-mono text-xs font-medium uppercase tracking-[0.08em] text-gray-600">
          How it works
        </p>
        <h2 className="mt-3 text-center text-[1.75rem] font-semibold leading-snug tracking-tight text-text-primary md:text-[2.5rem]">
          Three steps. Then we take over.
        </h2>

        <div
          ref={mockRef}
          className="mt-12 overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
        >
          <div className="flex h-12 items-center gap-2 rounded-t-3xl bg-bg-secondary px-4">
            <span className="size-2 rounded-full bg-[#FF5F57]" />
            <span className="size-2 rounded-full bg-[#FEBC2E]" />
            <span className="size-2 rounded-full bg-[#28C840]" />
            <span className="mx-auto font-mono text-[13px] text-gray-600">reel:lab</span>
          </div>

          <div className="border-b border-border-subtle bg-white px-4 py-4 md:px-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              {STEPS.map((s, i) => {
                const done = active > s.n;
                const cur = active === s.n;
                return (
                  <button
                    key={s.n}
                    type="button"
                    onClick={() => goStep(s.n)}
                    className="flex min-w-[100px] flex-1 items-center gap-2 text-left sm:min-w-[112px]"
                  >
                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-mono",
                        cur && "border-accent bg-accent text-white",
                        done && "border-emerald-500 bg-emerald-500 text-white",
                        !cur && !done && "border-gray-300 text-gray-600",
                      )}
                    >
                      {done ? <Check className="size-3.5" strokeWidth={3} /> : s.n}
                    </span>
                    <span
                      className={cn(
                        "text-[11px] leading-tight md:text-xs",
                        cur && "font-semibold text-gray-900",
                        done && !cur && "font-medium text-gray-700",
                        !cur && !done && "font-medium text-gray-500",
                      )}
                    >
                      {String(s.n).padStart(2, "0")} {s.label}
                    </span>
                    {i < STEPS.length - 1 && (
                      <span className="hidden h-px min-w-[8px] flex-1 bg-gray-300 lg:block" aria-hidden />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 h-0.5 w-full overflow-hidden rounded-full bg-bg-tertiary">
              <div
                className="h-full rounded-full bg-accent transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div
            className={cn(
              "flex min-h-[420px] flex-col bg-white p-4 transition-opacity duration-300 md:min-h-[520px] md:p-8",
              visible ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="min-h-0 flex-1">
            {active === 1 && (
              <div className="grid gap-8 md:grid-cols-[1fr_280px]">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">
                    Pick the face for your artist or brand
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    20+ AI characters ready to rep your sound. Or brief us something custom.
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                    {grid.map((c, i) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedChar(i)}
                        className={cn(
                          "relative overflow-hidden rounded-xl border-2 transition-shadow",
                          safeCharIdx === i
                            ? "border-accent shadow-reel-accent"
                            : "border-transparent shadow-reel-sm",
                        )}
                      >
                        <div className="relative mx-auto aspect-[140/180] w-full max-w-[140px]">
                          <Image
                            src={c.image}
                            alt={c.name}
                            width={140}
                            height={180}
                            loading="lazy"
                            className="h-full w-full object-cover"
                            sizes="140px"
                          />
                        </div>
                        {safeCharIdx === i && (
                          <span className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-accent text-white">
                            <Check className="size-3" strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <button type="button" className="mt-4 text-sm font-medium text-accent">
                    Or brief a custom character →
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative h-[380px] w-full max-w-[280px] overflow-hidden rounded-2xl shadow-reel-md">
                    <Image
                      src={grid[safeCharIdx]?.image ?? grid[0].image}
                      alt={grid[safeCharIdx]?.name ?? ""}
                      width={280}
                      height={380}
                      className="h-full w-full object-cover"
                      sizes="280px"
                    />
                  </div>
                  <p className="mt-3 font-mono text-sm text-gray-600">
                    {grid[safeCharIdx]?.name}
                  </p>
                </div>
              </div>
            )}

            {active === 2 && (
              <div className="grid gap-8 md:grid-cols-[1fr_min(100%,320px)]">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">
                    Select your genre
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    This shapes everything — content style, target audience, trending research, and
                    posting strategy.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-3">
                    {GENRES.map((g) => {
                      const sel = selectedGenre != null && selectedGenre === g.id;
                      return (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setSelectedGenre(g.id)}
                          className={cn(
                            "rounded-lg border px-5 py-3.5 text-left text-base font-medium transition-colors",
                            g.dashed && "border-dashed",
                            !sel &&
                              !g.dashed &&
                              "border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50",
                            !sel &&
                              g.dashed &&
                              "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50",
                            sel &&
                              "border-[#6C5CE7] bg-purple-50/50 text-gray-900 hover:border-[#6C5CE7] hover:bg-purple-50/50",
                          )}
                        >
                          {g.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-5 shadow-reel-sm">
                  <p className="text-xl font-bold text-text-primary">{genre.label}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Content style
                  </p>
                  <p className="mt-1 text-sm text-gray-700">{genre.contentStyle}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Target demo
                  </p>
                  <p className="mt-1 text-sm text-gray-700">{genre.targetDemo}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Trending sources
                  </p>
                  <p className="mt-1 text-sm text-gray-700">{genre.trendingSources}</p>
                </div>
              </div>
            )}

            {active === 3 && (
              <div className="grid gap-8 md:grid-cols-[1fr_300px]">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">
                    Select the brand story designed to tap into your target demographic
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    The narrative drives every post, caption, and visual. Pick a positioning or let
                    us build one.
                  </p>
                  {genreForStories !== "custom" ? (
                    <div
                      className="mt-6 space-y-3 ease-out"
                      style={{
                        opacity: storyListOpaque ? 1 : 0,
                        transition: `opacity ${STORY_LIST_FADE_MS}ms ease-out`,
                      }}
                    >
                      {resolvedStories.map((b, i) => (
                        <button
                          key={`${genreForStories}-${b.name}`}
                          type="button"
                          onClick={() => setSelectedStory(i)}
                          className={cn(
                            "w-full rounded-xl border border-gray-200 bg-white p-4 text-left transition-colors",
                            selectedStory === i
                              ? "border-l-2 border-l-[#6C5CE7] bg-purple-50/30"
                              : "hover:border-gray-300 hover:bg-gray-50/80",
                          )}
                        >
                          <span className="font-semibold text-gray-900">{b.name}</span>
                          <p className="mt-1 text-sm leading-relaxed text-gray-600">
                            {b.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-6 text-sm text-gray-600">
                      No preset stories for a fully custom brief. Share your audience, sound, and
                      the feeling you want — we&apos;ll shape the narrative in onboarding.
                    </p>
                  )}
                </div>
                <div className="relative mx-auto w-full max-w-[300px]">
                  {genreForStories === "custom" ? (
                    <div className="flex flex-col gap-4">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-gray-200 shadow-reel-md">
                        <Image
                          src={grid[safeCharIdx]?.image ?? grid[0].image}
                          alt=""
                          width={300}
                          height={400}
                          className="h-full w-full object-cover"
                          sizes="300px"
                        />
                      </div>
                      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Custom narrative
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-gray-600">
                          Describe your audience, your sound, and the feeling you want your brand to
                          create.
                        </p>
                        <p className="mt-3 text-xs leading-relaxed text-gray-500">
                          We&apos;ll build a custom narrative in your onboarding call.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-gray-200 shadow-reel-md">
                        <Image
                          src={grid[safeCharIdx]?.image ?? grid[0].image}
                          alt=""
                          width={300}
                          height={400}
                          className="h-full w-full object-cover"
                          sizes="300px"
                        />
                      </div>
                      <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-4">
                        <p className="text-base font-semibold text-gray-900">{activeStory.name}</p>
                        <p className="mt-2 text-sm leading-relaxed text-gray-600">
                          {activeStory.description}
                        </p>
                        <p className="mt-3 text-xs text-gray-500">
                          Every post, caption, and visual is generated from this narrative. The AI
                          writes to the brand, not at the audience.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {active === 4 && (
              <div className="grid min-h-[380px] gap-10 md:min-h-[440px] md:grid-cols-[1fr_min(100%,300px)] md:items-start md:gap-12">
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700">
                      <Search className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        AI trending content crawling in your niche
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        The system monitors what&apos;s breaking in your genre daily — sounds,
                        hooks, formats — and adapts your content to match.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700">
                      <Film className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Consistent character content generation
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        On-screen text synced to emotional beats. Captions that extend the
                        narrative. Multiple variants generated and tested.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700">
                      <Rocket className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Turn it on. It gets smarter every week.
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        Building followers, driving viewers and listeners. Every post generates
                        data. Every data point sharpens the next. Your fanbase compounds like
                        streams.
                      </p>
                    </div>
                  </div>
                  <p className="text-sm italic text-gray-400">
                    This is what a reel:lab growth engine looks like.
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Month 3 Projection
                  </p>
                  <p className="mt-3 text-3xl font-bold text-gray-900">1.2M+</p>
                  <p className="text-sm text-gray-500">cumulative views</p>
                  <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 text-sm">
                    <li className="flex justify-between gap-4">
                      <span className="text-gray-500">Posts</span>
                      <span className="font-medium text-gray-900">270</span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span className="text-gray-500">Platforms</span>
                      <span className="font-medium text-gray-900">3</span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span className="text-gray-500">Mode</span>
                      <span className="font-medium text-gray-900">Fully autonomous</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            </div>

            <div
              className={cn(
                "mt-8 flex shrink-0 items-center gap-4 border-t border-gray-100 pt-6",
                active === 4 ? "justify-center" : "justify-end",
              )}
            >
              {active === 4 ? (
                <button
                  type="button"
                  onClick={() => goStep(1)}
                  className="text-sm font-medium text-gray-600 underline-offset-4 transition-colors hover:text-gray-900 hover:underline"
                >
                  Start over
                </button>
              ) : (
                <ShimmerButton size="sm" inverted onClick={nextStep}>
                  Next
                </ShimmerButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
