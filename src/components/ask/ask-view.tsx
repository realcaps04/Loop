"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SentimentBadge } from "@/components/ui/sentiment-badge";
import { PageHeader } from "@/components/layout/page-header";
import { useAppState } from "@/components/providers/app-state";
import { FEEDBACK, THEMES } from "@/lib/data/demo";
import { channelLabel, formatDate } from "@/lib/format";

const EXAMPLES = [
  "What are customers most frustrated about?",
  "What should we improve next?",
  "Why is sentiment declining?",
  "What are users saying about onboarding?",
  "Which themes are growing fastest?",
  "What do customers love?",
];

const STEPS = [
  "Retrieving matching feedback…",
  "Comparing sentiment across themes…",
  "Collecting supporting evidence…",
  "Synthesizing a grounded answer…",
];

export function AskView() {
  const { setSelectedFeedbackId } = useAppState();
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState<"idle" | "thinking" | "done">("idle");
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState<ReturnType<typeof groundedAnswer> | null>(null);

  function ask(text: string) {
    const q = text.trim();
    if (!q) return;
    setQuery(q);
    setPhase("thinking");
    setStep(0);
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setStep(i);
      if (i >= STEPS.length) {
        window.clearInterval(timer);
        setAnswer(groundedAnswer(q));
        setPhase("done");
      }
    }, 520);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5 px-4 py-6 md:px-6">
      <PageHeader
        title="Ask LOOP"
        description="Ask questions. Get answers grounded in your customer feedback."
      />

      <Card className="p-4">
        <textarea
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="What are customers saying about onboarding?"
          rows={3}
          className="w-full resize-none bg-transparent text-[15px] outline-none"
        />
        <div className="mt-3 flex justify-end">
          <Button onClick={() => ask(query)} loading={phase === "thinking"}>
            Ask
          </Button>
        </div>
      </Card>

      {phase === "idle" ? (
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => ask(example)}
              className="rounded-md border border-line bg-white px-3 py-1.5 text-left text-[13px] text-ink-secondary hover:bg-canvas"
            >
              {example}
            </button>
          ))}
        </div>
      ) : null}

      {phase === "thinking" ? (
        <Card className="p-5">
          <p className="font-display font-semibold">LOOP analysis</p>
          <ul className="mt-3 space-y-2 text-sm">
            {STEPS.map((item, index) => (
              <li key={item} className={index <= step ? "text-ink" : "text-ink-faint"}>
                {item}
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      {phase === "done" && answer ? (
        <div className="space-y-4">
          <Card className="p-5">
            <p className="eyebrow">Answer</p>
            <p className="mt-2 text-[15px] leading-relaxed">{answer.summary}</p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-ink-secondary">
              {answer.findings.map((finding) => (
                <li key={finding}>{finding}</li>
              ))}
            </ul>
          </Card>
          <Card className="p-5">
            <p className="eyebrow">Evidence</p>
            <p className="mt-1 text-sm text-ink-muted">
              Based on {answer.evidence.length} feedback items
            </p>
            <ul className="mt-4 space-y-3">
              {answer.evidence.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedFeedbackId(item.id)}
                    className="w-full rounded-md border border-line px-3 py-3 text-left hover:bg-canvas"
                  >
                    <p className="text-sm text-ink">“{item.content}”</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px] text-ink-muted">
                      <span>{channelLabel(item.channel)}</span>
                      <SentimentBadge sentiment={item.sentiment} />
                      <span>
                        {THEMES.find((theme) => theme.id === item.themeIds[0])?.name}
                      </span>
                      <span>{formatDate(item.createdAt)}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

function groundedAnswer(query: string) {
  const q = query.toLowerCase();
  const themeId = q.includes("onboard")
    ? "theme_onboarding"
    : q.includes("auth") || q.includes("login")
      ? "theme_authentication"
      : q.includes("love") || q.includes("love")
        ? "theme_reporting"
        : q.includes("frustrat") || q.includes("declin")
          ? "theme_authentication"
          : "theme_onboarding";
  const evidence = FEEDBACK.filter((item) => item.themeIds.includes(themeId)).slice(0, 4);
  const theme = THEMES.find((item) => item.id === themeId);
  return {
    summary: `Customers keep returning to ${theme?.name.toLowerCase()}. The strongest evidence is operational blockage — SSO, first-run setup, and session reliability — not taste or feature requests.`,
    findings: [
      `${theme?.name} is the densest cluster in the current workspace.`,
      "Negative items describe work stopping, not mild inconvenience.",
      "Supporting quotes below are unmodified customer wording.",
    ],
    evidence,
  };
}
