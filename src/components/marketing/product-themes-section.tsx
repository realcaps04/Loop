import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Layers3,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { BrandWord } from "@/components/brand/brand-word";
import { LoopMark } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

const FEATURES = [
  {
    title: "Automatic clustering",
    copy: "Group thousands of feedback items into meaningful themes.",
    Icon: Layers3,
    tint: "bg-violet-100 text-violet-700",
  },
  {
    title: "Trend detection",
    copy: "Identify rising and declining topics in real time.",
    Icon: TrendingUp,
    tint: "bg-sky-100 text-sky-700",
  },
  {
    title: "Early signals",
    copy: "Catch emerging issues and opportunities before they scale.",
    Icon: Bell,
    tint: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Action-ready insights",
    copy: "See what to prioritize with clear, AI-powered summaries.",
    Icon: Sparkles,
    tint: "bg-amber-100 text-amber-700",
  },
];

const STATS = [
  { label: "Key themes", value: "12", delta: "+33%", up: true },
  { label: "Rising themes", value: "5", delta: "+67%", up: true },
  { label: "Declining themes", value: "3", delta: "-25%", up: false },
  { label: "Total feedback", value: "1,248", delta: "+18%", up: true },
];

const TOP_THEMES = [
  { name: "Onboarding", count: "342", delta: "+61%", up: true },
  { name: "Performance", count: "286", delta: "+48%", up: true },
  { name: "Integrations", count: "198", delta: "+42%", up: true },
  { name: "Mobile App", count: "164", delta: "+38%", up: true },
  { name: "Pricing", count: "142", delta: "-12%", up: false },
];

const NAV: { label: string; active?: boolean; badge?: string }[] = [
  { label: "Overview" },
  { label: "Inbox", badge: "248" },
  { label: "Themes", active: true },
  { label: "Trends" },
  { label: "Ask LOOP" },
  { label: "Reports" },
];

export function ProductThemesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F6FF] via-white to-white py-24">
      <div className="pointer-events-none absolute -left-16 top-24 h-72 w-72 rounded-full bg-[#EEF0FF] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#E0F2FE]/60 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
            Themes & Trends
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl sm:leading-[1.15]">
            Spot what matters, before it&apos;s{" "}
            <span className="text-[#494AFD]">a problem.</span>
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
            <BrandWord /> automatically groups similar feedback, identifies
            emerging trends, and highlights what&apos;s gaining (or losing)
            attention — so you can stay ahead and make proactive decisions.
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
            href="/trends"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-9 rounded-xl bg-[#494AFD] hover:bg-[#3B3CE8]",
            )}
          >
            Explore Themes & Trends
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="relative lg:col-span-7">
          <ThemesPreview />
        </div>
      </div>
    </section>
  );
}

function ThemesPreview() {
  return (
    <div className="relative mx-auto min-h-[560px] w-full max-w-[640px] pb-16">
      <div className="overflow-hidden rounded-2xl border border-white bg-white shadow-[0_28px_70px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70">
        <div className="flex min-h-[440px]">
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
                  Themes & Trends
                </p>
                <p className="text-[11px] text-slate-500">
                  Search themes, feedback or ask a question…
                </p>
              </div>
              <span className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-500">
                Last 30 days
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm"
                >
                  <p className="text-[9px] font-medium text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-0.5 text-[16px] font-bold text-navy">
                    {stat.value}
                  </p>
                  <p
                    className={cn(
                      "mt-0.5 inline-flex items-center gap-0.5 text-[10px] font-semibold",
                      stat.up ? "text-emerald-600" : "text-rose-500",
                    )}
                  >
                    {stat.up ? (
                      <ArrowUpRight className="size-3" />
                    ) : (
                      <ArrowDownRight className="size-3" />
                    )}
                    {stat.delta}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-2.5 sm:grid-cols-5">
              <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:col-span-3">
                <p className="text-[11px] font-semibold text-navy">Theme trends</p>
                <svg viewBox="0 0 240 84" className="mt-2 h-[72px] w-full" aria-hidden>
                  <path
                    d="M4 60 C 40 56, 70 48, 100 36 S 160 22, 200 18 S 230 28, 236 24"
                    fill="none"
                    stroke="#494AFD"
                    strokeWidth="2"
                  />
                  <path
                    d="M4 66 C 50 62, 90 54, 130 46 S 190 40, 236 34"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M4 50 C 60 52, 110 58, 150 54 S 200 48, 236 52"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M4 70 C 70 68, 120 64, 170 60 S 210 58, 236 56"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="1.5"
                  />
                </svg>
                <div className="mt-1 flex flex-wrap gap-2 text-[9px] text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-[#494AFD]" /> Onboarding
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-sky-400" /> Performance
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-amber-500" /> Pricing
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:col-span-2">
                <p className="text-[11px] font-semibold text-navy">Top themes</p>
                <ul className="mt-2 space-y-2">
                  {TOP_THEMES.map((theme) => (
                    <li
                      key={theme.name}
                      className="flex items-center justify-between gap-2 text-[10px]"
                    >
                      <span className="font-medium text-slate-700">{theme.name}</span>
                      <span className="tabular-nums text-navy">{theme.count}</span>
                      <span
                        className={cn(
                          "inline-flex items-center font-semibold",
                          theme.up ? "text-emerald-600" : "text-rose-500",
                        )}
                      >
                        {theme.up ? "↑" : "↓"} {theme.delta}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-2 z-20 hidden max-w-[200px] rounded-xl border border-emerald-100 bg-white p-3 shadow-[0_14px_36px_rgba(15,23,42,0.12)] sm:block">
        <p className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
          <ArrowUpRight className="size-3.5" />
          Rising theme
        </p>
        <p className="mt-1 text-[13px] font-semibold text-navy">
          Mobile App Support
        </p>
        <p className="mt-0.5 text-[16px] font-bold text-emerald-600">+142%</p>
      </div>

      <div className="absolute right-0 top-6 z-20 hidden max-w-[190px] rounded-xl border border-rose-100 bg-white p-3 shadow-[0_14px_36px_rgba(15,23,42,0.12)] sm:block">
        <p className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-700">
          <ArrowDownRight className="size-3.5" />
          Declining theme
        </p>
        <p className="mt-1 text-[13px] font-semibold text-navy">Pricing Concerns</p>
        <p className="mt-0.5 text-[16px] font-bold text-rose-500">-25%</p>
      </div>

      <p
        className={`${hand.className} absolute right-2 top-[118px] hidden rotate-[8deg] text-[20px] font-semibold text-[#312E81] sm:block`}
      >
        Catch trends early.
      </p>

      <div className="absolute bottom-0 left-4 z-20 max-w-[300px] rounded-2xl bg-white p-4 shadow-[0_18px_44px_rgba(15,23,42,0.12)]">
        <p className="text-[13px] leading-relaxed text-navy">
          “<BrandWord /> helped us spot a growing onboarding issue before it
          affected churn. Game changer!”
        </p>
        <div className="mt-3 flex items-center gap-2.5">
          <Image
            src="/marketing/avatar-sarah.jpg"
            alt="Sarah Chen"
            width={32}
            height={32}
            className="size-8 rounded-full object-cover"
          />
          <div>
            <p className="text-[12px] font-semibold text-navy">Sarah Chen</p>
            <p className="text-[11px] text-slate-500">
              Head of Product, Acme Inc.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-2 z-20 hidden sm:block">
        <div className="flex items-end gap-1.5">
          <span className="h-6 w-2.5 rounded-sm bg-[#C7CBFF]" />
          <span className="h-10 w-2.5 rounded-sm bg-[#8E94F8]" />
          <span className="h-14 w-2.5 rounded-sm bg-[#494AFD]" />
        </div>
        <p
          className={`${hand.className} mt-1 -rotate-[6deg] text-[18px] font-semibold text-[#494AFD]`}
        >
          From noise to clarity.
        </p>
      </div>
    </div>
  );
}
