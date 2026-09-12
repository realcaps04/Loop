"use client";

import { WorkspaceEmptyPage } from "@/components/layout/workspace-empty-page";
import { useAppState } from "@/components/providers/app-state";

export default function ThemesPage() {
  const { setAddFeedbackOpen } = useAppState();
  return (
    <WorkspaceEmptyPage
      title="Themes"
      description="Themes are created as feedback accumulates. Add feedback to start clustering topics."
      actionLabel="Collect feedback"
      onAction={() => setAddFeedbackOpen(true)}
    />
  );
}
