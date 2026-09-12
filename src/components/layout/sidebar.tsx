"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CheckSquare,
  CircleHelp,
  FileBarChart,
  LayoutGrid,
  Layers,
  MessageSquareText,
  Plug,
  Settings,
  Users,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { useAppState } from "@/components/providers/app-state";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/inbox", label: "Feedback", icon: MessageSquareText },
  { href: "/analysis", label: "Analysis", icon: BarChart3 },
  { href: "/actions", label: "Actions", icon: CheckSquare },
  { href: "/people", label: "People", icon: Users },
  { href: "/themes", label: "Themes", icon: Layers },
  { href: "/integrations", label: "Integrations", icon: Plug },
  { href: "/reports", label: "Reports", icon: FileBarChart },
];

export function Sidebar() {
  const pathname = usePathname();
  const { setMobileNavOpen } = useAppState();

  return (
    <aside className="flex h-full w-[232px] flex-col border-r border-line bg-white">
      <div className="flex h-16 items-center px-5">
        <Link href="/dashboard" onClick={() => setMobileNavOpen(false)}>
          <Logo />
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        {NAV.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileNavOpen(false)}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors",
                active
                  ? "bg-accent text-white shadow-sm"
                  : "text-ink-muted hover:bg-line-subtle hover:text-ink",
              )}
            >
              <Icon
                className={cn("size-4", active ? "text-white" : "text-ink-faint")}
                strokeWidth={1.75}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-3 px-3 pb-4">
        <div className="rounded-2xl bg-gradient-to-br from-[#3B3CE8] to-[#7C3AED] p-4 text-white shadow-loop">
          <p className="text-[12px] font-medium leading-snug text-white/95">
            Turn feedback into what&apos;s next. Build better products with your
            users.
          </p>
          <button
            type="button"
            className="mt-3 w-full rounded-lg bg-white px-3 py-2 text-[12px] font-semibold text-[#494AFD] transition hover:bg-white/95"
          >
            Upgrade Plan
          </button>
        </div>

        <Link
          href="/settings"
          onClick={() => setMobileNavOpen(false)}
          className={cn(
            "flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-ink-muted transition hover:bg-line-subtle hover:text-ink",
            pathname.startsWith("/settings") && "bg-line-subtle text-ink",
          )}
        >
          <Settings className="size-4 text-ink-faint" strokeWidth={1.75} />
          Settings
        </Link>
        <a
          href="mailto:support@loop.app"
          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-ink-muted transition hover:bg-line-subtle hover:text-ink"
        >
          <CircleHelp className="size-4 text-ink-faint" strokeWidth={1.75} />
          Help &amp; Support
        </a>
      </div>
    </aside>
  );
}
