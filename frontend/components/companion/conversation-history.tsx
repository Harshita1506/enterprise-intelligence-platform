"use client"

import { Plus, Search, Pin } from "lucide-react"
import {
  pinnedConversations,
  recentConversations,
  type Conversation,
} from "@/lib/companion-data"
import { cn } from "@/lib/utils"

function ConversationRow({
  conversation,
  active,
  onSelect,
}: {
  conversation: Conversation
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? "true" : undefined}
      className={cn(
        "group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors",
        active ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/60",
      )}
    >
      {conversation.pinned ? (
        <Pin className="h-3 w-3 shrink-0 text-muted-foreground" />
      ) : null}
      <span className="flex-1 truncate text-sm text-sidebar-foreground">
        {conversation.title}
      </span>
    </button>
  )
}

export function ConversationHistory({
  activeId,
  onSelect,
  onNewConversation,
}: {
  activeId: string | null
  onSelect: (id: string) => void
  onNewConversation: () => void
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="p-3">
        <button
          type="button"
          onClick={onNewConversation}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          New conversation
        </button>

        <div className="relative mt-3">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search conversations…"
            aria-label="Search conversations"
            className="h-8 w-full rounded-lg border border-input bg-background/60 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/30"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3">
        <p className="px-3 pb-1.5 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Pinned
        </p>
        <div className="space-y-0.5">
          {pinnedConversations.map((c) => (
            <ConversationRow
              key={c.id}
              conversation={c}
              active={activeId === c.id}
              onSelect={() => onSelect(c.id)}
            />
          ))}
        </div>

        <p className="px-3 pb-1.5 pt-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Recent
        </p>
        <div className="space-y-0.5">
          {recentConversations.map((c) => (
            <ConversationRow
              key={c.id}
              conversation={c}
              active={activeId === c.id}
              onSelect={() => onSelect(c.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
