"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-md">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Something went wrong.
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          We couldn&apos;t load your feedback right now.
        </p>
        <Button className="mt-5" onClick={reset}>
          Retry
        </Button>
      </div>
    </div>
  );
}
