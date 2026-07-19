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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Branding: replace the logo mark below with the official InterraIT logo when available */}
        <Link href="/" className="flex flex-col justify-center py-1">
  <Image
  src="/company_logo.png"
  alt="InterraIT"
  width={105}
  height={30}
  priority
  className="object-contain"
/>

  <span className="-mt-4 text-[10px] font-medium text-muted-foreground">
    Enterprise Intelligence Platform
  </span>
</Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
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
            Open Workspace
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 px-6 py-4 md:hidden">
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
              className={buttonVariants({ className: "mt-2 h-10 w-full text-sm" })}
            >
              Open Workspace
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
