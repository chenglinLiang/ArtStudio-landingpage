import Image from "next/image";
import { Reveal } from "./primitives/Reveal";

export function GallerySection() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="py-28">
      <header className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="font-sans text-[0.69rem] font-semibold uppercase tracking-[0.16em] text-gold">
            Personal gallery
          </p>
          <h2
            id="gallery-title"
            className="mt-5 max-w-2xl font-serif text-[clamp(3.4rem,5.5vw,5.75rem)] leading-[0.94] tracking-[-0.045em] text-ink"
          >
            Your private museum.
          </h2>
          <p className="mt-5 max-w-md font-sans text-base leading-7 text-ink-soft">
            Hang your collection on walls you choose. Every piece carries its
            own label — title, medium, artist, year — the way a gallery would.
          </p>
        </Reveal>
      </header>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-16 max-w-7xl px-6 md:px-10">
          <div className="overflow-hidden border border-line shadow-[0_40px_90px_-40px_rgba(17,17,17,0.45)]">
            <Image
              src="/gallery/museum.webp"
              alt="Artfolio mirrors a physical gallery on your phone"
              width={2304}
              height={1286}
              sizes="(max-width: 1024px) 100vw, 1152px"
              className="h-auto w-full"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
