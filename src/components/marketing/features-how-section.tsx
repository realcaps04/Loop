import Link from "next/link";
import {
  Check,
  Frown,
  Inbox,
  Layers3,
  LayoutDashboard,
  Link2,
  Meh,
  Play,
  Smile,
  Sparkles,
  Target,
} from "lucide-react";
import { BrandWord } from "@/components/brand/brand-word";
import { LoopMark } from "@/components/brand/logo";
import {
  IntercomMark,
  SlackMark,
  ZendeskMark,
} from "@/components/marketing/logos";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

const STEPS = [
  {
    n: "01",
    title: "Connect your channels",
    copy: "Link Slack, Zendesk, surveys, and app stores in minutes — no engineering lift.",
    Icon: Link2,
    tint: "bg-violet-100 text-violet-600",
  },
  {
    n: "02",
    title: "Collect and organize",
    copy: "Every ticket, review, and comment lands in one inbox, tagged and searchable.",
    Icon: Inbox,
    tint: "bg-emerald-100 text-emerald-600",
  },
  {
    n: "03",
    title: "Analyze with AI",
    copy: "LOOP detects sentiment, themes, and emerging issues with evidence you can trust.",
    Icon: Sparkles,
    tint: "bg-pink-100 text-pink-600",
  },
  {
    n: "04",
    title: "Take action",
    copy: "Prioritize what matters, assign owners, and ship changes that move the needle.",
    Icon: Target,
    tint: "bg-amber-100 text-amber-600",
  },
];

const KPIS = [
  { label: "Total feedback", value: "1,248", delta: "+18%", up: true, Face: Smile },
  { label: "Positive", value: "62%", delta: "+12%", up: true, Face: Smile },
  { label: "Neutral", value: "24%", delta: "+5%", up: true, Face: Meh },
  { label: "Negative", value: "14%", delta: "-8%", up: false, Face: Frown },
];

const BARS = [
  [40, 16, 10],
  [36, 14, 8],
  [48, 18, 12],
  [42, 16, 10],
  [54, 20, 14],
  [46, 18, 11],
  [58, 22, 16],
  [50, 19, 12],
  [62, 24, 18],
  [54, 20, 14],
];

const TAGS = [
  { label: "Feature request", count: 320, tint: "bg-sky-50 text-sky-700" },
  { label: "Bug report", count: 210, tint: "bg-rose-50 text-rose-600" },
  { label: "Positive feedback", count: 480, tint: "bg-emerald-50 text-emerald-700" },
];

const ACTIONS = [
  { label: "Improve onboarding flow", done: true },
  { label: "Fix login issue", done: false },
  { label: "Explore dark mode", done: false },
];

export function FeaturesHowSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute -left-16 top-20 h-72 w-72 rounded-full bg-[#EEF0FF] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#E0F2FE]/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl sm:leading-[1.15]">
            A simple process.{" "}
            <span className="text-[#494AFD]">Powerful results.</span>
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
            Go from feedback to meaningful insights in just a few steps — no
            complex setup, no steep learning curve.
          </p>

          <ol className="mt-8 space-y-5">
            {STEPS.map(({ n, title, copy, Icon, tint }) => (
              <li key={n} className="flex gap-3.5">
                <span
                  className={cn(
                    "mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl",
                    tint,
                  )}
                >
                  <Icon className="size-[18px]" strokeWidth={2.2} />
                </span>
                <div>
                  <p className="text-[11px] font-bold tracking-wide text-[#494AFD]">
                    {n}
                  </p>
                  <h3 className="mt-0.5 font-display text-[16px] font-semibold text-navy">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    {copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-[#494AFD] px-6 text-white shadow-[0_12px_28px_rgba(73,74,253,0.3)] hover:bg-[#3839d4]",
              )}
            >
              Get started free →
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-navy shadow-sm hover:border-[#C7CBFF] hover:text-[#494AFD]"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-[#EEF0FF] text-[#494AFD]">
                <Play className="ml-0.5 size-3 fill-current" />
              </span>
              Watch how it works
            </Link>
          </div>
          <p className="mt-3 text-[13px] text-slate-500">
            No credit card required · Set up in minutes
          </p>
        </div>

        <div className="relative lg:col-span-7">
          {/* Connect */}
          <div className="absolute -left-1 top-8 z-20 hidden w-[200px] rounded-2xl bg-white p-3 shadow-[0_14px_36px_rgba(15,23,42,0.12)] sm:block lg:-left-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Connect
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[#F5F5F5]">
                <SlackMark className="size-4" />
              </span>
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[#F5F5F5]">
                <ZendeskMark className="size-4" />
              </span>
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[#F5F5F5]">
                <IntercomMark className="size-4" />
              </span>
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-slate-900 text-[9px] font-bold text-white">
                ▶
              </span>
            </div>
          </div>

          {/* Collect */}
          <div className="absolute left-4 top-[42%] z-20 hidden max-w-[210px] rounded-2xl bg-white p-3 shadow-[0_14px_36px_rgba(15,23,42,0.12)] sm:block lg:left-0">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Collect
            </p>
            <p className="mt-2 text-[13px] font-medium leading-snug text-navy">
              “Loving the new update! 💬”
            </p>
          </div>

          {/* Analyze */}
          <div className="absolute -right-1 top-6 z-20 hidden w-[180px] rounded-2xl bg-white p-3 shadow-[0_14px_36px_rgba(15,23,42,0.12)] sm:block lg:-right-2">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              AI Analysis
            </p>
            <ul className="mt-2 space-y-1.5">
              {TAGS.map((tag) => (
                <li
                  key={tag.label}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-2 py-1.5 text-[11px] font-semibold",
                    tag.tint,
                  )}
                >
                  <span>{tag.label}</span>
                  <span className="tabular-nums opacity-80">{tag.count}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Take action */}
          <div className="absolute bottom-20 right-0 z-20 hidden w-[200px] rounded-2xl bg-white p-3 shadow-[0_14px_36px_rgba(15,23,42,0.12)] sm:block lg:-right-2">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Create Action
            </p>
            <ul className="mt-2 space-y-2">
              {ACTIONS.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start gap-2 text-[12px] text-navy"
                >
                  <span
                    className={cn(
                      "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border",
                      item.done
                        ? "border-[#494AFD] bg-[#494AFD] text-white"
                        : "border-slate-300 bg-white",
                    )}
                  >
                    {item.done ? <Check className="size-2.5" strokeWidth={3} /> : null}
                  </span>
                  <span className={item.done ? "line-through opacity-60" : ""}>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p
            className={cn(
              hand.className,
              "absolute -bottom-1 right-2 z-20 max-w-[10rem] text-right text-[20px] font-semibold leading-tight text-[#7C3AED] sm:bottom-2 sm:right-8",
            )}
          >
            From feedback to a better product.
          </p>

          <div className="relative mx-auto max-w-[560px] pt-4">
            <div className="pointer-events-none absolute -inset-6 rounded-[32px] bg-[#494AFD]/10 blur-2xl" />
            <div className="relative origin-center lg:rotate-[1.5deg]">
              <HowDashboardMock />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowDashboardMock() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_28px_80px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/70">
      <div className="flex min-h-[360px]">
        <aside className="hidden w-[118px] shrink-0 border-r border-slate-100 p-2.5 sm:block">
          <div className="mb-3 flex items-center gap-1.5 px-1">
            <LoopMark className="size-4" />
            <BrandWord className="text-[11px] font-bold" />
          </div>
          <nav className="space-y-0.5">
            {[
              { label: "Overview", Icon: LayoutDashboard, active: true },
              { label: "Feedback", Icon: Inbox },
              { label: "Analysis", Icon: Sparkles },
              { label: "Themes", Icon: Layers3 },
              { label: "Actions", Icon: Target },
            ].map(({ label, Icon, active }) => (
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
          <p className="font-display text-[13px] font-semibold text-navy">
            Feedback Overview
          </p>
          <div className="mt-2.5 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {KPIS.map(({ label, value, delta, up, Face }) => (
              <div
                key={label}
                className="rounded-xl border border-slate-100 bg-white p-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-medium text-slate-500">{label}</p>
                  <Face
                    className={cn(
                      "size-3.5",
                      up ? "text-emerald-500" : "text-rose-400",
                    )}
                  />
                </div>
                <p className="mt-0.5 font-display text-[15px] font-bold tabular-nums text-navy">
                  {value}
                </p>
                <p
                  className={cn(
                    "text-[9px] font-semibold",
                    up ? "text-emerald-600" : "text-rose-500",
                  )}
                >
                  {delta}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2.5 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
            <p className="text-[11px] font-semibold text-navy">Feedback volume</p>
            <div className="mt-3 flex h-[110px] items-end gap-1">
              {BARS.map(([pos, neu, neg], i) => (
                <div key={i} className="flex flex-1 flex-col justify-end gap-0.5">
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
            <div className="mt-1.5 flex justify-between text-[8px] text-slate-400">
              <span>Aug 1</span>
              <span>Aug 28</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
