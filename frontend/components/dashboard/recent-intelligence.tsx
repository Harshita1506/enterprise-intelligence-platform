import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import type { AIUpdate } from "@/lib/dashboard-types";

interface RecentIntelligenceProps {
  updates: AIUpdate[];
}

export function RecentIntelligence({
  updates,
}: RecentIntelligenceProps) {
  return (
    <section aria-labelledby="recent-intelligence-heading">
      <h2
        id="recent-intelligence-heading"
        className="text-sm font-semibold tracking-tight text-foreground"
      >
        Recent AI Intelligence
      </h2>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {updates.map((update, index) => (
          <article
            key={`${update.project}-${index}`}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-all duration-300 hover:border-primary/40 hover:bg-card"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(70% 60% at 50% 0%, oklch(0.65 0.15 235 / 0.08), transparent 70%)",
              }}
            />

            <div className="relative">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <FileText className="h-4 w-4" />
                </span>

                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {update.project}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                AI Update
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {update.summary}
              </p>

              <Link
                href="/portal/companion"
                className="group/cta mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-accent"
              >
                Open AI Companion
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}