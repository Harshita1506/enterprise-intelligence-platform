import type { Metadata } from "next"
import { Database } from "lucide-react"
import { KnowledgeBase } from "@/components/knowledge/knowledge-base"

export const metadata: Metadata = {
  title: "Knowledge Base — Enterprise Intelligence Platform",
  description:
    "Browse the indexed documents and sources that ground the platform's enterprise intelligence.",
}

const API_BASE = "http://127.0.0.1:8000"

export type KnowledgeDocument = {
  id: string
  project_id: string
  document_type: string
  source: string
}

async function getKnowledgeDocuments(): Promise<KnowledgeDocument[]> {
  try {
    const response = await fetch(`${API_BASE}/api/knowledge-base`, {
      cache: "no-store",
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    return data.data.documents ?? []
  } catch (error) {
    console.error("Failed to fetch knowledge base:", error)
    return []
  }
}

export default async function KnowledgePage() {
  const documents = await getKnowledgeDocuments()

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Database className="h-3.5 w-3.5" />
            Knowledge base
          </div>

          <h1 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Knowledge Base
          </h1>

          <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            The indexed documents and sources that ground every AI response across
            the platform.
          </p>
        </div>

        <div className="flex flex-col">
          <span className="text-lg font-semibold tracking-tight text-foreground">
            {documents.length}
          </span>

          <span className="text-xs text-muted-foreground">
            Indexed documents
          </span>
        </div>
      </div>

      <KnowledgeBase documents={documents} />
    </div>
  )
}