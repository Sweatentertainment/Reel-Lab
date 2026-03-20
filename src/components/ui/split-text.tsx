"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type SplitTextProps = {
  text: string;
  className?: string;
  wrapperClassName?: string;
  mode?: "scroll" | "mount";
  scrollStart?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

export function SplitText({
  text,
  className,
  wrapperClassName,
  mode = "scroll",
  scrollStart = "top 80%",
  delay = 0,
  as: Tag = "span",
}: SplitTextProps) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(/\s+/).filter(Boolean);

  useEffect(() => {
    if (typeof window === "undefined" || reduced || !containerRef.current) return;
    const root = containerRef.current;
    const inners = root.querySelectorAll<HTMLElement>(".split-word-inner");
    if (!inners.length) return;

    const ctx = gsap.context(() => {
      if (mode === "mount") {
        gsap.set(inners, { yPercent: 110 });
        gsap.to(inners, {
          yPercent: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: "power4.out",
          delay,
        });
        return;
      }

      gsap.set(inners, { yPercent: 110 });
      gsap.to(inners, {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power4.out",
        scrollTrigger: {
          trigger: root,
          start: scrollStart,
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [text, mode, scrollStart, delay, reduced]);

  if (reduced) {
    return (
      <div className={wrapperClassName}>
        <Tag className={className}>{text}</Tag>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn(wrapperClassName)}>
      <Tag className={className}>
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="split-word inline-block overflow-hidden align-baseline"
          >
            <span className="split-word-inner inline-block">{word}</span>
            {i < words.length - 1 ? "\u00A0" : null}
          </span>
        ))}
      </Tag>
    </div>
  );
}
