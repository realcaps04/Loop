"use client";

import { useMemo } from "react";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { SentimentBadge, StatusBadge } from "@/components/ui/sentiment-badge";
import { useAppState } from "@/components/providers/app-state";
import { THEMES } from "@/lib/data/demo";
import { canIngest, channelLabel, formatDateTime } from "@/lib/format";

export function FeedbackDrawer() {
  const {
    selectedFeedbackId,
    setSelectedFeedbackId,
    allFeedback,
    session,
    notify,
  } = useAppState();
  const item = useMemo(
    () => allFeedback.find((entry) => entry.id === selectedFeedbackId),
    [allFeedback, selectedFeedbackId],
  );
  const theme = THEMES.find((theme) => theme.id === item?.themeIds[0]);
  const canEdit = canIngest(session.user.role);

  return (
    <Drawer
      open={Boolean(item)}
      onOpenChange={(open) => {
        if (!open) setSelectedFeedbackId(null);
      }}
      title={item?.customerLabel ?? "Feedback"}
      description={item ? `${channelLabel(item.channel)} · ${item.sourceRef}` : undefined}
    >
      {item ? (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <SentimentBadge sentiment={item.sentiment} />
            <StatusBadge status={item.status} />
            <span className="text-[12px] text-ink-muted">
              {formatDateTime(item.createdAt)}
            </span>
          </div>

          <blockquote className="rounded-md border border-line bg-canvas px-4 py-3 text-[15px] leading-relaxed text-ink">
            {item.content}
          </blockquote>

          <dl className="grid grid-cols-2 gap-4 text-sm">
            <Meta label="Theme" value={theme?.name ?? "Unassigned"} />
            <Meta label="Feature area" value={item.featureArea} />
            <Meta
              label="Sentiment score"
              value={item.sentimentScore.toFixed(2)}
            />
            <Meta label="Customer" value={item.customerLabel} />
          </dl>

          <section className="rounded-md border border-line p-4">
            <p className="eyebrow">LOOP analysis</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
              {item.aiRationale}
            </p>
            <p className="mt-3 text-[12px] text-ink-muted">
              Classification is grounded in the original wording above — LOOP does not invent customer intent.
            </p>
          </section>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              disabled={!canEdit}
              title={
                canEdit
                  ? "Re-classify this feedback"
                  : "Only analysts and admins can reclassify feedback."
              }
              onClick={() =>
                notify({
                  tone: canEdit ? "success" : "info",
                  title: canEdit
                    ? "Reclassification queued"
                    : "Only analysts and admins can reclassify feedback.",
                })
              }
            >
              Re-classify
            </Button>
          </div>
        </div>
      ) : null}
    </Drawer>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.06em] text-ink-muted">
        {label}
      </dt>
      <dd className="mt-1 font-medium text-ink">{value}</dd>
    </div>
  );
}
