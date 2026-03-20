"use client";

/**
 * Global ambient light rays — blends with section backgrounds (fixed + mix-blend).
 * Sits below the navbar (z-50); pointer-events none.
 */
export function LightRaysBackground() {
  return (
    <div className="reel-light-rays" aria-hidden>
      <div className="reel-light-rays__spin" />
    </div>
  );
}
