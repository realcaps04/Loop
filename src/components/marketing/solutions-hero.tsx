import Image from "next/image";
import {
  FileText,
  Inbox,
  Layers3,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import { BrandWord } from "@/components/brand/brand-word";
import { LoopMark } from "@/components/brand/logo";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

const NAV = [
  { label: "Overview", Icon: LayoutDashboard },
  { label: "Feedback", Icon: Inbox, active: true },
  { label: "Analysis", Icon: Sparkles },
  { label: "Themes", Icon: Layers3 },
  { label: "People", Icon: Users },
  { label: "Settings", Icon: Settings },
];

const TEAMS = [
  { name: "Product", value: "342", delta: "+18%" },
  { name: "Engineering", value: "286", delta: "+12%" },
  { name: "Design", value: "198", delta: "+9%" },
  { name: "Marketing", value: "164", delta: "+15%" },
];

const CHART = [
  { p: 28, e: 22, d: 18, m: 14 },
  { p: 32, e: 24, d: 16, m: 18 },
  { p: 30, e: 28, d: 20, m: 16 },
  { p: 38, e: 26, d: 22, m: 20 },
  { p: 42, e: 30, d: 24, m: 22 },
  { p: 40, e: 34, d: 26, m: 24 },
  { p: 48, e: 36, d: 28, m: 26 },
  { p: 52, e: 38, d: 30, m: 28 },
];

export function SolutionsHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F8FC] via-white to-white">
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#EEF0FF] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-32 h-80 w-80 rounded-full bg-[#FCE7F3]/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
            Solutions
          </p>
          <h1 className="mt-3 font-display text-[2.4rem] font-black tracking-tight text-navy sm:text-[3rem] sm:leading-[1.08]">
            Built for every team that cares about{" "}
            <span className="text-[#494AFD]">customer feedback.</span>
          </h1>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-muted">
            No matter your role, <BrandWord /> helps you collect, understand, and
            act on feedback — so you can build better products, together.
          </p>
        </div>

        <div className="relative lg:col-span-7">
          <p
            className={cn(
              hand.className,
              "absolute -top-2 left-4 z-20 max-w-[12rem] text-[20px] font-semibold leading-tight text-[#7C3AED] sm:left-8",
            )}
          >
            Different teams. A common goal. Happier customers.
          </p>

          <div className="absolute -right-1 top-20 z-20 hidden max-w-[200px] items-start gap-2 rounded-2xl bg-white p-3 shadow-[0_14px_36px_rgba(15,23,42,0.12)] sm:flex lg:right-0">
            <Image
              src="/marketing/avatar-sarah.jpg"
              alt=""
              width={32}
              height={32}
              className="size-8 rounded-full object-cover"
            />
            <p className="text-[12px] font-medium leading-snug text-navy">
              Feedback helps us build what users love.
            </p>
          </div>

          <p
            className={cn(
              hand.className,
              "absolute right-0 top-[48%] z-20 hidden max-w-[8rem] text-right text-[18px] font-semibold leading-tight text-[#7C3AED] lg:block",
            )}
          >
            Actionable insights for every team.
          </p>

          <p
            className={cn(
              hand.className,
              "absolute -bottom-2 right-8 z-20 max-w-[9rem] text-right text-[18px] font-semibold leading-tight text-[#7C3AED]",
            )}
          >
            Same platform. More possibilities.
          </p>

          <div className="relative mx-auto max-w-[560px] pt-12">
            <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-[#494AFD]/10 blur-2xl" />
            <div className="relative origin-center lg:rotate-[-2.5deg]">
              <SolutionsDashboardMock />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SolutionsDashboardMock() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_28px_80px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/70">
      <div className="flex min-h-[360px]">
        <aside className="hidden w-[118px] shrink-0 border-r border-slate-100 p-2.5 sm:block">
          <div className="mb-3 flex items-center gap-1.5 px-1">
            <LoopMark className="size-4" />
            <BrandWord className="text-[11px] font-bold" />
          </div>
          <nav className="space-y-0.5">
            {NAV.map(({ label, Icon, active }) => (
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
                {label}
              </div>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1 bg-[#FAFBFC] p-3 sm:p-3.5">
          <div className="flex items-center justify-between gap-2">
            <p className="font-display text-[13px] font-semibold text-navy">
              Feedback by team
            </p>
            <FileText className="size-3.5 text-slate-400" />
          </div>

          <div className="mt-2.5 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {TEAMS.map((team) => (
              <div
                key={team.name}
                className="rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm"
              >
                <p className="text-[9px] font-medium text-slate-500">
                  {team.name}
                </p>
                <p className="mt-0.5 font-display text-[15px] font-bold tabular-nums text-navy">
                  {team.value}
                </p>
                <p className="text-[9px] font-semibold text-emerald-600">
                  ↑ {team.delta}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2.5 grid gap-2.5 lg:grid-cols-5">
            <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm lg:col-span-3">
              <p className="text-[11px] font-semibold text-navy">Team trends</p>
              <svg
                className="mt-3 h-[100px] w-full"
                viewBox="0 0 280 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d={linePath(CHART.map((c) => c.p), 280, 100)}
                  fill="none"
                  stroke="#494AFD"
                  strokeWidth="2"
                />
                <path
                  d={linePath(CHART.map((c) => c.e), 280, 100)}
                  fill="none"
                  stroke="#34D399"
                  strokeWidth="2"
                />
                <path
                  d={linePath(CHART.map((c) => c.d), 280, 100)}
                  fill="none"
                  stroke="#F472B6"
                  strokeWidth="2"
                />
                <path
                  d={linePath(CHART.map((c) => c.m), 280, 100)}
                  fill="none"
                  stroke="#FBBF24"
                  strokeWidth="2"
                />
              </svg>
              <div className="mt-1 flex justify-between text-[8px] text-slate-400">
                <span>Aug 1</span>
                <span>Aug 28</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm lg:col-span-2">
              <p className="text-[10px] font-semibold text-slate-500">
                Top theme this month
              </p>
              <p className="mt-1 font-display text-[15px] font-bold text-navy">
                Onboarding
              </p>
              <p className="mt-1 text-[11px] text-slate-600">
                Mentioned <span className="font-semibold text-navy">142</span>{" "}
                times
              </p>
              <p className="mt-2 text-[12px] font-semibold text-emerald-600">
                +25%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function linePath(values: number[], w: number, h: number) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * (h - 12) - 6;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}
