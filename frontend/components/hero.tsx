import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export function Hero() {
  return (
    <section
      id="platform"
      className="relative scroll-mt-24 overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20"
    >
      {/* Ambient background */}
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
      </div>
    </section>
  )
}