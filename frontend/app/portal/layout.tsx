import type { Metadata } from "next"
import { WorkspaceShell } from "@/components/workspace/workspace-shell"

export const metadata: Metadata = {
  title: "Workspace — Enterprise Intelligence Platform",
  description:
    "Your enterprise intelligence workspace: monitor project health, search knowledge, and act on AI-generated insights.",
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <WorkspaceShell>{children}</WorkspaceShell>
}
