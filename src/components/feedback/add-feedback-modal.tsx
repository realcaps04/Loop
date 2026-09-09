"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SentimentBadge } from "@/components/ui/sentiment-badge";
import { useAppState } from "@/components/providers/app-state";
import { NOW, THEMES, WORKSPACE } from "@/lib/data/demo";
import { canIngest } from "@/lib/format";
import type { Channel, Feedback, Sentiment } from "@/lib/types";

const STEPS = [
  "Reading the original wording…",
  "Finding related themes…",
  "Comparing sentiment…",
  "Scoring confidence…",
];

export function AddFeedbackModal() {
  const {
    addFeedbackOpen,
    setAddFeedbackOpen,
    addFeedbackItem,
    notify,
    session,
  } = useAppState();
  const ingest = canIngest(session.user.role);
  const [content, setContent] = useState("");
  const [channel, setChannel] = useState<Channel>("support_ticket");
  const [customer, setCustomer] = useState("");
  const [source, setSource] = useState("");
  const [phase, setPhase] = useState<"form" | "analyzing" | "result">("form");
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState<Feedback | null>(null);

  function reset() {
    setContent("");
    setCustomer("");
    setSource("");
    setChannel("support_ticket");
    setPhase("form");
    setStepIndex(0);
    setResult(null);
  }

  function analyze() {
    if (!ingest) return;
    if (content.trim().length < 12) {
      notify({
        tone: "error",
        title: "Feedback is too short",
        description: "Add the original customer wording so LOOP can classify it.",
      });
      return;
    }
    setPhase("analyzing");
    setStepIndex(0);
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setStepIndex(i);
      if (i >= STEPS.length) {
        window.clearInterval(timer);
        const classified = classify(content, channel, customer, source);
        setResult(classified);
        setPhase("result");
      }
    }, 650);
  }

  function commit() {
    if (!result) return;
    addFeedbackItem(result);
    notify({
      tone: "success",
      title: "Feedback added",
      description: "LOOP classified it and added it to this workspace.",
    });
    setAddFeedbackOpen(false);
    reset();
  }

  return (
    <Modal
      open={addFeedbackOpen}
      onOpenChange={(open) => {
        setAddFeedbackOpen(open);
        if (!open) reset();
      }}
      title="Add feedback"
      description="Paste original customer wording. LOOP will classify it against your workspace themes."
    >
      {!ingest ? (
        <p className="rounded-md bg-line-subtle px-3 py-2 text-sm text-ink-secondary">
          Only analysts and admins can ingest feedback.
        </p>
      ) : null}

      {phase === "form" ? (
        <div className="space-y-3">
          <label className="block text-[13px] font-medium">
            Feedback content
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={5}
              placeholder="What did the customer actually say?"
              className="mt-1.5 w-full rounded-md border border-line px-3 py-2 text-sm shadow-loop-sm outline-none focus:border-accent focus:ring-4 focus:ring-accent/15"
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-[13px] font-medium">
              Channel
              <select
                value={channel}
                onChange={(event) => setChannel(event.target.value as Channel)}
                className="mt-1.5 h-10 w-full rounded-md border border-line bg-white px-3 text-sm"
              >
                <option value="support_ticket">Support ticket</option>
                <option value="app_store">App Store review</option>
                <option value="nps">NPS survey</option>
                <option value="sales_note">Sales call note</option>
                <option value="community">Community post</option>
              </select>
            </label>
            <label className="text-[13px] font-medium">
              Customer label
              <Input
                className="mt-1.5"
                value={customer}
                onChange={(event) => setCustomer(event.target.value)}
                placeholder="Harbor Health"
              />
            </label>
          </div>
          <label className="block text-[13px] font-medium">
            Source reference
            <Input
              className="mt-1.5"
              value={source}
              onChange={(event) => setSource(event.target.value)}
              placeholder="NS-2481"
            />
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setAddFeedbackOpen(false)}>
              Cancel
            </Button>
            <Button onClick={analyze} disabled={!ingest}>
              Analyze feedback
            </Button>
          </div>
        </div>
      ) : null}

      {phase === "analyzing" ? (
        <div className="py-6">
          <p className="font-display text-base font-semibold">
            LOOP is analyzing this feedback…
          </p>
          <ul className="mt-4 space-y-2">
            {STEPS.map((step, index) => (
              <li
                key={step}
                className={`text-sm ${index <= stepIndex ? "text-ink" : "text-ink-faint"}`}
              >
                {index === stepIndex ? "● " : index < stepIndex ? "✓ " : "○ "}
                {step}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {phase === "result" && result ? (
        <div className="space-y-4">
          <p className="text-sm text-ink-muted">
            Classification is based on the submitted wording, not inferred company knowledge.
          </p>
          <div className="grid grid-cols-2 gap-3 rounded-md border border-line p-3 text-sm">
            <div>
              <p className="text-[11px] uppercase tracking-[0.06em] text-ink-muted">
                Sentiment
              </p>
              <div className="mt-1">
                <SentimentBadge sentiment={result.sentiment} />
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.06em] text-ink-muted">
                Theme
              </p>
              <p className="mt-1 font-medium">
                {THEMES.find((theme) => theme.id === result.themeIds[0])?.name}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.06em] text-ink-muted">
                Feature area
              </p>
              <p className="mt-1 font-medium">{result.featureArea}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.06em] text-ink-muted">
                Confidence
              </p>
              <p className="mt-1 font-medium tabular">
                {Math.round(result.sentimentScore * 100)}%
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setPhase("form")}>
              Edit
            </Button>
            <Button onClick={commit}>Add to inbox</Button>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}

function classify(
  content: string,
  channel: Channel,
  customer: string,
  source: string,
): Feedback {
  const text = content.toLowerCase();
  const rules: { key: string; themeId: string; area: string }[] = [
    { key: "login", themeId: "theme_authentication", area: "SSO" },
    { key: "sso", themeId: "theme_authentication", area: "SSO" },
    { key: "password", themeId: "theme_authentication", area: "Password reset" },
    { key: "onboard", themeId: "theme_onboarding", area: "Setup wizard" },
    { key: "invite", themeId: "theme_onboarding", area: "Invites" },
    { key: "invoice", themeId: "theme_billing", area: "Invoices" },
    { key: "billed", themeId: "theme_billing", area: "Invoices" },
    { key: "slow", themeId: "theme_performance", area: "Load time" },
    { key: "crash", themeId: "theme_mobile", area: "iOS reports" },
    { key: "ios", themeId: "theme_mobile", area: "iOS reports" },
    { key: "slack", themeId: "theme_integrations", area: "Slack" },
    { key: "export", themeId: "theme_export", area: "CSV" },
    { key: "report", themeId: "theme_reporting", area: "Scheduled reports" },
  ];
  const hit = rules.find((rule) => text.includes(rule.key));
  const negative =
    /fail|crash|slow|never|broken|angry|twice|timeout|blocked/.test(text);
  const positive = /love|great|excellent|finally|excellent/.test(text);
  const sentiment: Sentiment = negative
    ? "negative"
    : positive
      ? "positive"
      : "mixed";

  return {
    id: `fb_live_${Date.now()}`,
    content,
    channel,
    sourceRef: source || `manual-${Date.now()}`,
    customerLabel: customer || "Unnamed customer",
    sentiment,
    sentimentScore: negative ? 0.18 : positive ? 0.84 : 0.5,
    status: "NEW",
    createdAt: NOW.toISOString(),
    workspaceId: WORKSPACE.id,
    themeIds: [hit?.themeId ?? "theme_support"],
    featureArea: hit?.area ?? "Unspecified",
    aiRationale: hit
      ? `LOOP mapped this to ${THEMES.find((theme) => theme.id === hit.themeId)?.name} because the wording references ${hit.area.toLowerCase()}. Sentiment comes from the customer's own language, not a workspace assumption.`
      : "No strong theme keyword was found, so LOOP assigned Support until an analyst confirms.",
  };
}
