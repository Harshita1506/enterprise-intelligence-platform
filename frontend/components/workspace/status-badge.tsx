import { cn } from "@/lib/utils"

export type ProjectStatus =
  | "healthy"
  | "at-risk"
  | "needs-review"
  | "completed"
  | "blocked"

type StatusConfig = {
  label: string
  dot: string
  text: string
  ring: string
}

export const statusConfig: Record<ProjectStatus, StatusConfig> = {
  healthy: {
    label: "Healthy",
    dot: "bg-emerald-400",
    text: "text-emerald-300",
    ring: "border-emerald-400/20 bg-emerald-400/10",
  },
  "at-risk": {
    label: "At risk",
    dot: "bg-amber-400",
    text: "text-amber-300",
    ring: "border-amber-400/20 bg-amber-400/10",
  },
  "needs-review": {
    label: "Needs review",
    dot: "bg-sky-400",
    text: "text-sky-300",
    ring: "border-sky-400/20 bg-sky-400/10",
  },
  completed: {
    label: "Completed",
    dot: "bg-primary",
    text: "text-foreground/70",
    ring: "border-border bg-muted/50",
  },
  blocked: {
    label: "Blocked",
    dot: "bg-destructive",
    text: "text-destructive",
    ring: "border-destructive/20 bg-destructive/10",
  },
}

export function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus
  className?: string
}) {
  const config = statusConfig[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.ring,
        config.text,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  )
}
