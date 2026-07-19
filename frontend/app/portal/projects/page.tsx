import type { Metadata } from "next"
import { FolderKanban } from "lucide-react"

import { ProjectsToolbar } from "@/components/projects/projects-toolbar"
import { ProjectCard } from "@/components/projects/project-card"
import { get } from "@/lib/api"

export const metadata: Metadata = {
  title: "Projects — Enterprise Intelligence Platform",
}

export default async function ProjectsPage() {
  let projects = []

  try {
    const response = await get("/api/projects")

    const apiProjects = response.data.projects || []

    projects = apiProjects.map((project: any) => ({
      id: project.project_id,
      name: project.project_name,
      client: "Enterprise Project",
      type: "AI Initiative",
      priority: "Medium",
      status:
        project.status === "Active"
          ? "healthy"
          : project.status === "Completed"
          ? "completed"
          : "needs-review",
      progress: 100,
      documents: project.documents,
      recentUpdate: "",
      lastSummary: project.summary,
      lastModified: "Just now",
    }))
  } catch (err) {
    console.error(err)
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <FolderKanban className="h-3.5 w-3.5" />
          Projects
        </div>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Projects
        </h1>

        <p className="mt-1.5 text-sm text-muted-foreground">
          Open a project to access its workspace, documents, and AI insights.
        </p>
      </div>

      <ProjectsToolbar />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project: any) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </div>
  )
}