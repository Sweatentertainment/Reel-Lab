"use client";

import {
  useCallback,
  useRef,
  type PointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const RADIUS = 40;
const MAX_SHIFT = 12;

export function MagneticButton({
  children,
  className,
  intensity = 1,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  const setTransform = useCallback(
    (dx: number, dy: number, scale: number) => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    },
    [],
  );

  const onMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > RADIUS) {
        if (frame.current) cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => setTransform(0, 0, 1));
        return;
      }
      const pull = (1 - dist / RADIUS) * MAX_SHIFT * intensity;
      const nx = (dx / (dist || 1)) * pull;
      const ny = (dy / (dist || 1)) * pull;
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => setTransform(nx, ny, 1.03));
    },
    [intensity, setTransform],
  );

  const onLeave = useCallback(() => {
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => setTransform(0, 0, 1));
  }, [setTransform]);

  return (
    <div
      className={cn("inline-flex will-change-transform", className)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerCancel={onLeave}
    >
      <div ref={ref} className="inline-flex transition-[box-shadow] duration-300 will-change-transform">
        {children}
      </div>
    </div>
  );
}
