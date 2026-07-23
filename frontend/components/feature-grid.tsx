import {
  Search,
  LayoutDashboard,
  ShieldAlert,
  Lightbulb,
  Database,
  BarChart3,
} from "lucide-react"

const features = [
  {
    label: "AI Retrieval",
    icon: Search,
    title: "Enterprise Search",
    description:
      "Instantly retrieve answers from enterprise documents and connected knowledge bases.",
  },
  {
    label: "Data Synthesis",
    icon: LayoutDashboard,
    title: "Project Insights",
    description:
      "Automatically summarize project status and blockers into a single source of truth.",
  },
  {
    label: "Proactive Oversight",
    icon: ShieldAlert,
    title: "Risk Analysis",
    description:
      "Surface operational and compliance risks early with AI monitoring.",
  },
  {
    label: "Decision Support",
    icon: Lightbulb,
    title: "Strategic Insights",
    description:
      "Turn raw data into forward-looking recommendations for leadership.",
  },
  {
    label: "Infrastructure",
    icon: Database,
    title: "Knowledge Hub",
    description:
      "Centralize institutional knowledge into a secure, continuously indexed layer.",
  },
  {
    label: "Automation",
    icon: BarChart3,
    title: "Executive Reporting",
    description:
      "Generate board-ready briefings and metrics tailored to each stakeholder.",
  },
]

export function FeatureGrid() {
  return (
    <section id="features" className="relative scroll-mt-24 py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 40% at 50% 0%, color-mix(in oklab, #06b6d4 8%, transparent), transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-accent">Capabilities</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            One platform for every layer of enterprise intelligence
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Purpose-built AI agents work across your knowledge base to deliver
            answers, oversight, and strategy in one governed workspace.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-panel group relative overflow-hidden rounded-2xl p-8 transition-colors duration-300 hover:border-accent/30 hover:bg-white/[0.04]"
            >
              {/* Softer glow: lowered to 6% opacity to prevent washing out the card */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/[0.06] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* Increased icon container size (h-12 w-12) */}
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-accent-2 transition-colors group-hover:border-accent/40 group-hover:text-accent">
                <feature.icon className="h-5 w-5" />
              </div>

              {/* Increased vertical spacing (mt-6) and introduced capability labels */}
              <div className="relative mt-6 flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                  {feature.label}
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h3>
              </div>

              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}