"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState, type ComponentType } from "react";

interface GraphicProps {
  isActive: boolean;
  aurora: string;
}

interface Step {
  num: string;
  title: string;
  sub: string;
  desc: string;
  duration: string;
  aurora: string;
  Graphic: ComponentType<GraphicProps>;
}

const steps: Step[] = [
  {
    num: "01",
    title: "Discover",
    sub: "Free audit",
    desc: "We dig into what's broken, what's working, and what's being left on the table. No pitch — you walk away with a plan whether you hire us or not.",
    duration: "1 week",
    aurora: "from-sky-500/30 to-blue-600/5",
    Graphic: function DiscoverGraphic({ isActive, aurora }: GraphicProps) {
      const bars = [
        { label: "Marketing", pct: 62 },
        { label: "CRM", pct: 28 },
        { label: "Website", pct: 84 },
        { label: "Automations", pct: 15 },
      ];
      return (
        <div className="relative w-full h-full p-6 md:p-8 flex flex-col gap-5">
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${aurora} opacity-70 blur-2xl`}
          />
          <div className="relative flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-rust">
              Audit · in progress
            </span>
            <span className="flex items-center gap-1.5">
              <motion.span
                animate={isActive ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
                transition={{
                  duration: 1.4,
                  repeat: isActive ? Infinity : 0,
                  ease: "easeInOut",
                }}
                className="block w-1.5 h-1.5 rounded-full bg-rust"
                style={{ boxShadow: "0 0 10px var(--rust-glow)" }}
              />
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-ink-mute">
                Live
              </span>
            </span>
          </div>
          <div className="relative flex flex-col gap-4 mt-2">
            {bars.map((bar, i) => (
              <div key={bar.label}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-soft">
                    {bar.label}
                  </span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                    className="font-mono text-[11px] text-ink-soft"
                  >
                    {bar.pct}%
                  </motion.span>
                </div>
                <div className="relative h-1.5 w-full rounded-full bg-hairline overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isActive ? { width: `${bar.pct}%` } : { width: 0 }}
                    transition={{
                      duration: 1.1,
                      delay: 0.2 + i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-y-0 left-0 bg-rust"
                    style={{ boxShadow: "0 0 8px var(--rust-glow)" }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="relative mt-auto pt-4 border-t border-hairline flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-mute">
              Findings
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="font-mono text-[12px] text-ink"
            >
              14 opportunities
            </motion.span>
          </div>
        </div>
      );
    },
  },
  {
    num: "02",
    title: "Design",
    sub: "Map the system",
    desc: "We architect every layer — marketing pipe, CRM logic, AI assists, automation triggers, the site that sits on top of all of it. One blueprint. Your blueprint.",
    duration: "1–2 weeks",
    aurora: "from-violet-500/30 to-fuchsia-600/5",
    Graphic: function DesignGraphic({ isActive, aurora }: GraphicProps) {
      const nodes = [
        { x: 50, y: 18, label: "ADS" },
        { x: 84, y: 50, label: "SITE" },
        { x: 50, y: 82, label: "AI" },
        { x: 16, y: 50, label: "CRM" },
      ];
      return (
        <div className="relative w-full h-full p-2">
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${aurora} opacity-70 blur-2xl`}
          />
          <svg viewBox="0 0 100 100" className="relative w-full h-full">
            <defs>
              <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="50%" stopColor="rgba(77,158,255,0.5)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
              </linearGradient>
            </defs>
            {nodes.map((node, i) => (
              <line
                key={i}
                x1={50}
                y1={50}
                x2={node.x}
                y2={node.y}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="0.4"
                strokeDasharray="1.5 1"
              />
            ))}
            {isActive &&
              nodes.map((node, i) => (
                <motion.circle
                  key={`pulse-${i}`}
                  r="0.9"
                  fill="var(--rust)"
                  filter="drop-shadow(0 0 4px rgba(77,158,255,0.8))"
                  initial={{ cx: 50, cy: 50, opacity: 0 }}
                  animate={{
                    cx: [50, node.x],
                    cy: [50, node.y],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.6,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 1.4,
                    ease: "easeInOut",
                  }}
                />
              ))}
            {nodes.map((node, i) => (
              <g key={node.label}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="6.5"
                  fill="rgba(10,10,16,0.95)"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="0.4"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={
                    isActive
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0.6, opacity: 0.4 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
                <text
                  x={node.x}
                  y={node.y + 1.2}
                  fontSize="3"
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.15em"
                  fill="rgba(243,243,247,0.9)"
                >
                  {node.label}
                </text>
              </g>
            ))}
            <motion.circle
              cx={50}
              cy={50}
              r="11"
              fill="rgba(10,10,16,0.95)"
              stroke="var(--rust)"
              strokeWidth="0.5"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={
                isActive
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.8, opacity: 0.7 }
              }
              transition={{ duration: 0.6 }}
              style={{
                transformOrigin: "50px 50px",
                filter: "drop-shadow(0 0 6px rgba(77,158,255,0.5))",
              }}
            />
            <text
              x={50}
              y={51.4}
              fontSize="3.4"
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              letterSpacing="0.15em"
              fill="var(--rust)"
            >
              SYSTEM
            </text>
          </svg>
        </div>
      );
    },
  },
  {
    num: "03",
    title: "Build",
    sub: "We deploy",
    desc: "Custom code, real launches, real wiring. Not a templated dashboard handed off. Your team watches us do it; we leave docs behind.",
    duration: "2–6 weeks",
    aurora: "from-emerald-500/30 to-teal-600/5",
    Graphic: function BuildGraphic({ isActive, aurora }: GraphicProps) {
      const rows = [
        { label: "Code", status: "Done", state: "done" },
        { label: "Tests", status: "117 / 117", state: "done" },
        { label: "Deploy", status: "Streaming", state: "active" },
        { label: "Live", status: "Pending", state: "pending" },
      ];
      return (
        <div className="relative w-full h-full p-6 md:p-8 flex flex-col gap-4">
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${aurora} opacity-70 blur-2xl`}
          />
          <div className="relative flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-rust">
              Build · pipeline
            </span>
            <span className="font-mono text-[10px] text-ink-mute">v1.04.2</span>
          </div>
          <div className="relative flex flex-col gap-3 mt-2">
            {rows.map((row, i) => {
              const done = row.state === "done";
              const active = row.state === "active";
              return (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={
                    isActive ? { opacity: 1, x: 0 } : { opacity: 0.5, x: 0 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                  className="flex items-center gap-3 rounded-md border border-hairline bg-paper-deep/60 px-4 py-3"
                  style={{
                    borderColor: active
                      ? "var(--rust)"
                      : done
                        ? "rgba(255,255,255,0.16)"
                        : "rgba(255,255,255,0.08)",
                    boxShadow: active
                      ? "0 0 24px -6px var(--rust-glow)"
                      : undefined,
                  }}
                >
                  <span
                    className="block h-2 w-2 rounded-full flex-shrink-0"
                    style={{
                      background: done
                        ? "var(--ink-mute)"
                        : active
                          ? "var(--rust)"
                          : "transparent",
                      border:
                        done || active ? "none" : "1px solid var(--ink-faint)",
                      boxShadow: active ? "0 0 10px var(--rust-glow)" : undefined,
                    }}
                  />
                  <div className="flex-1">
                    <p className="font-mono text-[12px] tracking-[0.12em] uppercase text-ink">
                      {row.label}
                    </p>
                  </div>
                  <p
                    className="font-mono text-[10px] tracking-[0.18em] uppercase"
                    style={{
                      color: active
                        ? "var(--rust)"
                        : done
                          ? "var(--ink-soft)"
                          : "var(--ink-mute)",
                    }}
                  >
                    {row.status}
                  </p>
                </motion.div>
              );
            })}
          </div>
          <div className="relative mt-auto pt-4 border-t border-hairline">
            <div className="flex items-baseline justify-between mb-2">
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-mute">
                Progress
              </span>
              <span className="font-mono text-[11px] text-ink">75%</span>
            </div>
            <div className="relative h-1.5 w-full rounded-full bg-hairline overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={isActive ? { width: "75%" } : { width: "0%" }}
                transition={{
                  duration: 1.4,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-y-0 left-0 bg-rust"
                style={{ boxShadow: "0 0 10px var(--rust-glow)" }}
              />
            </div>
          </div>
        </div>
      );
    },
  },
  {
    num: "04",
    title: "Scale",
    sub: "Compound",
    desc: "Numbers go up. We iterate, optimize, automate further. You compound. We don't disappear — month-to-month after day 90.",
    duration: "Ongoing",
    aurora: "from-amber-500/30 to-orange-600/5",
    Graphic: function ScaleGraphic({ isActive, aurora }: GraphicProps) {
      const points = [
        { x: 5, y: 78 },
        { x: 22, y: 70 },
        { x: 38, y: 58 },
        { x: 54, y: 44 },
        { x: 70, y: 28 },
        { x: 86, y: 10 },
      ];
      const linePath = "M " + points.map((p) => `${p.x} ${p.y}`).join(" L ");
      const stats = [
        { label: "Leads", val: "+318" },
        { label: "Booked", val: "+127" },
        { label: "Closed", val: "+42" },
      ];
      return (
        <div className="relative w-full h-full p-6 md:p-8 flex flex-col gap-4">
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${aurora} opacity-70 blur-2xl`}
          />
          <div className="relative flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-rust">
              Growth · last 90 days
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-ink-soft">
              <span>↑</span>
              <span>+412%</span>
            </span>
          </div>
          <div className="relative flex-1 mt-2">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                <linearGradient id="scale-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(77,158,255,0.4)" />
                  <stop offset="100%" stopColor="rgba(77,158,255,0)" />
                </linearGradient>
              </defs>
              {[20, 40, 60, 80].map((y) => (
                <line
                  key={y}
                  x1="5"
                  x2="95"
                  y1={y}
                  y2={y}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="0.3"
                />
              ))}
              <motion.path
                d={linePath + " L 86 88 L 5 88 Z"}
                fill="url(#scale-fill)"
                initial={{ opacity: 0 }}
                animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              />
              <motion.path
                d={linePath}
                fill="none"
                stroke="var(--rust)"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  filter: "drop-shadow(0 0 4px rgba(77,158,255,0.6))",
                }}
                initial={{ pathLength: 0 }}
                animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{
                  duration: 1.4,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              {points.map((p, i) => (
                <motion.circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r="1.1"
                  fill="var(--rust)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
                  }
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.12 }}
                  style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                />
              ))}
              {isActive && (
                <motion.circle
                  cx={points[points.length - 1].x}
                  cy={points[points.length - 1].y}
                  r="1.1"
                  fill="var(--rust)"
                  animate={{ r: [1.1, 3.5], opacity: [0.6, 0] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              )}
            </svg>
          </div>
          <div className="relative grid grid-cols-3 gap-3 pt-4 border-t border-hairline">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 6 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.12 }}
              >
                <p className="font-mono text-[9px] tracking-[0.24em] uppercase text-ink-mute">
                  {stat.label}
                </p>
                <p className="font-display font-semibold text-[20px] md:text-[22px] text-ink leading-none mt-1">
                  {stat.val}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      );
    },
  },
];

const count = steps.length;

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

function DesktopSlide({ s, i, active }: { s: Step; i: number; active: number }) {
  const offset = i - active;
  const isCurrent = offset === 0;

  let y = 0;
  let scale = 1;
  let opacity = 1;
  if (offset === 0) {
    y = 0;
    scale = 1;
    opacity = 1;
  } else {
    if (offset > 0) {
      y = 70 + (offset - 1) * 28;
      scale = 1 - offset * 0.06;
    } else {
      y = -120 + offset * 30;
      scale = 1 + offset * 0.02;
    }
    opacity = 0;
  }
  const zIndex = isCurrent ? count + 1 : count - Math.abs(offset);
  const Graphic = s.Graphic;

  return (
    <motion.div
      initial={false}
      animate={{ y, scale, opacity }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: isCurrent ? 0.35 : 0.25, ease: "easeOut" },
      }}
      className="absolute inset-0 flex items-center justify-center px-6 sm:px-10"
      style={{ pointerEvents: isCurrent ? "auto" : "none", zIndex }}
    >
      <div
        className="relative w-full max-w-[1280px] max-h-[84vh] grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 lg:gap-12 items-center rounded-2xl border border-hairline-strong p-7 md:p-10 lg:p-12 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(17,17,26,0.92) 0%, rgba(10,10,16,0.92) 100%)",
          boxShadow:
            offset === 0
              ? "0 40px 100px -30px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04) inset"
              : "0 30px 60px -30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03) inset",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.aurora} opacity-30`}
        />
        <div className="pointer-events-none absolute inset-0 starfield opacity-20" />
        <div className="relative">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-rust mb-4">
            {s.sub}
          </p>
          <h3
            className="font-display font-semibold leading-[1] tracking-[-0.02em] text-ink"
            style={{ fontSize: "clamp(48px, 7vw, 110px)" }}
          >
            {s.title}
          </h3>
          <div className="mt-5 inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase text-ink-mute">
            <span className="block w-6 h-px bg-rust" />
            <span>Step {s.num}</span>
            <span className="block w-1 h-1 rounded-full bg-ink-mute" />
            <span>{s.duration}</span>
          </div>
          <p className="mt-7 max-w-[560px] text-[15px] md:text-[17px] leading-[1.6] text-ink-soft">
            {s.desc}
          </p>
        </div>
        <div className="relative w-full hidden md:block">
          <div className="relative aspect-square w-full max-w-[460px] mx-auto lg:max-w-[540px] rounded-2xl border border-hairline-strong overflow-hidden bg-paper-deep/60">
            <Graphic isActive={isCurrent} aurora={s.aurora} />
            {cornerPositions.map((pos, idx) => (
              <span key={idx} className={`absolute ${pos} h-3 w-3 z-10`} aria-hidden>
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

function ProcessDesktop() {
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
      id="process"
      ref={sectionRef}
      className="relative"
      style={{ height: `${count * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute inset-0 starfield opacity-10 pointer-events-none" />
        <div className="absolute left-4 sm:left-8 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.32em] text-rust"
            style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
          >
            02 — Our Process · How a system gets built
          </p>
        </div>
        <div className="absolute right-4 sm:right-8 top-1/2 z-10 hidden -translate-y-1/2 lg:flex lg:flex-col lg:gap-3">
          {steps.map((_, i) => (
            <Dot key={i} i={i} active={active} />
          ))}
        </div>
        {steps.map((s, i) => (
          <DesktopSlide key={s.num} s={s} i={i} active={active} />
        ))}
      </div>
    </section>
  );
}

function MobileCard({ s }: { s: Step }) {
  return (
    <div className="flex-shrink-0 snap-start w-full">
      <div className="relative w-full mx-auto px-6">
        <div
          className="relative w-full rounded-2xl border border-hairline-strong p-6 overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(17,17,26,0.92) 0%, rgba(10,10,16,0.92) 100%)",
            boxShadow:
              "0 30px 60px -30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.aurora} opacity-30`}
          />
          <div className="pointer-events-none absolute inset-0 starfield opacity-20" />
          <div className="relative">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-rust mb-3">
              {s.sub}
            </p>
            <h3
              className="font-display font-semibold leading-[1] tracking-[-0.02em] text-ink"
              style={{ fontSize: "clamp(40px, 10vw, 72px)" }}
            >
              {s.title}
            </h3>
            <div className="mt-4 inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase text-ink-mute">
              <span className="block w-6 h-px bg-rust" />
              <span>Step {s.num}</span>
              <span className="block w-1 h-1 rounded-full bg-ink-mute" />
              <span>{s.duration}</span>
            </div>
            <p className="mt-6 text-[14px] leading-[1.6] text-ink-soft">
              {s.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcessMobile() {
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
    <section id="process" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 starfield opacity-10 pointer-events-none" />
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
              02 — Our Process
            </span>
          </div>
          <h2
            className="font-display font-semibold leading-[1] tracking-[-0.02em] text-ink"
            style={{ fontSize: "clamp(36px, 5.2vw, 72px)" }}
          >
            How a system
            <br />
            <span className="text-ink-mute">gets built.</span>
          </h2>
        </motion.div>

        <div
          ref={scrollerRef}
          className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          <div className="flex w-full">
            {steps.map((s) => (
              <MobileCard key={s.num} s={s} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 px-6">
          <div className="flex items-center gap-2.5">
            {steps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  const el = scrollerRef.current;
                  if (!el) return;
                  el.scrollTo({ left: el.clientWidth * i, behavior: "smooth" });
                }}
                aria-label={`Go to step ${i + 1}`}
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

export function Process() {
  return useIsDesktop() ? <ProcessDesktop /> : <ProcessMobile />;
}
