"use client"

import { memo, useMemo, useState, type ComponentPropsWithoutRef } from "react"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import {
  AlertTriangle,
  Bot,
  Calendar,
  Check,
  Circle,
  ClipboardList,
  Clock,
  Copy,
  Download,
  FileText,
  Info,
  Sparkles,
  Target,
} from "lucide-react"
import { cn } from "@/lib/utils"

type MarkdownReportProps = {
  content: string
}

/**
 * Renders an assistant markdown response as a premium, enterprise-grade
 * report. Backend contract is untouched: this component only ever receives 
 * `result.data.response` (a markdown string) and is fully self-contained.
 */
function MarkdownReportImpl({ content }: MarkdownReportProps) {
  const [copied, setCopied] = useState(false)

  const components = useMemo<Components>(
    () => ({
      h1: ({ children }) => (
        <h1 className="mb-8 mt-0 border-b border-border pb-5 text-[34px] font-bold leading-tight tracking-tight text-foreground">
          {children}
        </h1>
      ),

      h2: ({ children }) => (
        <SectionHeading>{children}</SectionHeading>
      ),

      h3: ({ children }) => (
        <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">
          {children}
        </h3>
      ),

      p: ({ children }) => (
        <p className="my-4 text-[15px] leading-[1.8] text-muted-foreground">
          {children}
        </p>
      ),

      strong: ({ children }) => (
        <strong className="font-semibold text-foreground">{children}</strong>
      ),

      em: ({ children }) => <em className="text-foreground/90">{children}</em>,

      a: ({ href, children }) => (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
        >
          {children}
        </a>
      ),

      ul: ({ children }) => (
        <ul className="my-5 space-y-3 pl-1">{children}</ul>
      ),

      ol: ({ children }) => (
        <ol className="my-5 space-y-3 pl-1 [counter-reset:item]">{children}</ol>
      ),

      li: (props) => <ReportListItem {...props} />,

      blockquote: ({ children }) => (
        <blockquote className="my-6 flex items-start gap-3 rounded-xl border-l-4 border-l-primary bg-primary/5 px-5 py-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div className="text-sm leading-7 text-foreground/90 [&>p]:my-0">
            {children}
          </div>
        </blockquote>
      ),

      hr: () => <hr className="my-10 border-border" />,

      table: ({ children }) => (
        <div className="my-8 overflow-hidden rounded-xl border border-border">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">{children}</table>
          </div>
        </div>
      ),

      thead: ({ children }) => (
        <thead className="bg-muted/50">{children}</thead>
      ),

      tbody: ({ children }) => (
        <tbody className="divide-y divide-border/60">{children}</tbody>
      ),

      tr: ({ children }) => (
        <tr className="transition-colors odd:bg-transparent even:bg-muted/10 hover:bg-muted/40">
          {children}
        </tr>
      ),

      th: ({ children }) => (
        <th
          scope="col"
          className="border-b border-border px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          {children}
        </th>
      ),

      td: ({ children }) => (
        <td className="px-5 py-4 align-top text-[14px] leading-relaxed text-foreground/90">
          {children}
        </td>
      ),

      code: ({ className, children, ...props }: ComponentPropsWithoutRef<"code">) => {
        const isBlock = /language-/.test(className ?? "")
        if (isBlock) {
          return (
            <code className={cn("font-mono text-[13px] leading-relaxed text-foreground", className)} {...props}>
              {children}
            </code>
          )
        }
        return (
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[13px] text-primary">
            {children}
          </code>
        )
      },

      pre: ({ children }) => (
        <pre className="my-6 overflow-x-auto rounded-xl border border-border bg-muted/40 p-5">
          {children}
        </pre>
      ),

      img: ({ src, alt }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? ""}
          className="my-6 w-full rounded-xl border border-border shadow-sm"
        />
      ),
    }),
    [],
  )

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard API unavailable — fail silently, no UI disruption
    }
  }

  function handleExport() {
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = "enterprise-report.md"
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-none">
      <div className="mb-6 flex items-center gap-2 border-b border-border pb-4 text-[13px] text-muted-foreground">
        <Bot className="h-4 w-4 text-primary" />
        <span className="font-semibold text-foreground/90">AI Companion</span>
        <span className="text-muted-foreground/50">·</span>
        <span>Enterprise Knowledge & Project Intelligence Platform</span>
      </div>

      <div>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]} 
          rehypePlugins={[rehypeRaw]} // Added rehype-raw here
          components={components}
        >
          {content}
        </ReactMarkdown>
      </div>

      <div className="mt-10 flex items-center justify-end gap-2 border-t border-border pt-4">
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy response as markdown"
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-card/60 px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied" : "Copy Report"}
        </button>
        <button
          type="button"
          onClick={handleExport}
          aria-label="Export response as markdown file"
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-card/60 px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Download className="h-3.5 w-3.5" />
          Download Report
        </button>
      </div>
    </div>
  )
}

/** 
 * H2 section heading rendered as a semantic section header 
 * to create breathing room between major blocks of content.
 */
function SectionHeading({ children }: { children: React.ReactNode }) {
  const label = typeof children === "string" ? children : ""
  const icon = pickSectionIcon(label)

  return (
    <section className="mb-5 mt-12 flex items-center gap-2.5 rounded-t-xl border border-b-0 border-border bg-muted/30 px-5 py-3 first:mt-0">
      {icon}
      <h2 className="text-base font-semibold tracking-tight text-foreground">
        {children}
      </h2>
    </section>
  )
}

function pickSectionIcon(label: string) {
  const normalized = label.toLowerCase()
  
  if (normalized.includes("risk") || normalized.includes("blocker") || normalized.includes("issue")) {
    return <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" />
  }
  if (normalized.includes("recommend") || normalized.includes("solution")) {
    return <Check className="h-4 w-4 shrink-0 text-emerald-400" />
  }
  if (normalized.includes("summary") || normalized.includes("overview")) {
    return <FileText className="h-4 w-4 shrink-0 text-blue-400" />
  }
  if (normalized.includes("action") || normalized.includes("next step")) {
    return <ClipboardList className="h-4 w-4 shrink-0 text-purple-400" />
  }
  if (normalized.includes("insight") || normalized.includes("takeaway")) {
    return <Sparkles className="h-4 w-4 shrink-0 text-amber-500" />
  }
  if (normalized.includes("meeting") || normalized.includes("sync")) {
    return <Calendar className="h-4 w-4 shrink-0 text-indigo-400" />
  }
  if (normalized.includes("timeline") || normalized.includes("schedule")) {
    return <Clock className="h-4 w-4 shrink-0 text-cyan-400" />
  }
  
  // Default fallback for unrecognized sections
  return <Target className="h-4 w-4 shrink-0 text-muted-foreground" />
}

/** List item that supports GFM task-list checkboxes with custom markers. */
function ReportListItem({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"li"> & { checked?: boolean | null }) {
  const isTask = className?.includes("task-list-item")

  const childArray = Array.isArray(children) ? children : [children]
  
  const checkboxChild = childArray.find(
    (child): child is React.ReactElement<{ checked?: boolean }> =>
      !!child && typeof child === "object" && "type" in child && child.type === "input",
  )
  
  const isChecked = checkboxChild?.props?.checked ?? false
  const rest = childArray.filter((child) => child !== checkboxChild)

  if (isTask) {
    return (
      <li className="flex items-start gap-2.5 text-[15px] leading-7 text-muted-foreground marker:content-none">
        {isChecked ? (
          <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
        ) : (
          <Circle className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/50" />
        )}
        <span className={cn(isChecked && "text-muted-foreground/60 line-through")}>
          {rest}
        </span>
      </li>
    )
  }

  return (
    <li
      className="relative pl-5 text-[15px] leading-7 text-muted-foreground before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary/50"
      {...props}
    >
      {children}
    </li>
  )
}
export const MarkdownReport = memo(MarkdownReportImpl)