import { Clock, TrendingDown, FileUp, RefreshCw } from "lucide-react"

const updates = [
  {
    icon: TrendingDown,
    text: "Sprint Alpha is behind schedule.",
  },
  {
    icon: FileUp,
    text: "New client requirements were uploaded.",
  },
  {
    icon: RefreshCw,
    text: "Vendor renewal requires review.",
  },
]

export function WorkspaceBrief() {
  return (
    <section aria-labelledby="workspace-brief-heading">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        Today&apos;s workspace brief
      </div>

      <h1
        id="workspace-brief-heading"
        className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
      >
        Good morning, Harshita.
      </h1>
      <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
        3 important updates require your attention today.
      </p>

      <ul className="mt-5 space-y-2.5">
        {updates.map((update) => (
          <li key={update.text} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-card/60 text-primary">
              <update.icon className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm leading-relaxed text-foreground/90">
              {update.text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
