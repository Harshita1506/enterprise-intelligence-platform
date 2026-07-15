import Link from "next/link"
import { ArrowRight, Sparkles, ShieldCheck, Activity, FileText } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export function Hero() {
  return (
    <section
      id="platform"
      className="relative scroll-mt-24 overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
    >
      {/* ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, oklch(0.65 0.15 235 / 0.18), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(1 0 0 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(70% 60% at 50% 20%, black, transparent 90%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            AI intelligence for the modern enterprise
          </span>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Enterprise Intelligence Platform
          </h1>

          <p className="mt-5 text-balance text-lg font-medium text-foreground/90 md:text-xl">
            One intelligent workspace for enterprise knowledge, project
            visibility, and better decisions.
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Bring together project documents, meeting notes, client requirements,
            sprint updates, and organizational knowledge into one intelligent
            workspace. Instantly search information, generate summaries, detect
            risks, and uncover strategic insights using specialized AI agents.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/portal"
              className={buttonVariants({
                className: "group h-12 w-full px-7 text-sm sm:w-auto",
              })}
            >
              Open Workspace
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#features"
              className={buttonVariants({
                variant: "outline",
                className: "h-12 w-full px-7 text-sm sm:w-auto",
              })}
            >
              Learn More
            </a>
          </div>
        </div>

        {/* preview panel */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="rounded-2xl border border-border bg-card/60 p-2 shadow-2xl backdrop-blur-xl">
            <div className="rounded-xl border border-border/60 bg-background/80">
              <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-muted" />
                <span className="h-3 w-3 rounded-full bg-muted" />
                <span className="h-3 w-3 rounded-full bg-muted" />
                <span className="ml-3 text-xs text-muted-foreground">
                  intelligence.acme-corp.internal
                </span>
              </div>
              <div className="grid gap-4 p-5 sm:grid-cols-3">
                <PreviewCard
                  icon={<FileText className="h-4 w-4" />}
                  title="Project Summary"
                  body="Q3 Platform migration is 78% complete, tracking 2 days ahead of schedule."
                />
                <PreviewCard
                  icon={<ShieldCheck className="h-4 w-4" />}
                  title="Risk Detected"
                  body="Vendor contract renewal lapses in 14 days across 3 active workstreams."
                  accent
                />
                <PreviewCard
                  icon={<Activity className="h-4 w-4" />}
                  title="Strategic Insight"
                  body="Reallocating support capacity could recover 320 engineering hours per quarter."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PreviewCard({
  icon,
  title,
  body,
  accent,
}: {
  icon: React.ReactNode
  title: string
  body: string
  accent?: boolean
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/60 p-4 text-left">
      <div className="flex items-center gap-2">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-md ${
            accent
              ? "bg-accent/15 text-accent"
              : "bg-primary/15 text-primary"
          }`}
        >
          {icon}
        </span>
        <span className="text-sm font-medium text-foreground">{title}</span>
      </div>
      <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{body}</p>
    </div>
  )
}
