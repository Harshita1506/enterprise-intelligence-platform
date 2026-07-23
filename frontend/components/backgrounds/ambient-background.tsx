import { FlowFieldCanvas } from "./flow-field-canvas"

/**
 * Layer order (back to front):
 *   1. deep navy base
 *   2. animated procedural shader (hero only — GPU, OGL)
 *   3. volumetric cyan/blue glows, huge blur, very low opacity
 *   4. engineering grid, barely visible, fades at edges
 *   5. noise texture, 1-2%, breaks up banding
 *   6. center illumination halo behind the heading (hero only)
 *   7. bottom fade into the next section
 */

type AmbientBackgroundProps = {
  /** "hero" mounts the WebGL flow-field shader and the full atmosphere. "section" is a quiet CSS-only version. */
  variant?: "hero" | "section"
  className?: string
}

export function AmbientBackground({
  variant = "section",
  className = "",
}: AmbientBackgroundProps) {
  const isHero = variant === "hero"

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* 1 — deep navy base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #030712 0%, #050b16 38%, #07121f 72%, #081827 100%)",
        }}
      />

      {/* 2 — animated procedural shader (hero only) */}
      {isHero && <FlowFieldCanvas className="opacity-100" />}

      {/* 3 — volumetric glows: huge blur radius, very low opacity, no hard edges */}
      <div
        className="absolute -top-1/4 left-1/2 h-[82vw] w-[82vw] max-h-[820px] max-w-[820px] -translate-x-1/2 rounded-full animate-glow-pulse"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, #3b82f6 22%, transparent) 0%, transparent 68%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute left-[6%] top-[18%] h-[46vw] w-[46vw] max-h-[560px] max-w-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, #06b6d4 18%, transparent) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute right-[4%] top-[28%] h-[48vw] w-[48vw] max-h-[560px] max-w-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, #3b82f6 16%, transparent) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* 4 — engineering grid, barely visible, fades near edges */}
      <div
        className="absolute inset-0 bg-grid-fade"
        style={{ opacity: isHero ? 0.1 : 0.06 }}
      />

      {/* 5 — noise texture, just enough to prevent banding */}
      <div className="absolute inset-0 bg-noise" style={{ opacity: 0.02 }} />

      {/* 6 — center illumination behind the heading */}
      {isHero && (
        <div
          className="absolute left-1/2 top-[14%] h-[38vw] w-[62vw] max-h-[420px] max-w-[900px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, color-mix(in oklab, #38bdf8 18%, transparent) 0%, transparent 78%)",
            filter: "blur(60px)",
          }}
        />
      )}

      {/* 7 — bottom fade into the next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-56"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--surface-1))",
        }}
      />
    </div>
  )
}