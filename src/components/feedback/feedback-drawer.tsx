"use client";

import { useMemo } from "react";
import { Drawer } from "@/components/ui/drawer";
import { SentimentBadge, StatusBadge } from "@/components/ui/sentiment-badge";
import { useAppState } from "@/components/providers/app-state";
import { channelLabel, formatDateTime } from "@/lib/format";

export function FeedbackDrawer() {
  const {
    selectedFeedbackId,
    setSelectedFeedbackId,
    allFeedback,
    session,
  } = useAppState();
  const item = useMemo(
    () => allFeedback.find((entry) => entry.id === selectedFeedbackId),
    [allFeedback, selectedFeedbackId],
  );

  if (!session) return null;

  return (
    <Drawer
      open={Boolean(item)}
      onOpenChange={(open) => {
        if (!open) setSelectedFeedbackId(null);
      }}
      title={item?.customerLabel ?? "Feedback"}
      description={
        item ? `${channelLabel(item.channel)} · ${item.sourceRef}` : undefined
      }
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

          <blockquote className="rounded-xl border border-line bg-canvas px-4 py-3 text-[15px] leading-relaxed text-ink">
            {item.content}
          </blockquote>
        </div>
      ) : null}
    </Drawer>
  );
}
