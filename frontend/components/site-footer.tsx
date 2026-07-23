import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer
      id="footer"
      className="relative border-t border-white/[0.06] bg-[var(--surface-2)]"
    >
      {/* Subtle top border glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, #06b6d4 35%, transparent), transparent)",
        }}
      />

      {/* Increased padding from py-16 to py-20 */}
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col items-start">
          
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/company_logo.png"
              alt="InterraIT"
              width={90}
              height={22}
              priority
              className="object-contain"
            />
            <span className="text-[11px] font-medium text-muted-foreground">
              Enterprise Intelligence Platform
            </span>
          </Link>
          
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            AI-powered enterprise intelligence platform that transforms
            organizational knowledge into actionable project insights. Developed
            during an internship at InterraIT.
          </p>

          <a
            href="https://github.com/Harshita1506/enterprise-intelligence-platform"
            target="_blank"
            rel="noreferrer"
            className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View Source
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* Clean, one-line footer bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} InterraIT
          </p>
          <p className="text-sm text-muted-foreground">
            Built as an Internship Project
          </p>
        </div>
      </div>
    </footer>
  )
}