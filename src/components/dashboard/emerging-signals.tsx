"use client";

import { ArrowUpRight } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { formatPercent } from "@/lib/format";
import type { EmergingSignal } from "@/lib/types";

const KIND: Record<EmergingSignal["kind"], string> = {
  spike: "Spike",
  shift: "Sentiment",
  volume: "Volume",
  concern: "Concern",
};

export function EmergingSignals({ signals }: { signals: EmergingSignal[] }) {
  return (
    <Card className="h-full">
      <CardHeader
        title="What changed"
        description="Emerging signals, not vanity volume."
      />
      {signals.length === 0 ? (
        <div className="p-5">
          <EmptyState
            title="LOOP needs more feedback to identify meaningful trends."
            description="Signals appear when a theme accelerates, sentiment shifts, or volume breaks its recent pattern."
          />
        </div>
      ) : (
        <ul>
          {signals.map((signal) => (
            <li
              key={signal.id}
              className="border-b border-line-subtle px-5 py-4 last:border-0"
            >
              <div className="flex items-center gap-2">
                <span className="eyebrow">{KIND[signal.kind]}</span>
                {typeof signal.delta === "number" ? (
                  <span className="inline-flex items-center text-[12px] font-medium text-sentiment-negative">
                    <ArrowUpRight className="size-3.5" />
                    {formatPercent(signal.delta, 0)}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-sm font-medium text-ink">{signal.title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                {signal.detail}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
