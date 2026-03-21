"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Share2 } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { AssetImage } from "@/components/ui/asset-image";
import { pipelineFanCharacterImage } from "@/lib/assets";

const stages = [
  {
    n: "01",
    title: "Account Warm-Up",
    body: "7-14 days of organic behaviour before your first post. Watching, liking, following — building real algorithmic signals.",
    stat: "Avg 200+ interactions before first post",
    visual: "warmup" as const,
  },
  {
    n: "02",
    title: "Emotional Analysis",
    body: "AI analyses every track — extracting emotional signals from lyrics, mapping mood to visual language, identifying hook phrases.",
    stat: "12 emotional dimensions per track",
    visual: "wave" as const,
  },
  {
    n: "03",
    title: "Content Engine",
    body: "On-screen text synced to emotional beats. Captions that extend the narrative. Multiple variants generated and tested.",
    stat: "30+ content pieces per cycle",
    visual: "phones" as const,
  },
  {
    n: "04",
    title: "Distribution",
    body: "Simultaneous multi-platform posting with platform-specific optimisation. Official audio integration where available.",
    stat: "5 platforms, continuous",
    visual: "share" as const,
  },
  {
    n: "05",
    title: "Intelligence",
    body: "Performance tracking, automated alerts, viral hook research feeding back into generation weekly. The system gets smarter the longer it runs.",
    stat: "Weekly optimisation cycles",
    visual: "dash" as const,
  },
];

function StageVisual({ type }: { type: (typeof stages)[number]["visual"] }) {
  if (type === "warmup") {
    return (
      <div className="flex h-full w-full items-center justify-center p-2">
        <div className="flex h-[168px] w-full max-w-[280px] flex-col justify-center rounded-2xl border border-border-subtle bg-bg-secondary p-3 shadow-sm">
          <div className="flex-1 space-y-1.5 overflow-hidden rounded-lg bg-white p-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-2.5 rounded bg-bg-tertiary" />
            ))}
          </div>
          <div className="mt-2 flex items-center justify-center gap-2 text-[10px] font-mono text-text-muted">
            <span className="size-8 rounded-full border-2 border-accent border-t-transparent" />
            Day 7 of 14
          </div>
        </div>
      </div>
    );
  }
  if (type === "wave") {
    return (
      <div className="flex h-full w-full items-center justify-center p-2">
        <div className="flex h-[168px] w-full max-w-[280px] flex-col justify-center gap-2 rounded-2xl border border-border-subtle bg-bg-secondary p-4 shadow-sm">
          <div className="flex h-[72px] items-end gap-1">
            {[30, 55, 40, 70, 45, 90, 60, 35, 80].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-accent/70"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-1 text-[9px] font-mono text-text-muted">
            {["tension", "release", "drop", "outro"].map((t) => (
              <span key={t} className="rounded bg-white px-1.5 py-0.5 shadow-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (type === "phones") {
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute w-[76px] overflow-hidden rounded-xl border border-border-subtle bg-white shadow-md"
            style={{
              transform: `rotate(${-8 + i * 8}deg) translateX(${(i - 1) * 34}px)`,
              zIndex: i,
            }}
          >
            <div className="relative aspect-[9/14] w-full">
              <AssetImage
                src={pipelineFanCharacterImage}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (type === "share") {
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="absolute flex size-12 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Share2 className="size-5" />
        </div>
        {["TT", "YT", "S", "FB"].map((label, i) => (
          <div
            key={label}
            className="absolute flex size-10 items-center justify-center rounded-full border border-border-subtle bg-white text-[10px] font-bold shadow-md"
            style={{
              transform: `rotate(${i * 90}deg) translateY(-72px) rotate(${-i * 90}deg)`,
            }}
          >
            {label}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center p-2">
      <div className="flex h-[168px] w-full max-w-[280px] flex-col justify-center rounded-2xl border border-border-subtle bg-bg-secondary p-4 shadow-sm">
        <div className="h-[72px] rounded-lg bg-white shadow-sm">
          <svg className="h-full w-full text-accent" preserveAspectRatio="none" viewBox="0 0 100 40">
            <path
              d="M0 35 L20 20 L40 28 L60 10 L80 18 L100 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        <p className="mt-2 rounded-lg bg-white px-2 py-1.5 text-[10px] leading-snug text-text-secondary shadow-sm">
          Engagement drop → deploying variant B
        </p>
      </div>
    </div>
  );
}

function StageCard({
  stage,
  className,
}: {
  stage: (typeof stages)[number];
  className?: string;
}) {
  return (
    <article
      className={cn(
        "mx-auto flex min-h-[400px] w-full max-w-[480px] flex-col rounded-2xl bg-white p-8 shadow-md md:mx-0 md:min-w-[420px] md:shrink-0 md:p-10",
        className,
      )}
    >
      <div className="h-[200px] w-full shrink-0 overflow-hidden rounded-xl bg-bg-secondary/30">
        <StageVisual type={stage.visual} />
      </div>
      <p className="mb-2 mt-6 text-sm text-gray-400">{stage.n}</p>
      <h3 className="text-xl font-semibold text-text-primary md:text-2xl">{stage.title}</h3>
      <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">{stage.body}</p>
      <p className="mt-4 font-mono text-sm text-accent">{stage.stat}</p>
    </article>
  );
}

export default function UnderTheHood() {
  const reduced = useReducedMotion();
  const isMd = useMediaQuery("(min-width: 768px)");
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || reduced || !isMd) return;
    const section = sectionRef.current;
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!section || !container || !scrollContainer) return;

    let tl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      const build = () => {
        tl?.scrollTrigger?.kill();
        tl?.kill();

        const overflow = containerRef.current;
        const track = scrollContainerRef.current;
        const line = lineRef.current;
        if (!overflow || !track) return;

        const scrollWidth = Math.max(0, track.scrollWidth - overflow.clientWidth);

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollWidth + window.innerHeight}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              const moveP = p <= 0.15 ? 0 : p >= 0.85 ? 1 : (p - 0.15) / 0.7;
              if (line) {
                const len = line.getTotalLength();
                line.style.strokeDasharray = `${len}`;
                line.style.strokeDashoffset = `${len * (1 - moveP)}`;
              }
            },
          },
        });

        tl.to(track, { x: 0, duration: 0.15 })
          .to(track, { x: -scrollWidth, duration: 0.7, ease: "none" })
          .to(track, { x: -scrollWidth, duration: 0.15 });
      };

      build();
      const onResize = () => {
        build();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [reduced, isMd]);

  return (
    <section
      ref={sectionRef}
      className="under-the-hood relative bg-bg-primary py-section md:py-0"
    >
      <div className="mx-auto max-w-[1200px] pl-8 pr-4 pt-4 md:pl-16 md:pr-6 md:pt-10 lg:pl-24 lg:pr-8">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-text-muted">
          Under the hood
        </p>
        <h2 className="mt-3 max-w-2xl text-[1.75rem] font-semibold tracking-tight text-text-primary md:text-[2.5rem]">
          The system behind the system.
        </h2>
      </div>

      {!isMd || reduced ? (
        <div className="mx-auto mt-10 flex max-w-[1200px] flex-col gap-6 pl-8 pr-4 md:pl-16 md:pr-6 lg:pl-24 lg:pr-8">
          {stages.map((s) => (
            <StageCard key={s.n} stage={s} />
          ))}
        </div>
      ) : (
        <div className="relative mt-8 min-h-0 md:min-h-[min(100dvh,920px)] md:pb-10">
          <svg
            className="pointer-events-none absolute bottom-[42%] left-8 right-4 hidden h-4 md:left-16 md:right-6 md:block lg:left-24 lg:right-8"
            viewBox="0 0 1200 16"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              ref={lineRef}
              d="M 0 8 L 1200 8"
              fill="none"
              stroke="rgba(108,92,231,0.35)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div ref={containerRef} className="overflow-hidden pl-8 md:pl-16 lg:pl-24">
            <div
              ref={scrollContainerRef}
              className="flex w-max gap-6 pt-6 pr-8 md:pr-16 lg:pr-24"
            >
              {stages.map((s) => (
                <StageCard key={s.n} stage={s} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
