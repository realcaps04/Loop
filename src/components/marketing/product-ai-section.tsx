import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Cpu,
  FileText,
  Layers3,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { BrandWord } from "@/components/brand/brand-word";
import { LoopMark } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

const FEATURES = [
  {
    title: "Sentiment analysis",
    copy: "Detect positive, neutral, and negative feedback automatically.",
    Icon: Sparkles,
    tint: "bg-violet-100 text-violet-700",
  },
  {
    title: "Automatic theming",
    copy: "Group related feedback into clear themes without manual tagging.",
    Icon: Layers3,
    tint: "bg-sky-100 text-sky-700",
  },
  {
    title: "Clear, actionable insights",
    copy: "See what is rising, cooling, and where to focus next.",
    Icon: FileText,
    tint: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Evidence-backed recommendations",
    copy: "Every insight links back to real customer quotes.",
    Icon: Lightbulb,
    tint: "bg-amber-100 text-amber-700",
  },
];

const SENTIMENT = [
  { label: "Positive", value: "62%", delta: "+4.2%", up: true, color: "text-emerald-600" },
  { label: "Neutral", value: "24%", delta: "+1.1%", up: true, color: "text-slate-600" },
  { label: "Negative", value: "14%", delta: "-2.8%", up: false, color: "text-rose-600" },
  { label: "Total feedback", value: "1,248", delta: "+18%", up: true, color: "text-[#494AFD]" },
];

const THEMES = [
  { name: "Onboarding", width: "88%", value: "342" },
  { name: "Performance", width: "72%", value: "286" },
  { name: "Integrations", width: "58%", value: "198" },
  { name: "Pricing", width: "44%", value: "142" },
  { name: "Support", width: "36%", value: "118" },
];

const NAV: { label: string; active?: boolean; badge?: string }[] = [
  { label: "Overview" },
  { label: "Inbox", badge: "248" },
  { label: "AI Analysis", active: true },
  { label: "Themes" },
  { label: "Trends" },
  { label: "Ask LOOP" },
  { label: "Reports" },
];

export function ProductAISection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#EEF0FF] blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-[#E0F2FE]/70 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
            AI Analysis
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl sm:leading-[1.15]">
            Turn feedback into intelligence{" "}
            <span className="bg-gradient-to-r from-[#494AFD] to-[#7B7DFD] bg-clip-text text-transparent">
              with AI.
            </span>
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
            <BrandWord /> uses AI to detect sentiment, identify themes, and surface
            what matters — so your team can act with confidence.
          </p>

          <ul className="mt-8 space-y-5">
            {FEATURES.map(({ title, copy, Icon, tint }) => (
              <li key={title} className="flex gap-3.5">
                <span
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-2xl",
                    tint,
                  )}
                >
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-semibold text-navy">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    {copy}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="/themes"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-9 rounded-xl bg-gradient-to-r from-[#494AFD] to-[#6B72F8] shadow-[0_12px_30px_rgba(73,74,253,0.28)] hover:brightness-105",
            )}
          >
            Explore AI Analysis
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="relative lg:col-span-7">
          <AIAnalysisPreview />
        </div>
      </div>
    </section>
  );
}

function AIAnalysisPreview() {
  return (
    <div className="relative mx-auto min-h-[520px] w-full max-w-[640px]">
      <div className="overflow-hidden rounded-2xl border border-white bg-white shadow-[0_28px_70px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70">
        <div className="flex min-h-[460px]">
          <aside className="hidden w-[128px] shrink-0 border-r border-slate-100 p-2.5 sm:block">
            <div className="mb-3 flex items-center gap-1.5 px-1">
              <LoopMark className="size-4" />
              <BrandWord className="text-[11px] font-bold" />
            </div>
            <nav className="space-y-0.5">
              {NAV.map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    "flex items-center gap-1 rounded-md px-1.5 py-1 text-[10px]",
                    item.active
                      ? "bg-[#EEF0FF] font-medium text-[#494AFD]"
                      : "text-slate-500",
                  )}
                >
                  <span className="truncate">
                    {item.label === "Ask LOOP" ? (
                      <>
                        Ask <BrandWord />
                      </>
                    ) : (
                      item.label
                    )}
                  </span>
                  {item.badge ? (
                    <span className="ml-auto rounded-full bg-[#EEF0FF] px-1 text-[8px] font-semibold text-[#494AFD]">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 flex-1 bg-[#FAFBFC] p-3.5 sm:p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-display text-[15px] font-semibold text-navy">
                  AI Analysis
                </p>
                <p className="text-[11px] text-slate-500">
                  Here&apos;s what your customers are telling you.
                </p>
              </div>
              <span className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-500">
                Last 30 days
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {SENTIMENT.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm"
                >
                  <p className="text-[9px] font-medium text-slate-500">{item.label}</p>
                  <p className={cn("mt-0.5 text-[16px] font-bold", item.color)}>
                    {item.value}
                  </p>
                  <p
                    className={cn(
                      "mt-0.5 inline-flex items-center gap-0.5 text-[10px] font-semibold",
                      item.up ? "text-emerald-600" : "text-rose-500",
                    )}
                  >
                    {item.up ? (
                      <ArrowUpRight className="size-3" />
                    ) : (
                      <ArrowDownRight className="size-3" />
                    )}
                    {item.delta}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-2.5 sm:grid-cols-5">
              <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:col-span-3">
                <p className="text-[11px] font-semibold text-navy">Sentiment trend</p>
                <svg viewBox="0 0 240 80" className="mt-2 h-16 w-full" aria-hidden>
                  <path
                    d="M4 52 C 30 48, 50 40, 70 36 S 110 42, 130 28 S 170 22, 200 18 S 230 26, 236 22"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="2"
                  />
                  <path
                    d="M4 58 C 40 56, 80 54, 120 50 S 180 52, 236 46"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M4 64 C 50 62, 90 58, 130 54 S 190 50, 236 48"
                    fill="none"
                    stroke="#F43F5E"
                    strokeWidth="1.6"
                  />
                </svg>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:col-span-2">
                <p className="text-[11px] font-semibold text-navy">Top themes</p>
                <ul className="mt-2 space-y-2">
                  {THEMES.map((theme) => (
                    <li key={theme.name}>
                      <div className="mb-0.5 flex items-center justify-between text-[10px]">
                        <span className="text-slate-600">{theme.name}</span>
                        <span className="font-semibold text-navy">{theme.value}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100">
                        <div
                          className="h-1.5 rounded-full bg-[#494AFD]"
                          style={{ width: theme.width }}
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

      <div className="absolute left-1/2 top-3 z-20 hidden -translate-x-1/2 items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-[0_14px_36px_rgba(15,23,42,0.12)] sm:flex">
        <Sparkles className="size-3.5 text-[#494AFD]" />
        <div>
          <p className="text-[11px] font-medium text-navy">
            AI is analyzing 1,248 feedback items…
          </p>
          <div className="mt-1 h-1.5 w-40 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-[#494AFD] to-[#8E94F8]" />
          </div>
        </div>
        <span className="text-[10px] font-semibold text-[#494AFD]">78%</span>
      </div>

      <div className="absolute -right-1 top-8 z-20 hidden sm:block">
        <div className="relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#494AFD] to-[#7B7DFD] text-white shadow-[0_16px_40px_rgba(73,74,253,0.4)]">
          <Cpu className="size-6" />
        </div>
        <p
          className={`${hand.className} absolute -right-2 top-[62px] w-[110px] rotate-[8deg] text-[18px] font-semibold leading-tight text-[#494AFD]`}
        >
          From feedback to insights.
        </p>
      </div>

      <div className="absolute -bottom-3 left-2 right-2 z-20 grid gap-2 sm:grid-cols-3">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/95 p-3 shadow-sm">
          <p className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
            <ArrowUpRight className="size-3.5" />
            Growing opportunity
          </p>
          <p className="mt-1 text-[18px] font-bold text-emerald-700">+42%</p>
        </div>
        <div className="rounded-xl border border-rose-100 bg-rose-50/95 p-3 shadow-sm">
          <p className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-700">
            <ArrowDownRight className="size-3.5" />
            Potential risk
          </p>
          <p className="mt-1 text-[18px] font-bold text-rose-700">+28%</p>
        </div>
        <div className="rounded-xl border border-[#C7CBFF] bg-[#EEF0FF]/95 p-3 shadow-sm">
          <p className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#494AFD]">
            <Lightbulb className="size-3.5" />
            Key insight
          </p>
          <p className="mt-1 text-[11px] leading-snug text-navy">
            Faster onboarding drives satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
}
