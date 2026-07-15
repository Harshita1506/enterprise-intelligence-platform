import type { ProjectStatus } from "@/components/workspace/status-badge"
import {
  FileText,
  ClipboardList,
  Database,
  Sparkles,
  ShieldAlert,
  Activity,
  FolderOpen,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react"

export type Project = {
  id: string
  name: string
  client: string
  type: string
  priority: "High" | "Medium" | "Low"
  status: ProjectStatus
  progress: number
  documents: number
  recentUpdate: string
  lastSummary: string
  lastModified: string
}

export const projects: Project[] = [
  {
    id: "project-alpha",
    name: "Project Alpha",
    client: "Northwind Traders",
    type: "Platform Migration",
    priority: "High",
    status: "at-risk",
    progress: 64,
    documents: 42,
    recentUpdate: "Client requirements updated",
    lastSummary: "Delivery trending behind on the data migration workstream; Phase 2 milestone at risk.",
    lastModified: "2h ago",
  },
  {
    id: "sprint-alpha",
    name: "Sprint Alpha Delivery",
    client: "Contoso Ltd",
    type: "Product Development",
    priority: "High",
    status: "blocked",
    progress: 42,
    documents: 28,
    recentUpdate: "Two tasks blocked on dependencies",
    lastSummary: "Sprint velocity dropped; blockers identified across two workstreams awaiting resolution.",
    lastModified: "40m ago",
  },
  {
    id: "vendor-renewal",
    name: "Vendor Renewal 2025",
    client: "Fabrikam Inc",
    type: "Procurement",
    priority: "Medium",
    status: "needs-review",
    progress: 71,
    documents: 19,
    recentUpdate: "Renewal terms pending review",
    lastSummary: "Contract terms summarized; stakeholder review required before quarter end.",
    lastModified: "1d ago",
  },
  {
    id: "knowledge-hub",
    name: "Enterprise Knowledge Hub",
    client: "Internal — InterraIT",
    type: "Knowledge Management",
    priority: "Medium",
    status: "healthy",
    progress: 88,
    documents: 156,
    recentUpdate: "New documents indexed",
    lastSummary: "Indexing pipeline healthy; knowledge coverage expanded across three departments.",
    lastModified: "5h ago",
  },
  {
    id: "compliance-audit",
    name: "Compliance Audit",
    client: "Adventure Works",
    type: "Governance",
    priority: "High",
    status: "healthy",
    progress: 79,
    documents: 63,
    recentUpdate: "Policy documents reviewed",
    lastSummary: "Audit on track; all critical controls documented and mapped to requirements.",
    lastModified: "3d ago",
  },
  {
    id: "data-platform",
    name: "Data Platform Rollout",
    client: "Tailspin Toys",
    type: "Infrastructure",
    priority: "Low",
    status: "completed",
    progress: 100,
    documents: 37,
    recentUpdate: "Final handover delivered",
    lastSummary: "Rollout complete; handover documentation delivered and knowledge base archived.",
    lastModified: "1w ago",
  },
]

export const filterGroups = [
  {
    label: "Status",
    options: ["Healthy", "At risk", "Needs review", "Completed", "Blocked"],
  },
  {
    label: "Priority",
    options: ["High", "Medium", "Low"],
  },
  {
    label: "Project type",
    options: [
      "Platform Migration",
      "Product Development",
      "Procurement",
      "Governance",
      "Infrastructure",
    ],
  },
  {
    label: "Client",
    options: ["Northwind Traders", "Contoso Ltd", "Fabrikam Inc", "Adventure Works"],
  },
]

export const sortOptions = [
  "Recently updated",
  "Name (A–Z)",
  "Progress",
  "Priority",
  "Status",
]

/* Preview sections shown on the projects page (previews only) */
export type PreviewSection = {
  icon: LucideIcon
  title: string
  description: string
}

export const previewSections: PreviewSection[] = [
  {
    icon: LayoutDashboard,
    title: "Overview",
    description: "Health, progress, and key signals at a glance.",
  },
  {
    icon: FileText,
    title: "Meeting Notes",
    description: "Summaries and decisions from project meetings.",
  },
  {
    icon: ClipboardList,
    title: "Requirements",
    description: "Scope, requirements, and change history.",
  },
  {
    icon: Database,
    title: "Knowledge Documents",
    description: "Indexed documents powering project intelligence.",
  },
  {
    icon: Sparkles,
    title: "AI Insights",
    description: "Generated summaries and recommendations.",
  },
  {
    icon: ShieldAlert,
    title: "Risks",
    description: "Delivery and operational risks with severity.",
  },
  {
    icon: Activity,
    title: "Activity Timeline",
    description: "Chronological project activity and updates.",
  },
  {
    icon: FolderOpen,
    title: "Recent Files",
    description: "Latest uploaded and generated documents.",
  },
]
