"use client";

import { motion, useReducedMotion as useFramerReduced } from "framer-motion";
import { EarlyAccessForm } from "@/components/ui/early-access-form";

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
      </motion.div>
    </section>
  );
}
