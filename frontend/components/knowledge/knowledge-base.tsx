"use client"

import { useMemo, useState } from "react"
import { Search, Upload, FileText, FileSpreadsheet, StickyNote } from "lucide-react"
import { knowledgeDocuments, type IndexedDocument } from "@/lib/knowledge-data"
import { cn } from "@/lib/utils"

const typeIcon = {
  PDF: FileText,
  DOCX: FileText,
  Sheet: FileSpreadsheet,
  Note: StickyNote,
} as const

function DocumentRow({ doc }: { doc: IndexedDocument }) {
  const Icon = typeIcon[doc.type]
  return (
    <div className="flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-muted/40">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background/60 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{doc.title}</p>
        <p className="truncate text-xs text-muted-foreground">
          {doc.source} · {doc.type} · {doc.chunks} chunks
        </p>
      </div>
      <span
        className={cn(
          "hidden shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium sm:inline-flex",
          doc.status === "indexed"
            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
            : "border-amber-400/30 bg-amber-400/10 text-amber-300",
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            doc.status === "indexed" ? "bg-emerald-400" : "bg-amber-400 animate-pulse",
          )}
        />
        {doc.status === "indexed" ? "Indexed" : "Processing"}
      </span>
      <span className="hidden shrink-0 text-xs text-muted-foreground md:block">{doc.updated}</span>
    </div>
  )
}

export function KnowledgeBase() {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return knowledgeDocuments
    return knowledgeDocuments.filter(
      (d) => d.title.toLowerCase().includes(q) || d.source.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div className="rounded-2xl border border-border bg-card/40 backdrop-blur">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-border p-3 md:p-4">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search indexed documents and sources…"
            aria-label="Search knowledge base"
            className="h-9 w-full rounded-lg border border-input bg-background/60 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/30"
          />
        </div>
        <button
          type="button"
          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Upload className="h-4 w-4" />
          Upload
        </button>
      </div>

      {/* Document list */}
      {filtered.length > 0 ? (
        <div className="divide-y divide-border">
          {filtered.map((doc) => (
            <DocumentRow key={doc.id} doc={doc} />
          ))}
        </div>
      ) : (
        <div className="px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground">
            No documents match &ldquo;{query}&rdquo;.
          </p>
        </div>
      )}
    </div>
  )
}
