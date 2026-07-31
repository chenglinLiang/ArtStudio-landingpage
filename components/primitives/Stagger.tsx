"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "./Reveal";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** Delay before the first child reveals. */
  delay?: number;
  /** Stagger gap between children, in seconds. */
  gap?: number;
};

/**
 * Stagger — a container that reveals its <StaggerItem> children in sequence
 * as it scrolls into view. Use for sequential word/line typography reveals.
 */
export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.08,
}: ContainerProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: gap, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
};

/** StaggerItem — one unit of a <Stagger>. Rendered inline-block so it flows in text. */
export function StaggerItem({ children, className, y = 16 }: ItemProps) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: EASE },
        },
      }}
    >
      {children}
    </motion.span>
  );
}
