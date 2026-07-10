"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-7 w-7",
} as const;

interface Industry {
  num: string;
  name: string;
  note: string;
  tag: string;
  intensity: "high" | "medium" | "low";
  icon: ReactNode;
}

const INDUSTRIES: Industry[] = [
  {
    num: "01",
    name: "Trades",
    note: "Roofing · HVAC · plumbing · electrical · general contractors",
    tag: "High ticket",
    intensity: "high",
    icon: (
      <svg {...iconProps}>
        <path d="M3 12 12 4l9 8" />
        <path d="M5 11v9h14v-9" />
        <path d="M10 20v-5h4v5" />
      </svg>
    ),
  },
  {
    num: "02",
    name: "Med Spas & Aesthetics",
    note: "Botox · injectables · laser · membership programs",
    tag: "High LTV",
    intensity: "high",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3v18" />
        <path d="M3 12h18" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    num: "03",
    name: "Dental & Orthodontics",
    note: "GP · pediatric · cosmetic · DSO-adjacent practices",
    tag: "Recurring",
    intensity: "medium",
    icon: (
      <svg {...iconProps}>
        <path d="M8 3c-2 0-4 1.5-4 4 0 2 .5 3 1 5s.5 9 2 9 2-4 3-7 1-2 2-2 1-1 2 2 1 7 3 7 1.5-7 2-9 1-3 1-5c0-2.5-2-4-4-4-1.5 0-2.5.7-4 1-1.5-.3-2.5-1-4-1Z" />
      </svg>
    ),
  },
  {
    num: "04",
    name: "Legal",
    note: "PI · family · immigration · estate · small firms",
    tag: "Intent driven",
    intensity: "high",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3v18" />
        <path d="M5 7h14" />
        <path d="M5 7l-2 6h6L7 7" />
        <path d="M19 7l-2 6h6l-2-6" />
        <path d="M8 21h8" />
      </svg>
    ),
  },
  {
    num: "05",
    name: "Fitness & Gyms",
    note: "Boutique studios · personal training · CrossFit affiliates",
    tag: "Membership",
    intensity: "medium",
    icon: (
      <svg {...iconProps}>
        <path d="M6 8v8" />
        <path d="M18 8v8" />
        <path d="M3 10v4" />
        <path d="M21 10v4" />
        <path d="M6 12h12" />
      </svg>
    ),
  },
  {
    num: "06",
    name: "Real Estate",
    note: "Solo agents · small teams · property management",
    tag: "Lead gen",
    intensity: "medium",
    icon: (
      <svg {...iconProps}>
        <path d="M3 11l9-7 9 7" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </svg>
    ),
  },
  {
    num: "07",
    name: "Restaurants & Hospitality",
    note: "Independents · multi-location · food trucks",
    tag: "Local SEO",
    intensity: "low",
    icon: (
      <svg {...iconProps}>
        <path d="M5 3v8a3 3 0 006 0V3" />
        <path d="M8 11v10" />
        <path d="M17 3c-2 0-3 2-3 5s1 5 3 5v8" />
      </svg>
    ),
  },
  {
    num: "08",
    name: "Anyone with a phone that should ring more",
    note: "If leads matter, we matter.",
    tag: "Open scope",
    intensity: "high",
    icon: (
      <svg {...iconProps}>
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" />
      </svg>
    ),
  },
];

function DemandBars({ intensity }: { intensity: Industry["intensity"] }) {
  const level = intensity === "high" ? 3 : intensity === "medium" ? 2 : 1;
  return (
    <div className="flex items-end gap-[4px] h-5" aria-label={`${intensity} demand`}>
      {[0, 1, 2].map((bar) => (
        <span
          key={bar}
          className={`w-[4px] rounded-sm ${bar === 0 ? "h-2.5" : bar === 1 ? "h-3.5" : "h-5"} ${bar < level ? "bg-rust" : "bg-hairline-strong"}`}
          style={bar < level ? { boxShadow: "0 0 6px var(--rust-glow)" } : undefined}
        />
      ))}
    </div>
  );
}

function MobileIndustryCard({ ind, index }: { ind: Industry; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55, delay: Math.min(0.05 * index, 0.35) }}
      className="group relative flex-shrink-0 snap-start w-[78vw] sm:w-[340px] rounded-2xl border border-hairline bg-paper-deep p-7 hover:border-hairline-strong hover:bg-paper-rise transition-colors duration-500"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-mute">
            {ind.num}
          </span>
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-rust border border-hairline-strong rounded-md px-2.5 py-1 bg-paper">
            {ind.tag}
          </span>
        </div>
        <DemandBars intensity={ind.intensity} />
      </div>
      <div className="flex items-start gap-5 mb-6">
        <div
          className="shrink-0 grid place-items-center h-14 w-14 rounded-xl border border-hairline-strong bg-paper text-ink-soft group-hover:text-rust transition-colors duration-500"
          style={{ boxShadow: "inset 0 0 24px rgba(255,255,255,0.02)" }}
        >
          {ind.icon}
        </div>
        <h3 className="font-display font-medium text-[20px] leading-[1.2] tracking-[-0.01em] text-ink">
          {ind.name}
        </h3>
      </div>
      <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute leading-[1.7]">
        {ind.note}
      </p>
      <div className="mt-7 pt-5 border-t border-hairline">
        <span className="block w-8 h-px bg-rust group-hover:w-14 transition-all duration-500" />
      </div>
    </motion.article>
  );
}

function DesktopIndustryCard({ ind }: { ind: Industry }) {
  return (
    <article className="group relative flex-shrink-0 w-[340px] md:w-[400px] rounded-2xl border border-hairline bg-paper-deep p-8 md:p-9 hover:border-hairline-strong hover:bg-paper-rise transition-colors duration-500">
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-mute">
            {ind.num}
          </span>
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-rust border border-hairline-strong rounded-md px-2.5 py-1 bg-paper">
            {ind.tag}
          </span>
        </div>
        <DemandBars intensity={ind.intensity} />
      </div>
      <div className="flex items-start gap-5 mb-7">
        <div
          className="shrink-0 grid place-items-center h-14 w-14 rounded-xl border border-hairline-strong bg-paper text-ink-soft group-hover:text-rust transition-colors duration-500"
          style={{ boxShadow: "inset 0 0 24px rgba(255,255,255,0.02)" }}
        >
          {ind.icon}
        </div>
        <h3 className="font-display font-medium text-[22px] md:text-[24px] leading-[1.2] tracking-[-0.01em] text-ink">
          {ind.name}
        </h3>
      </div>
      <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute leading-[1.7]">
        {ind.note}
      </p>
      <div className="mt-8 pt-6 border-t border-hairline">
        <span className="block w-8 h-px bg-rust group-hover:w-14 transition-all duration-500" />
      </div>
    </article>
  );
}

function ScrollPercent({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const [percent, setPercent] = useState(0);
  useEffect(
    () =>
      scrollYProgress.on("change", (value) => {
        setPercent(Math.round(100 * Math.min(1, Math.max(0, value))));
      }),
    [scrollYProgress],
  );
  return <span>{String(percent).padStart(2, "0")}%</span>;
}

function DesktopWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const measure = () => {
      if (!viewportRef.current || !trackRef.current) return;
      const viewportWidth = viewportRef.current.clientWidth;
      setMaxScroll(Math.max(0, trackRef.current.scrollWidth - viewportWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    const timeout = setTimeout(measure, 300);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(timeout);
    };
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);
  const dotLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const counterOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0.4, 1, 1, 0.4],
  );

  useEffect(() => {
    scrollYProgress.set(scrollYProgress.get());
  }, [maxScroll, scrollYProgress]);

  return (
    <section id="work" className="relative">
      <div className="absolute inset-0 starfield opacity-15 pointer-events-none" />
      <div
        ref={sectionRef}
        className="relative"
        style={{ height: `${28 * INDUSTRIES.length + 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center gap-10 lg:gap-14 overflow-hidden py-16 md:py-20">
          <div className="relative w-full mx-auto max-w-[1500px] px-8 md:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-12 lg:gap-20 items-center">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <span className="font-mono text-[12px] tracking-[0.32em] uppercase text-rust">
                      03 — Industries
                    </span>
                    <span className="flex-1 h-px bg-hairline" />
                  </div>
                  <h2
                    className="font-display font-semibold leading-[1] tracking-[-0.02em] text-ink"
                    style={{ fontSize: "clamp(44px, 5.2vw, 80px)" }}
                  >
                    Industries
                    <br />
                    <span className="text-ink-mute">we serve.</span>
                  </h2>
                  <p className="mt-7 max-w-[520px] text-[16px] md:text-[18px] leading-[1.6] text-ink-soft">
                    Built for businesses ready to level up how they grow, operate, and scale.
                  </p>
                </motion.div>
              </div>
              <div className="relative">
                <div
                  ref={viewportRef}
                  className="relative overflow-hidden"
                  style={{
                    maskImage:
                      "linear-gradient(90deg, transparent 0, #000 40px, #000 calc(100% - 40px), transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(90deg, transparent 0, #000 40px, #000 calc(100% - 40px), transparent 100%)",
                  }}
                >
                  <motion.div
                    ref={trackRef}
                    style={{ x }}
                    className="flex flex-nowrap gap-5 will-change-transform py-4"
                  >
                    {INDUSTRIES.map((ind) => (
                      <DesktopIndustryCard key={ind.num} ind={ind} />
                    ))}
                  </motion.div>
                </div>
                <div className="mt-10">
                  <div className="flex items-end justify-between mb-4 font-mono text-[11px] tracking-[0.28em] uppercase text-ink-mute">
                    <span>Sector index</span>
                    <motion.span style={{ opacity: counterOpacity }} className="text-ink">
                      <ScrollPercent scrollYProgress={scrollYProgress} />
                    </motion.span>
                  </div>
                  <div className="relative h-[2px] bg-hairline-strong rounded-full">
                    <motion.div
                      style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
                      className="absolute inset-0 bg-rust rounded-full"
                    />
                    <motion.div
                      style={{ left: dotLeft, x: "-50%" }}
                      className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-rust"
                    >
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{ boxShadow: "0 0 14px 3px var(--rust-glow)" }}
                      />
                    </motion.div>
                  </div>
                  <div className="flex items-center justify-between mt-4 font-mono text-[10px] tracking-[0.28em] uppercase text-ink-faint">
                    <span>01</span>
                    <span>{String(INDUSTRIES.length).padStart(2, "0")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative mx-auto max-w-[1500px] w-full px-8 md:px-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-7 border-t border-hairline pt-8 md:pt-10"
            >
              <div className="max-w-[680px]">
                <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-ink-mute mb-2.5">
                  Now booking
                </div>
                <p className="text-[16px] md:text-[18px] leading-[1.55] text-ink">
                  Every engagement is{" "}
                  <span className="text-rust">scoped to the work</span>.
                  <span className="text-ink-mute">
                    {" "}
                    Tell us what you’re trying to fix and we’ll come back with a tailored plan and quote.
                  </span>
                </p>
              </div>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 bg-ink text-paper px-8 py-4 hover:bg-rust hover:shadow-[0_0_32px_-4px_var(--rust-glow)] transition-all duration-300 shrink-0"
              >
                <span className="font-mono text-[12px] tracking-[0.22em] uppercase">
                  Get a quote
                </span>
                <span className="font-mono text-[15px] transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileWork() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let currentIndex = -1;
    let frame: number | null = null;
    const update = () => {
      frame = null;
      const cards = track.querySelectorAll<HTMLElement>("[data-card]");
      if (!cards.length) return;
      const scrollLeft = track.scrollLeft;
      let nearest = 0;
      let nearestDist = Infinity;
      cards.forEach((card, index) => {
        const dist = Math.abs(card.offsetLeft - scrollLeft);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = index;
        }
      });
      if (nearest !== currentIndex) {
        currentIndex = nearest;
        setActiveIndex(nearest);
      }
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    update();
    track.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const timeout = setTimeout(update, 200);
    return () => {
      track.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      clearTimeout(timeout);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToCard = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelectorAll<HTMLElement>("[data-card]")[index];
    if (card) track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  };

  return (
    <section id="work" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 starfield opacity-15 pointer-events-none" />
      <div className="relative mx-auto max-w-[1500px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="max-w-[680px] mb-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-rust">
              03 — Industries
            </span>
            <span className="flex-1 h-px bg-hairline" />
          </div>
          <h2
            className="font-display font-semibold leading-[1] tracking-[-0.02em] text-ink"
            style={{ fontSize: "clamp(36px, 5.2vw, 72px)" }}
          >
            Industries
            <br />
            <span className="text-ink-mute">we serve.</span>
          </h2>
          <p className="mt-6 text-[15px] leading-[1.6] text-ink-soft">
            Built for businesses ready to level up how they grow, operate, and scale.
          </p>
        </motion.div>
        <div className="relative">
          <div
            ref={trackRef}
            className="relative overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-6"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent 0, #000 32px, #000 calc(100% - 32px), transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0, #000 32px, #000 calc(100% - 32px), transparent 100%)",
            }}
          >
            <div className="flex gap-4 py-4 px-6">
              {INDUSTRIES.map((ind, index) => (
                <div key={ind.num} data-card>
                  <MobileIndustryCard ind={ind} index={index} />
                </div>
              ))}
              <div className="flex-shrink-0 w-2" />
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2.5">
              {INDUSTRIES.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollToCard(index)}
                  aria-label={`Go to industry ${index + 1}`}
                  className={`block h-2 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-rust" : "w-2 bg-ink/30 hover:bg-ink/50"}`}
                  style={
                    index === activeIndex
                      ? { boxShadow: "0 0 12px var(--rust-glow)" }
                      : undefined
                  }
                />
              ))}
            </div>
            <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-ink-faint">
              Swipe to explore
            </p>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex flex-col items-start gap-7 border-t border-hairline pt-8"
        >
          <div className="max-w-[680px]">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-mute mb-2.5">
              Now booking
            </div>
            <p className="text-[15px] leading-[1.55] text-ink">
              Every engagement is{" "}
              <span className="text-rust">scoped to the work</span>.
              <span className="text-ink-mute">
                {" "}
                Tell us what you’re trying to fix and we’ll come back with a tailored plan and quote.
              </span>
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 bg-ink text-paper px-7 py-4 hover:bg-rust hover:shadow-[0_0_32px_-4px_var(--rust-glow)] transition-all duration-300 shrink-0"
          >
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase">
              Get a quote
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

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

export function Work() {
  const isDesktop = useIsDesktop();
  return isDesktop ? <DesktopWork /> : <MobileWork />;
}
