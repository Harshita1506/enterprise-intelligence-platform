import type { Metadata } from "next"
import { Database } from "lucide-react"
import { KnowledgeBase } from "@/components/knowledge/knowledge-base"
import { knowledgeDocuments } from "@/lib/knowledge-data"

export const metadata: Metadata = {
  title: "Knowledge Base — Enterprise Intelligence Platform",
  description:
    "Browse and search the indexed documents and sources that ground the platform's enterprise intelligence.",
}

export default function KnowledgePage() {
  const indexed = knowledgeDocuments.filter((d) => d.status === "indexed").length

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
            The indexed documents and sources that ground every AI response across the
            platform.
          </p>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold tracking-tight text-foreground">
            {indexed}
          </span>
          <span className="text-xs text-muted-foreground">Indexed documents</span>
        </div>
      </div>

      <KnowledgeBase />
    </div>
  )
}
