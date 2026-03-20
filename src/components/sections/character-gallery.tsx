"use client";

import Image from "next/image";
import { useMemo } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useTransform,
  useVelocity,
} from "framer-motion";
import { characters } from "@/lib/assets";
import type { CharacterEntry } from "@/lib/assets";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const CARD_W = 280;
const GAP = 16;
const REPEAT = 4;

function loopWidthPx(count: number) {
  if (count <= 0) return 1;
  return count * CARD_W + (count - 1) * GAP;
}

function CharacterCard({ character }: { character: CharacterEntry }) {
  return (
    <div
      className={cn(
        "group relative shrink-0 overflow-hidden rounded-lg",
        "aspect-[3/4] w-[280px] shadow-reel-sm",
        "transition-transform duration-300 ease-out will-change-transform",
        "hover:z-10 hover:scale-[1.05]",
      )}
    >
      <Image
        src={character.image}
        alt={character.name}
        fill
        className="object-cover"
        sizes="280px"
        loading="lazy"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/85"
        aria-hidden
      />
      <p
        className={cn(
          "absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10 text-left font-mono text-sm font-semibold uppercase tracking-wide text-white/90 transition-all duration-300",
          "group-hover:pb-5 group-hover:text-base group-hover:text-white",
        )}
      >
        {character.name.trim() || "—"}
      </p>
    </div>
  );
}

function VelocityRow({
  rowCharacters,
  baseVelocity,
}: {
  rowCharacters: CharacterEntry[];
  baseVelocity: number;
}) {
  const baseT = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const speedBoost = useTransform(scrollVelocity, (v) => {
    const mag = Math.abs(v);
    return 1 + Math.min(mag / 450, 3.2) * 0.55;
  });

  const loopW = useMemo(() => loopWidthPx(rowCharacters.length), [rowCharacters.length]);
  const repeated = useMemo(
    () => Array.from({ length: REPEAT }, () => rowCharacters).flat(),
    [rowCharacters],
  );

  const direction = baseVelocity < 0 ? -1 : 1;

  const x = useTransform(baseT, (t) => {
    const w = loopW || 1;
    const m = ((t % w) + w) % w;
    return direction < 0 ? -m : m;
  });

  useAnimationFrame((_, delta) => {
    if (loopW <= 0) return;
    const dt = delta / 1000;
    const boost = speedBoost.get();
    const speed = Math.abs(baseVelocity) * 28 * boost;
    let next = baseT.get() + speed * dt;
    if (next > 1e7) next = ((next % loopW) + loopW) % loopW;
    baseT.set(next);
  });

  if (rowCharacters.length === 0) return null;

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max gap-4 will-change-transform"
        style={{ x }}
      >
        {repeated.map((char, i) => (
          <CharacterCard key={`${char.name}-${char.image}-${i}`} character={char} />
        ))}
      </motion.div>
    </div>
  );
}

function StaticCharacterGrid({ list }: { list: CharacterEntry[] }) {
  return (
    <div className="mx-auto mt-12 grid max-w-[1200px] grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-4 md:px-6 lg:grid-cols-5">
      {list.map((character, i) => (
        <CharacterCard key={`${character.name}-${i}`} character={character} />
      ))}
    </div>
  );
}

export default function CharacterGallery() {
  const reduced = useReducedMotion();

  const { rowA, rowB } = useMemo(() => {
    const mid = Math.ceil(characters.length / 2);
    return {
      rowA: characters.slice(0, mid),
      rowB: characters.slice(mid),
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-bg-secondary py-section">
      <div className="mx-auto max-w-[1200px] px-4 text-center md:px-6">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-text-muted">
          THE ROSTER
        </p>
        <h2 className="mt-3 text-[1.75rem] font-semibold tracking-tight text-text-primary md:text-[2.5rem]">
          Any character. Any genre. Built to perform.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-lg text-gray-500">
          Choose from our library or brief something completely new. Every character is designed to
          drive engagement, not just look good.
        </p>
      </div>

      {reduced ? (
        <StaticCharacterGrid list={characters} />
      ) : (
        <div className="mt-12 flex flex-col gap-6">
          <VelocityRow rowCharacters={rowA} baseVelocity={-2} />
          <VelocityRow rowCharacters={rowB} baseVelocity={2} />
        </div>
      )}
    </section>
  );
}
