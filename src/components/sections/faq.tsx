"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const items = [
  {
    q: "What is reel:lab?",
    a: "reel:lab is AI-powered brand infrastructure for music. We build and run artist brands, curator brands, UGC accounts, and influencer accounts — generating content, growing audiences, and driving real engagement across TikTok, YouTube, YouTube Shorts, Facebook, and Instagram Reels. You bring the music. We build everything else.",
  },
  {
    q: "Who is this for?",
    a: "Producers who make the music but don't want to be the face. Labels who want to build curator channels that actually grow. Managers who see branded content accounts as the next revenue stream. Artists who'd rather put their time into music and not socials — this makes that possible. If you've ever thought about building an engaging music brand but didn't have the infrastructure to run it, that's exactly what this is for.",
  },
  {
    q: "How does the AI content work?",
    a: "Every piece of content starts from the music — not a template. The system analyses tracks for emotional signals, maps mood to visual language, and generates on-screen text, captions, and video edits that feel native to each platform. Multiple variants are generated and tested — the best performers are scaled organically, with optional paid amplification across platforms if you want to accelerate.",
  },
  {
    q: "What platforms do you post to?",
    a: "TikTok, YouTube, YouTube Shorts, Facebook and Instagram Reels are all possible.",
  },
  {
    q: "Can I customise the character?",
    a: "Yes. Pick from our existing roster or brief a completely custom character. Every character comes with a visual identity, backstory, and content style tailored to your genre and audience.",
  },
  {
    q: "What does it cost?",
    a: "We tailor every engagement to the scope of work — genre, number of accounts, content volume, and goals. Register your interest and we'll be in touch before launch to walk you through options.",
  },
  {
    q: "What happens after I register my interest?",
    a: "We'll review your details and be in touch before launch to discuss what reel:lab can build for you — genre, character, content strategy, everything.",
  },
  {
    q: "Is the content obviously AI-generated?",
    a: "The characters are AI-generated — and we're transparent about that. But the content itself is built to feel crafted, not churned out. Every piece starts from the music — lyric analysis, emotional mapping, mood-driven visuals — not generic templates. The difference between AI slop and what we do is the same difference between a stock photo and a Pixar frame. Both are made with software. One has a soul.",
  },
  {
    q: "How is this different from hiring a social media manager?",
    a: "A social media manager handles one account manually. reel:lab runs multiple accounts simultaneously, generates content from emotional and lyrical analysis, automates warm-up and engagement, conducts daily trending research in your genre, and tracks performance across all accounts in real time. The system scales. A person doesn't.",
  },
  {
    q: "Do you create deepfakes or realistic human models?",
    a: "No — and we never will. We don't think it's right to trick people. Every reel:lab character is a clearly fictional, designed identity — closer to a Gorillaz member than a fake influencer. No real faces, no voice clones, no deception. If it looks like a person, it's not us.",
  },
  {
    q: "How do you see what you're building?",
    a: "We see this as a new form of entertainment — not a shortcut. AI characters are the next stage of CGI, animation, and creative storytelling. Think of it more like creating a TV character than gaming an algorithm. The brands we build have personality, narrative, and a genuine audience relationship. This is about freeing artists and labels to create, not replacing anyone.",
  },
  {
    q: "What about the environmental impact of AI?",
    a: "We take it seriously. Reel:lab contributes 1% of all revenue to carbon removal through Stripe Climate — funding direct air capture, biochar, and enhanced weathering projects. At our current scale that's estimated to remove 10 to 40x our actual AI operational footprint. As we grow and compute usage scales, we'll revisit and increase that commitment. It's auditable, automatic, and built into the business from day one — not bolted on later.",
  },
  {
    q: "When does reel:lab launch?",
    a: "June 2026. We're registering interest from a limited number of launch partners.",
  },
];

export default function FAQ() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const t = window.setTimeout(() => {
      setOpen(0);
    }, 1000);
    return () => clearTimeout(t);
  }, [reduced]);

  useEffect(() => {
    if (typeof window === "undefined" || reduced) return;
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return;

    const ctx = gsap.context(() => {
      const cards = list.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} id="faq" className="bg-bg-primary py-section">
      <div className="mx-auto max-w-[720px] px-4 md:px-6">
        <p className="text-center font-mono text-xs font-medium uppercase tracking-[0.08em] text-text-muted">
          FAQ
        </p>
        <h2 className="mt-3 text-center text-[1.75rem] font-semibold tracking-tight text-text-primary md:text-[2.5rem]">
          Frequently asked questions
        </h2>

        <div ref={listRef} className="mt-12 space-y-2">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                layout
                className={cn(
                  "relative overflow-hidden rounded-xl bg-white shadow-reel-sm transition-shadow",
                  isOpen && "shadow-reel-md",
                )}
              >
                <span
                  className={cn(
                    "absolute left-0 top-0 w-[3px] bg-accent transition-[height] duration-300 ease-out",
                    isOpen ? "h-full" : "h-0",
                  )}
                  aria-hidden
                />
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-lg font-medium text-text-primary">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="shrink-0 text-text-muted"
                  >
                    <Plus className="size-5" strokeWidth={2} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-base leading-relaxed text-text-secondary">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
