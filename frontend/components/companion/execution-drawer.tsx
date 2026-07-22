"use client"

import { useEffect } from "react"
import { ExecutionInspector, type ExecutionData } from "@/components/companion/execution-inspector"
import { cn } from "@/lib/utils"

export function ExecutionDrawer({
  open,
  onClose,
  data,
}: {
  open: boolean
  onClose: () => void
  data?: ExecutionData
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close execution details"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-50 bg-background/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Slide-over panel */}
      <aside
        role="dialog"
        aria-label="Execution details"
        aria-hidden={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-[400px] flex-col border-l border-border bg-sidebar shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <ExecutionInspector onClose={onClose} data={data} />
      </aside>
    </>
  )
}