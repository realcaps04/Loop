"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/layout/page-header";
import { useAppState } from "@/components/providers/app-state";

const REPORTS = [
  {
    id: "rep_week",
    title: "Weekly Customer Intelligence",
    period: "Sep 2 – Sep 8",
    generated: "Sep 8, 2026",
    author: "Maya Chen",
    status: "Ready",
    summary: "Authentication accelerated. Onboarding remains the loudest source of friction.",
  },
  {
    id: "rep_aug",
    title: "Monthly Voice of Customer",
    period: "Aug 1 – Aug 31",
    generated: "Sep 1, 2026",
    author: "Jordan Hale",
    status: "Ready",
    summary: "Billing surprises and iOS report crashes showed up in both support and app reviews.",
  },
];

export function ReportsView() {
  const { notify } = useAppState();

  return (
    <div className="mx-auto max-w-content space-y-5 px-4 py-6 md:px-6">
      <PageHeader
        title="Voice of Customer"
        description="Turn customer feedback into an executive-ready narrative."
        actions={
          <Button
            onClick={() =>
              notify({
                tone: "info",
                title: "Report generation is next",
                description: "The library below is ready to open.",
              })
            }
          >
            Generate report
          </Button>
        }
      />
      {REPORTS.length === 0 ? (
        <EmptyState
          title="Generate your first Voice-of-Customer report."
          description="LOOP writes from classified feedback, not from a blank template."
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {REPORTS.map((report) => (
            <a key={report.id} href={`/reports/${report.id}`}>
              <Card className="h-full p-5 transition-colors hover:bg-canvas">
                <p className="eyebrow">{report.status}</p>
                <h2 className="mt-2 font-display text-lg font-semibold">{report.title}</h2>
                <p className="mt-1 text-sm text-ink-muted">{report.period}</p>
                <p className="mt-3 text-sm text-ink-secondary">{report.summary}</p>
                <p className="mt-4 text-[12px] text-ink-faint">
                  Generated {report.generated} · {report.author}
                </p>
              </Card>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
