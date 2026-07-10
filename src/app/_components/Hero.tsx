"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Logo } from "./Logo";
import { TypewriterEffect, type TypewriterWord } from "./TypewriterEffect";

const LINE_ONE: TypewriterWord[] = [
  { text: "Built" },
  { text: "for" },
  { text: "businesses" },
  { text: "that" },
  { text: "are" },
  { text: "ready" },
  { text: "to" },
  { text: "scale" },
  { text: "properly," },
];

const LINE_TWO: TypewriterWord[] = [
  { text: "not" },
  { text: "guess" },
  { text: "their" },
  { text: "way" },
  { text: "through" },
  { text: "growth." },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const wordmarkOpacity = useTransform(scrollY, (y) => {
    const sectionHeight =
      sectionRef.current?.offsetHeight ??
      (typeof window === "undefined" ? 1 : window.innerHeight);
    return Math.max(0, 1 - y / (0.5 * sectionHeight));
  });

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
    >
      {/* Starfield layers */}
      <div className="absolute inset-0 starfield opacity-60 pointer-events-none" />
      <div className="absolute inset-0 starfield-near opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-paper/40 to-paper pointer-events-none" />

      {/* Giant background wordmark, fades out on scroll */}
      <motion.div
        style={{ opacity: wordmarkOpacity }}
        className="absolute inset-0 pointer-events-none select-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span
            className="font-display font-semibold wordmark-outline leading-none"
            style={{ fontSize: "clamp(96px, 29vw, 520px)", letterSpacing: "-0.04em" }}
          >
            SOLEN
          </span>
        </motion.div>
      </motion.div>

      {/* Intro: centered 3D logo revealed by a clip-path wipe, then lifted away */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.7, delay: 2, ease: [0.4, 0, 0.6, 1] }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 px-6"
      >
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
          className="relative"
        >
          <Logo size="xl" trace={false} />
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 1.7 }}
            className="absolute top-0 right-[-4px] h-full w-[3px] bg-rust"
            style={{ boxShadow: "0 0 20px var(--rust-glow)" }}
          />
        </motion.div>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 md:px-10 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.5 }}
          className="inline-flex items-center gap-3 mb-8 md:mb-10"
        >
          <span className="w-8 h-px bg-rust" />
          <span className="font-mono text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-rust">
            Solen Solutions
          </span>
          <span className="w-8 h-px bg-rust" />
        </motion.div>

        <h1
          aria-label="Built for businesses that are ready to scale properly, not guess their way through growth."
          className="font-display font-semibold leading-[1.05] tracking-[-0.02em] text-center mx-auto"
          style={{ fontSize: "clamp(40px, 6.4vw, 96px)", color: "#ffffff" }}
        >
          <TypewriterEffect words={LINE_ONE} delay={2.7} perChar={0.05} showCursor={false} />
          <TypewriterEffect words={LINE_TWO} delay={5.5} perChar={0.05} showCursor={false} />
        </h1>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 5.9 }}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="#solutions"
            className="group inline-flex items-center gap-3 bg-ink text-paper px-7 py-4 hover:bg-rust hover:shadow-[0_0_32px_-4px_var(--rust-glow)] transition-all duration-300"
          >
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase">Explore</span>
            <span className="font-mono text-[14px] transition-transform group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 border border-hairline-strong px-7 py-4 hover:border-rust hover:text-rust transition-colors"
          >
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase">
              Get a free audit
            </span>
            <span className="font-mono text-[14px] transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
