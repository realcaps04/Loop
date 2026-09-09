import Link from "next/link";
import {
  BarChart3,
  Check,
  Globe,
  Heart,
  Lightbulb,
  MessageSquare,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { BrandWord } from "@/components/brand/brand-word";
import { LoopMark } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

const METRICS = [
  {
    value: "1M+",
    label: "Feedback processed",
    Icon: MessageSquare,
    tint: "bg-violet-100 text-violet-600",
  },
  {
    value: "50+",
    label: "Integrations",
    Icon: BarChart3,
    tint: "bg-emerald-100 text-emerald-600",
  },
  {
    value: "100+",
    label: "Countries",
    Icon: Globe,
    tint: "bg-sky-100 text-sky-600",
  },
  {
    value: "4.9/5",
    label: "Customer satisfaction",
    Icon: Heart,
    tint: "bg-pink-100 text-pink-600",
  },
];

const FLOATS = [
  {
    label: "Uncover what matters most.",
    Icon: Sparkles,
    tint: "bg-violet-50 text-violet-600",
    className: "-left-2 top-8 sm:-left-6",
  },
  {
    label: "Turn insights into action.",
    Icon: Lightbulb,
    tint: "bg-emerald-50 text-emerald-600",
    className: "-right-2 top-28 sm:-right-4",
  },
  {
    label: "Build better products.",
    Icon: Target,
    tint: "bg-rose-50 text-rose-500",
    className: "bottom-10 -left-1 sm:-left-4",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Collect",
    copy: "Gather feedback from every channel your customers use.",
    Icon: MessageSquare,
    tint: "bg-violet-100 text-violet-600",
    items: ["In-app widgets", "Surveys & NPS", "Support tickets"],
  },
  {
    n: "02",
    title: "Analyze",
    copy: "AI detects themes, sentiment, and emerging trends.",
    Icon: Search,
    tint: "bg-sky-100 text-sky-600",
    items: ["Sentiment scores", "Theme clusters", "Trend signals"],
  },
  {
    n: "03",
    title: "Act",
    copy: "Prioritize opportunities and assign clear next steps.",
    Icon: Lightbulb,
    tint: "bg-amber-100 text-amber-600",
    items: ["Rank opportunities", "Assign owners", "Share briefings"],
  },
  {
    n: "04",
    title: "Grow",
    copy: "Measure impact, close the loop, and delight customers.",
    Icon: BarChart3,
    tint: "bg-indigo-100 text-indigo-600",
    items: ["Track outcomes", "Close the loop", "Prove impact"],
  },
];

const INSIGHTS = [
  { value: "+18%", label: "Increase in positive feedback", tone: "text-emerald-600" },
  { value: "-32%", label: "Decrease in reported issues", tone: "text-rose-500" },
  { value: "12", label: "New opportunities identified", tone: "text-[#494AFD]" },
];

const THEMES = [
  {
    name: "Onboarding",
    mentions: 342,
    sentiment: "Positive",
    tone: "bg-emerald-50 text-emerald-700",
    spark: [40, 48, 52, 58, 62, 70],
  },
  {
    name: "Features",
    mentions: 286,
    sentiment: "Neutral",
    tone: "bg-slate-100 text-slate-600",
    spark: [30, 34, 38, 42, 40, 44],
  },
  {
    name: "Performance",
    mentions: 198,
    sentiment: "Negative",
    tone: "bg-rose-50 text-rose-600",
    spark: [60, 55, 50, 48, 42, 38],
  },
  {
    name: "Pricing",
    mentions: 164,
    sentiment: "Positive",
    tone: "bg-emerald-50 text-emerald-700",
    spark: [28, 32, 36, 40, 46, 50],
  },
];

const NAV = [
  "Overview",
  "Feedback",
  "Analysis",
  "Themes",
  "People",
  "Actions",
  "Reports",
];

export function HowApproachSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#EEF0FF] blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-40 h-80 w-80 rounded-full bg-[#E0F2FE]/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
              Our approach
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl sm:leading-[1.15]">
              From feedback to real impact.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
              <BrandWord /> turns raw customer signal into actionable insights —
              so your team can listen, decide, and ship what matters.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {METRICS.map(({ value, label, Icon, tint }) => (
                <div
                  key={label}
                  className="rounded-2xl bg-white p-3.5 shadow-[0_12px_32px_rgba(15,23,42,0.06)] ring-1 ring-slate-100"
                >
                  <span
                    className={cn(
                      "inline-flex size-9 items-center justify-center rounded-xl",
                      tint,
                    )}
                  >
                    <Icon className="size-4" strokeWidth={2.2} />
                  </span>
                  <p className="mt-2.5 font-display text-xl font-bold tracking-tight text-navy">
                    {value}
                  </p>
                  <p className="mt-0.5 text-[12px] text-ink-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <p
              className={cn(
                hand.className,
                "absolute -top-3 left-1/2 z-20 -translate-x-1/2 text-[22px] font-semibold text-[#7C3AED] sm:left-auto sm:right-16 sm:translate-x-0",
              )}
            >
              A simple process. Big results.
            </p>

            {FLOATS.map(({ label, Icon, tint, className }) => (
              <div
                key={label}
                className={cn(
                  "absolute z-20 hidden max-w-[180px] items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-[0_12px_32px_rgba(15,23,42,0.12)] sm:flex",
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
                <p className="text-[11px] font-semibold leading-snug text-navy">
                  {label}
                </p>
              </div>
            ))}

            <div className="relative mx-auto max-w-[560px] pt-10">
              <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-[#494AFD]/10 blur-2xl" />
              <ApproachDashboardMock />
            </div>
          </div>
        </div>

        <div className="relative mt-20">
          <p
            className={cn(
              hand.className,
              "mb-6 text-[20px] font-semibold text-[#7C3AED] sm:absolute sm:-top-2 sm:left-0 sm:mb-0",
            )}
          >
            Feedback today. A brighter tomorrow.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {STEPS.map((step, index) => (
              <div key={step.n} className="relative">
                {index < STEPS.length - 1 && (
                  <div
                    className="pointer-events-none absolute -right-3 top-16 z-10 hidden text-[#A5B4FC] lg:block"
                    aria-hidden
                  >
                    →
                  </div>
                )}
                <article className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.07)] sm:p-6">
                  <p className="text-[12px] font-semibold text-slate-400">
                    {step.n}
                  </p>
                  <div
                    className={cn(
                      "mx-auto mt-3 inline-flex size-12 items-center justify-center rounded-2xl",
                      step.tint,
                    )}
                  >
                    <step.Icon className="size-6" strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 text-center font-display text-lg font-semibold text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-center text-sm leading-relaxed text-ink-muted">
                    {step.copy}
                  </p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {step.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-[13px] text-slate-700"
                      >
                        <Check
                          className="size-3.5 shrink-0 text-[#494AFD]"
                          strokeWidth={2.5}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/features"
                    className="mt-4 text-center text-sm font-semibold text-[#494AFD] hover:text-[#3839d4]"
                  >
                    Learn more →
                  </Link>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center text-center">
          <Link
            href="/features"
            className={cn(
              buttonVariants({ size: "xl" }),
              "rounded-full bg-[#494AFD] px-8 text-white shadow-[0_12px_30px_rgba(73,74,253,0.3)] hover:bg-[#3839d4]",
            )}
          >
            See how it works →
          </Link>
          <p className="mt-3 text-[13px] text-slate-500">
            No credit card required · 14-day free trial
          </p>
        </div>
      </div>
    </section>
  );
}

function ApproachDashboardMock() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_28px_80px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/70">
      <div className="flex min-h-[360px]">
        <aside className="hidden w-[118px] shrink-0 border-r border-slate-100 p-2.5 sm:block">
          <div className="mb-3 flex items-center gap-1.5 px-1">
            <LoopMark className="size-4" />
            <BrandWord className="text-[11px] font-bold" />
          </div>
          <nav className="space-y-0.5">
            {NAV.map((label) => (
              <div
                key={label}
                className={cn(
                  "rounded-lg px-1.5 py-1.5 text-[10px]",
                  label === "Analysis"
                    ? "bg-[#EEF0FF] font-medium text-[#494AFD]"
                    : "text-slate-500",
                )}
              >
                {label}
              </div>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1 bg-[#FAFBFC] p-3 sm:p-3.5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-display text-[13px] font-semibold text-navy">
                Insights
              </p>
              <p className="text-[10px] text-slate-500">
                Turn feedback into opportunities.
              </p>
            </div>
            <span className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-500">
              Last 30 days
            </span>
          </div>

          <div className="mt-2.5 grid grid-cols-3 gap-2">
            {INSIGHTS.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-slate-100 bg-white p-2 shadow-sm"
              >
                <p className={cn("font-display text-[14px] font-bold", m.tone)}>
                  {m.value}
                </p>
                <p className="mt-0.5 text-[9px] leading-tight text-slate-500">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2.5 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
            <div className="grid grid-cols-[1fr_52px_64px_40px] gap-1 border-b border-slate-100 px-3 py-2 text-[8px] font-semibold uppercase tracking-wide text-slate-400">
              <span>Theme</span>
              <span className="text-right">Mentions</span>
              <span>Sentiment</span>
              <span className="text-right">Trend</span>
            </div>
            {THEMES.map((row) => (
              <div
                key={row.name}
                className="grid grid-cols-[1fr_52px_64px_40px] items-center gap-1 border-b border-slate-50 px-3 py-2 last:border-0"
              >
                <span className="truncate text-[11px] font-medium text-navy">
                  {row.name}
                </span>
                <span className="text-right text-[11px] tabular-nums text-slate-600">
                  {row.mentions}
                </span>
                <span
                  className={cn(
                    "inline-flex w-fit rounded-full px-1.5 py-0.5 text-[8px] font-semibold",
                    row.tone,
                  )}
                >
                  {row.sentiment}
                </span>
                <Sparkline points={row.spark} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Sparkline({ points }: { points: number[] }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 36;
  const h = 14;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / (max - min || 1)) * (h - 2) - 1;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      className="ml-auto text-[#494AFD]"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden
    >
      <path d={path} fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
