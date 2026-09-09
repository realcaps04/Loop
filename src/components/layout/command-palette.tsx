"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileBarChart,
  Inbox,
  LayoutGrid,
  Layers,
  MessageSquare,
  Plus,
  Search,
  Settings,
  TrendingUp,
  Upload,
} from "lucide-react";
import { useAppState } from "@/components/providers/app-state";
import { Kbd } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { canIngest } from "@/lib/format";

type Command = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Actions";
  href?: string;
  action?: () => void;
};

export function CommandPalette() {
  const router = useRouter();
  const {
    commandOpen,
    setCommandOpen,
    setAddFeedbackOpen,
    session,
    notify,
  } = useAppState();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const commands = useMemo<Command[]>(() => {
    const ingest = canIngest(session.user.role);
    return [
      { id: "dash", label: "Dashboard", group: "Navigate", href: "/dashboard" },
      { id: "inbox", label: "Inbox", group: "Navigate", href: "/inbox" },
      { id: "themes", label: "Themes", group: "Navigate", href: "/themes" },
      { id: "trends", label: "Trends", group: "Navigate", href: "/trends" },
      { id: "ask", label: "Ask LOOP", group: "Navigate", href: "/ask" },
      { id: "reports", label: "Reports", group: "Navigate", href: "/reports" },
      { id: "settings", label: "Settings", group: "Navigate", href: "/settings" },
      {
        id: "add",
        label: "Add feedback",
        group: "Actions",
        hint: ingest ? undefined : "Analysts and admins only",
        action: () => {
          if (!ingest) {
            notify({
              tone: "info",
              title: "This action is restricted",
              description: "Only analysts and admins can ingest feedback.",
            });
            return;
          }
          setAddFeedbackOpen(true);
        },
      },
      {
        id: "csv",
        label: "Upload CSV",
        group: "Actions",
        href: "/inbox",
      },
      {
        id: "ask-action",
        label: "Ask LOOP",
        group: "Actions",
        href: "/ask",
      },
      {
        id: "report",
        label: "Generate report",
        group: "Actions",
        href: "/reports",
      },
    ];
  }, [notify, session.user.role, setAddFeedbackOpen]);

  const filtered = commands.filter((command) =>
    command.label.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(!commandOpen);
      }
      if (event.key === "Escape") setCommandOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [commandOpen, setCommandOpen]);

  useEffect(() => {
    setActive(0);
  }, [query, commandOpen]);

  function run(command: Command) {
    command.action?.();
    if (command.href) router.push(command.href);
    setCommandOpen(false);
    setQuery("");
  }

  if (!commandOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        className="absolute inset-0 bg-ink/20"
        aria-label="Close command palette"
        onClick={() => setCommandOpen(false)}
      />
      <div className="absolute left-1/2 top-[18vh] w-[min(100%-1.5rem,36rem)] -translate-x-1/2 overflow-hidden rounded-xl border border-line bg-white shadow-loop-lg animate-scale-in">
        <div className="flex items-center gap-2 border-b border-line px-3">
          <Search className="size-4 text-ink-faint" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActive((i) => Math.min(filtered.length - 1, i + 1));
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                setActive((i) => Math.max(0, i - 1));
              }
              if (event.key === "Enter" && filtered[active]) run(filtered[active]);
            }}
            placeholder="Search LOOP…"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-ink-faint"
          />
          <Kbd>esc</Kbd>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="px-2 py-6 text-center text-sm text-ink-muted">
              No matching commands.
            </p>
          ) : (
            ["Navigate", "Actions"].map((group) => {
              const items = filtered.filter((command) => command.group === group);
              if (items.length === 0) return null;
              return (
                <div key={group} className="mb-2">
                  <p className="eyebrow px-2 py-1">{group}</p>
                  {items.map((command) => {
                    const index = filtered.indexOf(command);
                    const Icon = iconFor(command.id);
                    return (
                      <button
                        key={command.id}
                        type="button"
                        onMouseEnter={() => setActive(index)}
                        onClick={() => run(command)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm",
                          index === active ? "bg-accent-soft text-accent" : "text-ink",
                        )}
                      >
                        <Icon className="size-4 opacity-70" />
                        <span className="flex-1">{command.label}</span>
                        {command.hint ? (
                          <span className="text-[11px] text-ink-muted">
                            {command.hint}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function iconFor(id: string) {
  switch (id) {
    case "dash":
      return LayoutGrid;
    case "inbox":
      return Inbox;
    case "themes":
      return Layers;
    case "trends":
      return TrendingUp;
    case "ask":
    case "ask-action":
      return MessageSquare;
    case "reports":
      return FileBarChart;
    case "settings":
      return Settings;
    case "add":
      return Plus;
    case "csv":
      return Upload;
    default:
      return Search;
  }
}
