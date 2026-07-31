import { cn } from "@/lib/utils";
import { PlaceholderChrome } from "./PlaceholderChrome";

type Props = {
  frameClass: "frame-oak" | "frame-walnut" | "frame-gold" | "frame-black";
  className?: string;
  ratio?: string;
  label?: string;
};

/**
 * FramePlaceholder — a CSS-drawn frame moulding around an artwork placeholder.
 * The `.frame-*` classes live in app/globals.css and are stand-ins only.
 *
 * TODO (asset swap):
 *   The real frames ship as sliced PNGs in the app at
 *   Resources/FrameAssets.bundle/Frames/<id>-3000x4000/ (8 pieces + manifest).
 *   For a pixel-accurate look, composite the real frame around a real artwork.
 */
export function FramePlaceholder({
  frameClass,
  className,
  ratio = "3 / 4",
  label = "Framed artwork",
}: Props) {
  return (
    <div className={cn(frameClass, className)} aria-hidden="true">
      <PlaceholderChrome label={label} ratio={ratio} bordered={false} />
    </div>
  );
}
