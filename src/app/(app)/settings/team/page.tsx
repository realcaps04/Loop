"use client";

import { useEffect, useState } from "react";
import { useAppState } from "@/components/providers/app-state";
import { createClient } from "@/lib/supabase/client";
import { Avatar } from "@/components/ui/avatar";

type Member = {
  role: string;
  profiles: {
    id: string;
    full_name: string;
    email: string;
    avatar_url: string | null;
  } | null;
};

export default function TeamSettingsPage() {
  const { session } = useAppState();
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session) return;
    void createClient()
      .from("workspace_members")
      .select("role, profiles(id, full_name, email, avatar_url)")
      .eq("workspace_id", session.workspace.id)
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        else {
          setMembers(
            ((data as unknown as Member[]) ?? []).map((m) => ({
              ...m,
              profiles: Array.isArray(m.profiles)
                ? (m.profiles[0] ?? null)
                : m.profiles,
            })),
          );
        }      });
  }, [session]);

  if (!session) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-8 md:px-6">
      <h1 className="font-display text-2xl font-bold text-ink">Team</h1>
      {error ? (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      ) : null}
      <ul className="divide-y divide-line-subtle overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
        {members.map((m) => {
          const p = m.profiles;
          if (!p) return null;
          const name = p.full_name || p.email;
          const initials = name
            .split(/\s+/)
            .map((s) => s[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
          return (
            <li key={p.id} className="flex items-center gap-3 px-4 py-3">
              <Avatar
                initials={initials}
                src={p.avatar_url ?? undefined}
                size="sm"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{name}</p>
                <p className="truncate text-[12px] text-ink-muted">{p.email}</p>
              </div>
              <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">
                {m.role}
              </span>
            </li>
          );
        })}
        {!members.length && !error ? (
          <li className="px-4 py-8 text-center text-sm text-ink-muted">
            No teammates loaded yet.
          </li>
        ) : null}
      </ul>
    </div>
  );
}
