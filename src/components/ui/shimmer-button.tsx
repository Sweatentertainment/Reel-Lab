"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  /** Compact padding and type — for dense UI (e.g. product demo). */
  size?: "default" | "sm";
  /** Light shell + dark label — inverse of the default dark pill (e.g. on white cards). */
  inverted?: boolean;
}

export function ShimmerButton({
  children,
  className,
  onClick,
  size = "default",
  inverted = false,
}: ShimmerButtonProps) {
  const sm = size === "sm";
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative inline-block cursor-pointer rounded-full p-px font-semibold no-underline",
        inverted
          ? "bg-gray-300 text-gray-900 shadow-md shadow-gray-400/25"
          : "bg-slate-800 text-white shadow-2xl shadow-zinc-900",
        sm ? "text-xs leading-5" : "text-sm leading-6",
        className,
      )}
    >
      <span
        className={cn(
          "relative block overflow-hidden rounded-full ring-1",
          inverted ? "ring-gray-200/90" : "ring-white/10",
        )}
      >
        <span
          className={cn(
            "absolute inset-0 rounded-full",
            inverted ? "bg-white" : "bg-zinc-950",
          )}
          aria-hidden
        />
        <span
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          style={{
            background: inverted
              ? "radial-gradient(75% 110% at 50% 0%, rgba(108,92,231,0.22) 0%, rgba(108,92,231,0.08) 42%, transparent 72%)"
              : "radial-gradient(75% 110% at 50% 0%, rgba(108,92,231,0.55) 0%, rgba(108,92,231,0.18) 42%, transparent 72%)",
          }}
          aria-hidden
        />
        <span
          data-shimmer-content
          className={cn(
            "relative z-10 flex items-center",
            sm ? "gap-1.5 px-4 py-1.5" : "gap-2 px-6 py-2.5",
          )}
        >
          <span>{children}</span>
          <svg
            className="shrink-0"
            fill="none"
            height={sm ? 14 : 16}
            viewBox="0 0 24 24"
            width={sm ? 14 : 16}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M10.75 8.75L14.25 12L10.75 15.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </span>
      </span>
      <span
        className={cn(
          "pointer-events-none absolute bottom-0 z-20 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-[0.55]",
          sm
            ? "left-[0.75rem] w-[calc(100%-1.5rem)]"
            : "left-[1.125rem] w-[calc(100%-2.25rem)]",
        )}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(192, 132, 252, 0.95) 50%, transparent)",
        }}
        aria-hidden
      />
    </button>
  );
}
