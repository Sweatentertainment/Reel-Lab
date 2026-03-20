"use client";

import Image from "next/image";
import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { cn } from "@/lib/utils";
import type { CharacterEntry } from "@/lib/assets";
import { useVideoBudget } from "@/contexts/video-budget";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type ManagedCharacterMediaProps = {
  id: string;
  character: CharacterEntry;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  /** If false, never use video (e.g. tiny mosaic). */
  allowVideo?: boolean;
  priority?: boolean;
  loading?: "lazy" | "eager";
  /** Ken Burns on static-only tiles */
  kenBurns?: boolean;
  /** Fill a relatively positioned parent (e.g. aspect-square grid cell). Still pass width/height for Image hints. */
  fillParent?: boolean;
};

/**
 * Static image with optional H.264 loop, obeying global video tile (4) and playback (3) caps.
 */
export function ManagedCharacterMedia({
  id,
  character,
  width,
  height,
  className,
  imgClassName,
  allowVideo = true,
  priority = false,
  loading = "lazy",
  kenBurns = false,
  fillParent = false,
}: ManagedCharacterMediaProps) {
  const reduced = useReducedMotion();
  const budget = useVideoBudget();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [inView, setInView] = useState(false);
  const [nearView, setNearView] = useState(false);
  const [hasTile, setHasTile] = useState(false);

  const wantsVideo = Boolean(allowVideo && character.video && !reduced);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ioMain = new IntersectionObserver(
      ([e]) => {
        queueMicrotask(() => {
          setInView(e.isIntersecting && e.intersectionRatio > 0.05);
        });
      },
      { threshold: [0, 0.05, 0.15, 0.35], rootMargin: "0px" },
    );
    ioMain.observe(el);

    const ioNear = new IntersectionObserver(
      ([e]) => {
        queueMicrotask(() => setNearView(e.isIntersecting));
      },
      { rootMargin: "360px 0px", threshold: 0 },
    );
    ioNear.observe(el);

    return () => {
      ioMain.disconnect();
      ioNear.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!wantsVideo || !inView) return;
    const ok = budget.acquireVideoTile(id);
    startTransition(() => setHasTile(ok));
    return () => {
      budget.releaseVideoTile(id);
    };
  }, [wantsVideo, inView, id, budget]);

  useEffect(() => {
    if (wantsVideo && inView) return;
    startTransition(() => setHasTile(false));
  }, [wantsVideo, inView]);

  const tryPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v || !hasTile || !inView || !wantsVideo) return;
    if (!budget.requestPlay(id)) {
      v.pause();
      return;
    }
    v.play().catch(() => {
      budget.releasePlay(id);
    });
  }, [budget, hasTile, id, inView, wantsVideo]);

  useEffect(() => {
    if (!hasTile || !wantsVideo || !inView) {
      const v = videoRef.current;
      if (v) {
        v.pause();
        budget.releasePlay(id);
      }
      return;
    }
    const v = videoRef.current;
    if (!v) return;
    tryPlay();
    return () => {
      v.pause();
      budget.releasePlay(id);
    };
  }, [hasTile, wantsVideo, inView, tryPlay, budget, id]);

  const showVideo = wantsVideo && hasTile && inView;
  const preload: "none" | "metadata" = nearView && showVideo ? "metadata" : "none";

  const boxStyle: CSSProperties = fillParent
    ? { position: "absolute", inset: 0, width: "100%", height: "100%" }
    : { width, height };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden bg-bg-tertiary", fillParent && "min-h-0 min-w-0", className)}
      style={boxStyle}
    >
      {showVideo && character.video ? (
        <video
          ref={videoRef}
          className={cn("absolute inset-0 h-full w-full object-cover", imgClassName)}
          src={character.video}
          poster={character.image}
          muted
          loop
          playsInline
          preload={preload}
          onCanPlay={() => tryPlay()}
        />
      ) : (
        <div
          className={cn(
            "absolute inset-0 overflow-hidden",
            kenBurns && !reduced && "motion-safe:animate-ken-burns",
          )}
        >
          {fillParent ? (
            <Image
              src={character.image}
              alt={character.name}
              fill
              priority={priority}
              loading={priority ? undefined : loading}
              className={cn("object-cover", imgClassName)}
              sizes="(max-width:768px) 32vw, 200px"
            />
          ) : (
            <Image
              src={character.image}
              alt={character.name}
              width={width}
              height={height}
              priority={priority}
              loading={priority ? undefined : loading}
              className={cn("h-full w-full object-cover", imgClassName)}
              sizes={`${width}px`}
            />
          )}
        </div>
      )}
    </div>
  );
}
