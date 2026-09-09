"use client";

import { X } from "lucide-react";
import { useAppState } from "@/components/providers/app-state";
import { cn } from "@/lib/cn";

export function ToastViewport() {
  const { toasts, dismissToast } = useAppState();

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[80] flex w-[min(100%-2rem,22rem)] flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto animate-rise-in rounded-lg border bg-white px-3.5 py-3 shadow-loop",
            toast.tone === "error" ? "border-orange-200" : "border-line",
          )}
          role="status"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-ink">{toast.title}</p>
              {toast.description ? (
                <p className="mt-0.5 text-[13px] text-ink-muted">
                  {toast.description}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              className="text-ink-faint hover:text-ink"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
