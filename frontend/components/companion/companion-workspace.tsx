"use client"
import { post } from "@/lib/api"
import { useEffect, useRef, useState } from "react"
import {
  ArrowUp,
  Sparkles,
  PanelRight,
  Paperclip,
  Mic,
  Loader2,
  Bot,
  FileText,
  ShieldAlert,
  Database,
  ListChecks,
} from "lucide-react"
import { ConversationHistory } from "@/components/companion/conversation-history"
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

const suggestedActions = [
  {
    icon: FileText,
    title: "Summarize Project Alpha",
    prompt: "Summarize the current status of Project Alpha.",
  },
  {
    icon: ShieldAlert,
    title: "Find project risks",
    prompt: "Identify the top delivery risks across active projects.",
  },
  {
    icon: Database,
    title: "Search knowledge base",
    prompt: "Search enterprise knowledge for our data retention policy.",
  },
  {
    icon: ListChecks,
    title: "Meeting summary",
    prompt: "Extract action items from the latest leadership sync.",
  },
]

export function CompanionWorkspace() {
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingStage, setLoadingStage] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)

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

    // Show the user's message immediately
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

      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: result.data.response,
        },
      ])
    } catch (error) {
      console.error(error)

      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "Unable to contact the backend.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleSelect(id: string) {
    setActiveConversation(id)
    setMessages([
      { 
        role: "user", 
        text: "Summarize Project Alpha" 
      }, 
      { 
        role: "assistant", 
        text: "Conversation history will be available soon." 
      }
    ])
  }

  function handleNew() {
    setActiveConversation(null)
    setMessages([])
    setLoading(false)
    setDrawerOpen(false)
  }

  return (
    <div className="flex h-[calc(100dvh-9rem)] min-h-[560px] overflow-hidden rounded-2xl border border-border bg-card/30 backdrop-blur">
      {/* Left panel — conversation history (~28%) */}
      <div className="hidden w-[28%] min-w-[240px] max-w-[320px] shrink-0 border-r border-border bg-sidebar/40 lg:flex">
        <ConversationHistory
          activeId={activeConversation}
          onSelect={handleSelect}
          onNewConversation={handleNew}
        />
      </div>

      {/* Right panel — conversation workspace (~72%) */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Compact header */}
        <div className="flex h-14 items-center gap-3 border-b border-border px-4 md:px-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Sparkles className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold tracking-tight text-foreground">
              AI Companion
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              Enterprise Intelligence Assistant
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
            <WelcomeState onPrompt={send} />
          ) : (
            <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 md:px-6">
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm border border-border bg-muted/60 px-4 py-2.5 text-sm leading-relaxed text-foreground">
                      {m.text}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
                      <Bot className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm border border-border bg-card/60 p-4 backdrop-blur">
                      <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                        {m.text}
                      </div>
                    </div>
                  </div>
                ),
              )}
              {loading ? <LoadingState stage={loadingStage} /> : null}
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="border-t border-border p-3 md:p-4">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-end gap-1.5 rounded-2xl border border-border bg-background/60 p-2 transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30">
              <button
                type="button"
                aria-label="Attach document"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Paperclip className="h-4 w-4" />
              </button>
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
                placeholder="Ask about projects, enterprise knowledge, risks, meetings, or requirements…"
                aria-label="Message AI Companion"
                className="max-h-40 min-h-9 flex-1 resize-none bg-transparent px-1 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              {/* Reserved for future microphone support */}
              <button
                type="button"
                aria-label="Voice input (coming soon)"
                disabled
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground/50"
              >
                <Mic className="h-4 w-4" />
              </button>
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

      {/* Optional execution inspector drawer */}
      <ExecutionDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  )
}

function WelcomeState({ onPrompt }: { onPrompt: (text: string) => void }) {
  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center px-4 py-10 md:px-6">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Sparkles className="h-6 w-6" />
      </span>
      <h2 className="mt-5 text-balance text-center text-xl font-semibold tracking-tight text-foreground md:text-2xl">
        Ask the Enterprise AI Companion
      </h2>
      <p className="mt-3 max-w-md text-pretty text-center text-sm leading-relaxed text-muted-foreground">
        Search across enterprise documents, understand project context, and generate structured
        intelligence grounded in your organization&apos;s knowledge.
      </p>

      <div className="mt-9 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        {suggestedActions.map((action) => (
          <button
            key={action.title}
            type="button"
            onClick={() => onPrompt(action.prompt)}
            className="group flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 text-left transition-colors hover:border-primary/40 hover:bg-card"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background/60 text-primary transition-colors group-hover:border-primary/40">
              <action.icon className="h-4 w-4" />
            </span>
            <span className="text-sm font-medium text-foreground">{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function LoadingState({ stage }: { stage: number }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
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