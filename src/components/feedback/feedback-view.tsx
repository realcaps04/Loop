"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Frown,
  LayoutGrid,
  List,
  Meh,
  MessageSquareText,
  Plus,
  Search,
  Smile,
  X,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/components/providers/app-state";
import { cn } from "@/lib/cn";
import {
  addFeedbackNote,
  channelLabel,
  defaultDateRange,
  fetchFeedbackActivity,
  fetchFeedbackList,
  fetchFeedbackNotes,
  fetchFeedbackStats,
  fetchFeedbackThemes,
  formatRangeLabel,
  updateFeedbackStatus,
  type FeedbackActivity,
  type FeedbackFilters,
  type FeedbackNote,
  type FeedbackRow,
  type FeedbackSentiment,
  type FeedbackStats,
  type FeedbackStatus,
  type FeedbackTheme,
} from "@/lib/services/feedback";

const PAGE_SIZE = 8;

const CHANNELS = [
  "support_ticket",
  "nps",
  "app_store",
  "play_store",
  "sales_note",
  "community",
  "intercom",
  "manual",
] as const;

export function FeedbackView() {
  const { session, setAddFeedbackOpen, extraFeedback } = useAppState();
  const range = useMemo(() => defaultDateRange(), []);
  const [filters, setFilters] = useState<FeedbackFilters>({
    q: "",
    sentiment: "all",
    themeId: "all",
    channel: "all",
    status: "all",
    sort: "newest",
    from: range.from,
    to: range.to,
  });
  const [themes, setThemes] = useState<FeedbackTheme[]>([]);
  const [stats, setStats] = useState<FeedbackStats | null>(null);
  const [rows, setRows] = useState<FeedbackRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [view, setView] = useState<"list" | "grid">("list");
  const [searchDraft, setSearchDraft] = useState("");

  const selected = rows.find((r) => r.id === selectedId) ?? null;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const load = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    setError("");
    try {
      const [themeRows, nextStats, list] = await Promise.all([
        fetchFeedbackThemes(session.workspace.id),
        fetchFeedbackStats(session.workspace.id, filters.from, filters.to),
        fetchFeedbackList(session.workspace.id, filters, page, PAGE_SIZE),
      ]);
      setThemes(themeRows);
      setStats(nextStats);
      setRows(list.rows);
      setTotal(list.total);
      setSelectedId((current) => {
        if (!list.rows.length) return null;
        if (current && list.rows.some((r) => r.id === current)) return current;
        return list.rows[0].id;
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not load feedback. Run the feedback notes SQL migration in Supabase.",
      );
    } finally {
      setLoading(false);
    }
  }, [session, filters, page]);

  useEffect(() => {
    void load();
  }, [load, extraFeedback.length]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setFilters((f) => ({ ...f, q: searchDraft }));
      setPage(0);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [searchDraft]);

  if (!session) return null;

  const fromIdx = total === 0 ? 0 : page * PAGE_SIZE + 1;
  const toIdx = Math.min(total, (page + 1) * PAGE_SIZE);

  return (
    <div className="flex h-[calc(100vh-4rem)] min-h-0 flex-col">
      <div className="shrink-0 space-y-5 border-b border-line bg-[#F7F8FC] px-4 py-5 md:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink md:text-[1.75rem]">
              Customer feedback, all in one place.
            </h1>
            <p className="mt-1 text-sm text-ink-muted">
              Capture, explore, and turn feedback into meaningful action.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex h-10 items-center gap-2 rounded-xl border border-line bg-white px-3 text-[12px] font-medium text-ink-secondary">
              <CalendarDays className="size-3.5 text-ink-faint" />
              {formatRangeLabel(filters.from, filters.to)}
            </span>
            <Button onClick={() => setAddFeedbackOpen(true)}>
              <Plus className="size-4" />
              Add Feedback
            </Button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total feedback"
            value={stats ? stats.total.toLocaleString() : "—"}
            delta={stats?.deltaTotal ?? 0}
            icon={<MessageSquareText className="size-4" />}
            tone="accent"
            loading={loading}
          />
          <StatCard
            label="Positive"
            value={stats ? `${stats.positivePct}%` : "—"}
            delta={stats?.deltaPositive ?? 0}
            icon={<Smile className="size-4" />}
            tone="positive"
            loading={loading}
          />
          <StatCard
            label="Neutral"
            value={stats ? `${stats.neutralPct}%` : "—"}
            delta={stats?.deltaNeutral ?? 0}
            icon={<Meh className="size-4" />}
            tone="neutral"
            loading={loading}
          />
          <StatCard
            label="Negative"
            value={stats ? `${stats.negativePct}%` : "—"}
            delta={stats?.deltaNegative ?? 0}
            icon={<Frown className="size-4" />}
            tone="negative"
            loading={loading}
          />
        </div>

        {error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}
      </div>

      <div className="flex min-h-0 flex-1 flex-col xl:flex-row">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col border-r border-line bg-white">
          <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3 md:px-5">
            <div className="relative min-w-[180px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-ink-faint" />
              <input
                value={searchDraft}
                onChange={(e) => setSearchDraft(e.target.value)}
                placeholder="Search feedback..."
                className="h-9 w-full rounded-xl border border-line bg-[#F8F9FC] pl-9 pr-3 text-[13px] outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <FilterSelect
              value={filters.sentiment}
              onChange={(v) => {
                setFilters((f) => ({
                  ...f,
                  sentiment: v as FeedbackSentiment | "all",
                }));
                setPage(0);
              }}
              options={[
                { value: "all", label: "All sentiments" },
                { value: "positive", label: "Positive" },
                { value: "neutral", label: "Neutral" },
                { value: "negative", label: "Negative" },
                { value: "mixed", label: "Mixed" },
              ]}
            />
            <FilterSelect
              value={filters.themeId}
              onChange={(v) => {
                setFilters((f) => ({ ...f, themeId: v }));
                setPage(0);
              }}
              options={[
                { value: "all", label: "All themes" },
                ...themes.map((t) => ({ value: t.id, label: t.name })),
              ]}
            />
            <FilterSelect
              value={filters.channel}
              onChange={(v) => {
                setFilters((f) => ({ ...f, channel: v }));
                setPage(0);
              }}
              options={[
                { value: "all", label: "All sources" },
                ...CHANNELS.map((c) => ({
                  value: c,
                  label: channelLabel(c),
                })),
              ]}
            />
            <FilterSelect
              value={filters.status}
              onChange={(v) => {
                setFilters((f) => ({
                  ...f,
                  status: v as FeedbackStatus | "all",
                }));
                setPage(0);
              }}
              options={[
                { value: "all", label: "All statuses" },
                { value: "NEW", label: "New" },
                { value: "REVIEWED", label: "In Progress" },
                { value: "ACTIONED", label: "Resolved" },
              ]}
            />
            <FilterSelect
              value={filters.sort}
              onChange={(v) => {
                setFilters((f) => ({
                  ...f,
                  sort: v as "newest" | "oldest",
                }));
                setPage(0);
              }}
              options={[
                { value: "newest", label: "Sort by: Newest" },
                { value: "oldest", label: "Sort by: Oldest" },
              ]}
            />
            <div className="ml-auto flex items-center rounded-xl border border-line p-0.5">
              <button
                type="button"
                onClick={() => setView("list")}
                className={cn(
                  "rounded-lg p-1.5",
                  view === "list" ? "bg-accent-soft text-accent" : "text-ink-faint",
                )}
                aria-label="List view"
              >
                <List className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setView("grid")}
                className={cn(
                  "rounded-lg p-1.5",
                  view === "grid" ? "bg-accent-soft text-accent" : "text-ink-faint",
                )}
                aria-label="Grid view"
              >
                <LayoutGrid className="size-4" />
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {loading ? (
              <div className="space-y-2 p-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-16 animate-pulse rounded-xl bg-line-subtle"
                  />
                ))}
              </div>
            ) : !rows.length ? (
              <div className="flex h-full flex-col items-center justify-center px-6 py-16 text-center">
                <p className="text-sm font-semibold text-ink">No feedback yet</p>
                <p className="mt-1 max-w-sm text-sm text-ink-muted">
                  Add your first piece of customer feedback to populate this
                  list and the detail panel.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => setAddFeedbackOpen(true)}
                >
                  <Plus className="size-4" />
                  Add Feedback
                </Button>
              </div>
            ) : view === "list" ? (
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="sticky top-0 z-10 bg-white">
                  <tr className="border-b border-line text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
                    <th className="w-10 px-4 py-2.5">
                      <input
                        type="checkbox"
                        checked={
                          rows.length > 0 &&
                          rows.every((r) => selectedIds.has(r.id))
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds(new Set(rows.map((r) => r.id)));
                          } else {
                            setSelectedIds(new Set());
                          }
                        }}
                        className="size-3.5 accent-accent"
                      />
                    </th>
                    <th className="px-2 py-2.5">Feedback</th>
                    <th className="px-2 py-2.5">Sentiment</th>
                    <th className="px-2 py-2.5">Date</th>
                    <th className="px-4 py-2.5">Author</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedId(row.id)}
                      className={cn(
                        "cursor-pointer border-b border-line-subtle transition hover:bg-[#F8F9FC]",
                        selectedId === row.id && "bg-accent-soft/60",
                      )}
                    >
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedIds.has(row.id)}
                          onChange={(e) => {
                            setSelectedIds((prev) => {
                              const next = new Set(prev);
                              if (e.target.checked) next.add(row.id);
                              else next.delete(row.id);
                              return next;
                            });
                          }}
                          className="size-3.5 accent-accent"
                        />
                      </td>
                      <td className="max-w-md px-2 py-3">
                        <p className="line-clamp-2 text-[13px] leading-snug text-ink">
                          {row.content}
                        </p>
                        <p className="mt-1 text-[11px] font-medium text-ink-faint">
                          {channelLabel(row.channel)}
                        </p>
                      </td>
                      <td className="px-2 py-3">
                        <SentimentPill sentiment={row.sentiment} />
                      </td>
                      <td className="whitespace-nowrap px-2 py-3 text-[12px] text-ink-muted">
                        {formatDateTime(row.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <Avatar
                          initials={
                            row.customer_initials ||
                            row.customer_label.slice(0, 2).toUpperCase()
                          }
                          size="sm"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                {rows.map((row) => (
                  <button
                    key={row.id}
                    type="button"
                    onClick={() => setSelectedId(row.id)}
                    className={cn(
                      "rounded-2xl border border-line bg-white p-4 text-left shadow-sm transition hover:border-accent/40",
                      selectedId === row.id && "border-accent ring-2 ring-accent/20",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <Avatar
                        initials={
                          row.customer_initials ||
                          row.customer_label.slice(0, 2).toUpperCase()
                        }
                        size="sm"
                      />
                      <SentimentPill sentiment={row.sentiment} />
                    </div>
                    <p className="mt-3 line-clamp-3 text-[13px] leading-snug text-ink">
                      {row.content}
                    </p>
                    <p className="mt-2 text-[11px] text-ink-faint">
                      {channelLabel(row.channel)} · {formatDateTime(row.created_at)}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-line px-4 py-3 text-[12px] text-ink-muted md:px-5">
            <p>
              Showing {fromIdx}–{toIdx} of {total.toLocaleString()}
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={page <= 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className="rounded-lg border border-line p-1.5 disabled:opacity-40"
              >
                <ChevronLeft className="size-4" />
              </button>
              <span className="px-2 tabular-nums">
                {page + 1} / {pageCount}
              </span>
              <button
                type="button"
                disabled={page >= pageCount - 1}
                onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                className="rounded-lg border border-line p-1.5 disabled:opacity-40"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <FeedbackDetailPanel
          item={selected}
          workspaceId={session.workspace.id}
          userId={session.user.id}
          onUpdated={() => void load()}
          onClose={() => setSelectedId(null)}
        />
      </div>
    </div>
  );
}

function FeedbackDetailPanel({
  item,
  workspaceId,
  userId,
  onUpdated,
  onClose,
}: {
  item: FeedbackRow | null;
  workspaceId: string;
  userId: string;
  onUpdated: () => void;
  onClose: () => void;
}) {
  const [notes, setNotes] = useState<FeedbackNote[]>([]);
  const [activity, setActivity] = useState<FeedbackActivity[]>([]);
  const [noteBody, setNoteBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [detailError, setDetailError] = useState("");

  useEffect(() => {
    if (!item) {
      setNotes([]);
      setActivity([]);
      return;
    }
    let cancelled = false;
    void Promise.all([
      fetchFeedbackNotes(item.id),
      fetchFeedbackActivity(item.id),
    ])
      .then(([n, a]) => {
        if (cancelled) return;
        setNotes(n);
        setActivity(a);
        setDetailError("");
      })
      .catch((err) => {
        if (cancelled) return;
        setDetailError(
          err instanceof Error
            ? err.message
            : "Could not load notes/activity. Run the notes SQL migration.",
        );
      });
    return () => {
      cancelled = true;
    };
  }, [item]);

  async function submitNote() {
    if (!item || !noteBody.trim()) return;
    setSaving(true);
    try {
      await addFeedbackNote({
        feedbackId: item.id,
        workspaceId,
        authorId: userId,
        body: noteBody,
      });
      setNoteBody("");
      const [n, a] = await Promise.all([
        fetchFeedbackNotes(item.id),
        fetchFeedbackActivity(item.id),
      ]);
      setNotes(n);
      setActivity(a);
    } catch (err) {
      setDetailError(
        err instanceof Error ? err.message : "Could not add note.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function changeStatus(status: FeedbackStatus) {
    if (!item) return;
    try {
      await updateFeedbackStatus({ feedbackId: item.id, status });
      onUpdated();
    } catch (err) {
      setDetailError(
        err instanceof Error ? err.message : "Could not update status.",
      );
    }
  }

  if (!item) {
    return (
      <aside className="hidden w-full max-w-md shrink-0 flex-col border-l border-line bg-white xl:flex">
        <div className="flex flex-1 items-center justify-center px-6 text-center">
          <p className="text-sm text-ink-muted">
            Select feedback to see details, notes, and activity.
          </p>
        </div>
      </aside>
    );
  }

  const theme = item.themes as FeedbackTheme | null;
  const assignee = item.assignee;

  return (
    <aside className="flex w-full max-w-md shrink-0 flex-col border-l border-line bg-white xl:max-h-full">
      <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
        <div className="flex min-w-0 items-start gap-3">
          <Avatar
            initials={
              item.customer_initials ||
              item.customer_label.slice(0, 2).toUpperCase()
            }
          />
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink">
              {item.customer_label || "Customer"}
            </p>
            <p className="truncate text-[12px] text-ink-muted">
              {item.customer_email || "No email"}
            </p>
            <p className="mt-1 text-[11px] text-ink-faint">
              {formatDateTime(item.created_at)} · via {channelLabel(item.channel)}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 text-ink-faint hover:bg-line-subtle xl:hidden"
          aria-label="Close detail"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-4">
        {detailError ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[12px] text-amber-800">
            {detailError}
          </p>
        ) : null}

        <p className="text-[15px] leading-relaxed text-ink">{item.content}</p>

        <div className="flex flex-wrap gap-2">
          <SentimentPill sentiment={item.sentiment} />
          {theme ? (
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
              style={{
                backgroundColor: `${theme.color}18`,
                color: theme.color,
              }}
            >
              {theme.name}
            </span>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-line bg-[#F8F9FC] p-3">
          <Meta label="Source" value={channelLabel(item.channel)} />
          <Meta label="Theme" value={theme?.name || "—"} />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-faint">
              Status
            </p>
            <select
              value={item.status}
              onChange={(e) =>
                void changeStatus(e.target.value as FeedbackStatus)
              }
              className="mt-1 h-8 w-full rounded-lg border border-line bg-white px-2 text-[12px] font-medium"
            >
              <option value="NEW">New</option>
              <option value="REVIEWED">In Progress</option>
              <option value="ACTIONED">Resolved</option>
            </select>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-faint">
              Assigned to
            </p>
            {assignee ? (
              <div className="mt-1 flex items-center gap-1.5">
                <Avatar
                  initials={assignee.full_name.slice(0, 2).toUpperCase()}
                  src={assignee.avatar_url ?? undefined}
                  size="sm"
                />
                <span className="truncate text-[12px] font-medium text-ink">
                  {assignee.full_name || assignee.email}
                </span>
              </div>
            ) : (
              <p className="mt-1 text-[12px] text-ink-muted">Unassigned</p>
            )}
          </div>
        </div>

        <section>
          <h3 className="text-sm font-semibold text-ink">Notes</h3>
          <textarea
            value={noteBody}
            onChange={(e) => setNoteBody(e.target.value)}
            rows={3}
            placeholder="@mention someone, or update the status..."
            className="mt-2 w-full rounded-xl border border-line px-3 py-2 text-[13px] outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <div className="mt-2 flex justify-end">
            <Button
              size="sm"
              disabled={saving || !noteBody.trim()}
              onClick={() => void submitNote()}
            >
              {saving ? "Adding…" : "Add Note"}
            </Button>
          </div>
          <ul className="mt-3 space-y-3">
            {notes.map((note) => (
              <li key={note.id} className="flex gap-2.5">
                <Avatar
                  initials={(note.author?.full_name || note.author?.email || "U")
                    .slice(0, 2)
                    .toUpperCase()}
                  src={note.author?.avatar_url ?? undefined}
                  size="sm"
                />
                <div className="min-w-0 flex-1 rounded-xl bg-[#F8F9FC] px-3 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[12px] font-semibold text-ink">
                      {note.author?.full_name || note.author?.email || "Teammate"}
                    </p>
                    <p className="text-[10px] text-ink-faint">
                      {formatDateTime(note.created_at)}
                    </p>
                  </div>
                  <p className="mt-1 text-[13px] leading-snug text-ink-secondary">
                    {note.body}
                  </p>
                </div>
              </li>
            ))}
            {!notes.length ? (
              <p className="text-[12px] text-ink-muted">No notes yet.</p>
            ) : null}
          </ul>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-ink">Activity</h3>
          <ul className="mt-3 space-y-3">
            {activity.map((entry) => (
              <li key={entry.id} className="flex gap-2.5 text-[12px]">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                <div>
                  <p className="text-ink-secondary">
                    <span className="font-semibold text-ink">
                      {entry.actor?.full_name ||
                        entry.actor?.email ||
                        "Someone"}
                    </span>{" "}
                    {entry.detail || entry.action}
                  </p>
                  <p className="mt-0.5 text-[10px] text-ink-faint">
                    {formatDateTime(entry.created_at)}
                  </p>
                </div>
              </li>
            ))}
            {!activity.length ? (
              <p className="text-[12px] text-ink-muted">No activity yet.</p>
            ) : null}
          </ul>
        </section>
      </div>
    </aside>
  );
}

function StatCard({
  label,
  value,
  delta,
  icon,
  tone,
  loading,
}: {
  label: string;
  value: string;
  delta: number;
  icon: React.ReactNode;
  tone: "accent" | "positive" | "neutral" | "negative";
  loading: boolean;
}) {
  const tones = {
    accent: "bg-accent-soft text-accent",
    positive: "bg-emerald-50 text-emerald-600",
    neutral: "bg-sky-50 text-sky-600",
    negative: "bg-rose-50 text-rose-500",
  };
  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-[12px] font-medium text-ink-muted">{label}</p>
        <span
          className={cn(
            "inline-flex size-8 items-center justify-center rounded-xl",
            tones[tone],
          )}
        >
          {icon}
        </span>
      </div>
      <p className="mt-2 font-display text-2xl font-bold tabular-nums text-ink">
        {loading ? "—" : value}
      </p>
      <p
        className={cn(
          "mt-1 text-[11px] font-semibold",
          delta > 0
            ? "text-emerald-600"
            : delta < 0
              ? "text-rose-500"
              : "text-ink-faint",
        )}
      >
        {loading
          ? "…"
          : delta === 0
            ? "vs last period"
            : `${delta > 0 ? "+" : ""}${delta}% vs last period`}
      </p>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 rounded-xl border border-line bg-white px-2.5 text-[12px] font-medium text-ink-secondary outline-none"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function SentimentPill({ sentiment }: { sentiment: FeedbackSentiment }) {
  const map = {
    positive: "bg-emerald-50 text-emerald-700",
    neutral: "bg-sky-50 text-sky-700",
    negative: "bg-rose-50 text-rose-600",
    mixed: "bg-amber-50 text-amber-700",
  };
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize",
        map[sentiment],
      )}
    >
      {sentiment}
    </span>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-faint">
        {label}
      </p>
      <p className="mt-1 text-[12px] font-medium text-ink">{value}</p>
    </div>
  );
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
