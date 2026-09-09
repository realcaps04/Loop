"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageSquare, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { DateRangePicker } from "@/components/dashboard/date-range-picker";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { VolumeChart } from "@/components/dashboard/volume-chart";
import { SentimentDistribution } from "@/components/dashboard/sentiment-distribution";
import { TopThemes } from "@/components/dashboard/top-themes";
import { EmergingSignals } from "@/components/dashboard/emerging-signals";
import { RecentFeedback } from "@/components/dashboard/recent-feedback";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { useAppState } from "@/components/providers/app-state";
import { BrandWord } from "@/components/brand/brand-word";
import { getDashboard } from "@/lib/services/dashboard";
import { canIngest, greetingForNow, rangeLabel } from "@/lib/format";
import type { DateRangeKey } from "@/lib/types";

export function DashboardView() {
  const router = useRouter();
  const { extraFeedback, setAddFeedbackOpen, session } = useAppState();
  const [range, setRange] = useState<DateRangeKey>("30d");
  const [loading, setLoading] = useState(true);
  const ingest = canIngest(session.user.role);

  const data = useMemo(
    () => getDashboard(range, extraFeedback),
    [extraFeedback, range],
  );

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 420);
    return () => window.clearTimeout(timer);
  }, [range, extraFeedback]);

  if (loading) return <DashboardSkeleton />;

  if (data.empty) {
    return (
      <div className="mx-auto max-w-content px-4 py-10 md:px-6">
        <EmptyState
          title="Your customer intelligence starts here."
          description="LOOP needs feedback before it can show what changed. Add a few items or import a CSV to open the loop."
          actions={
            <>
              <Button onClick={() => setAddFeedbackOpen(true)}>Add feedback</Button>
              <Button variant="secondary" onClick={() => router.push("/inbox")}>
                Import CSV
              </Button>
            </>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-content space-y-5 px-4 py-6 md:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Northstar · {rangeLabel(range)}</p>
          <h1 className="mt-1 font-display text-display-md font-semibold text-ink">
            {greetingForNow()}, {data.greetingName}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            Here&apos;s what changed in your customer feedback.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DateRangePicker value={range} onChange={setRange} />
          <Button variant="secondary" onClick={() => router.push("/ask")}>
            <MessageSquare className="size-4" />
            Ask <BrandWord />
          </Button>
          <Button
            onClick={() => setAddFeedbackOpen(true)}
            disabled={!ingest}
            title={
              ingest ? "Add feedback" : "Only analysts and admins can ingest feedback."
            }
          >
            <Plus className="size-4" />
            Add feedback
          </Button>
        </div>
      </div>

      <KpiGrid items={data.kpis} />

      <div className="grid gap-3 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <VolumeChart data={data.volume} />
        </div>
        <div className="xl:col-span-4">
          <SentimentDistribution sentiment={data.sentiment} />
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <TopThemes themes={data.topThemes} />
        </div>
        <div className="xl:col-span-5">
          <EmergingSignals signals={data.signals} />
        </div>
      </div>

      <RecentFeedback items={data.recent} />
    </div>
  );
}
