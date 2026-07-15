import { WorkspaceBrief } from "@/components/dashboard/workspace-brief"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentIntelligence } from "@/components/dashboard/recent-intelligence"
import { ProjectSnapshot } from "@/components/dashboard/project-snapshot"
import { PlatformStatus } from "@/components/dashboard/platform-status"

export default function DashboardPage() {
  return (
    <div className="space-y-12">
      <WorkspaceBrief />
      <QuickActions />
      <RecentIntelligence />
      <ProjectSnapshot />
      <PlatformStatus />
    </div>
  )
}
