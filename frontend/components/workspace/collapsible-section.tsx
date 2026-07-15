"use client"

import { useState } from "react"
import { ChevronDown, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function CollapsibleSection({
  icon: Icon,
  title,
  meta,
  defaultOpen = false,
  children,
}: {
  icon?: LucideIcon
  title: string
  meta?: React.ReactNode
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="rounded-xl border border-border bg-card/60 backdrop-blur">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2.5 px-4 py-3 text-left transition-colors hover:bg-muted/40"
      >
        {Icon ? (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-background/60 text-primary">
            <Icon className="h-3.5 w-3.5" />
          </span>
        ) : null}
        <span className="flex-1 text-sm font-medium text-foreground">{title}</span>
        {meta ? (
          <span className="text-xs font-medium text-muted-foreground">{meta}</span>
        ) : null}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? (
        <div className="border-t border-border px-4 py-3.5">{children}</div>
      ) : null}
    </div>
  )
}
