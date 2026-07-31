"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { hero } from "@/lib/constants";
import { EASE } from "./primitives/Reveal";
import { Button } from "./primitives/Button";

export function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
  };
  const item = reduce
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.6 } },
      }
    : {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
      };
  const headlineContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };
  const word = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } }
    : {
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
      };

  const headlineWords = hero.title.replace(/\.$/, "").split(" ");

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden"
    >
      {/* ambient backdrop — fades in first */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_25%,rgba(176,141,87,0.10),transparent_60%)]"
      />

      <div className="mx-auto grid min-h-[88vh] max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 md:px-10 lg:grid-cols-2 lg:gap-10">
        {/* ---- typography ---- */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-2 lg:order-1"
        >
          <motion.p
            variants={item}
            className="font-sans text-[0.69rem] font-semibold uppercase tracking-[0.16em] text-gold"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={headlineContainer}
            className="mt-6 font-serif text-[clamp(3.6rem,7.5vw,7.4rem)] leading-[0.9] tracking-[-0.045em] text-ink"
          >
            {headlineWords.map((w, i) => (
              <motion.span
                key={`${w}-${i}`}
                variants={word}
                className="mr-[0.18em] inline-block"
              >
                {w}
              </motion.span>
            ))}
            <motion.span variants={word} className="inline-block text-gold">
              .
            </motion.span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-md font-sans text-base leading-7 text-ink-soft"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </motion.div>
        </motion.div>

        {/* ---- composition ---- */}
        <div className="relative order-1 lg:order-2">
          {/* phone screenshot, slides upward into place */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.6,
              ease: reduce ? undefined : EASE,
            }}
            className="relative mx-auto w-72 lg:w-80"
          >
            <Image
              src="/hero/phone-gallery.webp"
              alt="ArtStudio gallery view on iPhone"
              width={1000}
              height={2007}
              priority
              className="h-auto w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
