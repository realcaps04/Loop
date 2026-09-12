"use client";

import Link from "next/link";
import { Bell, LogOut, Menu, Search } from "lucide-react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { IconButton } from "@/components/ui/icon-button";
import { useAppState } from "@/components/providers/app-state";

export function Header() {
  const { session, setCommandOpen, setMobileNavOpen, logout } = useAppState();
  if (!session) return null;

  return (
    <header className="flex h-16 items-center gap-3 border-b border-line bg-white px-4 md:px-6">
      <IconButton
        label="Open navigation"
        className="lg:hidden"
        onClick={() => setMobileNavOpen(true)}
      >
        <Menu className="size-4" />
      </IconButton>

      <button
        type="button"
        onClick={() => setCommandOpen(true)}
        className="flex h-11 min-w-0 flex-1 items-center gap-2.5 rounded-full border border-line bg-[#F8F9FC] px-4 text-left text-[13px] text-ink-muted transition hover:border-[#C7CBFF]"
      >
        <Search className="size-4 shrink-0 text-ink-faint" />
        <span className="truncate">Search feedback, users, tags, or keywords...</span>
      </button>

      <div className="flex shrink-0 items-center gap-2">
        <IconButton label="Notifications">
          <Bell className="size-4" />
        </IconButton>

        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <button
              type="button"
              className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 transition hover:bg-line-subtle focus-visible:outline-none"
              aria-label="Account menu"
            >
              <Avatar
                initials={session.user.initials}
                src={session.user.avatarUrl ?? undefined}
              />
              <div className="hidden min-w-0 text-left sm:block">
                <p className="truncate text-[13px] font-semibold text-ink">
                  {session.user.name}
                </p>
                <p className="truncate text-[11px] text-ink-muted">
                  {session.user.title}
                </p>
              </div>
            </button>
          </Dropdown.Trigger>
          <Dropdown.Portal>
            <Dropdown.Content
              align="end"
              sideOffset={8}
              className="z-[60] w-56 rounded-xl border border-line bg-white p-1 shadow-loop animate-scale-in"
            >
              <div className="px-2.5 py-2">
                <p className="text-sm font-medium text-ink">{session.user.name}</p>
                <p className="text-[12px] text-ink-muted">{session.user.email}</p>
                <p className="mt-1 text-[11px] text-ink-faint">
                  {session.workspace.name}
                </p>
              </div>
              <Dropdown.Separator className="my-1 h-px bg-line" />
              <Dropdown.Item asChild>
                <Link
                  href="/settings"
                  className="flex cursor-pointer items-center rounded-lg px-2.5 py-1.5 text-sm outline-none hover:bg-line-subtle"
                >
                  Settings
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-ink-secondary outline-none hover:bg-line-subtle"
                onSelect={() => void logout()}
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
