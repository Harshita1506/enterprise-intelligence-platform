import Link from "next/link"
import Image from "next/image"
const columns = [
  {
    title: "Platform",
    links: [
      { label: "AI Companion", href: "/portal/companion" },
      { label: "Projects", href: "/portal/projects" },
      { label: "Knowledge Base", href: "/portal/knowledge" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Enterprise Intelligence Platform", href: "/" },
      { label: "Internship Project", href: "/" },
    ],
  },
  {
    title: "Code",
    links: [
      { label: "GitHub", href: "https://github.com/Harshita1506/enterprise-intelligence-platform" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer id="footer" className="scroll-mt-24 border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_2fr]">
          <div>
            {/* Branding: replace the logo mark below with the official InterraIT logo when available */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                 src="/company_logo.png"
                 alt="InterraIT"
                 width={90}
                 height={22}
                 priority
               />

             <span className="text-[11px] font-medium text-muted-foreground">
               Enterprise Intelligence Platform
             </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              An enterprise intelligence platform that centralizes organizational
              knowledge and turns it into actionable project insights. Built as an
              internship project at InterraIT.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h4 className="text-sm font-semibold text-foreground">
                  {column.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} InterraIT · Enterprise Intelligence Platform
          </p>
          <p className="text-xs text-muted-foreground">
            Internship Project · For demonstration purposes
          </p>
        </div>
      </div>
    </footer>
  )
}
