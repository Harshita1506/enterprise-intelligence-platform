"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Capabilities", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#footer" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/55 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/45">
      {/* subtle glow */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="group flex flex-col justify-center py-1 transition-opacity duration-300 hover:opacity-90"
        >
          <Image
            src="/company_logo.png"
            alt="InterraIT"
            width={110}
            height={30}
            priority
            className="object-contain"
          />

          <span className="-mt-4 text-[10px] tracking-wide text-muted-foreground">
            Enterprise Intelligence Platform
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {link.label}

              <span className="absolute -bottom-2 left-0 h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-5 md:flex">

          <Link
            href="/portal"
            className="text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            Sign in
          </Link>

          <Link
            href="/portal"
            className={buttonVariants({
              className:
                "group h-11 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-5 text-sm font-medium shadow-[0_0_25px_rgba(14,165,233,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(14,165,233,0.35)]",
            })}
          >
            Open Workspace

            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Menu */}
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-card/40 backdrop-blur md:hidden"
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-white/5 bg-background/90 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col gap-5 px-6 py-6">

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}

            <Link
              href="/portal"
              onClick={() => setOpen(false)}
              className={buttonVariants({
                className:
                  "mt-3 h-11 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-sm",
              })}
            >
              Open Workspace
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}