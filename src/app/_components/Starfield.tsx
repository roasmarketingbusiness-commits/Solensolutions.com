"use client";

import { useEffect, useMemo, useState } from "react";

function seededRandom(index: number, salt: number) {
  const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function Starfield({ starCount = 160, shooterCount = 4 }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: starCount }, (_, i) => {
        const colorRand = seededRandom(i, 8);
        const size = seededRandom(i, 3) * 1.8 + 0.6;
        return {
          id: i,
          left: seededRandom(i, 1) * 100,
          top: seededRandom(i, 2) * 100,
          size,
          duration: seededRandom(i, 4) * 4 + 2.2,
          delay: seededRandom(i, 5) * 6,
          baseOpacity: seededRandom(i, 7) * 0.5 + 0.35,
          color:
            colorRand > 0.92
              ? "rgba(77, 158, 255, 0.95)"
              : colorRand > 0.84
                ? "rgba(179, 136, 255, 0.9)"
                : "rgba(255, 255, 255, 0.95)",
          glow: size * 2.4,
          driftX: (seededRandom(i, 9) - 0.5) * 100,
          driftY: (seededRandom(i, 10) - 0.5) * 100,
          driftDur: seededRandom(i, 11) * 35 + 25,
          driftDelay: seededRandom(i, 12) * 20,
        };
      }),
    [starCount],
  );

  const shooters = useMemo(
    () =>
      Array.from({ length: shooterCount }, (_, i) => ({
        id: i,
        topPct: seededRandom(i + 100, 1) * 70,
        leftPct: seededRandom(i + 100, 2) * 50,
        delay: seededRandom(i + 100, 3) * 12 + i * 4,
        duration: 1.4 + seededRandom(i + 100, 4) * 1.2,
        length: 90 + seededRandom(i + 100, 5) * 60,
        angle: 18 + seededRandom(i + 100, 6) * 14,
      })),
    [shooterCount],
  );

  return (
    <div className="fixed inset-0 z-0 bg-paper pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 25% 30%, rgba(77,158,255,0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 80% 70%, rgba(179,136,255,0.05) 0%, transparent 55%)",
        }}
      />
      {mounted && (
        <>
          {stars.map((star) => (
            <span
              key={star.id}
              className="absolute rounded-full"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                background: star.color,
                boxShadow: `0 0 ${star.glow}px ${star.color}`,
                opacity: star.baseOpacity,
                animation: `star-twinkle ${star.duration}s ease-in-out ${star.delay}s infinite, star-drift ${star.driftDur}s ease-in-out ${star.driftDelay}s infinite`,
                willChange: "opacity, scale, translate",
                ["--drift-x" as string]: `${star.driftX}px`,
                ["--drift-y" as string]: `${star.driftY}px`,
              }}
            />
          ))}
          {shooters.map((shooter) => (
            <span
              key={`shoot-${shooter.id}`}
              className="absolute"
              style={{
                top: `${shooter.topPct}%`,
                left: `${shooter.leftPct}%`,
                width: `${shooter.length}px`,
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.95) 60%, rgba(255,255,255,1) 95%, transparent)",
                transform: `rotate(${shooter.angle}deg)`,
                transformOrigin: "left center",
                animation: `shooting-star ${shooter.duration}s cubic-bezier(0.4, 0, 0.2, 1) ${shooter.delay}s infinite`,
                opacity: 0,
                filter: "drop-shadow(0 0 4px rgba(255,255,255,0.8))",
                willChange: "opacity, transform",
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
