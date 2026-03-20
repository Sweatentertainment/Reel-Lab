"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ScrollProgress() {
  const reduced = useReducedMotion();
  const [p, setP] = useState(0);

  useEffect(() => {
    if (reduced) return;

    const read = (scrollTop?: number) => {
      const doc = document.documentElement;
      const y =
        typeof scrollTop === "number"
          ? scrollTop
          : window.scrollY || doc.scrollTop;
      const max = doc.scrollHeight - window.innerHeight;
      setP(max <= 0 ? 0 : Math.min(100, Math.max(0, (y / max) * 100)));
    };

    const onLenis = (e: Event) => {
      const ce = e as CustomEvent<{ scroll: number }>;
      read(ce.detail?.scroll);
    };

    const onScroll = () => read();
    const onResize = () => read();

    read();
    window.addEventListener("reellab:scroll", onLenis);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("reellab:scroll", onLenis);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-0.5 bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-accent transition-[width] duration-150 ease-out"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}
