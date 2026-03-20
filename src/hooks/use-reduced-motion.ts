"use client";

import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    let alive = true;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (!alive) return;
      setReduced(mq.matches);
    };
    queueMicrotask(apply);
    mq.addEventListener("change", apply);
    return () => {
      alive = false;
      mq.removeEventListener("change", apply);
    };
  }, []);

  return reduced;
}
