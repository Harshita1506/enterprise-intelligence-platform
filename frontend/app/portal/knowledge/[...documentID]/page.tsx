import { notFound } from "next/navigation"

import { API_BASE } from "@/lib/config"
export const dynamic = "force-dynamic";

async function getDocument(documentId: string) {
  const response = await fetch(
    `${API_BASE}/api/documents/${documentId}`,
    {
      cache: "no-store",
    }
  )

  if (!response.ok) {
    return null
  }

  const result = await response.json()
  return result.data
}

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ documentID: string[] }>
}) {
  const { documentID } = await params

  const id = documentID.join("/")

  const document = await getDocument(id)

  if (!document) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          {document.source}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {document.project_id} • {document.document_type.toUpperCase()}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <pre className="whitespace-pre-wrap text-sm leading-7">
          {document.content}
        </pre>
      </div>
    </div>
  )
}