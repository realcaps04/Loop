import { cn } from "@/lib/cn";
import type { Sentiment } from "@/lib/types";

const SENTIMENT: Record<
  Sentiment,
  { label: string; className: string; dot: string }
> = {
  positive: {
    label: "Positive",
    className: "bg-sentiment-positive-soft text-sentiment-positive",
    dot: "bg-sentiment-positive",
  },
  negative: {
    label: "Negative",
    className: "bg-sentiment-negative-soft text-sentiment-negative",
    dot: "bg-sentiment-negative",
  },
  mixed: {
    label: "Mixed",
    className: "bg-sentiment-mixed-soft text-sentiment-mixed",
    dot: "bg-sentiment-mixed",
  },
  neutral: {
    label: "Neutral",
    className: "bg-sentiment-neutral-soft text-sentiment-neutral",
    dot: "bg-ink-faint",
  },
};

export function SentimentBadge({ sentiment }: { sentiment: Sentiment }) {
  const item = SENTIMENT[sentiment];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[11px] font-medium",
        item.className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", item.dot)} />
      {item.label}
    </span>
  );
}

export function StatusBadge({
  status,
}: {
  status: "NEW" | "REVIEWED" | "ACTIONED";
}) {
  const map = {
    NEW: "bg-status-new-soft text-status-new",
    REVIEWED: "bg-status-reviewed-soft text-status-reviewed",
    ACTIONED: "bg-status-actioned-soft text-status-actioned",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold tracking-wide",
        map[status],
      )}
    >
      {status === "NEW" ? "New" : status === "REVIEWED" ? "Reviewed" : "Actioned"}
    </span>
  );
}
