import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export function Hero() {
  return (
    <section
      id="platform"
      className="relative isolate scroll-mt-24 overflow-hidden pt-32 pb-24 md:pt-40 md:pb-28"
    >
      {/* Animated Gradient Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Blob 1 */}
        <div className="absolute left-[-10%] top-[-15%] h-[44rem] w-[44rem] animate-blob rounded-full bg-cyan-500/6 blur-[120px]" />

        {/* Blob 2 */}
        <div className="animation-delay-4000 absolute right-[-10%] top-[15%] h-[32rem] w-[32rem] animate-blob-fast rounded-full bg-blue-500/5 blur-[120px]" />

        {/* Blob 3 */}
        <div className="animation-delay-8000 absolute bottom-[-20%] left-[35%] h-[26rem] w-[26rem] animate-blob-slow rounded-full bg-indigo-500/5 blur-[140px]" />
      </div>

      {/* Noise Layer */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.015] mix-blend-soft-light" />

      {/* Vignette Overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at center, transparent 45%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      {/* Grid Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(1 0 0 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(circle at center, black 35%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-[56rem] text-center">
          
          <div className="relative inline-flex animate-fade-up items-center justify-center opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
            {/* Floating Glow Behind Badge */}
            <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-2xl" />
            <span className="relative inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              AI intelligence for the modern enterprise
            </span>
          </div>

          <h1 className="mt-6 animate-fade-up text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground opacity-0 [animation-delay:250ms] [animation-fill-mode:forwards] sm:text-5xl md:text-6xl">
            Enterprise Intelligence Platform
          </h1>

          <p className="mt-5 animate-fade-up text-balance text-xl font-medium text-foreground/90 opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards] md:text-2xl">
            One intelligent workspace for enterprise knowledge, project
            visibility, and better decisions.
          </p>

          <p className="mx-auto mt-5 max-w-2xl animate-fade-up text-pretty leading-relaxed text-muted-foreground opacity-0 [animation-delay:550ms] [animation-fill-mode:forwards]">
            Bring together project documents, meeting notes, client requirements,
            sprint updates, and organizational knowledge into one intelligent
            workspace. Instantly search information, generate summaries, detect
            risks, and uncover strategic insights using specialized AI agents.
          </p>

          <div className="mt-8 flex animate-fade-up flex-col items-center justify-center gap-3 opacity-0 [animation-delay:700ms] [animation-fill-mode:forwards] sm:flex-row">
            <Link
              href="/portal"
              className={buttonVariants({
                className:
                  "group h-12 w-full px-7 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:w-auto",
              })}
            >
              Open Workspace
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <a
              href="#features"
              className={buttonVariants({
                variant: "outline",
                className:
                  "h-12 w-full px-7 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted sm:w-auto",
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