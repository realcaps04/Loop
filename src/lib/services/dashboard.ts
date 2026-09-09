import { FEEDBACK, NOW, THEMES, primaryTheme } from "@/lib/data/demo";
import { rangeDays } from "@/lib/format";
import type {
  DashboardData,
  DateRangeKey,
  EmergingSignal,
  Feedback,
  Kpi,
  Sentiment,
  ThemeStat,
  VolumePoint,
} from "@/lib/types";

function inWindow(iso: string, start: Date, end: Date) {
  const t = new Date(iso).getTime();
  return t >= start.getTime() && t <= end.getTime();
}

function windowFor(range: DateRangeKey, offset = 0) {
  const days = rangeDays(range);
  const end = new Date(NOW);
  end.setUTCDate(end.getUTCDate() - offset * days);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days);
  return { start, end };
}

function dominantSentiment(items: Feedback[]): Sentiment {
  if (items.length === 0) return "neutral";
  const counts: Record<Sentiment, number> = {
    positive: 0,
    negative: 0,
    mixed: 0,
    neutral: 0,
  };
  for (const item of items) counts[item.sentiment] += 1;
  return (Object.entries(counts) as [Sentiment, number][]).sort(
    (a, b) => b[1] - a[1],
  )[0][0];
}

function themeStats(current: Feedback[], previous: Feedback[]): ThemeStat[] {
  return THEMES.map((theme) => {
    const count = current.filter((item) => item.themeIds.includes(theme.id))
      .length;
    const previousCount = previous.filter((item) =>
      item.themeIds.includes(theme.id),
    ).length;
    const delta =
      previousCount === 0
        ? count > 0
          ? 100
          : 0
        : ((count - previousCount) / previousCount) * 100;
    const themed = current.filter((item) => item.themeIds.includes(theme.id));
    const trend: ThemeStat["trend"] =
      delta > 8 ? "up" : delta < -8 ? "down" : "flat";
    return {
      theme,
      count,
      previousCount,
      delta,
      sentiment: dominantSentiment(themed),
      trend,
    };
  }).sort((a, b) => b.count - a.count);
}

function volumeSeries(items: Feedback[], start: Date, end: Date, buckets: number) {
  const ms = end.getTime() - start.getTime();
  const size = ms / buckets;
  const points: VolumePoint[] = [];

  for (let i = 0; i < buckets; i += 1) {
    const bucketStart = new Date(start.getTime() + i * size);
    const bucketEnd = new Date(start.getTime() + (i + 1) * size);
    const slice = items.filter((item) => inWindow(item.createdAt, bucketStart, bucketEnd));
    const label = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(bucketStart);
    points.push({
      date: bucketStart.toISOString(),
      label,
      total: slice.length,
      positive: slice.filter((item) => item.sentiment === "positive").length,
      negative: slice.filter((item) => item.sentiment === "negative").length,
      neutral: slice.filter(
        (item) => item.sentiment === "neutral" || item.sentiment === "mixed",
      ).length,
    });
  }

  return points;
}

function signals(stats: ThemeStat[], current: Feedback[]): EmergingSignal[] {
  const emerging = [...stats].sort((a, b) => b.delta - a.delta)[0];
  const loudNegative = stats
    .filter((stat) => stat.sentiment === "negative")
    .sort((a, b) => b.count - a.count)[0];
  const mobile = current.filter((item) =>
    item.themeIds.includes("theme_mobile"),
  );
  const ios = mobile.filter((item) =>
    item.content.toLowerCase().includes("ios"),
  );

  const list: EmergingSignal[] = [];

  if (emerging && emerging.delta >= 20) {
    list.push({
      id: "sig_spike",
      title: `${emerging.theme.name} requests are accelerating`,
      detail: `Mention volume moved from ${emerging.previousCount} to ${emerging.count}. This is the steepest theme change in the selected window.`,
      kind: "spike",
      themeId: emerging.theme.id,
      delta: emerging.delta,
    });
  }

  if (loudNegative) {
    list.push({
      id: "sig_negative",
      title: `${loudNegative.theme.name} is still the loudest source of friction`,
      detail: `${loudNegative.count} mentions, mostly negative. Customers describe blocked work, not preference.`,
      kind: "shift",
      themeId: loudNegative.theme.id,
      delta: loudNegative.delta,
    });
  }

  if (ios.length >= 1) {
    list.push({
      id: "sig_mobile",
      title: "Mobile failures cluster on iOS report review",
      detail: `${mobile.length} mobile mentions in range. Several point to crashes and broken deep links rather than missing features.`,
      kind: "concern",
      themeId: "theme_mobile",
    });
  }

  const billing = current.filter(
    (item) =>
      item.themeIds.includes("theme_billing") && item.sentiment === "negative",
  );
  if (billing.length >= 3) {
    list.push({
      id: "sig_billing",
      title: "Unexpected charges are showing up in finance conversations",
      detail: `${billing.length} negative billing items. Duplicate invoices and seat-release confusion are repeating.`,
      kind: "volume",
      themeId: "theme_billing",
    });
  }

  return list.slice(0, 4);
}

export function getDashboard(
  range: DateRangeKey,
  extra: Feedback[] = [],
): DashboardData {
  const all = [...extra, ...FEEDBACK].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const currentWindow = windowFor(range, 0);
  const previousWindow = windowFor(range, 1);
  const current = all.filter((item) =>
    inWindow(item.createdAt, currentWindow.start, currentWindow.end),
  );
  const previous = all.filter((item) =>
    inWindow(item.createdAt, previousWindow.start, previousWindow.end),
  );

  const weekStart = new Date(NOW);
  weekStart.setUTCDate(weekStart.getUTCDate() - 7);
  const newThisWeek = all.filter((item) =>
    inWindow(item.createdAt, weekStart, NOW),
  ).length;
  const prevWeekStart = new Date(NOW);
  prevWeekStart.setUTCDate(prevWeekStart.getUTCDate() - 14);
  const prevWeek = all.filter((item) =>
    inWindow(item.createdAt, prevWeekStart, weekStart),
  ).length;

  const negative = current.filter((item) => item.sentiment === "negative");
  const prevNegative = previous.filter((item) => item.sentiment === "negative");
  const stats = themeStats(current, previous);
  const emerging = [...stats].sort((a, b) => b.delta - a.delta)[0];

  const pct = (now: number, then: number) =>
    then === 0 ? (now > 0 ? 100 : 0) : ((now - then) / then) * 100;

  const kpis: Kpi[] = [
    {
      key: "total",
      label: "Total feedback",
      value: current.length,
      format: "number",
      delta: pct(current.length, previous.length),
      hint: "vs previous period",
    },
    {
      key: "negative",
      label: "Negative feedback",
      value: negative.length,
      format: "number",
      delta: pct(negative.length, prevNegative.length),
      hint: "vs previous period",
      tone: "negative",
    },
    {
      key: "new",
      label: "New this week",
      value: newThisWeek,
      format: "number",
      delta: pct(newThisWeek, prevWeek),
      hint: "vs prior week",
    },
    {
      key: "emerging",
      label: "Top emerging theme",
      value: emerging?.count ?? 0,
      format: "number",
      delta: emerging?.delta ?? 0,
      hint: emerging?.theme.name ?? "No theme yet",
      tone: "accent",
    },
  ];

  const buckets = range === "7d" ? 7 : range === "90d" ? 12 : 10;

  return {
    range,
    greetingName: "Maya",
    kpis,
    volume: volumeSeries(current, currentWindow.start, currentWindow.end, buckets),
    sentiment: {
      positive: current.filter((item) => item.sentiment === "positive").length,
      negative: negative.length,
      neutral: current.filter((item) => item.sentiment === "neutral").length,
      mixed: current.filter((item) => item.sentiment === "mixed").length,
      total: current.length,
      dominant: dominantSentiment(current),
    },
    topThemes: stats.filter((stat) => stat.count > 0).slice(0, 6),
    signals: signals(stats, current),
    recent: current.slice(0, 8),
    empty: current.length === 0,
  };
}

export function getFeedbackById(id: string, extra: Feedback[] = []) {
  return [...extra, ...FEEDBACK].find((item) => item.id === id);
}

export { primaryTheme };
