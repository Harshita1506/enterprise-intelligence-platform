import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  FileText,
  Sparkles,
  ShieldAlert,
  ListTodo,
  CheckCircle2
} from "lucide-react"
import { StatusBadge } from "@/components/workspace/status-badge"
import { UploadDocument } from "@/components/projects/upload-document"
import { get } from "@/lib/api"

type Params = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params

  try {
    const response = await get(`/api/projects/${id}`)
    const project = response.data

    return {
      title: `${project.project_name || 'Project'} — Projects`,
    }
  } catch {
    return {
      title: "Project",
    }
  }
}

export default async function ProjectDetailPage({ params }: Params) {
  const { id } = await params
  let project = null

  try {
    const response = await get(`/api/projects/${id}`)
    project = response.data
  } catch (error) {
    console.error("Failed to fetch project:", error)
  }

  // STABLE FALLBACK: Prevents the 404 crash
  if (!project) {
    return (
      <div className="space-y-6">
        <Link
          href="/portal/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <div className="rounded-xl border border-border bg-card p-8">
          <h1 className="text-xl font-semibold text-foreground">Project unavailable</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The project could not be loaded. We tried looking for ID: <strong>{id}</strong>. 
            Please verify that the backend is running and this project exists in your database.
          </p>
        </div>
      </div>
    )
  }

  // Map backend response to frontend requirements
  // Note: client, type, priority, and lastModified are temporary display values
  project = {
    ...project,
    name: project.project_name,
    client: "Enterprise Project",
    type: "AI Initiative",
    priority: "Medium",
    progress: 100,
    lastSummary: project.summary,
    
    status:
      project.status === "Active"
        ? "healthy"
        : "needs-review",
    risks: project.risks || [],
    actionItems: project.action_items || [],
  }

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
        </div>
      </div> {/* <-- ADDED MISSING CLOSING DIV HERE */}

      {/* Statistics + Executive Summary */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Statistics */}
        <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
          <h3 className="text-sm font-semibold text-foreground">
            Project Statistics
          </h3>
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Documents
              </span>
              <span className="text-lg font-semibold">
                {project.documents}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Knowledge Chunks
              </span>
              <span className="text-lg font-semibold">
                {project.chunks}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Status
              </span>
              <span className="text-lg font-semibold capitalize">
                {project.status.replace("-", " ")}
              </span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur lg:col-span-2">
          <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Executive Summary
          </div>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            {project.lastSummary || "Summary unavailable."}
          </p>
        </div>
      </div>

      {/* Upload Document Component */}
      <UploadDocument projectId={project.project_id || id} />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Project Risks */}
        <section aria-labelledby="risks-heading">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-destructive" />
            <h2
              id="risks-heading"
              className="text-sm font-semibold tracking-tight text-foreground"
            >
              Project Risks
            </h2>
          </div>
          
          <div className="mt-4">
            {project.risks.length === 0 ? (
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card/60 p-4 text-sm text-muted-foreground backdrop-blur">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                No significant risks identified.
              </div>
            ) : (
              <div className="grid gap-3">
                {project.risks.map((risk: any, i: number) => (
                  <div key={i} className="rounded-xl border border-border bg-card/60 p-4 backdrop-blur">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-sm font-medium text-foreground">{risk.risk_title || risk.title}</span>
                      <span className="shrink-0 rounded-md border border-destructive/20 bg-destructive/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-destructive">
                        {risk.severity || 'High'}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      <span className="font-semibold text-foreground/80">Recommendation:</span> {risk.recommendation || risk.mitigation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Action Items */}
        <section aria-labelledby="action-items-heading">
          <div className="flex items-center gap-2">
            <ListTodo className="h-4 w-4 text-primary" />
            <h2
              id="action-items-heading"
              className="text-sm font-semibold tracking-tight text-foreground"
            >
              Pending Action Items
            </h2>
          </div>
          
          <div className="mt-4">
            {project.actionItems.length === 0 ? (
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card/60 p-4 text-sm text-muted-foreground backdrop-blur">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                No pending action items.
              </div>
            ) : (
              <div className="grid gap-3">
                {project.actionItems.map((item: any, i: number) => (
                  <div key={i} className="flex flex-col gap-3 rounded-xl border border-border bg-card/60 p-4 backdrop-blur">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 h-4 w-4 shrink-0 rounded-[4px] border border-muted-foreground/40 bg-background/50" />
                      <span className="text-sm font-medium leading-tight text-foreground">{item.task || item.title}</span>
                    </div>
                    <div className="ml-6 flex items-center gap-4 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium text-foreground/70">Owner: </span> 
                        {item.owner || item.assignee || 'Unassigned'}
                      </div>
                      <div>
                        <span className="font-medium text-foreground/70">Status: </span> 
                        {item.status || 'Pending'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}