"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface Bullet {
  label: string;
  copy: string;
}

interface Solution {
  num: string;
  title: string;
  tagline: string;
  desc: string;
  bullets: Bullet[];
  aurora: string;
  icon: ReactNode;
}

const solutions: Solution[] = [
  {
    num: "01",
    title: "Marketing that fills your pipeline",
    tagline: "Not posts. Not vibes. Paying customers.",
    desc: "Paid ads, lead gen, and conversion built around how your buyers actually decide — so the inbox keeps moving without you babysitting it.",
    bullets: [
      {
        label: "Paid Social",
        copy: "Meta, TikTok, and YouTube creative that books calls — not just impressions.",
      },
      {
        label: "Paid Search",
        copy: "Google + Local Service Ads tuned to intent, with conversion tracking that actually fires.",
      },
      {
        label: "Conversion Plumbing",
        copy: "Tracking, attribution, and follow-up so we know what's working and double down fast.",
      },
    ],
    aurora: "from-sky-500/30 to-blue-600/5",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-10 w-10"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "A CRM built around your pipeline",
    tagline: "Not how someone else thinks you should sell.",
    desc: "Custom CRMs that match the way you actually close — branded, fast, and wired into the rest of your stack from day one.",
    bullets: [
      {
        label: "Custom Pipelines",
        copy: "Stages and fields that mirror your real sales motion — not a HubSpot template.",
      },
      {
        label: "Branded Client Portal",
        copy: "A clean, on-brand front door for clients to track jobs, sign, and pay.",
      },
      {
        label: "Built-in Automation",
        copy: "Reminders, follow-ups, and hand-offs running quietly in the background 24/7.",
      },
    ],
    aurora: "from-violet-500/30 to-fuchsia-600/5",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-10 w-10"
      >
        <rect x="3" y="4" width="18" height="16" rx="1.5" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="8" y1="4" x2="8" y2="20" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Websites that bring in customers",
    tagline: "Not another template with your logo dropped in.",
    desc: "Modern, fast, conversion-engineered sites — built around how your customers actually decide so visitors turn into booked calls.",
    bullets: [
      {
        label: "Web Development",
        copy: "Custom Next.js builds — blazing fast, secure, and easy to evolve.",
      },
      {
        label: "Conversion Architecture",
        copy: "Every page mapped to a job-to-be-done with a clear path from visit to lead.",
      },
      {
        label: "SEO Foundations",
        copy: "Tech SEO and content scaffolding so Google starts sending traffic on autopilot.",
      },
    ],
    aurora: "from-emerald-500/30 to-teal-600/5",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-10 w-10"
      >
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <line x1="3" y1="12" x2="21" y2="12" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "AI deployed where it actually moves the needle",
    tagline: "The unfair advantage everyone's talking about — actually shipped.",
    desc: "Chatbots, AI receptionists, automated quoting, and internal copilots — built on Claude, GPT, and custom models, wired into your business.",
    bullets: [
      {
        label: "AI Receptionist",
        copy: "Picks up after hours, books calls, qualifies leads — sounds human, never sleeps.",
      },
      {
        label: "Automated Quoting",
        copy: "From job spec to priced quote in seconds, with the margins you actually want.",
      },
      {
        label: "Custom Copilots",
        copy: "Internal AI tools that turn your team's tribal knowledge into a queryable system.",
      },
    ],
    aurora: "from-cyan-500/30 to-sky-600/5",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-10 w-10"
      >
        <path d="M12 3v3" />
        <path d="M12 18v3" />
        <path d="M4.2 7.5 6.4 9" />
        <path d="M17.6 15 19.8 16.5" />
        <path d="M4.2 16.5 6.4 15" />
        <path d="M17.6 9 19.8 7.5" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Automations that save your week back",
    tagline: "If a human does it twice, a system should be doing it.",
    desc: "We map the manual work eating your team's time and build the quiet machinery — Zapier, n8n, custom — that handles it forever.",
    bullets: [
      {
        label: "Workflow Automation",
        copy: "Lead routing, follow-ups, scheduling, invoicing — kept moving without anyone touching it.",
      },
      {
        label: "Tool Integration",
        copy: "CRM, email, calendar, accounting all talking to each other. No more copy-paste jobs.",
      },
      {
        label: "Reporting Dashboards",
        copy: "One screen that tells you what's working, what's leaking, and where to act.",
      },
    ],
    aurora: "from-amber-500/30 to-orange-600/5",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-10 w-10"
      >
        <path d="M13 3 4 14h7l-1 7 9-11h-7l1-7z" />
      </svg>
    ),
  },
];

const count = solutions.length;

const cornerPositions = [
  "top-0 left-0",
  "top-0 right-0",
  "bottom-0 left-0",
  "bottom-0 right-0",
];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

function DesktopSlide({ s, i, active }: { s: Solution; i: number; active: number }) {
  const offset = i - active;
  const isCurrent = offset === 0;

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isCurrent ? 1 : 0,
        y: offset > 0 ? 60 : offset < 0 ? -60 : 0,
      }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 flex items-center justify-center px-6 sm:px-10"
      style={{ pointerEvents: isCurrent ? "auto" : "none" }}
    >
      <div className="relative w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-center">
        <div>
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-ink-mute mb-5">
            {s.num} / {String(count).padStart(2, "0")}
          </p>
          <h3
            className="font-display font-semibold leading-[1.02] tracking-[-0.02em] text-ink"
            style={{ fontSize: "clamp(36px, 5.4vw, 76px)" }}
          >
            {s.title}
          </h3>
          <p className="mt-6 italic text-[18px] md:text-[20px] leading-[1.45] text-ink">
            {s.tagline}
          </p>
          <p className="mt-3 max-w-[560px] text-[15px] md:text-[17px] leading-[1.6] text-ink-soft">
            {s.desc}
          </p>

          <div className="relative mt-8 max-w-[640px] overflow-hidden rounded-md border border-hairline-strong">
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.aurora}`}
            />
            <div className="pointer-events-none absolute inset-0 starfield opacity-30" />
            <div className="relative p-6 md:p-7">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-mute mb-4">
                What that looks like
              </p>
              <ul className="flex flex-col gap-3.5">
                {s.bullets.map((b) => (
                  <li key={b.label} className="flex gap-3">
                    <span className="mt-1 inline-block h-3 w-3 flex-shrink-0 text-ink">
                      <svg viewBox="0 0 12 12" className="h-full w-full">
                        <path
                          d="M2 6.5 L5 9.5 L10 3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="font-medium text-[14px] md:text-[15px] text-ink">
                        {b.label}
                      </p>
                      <p className="mt-1 text-[12px] md:text-[13px] leading-[1.55] text-ink-soft">
                        {b.copy}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative aspect-square w-full max-w-[460px] mx-auto lg:max-w-[540px] hidden md:block">
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${s.aurora} blur-3xl opacity-80`}
          />
          <motion.div
            animate={isCurrent ? { rotate: 360 } : { rotate: 0 }}
            transition={
              isCurrent
                ? { duration: 36, repeat: Infinity, ease: "linear" }
                : { duration: 0.4 }
            }
            className="absolute inset-[6%] rounded-full border border-hairline-strong"
          >
            {Array.from({ length: 12 }).map((_, tick) => (
              <span
                key={tick}
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 block h-1.5 w-px bg-hairline-strong origin-center"
                style={{ transform: `rotate(${tick * 30}deg) translateY(-50%)` }}
              />
            ))}
          </motion.div>
          <motion.div
            animate={isCurrent ? { rotate: -360 } : { rotate: 0 }}
            transition={
              isCurrent
                ? { duration: 24, repeat: Infinity, ease: "linear" }
                : { duration: 0.4 }
            }
            className="absolute inset-[18%] rounded-full border border-hairline"
          >
            <span
              className="absolute -top-1 left-1/2 -translate-x-1/2 block h-2 w-2 rounded-full bg-rust"
              style={{ boxShadow: "0 0 14px var(--rust-glow)" }}
            />
          </motion.div>
          <motion.div
            initial={false}
            animate={
              isCurrent ? { scale: 1, opacity: 1 } : { scale: 0.92, opacity: 0.6 }
            }
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-[28%] rounded-full bg-paper-deep border border-hairline-strong flex items-center justify-center overflow-hidden"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.05), 0 30px 80px -30px rgba(0,0,0,0.8)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.1) 0%, transparent 55%)",
              }}
            />
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.aurora} opacity-60`}
            />
            <div
              className="relative text-ink"
              style={{
                transform: "scale(4.5)",
                filter: "drop-shadow(0 0 14px rgba(255,255,255,0.18))",
              }}
            >
              {s.icon}
            </div>
          </motion.div>
          {cornerPositions.map((pos, idx) => (
            <span key={idx} className={`absolute ${pos} h-3 w-3`} aria-hidden>
              <span
                className={`absolute h-px w-3 bg-hairline-strong ${pos.includes("top") ? "top-0" : "bottom-0"} ${pos.includes("left") ? "left-0" : "right-0"}`}
              />
              <span
                className={`absolute h-3 w-px bg-hairline-strong ${pos.includes("top") ? "top-0" : "bottom-0"} ${pos.includes("left") ? "left-0" : "right-0"}`}
              />
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Dot({ i, active }: { i: number; active: number }) {
  const isCurrent = i === active;
  return (
    <motion.span
      initial={false}
      animate={{ opacity: isCurrent ? 1 : 0.3, scale: isCurrent ? 1.5 : 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="block h-2 w-2 rounded-full bg-ink"
    />
  );
}

function SolutionsDesktop() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(count - 1, Math.max(0, Math.floor(v * count))));
  });

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="relative"
      style={{ height: `${count * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-transparent">
        <div className="absolute inset-0 starfield opacity-20 pointer-events-none" />
        <div className="absolute left-4 sm:left-8 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.32em] text-rust"
            style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
          >
            01 — Solutions · Five disciplines, one system
          </p>
        </div>
        <div className="absolute right-4 sm:right-8 top-1/2 z-10 hidden -translate-y-1/2 lg:flex lg:flex-col lg:gap-3">
          {solutions.map((_, i) => (
            <Dot key={i} i={i} active={active} />
          ))}
        </div>
        {solutions.map((s, i) => (
          <DesktopSlide key={s.num} s={s} i={i} active={active} />
        ))}
      </div>
    </section>
  );
}

function MobileCard({ s }: { s: Solution }) {
  return (
    <div className="flex-shrink-0 snap-start w-full">
      <div className="relative w-full mx-auto px-6 py-6">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-mute mb-4">
          {s.num} / {String(count).padStart(2, "0")}
        </p>
        <h3
          className="font-display font-semibold leading-[1.02] tracking-[-0.02em] text-ink"
          style={{ fontSize: "clamp(30px, 7vw, 56px)" }}
        >
          {s.title}
        </h3>
        <p className="mt-5 italic text-[16px] leading-[1.45] text-ink">
          {s.tagline}
        </p>
        <p className="mt-3 text-[14px] leading-[1.6] text-ink-soft">{s.desc}</p>

        <div className="relative mt-7 overflow-hidden rounded-md border border-hairline-strong">
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.aurora}`}
          />
          <div className="pointer-events-none absolute inset-0 starfield opacity-30" />
          <div className="relative p-5">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-mute mb-4">
              What that looks like
            </p>
            <ul className="flex flex-col gap-3.5">
              {s.bullets.map((b) => (
                <li key={b.label} className="flex gap-3">
                  <span className="mt-1 inline-block h-3 w-3 flex-shrink-0 text-ink">
                    <svg viewBox="0 0 12 12" className="h-full w-full">
                      <path
                        d="M2 6.5 L5 9.5 L10 3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="font-medium text-[14px] text-ink">{b.label}</p>
                    <p className="mt-1 text-[12px] leading-[1.55] text-ink-soft">
                      {b.copy}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SolutionsMobile() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let lastIdx = -1;
    let raf: number | null = null;

    const update = () => {
      raf = null;
      const width = el.clientWidth;
      if (width === 0) return;
      const idx = Math.min(
        count - 1,
        Math.max(0, Math.round(el.scrollLeft / width)),
      );
      if (idx !== lastIdx) {
        lastIdx = idx;
        setActive(idx);
      }
    };

    const schedule = () => {
      if (raf === null) raf = requestAnimationFrame(update);
    };

    update();
    el.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const timeout = setTimeout(update, 200);

    return () => {
      el.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      clearTimeout(timeout);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="solutions" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 starfield opacity-20 pointer-events-none" />
      <div className="relative mx-auto max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="px-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-rust">
              01 — Solutions
            </span>
          </div>
          <h2
            className="font-display font-semibold leading-[1] tracking-[-0.02em] text-ink"
            style={{ fontSize: "clamp(36px, 5.2vw, 72px)" }}
          >
            Five disciplines,
            <br />
            <span className="text-ink-mute">one system.</span>
          </h2>
        </motion.div>

        <div
          ref={scrollerRef}
          className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          <div className="flex w-full">
            {solutions.map((s) => (
              <MobileCard key={s.num} s={s} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 px-6">
          <div className="flex items-center gap-2.5">
            {solutions.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  const el = scrollerRef.current;
                  if (!el) return;
                  el.scrollTo({ left: el.clientWidth * i, behavior: "smooth" });
                }}
                aria-label={`Go to solution ${i + 1}`}
                className={`block h-2 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-rust" : "w-2 bg-ink/30 hover:bg-ink/50"}`}
                style={
                  i === active
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
    </section>
  );
}

export function Solutions() {
  return useIsDesktop() ? <SolutionsDesktop /> : <SolutionsMobile />;
}
