"use client";

import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/components/providers/app-state";

export function WorkspaceEmptyPage({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const { session } = useAppState();
  if (!session) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <EmptyState
        title={title}
        description={description}
        actions={
          actionLabel && onAction ? (
            <Button onClick={onAction}>{actionLabel}</Button>
          ) : undefined
        }
      />
    </div>
  );
}
