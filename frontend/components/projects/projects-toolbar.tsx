"use client"

import { useState } from "react"
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Plus,
  Upload,
  Check,
} from "lucide-react"
import { filterGroups, sortOptions } from "@/lib/projects-data"
import { cn } from "@/lib/utils"

export function ProjectsToolbar() {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const [activeSort, setActiveSort] = useState(sortOptions[0])
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  function toggleFilter(option: string) {
    setActiveFilters((prev) =>
      prev.includes(option) ? prev.filter((f) => f !== option) : [...prev, option],
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative min-w-48 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search projects…"
            aria-label="Search projects"
            className="h-9 w-full rounded-lg border border-input bg-card/60 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/30"
          />
        </div>

        {/* Filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setFiltersOpen((v) => !v)
              setSortOpen(false)
            }}
            aria-expanded={filtersOpen}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-colors",
              activeFilters.length > 0 || filtersOpen
                ? "border-border bg-muted text-foreground"
                : "border-border bg-card/60 text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter
            {activeFilters.length > 0 ? (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {activeFilters.length}
              </span>
            ) : null}
          </button>

          {filtersOpen ? (
            <div className="absolute right-0 z-20 mt-2 w-72 rounded-xl border border-border bg-popover p-3 shadow-xl">
              {filterGroups.map((group) => (
                <div key={group.label} className="mb-3 last:mb-0">
                  <p className="px-1 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.options.map((option) => {
                      const active = activeFilters.includes(option)
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleFilter(option)}
                          className={cn(
                            "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                            active
                              ? "border-primary/40 bg-primary/15 text-foreground"
                              : "border-border bg-background/60 text-muted-foreground hover:text-foreground",
                          )}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* Sort */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setSortOpen((v) => !v)
              setFiltersOpen(false)
            }}
            aria-expanded={sortOpen}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card/60 px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{activeSort}</span>
          </button>

          {sortOpen ? (
            <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-border bg-popover p-1.5 shadow-xl">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setActiveSort(option)
                    setSortOpen(false)
                  }}
                  className="flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-muted"
                >
                  {option}
                  {activeSort === option ? (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  ) : null}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* Actions */}
        <button
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card/60 px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Upload className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Upload documents</span>
        </button>
        <button
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add project
        </button>
      </div>

      {/* Active filter chips */}
      {activeFilters.length > 0 ? (
        <div className="flex flex-wrap items-center gap-1.5">
          {activeFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => toggleFilter(f)}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-foreground"
            >
              {f}
              <span className="text-muted-foreground">×</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setActiveFilters([])}
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Clear all
          </button>
        </div>
      ) : null}
    </div>
  )
}
