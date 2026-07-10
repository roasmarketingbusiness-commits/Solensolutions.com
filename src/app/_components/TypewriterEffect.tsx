"use client";

import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

export interface TypewriterWord {
  text: string;
  className?: string;
}

interface TypewriterEffectProps {
  words: TypewriterWord[];
  className?: string;
  cursorClassName?: string;
  /** Seconds to wait before typing starts once in view. */
  delay?: number;
  /** Seconds of stagger between each letter. */
  perChar?: number;
  showCursor?: boolean;
}

const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");

export function TypewriterEffect({
  words,
  className,
  cursorClassName,
  delay = 0,
  perChar = 0.06,
  showCursor = true,
}: TypewriterEffectProps) {
  const wordsWithChars = words.map((word) => ({
    ...word,
    chars: word.text.split(""),
  }));

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      animate(
        "span",
        { display: "inline-block", opacity: 1, width: "fit-content" },
        { duration: 0.25, delay: stagger(perChar), ease: "easeInOut" },
      );
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, animate, delay, perChar]);

  return (
    <span className={cn("block", className)}>
      <motion.span ref={scope} className="inline">
        {wordsWithChars.map((word, wordIndex) => (
          <span key={`word-${wordIndex}`} className="inline-block">
            {word.chars.map((char, charIndex) => (
              <motion.span
                key={`char-${charIndex}`}
                className={cn("opacity-0 hidden", word.className)}
              >
                {char}
              </motion.span>
            ))}
            {"\u00A0"}
          </span>
        ))}
      </motion.span>
      {showCursor && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className={cn(
            "inline-block align-middle rounded-sm w-[3px] h-[0.7em] ml-1 bg-rust",
            cursorClassName,
          )}
          style={{ boxShadow: "0 0 16px var(--rust-glow)" }}
        />
      )}
    </span>
  );
}
