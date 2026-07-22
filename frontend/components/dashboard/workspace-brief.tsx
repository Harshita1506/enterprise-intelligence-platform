import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";
import type { AttentionItem } from "@/lib/dashboard-types";

interface WorkspaceBriefProps {
  attentionItems: AttentionItem[];
}

export function WorkspaceBrief({
  attentionItems,
}: WorkspaceBriefProps) {
  // Show only the top 5 items on the dashboard
  const topItems = attentionItems.slice(0, 5);

  return (
    <section aria-labelledby="workspace-brief-heading">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <AlertTriangle className="h-4 w-4" />
        Knowledge Base Readiness
      </div>

      <h1
        id="workspace-brief-heading"
        className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
      >
        Enterprise Dashboard
      </h1>

      <p className="mt-2 leading-relaxed text-muted-foreground">
        Monitor whether each project's knowledge base is ready for AI analysis.
      </p>

      <ul className="mt-6 space-y-3">
        {topItems.map((item, index) => (
          <li
            key={`${item.project}-${index}`}
            className="flex items-start gap-3 rounded-lg border border-border bg-card/60 p-4"
          >
            <span
              className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-md ${
                item.status === "Ready"
                  ? "bg-green-500/10 text-green-500"
                  : item.status === "Needs More Data"
                  ? "bg-yellow-500/10 text-yellow-500"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              {item.status === "Ready" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : item.status === "Needs More Data" ? (
                <Clock3 className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
            </span>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  {item.project.replace(/_/g, " ")}
                </span>

                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    item.status === "Not Ready"
                      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      : item.status === "Needs More Data"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {item.title}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {attentionItems.length > 5 && (
        <p className="mt-4 text-xs text-muted-foreground">
          Showing 5 of {attentionItems.length} monitored projects.
        </p>
      )}
    </section>
  );
}