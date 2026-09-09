"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileBarChart,
  Inbox,
  LayoutGrid,
  Layers,
  MessageSquare,
  Settings,
  TrendingUp,
  Users,
  Building2,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { BrandWord } from "@/components/brand/brand-word";
import { Avatar } from "@/components/ui/avatar";
import { useAppState } from "@/components/providers/app-state";
import { cn } from "@/lib/cn";
import { roleLabel } from "@/lib/format";

const PRIMARY = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/themes", label: "Themes", icon: Layers },
  { href: "/trends", label: "Trends", icon: TrendingUp },
  { href: "/ask", label: "Ask LOOP", icon: MessageSquare },
  { href: "/reports", label: "Reports", icon: FileBarChart },
];

const SECONDARY = [
  { href: "/settings/workspace", label: "Workspace", icon: Building2 },
  { href: "/settings/team", label: "Team", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { session, setMobileNavOpen } = useAppState();

  return (
    <aside className="flex h-full w-[240px] flex-col border-r border-line bg-white">
      <div className="flex h-14 items-center px-4">
        <Link href="/dashboard" onClick={() => setMobileNavOpen(false)}>
          <Logo />
        </Link>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-2">
        <NavGroup
          title="Intelligence"
          items={PRIMARY}
          pathname={pathname}
          onNavigate={() => setMobileNavOpen(false)}
        />
        <NavGroup
          title="Workspace"
          items={SECONDARY}
          pathname={pathname}
          onNavigate={() => setMobileNavOpen(false)}
        />
      </nav>

      <div className="border-t border-line p-3">
        <div className="rounded-md border border-line bg-canvas px-2.5 py-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-muted">
            Workspace
          </p>
          <p className="mt-0.5 truncate text-sm font-medium text-ink">
            {session.workspace.name}
          </p>
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-md px-1 py-1.5">
          <Avatar initials={session.user.initials} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-ink">
              {session.user.name}
            </p>
            <p className="text-[11px] text-ink-muted">
              {roleLabel(session.user.role)}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavGroup({
  title,
  items,
  pathname,
  onNavigate,
}: {
  title: string;
  items: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div>
      <p className="eyebrow px-2 pb-2">{title}</p>
      <ul className="space-y-0.5">
        {items.map((item) => {
          const active =
            item.href === "/settings"
              ? pathname === "/settings"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] transition-colors duration-150",
                  active
                    ? "bg-accent-soft font-medium text-accent"
                    : "text-ink-secondary hover:bg-line-subtle hover:text-ink",
                )}
              >
                <Icon
                  className={cn(
                    "size-4 transition-colors",
                    active ? "text-accent" : "text-ink-faint group-hover:text-ink-muted",
                  )}
                />
                {item.label === "Ask LOOP" ? (
                  <span>
                    Ask <BrandWord />
                  </span>
                ) : (
                  item.label
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
