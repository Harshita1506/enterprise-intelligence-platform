import Link from "next/link"
import { ShieldAlert, FileText, ArrowRight, type LucideIcon } from "lucide-react"

type Insight = {
  icon: LucideIcon
  tag: string
  accent: boolean
  title: string
  body: string
  cta: { label: string; href: string }
}

const insights: Insight[] = [
  {
    icon: ShieldAlert,
    tag: "Risk detected",
    accent: true,
    title: "Sprint Alpha delayed",
    body: "Delivery is trending behind plan. The agent identified blocked tasks and dependency slippage across two workstreams.",
    cta: { label: "Review Analysis", href: "/portal/companion" },
  },
  {
    icon: FileText,
    tag: "Knowledge update",
    accent: false,
    title: "Client requirement updated",
    body: "New requirements were ingested for the platform migration. Scope and downstream tasks may be affected.",
    cta: { label: "Generate Impact Analysis", href: "/portal/companion" },
  },
]

export function RecentIntelligence() {
  return (
    <section aria-labelledby="recent-intelligence-heading">
      <h2
        id="recent-intelligence-heading"
        className="text-sm font-semibold tracking-tight text-foreground"
      >
        Recent AI intelligence
      </h2>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {insights.map((insight) => (
          <article
            key={insight.title}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-all duration-300 hover:border-primary/40 hover:bg-card"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(70% 60% at 50% 0%, oklch(0.65 0.15 235 / 0.08), transparent 70%)",
              }}
            />
            <div className="relative">
              <div className="flex items-center gap-2.5">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    insight.accent
                      ? "bg-destructive/15 text-destructive"
                      : "bg-primary/15 text-primary"
                  }`}
                >
                  <insight.icon className="h-4 w-4" />
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {insight.tag}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                {insight.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {insight.body}
              </p>

              <Link
                href={insight.cta.href}
                className="group/cta mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-accent"
              >
                {insight.cta.label}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
