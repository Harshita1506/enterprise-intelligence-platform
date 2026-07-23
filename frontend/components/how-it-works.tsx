import { Upload, BrainCircuit, Target, ArrowRight } from "lucide-react"
import { AmbientBackground } from "@/components/backgrounds/ambient-background"

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload enterprise documents",
    description:
      "Add project documents, meeting notes, client requirements, and sprint updates, or connect the tools your teams already use. Access stays governed by role.",
  },
  {
    icon: BrainCircuit,
    step: "02",
    title: "AI analyzes organizational knowledge",
    description:
      "Specialized agents index and cross-reference your content, building a connected view of projects, decisions, and how work moves across the organization.",
  },
  {
    icon: Target,
    step: "03",
    title: "Generate actionable project intelligence",
    description:
      "Search across everything, receive project summaries and risk alerts, and get the insights managers need to keep delivery on track.",
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 overflow-hidden py-20 md:py-28"
    >
      <AmbientBackground variant="section" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-accent">How it works</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            From scattered knowledge to strategic clarity
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            A simple, secure workflow that turns your organization&apos;s
            information into intelligence your teams can act on.
          </p>
        </div>

        <div className="mt-14 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {steps.map((step, index) => (
            <div key={step.step} className="contents">
              <div className="glass-panel relative rounded-2xl p-7 transition-colors hover:border-accent/30">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-accent-2">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-sm text-muted-foreground">
                    {step.step}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="flex items-center justify-center py-1 md:py-0">
                  <span className="glass-panel glow-border-cyan flex h-9 w-9 items-center justify-center rounded-full text-accent-2 md:rotate-0">
                    <ArrowRight className="h-4 w-4 rotate-90 md:rotate-0" />
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}