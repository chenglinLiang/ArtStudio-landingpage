import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** CSS aspect-ratio value, e.g. "3 / 4". Omit to let a parent size it. */
  ratio?: string;
  /** Short label describing the real asset this stands in for. */
  label: string;
  className?: string;
  /** Inner content that fills the placeholder (the eventual asset swap target). */
  children?: ReactNode;
  /** Show the hairline border. Disable when nested inside a frame. */
  bordered?: boolean;
};

/**
 * Shared visual shell for every placeholder: canvas fill, soft sheen,
 * editorial crop marks, and a centered "Placeholder" tag.
 *
 * SWAP GUIDE — to replace with a real asset, delete the placeholder and drop
 * in a next/image, keeping the same aspect ratio + container sizing:
 *
 *   <Image src="/artworks/..." alt="..." fill className="object-cover" />
 *
 * All placeholders are decorative → aria-hidden.
 */
export function PlaceholderChrome({
  ratio,
  label,
  className,
  children,
  bordered = true,
}: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-canvas",
        bordered && "border border-line",
        className,
      )}
      style={ratio ? { aspectRatio: ratio } : undefined}
      aria-hidden="true"
    >
      {/* soft sheen so it doesn't read as a flat box */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_28%_18%,rgba(255,255,255,0.55),transparent_60%)]" />
      <CropMarks />

      {children ? (
        <div className="absolute inset-0">{children}</div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-5 text-center">
          <span className="font-sans text-[0.7rem] uppercase tracking-[0.22em] text-ink-muted">
            {label}
          </span>
          <span className="rounded-full border border-line bg-paper/60 px-2.5 py-0.5 font-sans text-[0.58rem] uppercase tracking-[0.18em] text-ink-muted/70">
            Placeholder
          </span>
        </div>
      )}
    </div>
  );
}

function CropMarks() {
  const base = "absolute h-3 w-3 border-ink-muted/40";
  return (
    <>
      <span className={cn(base, "left-2 top-2 border-l border-t")} />
      <span className={cn(base, "right-2 top-2 border-r border-t")} />
      <span className={cn(base, "bottom-2 left-2 border-b border-l")} />
      <span className={cn(base, "bottom-2 right-2 border-b border-r")} />
    </>
  );
}
