"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/page-header";
import { USERS, WORKSPACE } from "@/lib/data/demo";
import { canManageWorkspace, roleLabel } from "@/lib/format";
import { useAppState } from "@/components/providers/app-state";

export function SettingsHome() {
  return (
    <div className="mx-auto max-w-content space-y-5 px-4 py-6 md:px-6">
      <PageHeader
        title="Settings"
        description="Workspace identity, members, and the permissions that keep LOOP trustworthy."
      />
      <div className="grid gap-3 md:grid-cols-2">
        <Link href="/settings/workspace">
          <Card className="p-5 hover:bg-canvas">
            <h2 className="font-display font-semibold">Workspace</h2>
            <p className="mt-1 text-sm text-ink-muted">Name, details, and tenant context.</p>
          </Card>
        </Link>
        <Link href="/settings/team">
          <Card className="p-5 hover:bg-canvas">
            <h2 className="font-display font-semibold">Team</h2>
            <p className="mt-1 text-sm text-ink-muted">Admins, analysts, and viewers.</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}

export function WorkspaceSettingsView() {
  const { session, notify } = useAppState();
  const admin = canManageWorkspace(session.user.role);

  return (
    <div className="mx-auto max-w-content space-y-5 px-4 py-6 md:px-6">
      <PageHeader
        eyebrow="Settings"
        title="Workspace"
        description="This workspace is the tenant boundary for every piece of feedback."
      />
      <Card className="max-w-xl space-y-3 p-5">
        <label className="block text-sm font-medium">
          Workspace name
          <Input className="mt-1.5" defaultValue={WORKSPACE.name} disabled={!admin} />
        </label>
        <label className="block text-sm font-medium">
          Details
          <textarea
            className="mt-1.5 h-24 w-full rounded-md border border-line px-3 py-2 text-sm"
            defaultValue={WORKSPACE.details}
            disabled={!admin}
          />
        </label>
        {!admin ? (
          <p className="text-sm text-ink-muted">Only admins can manage workspace details.</p>
        ) : null}
        <Button
          disabled={!admin}
          onClick={() =>
            notify({ tone: "success", title: "Workspace updated" })
          }
        >
          Save
        </Button>
      </Card>
    </div>
  );
}

export function TeamSettingsView() {
  const { session } = useAppState();
  const admin = canManageWorkspace(session.user.role);

  return (
    <div className="mx-auto max-w-content space-y-5 px-4 py-6 md:px-6">
      <PageHeader
        eyebrow="Settings"
        title="Team"
        description="Roles are enforced by the API. The UI explains them; it does not replace them."
      />
      <Card>
        <table className="w-full text-left text-sm">
          <thead className="text-[11px] uppercase tracking-[0.06em] text-ink-muted">
            <tr className="border-b border-line">
              <th className="px-5 py-2.5 font-medium">Member</th>
              <th className="px-3 py-2.5 font-medium">Email</th>
              <th className="px-3 py-2.5 font-medium">Role</th>
              <th className="px-5 py-2.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((user) => (
              <tr key={user.id} className="border-b border-line-subtle last:border-0">
                <td className="px-5 py-3">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-[12px] text-ink-muted">{user.title}</p>
                </td>
                <td className="px-3 py-3">{user.email}</td>
                <td className="px-3 py-3">{roleLabel(user.role)}</td>
                <td className="px-5 py-3 text-ink-muted">Active</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card className="p-5 text-sm text-ink-secondary">
        <p>
          <span className="font-medium text-ink">Admin</span> — manage members and roles.
        </p>
        <p className="mt-1">
          <span className="font-medium text-ink">Analyst</span> — ingest and manage feedback.
        </p>
        <p className="mt-1">
          <span className="font-medium text-ink">Viewer</span> — read-only.
        </p>
        {!admin ? (
          <p className="mt-3 text-ink-muted">Only admins can manage workspace members.</p>
        ) : null}
      </Card>
    </div>
  );
}
