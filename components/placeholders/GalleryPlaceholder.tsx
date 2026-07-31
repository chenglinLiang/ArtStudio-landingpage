import { cn } from "@/lib/utils";
import { FramePlaceholder } from "./FramePlaceholder";

type Props = {
  className?: string;
  /** Museum-label copy (mirrors the app's ArtworkLabelMetadata fields). */
  title?: string;
  medium?: string;
  creator?: string;
  year?: string;
  ratio?: string;
};

/**
 * GalleryPlaceholder — a rendered gallery-wall environment with framed
 * artworks and a museum placard. (= brief's <GalleryWallPlaceholder />)
 *
 * TODO (asset swap):
 *   Replace with a real photograph or render of the app's "Exhibition" view
 *   (framed artwork composited onto a chosen wall). Keep the placard text or
 *   let the real render supply it. Recommended: 1920×1080 (16:9), PNG/WebP.
 */
export function GalleryPlaceholder({
  className,
  title = "Moonlight",
  medium = "Oil on Canvas",
  creator = "Lin Zhang",
  year = "2026",
  ratio = "16 / 9",
}: Props) {
  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: ratio }}
      aria-hidden="true"
    >
      {/* wall */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f3eee4] via-[#ece5d7] to-[#e2d8c6]" />
      {/* soft key light from upper left */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_24%_8%,rgba(255,255,255,0.65),transparent_55%)]" />
      {/* floor */}
      <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-[#d6cab3] to-transparent" />

      {/* artworks */}
      <div className="absolute inset-0 flex items-center justify-center gap-[5%] px-[9%]">
        {/* main work + placard */}
        <div className="flex flex-col items-center">
          <FramePlaceholder
            frameClass="frame-gold"
            className="w-[36%] min-w-[120px]"
          />
          <Placard
            title={title}
            medium={medium}
            creator={creator}
            year={year}
          />
        </div>

        {/* secondary work, slightly offset for depth */}
        <FramePlaceholder
          frameClass="frame-walnut"
          className="mt-[-7%] w-[24%] min-w-[90px]"
        />
      </div>
    </div>
  );
}

function Placard({
  title,
  medium,
  creator,
  year,
}: {
  title: string;
  medium: string;
  creator: string;
  year: string;
}) {
  return (
    <div className="mt-4 text-center">
      <div className="flex items-baseline justify-center gap-3">
        <span className="font-serif text-base leading-none text-ink">
          {title}
        </span>
        <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted">
          {year}
        </span>
      </div>
      <div className="mt-1 font-sans text-xs text-ink-soft">{creator}</div>
      <div className="font-sans text-xs text-ink-muted">{medium}</div>
    </div>
  );
}
