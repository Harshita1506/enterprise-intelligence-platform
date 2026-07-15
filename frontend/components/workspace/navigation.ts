import {
  LayoutDashboard,
  Bot,
  FolderKanban,
  Database,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  description: string
}

export type NavSection = {
  label: string
  items: NavItem[]
}

export const navSections: NavSection[] = [
  {
    label: "Workspace",
    items: [
      {
        label: "Dashboard",
        href: "/portal",
        icon: LayoutDashboard,
        description: "Your intelligence overview",
      },
      {
        label: "AI Companion",
        href: "/portal/companion",
        icon: Bot,
        description: "Ask across enterprise knowledge",
      },
      {
        label: "Projects",
        href: "/portal/projects",
        icon: FolderKanban,
        description: "Project health and summaries",
      },
      {
        label: "Knowledge Base",
        href: "/portal/knowledge",
        icon: Database,
        description: "Indexed documents and sources",
      },
    ],
  },
]
