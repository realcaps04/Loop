"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SentimentBadge } from "@/components/ui/sentiment-badge";
import { PageHeader } from "@/components/layout/page-header";
import { useAppState } from "@/components/providers/app-state";
import { getDashboard } from "@/lib/services/dashboard";

export function ThemesView() {
  const { extraFeedback } = useAppState();
  const data = getDashboard("30d", extraFeedback);

  return (
    <div className="mx-auto max-w-content space-y-5 px-4 py-6 md:px-6">
      <PageHeader
        title="Themes"
        description="Understand the topics customers keep talking about."
      />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {data.topThemes.concat(
          getDashboard("90d", extraFeedback).topThemes.filter(
            (stat) => !data.topThemes.some((item) => item.theme.id === stat.theme.id),
          ),
        ).map((stat) => (
          <Link key={stat.theme.id} href={`/themes/${stat.theme.id}`}>
            <Card className="h-full p-5 transition-colors hover:bg-canvas">
              <div className="flex items-center justify-between">
                <span
                  className="size-2 rounded-full"
                  style={{ background: stat.theme.color }}
                />
                <SentimentBadge sentiment={stat.sentiment} />
              </div>
              <h2 className="mt-4 font-display text-lg font-semibold tracking-tight">
                {stat.theme.name}
              </h2>
              <p className="mt-1 text-sm text-ink-muted">{stat.theme.description}</p>
              <p className="mt-4 text-sm">
                <span className="font-semibold tabular">{stat.count}</span>
                <span className="ml-1 text-ink-muted">mentions in 30 days</span>
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
