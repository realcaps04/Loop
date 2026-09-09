"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { CommandPalette } from "@/components/layout/command-palette";
import { ToastViewport } from "@/components/ui/toast";
import { AddFeedbackModal } from "@/components/feedback/add-feedback-modal";
import { FeedbackDrawer } from "@/components/feedback/feedback-drawer";
import { useAppState } from "@/components/providers/app-state";
import { cn } from "@/lib/cn";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { mobileNavOpen, setMobileNavOpen } = useAppState();

  return (
    <div className="flex min-h-screen bg-canvas">
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
          <div className="relative h-full w-[240px] animate-slide-in-left">
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
