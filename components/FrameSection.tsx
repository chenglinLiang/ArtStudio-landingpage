"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { frames } from "@/lib/constants";
import { Reveal } from "./primitives/Reveal";

export function FrameSection() {
  const reduce = useReducedMotion();

  return (
    <section id="frames" aria-labelledby="frames-title" className="py-28">
      <header className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="font-sans text-[0.69rem] font-semibold uppercase tracking-[0.16em] text-gold">
            Frame collection
          </p>
          <h2
            id="frames-title"
            className="mt-5 max-w-2xl font-serif text-[clamp(3rem,5.5vw,5.5rem)] leading-[0.94] tracking-[-0.045em] text-ink"
          >
            Every artwork deserves the right frame.
          </h2>
          <p className="mt-5 max-w-md font-sans text-base leading-7 text-ink-soft">
            Museum-quality moulding, wrapped around your work in seconds. Four
            finishes to match the mood of every piece.
          </p>
        </Reveal>
      </header>

      <Reveal>
        <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-8 md:px-10">
          {frames.map((frame) => (
            <motion.article
              key={frame.name}
              whileHover={reduce ? undefined : { y: -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[22vw]"
            >
              <div className="relative aspect-[3/4] overflow-hidden shadow-[0_24px_50px_-26px_rgba(17,17,17,0.45)] transition-shadow duration-300 group-hover:shadow-[0_34px_60px_-22px_rgba(17,17,17,0.5)]">
                <Image
                  src={frame.image}
                  alt={frame.name}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 44vw, 22vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-6">
                <h3 className="font-serif text-2xl tracking-tight text-ink">
                  {frame.name}
                </h3>
                <p className="mt-1 font-sans text-sm text-ink-muted">
                  {frame.description}
                </p>
                <p className="mt-2 font-sans text-[0.62rem] uppercase tracking-[0.14em] text-ink-muted/60">
                  {frame.realId}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
