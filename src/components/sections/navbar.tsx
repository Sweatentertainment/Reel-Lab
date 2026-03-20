"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { useLenisNav } from "@/components/providers/smooth-scroll";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const links = [
  { label: "Product", hash: "#product" },
  { label: "Register", hash: "#early-access" },
  { label: "FAQ", hash: "#faq" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const { scrollTo } = useLenisNav();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const hidden = useRef(false);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const applyScrollState = (y: number) => {
      const nextScrolled = y > 100;
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
      const delta = y - lastY.current;
      lastY.current = y;
      if (y < 80) {
        hidden.current = false;
        gsap.to(el, { yPercent: 0, duration: 0.35, ease: "power2.out" });
        return;
      }
      if (Math.abs(delta) < 4) return;
      if (delta > 0 && !hidden.current) {
        hidden.current = true;
        gsap.to(el, { yPercent: -100, duration: 0.35, ease: "power2.out" });
      } else if (delta < 0 && hidden.current) {
        hidden.current = false;
        gsap.to(el, { yPercent: 0, duration: 0.35, ease: "power2.out" });
      }
    };

    if (reduced) {
      const onWin = () => applyScrollState(window.scrollY);
      onWin();
      window.addEventListener("scroll", onWin, { passive: true });
      return () => window.removeEventListener("scroll", onWin);
    }

    const onLenis = (e: Event) => {
      const ce = e as CustomEvent<{ scroll: number }>;
      applyScrollState(ce.detail?.scroll ?? 0);
    };
    window.addEventListener("reellab:scroll", onLenis);
    return () => window.removeEventListener("reellab:scroll", onLenis);
  }, [reduced]);

  const go = (hash: string) => {
    scrollTo(hash);
    setOpen(false);
  };

  const scrollToEarlyAccess = () => {
    document
      .getElementById("early-access")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-[400ms]",
        scrolled
          ? "border-b border-border-subtle bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-5 md:px-6">
        <a
          href="#"
          className="inline-flex items-baseline gap-0 whitespace-nowrap text-xl font-bold tracking-tight text-text-primary"
          title="reel:lab"
          aria-label="reel:lab"
          onClick={(e) => {
            e.preventDefault();
            go("#");
          }}
        >
          <span className="text-text-primary">reel</span>
          <span
            className="px-[0.5px] text-lg font-extrabold leading-none text-text-primary"
            aria-hidden
          >
            :
          </span>
          <span className="text-text-primary">lab</span>
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.hash}>
              <button
                type="button"
                onClick={() => go(l.hash)}
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <ShimmerButton className="text-xs" onClick={scrollToEarlyAccess}>
            Register Interest
          </ShimmerButton>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-text-primary md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-b border-border-subtle bg-white/95 backdrop-blur-xl transition-[max-height] duration-300 md:hidden",
          open ? "max-h-64" : "max-h-0",
        )}
      >
        <ul className="flex flex-col gap-1 px-4 py-4">
          {links.map((l) => (
            <li key={l.hash}>
              <button
                type="button"
                onClick={() => go(l.hash)}
                className="block w-full py-2 text-left text-sm text-text-secondary"
              >
                {l.label}
              </button>
            </li>
          ))}
          <li className="pt-2">
            <ShimmerButton
              className="w-full text-xs [&_[data-shimmer-content]]:justify-center"
              onClick={scrollToEarlyAccess}
            >
              Register Interest
            </ShimmerButton>
          </li>
        </ul>
      </div>
    </header>
  );
}
