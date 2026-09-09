import {
  Bell,
  ChevronDown,
  FileText,
  Inbox,
  Layers3,
  LayoutDashboard,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { LoopMark } from "@/components/brand/logo";
import { BrandWord } from "@/components/brand/brand-word";
import { cn } from "@/lib/cn";

const NAV = [
  { label: "Overview", Icon: LayoutDashboard, active: true },
  { label: "Inbox", Icon: Inbox },
  { label: "Themes", Icon: Layers3 },
  { label: "Trends", Icon: TrendingUp },
  { label: "Ask LOOP", Icon: Sparkles },
  { label: "Reports", Icon: FileText },
] as const;

const KPIS = [
  { label: "Total feedback", value: "12,842", delta: "+16.4%", up: true },
  { label: "Negative feedback", value: "2,184", delta: "-12.1%", up: false },
  { label: "New this week", value: "1,024", delta: "+22.2%", up: true },
  { label: "Top emerging theme", value: "Onboarding", delta: "+42.2%", up: true },
];

const BARS = [
  [38, 18, 12],
  [34, 16, 10],
  [42, 20, 14],
  [36, 18, 11],
  [48, 22, 16],
  [44, 20, 13],
  [52, 24, 18],
  [46, 21, 14],
  [58, 26, 20],
  [50, 22, 15],
  [62, 28, 22],
  [54, 24, 16],
];

export function DashboardPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white bg-white shadow-[0_28px_80px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70">
      <div className="flex min-h-[420px]">
        <aside className="hidden w-[148px] shrink-0 border-r border-slate-100 bg-white p-3 sm:block">
          <div className="mb-4 flex items-center gap-2 px-1.5">
            <LoopMark className="size-5" />
            <BrandWord className="text-[13px] font-bold tracking-tight" />
          </div>
          <nav className="space-y-0.5">
            {NAV.map(({ label, Icon, active }) => (
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
                {label === "Ask LOOP" ? (
                  <span>
                    Ask <BrandWord />
                  </span>
                ) : (
                  label
                )}
              </div>
            ))}
          </nav>
          <div className="mt-6 space-y-0.5 border-t border-slate-100 pt-3">
            {["Workspace", "Team", "Settings"].map((item) => (
              <p
                key={item}
                className="rounded-lg px-2 py-1.5 text-[11px] text-slate-400"
              >
                {item}
              </p>
            ))}
          </div>
        </aside>

        <div className="min-w-0 flex-1 bg-[#FAFBFC] p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-[17px] font-semibold text-navy">
                Good morning, Alex
              </p>
              <p className="mt-0.5 text-[12px] text-slate-500">
                Here&apos;s what changed in your customer feedback.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] text-slate-600 sm:inline-flex">
                Last 30 days
                <ChevronDown className="size-3" />
              </span>
              <span className="hidden size-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 sm:flex">
                <Bell className="size-3.5" />
              </span>
              <span className="flex size-7 items-center justify-center rounded-full bg-[#494AFD] text-[10px] font-semibold text-white">
                AS
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {KPIS.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
              >
                <p className="text-[10px] font-medium text-slate-500">{kpi.label}</p>
                <p className="mt-1 font-display text-[18px] font-bold tabular-nums tracking-tight text-navy">
                  {kpi.value}
                </p>
                <p
                  className={cn(
                    "mt-1 text-[11px] font-semibold",
                    kpi.up ? "text-emerald-600" : "text-rose-500",
                  )}
                >
                  {kpi.delta}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-2.5 lg:grid-cols-5">
            <div className="rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm lg:col-span-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[12px] font-semibold text-navy">Feedback volume</p>
                <div className="flex items-center gap-3 text-[10px] text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-[#494AFD]" /> Positive
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-slate-300" /> Neutral
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-rose-400" /> Negative
                  </span>
                </div>
              </div>
              <div className="mt-4 flex h-[120px] items-end gap-1.5 px-1">
                {BARS.map(([pos, neu, neg], i) => (
                  <div key={i} className="flex flex-1 flex-col justify-end gap-0.5">
                    <div
                      className="w-full rounded-sm bg-rose-400/90"
                      style={{ height: `${neg}%` }}
                    />
                    <div
                      className="w-full rounded-sm bg-slate-200"
                      style={{ height: `${neu}%` }}
                    />
                    <div
                      className="w-full rounded-sm bg-[#494AFD]"
                      style={{ height: `${pos}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between px-1 text-[9px] text-slate-400">
                <span>Aug 1</span>
                <span>Aug 14</span>
                <span>Aug 28</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm lg:col-span-2">
              <p className="text-[12px] font-semibold text-navy">
                Sentiment distribution
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="relative size-[92px] shrink-0">
                  <div
                    className="size-full rounded-full"
                    style={{
                      background:
                        "conic-gradient(#22C55E 0 68%, #94A3B8 68% 90%, #F43F5E 90% 100%)",
                    }}
                  />
                  <div className="absolute inset-[18%] flex flex-col items-center justify-center rounded-full bg-white text-center">
                    <span className="text-[15px] font-bold text-navy">68%</span>
                    <span className="text-[9px] text-slate-500">Positive</span>
                  </div>
                </div>
                <ul className="min-w-0 flex-1 space-y-2 text-[11px] text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="size-2 shrink-0 rounded-full bg-emerald-500" />
                    <span className="truncate">Positive</span>
                    <span className="ml-auto font-semibold text-navy">68%</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-2 shrink-0 rounded-full bg-slate-400" />
                    <span className="truncate">Neutral</span>
                    <span className="ml-auto font-semibold text-navy">22%</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-2 shrink-0 rounded-full bg-rose-500" />
                    <span className="truncate">Negative</span>
                    <span className="ml-auto font-semibold text-navy">10%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
