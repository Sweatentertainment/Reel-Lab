"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { getPremiumCharacterImages } from "@/lib/assets";
import { EarlyAccessForm } from "@/components/ui/early-access-form";
import { IconCloud } from "@/components/ui/icon-cloud";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const HEADLINE = "The infrastructure behind music's next brands.";
const SUBHEAD =
  "We build and run artist brands, curator accounts, and influencer pages — generating content, growing audiences, and driving real engagement across TikTok, YouTube, YouTube Shorts, Facebook, and Instagram Reels.";

export default function Hero() {
  const reduced = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const headlineRootRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const fineRef = useRef<HTMLParagraphElement>(null);

  const cloudImages = useMemo(() => getPremiumCharacterImages(), []);

  const headlineWords = useMemo(
    () => HEADLINE.split(/\s+/).filter(Boolean),
    [],
  );

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const headlineRoot = headlineRootRef.current;
    const sub = subRef.current;
    const cta = ctaRef.current;
    const fine = fineRef.current;
    if (!section || !headlineRoot) return;

    const ctx = gsap.context(() => {
      const headlineInners =
        headlineRoot.querySelectorAll<HTMLElement>(".hero-headline-inner");
      gsap.set(headlineInners, { yPercent: 110, opacity: 0 });
      gsap.set([sub, cta, fine].filter(Boolean), { opacity: 0, y: 14 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (headlineInners.length) {
        tl.to(headlineInners, {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "power4.out",
        });
      }

      if (sub) {
        tl.to(sub, { opacity: 1, y: 0, duration: 0.55 }, "+=0.25");
      }
      if (cta) {
        tl.to(cta, { opacity: 1, y: 0, duration: 0.45 }, "+=0.2");
      }
      if (fine) {
        tl.to(fine, { opacity: 1, y: 0, duration: 0.4 }, "+=0.2");
      }
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden bg-white pt-[var(--nav-h)]"
    >
      <div className="mx-auto flex min-h-[calc(100dvh-var(--nav-h))] max-w-[1400px] flex-col md:flex-row">
        {/* Left ~55% */}
        <div
          className={cn(
            "flex w-full flex-col justify-center px-4 py-10 md:w-[55%] md:max-w-[55%] md:py-16",
            "pl-8 md:pl-16 lg:pl-24",
          )}
        >
          <div ref={headlineRootRef}>
            <h1
              className={cn(
                "font-bold leading-tight tracking-tight text-gray-900",
                "text-4xl md:text-6xl lg:text-7xl",
              )}
            >
              {reduced ? (
                HEADLINE
              ) : (
                <>
                  {headlineWords.map((word, i) => (
                    <span
                      key={`${word}-${i}`}
                      className="inline-block overflow-hidden align-baseline"
                    >
                      <span className="hero-headline-inner inline-block">
                        {word}
                      </span>
                      {i < headlineWords.length - 1 ? "\u00A0" : null}
                    </span>
                  ))}
                </>
              )}
            </h1>
          </div>

          <p
            ref={subRef}
            className={cn(
              "mt-6 max-w-lg text-lg text-gray-500 md:text-xl",
              reduced && "opacity-100",
            )}
          >
            {SUBHEAD}
          </p>

          <div
            id="early-access"
            ref={ctaRef}
            className={cn("mt-8 scroll-mt-28", reduced && "opacity-100")}
          >
            <EarlyAccessForm variant="light" />
          </div>

          <p
            ref={fineRef}
            className={cn("mt-4 text-sm text-gray-400", reduced && "opacity-100")}
          >
            Launching June 2026.
          </p>
        </div>

        {/* Right ~45% */}
        <div
          className={cn(
            "flex w-full flex-shrink-0 items-center justify-center md:w-[45%] md:max-w-[45%]",
            "min-h-[360px] md:min-h-0 md:py-8",
          )}
        >
          <div className="h-[360px] w-full max-w-[624px] md:h-[min(86.4vh,768px)] md:max-w-none">
            <IconCloud
              images={cloudImages}
              reduceMotion={reduced}
              thumbSize={86}
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
