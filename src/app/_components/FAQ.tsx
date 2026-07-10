"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How is Solen different from a regular marketing agency?",
    a: "Most agencies stop at ads. We build the whole system — ads, sites, CRM, AI, automation — under one roof. You don't need five vendors. You need one operator who can wire all of it together.",
  },
  {
    q: "How does pricing work?",
    a: "Every engagement is scoped to the work — which services, how deep, how fast. There's no public rate card because no two systems look the same. Fill out the contact form with what you're trying to fix, and we'll come back with a tailored proposal within a couple of days.",
  },
  {
    q: "Why a 90-day commitment?",
    a: "Most growth systems take 30–60 days to start producing measurable lift. We don't want to take your money and ghost; we also don't want clients pulling out at week 3 before the system has had a chance to compound. 90 days is the floor for honest results.",
  },
  {
    q: "Do I have to take all 5 services?",
    a: "No. Most clients start with 2 or 3 — usually marketing + CRM, or websites + automations. We scope to what you actually need.",
  },
  {
    q: "Are you really new? Why should I trust you?",
    a: "Yes, we're new — and that's why we work harder. You get senior-level work and an operator who actually picks up the phone; we get a long-term client and a real case study. The work either holds up or you walk after day 90. Fair?",
  },
  {
    q: "Where are you based?",
    a: "Magnolia, Texas. We work with anyone in the US, but if you're local, we'll come shake your hand.",
  },
  {
    q: "How fast can we start?",
    a: "Audit happens within a week of you reaching out. Build kickoff is usually 1–2 weeks after that. If you're ready, we're ready.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0 starfield opacity-10 pointer-events-none" />
      <div className="relative mx-auto max-w-[1100px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-rust">
              04 — FAQ
            </span>
            <span className="flex-1 h-px bg-hairline" />
          </div>
          <h2
            className="font-display font-semibold leading-[1] tracking-[-0.02em] text-ink"
            style={{ fontSize: "clamp(40px, 6vw, 84px)" }}
          >
            Honest answers.
          </h2>
        </motion.div>
        <div className="border-t border-hairline">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                className="border-b border-hairline"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left py-6 md:py-8 flex items-center justify-between gap-6 group"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-[20px] md:text-[26px] leading-[1.25] tracking-[-0.01em] text-ink group-hover:text-rust transition-colors">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="font-mono text-[24px] md:text-[28px] text-ink-mute group-hover:text-rust transition-colors shrink-0"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 md:pb-8 max-w-[760px] text-[16px] md:text-[17px] leading-[1.65] text-ink-soft">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
