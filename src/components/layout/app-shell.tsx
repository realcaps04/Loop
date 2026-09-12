"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { CommandPalette } from "@/components/layout/command-palette";
import { ToastViewport } from "@/components/ui/toast";
import { AddFeedbackModal } from "@/components/feedback/add-feedback-modal";
import { FeedbackDrawer } from "@/components/feedback/feedback-drawer";
import { useAppState } from "@/components/providers/app-state";
import { LoopMark } from "@/components/brand/logo";
import { cn } from "@/lib/cn";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { mobileNavOpen, setMobileNavOpen, session, sessionLoading } =
    useAppState();

  if (sessionLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <div className="flex flex-col items-center gap-3">
          <LoopMark className="size-9 animate-pulse" />
          <p className="text-sm text-ink-muted">Loading your workspace…</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <p className="text-sm text-ink-muted">Redirecting to sign in…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F7F8FC]">
      <div className="hidden lg:block">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </div>

      {mobileNavOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            className="absolute inset-0 bg-ink/20"
            aria-label="Close navigation"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative h-full w-[232px] animate-slide-in-left">
            <Sidebar />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className={cn("flex-1")}>{children}</main>
      </div>

      <CommandPalette />
      <AddFeedbackModal />
      <FeedbackDrawer />
      <ToastViewport />
    </div>
  );
}
