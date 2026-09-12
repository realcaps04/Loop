"use client";

import { useAppState } from "@/components/providers/app-state";

export default function WorkspaceSettingsPage() {
  const { session } = useAppState();
  if (!session) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-8 md:px-6">
      <h1 className="font-display text-2xl font-bold text-ink">Workspace</h1>
      <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-faint">
          Name
        </p>
        <p className="mt-1 text-lg font-semibold text-ink">
          {session.workspace.name}
        </p>
        <p className="mt-4 text-[12px] font-semibold uppercase tracking-wide text-ink-faint">
          Slug
        </p>
        <p className="mt-1 font-mono text-sm text-ink-secondary">
          {session.workspace.slug}
        </p>
      </div>
    </div>
  );
}
