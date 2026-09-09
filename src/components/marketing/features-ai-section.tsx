import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Bell,
  FileText,
  Inbox,
  Layers3,
  LayoutDashboard,
  Lightbulb,
  Play,
  Search,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { BrandWord } from "@/components/brand/brand-word";
import { LoopMark } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

const BENEFITS = [
  {
    title: "Detect trends early",
    copy: "Spot rising and declining topics before they become problems.",
    Icon: BarChart3,
    tint: "bg-violet-100 text-violet-600",
  },
  {
    title: "Surface actionable insights",
    copy: "Clear recommendations your team can act on this week.",
    Icon: Lightbulb,
    tint: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Understand customer sentiment",
    copy: "See how customers feel — and why — across every channel.",
    Icon: Target,
    tint: "bg-pink-100 text-pink-600",
  },
  {
    title: "Save time",
    copy: "Skip the spreadsheet slog. AI does the sorting for you.",
    Icon: Sparkles,
    tint: "bg-amber-100 text-amber-600",
  },
];

const NAV: {
  label: string;
  Icon: typeof LayoutDashboard;
  active?: boolean;
}[] = [
  { label: "Overview", Icon: LayoutDashboard },
  { label: "Feedback", Icon: Inbox },
  { label: "AI Analysis", Icon: Sparkles, active: true },
  { label: "Themes", Icon: Layers3 },
  { label: "Trends", Icon: TrendingUp },
  { label: "Ask LOOP", Icon: Sparkles },
  { label: "Reports", Icon: FileText },
];

const METRICS = [
  { label: "Positive feedback", value: "+18%", up: true },
  { label: "Onboarding issues", value: "-32%", up: false },
  { label: "New feature requests", value: "12", up: true },
];

const TOPICS = [
  {
    name: "Onboarding",
    sentiment: "Positive",
    tone: "bg-emerald-50 text-emerald-700",
    mentions: 342,
    spark: [40, 48, 44, 58, 62, 70],
  },
  {
    name: "Dark Mode",
    sentiment: "Neutral",
    tone: "bg-slate-100 text-slate-600",
    mentions: 198,
    spark: [30, 28, 36, 42, 48, 52],
  },
  {
    name: "Performance",
    sentiment: "Negative",
    tone: "bg-rose-50 text-rose-600",
    mentions: 164,
    spark: [60, 55, 50, 48, 42, 38],
  },
  {
    name: "Pricing",
    sentiment: "Mixed",
    tone: "bg-amber-50 text-amber-700",
    mentions: 142,
    spark: [35, 40, 38, 44, 46, 45],
  },
];

export function FeaturesAiSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F8F9FF] to-white py-24">
      <div className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-[#EEF0FF] blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-16 h-80 w-80 rounded-full bg-[#E0F2FE]/60 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
            AI Insights
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl sm:leading-[1.15]">
            Turn feedback into meaningful insights.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
            <BrandWord /> analyzes every piece of feedback, detects trends, and
            highlights what matters — so your team can make faster, smarter
            product decisions.
          </p>

          <ul className="mt-8 space-y-4">
            {BENEFITS.map(({ title, copy, Icon, tint }) => (
              <li key={title} className="flex gap-3.5">
                <span
                  className={cn(
                    "mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl",
                    tint,
                  )}
                >
                  <Icon className="size-[18px]" strokeWidth={2.2} />
                </span>
                <div>
                  <h3 className="font-display text-[15px] font-semibold text-navy">
                    {title}
                  </h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">
                    {copy}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-[#494AFD] px-6 text-white shadow-[0_12px_28px_rgba(73,74,253,0.3)] hover:bg-[#3839d4]",
              )}
            >
              See AI in action →
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-navy shadow-sm hover:border-[#C7CBFF] hover:text-[#494AFD]"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-[#EEF0FF] text-[#494AFD]">
                <Play className="ml-0.5 size-3 fill-current" />
              </span>
              Watch video
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
              "absolute -top-2 left-1/2 z-20 -translate-x-1/2 text-[22px] font-semibold text-[#7C3AED] sm:left-auto sm:right-28 sm:translate-x-0",
            )}
          >
            From feedback to insights.
          </p>
          <svg
            className="absolute left-1/2 top-6 z-20 h-9 w-12 -translate-x-1/2 text-[#7C3AED] sm:left-auto sm:right-40 sm:translate-x-0"
            viewBox="0 0 48 36"
            fill="none"
            aria-hidden
          >
            <path
              d="M24 2C20 12 16 20 14 30"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="3 4"
            />
            <path
              d="M10 24L14 30L20 26"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* AI Summary float */}
          <div className="absolute -right-1 top-14 z-20 hidden w-[220px] rounded-2xl bg-white p-3.5 shadow-[0_16px_40px_rgba(15,23,42,0.12)] sm:block lg:-right-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex size-7 items-center justify-center rounded-lg bg-[#EEF0FF] text-[#494AFD]">
                <Sparkles className="size-3.5" />
              </span>
              <p className="text-[12px] font-semibold text-navy">AI Summary</p>
              <span className="ml-auto rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600">
                New
              </span>
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-slate-600">
              Users are loving the new onboarding flow, but many are asking for
              dark mode...
            </p>
          </div>

          {/* Sentiment float */}
          <div className="absolute -left-2 bottom-28 z-20 hidden w-[190px] rounded-2xl bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.12)] sm:block lg:-left-4">
            <p className="text-[11px] font-semibold text-navy">
              Customer Sentiment
            </p>
            <div className="mt-2.5 flex items-center gap-2.5">
              <div className="relative size-14 shrink-0">
                <div
                  className="size-full rounded-full"
                  style={{
                    background:
                      "conic-gradient(#22C55E 0 62%, #94A3B8 62% 86%, #F43F5E 86% 100%)",
                  }}
                />
                <div className="absolute inset-[18%] flex items-center justify-center rounded-full bg-white text-[10px] font-bold text-navy">
                  62%
                </div>
              </div>
              <ul className="space-y-1 text-[10px] text-slate-600">
                <li className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Positive
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-slate-400" />
                  Neutral
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-rose-500" />
                  Negative
                </li>
              </ul>
            </div>
          </div>

          {/* Testimonial float */}
          <div className="absolute -right-1 bottom-16 z-20 hidden w-[230px] rounded-2xl bg-white p-3.5 shadow-[0_16px_40px_rgba(15,23,42,0.12)] sm:block lg:right-0">
            <p className="text-[12px] leading-relaxed text-slate-600">
              “The AI insights helped us identify a major friction point before
              it hurt retention.”
            </p>
            <div className="mt-3 flex items-center gap-2.5">
              <Image
                src="/marketing/avatar-sarah.jpg"
                alt="Sarah Kim"
                width={32}
                height={32}
                className="size-8 rounded-full object-cover"
              />
              <div>
                <p className="text-[12px] font-semibold text-navy">Sarah Kim</p>
                <p className="text-[10px] text-slate-500">
                  Product Manager, Nexa
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto max-w-[560px] pt-8">
            <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-[#494AFD]/10 blur-2xl" />
            <div className="relative origin-center lg:rotate-[-1.5deg]">
              <AiDashboardMock />
            </div>
          </div>
        </div>
      </div>

      <p className="relative mt-16 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
        Smarter decisions. Happier customers.
      </p>
    </section>
  );
}

function AiDashboardMock() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_28px_80px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/70">
      <div className="flex min-h-[380px]">
        <aside className="hidden w-[120px] shrink-0 border-r border-slate-100 p-2.5 sm:block">
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
                <span className="truncate">
                  {label === "Ask LOOP" ? (
                    <>
                      Ask <BrandWord className="text-[10px]" />
                    </>
                  ) : (
                    label
                  )}
                </span>
              </div>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1 bg-[#FAFBFC] p-3 sm:p-3.5">
          <div className="flex items-center gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[10px] text-slate-400">
              <Search className="size-3 shrink-0" />
              <span className="truncate">Search insights...</span>
            </div>
            <span className="hidden size-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 sm:flex">
              <Bell className="size-3.5" />
            </span>
            <span className="flex size-7 items-center justify-center rounded-full bg-[#494AFD] text-[10px] font-semibold text-white">
              AX
            </span>
          </div>

          <p className="mt-3 font-display text-[13px] font-semibold text-navy">
            AI Analysis
          </p>

          <div className="mt-2.5 grid grid-cols-3 gap-2">
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-slate-100 bg-white p-2 shadow-sm"
              >
                <p
                  className={cn(
                    "font-display text-[14px] font-bold tabular-nums",
                    m.up ? "text-emerald-600" : "text-rose-500",
                  )}
                >
                  {m.value}
                </p>
                <p className="mt-0.5 text-[9px] leading-tight text-slate-500">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2.5 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
            <div className="grid grid-cols-[1fr_72px_56px_48px] gap-1 border-b border-slate-100 px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
              <span>Theme</span>
              <span>Sentiment</span>
              <span className="text-right">Mentions</span>
              <span className="text-right">Trend</span>
            </div>
            {TOPICS.map((row) => (
              <div
                key={row.name}
                className="grid grid-cols-[1fr_72px_56px_48px] items-center gap-1 border-b border-slate-50 px-3 py-2 last:border-0"
              >
                <span className="truncate text-[11px] font-medium text-navy">
                  {row.name}
                </span>
                <span
                  className={cn(
                    "inline-flex w-fit rounded-full px-1.5 py-0.5 text-[8px] font-semibold",
                    row.tone,
                  )}
                >
                  {row.sentiment}
                </span>
                <span className="text-right text-[11px] tabular-nums text-slate-600">
                  {row.mentions}
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
  const w = 40;
  const h = 16;
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
