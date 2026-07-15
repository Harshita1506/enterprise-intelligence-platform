export type IndexedDocument = {
  id: string
  title: string
  type: "PDF" | "DOCX" | "Note" | "Sheet"
  source: string
  updated: string
  chunks: number
  status: "indexed" | "processing"
}

export const knowledgeDocuments: IndexedDocument[] = [
  {
    id: "migration-plan-v4",
    title: "Project Alpha — Migration Plan v4",
    type: "PDF",
    source: "Project Alpha",
    updated: "2h ago",
    chunks: 142,
    status: "indexed",
  },
  {
    id: "client-requirements-q3",
    title: "Client Requirements — Q3 Update",
    type: "DOCX",
    source: "Project Alpha",
    updated: "1d ago",
    chunks: 88,
    status: "indexed",
  },
  {
    id: "vendor-renewal-summary",
    title: "Vendor Renewal Summary",
    type: "Note",
    source: "Procurement",
    updated: "3d ago",
    chunks: 24,
    status: "indexed",
  },
  {
    id: "data-retention-policy",
    title: "Data Retention & Compliance Policy",
    type: "PDF",
    source: "Governance",
    updated: "1w ago",
    chunks: 210,
    status: "indexed",
  },
  {
    id: "leadership-sync-notes",
    title: "Leadership Sync — Meeting Notes",
    type: "Note",
    source: "Meetings",
    updated: "Yesterday",
    chunks: 36,
    status: "processing",
  },
  {
    id: "portfolio-metrics",
    title: "Portfolio Health Metrics",
    type: "Sheet",
    source: "Program Office",
    updated: "4d ago",
    chunks: 57,
    status: "indexed",
  },
]
