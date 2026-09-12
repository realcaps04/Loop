import { createClient } from "@/lib/supabase/client";
import type { DateRangeKey } from "@/lib/types";

export type DashboardKpi = {
  key: string;
  label: string;
  value: number;
  format: "number" | "percent";
  delta: number;
  hint: string;
};

export type TrendPoint = {
  date: string;
  label: string;
  positive: number;
  neutral: number;
  negative: number;
  total: number;
};

export type RecentFeedbackRow = {
  id: string;
  content: string;
  customerLabel: string;
  customerInitials: string;
  sentiment: "positive" | "neutral" | "negative" | "mixed";
  themeName: string | null;
  themeColor: string | null;
  createdAt: string;
};

export type UpcomingEvent = {
  id: string;
  title: string;
  startsAt: string;
  endsAt: string;
};

export type OverviewData = {
  greetingName: string;
  kpis: DashboardKpi[];
  trend: TrendPoint[];
  recent: RecentFeedbackRow[];
  upcoming: UpcomingEvent[];
  empty: boolean;
};

function rangeStart(range: DateRangeKey) {
  const days = range === "7d" ? 7 : range === "90d" ? 90 : 30;
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (days - 1));
  return { days, start };
}

function previousWindow(range: DateRangeKey, currentStart: Date) {
  const days = range === "7d" ? 7 : range === "90d" ? 90 : 30;
  const prevEnd = new Date(currentStart);
  prevEnd.setMilliseconds(-1);
  const prevStart = new Date(currentStart);
  prevStart.setDate(prevStart.getDate() - days);
  return { prevStart, prevEnd };
}

function pctDelta(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

function dayKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function formatDayLabel(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export async function fetchOverview(
  workspaceId: string,
  greetingName: string,
  range: DateRangeKey = "30d",
): Promise<OverviewData> {
  const supabase = createClient();
  const { days, start } = rangeStart(range);
  const { prevStart, prevEnd } = previousWindow(range, start);
  const startIso = start.toISOString();
  const nowIso = new Date().toISOString();

  const [
    { data: feedbackNow },
    { data: feedbackPrev },
    { count: openActions },
    { count: openActionsPrev },
    { count: teamCount },
    { data: recentRows },
    { data: eventRows },
  ] = await Promise.all([
    supabase
      .from("feedback")
      .select("id, sentiment, created_at")
      .eq("workspace_id", workspaceId)
      .gte("created_at", startIso)
      .lte("created_at", nowIso),
    supabase
      .from("feedback")
      .select("id, sentiment, created_at")
      .eq("workspace_id", workspaceId)
      .gte("created_at", prevStart.toISOString())
      .lte("created_at", prevEnd.toISOString()),
    supabase
      .from("actions")
      .select("id", { count: "exact", head: true })
      .eq("workspace_id", workspaceId)
      .in("status", ["open", "in_progress"]),
    supabase
      .from("actions")
      .select("id", { count: "exact", head: true })
      .eq("workspace_id", workspaceId)
      .in("status", ["open", "in_progress"])
      .gte("created_at", prevStart.toISOString())
      .lte("created_at", prevEnd.toISOString()),
    supabase
      .from("workspace_members")
      .select("user_id", { count: "exact", head: true })
      .eq("workspace_id", workspaceId),
    supabase
      .from("feedback")
      .select(
        "id, content, customer_label, customer_initials, sentiment, created_at, themes(name, color)",
      )
      .eq("workspace_id", workspaceId)
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("events")
      .select("id, title, starts_at, ends_at")
      .eq("workspace_id", workspaceId)
      .gte("starts_at", nowIso)
      .order("starts_at", { ascending: true })
      .limit(5),
  ]);

  const current = feedbackNow ?? [];
  const previous = feedbackPrev ?? [];
  const total = current.length;
  const prevTotal = previous.length;
  const positive = current.filter((f) => f.sentiment === "positive").length;
  const prevPositive = previous.filter((f) => f.sentiment === "positive").length;
  const positivePct = total === 0 ? 0 : Math.round((positive / total) * 100);
  const prevPositivePct =
    prevTotal === 0 ? 0 : Math.round((prevPositive / prevTotal) * 100);

  const open = openActions ?? 0;
  const openPrev = openActionsPrev ?? 0;
  const members = teamCount ?? 0;

  const buckets = new Map<
    string,
    { positive: number; neutral: number; negative: number; total: number }
  >();
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    buckets.set(dayKey(d), {
      positive: 0,
      neutral: 0,
      negative: 0,
      total: 0,
    });
  }
  for (const row of current) {
    const key = dayKey(new Date(row.created_at));
    const bucket = buckets.get(key);
    if (!bucket) continue;
    bucket.total += 1;
    if (row.sentiment === "positive") bucket.positive += 1;
    else if (row.sentiment === "negative") bucket.negative += 1;
    else bucket.neutral += 1;
  }

  const trend: TrendPoint[] = Array.from(buckets.entries()).map(
    ([date, v]) => ({
      date,
      label: formatDayLabel(date),
      ...v,
    }),
  );

  const recent: RecentFeedbackRow[] = (recentRows ?? []).map((row) => {
    const theme = Array.isArray(row.themes) ? row.themes[0] : row.themes;
    return {
      id: row.id,
      content: row.content,
      customerLabel: row.customer_label || "Customer",
      customerInitials:
        row.customer_initials ||
        (row.customer_label || "C").slice(0, 2).toUpperCase(),
      sentiment: row.sentiment,
      themeName: theme?.name ?? null,
      themeColor: theme?.color ?? null,
      createdAt: row.created_at,
    };
  });

  const upcoming: UpcomingEvent[] = (eventRows ?? []).map((e) => ({
    id: e.id,
    title: e.title,
    startsAt: e.starts_at,
    endsAt: e.ends_at,
  }));

  return {
    greetingName,
    kpis: [
      {
        key: "total",
        label: "Total feedback",
        value: total,
        format: "number",
        delta: pctDelta(total, prevTotal),
        hint: "vs last period",
      },
      {
        key: "positive",
        label: "Positive sentiment",
        value: positivePct,
        format: "percent",
        delta: positivePct - prevPositivePct,
        hint: "vs last period",
      },
      {
        key: "actions",
        label: "Open actions",
        value: open,
        format: "number",
        delta: pctDelta(open, openPrev),
        hint: "vs last period",
      },
      {
        key: "team",
        label: "Team members",
        value: members,
        format: "number",
        delta: 0,
        hint: "in this workspace",
      },
    ],
    trend,
    recent,
    upcoming,
    empty: total === 0 && recent.length === 0,
  };
}
