import { cn } from "@/lib/utils";
import { PlaceholderChrome } from "./PlaceholderChrome";

type Props = {
  className?: string;
  /** CSS aspect-ratio. Default "3 / 4" — a portrait painting. */
  ratio?: string;
  label?: string;
  bordered?: boolean;
};

/**
 * ArtworkPlaceholder — stands in for a photograph of a real painting.
 *
 * TODO (asset swap):
 *   Replace with a next/image of the actual artwork, portrait orientation.
 *   Recommended: ~2400×3200px (3:4), sRGB JPEG/WebP.
 *
 *     <Image src="/artworks/moonlight.jpg" alt="Moonlight — Lin Zhang" fill className="object-cover" />
 */
export function ArtworkPlaceholder({
  className,
  ratio = "3 / 4",
  label = "Artwork",
  bordered = true,
}: Props) {
  return (
    <PlaceholderChrome
      label={label}
      ratio={ratio}
      bordered={bordered}
      className={cn(className)}
    />
  );
}
