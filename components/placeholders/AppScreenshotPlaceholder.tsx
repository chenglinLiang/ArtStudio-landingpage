import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Render custom "screen" content (e.g. a framed artwork on a wall). */
  children?: ReactNode;
  label?: string;
};

/**
 * AppScreenshotPlaceholder — an iPhone-style device frame.
 * Pass children to compose a custom screen; otherwise a label is shown.
 *
 * TODO (asset swap):
 *   Replace the screen content with a real screenshot or next/image.
 *   Recommended: 1290×2796px (iPhone screenshot), PNG.
 *   Drop the image inside the .screen area below (replacing {children}).
 */
export function AppScreenshotPlaceholder({
  className,
  children,
  label = "App screenshot",
}: Props) {
  return (
    <div className={cn("relative", className)} aria-hidden="true">
      <div className="relative rounded-[2.6rem] bg-ink p-2.5 shadow-[0_40px_80px_-24px_rgba(17,17,17,0.4)] ring-1 ring-black/10">
        {/* screen */}
        <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.1rem] bg-canvas">
          {children ? (
            <div className="absolute inset-0">{children}</div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-5 text-center">
              <span className="font-sans text-[0.65rem] uppercase tracking-[0.22em] text-ink-muted">
                {label}
              </span>
              <span className="rounded-full border border-line bg-paper/60 px-2 py-0.5 font-sans text-[0.55rem] uppercase tracking-[0.18em] text-ink-muted/70">
                Placeholder
              </span>
            </div>
          )}
          {/* dynamic island */}
          <div className="absolute left-1/2 top-2.5 h-5 w-20 -translate-x-1/2 rounded-full bg-ink/95" />
        </div>
      </div>
    </div>
  );
}
