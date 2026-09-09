import Link from "next/link";
import {
  BarChart3,
  Bell,
  FileText,
  Inbox,
  Layers3,
  LayoutDashboard,
  MessageSquare,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { BrandWord } from "@/components/brand/brand-word";
import { LoopMark } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

const MINI = [
  {
    title: "Collect feedback",
    copy: "Bring in feedback from all your channels.",
    Icon: MessageSquare,
    tint: "bg-violet-100 text-violet-600",
  },
  {
    title: "Deep insights",
    copy: "Uncover trends and themes with AI.",
    Icon: BarChart3,
    tint: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Take action",
    copy: "Turn insights into product decisions.",
    Icon: Zap,
    tint: "bg-pink-100 text-pink-600",
  },
  {
    title: "Built for teams",
    copy: "Collaborate and stay aligned across your organization.",
    Icon: Users,
    tint: "bg-amber-100 text-amber-600",
  },
];

const FLOATS = [
  {
    label: "All your feedback in one place",
    Icon: MessageSquare,
    tint: "bg-emerald-50 text-emerald-600",
    className: "left-0 top-6 sm:-left-4 lg:-left-8",
  },
  {
    label: "AI-powered analysis",
    Icon: Sparkles,
    tint: "bg-sky-50 text-sky-600",
    className: "right-0 top-10 sm:-right-3 lg:-right-6",
  },
  {
    label: "Spot trends early",
    Icon: BarChart3,
    tint: "bg-pink-50 text-pink-600",
    className: "bottom-24 left-0 sm:-left-4 lg:-left-8",
  },
  {
    label: "Built for product teams",
    Icon: Users,
    tint: "bg-amber-50 text-amber-600",
    className: "bottom-16 right-0 sm:-right-3 lg:-right-6",
  },
];

const NAV: {
  label: string;
  Icon: typeof LayoutDashboard;
  active?: boolean;
  badge?: string;
}[] = [
  { label: "Overview", Icon: LayoutDashboard, active: true },
  { label: "Inbox", Icon: Inbox, badge: "248" },
  { label: "Analysis", Icon: Sparkles },
  { label: "Themes", Icon: Layers3 },
  { label: "Trends", Icon: TrendingUp },
  { label: "Ask LOOP", Icon: Sparkles },
  { label: "Reports", Icon: FileText },
];

const KPIS = [
  { label: "Total feedback", value: "1,248", delta: "+18%", up: true },
  { label: "Positive", value: "62%", delta: "+12%", up: true },
  { label: "Neutral", value: "24%", delta: "+5%", up: true },
  { label: "Negative", value: "14%", delta: "-8%", up: false },
];

const BARS = [
  [42, 18, 12],
  [38, 16, 10],
  [48, 20, 14],
  [44, 18, 11],
  [52, 22, 16],
  [46, 20, 13],
  [58, 24, 18],
  [50, 21, 14],
  [62, 26, 20],
  [54, 22, 15],
  [66, 28, 22],
  [58, 24, 16],
];

const THEMES = [
  { name: "Onboarding", count: 342, pct: 92 },
  { name: "Performance", count: 286, pct: 78 },
  { name: "Pricing", count: 198, pct: 54 },
  { name: "Support", count: 164, pct: 44 },
  { name: "Integrations", count: 142, pct: 38 },
];

export function FeaturesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F8FC] via-white to-white">
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#EEF0FF] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-[#E0F2FE]/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
            Features
          </p>
          <h1 className="mt-3 font-display text-[2.4rem] font-black tracking-tight text-navy sm:text-[3rem] sm:leading-[1.08]">
            Powerful features for customer-obsessed{" "}
            <span className="text-[#494AFD]">product teams.</span>
          </h1>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-muted">
            Everything you need to collect, understand, and act on customer
            feedback — all in one place.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {MINI.map(({ title, copy, Icon, tint }) => (
              <div key={title} className="flex gap-3">
                <span
                  className={cn(
                    "mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl",
                    tint,
                  )}
                >
                  <Icon className="size-4" strokeWidth={2.2} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">{title}</p>
                  <p className="mt-0.5 text-[13px] leading-snug text-ink-muted">
                    {copy}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: "xl" }),
                "rounded-full bg-gradient-to-r from-[#494AFD] to-[#7C3AED] px-7 text-white shadow-[0_12px_30px_rgba(73,74,253,0.3)] hover:brightness-105",
              )}
            >
              Get started free →
            </Link>
            <Link
              href="#all-features"
              className="inline-flex h-12 items-center rounded-full border border-slate-200 bg-white px-6 text-[15px] font-semibold text-[#494AFD] shadow-sm hover:border-[#C7CBFF]"
            >
              See all features
            </Link>
          </div>
          <p className="mt-3 text-[13px] text-slate-500">
            No credit card required · 14-day free trial
          </p>
        </div>

        <div className="relative lg:col-span-7">
          <p
            className={cn(
              hand.className,
              "absolute -top-1 right-2 z-20 max-w-[9rem] text-right text-[22px] font-semibold leading-tight text-[#7C3AED] sm:right-8 lg:right-4",
            )}
          >
            Turn feedback into progress.
          </p>
          <svg
            className="absolute right-24 top-10 z-20 h-10 w-14 text-[#7C3AED] sm:right-36 lg:right-28"
            viewBox="0 0 56 40"
            fill="none"
            aria-hidden
          >
            <path
              d="M42 4C28 12 18 20 12 34"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="3 4"
            />
            <path
              d="M18 28L12 34L20 36"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {FLOATS.map(({ label, Icon, tint, className }) => (
            <div
              key={label}
              className={cn(
                "absolute z-20 hidden max-w-[200px] items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-[0_12px_32px_rgba(15,23,42,0.12)] sm:flex",
                className,
              )}
            >
              <span
                className={cn(
                  "inline-flex size-8 shrink-0 items-center justify-center rounded-full",
                  tint,
                )}
              >
                <Icon className="size-3.5" strokeWidth={2.2} />
              </span>
              <p className="text-[12px] font-semibold leading-snug text-navy">
                {label}
              </p>
            </div>
          ))}

          <div className="relative mx-auto max-w-[640px] perspective-[1200px]">
            <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-[#494AFD]/10 blur-2xl" />
            <div className="relative origin-center scale-[0.92] sm:scale-100 lg:rotate-[-2deg] lg:scale-[0.98]">
              <FeaturesDashboardMock />
            </div>
            <div
              className={cn(
                hand.className,
                "pointer-events-none absolute -left-1 top-1/3 hidden text-[#7C3AED] sm:block",
              )}
              aria-hidden
            >
              <span className="block text-lg leading-none">✦</span>
              <span className="ml-2 block text-sm leading-none">✦</span>
              <span className="ml-1 block text-base leading-none">✦</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesDashboardMock() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_28px_80px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/70">
      <div className="flex min-h-[420px]">
        <aside className="hidden w-[132px] shrink-0 border-r border-slate-100 bg-white p-2.5 sm:block">
          <div className="mb-3 flex items-center gap-1.5 px-1">
            <LoopMark className="size-4" />
            <BrandWord className="text-[12px] font-bold tracking-tight" />
          </div>
          <nav className="space-y-0.5">
            {NAV.map(({ label, Icon, active, badge }) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-1.5 py-1.5 text-[10px]",
                  active
                    ? "bg-[#EEF0FF] font-medium text-[#494AFD]"
                    : "text-slate-500",
                )}
              >
                <Icon className="size-3 shrink-0" strokeWidth={1.75} />
                <span className="min-w-0 flex-1 truncate">
                  {label === "Ask LOOP" ? (
                    <>
                      Ask <BrandWord className="text-[10px]" />
                    </>
                  ) : (
                    label
                  )}
                </span>
                {badge ? (
                  <span className="rounded-full bg-[#494AFD] px-1 py-px text-[8px] font-semibold text-white">
                    {badge}
                  </span>
                ) : null}
              </div>
            ))}
          </nav>
          <div className="mt-4 space-y-0.5 border-t border-slate-100 pt-2">
            {["Workspace", "Team", "Settings"].map((item) => (
              <p
                key={item}
                className="rounded-lg px-1.5 py-1 text-[10px] text-slate-400"
              >
                {item}
              </p>
            ))}
          </div>
        </aside>

        <div className="min-w-0 flex-1 bg-[#FAFBFC] p-3 sm:p-4">
          <div className="flex items-center gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] text-slate-400">
              <Search className="size-3 shrink-0" />
              <span className="truncate">
                Search feedback, themes, or ask a question...
              </span>
            </div>
            <span className="hidden size-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 sm:flex">
              <Bell className="size-3.5" />
            </span>
            <span className="flex size-7 items-center justify-center rounded-full bg-[#494AFD] text-[10px] font-semibold text-white">
              AX
            </span>
          </div>

          <p className="mt-3 font-display text-[14px] font-semibold text-navy sm:text-[15px]">
            Good morning, Alex.{" "}
            <span className="font-medium text-slate-500">
              Here&apos;s what your customers are telling you today.
            </span>
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {KPIS.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm"
              >
                <p className="text-[9px] font-medium text-slate-500">
                  {kpi.label}
                </p>
                <p className="mt-0.5 font-display text-[16px] font-bold tabular-nums tracking-tight text-navy">
                  {kpi.value}
                </p>
                <p
                  className={cn(
                    "mt-0.5 text-[10px] font-semibold",
                    kpi.up ? "text-emerald-600" : "text-rose-500",
                  )}
                >
                  {kpi.delta}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2.5 grid gap-2.5 lg:grid-cols-5">
            <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm lg:col-span-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[11px] font-semibold text-navy">
                  Feedback volume
                </p>
                <div className="flex items-center gap-2.5 text-[9px] text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-[#494AFD]" />{" "}
                    Positive
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-violet-300" />{" "}
                    Neutral
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-rose-400" />{" "}
                    Negative
                  </span>
                </div>
              </div>
              <div className="mt-3 flex h-[100px] items-end gap-1 px-0.5">
                {BARS.map(([pos, neu, neg], i) => (
                  <div
                    key={i}
                    className="flex flex-1 flex-col justify-end gap-0.5"
                  >
                    <div
                      className="w-full rounded-sm bg-rose-400/90"
                      style={{ height: `${neg}%` }}
                    />
                    <div
                      className="w-full rounded-sm bg-violet-200"
                      style={{ height: `${neu}%` }}
                    />
                    <div
                      className="w-full rounded-sm bg-[#494AFD]"
                      style={{ height: `${pos}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-1.5 flex justify-between px-0.5 text-[8px] text-slate-400">
                <span>Aug 1</span>
                <span>Aug 14</span>
                <span>Aug 28</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm lg:col-span-2">
              <p className="text-[11px] font-semibold text-navy">Top themes</p>
              <ul className="mt-2.5 space-y-2">
                {THEMES.map((theme) => (
                  <li key={theme.name}>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-medium text-navy">{theme.name}</span>
                      <span className="tabular-nums text-slate-500">
                        {theme.count}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[#494AFD]/80"
                        style={{ width: `${theme.pct}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
