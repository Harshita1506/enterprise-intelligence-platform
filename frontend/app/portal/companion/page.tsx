import type { Metadata } from "next"
import { CompanionWorkspace } from "@/components/companion/companion-workspace"

export const metadata: Metadata = {
  title: "AI Companion — Enterprise Intelligence Platform",
  description:
    "Ask across enterprise knowledge and project intelligence. A Copilot-style workspace grounded in your organization's documents, projects, and context.",
}

export default function CompanionPage() {
  return <CompanionWorkspace />
}
