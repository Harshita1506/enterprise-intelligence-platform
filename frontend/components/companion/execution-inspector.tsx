"use client"

import {
  Clock,
  PanelRightClose,
  Workflow,
  FolderKanban,
  Wrench,
  Bot,
  CheckCircle2,
  AlertTriangle
} from "lucide-react"
import { CollapsibleSection } from "@/components/workspace/collapsible-section"

// Strictly defining the expected structure of your execution data
export type ExecutionData = {
  metadata?: {
    routing_confidence?: number;
    tool_used?: string;
    routing_reasoning?: string;
    project_id?: string;
  };
  telemetry?: {
    total_latency_sec?: number | string;
  };
  nodeHistory?: string[];
  status?: string;
} | null;

interface ExecutionInspectorProps {
  onClose?: () => void;
  data?: ExecutionData;
}

export function ExecutionInspector({
  onClose,
  data
}: ExecutionInspectorProps) {

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted-foreground">
        No execution data available yet.<br />Ask a question to generate telemetry.
      </div>
    )
  }

  const { metadata, telemetry, nodeHistory, status } = data

  // Determine badge styling based on final AgentStatus
  const isCompleted = status === "COMPLETED" || status === "completed"

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
        {/* Processing */}
        <div className="rounded-xl border border-border bg-card/60 p-3.5 backdrop-blur">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            Processing
          </div>
          <p className="mt-1.5 text-lg font-semibold tracking-tight text-foreground">
            {telemetry?.total_latency_sec || "0.00"}s
          </p>
          <p className="mt-2 text-[11px] text-muted-foreground">
            End to end
          </p>
        </div>

        {/* Selected Tool */}
        <div className="rounded-xl border border-border bg-card/60 p-4 backdrop-blur">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Wrench className="h-3.5 w-3.5" />
            Selected Agent Tool
          </div>
          <div className="mt-3 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Bot className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">
                {metadata?.tool_used || "NONE"}
              </p>
              <p className="text-xs text-muted-foreground">
                {metadata?.routing_reasoning || "Direct answer processing"}
              </p>
            </div>
          </div>
        </div>

        {/* Project Target */}
        <CollapsibleSection
          icon={FolderKanban}
          title="Referenced Projects"
          defaultOpen
          meta="1"
        >
          <ul className="space-y-1.5">
            <li className="flex items-center gap-2 text-sm text-foreground/90">
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              {metadata?.project_id || "Unknown"}
            </li>
          </ul>
        </CollapsibleSection>

        {/* LangGraph Trace */}
        <CollapsibleSection
          icon={Workflow}
          title="LangGraph Execution Flow"
          defaultOpen
        >
          <ol className="relative mt-2 space-y-4 pl-1">
            {nodeHistory?.map((node: string, i: number) => (
              <li key={i} className="relative flex gap-3">
                <div className="flex flex-col items-center">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/15 text-[10px] font-medium text-emerald-300">
                    {i + 1}
                  </span>
                  {i < nodeHistory.length - 1 ? (
                    <span className="mt-1 w-px flex-1 bg-border" />
                  ) : null}
                </div>

                <div className="-mt-0.5 pb-1">
                  <p className="text-sm font-medium text-foreground">
                    {node}
                  </p>

                  {i === nodeHistory.length - 1 && (
                    <div className="mt-2 flex items-center gap-1.5">
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[10px] font-medium text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" />
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-md border border-amber-400/20 bg-amber-400/10 px-2 py-1 text-[10px] font-medium text-amber-400">
                          <AlertTriangle className="h-3 w-3" />
                          Failed
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </CollapsibleSection>
      </div>
    </div>
  )
}