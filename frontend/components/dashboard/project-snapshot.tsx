import Link from "next/link"

type ProjectStatus = "on-track" | "at-risk" | "delayed"

type Project = {
  name: string
  status: ProjectStatus
  progress: number
  updated: string
  href: string
}

const statusConfig: Record<ProjectStatus, { label: string; dot: string; text: string }> = {
  "on-track": {
    label: "On track",
    dot: "bg-primary",
    text: "text-primary",
  },
  "at-risk": {
    label: "At risk",
    dot: "bg-accent",
    text: "text-accent",
  },
  delayed: {
    label: "Delayed",
    dot: "bg-destructive",
    text: "text-destructive",
  },
}

const projects: Project[] = [
  {
    name: "Platform Migration",
    status: "on-track",
    progress: 78,
    updated: "Updated 2h ago",
    href: "/portal/projects",
  },
  {
    name: "Sprint Alpha",
    status: "delayed",
    progress: 42,
    updated: "Updated 40m ago",
    href: "/portal/projects",
  },
  {
    name: "Vendor Renewal",
    status: "at-risk",
    progress: 60,
    updated: "Updated 1d ago",
    href: "/portal/projects",
  },
]

export function ProjectSnapshot() {
  return (
    <section aria-labelledby="project-snapshot-heading">
      <h2
        id="project-snapshot-heading"
        className="text-sm font-semibold tracking-tight text-foreground"
      >
        Project snapshot
      </h2>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {projects.map((project) => {
          const status = statusConfig[project.status]
          return (
            <Link
              key={project.name}
              href={project.href}
              className="group rounded-xl border border-border bg-card/60 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-medium text-foreground">
                  {project.name}
                </h3>
                <span className={`flex items-center gap-1.5 text-xs font-medium ${status.text}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground/90">
                    {project.progress}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${status.dot}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">{project.updated}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
