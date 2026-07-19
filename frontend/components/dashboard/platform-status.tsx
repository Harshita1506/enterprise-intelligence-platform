import { CheckCircle2 } from "lucide-react";
import type { PlatformStatus as PlatformStatusType } from "@/lib/dashboard-types";

interface PlatformStatusProps {
  status: PlatformStatusType;
}

export function PlatformStatus({ status }: PlatformStatusProps) {
  const statuses = [
    {
      label: "Knowledge Base",
      value: status.knowledge_base,
    },
    {
      label: "Chat API",
      value: status.chat_api,
    },
    {
      label: "LLM",
      value: status.llm,
    },
  ];

  return (
    <section aria-labelledby="platform-status-heading">
      <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>

          <h2
            id="platform-status-heading"
            className="text-sm font-medium text-foreground"
          >
            Platform Status
          </h2>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {statuses.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />

              <div className="flex flex-col leading-tight">
                <span className="text-xs text-muted-foreground">
                  {item.label}
                </span>

                <span className="text-sm font-medium text-foreground">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}