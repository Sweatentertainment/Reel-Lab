"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Eye } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type CursorMode = "default" | "interactive" | "image";

export function CustomCursor() {
  const reduced = useReducedMotion();
  const [fine, setFine] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced || !fine) return;
    const prev = document.body.style.cursor;
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = prev;
    };
  }, [reduced, fine]);

  useEffect(() => {
    if (reduced || !fine || !dotRef.current) return;
    const el = dotRef.current;
    gsap.set(el, { xPercent: -50, yPercent: -50 });
    xTo.current = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    yTo.current = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      if (!xTo.current || !yTo.current) return;
      xTo.current(e.clientX);
      yTo.current(e.clientY);
      setVisible(true);
    };

    const leave = () => setVisible(false);

    const pickMode = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return "default";
      if (target.closest("img, picture, [data-cursor-image]")) return "image";
      if (
        target.closest(
          'a, button, [role="button"], input, textarea, select, [data-cursor-interactive]',
        )
      )
        return "interactive";
      return "default";
    };

    const over = (e: PointerEvent) => setMode(pickMode(e.target));

    window.addEventListener("pointermove", move);
    document.body.addEventListener("pointerover", over, true);
    document.body.addEventListener("pointerleave", leave, true);

    return () => {
      window.removeEventListener("pointermove", move);
      document.body.removeEventListener("pointerover", over, true);
      document.body.removeEventListener("pointerleave", leave, true);
    };
  }, [reduced, fine]);

  if (reduced || !fine) return null;

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[70] mix-blend-difference"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden
    >
      {mode === "image" && (
        <div className="flex size-10 items-center justify-center rounded-full border-2 border-white text-white">
          <Eye className="size-4" strokeWidth={2} />
        </div>
      )}
      {mode === "interactive" && (
        <div className="size-10 rounded-full border-2 border-white bg-transparent" />
      )}
      {mode === "default" && <div className="size-3 rounded-full bg-[#6c5ce7]" />}
    </div>
  );
}
