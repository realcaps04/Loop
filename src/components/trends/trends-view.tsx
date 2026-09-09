"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { VolumeChart } from "@/components/dashboard/volume-chart";
import { EmergingSignals } from "@/components/dashboard/emerging-signals";
import { useAppState } from "@/components/providers/app-state";
import { getDashboard } from "@/lib/services/dashboard";
import { formatPercent } from "@/lib/format";

export function TrendsView() {
  const { extraFeedback } = useAppState();
  const data = getDashboard("30d", extraFeedback);
  const growing = [...data.topThemes].sort((a, b) => b.delta - a.delta).slice(0, 3);
  const declining = [...data.topThemes].sort((a, b) => a.delta - b.delta).slice(0, 3);

  return (
    <div className="mx-auto max-w-content space-y-5 px-4 py-6 md:px-6">
      <PageHeader
        title="Trends"
        description="Identify emerging customer problems before they become obvious."
      />
      <div className="grid gap-3 md:grid-cols-3">
        {growing.map((stat) => (
          <Card key={stat.theme.id} className="p-4">
            <p className="eyebrow">Accelerating</p>
            <p className="mt-2 font-display text-lg font-semibold">{stat.theme.name}</p>
            <p className="mt-1 text-sm text-sentiment-negative">
              {formatPercent(stat.delta)} vs previous period
            </p>
            <p className="mt-2 text-[13px] text-ink-muted">
              Mention volume moved from {stat.previousCount} → {stat.count}.
            </p>
          </Card>
        ))}
      </div>
      <VolumeChart data={data.volume} />
      <div className="grid gap-3 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <EmergingSignals signals={data.signals} />
        </div>
        <Card className="xl:col-span-5">
          <CardHeader title="Declining themes" description="Topics cooling off in this window." />
          <ul>
            {declining.map((stat) => (
              <li key={stat.theme.id} className="flex items-center justify-between px-5 py-3">
                <span className="text-sm">{stat.theme.name}</span>
                <span className="text-[13px] text-ink-muted">{formatPercent(stat.delta)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
