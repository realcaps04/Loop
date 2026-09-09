"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { SentimentBadge } from "@/components/ui/sentiment-badge";
import { PageHeader } from "@/components/layout/page-header";
import { useAppState } from "@/components/providers/app-state";
import { THEMES } from "@/lib/data/demo";
import { getDashboard } from "@/lib/services/dashboard";
import { formatPercent } from "@/lib/format";

export function ThemeDetailView({ id }: { id: string }) {
  const { extraFeedback, setSelectedFeedbackId, allFeedback } = useAppState();
  const theme = THEMES.find((item) => item.id === id);
  const data = getDashboard("30d", extraFeedback);
  const stat = data.topThemes.find((item) => item.theme.id === id);
  const evidence = allFeedback.filter((item) => item.themeIds.includes(id)).slice(0, 5);

  if (!theme) {
    return (
      <div className="mx-auto max-w-content px-4 py-10 md:px-6">
        <EmptyState
          title="This theme is not in the workspace."
          description="It may have been merged, or the link is from another tenant."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-content space-y-5 px-4 py-6 md:px-6">
      <PageHeader
        eyebrow="Themes"
        title={theme.name}
        description={theme.description}
      />
      <div className="grid gap-3 md:grid-cols-3">
        <Card className="p-4">
          <p className="text-[12px] text-ink-muted">Mentions · 30 days</p>
          <p className="mt-1 font-display text-2xl font-semibold tabular">
            {stat?.count ?? 0}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-[12px] text-ink-muted">Change vs previous</p>
          <p className="mt-1 font-display text-2xl font-semibold tabular">
            {formatPercent(stat?.delta ?? 0)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-[12px] text-ink-muted">Sentiment</p>
          <div className="mt-2">
            <SentimentBadge sentiment={stat?.sentiment ?? "neutral"} />
          </div>
        </Card>
      </div>
      <Card>
        <CardHeader
          title="Evidence"
          description="This insight comes from actual customer feedback."
        />
        <ul>
          {evidence.map((item) => (
            <li key={item.id} className="border-t border-line-subtle first:border-0">
              <button
                type="button"
                className="w-full px-5 py-4 text-left hover:bg-canvas"
                onClick={() => setSelectedFeedbackId(item.id)}
              >
                <p className="text-sm text-ink">{item.content}</p>
                <p className="mt-1 text-[12px] text-ink-muted">
                  {item.customerLabel} · {item.sourceRef}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
