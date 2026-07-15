import type { Metadata } from "next"
import { FolderKanban, Plus, Upload, Database } from "lucide-react"
import { ProjectsToolbar } from "@/components/projects/projects-toolbar"
import { ProjectCard } from "@/components/projects/project-card"
import { projects } from "@/lib/projects-data"

export const metadata: Metadata = {
  title: "Projects — Enterprise Intelligence Platform",
  description:
    "Manage enterprise projects and access project intelligence. Track status, progress, knowledge documents, and AI-generated summaries.",
}

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <FolderKanban className="h-3.5 w-3.5" />
          Projects
        </div>
        <h1 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Projects
        </h1>
        <p className="mt-1.5 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
          Open a project to access its workspace, documents, and AI insights.
        </p>
      </div>

      {/* Toolbar */}
      <ProjectsToolbar />

      {/* Grid or empty state */}
      {projects.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}

function EmptyState() {
  const actions = [
    { icon: Plus, title: "Create Project", description: "Start a new enterprise project workspace." },
    { icon: Upload, title: "Upload Documents", description: "Add documents to power project intelligence." },
    { icon: Database, title: "Import Knowledge", description: "Connect existing knowledge sources." },
  ]
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-14 text-center backdrop-blur">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <FolderKanban className="h-6 w-6" />
      </span>
      <h2 className="mt-4 text-balance text-lg font-semibold tracking-tight text-foreground">
        No projects yet
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
        Create your first project or bring in existing knowledge to start generating
        enterprise project intelligence.
      </p>
      <div className="mx-auto mt-6 grid max-w-2xl gap-3 sm:grid-cols-3">
        {actions.map((action) => (
          <button
            key={action.title}
            type="button"
            className="group rounded-xl border border-border bg-card/60 p-4 text-left backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background/60 text-primary">
              <action.icon className="h-4 w-4" />
            </span>
            <h3 className="mt-3 text-sm font-medium text-foreground">{action.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
