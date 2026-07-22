"use client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { get, post } from "@/lib/api"
import { useEffect, useRef, useState } from "react"
import {
  ArrowUp,
  Sparkles,
  PanelRight,
  Loader2,
  Bot,
} from "lucide-react"
import { ExecutionDrawer } from "@/components/companion/execution-drawer"
import { loadingStages } from "@/lib/companion-data"
import { cn } from "@/lib/utils"

type Message =
  | {
      role: "user"
      text: string
    }
  | {
      role: "assistant"
      text: string
    }

export function CompanionWorkspace() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingStage, setLoadingStage] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Execution telemetry state
  const [executionData, setExecutionData] = useState<any>(null)
  
  const scrollRef = useRef<HTMLDivElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const hasConversation = messages.length > 0 || loading

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, loading, loadingStage])

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout)
  }, [])

  async function send(text: string) {
    const value = text.trim()

    if (!value || loading) return

    setInput("")

    setMessages((m) => [
      ...m,
      {
        role: "user",
        text: value,
      },
    ])

    setLoading(true)

    try {
      const result = await post("/api/chat", {
        query: value,
      })

      // Capture real telemetry
      if (result.data) {
        setExecutionData({
          metadata: result.data.metadata,
          telemetry: result.data.telemetry,
          nodeHistory: result.data.node_history,
          status: result.data.status
        })
      }

      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: result.data.response,
        },
      ])
    } catch (error: any) {
      console.error(error)

      // Injecting actual backend error
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: error.message || "Unable to contact the backend.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-[calc(100dvh-9rem)] min-h-[560px] overflow-hidden rounded-2xl border border-border bg-card/30 backdrop-blur">
      
      {/* Right panel — conversation workspace (Now spans full width) */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Compact header */}
        <div className="flex h-14 items-center gap-3 border-b border-border px-4 md:px-6">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold tracking-tight text-foreground">
              Enterprise AI Companion
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              Enterprise Intelligence Platform
            </p>
          </div>
          {hasConversation ? (
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-card/60 px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <PanelRight className="h-3.5 w-3.5" />
              View Execution
            </button>
          ) : null}
        </div>

        {/* Messages / welcome state */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {!hasConversation ? (
            <WelcomeState /> 
          ) : (
            <div className="mx-auto max-w-3xl space-y-8 px-4 py-8 md:px-6">
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm border border-border bg-muted/60 px-4 py-2.5 text-sm leading-relaxed text-foreground">
                      {m.text}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <Bot className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm border border-border bg-card/80 p-6 shadow-sm backdrop-blur md:p-7">
                      <article className="prose prose-sm prose-invert max-w-none prose-headings:scroll-m-20 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white prose-h1:mb-6 prose-h1:mt-2 prose-h1:text-3xl prose-h1:border-b prose-h1:border-border prose-h1:pb-3 prose-h2:mb-5 prose-h2:mt-10 prose-h2:border-b prose-h2:border-border/70 prose-h2:pb-2 prose-h2:text-xl prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-lg prose-p:leading-8 prose-p:text-muted-foreground prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-strong:text-white prose-ul:my-5 prose-ol:my-5 prose-li:my-2 prose-table:my-8 prose-table:w-full prose-table:border-collapse prose-table:overflow-hidden prose-thead:border-b prose-thead:border-border prose-tr:border-b prose-tr:border-border/60 prose-th:bg-muted/40 prose-th:px-5 prose-th:py-3 prose-th:text-left prose-th:text-xs prose-th:uppercase prose-th:tracking-wider prose-td:border-border prose-td:px-5 prose-td:py-4 prose-td:align-top prose-hr:my-10 prose-hr:border-border prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-primary prose-pre:rounded-xl prose-pre:border prose-pre:border-border prose-pre:bg-muted/40 prose-pre:p-5 lg:prose-base">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {m.text}
                        </ReactMarkdown>
                      </article>
                    </div>
                  </div>
                )
              )}
              {loading ? <LoadingState stage={loadingStage} /> : null}
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="border-t border-border p-3 md:p-4">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-end gap-1.5 rounded-2xl border border-border bg-background/60 p-2 transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    !e.nativeEvent.isComposing &&
                    e.keyCode !== 229
                  ) {
                    e.preventDefault()
                    send(input)
                  }
                }}
                rows={1}
                placeholder='Example: "Summarize project customer_portal"'
                aria-label="Message AI Companion"
                className="max-h-40 min-h-10 flex-1 resize-none bg-transparent px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                type="button"
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowUp className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Responses are generated from indexed enterprise knowledge. Verify important details.
            </p>
          </div>
        </div>
      </div>

      {/* Execution Drawer wired to state */}
      <ExecutionDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} data={executionData} />
    </div>
  )
}

function WelcomeState() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-start px-4 pb-6 pt-14 md:px-6">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Sparkles className="h-6 w-6" />
      </span>
      <h2 className="mt-3 text-balance text-center text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        Enterprise AI Companion
      </h2>
      <p className="mt-2 max-w-md text-pretty text-center text-sm leading-relaxed text-muted-foreground">
        Ask questions about enterprise projects, retrieve knowledge, identify delivery risks and generate executive insights.
      </p>

      <div className="mt-8 w-full max-w-2xl rounded-xl border border-border/60 bg-muted/20 p-5 shadow-sm md:p-6">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Try asking:</h3>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex gap-2 text-sm font-medium">
            <span className="font-mono text-primary/60">&gt;</span> Summarize project customer_portal
          </li>
          <li className="flex gap-2 text-sm font-medium">
            <span className="font-mono text-primary/60">&gt;</span> Identify risks in inventory_management_ai
          </li>
          <li className="flex gap-2 text-sm font-medium">
            <span className="font-mono text-primary/60">&gt;</span> Extract action items from recruitment_platform
          </li>
          <li className="flex gap-2 text-sm font-medium">
            <span className="font-mono text-primary/60">&gt;</span> Generate executive insights for manufacturing_dashboard
          </li>
          <li className="flex gap-2 text-sm font-medium">
            <span className="font-mono text-primary/60">&gt;</span> Summarize the latest meeting for healthcare_appointment_system
          </li>
        </ul>
      </div>
    </div>
  )
}

function LoadingState({ stage }: { stage: number }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
        <Bot className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm border border-border bg-card/60 p-4 backdrop-blur">
        <ul className="space-y-2.5">
          {loadingStages.map((label, i) => {
            const state = i < stage ? "done" : i === stage ? "active" : "pending"
            return (
              <li key={label} className="flex items-center gap-2.5 text-sm">
                {state === "active" ? (
                  <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-primary" />
                ) : (
                  <span
                    className={cn(
                      "h-1.5 w-1.5 shrink-0 rounded-full",
                      state === "done" ? "bg-emerald-400" : "bg-muted-foreground/40",
                    )}
                  />
                )}
                <span
                  className={cn(
                    state === "pending"
                      ? "text-muted-foreground/50"
                      : state === "active"
                        ? "text-foreground"
                        : "text-muted-foreground",
                  )}
                >
                  {label}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}