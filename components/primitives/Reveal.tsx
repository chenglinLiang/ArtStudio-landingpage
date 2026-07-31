"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared ease — a gentle, slightly slow "expose" curve (cubic-bezier tuple). */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Props = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the reveal begins. */
  delay?: number;
  /** Vertical travel distance in px (disabled when reduced motion is on). */
  y?: number;
  /** Reveal duration in seconds. */
  duration?: number;
};

/**
 * Reveal — the shared scroll-into-view animation used across the page.
 * Fade + upward drift, runs once. Honors prefers-reduced-motion (fade only).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  duration = 0.8,
}: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
