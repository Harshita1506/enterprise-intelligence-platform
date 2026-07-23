import { X, Check, ArrowRight, FileWarning, Sparkles } from "lucide-react"
import { AmbientBackground } from "@/components/backgrounds/ambient-background"

const challenges = [
  "Meeting notes scattered",
  "Requirements disconnected",
  "Project status unclear",
  "Knowledge trapped in silos",
]

const solutions = [
  "Unified knowledge",
  "AI contextual search",
  "Project intelligence",
  "Strategic recommendations",
]

export function EnterpriseChallenges() {
  return (
    <section
      id="challenges"
      className="relative scroll-mt-24 overflow-hidden py-20 md:py-28"
    >
      <AmbientBackground variant="section" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-accent">The problem</span>

          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            The Hidden Cost of Fragmented Knowledge
          </h2>

          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Organizations lose valuable time because project knowledge is
            scattered across documents, meetings, and multiple tools.
          </p>
        </div>

        <div className="mt-16 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          
          {/* Challenges: Today's Enterprise (Darker, Flatter, Subdued) */}
          <div className="rounded-2xl border border-white/[0.04] bg-white/[0.01] p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.02] text-muted-foreground">
                <FileWarning className="h-5 w-5" />
              </span>

              <h3 className="text-lg font-semibold tracking-tight text-foreground/80">
                Today's Enterprise
              </h3>
            </div>

            <ul className="mt-6 space-y-3">
              {challenges.map((item) => (
                <li
                  key={item}
                  className="group flex items-center gap-3 rounded-xl border border-transparent px-4 py-3 transition-colors hover:border-white/[0.06] hover:bg-white/[0.02]"
                >
                  <X className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                  <span className="text-sm leading-relaxed text-muted-foreground/80">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connector (Clean and minimal) */}
          <div className="flex items-center justify-center">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full">
              <div className="glass-panel glow-border-cyan relative flex h-full w-full items-center justify-center rounded-full bg-[#050b16] text-cyan-400 z-10">
                <ArrowRight className="h-6 w-6 rotate-90 lg:rotate-0" />
              </div>
            </div>
          </div>

          {/* Solutions: AI-Powered Workspace (Brighter, Elevated, Glowing) */}
          <div className="glass-panel-strong relative rounded-2xl p-8 shadow-[0_0_40px_-10px_rgba(59,130,246,0.15)] ring-1 ring-white/10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                background:
                  "radial-gradient(70% 60% at 50% 0%, color-mix(in oklab, #3b82f6 14%, transparent), transparent 70%)",
              }}
            />

            <div className="relative flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 shadow-[0_0_12px_-4px_rgba(59,130,246,0.22)]">
                <Sparkles className="h-5 w-5" />
              </span>

              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                AI-Powered Workspace
              </h3>
            </div>

            <ul className="relative mt-6 space-y-3">
              {solutions.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-transparent px-4 py-3 transition-all hover:border-blue-500/20 hover:bg-white/[0.04] hover:shadow-sm"
                >
                  <Check className="h-4 w-4 shrink-0 text-cyan-400" />
                  <span className="text-sm font-medium leading-relaxed text-foreground/90">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}