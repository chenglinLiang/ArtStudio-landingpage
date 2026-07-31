"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn, clamp } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * BeforeAfterArtworkPlaceholder — a draggable before/after comparison of real
 * restoration samples. Drag the handle, click anywhere, or use ←/→
 * (Shift = bigger step) when focused.
 */
export function BeforeAfterArtworkPlaceholder({
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(50); // mirrored to state for a11y attributes

  const mv = useMotionValue(50);
  const spring = useSpring(mv, { stiffness: 160, damping: 30, mass: 0.4 });
  const clip = useTransform(spring, (v) => `inset(0 ${100 - v}% 0 0)`);
  const handleLeft = useTransform(spring, (v) => `${v}%`);

  const set = useCallback(
    (next: number) => {
      const v = clamp(next, 0, 100);
      mv.set(v);
      setPos(v);
    },
    [mv],
  );

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      set(((clientX - rect.left) / rect.width) * 100);
    },
    [set],
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const stop = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      set(pos - (e.shiftKey ? 10 : 2));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      set(pos + (e.shiftKey ? 10 : 2));
    } else if (e.key === "Home") {
      e.preventDefault();
      set(0);
    } else if (e.key === "End") {
      e.preventDefault();
      set(100);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative w-full touch-none select-none [-webkit-touch-callout:none] overflow-hidden border border-line bg-canvas",
        className,
      )}
      style={{ aspectRatio: "1086 / 1448" }}
      role="slider"
      tabIndex={0}
      aria-label="Before and after color restoration comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      aria-valuetext={`${Math.round(pos)} percent restored`}
      onKeyDown={onKeyDown}
    >
      {/* AFTER (base layer, full warmth) */}
      <Half variant="after" />

      {/* BEFORE (clipped to the left portion) */}
      <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
        <Half variant="before" />
      </motion.div>

      {/* captions */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/55 px-2.5 py-1 font-sans text-[0.6rem] uppercase tracking-[0.18em] text-paper backdrop-blur-sm">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-ink/55 px-2.5 py-1 font-sans text-[0.6rem] uppercase tracking-[0.18em] text-paper backdrop-blur-sm">
        After
      </span>

      {/* divider + handle */}
      <motion.div
        className="pointer-events-none absolute bottom-0 top-0 w-px bg-ink/45"
        style={{ left: handleLeft }}
      >
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stop}
          onPointerCancel={stop}
          className="pointer-events-auto absolute left-1/2 top-1/2 flex h-9 w-9 touch-none cursor-ew-resize -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper/90 text-ink shadow-[0_2px_10px_rgba(17,17,17,0.18)] backdrop-blur-sm transition-transform duration-200 group-hover:scale-105"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 7-5 5 5 5" />
            <path d="m15 7 5 5-5 5" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

/** One half of the comparison — a real restoration sample. */
function Half({ variant }: { variant: "before" | "after" }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={variant === "before" ? "/color/before.jpg" : "/color/after.jpg"}
        alt={
          variant === "before"
            ? "Artwork before color restoration"
            : "Artwork after color restoration"
        }
        fill
        sizes="(max-width: 1024px) 90vw, 480px"
        draggable={false}
        className="pointer-events-none select-none object-cover [-webkit-user-drag:none]"
      />
    </div>
  );
}
