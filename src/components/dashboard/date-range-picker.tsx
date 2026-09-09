"use client";

import { cn } from "@/lib/cn";
import type { DateRangeKey } from "@/lib/types";

const OPTIONS: { key: DateRangeKey; label: string }[] = [
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "90d", label: "90 days" },
  { key: "custom", label: "Custom" },
];

export function DateRangePicker({
  value,
  onChange,
}: {
  value: DateRangeKey;
  onChange: (value: DateRangeKey) => void;
}) {
  return (
    <div
      className="inline-flex rounded-md border border-line bg-white p-0.5"
      role="tablist"
      aria-label="Date range"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.key}
          type="button"
          role="tab"
          aria-selected={value === option.key}
          disabled={option.key === "custom"}
          title={option.key === "custom" ? "Custom ranges arrive with saved views." : undefined}
          onClick={() => onChange(option.key)}
          className={cn(
            "h-8 rounded-[6px] px-2.5 text-[12px] font-medium transition-colors",
            value === option.key
              ? "bg-ink text-white"
              : "text-ink-muted hover:text-ink disabled:opacity-40",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
