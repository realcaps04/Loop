"use client";

import { useEffect, useState } from "react";
import { useAppState } from "@/components/providers/app-state";
import { createClient } from "@/lib/supabase/client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Row = {
  id: string;
  content: string;
  customer_label: string;
  customer_initials: string;
  sentiment: "positive" | "neutral" | "negative" | "mixed";
  created_at: string;
  themes: { name: string; color: string } | { name: string; color: string }[] | null;
};

export default function InboxPage() {
  const { session, setAddFeedbackOpen } = useAppState();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    setLoading(true);
    void createClient()
      .from("feedback")
      .select(
        "id, content, customer_label, customer_initials, sentiment, created_at, themes(name, color)",
      )
      .eq("workspace_id", session.workspace.id)
      .order("created_at", { ascending: false })
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) setError(err.message);
        else setRows((data as Row[]) ?? []);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [session]);

  if (!session) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Feedback</h1>
          <p className="mt-1 text-sm text-ink-muted">
            All customer feedback in {session.workspace.name}.
          </p>
        </div>
        <Button onClick={() => setAddFeedbackOpen(true)}>Collect feedback</Button>
      </div>

      {error ? (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      ) : null}

      <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
        {loading ? (
          <div className="space-y-3 p-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 animate-pulse rounded-xl bg-line-subtle" />
            ))}
          </div>
        ) : !rows.length ? (
          <div className="px-5 py-12 text-center">
            <p className="text-sm font-medium text-ink">No feedback yet</p>
            <p className="mt-1 text-sm text-ink-muted">
              Start collecting feedback to fill your Overview and inbox.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-line-subtle">
            {rows.map((row) => {
              const theme = Array.isArray(row.themes) ? row.themes[0] : row.themes;
              return (
                <li key={row.id} className="flex gap-3 px-4 py-3 md:px-5">
                  <Avatar
                    initials={
                      row.customer_initials ||
                      row.customer_label.slice(0, 2).toUpperCase()
                    }
                    size="sm"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] leading-snug text-ink">{row.content}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px]">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 font-semibold",
                          row.sentiment === "positive" &&
                            "bg-emerald-50 text-emerald-700",
                          row.sentiment === "negative" &&
                            "bg-rose-50 text-rose-600",
                          row.sentiment === "neutral" &&
                            "bg-slate-100 text-slate-600",
                          row.sentiment === "mixed" &&
                            "bg-amber-50 text-amber-700",
                        )}
                      >
                        {row.sentiment}
                      </span>
                      {theme ? (
                        <span className="rounded-full bg-accent-soft px-2 py-0.5 font-semibold text-accent">
                          {theme.name}
                        </span>
                      ) : null}
                      <span className="text-ink-faint">
                        {new Date(row.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
