"use client";

import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card";
import { SentimentBadge, StatusBadge } from "@/components/ui/sentiment-badge";
import { useAppState } from "@/components/providers/app-state";
import { THEMES } from "@/lib/data/demo";
import { channelLabel, formatRelative } from "@/lib/format";
import type { Feedback } from "@/lib/types";

export function RecentFeedback({ items }: { items: Feedback[] }) {
  const { setSelectedFeedbackId } = useAppState();

  return (
    <Card>
      <CardHeader
        title="Recent feedback"
        description="Original customer wording, classified and ready to inspect."
        action={
          <Link href="/inbox" className="text-[13px] font-medium text-accent">
            Open inbox
          </Link>
        }
      />
      <div className="divide-y border-line md:hidden">
        {items.map((item) => {
          const theme = THEMES.find((entry) => entry.id === item.themeIds[0]);
          return (
            <button
              key={item.id}
              type="button"
              className="w-full px-5 py-3 text-left hover:bg-canvas"
              onClick={() => setSelectedFeedbackId(item.id)}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium">{item.customerLabel}</p>
                <SentimentBadge sentiment={item.sentiment} />
              </div>
              <p className="mt-1 line-clamp-2 text-[13px] text-ink-muted">
                {item.content}
              </p>
              <p className="mt-2 text-[12px] text-ink-faint">
                {channelLabel(item.channel)} · {theme?.name} · {formatRelative(item.createdAt)}
              </p>
            </button>
          );
        })}
      </div>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="sticky top-0 bg-white text-[11px] uppercase tracking-[0.06em] text-ink-muted">
            <tr className="border-b border-line">
              <th className="px-5 py-2.5 font-medium">Feedback</th>
              <th className="px-3 py-2.5 font-medium">Channel</th>
              <th className="px-3 py-2.5 font-medium">Sentiment</th>
              <th className="px-3 py-2.5 font-medium">Theme</th>
              <th className="px-3 py-2.5 font-medium">Status</th>
              <th className="px-5 py-2.5 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const theme = THEMES.find((entry) => entry.id === item.themeIds[0]);
              return (
                <tr
                  key={item.id}
                  className="cursor-pointer border-b border-line-subtle last:border-0 transition-colors hover:bg-canvas"
                  onClick={() => setSelectedFeedbackId(item.id)}
                >
                  <td className="max-w-[360px] px-5 py-3">
                    <p className="truncate font-medium text-ink">
                      {item.customerLabel}
                    </p>
                    <p className="truncate text-[13px] text-ink-muted">
                      {item.content}
                    </p>
                  </td>
                  <td className="px-3 py-3 text-[13px] text-ink-secondary">
                    {channelLabel(item.channel)}
                  </td>
                  <td className="px-3 py-3">
                    <SentimentBadge sentiment={item.sentiment} />
                  </td>
                  <td className="px-3 py-3 text-[13px]">{theme?.name}</td>
                  <td className="px-3 py-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-5 py-3 text-[13px] text-ink-muted">
                    {formatRelative(item.createdAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
