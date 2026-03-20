"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Icon = {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  id: number;
};

export type IconCloudProps = {
  images: string[];
  /** When true: no idle drift, no snap-to-item on tap; drag still rotates the sphere. */
  reduceMotion?: boolean;
  className?: string;
  /** Thumbnail size in CSS pixels (drawn circular). Default 72 (~60–80px range). */
  thumbSize?: number;
};

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function IconCloud({
  images,
  reduceMotion = false,
  className,
  thumbSize = 72,
}: IconCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [iconPositions, setIconPositions] = useState<Icon[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState<{
    x: number;
    y: number;
    startX: number;
    startY: number;
    distance: number;
    startTime: number;
    duration: number;
  } | null>(null);

  const animationFrameRef = useRef(0);
  const rotationRef = useRef({ x: 0.25, y: 0.35 });
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([]);
  const imagesLoadedRef = useRef<boolean[]>([]);
  const displaySizeRef = useRef({ w: 400, h: 400 });
  const reduceMotionRef = useRef(reduceMotion);

  useEffect(() => {
    reduceMotionRef.current = reduceMotion;
  }, [reduceMotion]);

  const r = thumbSize / 2;

  useEffect(() => {
    if (!images.length) return;

    imagesLoadedRef.current = new Array(images.length).fill(false);

    const newIconCanvases = images.map((src, index) => {
      const offscreen = document.createElement("canvas");
      offscreen.width = thumbSize;
      offscreen.height = thumbSize;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return offscreen;

      const img = new Image();
      img.decoding = "async";
      img.src = src;
      img.onload = () => {
        offCtx.clearRect(0, 0, thumbSize, thumbSize);
        offCtx.save();
        offCtx.beginPath();
        offCtx.arc(r, r, r, 0, Math.PI * 2);
        offCtx.closePath();
        offCtx.clip();
        offCtx.drawImage(img, 0, 0, thumbSize, thumbSize);
        offCtx.restore();
        imagesLoadedRef.current[index] = true;
      };
      img.onerror = () => {
        offCtx.fillStyle = "#e5e7eb";
        offCtx.fillRect(0, 0, thumbSize, thumbSize);
        imagesLoadedRef.current[index] = true;
      };
      return offscreen;
    });

    iconCanvasesRef.current = newIconCanvases;
  }, [images, thumbSize, r]);

  useEffect(() => {
    const numIcons = images.length || 1;
    const newIcons: Icon[] = [];
    const offset = 2 / numIcons;
    const increment = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2;
      const rad = Math.sqrt(1 - y * y);
      const phi = i * increment;
      const x = Math.cos(phi) * rad;
      const z = Math.sin(phi) * rad;
      newIcons.push({
        x: x * 100,
        y: y * 100,
        z: z * 100,
        scale: 1,
        opacity: 1,
        id: i,
      });
    }
    setIconPositions(newIcons);
  }, [images.length]);

  useEffect(() => {
    const el = containerRef.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;

    const applySize = () => {
      const rect = el.getBoundingClientRect();
      const w = Math.max(2, Math.floor(rect.width));
      const h = Math.max(2, Math.floor(rect.height));
      displaySizeRef.current = { w, h };
      const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    applySize();
    const ro = new ResizeObserver(applySize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pickSpherePoint = (clientX: number, clientY: number) => {
    if (reduceMotionRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const { w, h } = displaySizeRef.current;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    iconPositions.forEach((icon) => {
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;

      const screenX = w / 2 + rotatedX;
      const screenY = h / 2 + rotatedY;
      const scale = (rotatedZ + 200) / 300;
      const radius = r * scale;
      const dx = x - screenX;
      const dy = y - screenY;

      if (dx * dx + dy * dy < radius * radius) {
        const targetX = -Math.atan2(
          icon.y,
          Math.sqrt(icon.x * icon.x + icon.z * icon.z),
        );
        const targetY = Math.atan2(icon.x, icon.z);
        const currentX = rotationRef.current.x;
        const currentY = rotationRef.current.y;
        const dist = Math.sqrt(
          Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2),
        );
        const duration = Math.min(2000, Math.max(800, dist * 1000));
        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance: dist,
          startTime: performance.now(),
          duration,
        });
      }
    });
  };

  const handlePointerDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    pickSpherePoint(e.clientX, e.clientY);
    draggingRef.current = true;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    if (draggingRef.current) {
      const deltaX = e.clientX - lastPointerRef.current.x;
      const deltaY = e.clientY - lastPointerRef.current.y;
      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      };
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = () => {
    draggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    pickSpherePoint(t.clientX, t.clientY);
    draggingRef.current = true;
    lastPointerRef.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    const t = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setMousePos({
      x: t.clientX - rect.left,
      y: t.clientY - rect.top,
    });
    if (draggingRef.current) {
      const deltaX = t.clientX - lastPointerRef.current.x;
      const deltaY = t.clientY - lastPointerRef.current.y;
      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      };
      lastPointerRef.current = { x: t.clientX, y: t.clientY };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !images.length) return;

    const animate = () => {
      const { w, h } = displaySizeRef.current;
      ctx.clearRect(0, 0, w, h);

      const centerX = w / 2;
      const centerY = h / 2;
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY) || 1;
      const dx = mousePos.x - centerX;
      const dy = mousePos.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 0.003 + (distance / maxDistance) * 0.01;

      if (targetRotation) {
        const elapsed = performance.now() - targetRotation.startTime;
        const progress = Math.min(1, elapsed / targetRotation.duration);
        const eased = easeOutCubic(progress);
        rotationRef.current = {
          x:
            targetRotation.startX +
            (targetRotation.x - targetRotation.startX) * eased,
          y:
            targetRotation.startY +
            (targetRotation.y - targetRotation.startY) * eased,
        };
        if (progress >= 1) setTargetRotation(null);
      } else if (!draggingRef.current && !reduceMotionRef.current) {
        rotationRef.current = {
          x:
            rotationRef.current.x +
            (dy / h) * speed +
            0.00055,
          y:
            rotationRef.current.y +
            (dx / w) * speed +
            0.001,
        };
      }

      iconPositions.forEach((icon, index) => {
        const cosX = Math.cos(rotationRef.current.x);
        const sinX = Math.sin(rotationRef.current.x);
        const cosY = Math.cos(rotationRef.current.y);
        const sinY = Math.sin(rotationRef.current.y);

        const rotatedX = icon.x * cosY - icon.z * sinY;
        const rotatedZ = icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX + rotatedZ * sinX;

        const scale = (rotatedZ + 200) / 300;
        const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 150) / 200));

        ctx.save();
        ctx.translate(w / 2 + rotatedX, h / 2 + rotatedY);
        ctx.scale(scale, scale);
        ctx.globalAlpha = opacity;

        if (
          iconCanvasesRef.current[index] &&
          imagesLoadedRef.current[index]
        ) {
          ctx.drawImage(
            iconCanvasesRef.current[index],
            -r,
            -r,
            thumbSize,
            thumbSize,
          );
        }

        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [images.length, iconPositions, mousePos, targetRotation, thumbSize, r]);

  if (!images.length) {
    return (
      <div
        className={cn(
          "flex h-full min-h-[280px] items-center justify-center rounded-xl bg-neutral-100 text-sm text-neutral-400",
          className,
        )}
      >
        No character images
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full min-h-[280px] w-full", className)}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handlePointerUp}
        className="block h-full w-full cursor-grab touch-none active:cursor-grabbing"
        style={{ touchAction: "none" }}
        aria-label="Interactive character sphere — drag to rotate"
        role="img"
      />
    </div>
  );
}
