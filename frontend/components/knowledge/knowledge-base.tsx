"use client"

import Link from "next/link"
import { FileText, FileSpreadsheet, StickyNote } from "lucide-react"

export type KnowledgeDocument = {
  id: string
  project_id: string
  document_type: string
  source: string
}

type Props = {
  documents: KnowledgeDocument[]
}

function DocumentRow({ doc }: { doc: KnowledgeDocument }) {
  const extension = doc.document_type.toUpperCase()

  const Icon =
    extension === "PDF"
      ? FileText
      : extension === "DOCX"
      ? FileText
      : extension === "XLSX" || extension === "SHEET"
      ? FileSpreadsheet
      : StickyNote

  return (
    <Link
      href={`/portal/knowledge/${doc.id}`}
      className="block transition-colors hover:bg-muted/40"
    >
      <div className="flex items-center gap-4 px-4 py-3.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background/60 text-primary">
          <Icon className="h-4 w-4" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">
            {doc.source}
          </p>

          <p className="truncate text-xs text-muted-foreground">
            {doc.project_id} • {extension}
          </p>
        </div>
      </div>
    </Link>
  )
}

export function KnowledgeBase({ documents }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 backdrop-blur">
      {documents.length > 0 ? (
        <div className="divide-y divide-border">
          {documents.map((doc) => (
            <DocumentRow key={doc.id} doc={doc} />
          ))}
        </div>
      ) : (
        <div className="px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground">
            No documents found.
          </p>
        </div>
      )}
    </div>
  )
}