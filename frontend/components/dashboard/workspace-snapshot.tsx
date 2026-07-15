import Link from "next/link"
import { FolderKanban, Database, Lightbulb, ArrowRight, type LucideIcon } from "lucide-react"

type SnapshotCard = {
  icon: LucideIcon
  title: string
  lines: { label: string; value: string }[]
  cta: { label: string; href: string }
}

const cards: SnapshotCard[] = [
  {
    icon: FolderKanban,
    title: "Projects",
    lines: [
      { label: "Active projects", value: "3 in progress" },
      { label: "Needs attention", value: "1 project" },
    ],
    cta: { label: "Open Projects", href: "/portal/projects" },
  },
  {
    icon: Database,
    title: "Knowledge Base",
    lines: [
      { label: "Last indexed", value: "12 minutes ago" },
      { label: "Documents available", value: "Ready to search" },
    ],
    cta: { label: "Manage Knowledge", href: "/portal/knowledge" },
  },
  {
    icon: Lightbulb,
    title: "AI Intelligence",
    lines: [
      { label: "New insights", value: "Generated today" },
      { label: "Status", value: "Awaiting review" },
    ],
    cta: { label: "Review Insights", href: "/portal/insights" },
  },
]

export function WorkspaceSnapshot() {
  return (
    <section aria-labelledby="workspace-snapshot-heading">
      <h2
        id="workspace-snapshot-heading"
        className="text-sm font-semibold tracking-tight text-foreground"
      >
        Workspace snapshot
      </h2>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col rounded-xl border border-border bg-card/60 p-5 backdrop-blur"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <card.icon className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-medium text-foreground">{card.title}</h3>
            </div>

            <dl className="mt-4 space-y-2">
              {card.lines.map((line) => (
                <div key={line.label} className="flex items-center justify-between gap-3">
                  <dt className="text-xs text-muted-foreground">{line.label}</dt>
                  <dd className="text-xs font-medium text-foreground/90">{line.value}</dd>
                </div>
              ))}
            </dl>

            <Link
              href={card.cta.href}
              className="group mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-accent"
            >
              {card.cta.label}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
