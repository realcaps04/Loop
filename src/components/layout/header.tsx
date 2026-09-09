"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, CircleHelp, LogOut, Menu, Search } from "lucide-react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { IconButton } from "@/components/ui/icon-button";
import { Kbd } from "@/components/ui/badge";
import { withBrandWord } from "@/components/brand/brand-word";
import { useAppState } from "@/components/providers/app-state";
import { roleLabel } from "@/lib/format";

const TITLES: Record<string, { title: string; crumb?: string }> = {
  "/dashboard": { title: "Overview" },
  "/inbox": { title: "Feedback", crumb: "Inbox" },
  "/themes": { title: "Themes" },
  "/trends": { title: "Trends" },
  "/ask": { title: "Ask LOOP" },
  "/reports": { title: "Voice of Customer" },
  "/settings": { title: "Settings" },
  "/settings/team": { title: "Team", crumb: "Settings" },
  "/settings/workspace": { title: "Workspace", crumb: "Settings" },
};

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { session, setCommandOpen, setMobileNavOpen } = useAppState();
  const match = Object.keys(TITLES)
    .sort((a, b) => b.length - a.length)
    .find((key) => pathname === key || pathname.startsWith(`${key}/`));
  const page = TITLES[match ?? "/dashboard"] ?? { title: "LOOP" };

  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b border-line bg-white px-4 md:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <IconButton
          label="Open navigation"
          className="lg:hidden"
          onClick={() => setMobileNavOpen(true)}
        >
          <Menu className="size-4" />
        </IconButton>
        <div className="min-w-0">
          {page.crumb ? (
            <p className="text-[11px] text-ink-muted">
              {page.crumb}
              <span className="mx-1.5 text-ink-faint">/</span>
              <span className="text-ink">{withBrandWord(page.title)}</span>
            </p>
          ) : (
            <p className="truncate font-display text-sm font-semibold tracking-tight text-ink">
              {withBrandWord(page.title)}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setCommandOpen(true)}
        className="hidden h-9 w-full max-w-md items-center gap-2 rounded-md border border-line bg-canvas px-3 text-left text-[13px] text-ink-muted transition-colors hover:border-stone-300 md:flex"
      >
        <Search className="size-3.5" />
        <span className="flex-1">Search customer feedback…</span>
        <span className="flex items-center gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </span>
      </button>

      <div className="flex items-center gap-1">
        <IconButton
          label="Search"
          className="md:hidden"
          onClick={() => setCommandOpen(true)}
        >
          <Search className="size-4" />
        </IconButton>
        <IconButton label="Notifications">
          <Bell className="size-4" />
        </IconButton>
        <IconButton label="Help">
          <CircleHelp className="size-4" />
        </IconButton>
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <button
              type="button"
              className="ml-1 rounded-full focus-visible:outline-none"
              aria-label="Account menu"
            >
              <Avatar initials={session.user.initials} />
            </button>
          </Dropdown.Trigger>
          <Dropdown.Portal>
            <Dropdown.Content
              align="end"
              sideOffset={8}
              className="z-[60] w-56 rounded-lg border border-line bg-white p-1 shadow-loop animate-scale-in"
            >
              <div className="px-2 py-2">
                <p className="text-sm font-medium">{session.user.name}</p>
                <p className="text-[12px] text-ink-muted">
                  {session.user.email}
                </p>
                <p className="mt-1 text-[11px] text-ink-faint">
                  {roleLabel(session.user.role)} · {session.workspace.name}
                </p>
              </div>
              <Dropdown.Separator className="my-1 h-px bg-line" />
              <Dropdown.Item asChild>
                <Link
                  href="/settings"
                  className="flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm outline-none hover:bg-line-subtle"
                >
                  Settings
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink-secondary outline-none hover:bg-line-subtle"
                onSelect={() => router.push("/login")}
              >
                <LogOut className="size-3.5" />
                Sign out
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Portal>
        </Dropdown.Root>
      </div>
    </header>
  );
}
