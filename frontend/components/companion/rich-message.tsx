"use client"

import { useState } from "react"
import {
  Check,
  ChevronDown,
  Copy,
  Download,
  FileText,
  FolderKanban,
  ListChecks,
  Quote,
  ShieldAlert,
  Info,
} from "lucide-react"
import type {
  ContentBlock,
  ResponsePayload,
} from "@/lib/companion-data"
import { cn } from "@/lib/utils"

function Block({ block }: { block: ContentBlock }) {
  const [expanded, setExpanded] = useState(false)

  switch (block.type) {
    case "heading":
      return (
        <h4 className="mt-5 text-sm font-semibold tracking-tight text-foreground first:mt-0">
          {block.text}
        </h4>
      )
    case "paragraph":
      return (
        <p className="text-sm leading-relaxed text-foreground/90">{block.text}</p>
      )
    case "bullets":
      return (
        <ul className="space-y-1.5">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/90">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
              {item}
            </li>
          ))}
        </ul>
      )
    case "checklist":
      return (
        <ul className="space-y-2">
          {block.items.map((item) => (
            <li key={item.text} className="flex items-start gap-2.5 text-sm leading-relaxed">
              <span
                className={cn(
                  "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                  item.done
                    ? "border-emerald-400/30 bg-emerald-400/15 text-emerald-300"
                    : "border-border bg-background/60 text-transparent",
                )}
              >
                <Check className="h-3 w-3" />
              </span>
              <span className={cn(item.done ? "text-muted-foreground line-through" : "text-foreground/90")}>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      )
    case "table":
      return (
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {block.headers.map((h) => (
                  <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={cn(
                        "px-3 py-2",
                        j === 0 ? "font-medium text-foreground" : "text-foreground/80",
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case "code":
      return (
        <pre className="overflow-x-auto rounded-lg border border-border bg-background/70 px-3.5 py-3 font-mono text-xs leading-relaxed text-foreground/90">
          <code>{block.code}</code>
        </pre>
      )
    case "callout":
      return (
        <div
          className={cn(
            "flex gap-3 rounded-lg border px-3.5 py-3",
            block.tone === "risk"
              ? "border-amber-400/20 bg-amber-400/10"
              : "border-border bg-muted/40",
          )}
        >
          <span
            className={cn(
              "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md",
              block.tone === "risk" ? "text-amber-300" : "text-primary",
            )}
          >
            {block.tone === "risk" ? (
              <ShieldAlert className="h-4 w-4" />
            ) : (
              <Info className="h-4 w-4" />
            )}
          </span>
          <div>
            <p className="text-sm font-medium text-foreground">{block.title}</p>
            <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{block.text}</p>
          </div>
        </div>
      )
    case "expandable":
      return (
        <div className="rounded-lg border border-border bg-background/40">
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left"
          >
            <span className="flex-1 text-sm font-medium text-foreground/90">{block.title}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform duration-300",
                expanded && "rotate-180",
              )}
            />
          </button>
          {expanded ? (
            <ul className="space-y-1.5 border-t border-border px-3.5 py-3">
              {block.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )
    default:
      return null
  }
}

export function RichMessage({ payload }: { payload: ResponsePayload }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    const text = payload.blocks
      .map((b) => {
        if (b.type === "heading") return `## ${b.text}`
        if (b.type === "paragraph") return b.text
        if (b.type === "bullets") return b.items.map((i) => `- ${i}`).join("\n")
        if (b.type === "checklist") return b.items.map((i) => `- [${i.done ? "x" : " "}] ${i.text}`).join("\n")
        if (b.type === "callout") return `> ${b.title}: ${b.text}`
        if (b.type === "code") return b.code
        return ""
      })
      .filter(Boolean)
      .join("\n\n")
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-3.5">
      {payload.blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}

      {/* Source citations */}
      {payload.citations.length > 0 ? (
        <div className="mt-5 rounded-xl border border-border bg-background/40 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Quote className="h-3.5 w-3.5" />
            Source citations
          </div>
          <ul className="mt-3 space-y-2.5">
            {payload.citations.map((c) => (
              <li key={c.index} className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-border bg-card text-[11px] font-medium text-muted-foreground">
                  {c.index}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.source}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground/80">{c.snippet}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Referenced docs / projects / actions */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {payload.referencedProjects.length > 0 ? (
          <div className="rounded-xl border border-border bg-background/40 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <FolderKanban className="h-3.5 w-3.5" />
              Related projects
            </div>
            <ul className="mt-3 space-y-2">
              {payload.referencedProjects.map((p) => (
                <li key={p.name} className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-foreground/90">{p.name}</span>
                  <span className="text-xs text-muted-foreground">{p.status}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {payload.actionItems.length > 0 ? (
          <div className="rounded-xl border border-border bg-background/40 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <ListChecks className="h-3.5 w-3.5" />
              Action items
            </div>
            <ul className="mt-3 space-y-2">
              {payload.actionItems.map((a) => (
                <li key={a.text} className="flex items-start justify-between gap-2 text-sm">
                  <span className="text-foreground/90">{a.text}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{a.owner}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {/* Response actions */}
      <div className="mt-4 flex items-center gap-2 border-t border-border pt-3.5">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/60 px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy response"}
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/60 px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Download className="h-3.5 w-3.5" />
          Download
        </button>
        <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <FileText className="h-3.5 w-3.5" />
          {payload.citations.length} sources
        </span>
      </div>
    </div>
  )
}
