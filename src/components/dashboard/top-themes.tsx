"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { SentimentBadge } from "@/components/ui/sentiment-badge";
import { formatPercent } from "@/lib/format";
import type { ThemeStat } from "@/lib/types";

export function TopThemes({ themes }: { themes: ThemeStat[] }) {
  return (
    <Card className="h-full">
      <CardHeader
        title="Top themes"
        description="Where customers spent their words."
        action={
          <Link href="/themes" className="text-[13px] font-medium text-accent">
            View all
          </Link>
        }
      />
      <ul>
        {themes.map((stat, index) => (
          <li key={stat.theme.id} className="border-b border-line-subtle last:border-0">
            <Link
              href={`/themes/${stat.theme.id}`}
              className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-canvas"
            >
              <span className="w-4 text-[12px] tabular text-ink-faint">
                {index + 1}
              </span>
              <span
                className="size-2 rounded-full"
                style={{ background: stat.theme.color }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{stat.theme.name}</p>
                <p className="text-[12px] text-ink-muted">
                  {stat.count} mentions
                </p>
              </div>
              <SentimentBadge sentiment={stat.sentiment} />
              <span className="inline-flex w-16 items-center justify-end text-[12px] font-medium">
                {stat.trend === "down" ? (
                  <ArrowDownRight className="size-3.5 text-ink-muted" />
                ) : (
                  <ArrowUpRight className="size-3.5 text-ink-muted" />
                )}
                <span className="tabular">{formatPercent(stat.delta, 0)}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
