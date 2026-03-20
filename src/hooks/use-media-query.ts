"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    let alive = true;
    const mq = window.matchMedia(query);
    const apply = () => {
      if (!alive) return;
      setMatches(mq.matches);
    };
    queueMicrotask(apply);
    mq.addEventListener("change", apply);
    return () => {
      alive = false;
      mq.removeEventListener("change", apply);
    };
  }, [query]);

  return matches;
}
