"use client"

import {
  Bot,
  FileText,
  Database,
  FolderKanban,
  Workflow,
  Clock,
  Gauge,
  Cpu,
  Lightbulb,
  PanelRightClose,
} from "lucide-react"
import { CollapsibleSection } from "@/components/workspace/collapsible-section"
import { executionDetails } from "@/lib/companion-data"

export function ExecutionInspector({ onClose }: { onClose?: () => void }) {
  const d = executionDetails

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-12 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Execution details
          </h2>
        </div>
        {onClose ? (
          <button
            type="button"
            aria-label="Close inspector"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <PanelRightClose className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-card/60 p-3.5 backdrop-blur">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Gauge className="h-3.5 w-3.5" />
              Confidence
            </div>
            <p className="mt-1.5 text-lg font-semibold tracking-tight text-foreground">
              {d.confidence}%
            </p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-emerald-400"
                style={{ width: `${d.confidence}%` }}
              />
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-3.5 backdrop-blur">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              Processing
            </div>
            <p className="mt-1.5 text-lg font-semibold tracking-tight text-foreground">
              {d.processingTime}
            </p>
            <p className="mt-2 text-[11px] text-muted-foreground">End to end</p>
          </div>
        </div>

        {/* Selected agent */}
        <div className="rounded-xl border border-border bg-card/60 p-4 backdrop-blur">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Bot className="h-3.5 w-3.5" />
            Selected agent
          </div>
          <div className="mt-3 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <d.selectedAgent.icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">{d.selectedAgent.name}</p>
              <p className="text-xs text-muted-foreground">{d.selectedAgent.description}</p>
            </div>
          </div>
        </div>

        <CollapsibleSection
          icon={FileText}
          title="Retrieved documents"
          meta={`${d.retrievedDocuments.length}`}
          defaultOpen
        >
          <ul className="space-y-2.5">
            {d.retrievedDocuments.map((doc) => (
              <li key={doc.title} className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-foreground/90">{doc.title}</p>
                  <p className="text-[11px] text-muted-foreground">{doc.type}</p>
                </div>
                <span className="shrink-0 text-xs font-medium text-muted-foreground">
                  {doc.relevance}%
                </span>
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection icon={Database} title="Knowledge sources" meta={`${d.knowledgeSources.length}`}>
          <ul className="space-y-1.5">
            {d.knowledgeSources.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm text-foreground/90">
                <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                {s}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection icon={FolderKanban} title="Referenced projects" meta={`${d.referencedProjects.length}`}>
          <ul className="space-y-1.5">
            {d.referencedProjects.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-foreground/90">
                <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                {p}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection icon={Workflow} title="LangGraph execution flow" defaultOpen>
          <ol className="relative space-y-4 pl-1">
            {d.executionFlow.map((node, i) => (
              <li key={node.label} className="relative flex gap-3">
                <div className="flex flex-col items-center">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/15 text-[10px] font-medium text-emerald-300">
                    {i + 1}
                  </span>
                  {i < d.executionFlow.length - 1 ? (
                    <span className="mt-1 w-px flex-1 bg-border" />
                  ) : null}
                </div>
                <div className="-mt-0.5 pb-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{node.label}</p>
                    <span className="text-[11px] text-muted-foreground">{node.duration}</span>
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{node.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </CollapsibleSection>

        {/* Model + reasoning */}
        <div className="rounded-xl border border-border bg-card/60 p-4 backdrop-blur">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Cpu className="h-3.5 w-3.5" />
            Model used
          </div>
          <p className="mt-2 font-mono text-xs text-foreground/90">{d.modelUsed}</p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 backdrop-blur">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Lightbulb className="h-3.5 w-3.5" />
            Reasoning summary
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {d.reasoningSummary}
          </p>
        </div>
      </div>
    </div>
  )
}
