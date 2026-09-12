import { createClient } from "@/lib/supabase/client";

export type FeedbackSentiment = "positive" | "neutral" | "negative" | "mixed";
export type FeedbackStatus = "NEW" | "REVIEWED" | "ACTIONED";

export type FeedbackTheme = {
  id: string;
  name: string;
  color: string;
};

export type FeedbackRow = {
  id: string;
  content: string;
  customer_label: string;
  customer_initials: string;
  customer_email: string;
  sentiment: FeedbackSentiment;
  status: FeedbackStatus;
  channel: string;
  source_ref: string;
  theme_id: string | null;
  assignee_id: string | null;
  created_at: string;
  themes: FeedbackTheme | FeedbackTheme[] | null;
  assignee: {
    id: string;
    full_name: string;
    email: string;
    avatar_url: string | null;
  } | null;
};

export type FeedbackNote = {
  id: string;
  body: string;
  created_at: string;
  author: {
    id: string;
    full_name: string;
    email: string;
    avatar_url: string | null;
  } | null;
};

export type FeedbackActivity = {
  id: string;
  action: string;
  detail: string;
  created_at: string;
  actor: {
    id: string;
    full_name: string;
    email: string;
    avatar_url: string | null;
  } | null;
};

export type FeedbackStats = {
  total: number;
  positivePct: number;
  neutralPct: number;
  negativePct: number;
  deltaTotal: number;
  deltaPositive: number;
  deltaNeutral: number;
  deltaNegative: number;
};

export type FeedbackFilters = {
  q: string;
  sentiment: FeedbackSentiment | "all";
  themeId: string | "all";
  channel: string | "all";
  status: FeedbackStatus | "all";
  sort: "newest" | "oldest";
  from: string;
  to: string;
};

function unwrapOne<T>(value: T | T[] | null | undefined): T | null {
  if (!value) return null;
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

function pct(part: number, total: number) {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
}

function pctDelta(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

export function normalizeFeedback(row: FeedbackRow): FeedbackRow {
  return {
    ...row,
    themes: unwrapOne(row.themes as FeedbackTheme | FeedbackTheme[] | null),
    assignee: unwrapOne(
      row.assignee as FeedbackRow["assignee"] | FeedbackRow["assignee"][] | null,
    ),
    customer_email: row.customer_email || "",
  };
}

export function channelLabel(channel: string) {
  const map: Record<string, string> = {
    support_ticket: "Website",
    app_store: "App Store",
    nps: "In-app",
    sales_note: "Email",
    community: "Slack",
    manual: "Manual",
    play_store: "Play Store",
    intercom: "Intercom",
  };
  return map[channel] || channel || "Manual";
}

export function statusLabel(status: FeedbackStatus) {
  if (status === "NEW") return "New";
  if (status === "REVIEWED") return "In Progress";
  return "Resolved";
}

export async function fetchFeedbackThemes(workspaceId: string) {
  const { data, error } = await createClient()
    .from("themes")
    .select("id, name, color")
    .eq("workspace_id", workspaceId)
    .order("name");
  if (error) throw error;
  return (data ?? []) as FeedbackTheme[];
}

export async function fetchFeedbackStats(
  workspaceId: string,
  fromIso: string,
  toIso: string,
): Promise<FeedbackStats> {
  const supabase = createClient();
  const from = new Date(fromIso);
  const to = new Date(toIso);
  const ms = to.getTime() - from.getTime();
  const prevTo = new Date(from.getTime() - 1);
  const prevFrom = new Date(from.getTime() - ms);

  const [{ data: current }, { data: previous }] = await Promise.all([
    supabase
      .from("feedback")
      .select("sentiment")
      .eq("workspace_id", workspaceId)
      .gte("created_at", from.toISOString())
      .lte("created_at", to.toISOString()),
    supabase
      .from("feedback")
      .select("sentiment")
      .eq("workspace_id", workspaceId)
      .gte("created_at", prevFrom.toISOString())
      .lte("created_at", prevTo.toISOString()),
  ]);

  const cur = current ?? [];
  const prev = previous ?? [];
  const total = cur.length;
  const prevTotal = prev.length;
  const pos = cur.filter((r) => r.sentiment === "positive").length;
  const neu = cur.filter((r) => r.sentiment === "neutral" || r.sentiment === "mixed").length;
  const neg = cur.filter((r) => r.sentiment === "negative").length;
  const prevPos = prev.filter((r) => r.sentiment === "positive").length;
  const prevNeu = prev.filter(
    (r) => r.sentiment === "neutral" || r.sentiment === "mixed",
  ).length;
  const prevNeg = prev.filter((r) => r.sentiment === "negative").length;

  const positivePct = pct(pos, total);
  const neutralPct = pct(neu, total);
  const negativePct = pct(neg, total);
  const prevPositivePct = pct(prevPos, prevTotal);
  const prevNeutralPct = pct(prevNeu, prevTotal);
  const prevNegativePct = pct(prevNeg, prevTotal);

  return {
    total,
    positivePct,
    neutralPct,
    negativePct,
    deltaTotal: pctDelta(total, prevTotal),
    deltaPositive: positivePct - prevPositivePct,
    deltaNeutral: neutralPct - prevNeutralPct,
    deltaNegative: negativePct - prevNegativePct,
  };
}

export async function fetchFeedbackList(
  workspaceId: string,
  filters: FeedbackFilters,
  page: number,
  pageSize: number,
) {
  const supabase = createClient();
  let query = supabase
    .from("feedback")
    .select(
      `id, content, customer_label, customer_initials, customer_email, sentiment, status, channel, source_ref, theme_id, assignee_id, created_at,
       themes(id, name, color),
       assignee:profiles!assignee_id(id, full_name, email, avatar_url)`,
      { count: "exact" },
    )
    .eq("workspace_id", workspaceId)
    .gte("created_at", filters.from)
    .lte("created_at", filters.to);

  if (filters.sentiment !== "all") {
    query = query.eq("sentiment", filters.sentiment);
  }
  if (filters.themeId !== "all") {
    query = query.eq("theme_id", filters.themeId);
  }
  if (filters.channel !== "all") {
    query = query.eq("channel", filters.channel);
  }
  if (filters.status !== "all") {
    query = query.eq("status", filters.status);
  }
  if (filters.q.trim()) {
    const q = filters.q.trim();
    query = query.or(
      `content.ilike.%${q}%,customer_label.ilike.%${q}%,customer_email.ilike.%${q}%,source_ref.ilike.%${q}%`,
    );
  }

  query = query.order("created_at", {
    ascending: filters.sort === "oldest",
  });

  const from = page * pageSize;
  const to = from + pageSize - 1;
  const { data, error, count } = await query.range(from, to);
  if (error) throw error;

  return {
    rows: ((data as unknown as FeedbackRow[]) ?? []).map(normalizeFeedback),
    total: count ?? 0,
  };
}

export async function fetchFeedbackNotes(feedbackId: string) {
  const { data, error } = await createClient()
    .from("feedback_notes")
    .select(
      `id, body, created_at,
       author:profiles!author_id(id, full_name, email, avatar_url)`,
    )
    .eq("feedback_id", feedbackId)
    .order("created_at", { ascending: false });
  if (error) throw error;

  return ((data as unknown as FeedbackNote[]) ?? []).map((n) => ({
    ...n,
    author: unwrapOne(n.author as FeedbackNote["author"] | FeedbackNote["author"][]),
  }));
}

export async function fetchFeedbackActivity(feedbackId: string) {
  const { data, error } = await createClient()
    .from("feedback_activity")
    .select(
      `id, action, detail, created_at,
       actor:profiles!actor_id(id, full_name, email, avatar_url)`,
    )
    .eq("feedback_id", feedbackId)
    .order("created_at", { ascending: false });
  if (error) throw error;

  return ((data as unknown as FeedbackActivity[]) ?? []).map((a) => ({
    ...a,
    actor: unwrapOne(a.actor as FeedbackActivity["actor"] | FeedbackActivity["actor"][]),
  }));
}

export async function addFeedbackNote(input: {
  feedbackId: string;
  workspaceId: string;
  authorId: string;
  body: string;
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("feedback_notes")
    .insert({
      feedback_id: input.feedbackId,
      workspace_id: input.workspaceId,
      author_id: input.authorId,
      body: input.body.trim(),
    })
    .select("id")
    .single();
  if (error) throw error;

  await supabase.from("feedback_activity").insert({
    feedback_id: input.feedbackId,
    workspace_id: input.workspaceId,
    actor_id: input.authorId,
    action: "note_added",
    detail: "added a note",
  });

  return data.id as string;
}

export async function updateFeedbackStatus(input: {
  feedbackId: string;
  status: FeedbackStatus;
}) {
  const { error } = await createClient()
    .from("feedback")
    .update({ status: input.status })
    .eq("id", input.feedbackId);
  if (error) throw error;
}

export function defaultDateRange() {
  const to = new Date();
  to.setHours(23, 59, 59, 999);
  const from = new Date();
  from.setHours(0, 0, 0, 0);
  from.setDate(from.getDate() - 29);
  return { from: from.toISOString(), to: to.toISOString() };
}

export function formatRangeLabel(fromIso: string, toIso: string) {
  const opts: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return `${new Date(fromIso).toLocaleDateString(undefined, opts)} – ${new Date(toIso).toLocaleDateString(undefined, opts)}`;
}
