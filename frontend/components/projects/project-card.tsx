import Link from "next/link"
import { FileText, Sparkles, Clock, ArrowRight } from "lucide-react"
import { StatusBadge } from "@/components/workspace/status-badge"
import type { Project } from "@/lib/projects-data"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/portal/projects/${project.id}`}
      className="group flex flex-col rounded-2xl border border-border bg-card/60 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card"
    >
      {/* Name + client + status */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold tracking-tight text-foreground">
            {project.name}
          </h3>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">{project.client}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground/90">{project.progress}%</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* AI summary — inline, no border box */}
      <div className="mt-4 flex items-start gap-1.5">
        <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {project.lastSummary}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <FileText className="h-3.5 w-3.5" />
            {project.documents} docs
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {project.lastModified}
          </span>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 font-medium text-primary transition-colors group-hover:text-accent">
          Open workspace
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
