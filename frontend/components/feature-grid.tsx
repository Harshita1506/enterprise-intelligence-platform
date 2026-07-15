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
    icon: Search,
    title: "Enterprise Search",
    description:
      "Ask questions in natural language and retrieve precise answers across every document, wiki, and system your organization runs on.",
  },
  {
    icon: LayoutDashboard,
    title: "Project Intelligence",
    description:
      "Automatic summaries of project status, blockers, and progress, synthesized from scattered updates into a single source of truth.",
  },
  {
    icon: ShieldAlert,
    title: "Risk Analysis",
    description:
      "Surface financial, operational, and compliance risks early with AI agents that monitor changes and flag what needs attention.",
  },
  {
    icon: Lightbulb,
    title: "Strategic Insights",
    description:
      "Turn raw knowledge into forward-looking recommendations that help leadership prioritize and allocate resources with confidence.",
  },
  {
    icon: Database,
    title: "Knowledge Management",
    description:
      "Centralize documents, policies, and institutional knowledge into a secure, governed, and continuously indexed intelligence layer.",
  },
  {
    icon: BarChart3,
    title: "Executive Reporting",
    description:
      "Generate board-ready reports and briefings on demand, with extracted action items and metrics tailored to each stakeholder.",
  },
]

export function FeatureGrid() {
  return (
    <section id="features" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
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
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/60 text-primary transition-colors group-hover:border-primary/40 group-hover:text-accent">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
