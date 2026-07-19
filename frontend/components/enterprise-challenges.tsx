import { X, Check, ArrowRight, FileWarning, Sparkles } from "lucide-react"

const challenges = [
  "Meeting notes scattered across emails",
  "Project updates buried inside documents",
  "Teams spend hours searching for information",
  "Managers struggle to track project progress",
  "Decisions stall because information is fragmented",
]

const solutions = [
  "Centralized enterprise knowledge",
  "AI-powered enterprise search",
  "Automated project summaries",
  "Intelligent risk detection",
  "Strategic insights for management",
  "Faster, more confident decision making",
]

export function EnterpriseChallenges() {
  return (
    <section
      id="challenges"
      className="relative scroll-mt-24 overflow-hidden border-y border-border bg-card/20 py-20 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(50% 40% at 80% 10%, oklch(0.72 0.13 210 / 0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-accent">The problem</span>

          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Enterprise Challenges
          </h2>

          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Organizations lose valuable time because project knowledge is
            scattered across documents, meetings, and multiple tools.
          </p>
        </div>

        <div className="mt-16 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">

          {/* Challenges */}
          <div className="rounded-2xl border border-destructive/25 bg-card/60 p-6 backdrop-blur md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/15 text-destructive">
                <FileWarning className="h-5 w-5" />
              </span>

              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                Common Challenges
              </h3>
            </div>

            <ul className="mt-6 space-y-3">
              {challenges.map((item) => (
                <li
                  key={item}
                  className="group flex items-start gap-3 rounded-lg border border-border/60 bg-background/50 px-4 py-3 hover:border-destructive/40 transition-colors"
                >
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />

                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connector */}
          <div className="flex items-center justify-center">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
              <ArrowRight className="h-6 w-6 rotate-90 lg:rotate-0" />
            </div>
          </div>

          {/* Solutions */}
          <div className="relative rounded-2xl border border-primary/30 bg-card/70 p-6 backdrop-blur md:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                background:
                  "radial-gradient(70% 60% at 50% 0%, oklch(0.65 0.15 235 / 0.1), transparent 70%)",
              }}
            />

            <div className="relative flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Sparkles className="h-5 w-5" />
              </span>

              <h3 className="text-base font-semibold leading-tight tracking-tight text-foreground">
                How the Enterprise Intelligence Platform solves this
              </h3>
            </div>

            <ul className="relative mt-6 space-y-3">
              {solutions.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/50 px-4 py-3 hover:border-primary/50 hover:bg-background/70 transition-colors"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                  <span className="text-sm leading-relaxed text-foreground/90">
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