import { audiences } from "@/lib/constants";
import { Reveal } from "./primitives/Reveal";

export function AudienceSection() {
  return (
    <section id="audience" aria-labelledby="audience-title" className="py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="font-sans text-[0.69rem] font-semibold uppercase tracking-[0.16em] text-gold">
            Who it&apos;s for
          </p>
          <h2
            id="audience-title"
            className="mt-5 max-w-2xl font-serif text-[clamp(3rem,5vw,5.2rem)] leading-[0.94] tracking-[-0.045em] text-ink"
          >
            Made for people who make things.
          </h2>
        </Reveal>

        <div className="mt-16 border-y border-line">
          {audiences.map((audience, i) => (
            <Reveal key={audience.title} delay={i * 0.08}>
              <div className="flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:gap-12">
                <h3 className="w-full shrink-0 font-serif text-3xl tracking-[-0.045em] text-ink sm:w-64">
                  {audience.title}
                </h3>
                <p className="font-sans text-base leading-7 text-ink-muted sm:max-w-md">
                  {audience.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
