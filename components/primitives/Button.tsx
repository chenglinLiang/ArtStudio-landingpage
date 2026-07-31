"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  "aria-label"?: string;
};

type AnchorProps = CommonProps & {
  href: string;
};

type ButtonElProps = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

type Props = AnchorProps | ButtonElProps;

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans text-sm tracking-wide transition-colors duration-300 focus-visible:outline-none";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink-soft px-6 py-3",
  secondary:
    "border border-ink/20 text-ink hover:border-ink/45 px-6 py-3 bg-transparent",
};

/**
 * Button — renders an <a> when `href` is set, otherwise a <button>.
 * Subtle hover/tap scale, disabled under prefers-reduced-motion.
 */
export function Button(props: Props) {
  const reduce = useReducedMotion();
  const hover = reduce ? undefined : { scale: 1.02 };
  const tap = reduce ? undefined : { scale: 0.98 };
  const motionProps = {
    whileHover: hover,
    whileTap: tap,
    transition: { duration: 0.2, ease: "easeOut" as const },
  };
  const cls = cn(BASE, VARIANTS[props.variant ?? "primary"], props.className);

  if (props.href !== undefined) {
    return (
      <motion.a
        href={props.href}
        className={cls}
        aria-label={props["aria-label"]}
        {...motionProps}
      >
        {props.children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      aria-label={props["aria-label"]}
      className={cn(cls, props.disabled && "cursor-not-allowed opacity-60")}
      {...motionProps}
    >
      {props.children}
    </motion.button>
  );
}
