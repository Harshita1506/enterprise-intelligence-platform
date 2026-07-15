import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, FileText, Clock, Sparkles, Construction } from "lucide-react"
import { StatusBadge } from "@/components/workspace/status-badge"
import { projects, previewSections } from "@/lib/projects-data"

type Params = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  return {
    title: project
      ? `${project.name} — Projects`
      : "Project — Enterprise Intelligence Platform",
  }
}

export default async function ProjectDetailPage({ params }: Params) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) notFound()

  return (
    <div className="space-y-8">
      <Link
        href="/portal/projects"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {project.name}
          </h1>
          <StatusBadge status={project.status} />
        </div>
        <p className="mt-2 text-muted-foreground">{project.client}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="rounded-md border border-border bg-background/60 px-2 py-0.5 text-xs font-medium">
            {project.type}
          </span>
          <span className="rounded-md border border-border bg-background/60 px-2 py-0.5 text-xs font-medium">
            {project.priority} priority
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            {project.documents} documents
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            Updated {project.lastModified}
          </span>
        </div>
      </div>

      {/* Progress + last summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall progress</span>
            <span className="font-medium text-foreground/90">{project.progress}%</span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur md:col-span-2">
          <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Last AI summary
          </div>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            {project.lastSummary}
          </p>
        </div>
      </div>

      {/* Workspace sections (preview / coming soon) */}
      <section aria-labelledby="workspace-sections-heading">
        <h2
          id="workspace-sections-heading"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          Workspace sections
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {previewSections.map((section) => (
            <div
              key={section.title}
              className="rounded-xl border border-border bg-card/60 p-4 backdrop-blur"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background/60 text-primary">
                <section.icon className="h-4 w-4" />
              </span>
              <h3 className="mt-3 text-sm font-medium text-foreground">{section.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Coming soon note */}
      <div className="flex items-start gap-3 rounded-2xl border border-dashed border-border bg-card/40 p-5 backdrop-blur">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <Construction className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-medium text-foreground">Full project workspace coming soon</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Meeting notes, requirements, knowledge documents, AI insights, risks, and the
            activity timeline will open here once the workspace is connected.
          </p>
        </div>
      </div>
    </div>
  )
}
