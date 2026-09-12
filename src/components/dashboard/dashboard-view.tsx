"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  Link2,
  MessageSquarePlus,
  MoreHorizontal,
  Plug,
  Smile,
  Users,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Avatar } from "@/components/ui/avatar";
import { useAppState } from "@/components/providers/app-state";
import { firstName } from "@/lib/auth/session-loader";
import {
  fetchOverview,
  type OverviewData,
  type RecentFeedbackRow,
} from "@/lib/services/overview";
import type { DateRangeKey } from "@/lib/types";
import { cn } from "@/lib/cn";

const RANGE_OPTIONS: { key: DateRangeKey; label: string }[] = [
  { key: "7d", label: "Last 7 days" },
  { key: "30d", label: "Last 30 days" },
  { key: "90d", label: "Last 90 days" },
];

export function DashboardView() {
  const router = useRouter();
  const { session, setAddFeedbackOpen, extraFeedback } = useAppState();
  const [range, setRange] = useState<DateRangeKey>("30d");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<OverviewData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    setLoading(true);
    setError("");
    void fetchOverview(
      session.workspace.id,
      firstName(session.user.name),
      range,
    )
      .then((next) => {
        if (!cancelled) setData(next);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Could not load dashboard. Run the product SQL migration in Supabase.",
          );
          setData(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [session, range, extraFeedback.length]);

  if (!session) return null;

  const name = firstName(session.user.name);

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-6 md:px-6 xl:flex-row xl:items-start">
      <div className="min-w-0 flex-1 space-y-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            Welcome back, {name} 👋
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink md:text-[1.75rem]">
            Let&apos;s make things better today.
          </h1>
          <p className="mt-1 max-w-xl text-sm text-ink-muted">
            Here&apos;s a live summary of feedback, sentiment, and team activity
            in {session.workspace.name}.
          </p>
        </div>

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {(data?.kpis ?? EMPTY_KPIS).map((kpi) => (
            <KpiCard key={kpi.key} kpi={kpi} loading={loading} />
          ))}
        </div>

        <section className="rounded-2xl border border-line bg-white p-4 shadow-sm md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-base font-semibold text-ink">
                Feedback trend
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-ink-muted">
                <LegendDot className="bg-[#494AFD]" label="Positive" />
                <LegendDot className="bg-[#93C5FD]" label="Neutral" />
                <LegendDot className="bg-[#FB7185]" label="Negative" />
              </div>
            </div>
            <label className="inline-flex items-center gap-2 rounded-xl border border-line bg-[#F8F9FC] px-3 py-2 text-[12px] font-medium text-ink-secondary">
              <CalendarDays className="size-3.5 text-ink-faint" />
              <select
                value={range}
                onChange={(e) => setRange(e.target.value as DateRangeKey)}
                className="bg-transparent outline-none"
              >
                {RANGE_OPTIONS.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 h-[220px] w-full">
            {loading ? (
              <div className="h-full animate-pulse rounded-xl bg-line-subtle" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data?.trend ?? []}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="posFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#494AFD" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#494AFD" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="neuFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#93C5FD" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#93C5FD" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="negFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FB7185" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#FB7185" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="#EEF2F7"
                    vertical={false}
                    strokeDasharray="3 6"
                  />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#94A3B8", fontSize: 11 }}
                    interval="preserveStartEnd"
                    minTickGap={28}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#94A3B8", fontSize: 11 }}
                    width={28}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #E2E8F0",
                      boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
                      fontSize: 12,
                    }}
                    formatter={(value: number, name: string) => [
                      value,
                      name.charAt(0).toUpperCase() + name.slice(1),
                    ]}
                    labelFormatter={(label, payload) => {
                      const total = payload?.[0]?.payload?.total ?? 0;
                      return `${label} · ${total} feedback`;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="positive"
                    stroke="#494AFD"
                    fill="url(#posFill)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="neutral"
                    stroke="#60A5FA"
                    fill="url(#neuFill)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="negative"
                    stroke="#FB7185"
                    fill="url(#negFill)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-line px-4 py-3 md:px-5">
            <h2 className="font-display text-base font-semibold text-ink">
              Recent feedback
            </h2>
            <Link
              href="/inbox"
              className="text-[13px] font-semibold text-accent hover:text-accent-hover"
            >
              View all →
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3 p-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-14 animate-pulse rounded-xl bg-line-subtle"
                />
              ))}
            </div>
          ) : !data?.recent.length ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm font-medium text-ink">No feedback yet</p>
              <p className="mt-1 text-sm text-ink-muted">
                Collect your first piece of customer feedback to populate this
                table.
              </p>
              <button
                type="button"
                onClick={() => setAddFeedbackOpen(true)}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-[13px] font-semibold text-white hover:bg-accent-hover"
              >
                <MessageSquarePlus className="size-4" />
                Collect feedback
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
                    <th className="px-4 py-2.5 font-semibold md:px-5">
                      Feedback
                    </th>
                    <th className="px-3 py-2.5 font-semibold">Sentiment</th>
                    <th className="px-3 py-2.5 font-semibold">Theme</th>
                    <th className="px-3 py-2.5 font-semibold">Date</th>
                    <th className="px-3 py-2.5" />
                  </tr>
                </thead>
                <tbody>
                  {data.recent.map((row) => (
                    <FeedbackRow key={row.id} row={row} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <aside className="w-full shrink-0 space-y-4 xl:w-[280px]">
        <section className="rounded-2xl border border-line bg-white p-4 shadow-sm">
          <h3 className="font-display text-sm font-semibold text-ink">
            Quick actions
          </h3>
          <ul className="mt-3 space-y-1">
            <QuickAction
              icon={MessageSquarePlus}
              label="Collect feedback"
              onClick={() => setAddFeedbackOpen(true)}
            />
            <QuickAction
              icon={ClipboardList}
              label="Create a survey"
              onClick={() => router.push("/inbox")}
            />
            <QuickAction
              icon={Users}
              label="Invite team members"
              onClick={() => router.push("/people")}
            />
            <QuickAction
              icon={Plug}
              label="Connect an integration"
              onClick={() => router.push("/integrations")}
            />
          </ul>
        </section>

        <section className="rounded-2xl border border-line bg-white p-4 shadow-sm">
          <h3 className="font-display text-sm font-semibold text-ink">
            Upcoming
          </h3>
          {loading ? (
            <div className="mt-3 space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-14 animate-pulse rounded-xl bg-line-subtle"
                />
              ))}
            </div>
          ) : !data?.upcoming.length ? (
            <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">
              No upcoming events. Add meetings or interviews from Actions when
              you&apos;re ready.
            </p>
          ) : (
            <ul className="mt-3 space-y-2.5">
              {data.upcoming.map((event) => (
                <li key={event.id} className="flex gap-3">
                  <EventDateBox iso={event.startsAt} />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-ink">
                      {event.title}
                    </p>
                    <p className="text-[11px] text-ink-muted">
                      {formatTimeRange(event.startsAt, event.endsAt)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#494AFD] via-[#5B5CFD] to-[#7C3AED] p-5 text-white shadow-loop">
          <p className="max-w-[12rem] text-[15px] font-semibold leading-snug">
            Happier teams. Brighter products.
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-white/85">
            Keep listening. Keep improving.
          </p>
          <button
            type="button"
            onClick={() => setAddFeedbackOpen(true)}
            className="mt-4 inline-flex size-9 items-center justify-center rounded-full bg-white text-accent shadow-sm transition hover:scale-105"
            aria-label="Get started"
          >
            <ArrowRight className="size-4" />
          </button>
          <Link2 className="pointer-events-none absolute -bottom-2 -right-2 size-24 rotate-12 text-white/10" />
        </div>
      </aside>
    </div>
  );
}

const EMPTY_KPIS = [
  {
    key: "total",
    label: "Total feedback",
    value: 0,
    format: "number" as const,
    delta: 0,
    hint: "vs last period",
  },
  {
    key: "positive",
    label: "Positive sentiment",
    value: 0,
    format: "percent" as const,
    delta: 0,
    hint: "vs last period",
  },
  {
    key: "actions",
    label: "Open actions",
    value: 0,
    format: "number" as const,
    delta: 0,
    hint: "vs last period",
  },
  {
    key: "team",
    label: "Team members",
    value: 1,
    format: "number" as const,
    delta: 0,
    hint: "in this workspace",
  },
];

function KpiCard({
  kpi,
  loading,
}: {
  kpi: (typeof EMPTY_KPIS)[number];
  loading: boolean;
}) {
  const icon =
    kpi.key === "total"
      ? MessageSquarePlus
      : kpi.key === "positive"
        ? Smile
        : kpi.key === "actions"
          ? Zap
          : Users;
  const Icon = icon;
  const tone =
    kpi.key === "total"
      ? "bg-accent-soft text-accent"
      : kpi.key === "positive"
        ? "bg-emerald-50 text-emerald-600"
        : kpi.key === "actions"
          ? "bg-rose-50 text-rose-500"
          : "bg-sky-50 text-sky-600";

  const valueLabel =
    kpi.format === "percent"
      ? `${kpi.value}%`
      : kpi.value.toLocaleString();

  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[12px] font-medium text-ink-muted">{kpi.label}</p>
        <span
          className={cn(
            "inline-flex size-8 items-center justify-center rounded-xl",
            tone,
          )}
        >
          <Icon className="size-4" strokeWidth={1.75} />
        </span>
      </div>
      <p className="mt-2 font-display text-2xl font-bold tabular-nums tracking-tight text-ink">
        {loading ? "—" : valueLabel}
      </p>
      <p
        className={cn(
          "mt-1 text-[11px] font-semibold",
          kpi.delta > 0
            ? "text-emerald-600"
            : kpi.delta < 0
              ? "text-rose-500"
              : "text-ink-faint",
        )}
      >
        {loading
          ? "…"
          : kpi.delta === 0
            ? kpi.hint
            : `${kpi.delta > 0 ? "+" : ""}${kpi.delta}% ${kpi.hint}`}
      </p>
    </div>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("size-2 rounded-full", className)} />
      {label}
    </span>
  );
}

function FeedbackRow({ row }: { row: RecentFeedbackRow }) {
  return (
    <tr className="border-b border-line-subtle last:border-0">
      <td className="px-4 py-3 md:px-5">
        <div className="flex items-start gap-2.5">
          <Avatar initials={row.customerInitials} size="sm" />
          <p className="line-clamp-2 max-w-md text-[13px] leading-snug text-ink">
            {row.content}
          </p>
        </div>
      </td>
      <td className="px-3 py-3">
        <SentimentPill sentiment={row.sentiment} />
      </td>
      <td className="px-3 py-3">
        {row.themeName ? (
          <span
            className="inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{
              backgroundColor: `${row.themeColor || "#494AFD"}18`,
              color: row.themeColor || "#494AFD",
            }}
          >
            {row.themeName}
          </span>
        ) : (
          <span className="text-[12px] text-ink-faint">—</span>
        )}
      </td>
      <td className="whitespace-nowrap px-3 py-3 text-[12px] text-ink-muted">
        {formatDate(row.createdAt)}
      </td>
      <td className="px-3 py-3">
        <button
          type="button"
          className="rounded-lg p-1 text-ink-faint hover:bg-line-subtle hover:text-ink"
          aria-label="More"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </td>
    </tr>
  );
}

function SentimentPill({
  sentiment,
}: {
  sentiment: RecentFeedbackRow["sentiment"];
}) {
  const map = {
    positive: "bg-emerald-50 text-emerald-700",
    neutral: "bg-slate-100 text-slate-600",
    negative: "bg-rose-50 text-rose-600",
    mixed: "bg-amber-50 text-amber-700",
  };
  const label =
    sentiment.charAt(0).toUpperCase() + sentiment.slice(1);
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold",
        map[sentiment],
      )}
    >
      {label}
    </span>
  );
}

function QuickAction({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left text-[13px] font-medium text-ink-secondary transition hover:bg-line-subtle hover:text-ink"
      >
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[#F3F4FF] text-accent">
          <Icon className="size-4" />
        </span>
        {label}
      </button>
    </li>
  );
}

function EventDateBox({ iso }: { iso: string }) {
  const d = new Date(iso);
  return (
    <div className="flex size-11 shrink-0 flex-col items-center justify-center rounded-xl bg-[#F3F4FF] text-accent">
      <span className="text-[9px] font-bold uppercase leading-none">
        {d.toLocaleString(undefined, { month: "short" })}
      </span>
      <span className="mt-0.5 font-display text-sm font-bold leading-none">
        {d.getDate()}
      </span>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTimeRange(startIso: string, endIso: string) {
  const opts: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
  };
  return `${new Date(startIso).toLocaleTimeString(undefined, opts)} – ${new Date(endIso).toLocaleTimeString(undefined, opts)}`;
}
