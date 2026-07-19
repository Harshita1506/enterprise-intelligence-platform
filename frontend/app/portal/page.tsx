import { get } from "@/lib/api";

import { WorkspaceBrief } from "@/components/dashboard/workspace-brief";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentIntelligence } from "@/components/dashboard/recent-intelligence";
import { ProjectSnapshot } from "@/components/dashboard/project-snapshot";
import { PlatformStatus } from "@/components/dashboard/platform-status";

export default async function DashboardPage() {
  const response = await get("/api/dashboard");
  const dashboard = response.data;

  return (
    <main className="space-y-8">
      <WorkspaceBrief
        attentionItems={dashboard.attention_items}
      />

      <ProjectSnapshot
        stats={dashboard.stats}
      />

      <QuickActions />

      <RecentIntelligence
        updates={dashboard.ai_updates}
      />

      <PlatformStatus
        status={dashboard.platform_status}
      />
    </main>
  );
}