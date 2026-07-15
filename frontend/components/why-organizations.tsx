import Link from "next/link"
import { Network, LineChart, Clock, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

const reasons = [
  {
    icon: Network,
    title: "Unify scattered knowledge",
    description:
      "Project documents, meeting notes, and updates live across many tools. The platform brings them into one connected, searchable workspace.",
  },
  {
    icon: LineChart,
    title: "Clear project visibility",
    description:
      "Managers see status, progress, and blockers in one place, without chasing updates or piecing information together manually.",
  },
  {
    icon: Clock,
    title: "Less manual effort",
    description:
      "Automated summaries and search reduce the hours teams spend locating information and preparing status updates.",
  },
  {
    icon: TrendingUp,
    title: "Faster decision making",
    description:
      "With fragmented information consolidated and risks surfaced early, leaders can decide sooner and with more confidence.",
  },
]

const outcomes = [
  "Consolidate scattered enterprise knowledge",
  "Give managers clear project visibility",
  "Reduce manual search and reporting effort",
  "Support faster, better-informed decisions",
]

export function WhyOrganizations() {
  return (
    <section id="why" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-sm font-medium text-accent">Why it matters</span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Why organizations need this platform
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Enterprise knowledge is fragmented across tools, teams, and time.
              This platform consolidates it into one intelligent workspace,
              giving teams project visibility and reducing the manual effort
              involved in finding and reporting information.
            </p>

            <ul className="mt-8 space-y-3">
              {outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm leading-relaxed text-foreground/90">
                    {outcome}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/portal"
              className={buttonVariants({
                className: "group mt-8 h-12 px-7 text-sm",
              })}
            >
              Open Workspace
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-colors hover:border-primary/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <reason.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
