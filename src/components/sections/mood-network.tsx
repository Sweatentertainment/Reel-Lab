"use client";

import { useMemo } from "react";
import { motion, useReducedMotion as useFramerReduced } from "framer-motion";
import { getMoodNetworkMosaicCharacters, type CharacterEntry } from "@/lib/assets";
import { ManagedCharacterMedia } from "@/components/managed-character-media";
import { cn } from "@/lib/utils";

const TILE = 160;
const MOSAIC_COUNT = 9;

function shuffleDeterministic<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed >>> 0;
  const rnd = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildMosaic(pool: CharacterEntry[]): CharacterEntry[] {
  if (pool.length === 0) return [];
  const shuffled = shuffleDeterministic(pool, 0x5a17f1ab);
  if (shuffled.length >= MOSAIC_COUNT) {
    return shuffled.slice(0, MOSAIC_COUNT);
  }
  const out: CharacterEntry[] = [];
  for (let k = 0; k < MOSAIC_COUNT; k++) {
    out.push(shuffled[k % shuffled.length]);
  }
  return out;
}

export default function MoodNetwork() {
  const reduce = useFramerReduced();
  const mosaic = useMemo(() => {
    const pool = getMoodNetworkMosaicCharacters();
    return buildMosaic(pool);
  }, []);

  return (
    <section className="bg-bg-primary py-section">
      <div className="mx-auto grid max-w-[1200px] items-start gap-12 px-4 md:grid-cols-[11fr_9fr] md:gap-16 md:px-6">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-text-muted">
            Amplification
          </p>
          <h2 className="mt-3 text-[1.75rem] font-semibold leading-snug tracking-tight text-text-primary md:text-[2.5rem]">
            Scale any release with the Mood Network.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-secondary md:text-lg">
            Our ecosystem of mood content accounts and influencer placements, built specifically for
            music. Seed tracks into the right communities, drive volume behind any release, and
            amplify momentum across platforms. Available standalone or layered on top of any
            reel:lab brand.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {mosaic.map((item, i) => (
            <motion.div
              key={`${item.name}-${item.image}-${i}`}
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: reduce ? 0 : i * 0.08, duration: 0.45 }}
              className="group"
            >
              <div
                className={cn(
                  "relative aspect-square w-full overflow-hidden rounded-xl shadow-reel-sm transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-reel-md",
                  !reduce && "animate-mood-float",
                )}
                style={
                  reduce
                    ? undefined
                    : {
                        animationDuration: `${2.5 + (i % 4) * 0.35}s`,
                      }
                }
              >
                <ManagedCharacterMedia
                  id={`mood-${i}-${item.name}`}
                  character={item}
                  width={TILE}
                  height={TILE}
                  fillParent
                  className="rounded-xl"
                  loading="lazy"
                  allowVideo
                  kenBurns={!item.video}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
