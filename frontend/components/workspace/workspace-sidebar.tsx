"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"
import { navSections } from "@/components/workspace/navigation"
import { cn } from "@/lib/utils"

function isActive(pathname: string, href: string) {
  if (href === "/portal") return pathname === "/portal"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function WorkspaceSidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
          <Link href="/" className="flex items-center gap-2.5">
            <span
              aria-label="InterraIT logo"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold tracking-tight text-primary-foreground"
            >
              iT
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
                InterraIT
              </span>
              <span className="mt-0.5 text-[11px] font-medium text-muted-foreground">
                Intelligence Platform
              </span>
            </span>
          </Link>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {navSections.map((section) => (
            <div key={section.label} className="mb-6 last:mb-0">
              <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {section.label}
              </p>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                          active
                            ? "bg-sidebar-accent font-medium text-sidebar-foreground"
                            : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition-colors",
                            active
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-sidebar-foreground",
                          )}
                        />
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>


      </aside>
    </>
  )
}
