"use client";

import { SplitText } from "@/components/ui/split-text";

const PLASTIC_MAN_VIDEO = "/videos/vid_plastic_man_studio.mp4";

export default function WhatIs() {
  return (
    <section className="relative bg-bg-secondary py-section">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-4 md:grid-cols-[3fr_2fr] md:gap-16 md:px-6">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-text-muted">
            The platform
          </p>
          <SplitText
            as="h2"
            mode="scroll"
            scrollStart="top 80%"
            text="This is not a content tool. This is a brand-building system."
            className="mt-4 text-[1.75rem] font-semibold leading-snug tracking-tight text-text-primary md:text-[2.5rem]"
          />
          <p className="mt-6 text-base leading-relaxed text-text-secondary md:text-lg">
            Most platforms generate content and leave you to figure out the rest. reel:lab builds a
            complete brand infrastructure around your music — visual identity, genre-tuned
            backstory, automated content engine, account warm-up, engagement seeding, viral
            research, and performance tracking. Every brand is built to resonate with a specific
            audience from day one.
          </p>
          <p className="mt-8 text-lg font-semibold text-text-primary">
            You supply the music. We build the world around it.
          </p>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-black shadow-reel-md md:aspect-[3/4]">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label="Studio scene — brand-building system"
          >
            <source src={PLASTIC_MAN_VIDEO} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
