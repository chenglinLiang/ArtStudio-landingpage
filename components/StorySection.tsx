"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { stages, type Stage } from "@/lib/constants";
import { Reveal } from "./primitives/Reveal";

// Intrinsic dimensions of the screenshot composites (phone frame included).
const SHOT_W = 1033;
const SHOT_H = 2073;

export function StorySection() {
  return (
    <section id="story" aria-labelledby="story-title" className="relative">
      <header className="mx-auto max-w-7xl px-6 pt-28 md:px-10">
        <Reveal>
          <p className="font-sans text-[0.69rem] font-semibold uppercase tracking-[0.16em] text-gold">
            The journey
          </p>
          <h2
            id="story-title"
            className="mt-5 max-w-2xl font-serif text-[clamp(3rem,5.5vw,5.75rem)] leading-[0.94] tracking-[-0.045em] text-ink"
          >
            From canvas to digital gallery.
          </h2>
        </Reveal>
      </header>

      {/* Desktop: scroll-driven horizontal storytelling */}
      <div className="hidden lg:block">
        <HorizontalTrack />
      </div>

      {/* Mobile / tablet: vertical stack */}
      <div className="px-6 py-24 lg:hidden">
        <VerticalStack />
      </div>
    </section>
  );
}

/** Five full-screen panels translated horizontally by vertical scroll. */
function HorizontalTrack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.4,
  });
  // 5 panels × 100vw → translate the 500vw track by -80% to reveal the last.
  const x = useTransform(smooth, [0, 1], ["1%", "-80%"]);

  return (
    <div ref={ref} className="relative h-[500vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
          {stages.map((stage) => (
            <article
              key={stage.index}
              className="flex h-screen w-screen shrink-0 items-center justify-center"
            >
              <StagePanel stage={stage} />
            </article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function StagePanel({ stage }: { stage: Stage }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl items-center gap-16 px-10">
      <Reveal className="w-80 shrink-0">
        <Image
          src={stage.image}
          alt={stage.caption}
          width={SHOT_W}
          height={SHOT_H}
          className="h-auto w-80"
        />
      </Reveal>
      <Reveal delay={0.1} className="max-w-md">
        <span
          aria-hidden="true"
          className="block font-serif text-7xl leading-none text-gold/35"
        >
          {stage.index}
        </span>
        <h3 className="mt-5 font-serif text-3xl tracking-[-0.045em] text-ink">
          {stage.title}
        </h3>
        <p className="mt-3 font-sans text-lg text-ink-muted">
          {stage.description}
        </p>
      </Reveal>
    </div>
  );
}

function VerticalStack() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-24">
      {stages.map((stage) => (
        <div key={stage.index} className="text-center">
          <Reveal className="mx-auto w-72">
            <Image
              src={stage.image}
              alt={stage.caption}
              width={SHOT_W}
              height={SHOT_H}
              className="h-auto w-72"
            />
          </Reveal>
          <Reveal delay={0.05}>
            <span
              aria-hidden="true"
              className="mt-8 block font-serif text-6xl leading-none text-gold/35"
            >
              {stage.index}
            </span>
            <h3 className="mt-4 font-serif text-3xl tracking-[-0.045em] text-ink">
              {stage.title}
            </h3>
            <p className="mt-2 font-sans text-base text-ink-muted">
              {stage.description}
            </p>
          </Reveal>
        </div>
      ))}
    </div>
  );
}
