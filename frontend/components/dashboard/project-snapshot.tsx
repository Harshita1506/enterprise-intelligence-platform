import type { DashboardStats } from "@/lib/dashboard-types";

interface ProjectSnapshotProps {
  stats: DashboardStats;
}

export function ProjectSnapshot({ stats }: ProjectSnapshotProps) {
  const cards = [
    {
      label: "Total Projects",
      value: stats.total_projects,
    },
    {
      label: "Active Projects",
      value: stats.active_projects,
    },
    {
      label: "Documents",
      value: stats.total_documents,
    },
    {
      label: "Knowledge Chunks",
      value: stats.total_chunks,
    },
  ];

  return (
    <section aria-labelledby="project-overview-heading">
      <h2
        id="project-overview-heading"
        className="text-sm font-semibold tracking-tight text-foreground"
      >
        Enterprise Overview
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur"
          >
            <p className="text-sm text-muted-foreground">
              {card.label}
            </p>

            <p className="mt-2 text-3xl font-bold text-foreground">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}