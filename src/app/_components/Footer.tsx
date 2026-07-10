"use client";

import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-hairline">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <Logo />
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-mute">
            Marketing · Sites · CRM · AI · Automations
          </div>
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-mute">
            © 2026 · Magnolia, TX
          </div>
        </div>
      </div>
    </footer>
  );
}
