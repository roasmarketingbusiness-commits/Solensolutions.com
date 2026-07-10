"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Solutions", href: "#solutions" },
  { label: "Our Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useEffect(() => {
    const timeout = setTimeout(() => setRevealed(true), 2900);
    return () => clearTimeout(timeout);
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    const delta = y - lastY.current;
    if (y < 80) setHidden(false);
    else if (delta > 6) setHidden(true);
    else if (delta < -6) setHidden(false);
    lastY.current = y;
  });

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={revealed ? { y: hidden ? "-110%" : 0, opacity: 1 } : { y: -40, opacity: 0 }}
      transition={{ duration: revealed ? 0.45 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
        scrolled
          ? "bg-paper/70 backdrop-blur-xl border-b border-hairline"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center group" aria-label="Solen Solutions — home">
          <span className="block group-hover:opacity-90 transition-opacity">
            <Logo size="md" />
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-mute hover:text-ink transition-colors link-underline"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="group inline-flex items-center gap-2 border border-hairline-strong px-4 py-2 md:px-5 md:py-2.5 hover:bg-ink hover:text-paper transition-colors"
        >
          <span className="font-mono text-[10px] md:text-[11px] tracking-[0.22em] uppercase">
            Free Audit
          </span>
          <span className="font-mono text-[12px] transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </div>
    </motion.header>
  );
}
