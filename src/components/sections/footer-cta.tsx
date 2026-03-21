"use client";

import { EarlyAccessForm } from "@/components/ui/early-access-form";
import { useLenisNav } from "@/components/providers/smooth-scroll";

export default function FooterCTA() {
  const { scrollTo } = useLenisNav();

  return (
    <>
      <section className="bg-[#F8F7F4] py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm"
            role="status"
          >
            <span
              className="size-2 shrink-0 animate-pulse rounded-full bg-emerald-500"
              aria-hidden
            />
            <span className="text-sm text-gray-600">Pre-launch</span>
          </div>

          <h2 className="mt-8 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Launching June 2026.
          </h2>

          <p className="mx-auto mt-4 max-w-md text-lg text-gray-500">
            Leave your email and we&apos;ll be in touch before launch to discuss what reel:lab can
            build for you.
          </p>

          <div className="mt-6 flex justify-center">
            <EarlyAccessForm variant="light" className="mx-auto max-w-md justify-center" />
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-8 py-8">
          <div className="relative flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between">
            <span className="text-sm font-medium text-gray-900">reel:lab</span>

            <nav className="flex items-center gap-6 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
              <button
                type="button"
                onClick={() => scrollTo("#product")}
                className="text-sm text-gray-400 transition-colors hover:text-gray-600"
              >
                Product
              </button>
              <span className="text-sm text-gray-300" aria-hidden>
                ·
              </span>
              <button
                type="button"
                onClick={() => scrollTo("#faq")}
                className="text-sm text-gray-400 transition-colors hover:text-gray-600"
              >
                FAQ
              </button>
            </nav>

            <span className="text-sm text-gray-400">A Sweat Group company</span>
          </div>

          <p className="mt-4 pb-4 text-center text-xs text-gray-300">
            <a href="#" className="transition-colors hover:text-gray-500">
              Terms
            </a>
            <span className="mx-2" aria-hidden>
              ·
            </span>
            <a href="#" className="transition-colors hover:text-gray-500">
              Privacy
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
