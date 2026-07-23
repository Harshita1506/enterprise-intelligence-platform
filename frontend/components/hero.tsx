import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { buttonVariants } from "@/components/ui/button-variants"
import { AmbientBackground } from "@/components/backgrounds/ambient-background"

export function Hero() {
  return (
    <section
      id="platform"
      className="relative scroll-mt-24 overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32"
    >
      <AmbientBackground variant="hero" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="glass-panel glow-border-cyan inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            AI-powered Enterprise Intelligence
          </span>

          <h1 className="mt-8 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Enterprise Intelligence{" "}
            <span className="text-gradient-accent">Platform</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-balance text-lg font-medium leading-relaxed text-foreground/90 md:text-xl">
            One intelligent workspace for enterprise knowledge, project
            visibility, and better decisions.
          </p>

          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            Search faster, detect risks earlier, and turn enterprise knowledge
            into actionable intelligence with specialized AI agents.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/portal"
              className={buttonVariants({
                size: "lg",
                className: "group w-full text-sm sm:w-auto",
              })}
            >
              Open Workspace
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <a
              href="#features"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "w-full text-sm sm:w-auto",
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