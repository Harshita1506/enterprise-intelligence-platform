"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, Loader2, CheckCircle2 } from "lucide-react"

type UploadDocumentProps = {
  projectId: string
}

export function UploadDocument({ projectId }: UploadDocumentProps) {
  const router = useRouter()

  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  async function handleUpload() {
    if (!file) return

    setUploading(true)
    setError("")
    setMessage("")

    try {
      const formData = new FormData()

      formData.append("project_id", projectId)
      formData.append("file", file)

      const response = await fetch("http://127.0.0.1:8000/api/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Upload failed")
      }

      setMessage(
        `Uploaded "${result.data.filename}" successfully. (${result.data.chunks_created} chunks created)`
      )

      setFile(null)

      router.refresh()
    } catch (err: any) {
      setError(err.message || "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
      <div className="flex items-center gap-2">
        <Upload className="h-5 w-5 text-primary" />
        <h2 className="text-sm font-semibold">Upload Document</h2>
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        Add a document to this project's knowledge base.
      </p>

      <div className="mt-5 flex flex-col gap-4">
        <input
          type="file"
          accept=".txt,.docx,.pdf"
          onChange={(e) => {
            const selected = e.target.files?.[0] ?? null
            setFile(selected)
            setMessage("")
            setError("")
          }}
        />

        {file && (
          <p className="text-sm text-muted-foreground">
            Selected: <span className="font-medium">{file.name}</span>
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload Document
            </>
          )}
        </button>

        {message && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            {message}
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}