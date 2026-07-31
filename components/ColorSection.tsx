"use client";

import { colorCopy } from "@/lib/constants";
import { Reveal } from "./primitives/Reveal";
import { BeforeAfterArtworkPlaceholder } from "./placeholders/BeforeAfterArtworkPlaceholder";

export function ColorSection() {
  return (
    <section id="color" aria-labelledby="color-title" className="py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-2">
        <Reveal>
          <p className="font-sans text-[0.69rem] font-semibold uppercase tracking-[0.16em] text-gold">
            {colorCopy.eyebrow}
          </p>
          <h2
            id="color-title"
            className="mt-5 font-serif text-[clamp(3.2rem,5.5vw,5.5rem)] leading-[0.94] tracking-[-0.045em] text-ink"
          >
            {colorCopy.title}
          </h2>
          <div className="mt-7 max-w-md space-y-5">
            {colorCopy.body.map((p, i) => (
              <p key={i} className="font-sans text-base leading-7 text-ink-soft">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto max-w-sm">
            <BeforeAfterArtworkPlaceholder />
            <p className="mt-4 text-center font-sans text-xs uppercase tracking-[0.18em] text-ink-muted">
              Drag to compare
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
