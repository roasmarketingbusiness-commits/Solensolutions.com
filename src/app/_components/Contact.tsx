"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}

function Field({ name, label, type = "text", required, autoComplete }: FieldProps) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] tracking-[0.22em] uppercase text-ink-mute mb-2">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="w-full bg-transparent border-b border-hairline-strong focus:border-rust focus:outline-none py-2 px-0 text-[15px] md:text-[16px] text-ink placeholder:text-ink-mute/60 transition-colors"
      />
    </label>
  );
}

interface TextAreaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
}

function TextAreaField({ name, label, placeholder }: TextAreaFieldProps) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] tracking-[0.22em] uppercase text-ink-mute mb-2">
        {label}
      </span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={3}
        className="w-full bg-transparent border-b border-hairline-strong focus:border-rust focus:outline-none py-2 px-0 text-[15px] md:text-[16px] text-ink placeholder:text-ink-mute/60 transition-colors resize-none"
      />
    </label>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const clean = (value: FormDataEntryValue | null) => String(value ?? "").trim();
    const lead = {
      name: clean(data.get("name")),
      phone: clean(data.get("phone")),
      email: clean(data.get("email")) || null,
      business_name: clean(data.get("business")) || null,
      notes: clean(data.get("needs")) || null,
      source: "solensolutions.com",
    };

    try {
      const apiKey = "sb_publishable_REbfq6-lLJae_FwFrUywqQ_GaeQsrUP";
      const res = await fetch("https://flgwnlwuamsucnqpsgup.supabase.co/rest/v1/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(lead),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      setSent(true);
      form.reset();
    } catch (err) {
      console.error("Lead submission failed", err);
      setError("Couldn't send. Try again, or email RoasMarketingBusiness@gmail.com.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="relative py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0 starfield opacity-20 pointer-events-none" />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(77,158,255,0.12) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[1100px] px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-rust">
                Get a free audit
              </span>
            </div>
            <h2
              className="font-display font-semibold leading-[1] tracking-[-0.02em] text-ink mb-8"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              Let’s see if we’re a fit.
            </h2>
            <p className="text-[16px] md:text-[17px] leading-[1.6] text-ink-soft max-w-[440px]">
              Tell us a little. We’ll come back with what we’d actually do for you — even if
              you don’t hire us. No pitch, no pressure.
            </p>
          </motion.div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 border border-hairline-strong bg-paper-deep/40 p-8 md:p-10 flex flex-col items-start gap-5"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-rust text-rust">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-rust">
                  Sent
                </span>
              </div>
              <h3
                className="font-display font-semibold leading-[1.05] tracking-[-0.02em] text-ink"
                style={{ fontSize: "clamp(28px, 3.6vw, 40px)" }}
              >
                We got it. We’ll be in touch within a few hours.
              </h3>
              <p className="text-[15px] md:text-[16px] leading-[1.6] text-ink-soft max-w-[440px]">
                In the meantime, keep doing what you do. We’ll come back with what we’d
                actually do for you — no pitch, no pressure.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="lg:col-span-7 border border-hairline-strong bg-paper-deep/40 p-8 md:p-10 space-y-5"
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field name="name" label="Your name" required autoComplete="name" />
                <Field name="phone" label="Phone" type="tel" required autoComplete="tel" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field name="business" label="Business name" autoComplete="organization" />
                <Field name="email" label="Email" type="email" autoComplete="email" />
              </div>
              <TextAreaField
                name="needs"
                label="What do you want help with?"
                placeholder="Leads, a new site, CRM, AI, automation — or all of the above."
              />
              <div className="flex items-center justify-between gap-4 pt-4 flex-wrap">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-mute">
                  We reply within a few hours.
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="group inline-flex items-center gap-3 bg-ink text-paper px-7 py-4 hover:bg-rust hover:shadow-[0_0_32px_-4px_var(--rust-glow)] transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none"
                >
                  <span className="font-mono text-[11px] tracking-[0.22em] uppercase">
                    {sending ? "Sending…" : "Request audit"}
                  </span>
                  <span className="font-mono text-[14px] transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </button>
              </div>
              {error ? (
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-rust">
                  {error}
                </p>
              ) : null}
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
