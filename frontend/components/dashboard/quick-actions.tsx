import Link from "next/link"
import {
  Bot,
  FolderKanban,
  FileAudio,
  ShieldAlert,
  Lightbulb,
  Database,
  type LucideIcon,
} from "lucide-react"

type Action = {
  icon: LucideIcon
  title: string
  description: string
  href: string
}

const actions: Action[] = [
  {
    icon: Bot,
    title: "Enterprise Agent",
    description: "Ask questions across your organization's knowledge.",
    href: "/portal/companion",
  },
  {
    icon: FolderKanban,
    title: "Project Intelligence",
    description: "Summaries of status, blockers, and progress.",
    href: "/portal/companion?prompt=Summarize%20Project%20Alpha",
  },
  {
    icon: FileAudio,
    title: "Meeting Summarizer",
    description: "Turn meetings into summaries and action items.",
    href: "/portal/companion?prompt=Summarize%20latest%20meeting",
  },
  {
    icon: ShieldAlert,
    title: "Risk Analysis",
    description: "Surface operational and delivery risks early.",
    href: "/portal/companion?prompt=Analyze%20current%20project%20risks",
  },
  {
    icon: Lightbulb,
    title: "Strategic Insights",
    description: "Forward-looking recommendations for leadership.",
    href: "/portal/companion?prompt=Generate%20strategic%20insights",
  },
  {
    icon: Database,
    title: "Knowledge Search",
    description: "Search the indexed knowledge base.",
    href: "/portal/companion?prompt=Search%20the%20knowledge%20base",
  },
]

export function QuickActions() {
  return (
    <section aria-labelledby="quick-actions-heading">
      <h2
        id="quick-actions-heading"
        className="text-sm font-semibold tracking-tight text-foreground"
      >
        Quick actions
      </h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="group rounded-xl border border-border bg-card/60 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background/60 text-primary transition-colors group-hover:border-primary/40 group-hover:text-accent">
              <action.icon className="h-4 w-4" />
            </span>
            <h3 className="mt-3 text-sm font-medium text-foreground">
              {action.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {action.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
