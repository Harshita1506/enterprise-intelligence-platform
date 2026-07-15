import {
  FileText,
  ShieldAlert,
  ClipboardList,
  Search,
  ListChecks,
  GitCompare,
  Ban,
  Users,
  Sparkles,
  FileSearch,
  BrainCircuit,
  BarChart3,
  type LucideIcon,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/* Conversation history                                                */
/* ------------------------------------------------------------------ */

export type Conversation = {
  id: string
  title: string
  preview: string
  timestamp: string
  pinned?: boolean
}

export const pinnedConversations: Conversation[] = [
  {
    id: "sprint-42-review",
    title: "Sprint 42 Review",
    preview: "Velocity, carryover, and blocker analysis",
    timestamp: "2h ago",
    pinned: true,
  },
  {
    id: "risk-assessment",
    title: "Risk Assessment",
    preview: "Delivery and vendor risk across Q3",
    timestamp: "1d ago",
    pinned: true,
  },
]

export const recentConversations: Conversation[] = [
  {
    id: "client-requirement-analysis",
    title: "Client Requirement Analysis",
    preview: "Scope changes for the platform migration",
    timestamp: "3h ago",
  },
  {
    id: "weekly-meeting-summary",
    title: "Weekly Meeting Summary",
    preview: "Action items from the leadership sync",
    timestamp: "Yesterday",
  },
  {
    id: "strategic-planning",
    title: "Strategic Planning",
    preview: "H2 roadmap themes and dependencies",
    timestamp: "2d ago",
  },
  {
    id: "executive-brief",
    title: "Executive Brief",
    preview: "Portfolio health for the board update",
    timestamp: "3d ago",
  },
  {
    id: "knowledge-search",
    title: "Knowledge Search",
    preview: "Security policy and compliance docs",
    timestamp: "5d ago",
  },
]

/* ------------------------------------------------------------------ */
/* Suggested prompts & quick actions                                   */
/* ------------------------------------------------------------------ */

export type SuggestedPrompt = {
  icon: LucideIcon
  label: string
}

export const suggestedPrompts: SuggestedPrompt[] = [
  { icon: FileText, label: "Summarize Project Alpha" },
  { icon: ShieldAlert, label: "Identify project risks" },
  { icon: ClipboardList, label: "Generate executive briefing" },
  { icon: Search, label: "Search enterprise knowledge" },
  { icon: ListChecks, label: "Extract meeting action items" },
  { icon: GitCompare, label: "Compare sprint progress" },
  { icon: Ban, label: "Find blockers" },
  { icon: Users, label: "Analyze client requirements" },
]

export type QuickAction = {
  icon: LucideIcon
  title: string
  description: string
  prompt: string
}

export const quickActions: QuickAction[] = [
  {
    icon: Sparkles,
    title: "Ask Enterprise AI",
    description: "Open-ended questions across your organization.",
    prompt: "What should I focus on across my projects today?",
  },
  {
    icon: FileSearch,
    title: "Summarize Documents",
    description: "Condense long documents into key points.",
    prompt: "Summarize the latest client requirement documents.",
  },
  {
    icon: ShieldAlert,
    title: "Analyze Risks",
    description: "Surface delivery and operational risks.",
    prompt: "Identify the top risks across active projects.",
  },
  {
    icon: BarChart3,
    title: "Generate Project Insights",
    description: "Health, progress, and trends per project.",
    prompt: "Generate an intelligence summary for Project Alpha.",
  },
  {
    icon: Search,
    title: "Search Knowledge",
    description: "Find answers in the indexed knowledge base.",
    prompt: "Search enterprise knowledge for our data retention policy.",
  },
  {
    icon: ClipboardList,
    title: "Create Executive Summary",
    description: "Board-ready briefing across the portfolio.",
    prompt: "Create an executive briefing on portfolio health.",
  },
]

/* ------------------------------------------------------------------ */
/* Structured response content blocks                                  */
/* ------------------------------------------------------------------ */

export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "checklist"; items: { text: string; done: boolean }[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; language: string; code: string }
  | { type: "callout"; tone: "info" | "risk"; title: string; text: string }
  | { type: "expandable"; title: string; items: string[] }

export type Citation = {
  index: number
  title: string
  source: string
  snippet: string
}

export type ReferencedProject = {
  name: string
  status: string
}

export type ActionItem = {
  text: string
  owner: string
}

export type ResponsePayload = {
  blocks: ContentBlock[]
  citations: Citation[]
  referencedProjects: ReferencedProject[]
  actionItems: ActionItem[]
}

export const sampleResponse: ResponsePayload = {
  blocks: [
    {
      type: "paragraph",
      text: "Here is a consolidated intelligence summary for Project Alpha, synthesized from the indexed knowledge base and current project signals.",
    },
    { type: "heading", text: "Executive summary" },
    {
      type: "bullets",
      items: [
        "Delivery is trending slightly behind plan, driven by two blocked workstreams.",
        "Recent client requirement changes expand scope for the migration phase.",
        "Vendor renewal requires review before the end of the quarter.",
      ],
    },
    {
      type: "callout",
      tone: "risk",
      title: "Risk detected",
      text: "Dependency slippage in the data migration workstream may affect the Phase 2 milestone. Recommended to re-baseline the schedule.",
    },
    { type: "heading", text: "Progress by workstream" },
    {
      type: "table",
      headers: ["Workstream", "Status", "Progress"],
      rows: [
        ["Platform migration", "On track", "78%"],
        ["Data migration", "At risk", "54%"],
        ["Client onboarding", "On track", "82%"],
      ],
    },
    { type: "heading", text: "Recommended action items" },
    {
      type: "checklist",
      items: [
        { text: "Re-baseline the Phase 2 milestone schedule", done: false },
        { text: "Review updated client requirements with delivery lead", done: false },
        { text: "Confirm vendor renewal terms before quarter end", done: true },
      ],
    },
    {
      type: "expandable",
      title: "Methodology & assumptions",
      items: [
        "Signals aggregated across 6 indexed documents and 3 project sources.",
        "Progress figures reflect the most recent sprint snapshot.",
        "Risk scoring weighs dependency depth and schedule variance.",
      ],
    },
    { type: "heading", text: "Suggested query" },
    {
      type: "code",
      language: "text",
      code: "compare sprint velocity for Project Alpha across the last 3 sprints",
    },
  ],
  citations: [
    {
      index: 1,
      title: "Project Alpha — Migration Plan v4",
      source: "Knowledge Base · PDF",
      snippet: "Phase 2 milestone depends on completion of the data migration workstream…",
    },
    {
      index: 2,
      title: "Client Requirements — Q3 Update",
      source: "Knowledge Base · DOCX",
      snippet: "Expanded scope introduces additional data validation requirements…",
    },
    {
      index: 3,
      title: "Vendor Renewal Summary",
      source: "Knowledge Base · Note",
      snippet: "Current terms expire at quarter end; renewal requires stakeholder review…",
    },
  ],
  referencedProjects: [
    { name: "Project Alpha", status: "At risk" },
    { name: "Platform Migration", status: "On track" },
  ],
  actionItems: [
    { text: "Re-baseline Phase 2 milestone", owner: "Delivery Lead" },
    { text: "Review updated client requirements", owner: "Product" },
    { text: "Confirm vendor renewal terms", owner: "Procurement" },
  ],
}

/* ------------------------------------------------------------------ */
/* Execution / orchestration inspector data                            */
/* ------------------------------------------------------------------ */

export type ExecutionNode = {
  label: string
  detail: string
  duration: string
  status: "done"
}

export type RetrievedDoc = {
  title: string
  type: string
  relevance: number
}

export const executionDetails = {
  selectedAgent: {
    name: "Project Intelligence Agent",
    icon: BrainCircuit,
    description: "Multi-agent orchestration via LangGraph",
  },
  retrievedDocuments: [
    { title: "Migration Plan v4", type: "PDF", relevance: 94 },
    { title: "Client Requirements Q3", type: "DOCX", relevance: 88 },
    { title: "Vendor Renewal Summary", type: "Note", relevance: 76 },
  ] as RetrievedDoc[],
  knowledgeSources: [
    "Enterprise Knowledge Base",
    "Project Intelligence Index",
    "Meeting Notes Archive",
  ],
  referencedProjects: ["Project Alpha", "Platform Migration"],
  executionFlow: [
    {
      label: "Query understanding",
      detail: "Parsed intent · routed to project agent",
      duration: "0.2s",
      status: "done",
    },
    {
      label: "Knowledge retrieval",
      detail: "Retrieved 6 documents from vector index",
      duration: "0.6s",
      status: "done",
    },
    {
      label: "Project intelligence",
      detail: "Aggregated status and risk signals",
      duration: "0.5s",
      status: "done",
    },
    {
      label: "Synthesis",
      detail: "Composed structured response with citations",
      duration: "0.4s",
      status: "done",
    },
  ] as ExecutionNode[],
  confidence: 92,
  processingTime: "1.7s",
  modelUsed: "LangGraph · Groq (Llama 3.1 70B)",
  reasoningSummary:
    "Routed the query to the Project Intelligence Agent, retrieved the most relevant enterprise documents, aggregated project health signals, and synthesized a structured briefing with source citations.",
}

export const loadingStages = [
  "Agent thinking",
  "Retrieving enterprise knowledge",
  "Running project intelligence",
  "Synthesizing response",
]
