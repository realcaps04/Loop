"use client";

import { useMemo, useState } from "react";
import { Plus, Radio, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SentimentBadge, StatusBadge } from "@/components/ui/sentiment-badge";
import { PageHeader } from "@/components/layout/page-header";
import { useAppState } from "@/components/providers/app-state";
import { NOW, THEMES, WORKSPACE } from "@/lib/data/demo";
import { canIngest, channelLabel, formatRelative } from "@/lib/format";
import type { Channel, Feedback, FeedbackStatus, Sentiment } from "@/lib/types";

const PAGE_SIZE = 10;

export function InboxView() {
  const {
    allFeedback,
    setSelectedFeedbackId,
    setAddFeedbackOpen,
    session,
    notify,
    addFeedbackItem,
  } = useAppState();
  const ingest = canIngest(session.user.role);
  const [query, setQuery] = useState("");
  const [channel, setChannel] = useState<Channel | "all">("all");
  const [sentiment, setSentiment] = useState<Sentiment | "all">("all");
  const [status, setStatus] = useState<FeedbackStatus | "all">("all");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    return allFeedback.filter((item) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        item.content.toLowerCase().includes(q) ||
        item.customerLabel.toLowerCase().includes(q);
      const matchesChannel = channel === "all" || item.channel === channel;
      const matchesSentiment = sentiment === "all" || item.sentiment === sentiment;
      const matchesStatus = status === "all" || item.status === status;
      return matchesQuery && matchesChannel && matchesSentiment && matchesStatus;
    });
  }, [allFeedback, channel, query, sentiment, status]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rows = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="mx-auto max-w-content space-y-5 px-4 py-6 md:px-6">
      <PageHeader
        title="Feedback"
        description="Review, filter and act on customer feedback."
        actions={
          <>
            <Button
              variant="secondary"
              disabled={!ingest}
              onClick={() =>
                notify({
                  tone: "info",
                  title: "CSV import is ready in the next pass",
                  description: "Use Add feedback to ingest a single item now.",
                })
              }
            >
              <Upload className="size-4" />
              Import CSV
            </Button>
            <Button
              variant="secondary"
              disabled={!ingest}
              onClick={() => {
                simulateSupport().forEach(addFeedbackItem);
                notify({
                  tone: "success",
                  title: "Simulated Support injected 3 tickets",
                  description: "This is a demo source, not a live integration.",
                });
              }}
            >
              <Radio className="size-4" />
              Simulate channel
            </Button>
            <Button disabled={!ingest} onClick={() => setAddFeedbackOpen(true)}>
              <Plus className="size-4" />
              Add feedback
            </Button>
          </>
        }
      />

      <Card className="p-3">
        <div className="flex flex-col gap-2 lg:flex-row">
          <Input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(0);
            }}
            placeholder="Search customer feedback…"
            className="lg:flex-1"
          />
          <select
            className="h-10 rounded-md border border-line bg-white px-3 text-sm"
            value={channel}
            onChange={(event) => {
              setChannel(event.target.value as Channel | "all");
              setPage(0);
            }}
          >
            <option value="all">All channels</option>
            <option value="support_ticket">Support</option>
            <option value="app_store">App Store</option>
            <option value="nps">NPS</option>
            <option value="sales_note">Sales</option>
            <option value="community">Community</option>
          </select>
          <select
            className="h-10 rounded-md border border-line bg-white px-3 text-sm"
            value={sentiment}
            onChange={(event) => {
              setSentiment(event.target.value as Sentiment | "all");
              setPage(0);
            }}
          >
            <option value="all">All sentiment</option>
            <option value="negative">Negative</option>
            <option value="mixed">Mixed</option>
            <option value="neutral">Neutral</option>
            <option value="positive">Positive</option>
          </select>
          <select
            className="h-10 rounded-md border border-line bg-white px-3 text-sm"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as FeedbackStatus | "all");
              setPage(0);
            }}
          >
            <option value="all">All statuses</option>
            <option value="NEW">New</option>
            <option value="REVIEWED">Reviewed</option>
            <option value="ACTIONED">Actioned</option>
          </select>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-canvas text-[11px] uppercase tracking-[0.06em] text-ink-muted">
              <tr>
                <th className="px-5 py-2.5 font-medium">Feedback</th>
                <th className="px-3 py-2.5 font-medium">Channel</th>
                <th className="px-3 py-2.5 font-medium">Sentiment</th>
                <th className="px-3 py-2.5 font-medium">Theme</th>
                <th className="px-3 py-2.5 font-medium">Customer</th>
                <th className="px-3 py-2.5 font-medium">Status</th>
                <th className="px-5 py-2.5 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => {
                const theme = THEMES.find((theme) => theme.id === item.themeIds[0]);
                return (
                  <tr
                    key={item.id}
                    className="cursor-pointer border-b border-line-subtle last:border-0 transition-colors hover:bg-canvas"
                    onClick={() => setSelectedFeedbackId(item.id)}
                  >
                    <td className="max-w-[340px] px-5 py-3">
                      <p className="truncate text-[13px] text-ink">{item.content}</p>
                      <p className="text-[12px] text-ink-faint">{item.sourceRef}</p>
                    </td>
                    <td className="px-3 py-3 text-[13px] text-ink-secondary">
                      {channelLabel(item.channel)}
                    </td>
                    <td className="px-3 py-3">
                      <SentimentBadge sentiment={item.sentiment} />
                    </td>
                    <td className="px-3 py-3 text-[13px]">{theme?.name}</td>
                    <td className="px-3 py-3 text-[13px]">{item.customerLabel}</td>
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
        <div className="flex items-center justify-between border-t border-line px-5 py-3 text-[13px] text-ink-muted">
          <p>
            {filtered.length} items · page {page + 1} of {pages}
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="secondary"
              disabled={page >= pages - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function simulateSupport(): Feedback[] {
  const now = NOW.toISOString();
  return [
    {
      id: `fb_sim_${Date.now()}_1`,
      content:
        "SSO login failed for three finance users at 8:12am. They were in a redirect loop until we asked them to use incognito.",
      channel: "support_ticket",
      sourceRef: `SIM-${Math.floor(Math.random() * 900) + 100}`,
      customerLabel: "Cobalt Finance",
      sentiment: "negative",
      sentimentScore: 0.12,
      status: "NEW",
      createdAt: now,
      workspaceId: WORKSPACE.id,
      themeIds: ["theme_authentication"],
      featureArea: "SSO",
      aiRationale:
        "Seeded support ticket. LOOP maps redirect-loop language to Authentication.",
    },
    {
      id: `fb_sim_${Date.now()}_2`,
      content:
        "New hire could not find the invite link after setup. We had to resend it from Workspace → Members.",
      channel: "support_ticket",
      sourceRef: `SIM-${Math.floor(Math.random() * 900) + 200}`,
      customerLabel: "Harbor Health",
      sentiment: "negative",
      sentimentScore: 0.22,
      status: "NEW",
      createdAt: now,
      workspaceId: WORKSPACE.id,
      themeIds: ["theme_onboarding"],
      featureArea: "Invites",
      aiRationale:
        "Seeded support ticket. Invite friction during first-run is Onboarding.",
    },
    {
      id: `fb_sim_${Date.now()}_3`,
      content:
        "Follow-up from last week's SAML issue: mapping held through Friday. Thank you for staying on it.",
      channel: "support_ticket",
      sourceRef: `SIM-${Math.floor(Math.random() * 900) + 300}`,
      customerLabel: "Westbrook Legal",
      sentiment: "positive",
      sentimentScore: 0.84,
      status: "NEW",
      createdAt: now,
      workspaceId: WORKSPACE.id,
      themeIds: ["theme_support"],
      featureArea: "Follow-up",
      aiRationale:
        "Seeded support ticket. Direct thanks for resolution is positive Support.",
    },
  ];
}
