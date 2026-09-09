"use client";

import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { cn } from "@/lib/cn";
import { formatPercent } from "@/lib/format";
import type { Kpi } from "@/lib/types";

export function KpiGrid({ items }: { items: Kpi[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((kpi) => (
        <KpiCard key={kpi.key} kpi={kpi} />
      ))}
    </div>
  );
}

function KpiCard({ kpi }: { kpi: Kpi }) {
  const up = kpi.delta > 0.4;
  const down = kpi.delta < -0.4;
  const DeltaIcon = up ? ArrowUpRight : down ? ArrowDownRight : Minus;
  const negativeMetric = kpi.key === "negative";
  const deltaTone = negativeMetric
    ? up
      ? "text-sentiment-negative"
      : "text-sentiment-positive"
    : up
      ? "text-sentiment-positive"
      : down
        ? "text-sentiment-negative"
        : "text-ink-muted";

  return (
    <Card className="px-4 py-4">
      <p className="text-[12px] font-medium text-ink-muted">{kpi.label}</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <p
          className={cn(
            "font-display text-[1.75rem] font-semibold tabular tracking-tight",
            kpi.tone === "negative" && "text-sentiment-negative",
          )}
        >
          <AnimatedNumber value={kpi.value} />
        </p>
        <span className={cn("inline-flex items-center text-[12px] font-medium", deltaTone)}>
          <DeltaIcon className="size-3.5" />
          {formatPercent(kpi.delta)}
        </span>
      </div>
      <p className="mt-1 text-[12px] text-ink-faint">
        {kpi.key === "emerging" ? kpi.hint : `${kpi.hint}`}
      </p>
    </Card>
  );
}
