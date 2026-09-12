"use client";

import Link from "next/link";
import { useAppState } from "@/components/providers/app-state";

export default function SettingsPage() {
  const { session } = useAppState();
  if (!session) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-8 md:px-6">
      <h1 className="font-display text-2xl font-bold text-ink">Settings</h1>
      <p className="text-sm text-ink-muted">
        Signed in as {session.user.email} · {session.workspace.name}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/settings/workspace"
          className="rounded-2xl border border-line bg-white p-4 shadow-sm transition hover:border-accent/40"
        >
          <p className="font-semibold text-ink">Workspace</p>
          <p className="mt-1 text-sm text-ink-muted">Name and tenant details</p>
        </Link>
        <Link
          href="/settings/team"
          className="rounded-2xl border border-line bg-white p-4 shadow-sm transition hover:border-accent/40"
        >
          <p className="font-semibold text-ink">Team</p>
          <p className="mt-1 text-sm text-ink-muted">Members and roles</p>
        </Link>
      </div>
    </div>
  );
}
