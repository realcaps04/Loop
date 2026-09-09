import {
  CHANNEL_LABEL,
  CUSTOMERS,
  NOW,
  QUOTES,
  THEMES,
  USERS,
  WORKSPACE,
} from "@/lib/data/catalog";
import type {
  Channel,
  Feedback,
  FeedbackStatus,
  Sentiment,
} from "@/lib/types";

function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CHANNELS: Channel[] = [
  "support_ticket",
  "app_store",
  "nps",
  "sales_note",
  "community",
];

const STATUSES: FeedbackStatus[] = ["NEW", "REVIEWED", "ACTIONED"];

const EXTRA_CLAUSES = [
  "Third occurrence this quarter.",
  "Escalated from the regional team.",
  "They asked us to treat this as a renewal risk.",
  "Happened during month-end close.",
  "Multiple people on the same account reported it.",
  "They already have a workaround, and they hate it.",
  "Came up unprompted on the QBR.",
  "They compared us unfavorably to the last vendor.",
];

function pick<T>(rand: () => number, list: T[]): T {
  return list[Math.floor(rand() * list.length)]!;
}

function daysAgo(days: number, hour: number) {
  const d = new Date(NOW);
  d.setUTCDate(d.getUTCDate() - days);
  d.setUTCHours(hour, Math.floor((hour * 17) % 60), 0, 0);
  return d.toISOString();
}

function sourceRef(channel: Channel, n: number) {
  switch (channel) {
    case "support_ticket":
      return `NS-${2400 + n}`;
    case "app_store":
      return `ios-review-${n}`;
    case "nps":
      return `nps-${n}`;
    case "sales_note":
      return `call-${n}`;
    case "community":
      return `post-${n}`;
  }
}

function buildFeedback(): Feedback[] {
  const rand = mulberry32(42);
  const items: Feedback[] = [];
  let index = 0;

  for (const quote of QUOTES) {
    const repeats =
      quote.themeId === "theme_authentication"
        ? 4
        : quote.themeId === "theme_onboarding"
          ? 3
          : quote.sentiment === "negative"
            ? 2
            : 2;

    for (let r = 0; r < repeats; r += 1) {
      index += 1;
      const isAuth = quote.themeId === "theme_authentication";
      const maxAge = isAuth ? 28 : 90;
      const skew = rand();
      const age = isAuth
        ? Math.floor(skew * skew * maxAge)
        : Math.floor(skew * maxAge);
      const channel = quote.preferredChannel ?? pick(rand, CHANNELS);
      const clause = r === 0 ? "" : ` ${pick(rand, EXTRA_CLAUSES)}`;
      const statusRoll = rand();
      const status: FeedbackStatus =
        age <= 4
          ? "NEW"
          : statusRoll > 0.72
            ? "ACTIONED"
            : statusRoll > 0.4
              ? "REVIEWED"
              : pick(rand, STATUSES);

      items.push({
        id: `fb_${String(index).padStart(3, "0")}`,
        content: `${quote.content}${clause}`,
        channel,
        sourceRef: sourceRef(channel, 1800 + index),
        customerLabel: pick(rand, CUSTOMERS),
        sentiment: quote.sentiment,
        sentimentScore: Math.min(
          0.98,
          Math.max(0.04, quote.score + (rand() - 0.5) * 0.06),
        ),
        status,
        createdAt: daysAgo(age, 8 + Math.floor(rand() * 10)),
        workspaceId: WORKSPACE.id,
        themeIds: [quote.themeId],
        featureArea: quote.featureArea,
        aiRationale: quote.rationale,
      });
    }
  }

  return items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export const FEEDBACK: Feedback[] = buildFeedback();

export {
  CHANNEL_LABEL,
  CUSTOMERS,
  NOW,
  THEMES,
  USERS,
  WORKSPACE,
};

export function themeById(id: string) {
  return THEMES.find((theme) => theme.id === id);
}

export function primaryTheme(item: Feedback) {
  return themeById(item.themeIds[0] ?? "") ?? THEMES[0];
}

export function sentimentLabel(sentiment: Sentiment) {
  switch (sentiment) {
    case "positive":
      return "Positive";
    case "negative":
      return "Negative";
    case "mixed":
      return "Mixed";
    default:
      return "Neutral";
  }
}
