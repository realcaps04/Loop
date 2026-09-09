"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { DashboardData } from "@/lib/types";

export function SentimentDistribution({
  sentiment,
}: {
  sentiment: DashboardData["sentiment"];
}) {
  const total = Math.max(sentiment.total, 1);
  const parts = [
    { key: "negative", label: "Negative", value: sentiment.negative, className: "bg-sentiment-negative" },
    { key: "mixed", label: "Mixed", value: sentiment.mixed, className: "bg-amber-500" },
    { key: "neutral", label: "Neutral", value: sentiment.neutral, className: "bg-stone-400" },
    { key: "positive", label: "Positive", value: sentiment.positive, className: "bg-sentiment-positive" },
  ];

  return (
    <Card className="h-full">
      <CardHeader
        title="Sentiment"
        description="Share of classified feedback in this window."
      />
      <div className="px-5 py-5">
        <p className="font-display text-3xl font-semibold tabular tracking-tight">
          {Math.round((sentiment.negative / total) * 100)}%
        </p>
        <p className="mt-1 text-sm text-ink-muted">
          Negative share — the number product and support should watch.
        </p>
        <div className="mt-5 flex h-2.5 overflow-hidden rounded-full bg-line-subtle">
          {parts.map((part) => (
            <span
              key={part.key}
              className={cn(part.className, "h-full")}
              style={{ width: `${(part.value / total) * 100}%` }}
            />
          ))}
        </div>
        <ul className="mt-5 space-y-2.5">
          {parts.map((part) => (
            <li key={part.key} className="flex items-center justify-between text-sm">
              <span className="inline-flex items-center gap-2 text-ink-secondary">
                <span className={cn("size-1.5 rounded-full", part.className)} />
                {part.label}
              </span>
              <span className="tabular text-ink">
                {part.value}
                <span className="ml-2 text-ink-faint">
                  {Math.round((part.value / total) * 100)}%
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
