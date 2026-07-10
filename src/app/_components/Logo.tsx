"use client";

type LogoSize = "sm" | "md" | "lg" | "xl";

const SIZES: Record<LogoSize, string> = {
  sm: "26px",
  md: "44px",
  lg: "84px",
  xl: "clamp(72px, 13vw, 180px)",
};

interface LogoProps {
  size?: LogoSize;
  animated?: boolean;
  trace?: "outline" | "sweep" | false;
  className?: string;
}

export function Logo({
  size = "md",
  animated = true,
  trace = "outline",
  className = "",
}: LogoProps) {
  const fontSize = SIZES[size];

  return (
    <span className={`logo-3d-perspective ${className}`}>
      <span className={`logo-3d-rotator ${animated ? "is-animated" : ""}`}>
        <span className="logo-3d-stack" style={{ fontSize }}>
          <span className="logo-3d-extrusion">SOLEN</span>
          <span className="logo-3d-face">SOLEN</span>
          <span aria-hidden className="logo-3d-highlight">
            SOLEN
          </span>
          {trace === "sweep" && (
            <span aria-hidden className="logo-3d-sweep">
              SOLEN
            </span>
          )}
          {trace === "outline" && (
            <svg aria-hidden className="logo-3d-trace-svg" overflow="visible">
              <text x="0" y="0.83em" className="logo-3d-trace-text" style={{ fontSize }}>
                SOLEN
              </text>
            </svg>
          )}
        </span>
      </span>
    </span>
  );
}
