"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

const navLinks = [
  { label: "Challenges", href: "#challenges" },
  { label: "Capabilities", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative border-b border-white/[0.06] bg-[color-mix(in_oklab,var(--surface-1)_78%,transparent)] backdrop-blur-xl">
        {/* subtle bottom glow line */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, #38bdf8 45%, transparent), transparent)",
          }}
        />

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex flex-col justify-center py-1">
            <Image
              src="/company_logo.png"
              alt="InterraIT"
              width={105}
              height={30}
              priority
              className="object-contain"
            />
            <span className="-mt-4 text-[10px] font-medium text-muted-foreground/80">
              Enterprise Intelligence Platform
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-accent to-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/portal"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
            <Link
              href="/portal"
              className={buttonVariants({
                className: "group h-9 px-4 text-sm",
              })}
            >
              Launch Workspace
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((v) => !v)}
            className="glass-panel flex h-9 w-9 items-center justify-center rounded-lg text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-white/[0.06] bg-[color-mix(in_oklab,var(--surface-1)_92%,transparent)] px-6 py-4 backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/portal"
                onClick={() => setOpen(false)}
                className={buttonVariants({ className: "mt-2 w-full text-sm" })}
              >
                Launch Workspace
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}