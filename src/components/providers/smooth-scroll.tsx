"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type LenisContextValue = {
  scrollTo: (hash: string) => void;
};

function nativeScrollTo(hash: string) {
  const id = hash.replace(/^#/, "");
  const offset = 64;
  if (!id) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

const LenisContext = createContext<LenisContextValue>({
  scrollTo: nativeScrollTo,
});

export function useLenisNav() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const rafId = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      autoRaf: false,
    });
    lenisRef.current = lenis;

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    lenis.on("scroll", ScrollTrigger.update);
    lenis.on("scroll", () => {
      window.dispatchEvent(
        new CustomEvent("reellab:scroll", {
          detail: {
            scroll: lenis.scroll,
            direction: lenis.direction,
          },
        }),
      );
    });

    const raf = (time: number) => {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    };
    rafId.current = requestAnimationFrame(raf);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", onResize);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.refresh();
    };
  }, [reducedMotion]);

  const scrollTo = useCallback(
    (hash: string) => {
      const id = hash.replace(/^#/, "");
      const offset = 64;

      if (!id) {
        if (reducedMotion || !lenisRef.current) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          lenisRef.current.scrollTo(0, { duration: 1.2 });
        }
        return;
      }

      const el = document.getElementById(id);
      if (!el) return;

      if (reducedMotion || !lenisRef.current) {
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
        return;
      }

      lenisRef.current.scrollTo(el, {
        offset: -offset,
        duration: 1.2,
      });
    },
    [reducedMotion],
  );

  const value = useMemo(() => ({ scrollTo }), [scrollTo]);

  // lenis ref updates after mount — expose scrollTo only (stable); consumers use scrollTo
  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}
