import { CheckCircle2 } from "lucide-react"

const statuses = [
  { label: "Groq", value: "Connected" },
  { label: "Knowledge Base", value: "Indexed" },
  { label: "LangGraph", value: "Ready" },
  { label: "Last sync", value: "12 min ago" },
]

export function PlatformStatus() {
  return (
    <section aria-labelledby="platform-status-heading">
      <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <h2
            id="platform-status-heading"
            className="text-sm font-medium text-foreground"
          >
            AI platform status
          </h2>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
          {statuses.map((status) => (
            <div key={status.label} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-muted-foreground">{status.label}</span>
                <span className="text-xs font-medium text-foreground/90">
                  {status.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
