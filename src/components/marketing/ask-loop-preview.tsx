import {
  Bell,
  ChevronDown,
  FileText,
  Inbox,
  Layers3,
  LayoutDashboard,
  Lightbulb,
  MessageCircle,
  Search,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { LoopMark } from "@/components/brand/logo";
import { BrandWord } from "@/components/brand/brand-word";
import { cn } from "@/lib/cn";

const NAV: {
  label: string;
  Icon: typeof LayoutDashboard;
  active?: boolean;
  badge?: string;
}[] = [
  { label: "Overview", Icon: LayoutDashboard },
  { label: "Inbox", Icon: Inbox, badge: "248" },
  { label: "Themes", Icon: Layers3 },
  { label: "Trends", Icon: TrendingUp },
  { label: "Ask LOOP", Icon: Sparkles, active: true },
  { label: "Reports", Icon: FileText },
];

const REASONS = [
  {
    n: "1",
    tint: "bg-rose-100 text-rose-700",
    title: "App performance issues (34%)",
    copy: "Customers mention crashes and slow loading times as primary reasons for leaving.",
  },
  {
    n: "2",
    tint: "bg-sky-100 text-sky-700",
    title: "Missing key features (28%)",
    copy: "Requests for offline mode and better integrations came up frequently.",
  },
  {
    n: "3",
    tint: "bg-emerald-100 text-emerald-700",
    title: "Pricing concerns (18%)",
    copy: "Some felt the pricing was high relative to their team size and usage.",
  },
  {
    n: "4",
    tint: "bg-amber-100 text-amber-700",
    title: "Onboarding experience (12%)",
    copy: "New users struggled with the initial setup and finding key features.",
  },
] as const;

const SUGGESTIONS = [
  "Show me customer quotes for #1",
  "How has this changed over time?",
  "What can we do about this?",
];

export function AskLoopPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white bg-white shadow-[0_28px_80px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70">
      <div className="flex min-h-[520px]">
        <aside className="hidden w-[148px] shrink-0 flex-col border-r border-slate-100 bg-white p-3 sm:flex">
          <div className="mb-4 flex items-center gap-2 px-1.5">
            <LoopMark className="size-5" />
            <BrandWord className="text-[13px] font-bold tracking-tight" />
          </div>
          <nav className="space-y-0.5">
            {NAV.map(({ label, Icon, active, badge }) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px]",
                  active
                    ? "bg-[#EEF0FF] font-medium text-[#494AFD]"
                    : "text-slate-500",
                )}
              >
                <Icon className="size-3.5 shrink-0" strokeWidth={1.75} />
                <span className="truncate">
                  {label === "Ask LOOP" ? (
                    <>
                      Ask <BrandWord />
                    </>
                  ) : (
                    label
                  )}
                </span>
                {badge ? (
                  <span className="ml-auto rounded-full bg-[#EEF0FF] px-1.5 py-0.5 text-[9px] font-semibold text-[#494AFD]">
                    {badge}
                  </span>
                ) : null}
              </div>
            ))}
          </nav>
          <div className="mt-auto space-y-0.5 border-t border-slate-100 pt-3">
            {["Workspace", "Team", "Settings"].map((item) => (
              <p
                key={item}
                className="rounded-lg px-2 py-1.5 text-[11px] text-slate-400"
              >
                {item}
              </p>
            ))}
            <div className="mt-2 flex items-center gap-2 px-1.5 pt-1">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#494AFD] text-[10px] font-semibold text-white">
                AS
              </span>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-navy">
                  Alex Smith
                </p>
                <p className="truncate text-[9px] text-slate-400">Product Team</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col bg-[#FAFBFC]">
          <div className="flex items-center justify-end gap-2 border-b border-slate-100 bg-white px-4 py-2.5">
            <Search className="size-3.5 text-slate-400" />
            <span className="rounded border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-400">
              ⌘ K
            </span>
            <span className="relative text-slate-400">
              <Bell className="size-3.5" />
              <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-rose-500" />
            </span>
            <span className="size-6 overflow-hidden rounded-full bg-slate-200" />
          </div>

          <div className="flex flex-1 flex-col p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="inline-flex items-center gap-1.5 font-display text-[17px] font-semibold text-navy">
                  <Sparkles className="size-4 text-[#494AFD]" />
                  Ask <BrandWord />
                </p>
                <p className="mt-0.5 text-[12px] text-slate-500">
                  Get instant answers from your customer feedback.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-600"
              >
                <Lightbulb className="size-3.5 text-amber-500" />
                Example questions
              </button>
            </div>

            <div className="mt-4 flex-1 space-y-3">
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-slate-100 px-3.5 py-2.5 text-[12px] leading-relaxed text-slate-700">
                  What are the top reasons customers churn in the last 3 months?
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm">
                <p className="text-[12px] leading-relaxed text-slate-700">
                  Here are the top reasons customers churned in the last 3 months:
                </p>
                <ul className="mt-3 space-y-3">
                  {REASONS.map((item) => (
                    <li key={item.n} className="flex gap-2.5">
                      <span
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                          item.tint,
                        )}
                      >
                        {item.n}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold text-navy">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                          {item.copy}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-[#494AFD]"
                >
                  Sources (12 feedback items)
                  <ChevronDown className="size-3" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#C7CBFF] bg-white px-2.5 py-1 text-[10px] font-medium text-[#494AFD]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
              <Sparkles className="size-4 shrink-0 text-[#494AFD]" />
              <span className="min-w-0 flex-1 truncate text-[12px] text-slate-400">
                Ask a question about your customer feedback...
              </span>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#494AFD] text-white">
                <Send className="size-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const ASK_FEATURES = [
  {
    title: "Natural language questions",
    copy: "Ask in plain English, just like you would to a teammate.",
    Icon: MessageCircle,
  },
  {
    title: "Evidence-backed answers",
    copy: "Get responses with real customer quotes and sources.",
    Icon: Zap,
  },
  {
    title: "Deep customer understanding",
    copy: "Uncover trends, pain points, and opportunities in seconds.",
    Icon: FileText,
  },
  {
    title: "Take action faster",
    copy: "Turn insights into product, marketing, and support decisions.",
    Icon: Target,
  },
] as const;
