"use client";

import { motion, useReducedMotion as useFramerReduced } from "framer-motion";
import { EarlyAccessForm } from "@/components/ui/early-access-form";
import { NumberTicker } from "@/components/ui/number-ticker";

export default function BookCallSection() {
  const reduce = useFramerReduced();

  return (
    <section
      id="book-call"
      className="relative overflow-hidden bg-[#FFFFFF] py-section"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_60%_at_50%_42%,rgba(108,92,231,0.05)_0%,transparent_65%)]"
        aria-hidden
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-72px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-3xl px-4 text-center md:px-6"
      >
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-gray-500">
          Interested?
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          Register your interest.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
          Leave your email and we&apos;ll be in touch before launch to discuss what reel:lab can
          build for you.
        </p>

        <div className="mt-10 flex justify-center">
          <EarlyAccessForm variant="light" className="mx-auto max-w-md justify-center" />
        </div>

        <p className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-gray-500">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
          Only{" "}
          <NumberTicker value={19} className="font-semibold tabular-nums text-gray-900" /> launch
          slots remaining.
        </p>
      </motion.div>
    </section>
  );
}
