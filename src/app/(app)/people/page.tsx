"use client";

import { WorkspaceEmptyPage } from "@/components/layout/workspace-empty-page";
import { useRouter } from "next/navigation";

export default function PeoplePage() {
  const router = useRouter();
  return (
    <WorkspaceEmptyPage
      title="People"
      description="Invite teammates to collaborate on feedback in this workspace."
      actionLabel="Open team settings"
      onAction={() => router.push("/settings/team")}
    />
  );
}
