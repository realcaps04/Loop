import Link from "next/link";
import {
  BarChart3,
  Check,
  Frown,
  Meh,
  Play,
  Smile,
  Users,
  Zap,
} from "lucide-react";
import { BrandWord } from "@/components/brand/brand-word";
import { LoopMark } from "@/components/brand/logo";
import { TRUST_LOGOS } from "@/components/marketing/logos";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

const PILLS = [
  {
    title: "Set up in minutes",
    copy: "No complex setup.",
    Icon: Zap,
    tint: "bg-violet-100 text-violet-600",
  },
  {
    title: "Invite your team",
    copy: "Collaborate easily.",
    Icon: Users,
    tint: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Start collecting",
    copy: "Get insights fast.",
    Icon: BarChart3,
    tint: "bg-pink-100 text-pink-600",
  },
];

const TRUST = [
  "No credit card required",
  "14-day free trial",
  "Cancel anytime",
];

const KPIS = [
  {
    label: "Total feedback",
    value: "1,248",
    delta: "+18%",
    up: true,
    Icon: BarChart3,
    tint: "text-[#494AFD] bg-[#EEF0FF]",
  },
  {
    label: "Positive",
    value: "62%",
    delta: "+12%",
    up: true,
    Icon: Smile,
    tint: "text-emerald-600 bg-emerald-50",
  },
  {
    label: "Neutral",
    value: "24%",
    delta: "+5%",
    up: true,
    Icon: Meh,
    tint: "text-sky-600 bg-sky-50",
  },
  {
    label: "Negative",
    value: "14%",
    delta: "-8%",
    up: false,
    Icon: Frown,
    tint: "text-rose-500 bg-rose-50",
  },
];

const BARS = [
  [38, 16, 10],
  [34, 14, 8],
  [46, 18, 12],
  [40, 16, 10],
  [52, 20, 14],
  [44, 18, 11],
  [56, 22, 16],
  [48, 19, 12],
  [60, 24, 18],
  [52, 20, 14],
  [64, 26, 20],
  [56, 22, 15],
];

export function HowHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#EEF0FF] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-[#E0F2FE]/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
            Ready to get started?
          </p>
          <h1 className="mt-3 font-display text-[2.4rem] font-black tracking-tight text-navy sm:text-[3rem] sm:leading-[1.08]">
            Turn <span className="text-[#494AFD]">feedback</span> into{" "}
            <span className="text-[#494AFD]">better products.</span>
          </h1>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-muted">
            Join thousands of product teams who use <BrandWord /> to listen,
            understand, and build what their customers love.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {PILLS.map(({ title, copy, Icon, tint }) => (
              <div
                key={title}
                className="rounded-2xl bg-[#F7F8FC] p-3.5 ring-1 ring-slate-100/80"
              >
                <span
                  className={cn(
                    "inline-flex size-9 items-center justify-center rounded-xl",
                    tint,
                  )}
                >
                  <Icon className="size-4" strokeWidth={2.2} />
                </span>
                <p className="mt-2.5 text-[13px] font-semibold text-navy">
                  {title}
                </p>
                <p className="mt-0.5 text-[12px] text-ink-muted">{copy}</p>
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
              href="/dashboard"
              className="inline-flex h-12 items-center gap-2.5 rounded-full border border-[#C7CBFF] bg-white px-5 text-[15px] font-semibold text-[#494AFD] shadow-sm hover:bg-[#EEF0FF]/50"
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-[#EEF0FF] text-[#494AFD]">
                <Play className="ml-0.5 size-3 fill-current" />
              </span>
              Watch demo
            </Link>
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
            {TRUST.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 text-[13px] text-slate-600"
              >
                <Check className="size-3.5 text-[#494AFD]" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-7">
          <p
            className={cn(
              hand.className,
              "absolute -top-1 right-2 z-30 max-w-[11rem] text-right text-[20px] font-semibold leading-tight text-[#7C3AED] sm:right-8",
            )}
          >
            A smarter way to listen, build, and grow.
          </p>
          <svg
            className="absolute right-28 top-10 z-30 h-9 w-12 text-[#7C3AED] sm:right-40"
            viewBox="0 0 48 36"
            fill="none"
            aria-hidden
          >
            <path
              d="M36 4C26 12 18 20 12 32"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="3 4"
            />
            <path
              d="M18 26L12 32L20 34"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="relative mx-auto max-w-[600px] pt-10">
            <div className="pointer-events-none absolute -inset-4 rounded-[32px] bg-[#494AFD]/10 blur-2xl" />

            {/* Desktop mock */}
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_28px_80px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/70">
              <div className="flex min-h-[340px]">
                <aside className="hidden w-12 shrink-0 bg-[#494AFD] sm:block" />
                <div className="min-w-0 flex-1 bg-[#FAFBFC] p-3.5 sm:p-4">
                  <p className="font-display text-[13px] font-semibold text-navy">
                    Product Insights
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
                    {KPIS.map(({ label, value, delta, up, Icon, tint }) => (
                      <div
                        key={label}
                        className="rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-[9px] font-medium text-slate-500">
                            {label}
                          </p>
                          <span
                            className={cn(
                              "inline-flex size-5 items-center justify-center rounded-md",
                              tint,
                            )}
                          >
                            <Icon className="size-3" />
                          </span>
                        </div>
                        <p className="mt-1 font-display text-[15px] font-bold tabular-nums text-navy">
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
                    <p className="text-[11px] font-semibold text-navy">
                      Feedback volume
                    </p>
                    <div className="mt-3 flex h-[100px] items-end gap-1">
                      {BARS.map(([pos, neu, neg], i) => (
                        <div
                          key={i}
                          className="flex flex-1 flex-col justify-end gap-0.5"
                        >
                          <div
                            className="w-full rounded-sm bg-rose-400/80"
                            style={{ height: `${neg}%` }}
                          />
                          <div
                            className="w-full rounded-sm bg-sky-300"
                            style={{ height: `${neu}%` }}
                          />
                          <div
                            className="w-full rounded-sm bg-[#494AFD]"
                            style={{ height: `${pos}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile mock */}
            <div className="absolute -right-1 bottom-6 z-20 hidden w-[132px] overflow-hidden rounded-[22px] border-[3px] border-slate-800 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.25)] sm:block lg:-right-4 lg:w-[148px]">
              <div className="mx-auto mt-1.5 h-1 w-10 rounded-full bg-slate-800" />
              <div className="p-2.5">
                <p className="text-[9px] font-semibold text-navy">Overview</p>
                <div className="mt-2 rounded-lg bg-[#EEF0FF] p-2">
                  <p className="text-[8px] text-slate-500">Total feedback</p>
                  <p className="font-display text-[14px] font-bold text-navy">
                    1,248
                  </p>
                  <p className="text-[8px] font-semibold text-emerald-600">
                    +18%
                  </p>
                </div>
                <div className="mt-2 flex h-14 items-end gap-0.5">
                  {BARS.slice(0, 8).map(([pos], i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-[#494AFD]/80"
                      style={{ height: `${pos}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating quote */}
            <div className="absolute -left-2 bottom-10 z-20 max-w-[220px] rounded-2xl bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.14)] sm:left-4 lg:-left-6">
              <div className="flex items-start gap-2">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <Smile className="size-4" />
                </span>
                <p className="text-[12px] font-medium leading-snug text-navy">
                  “Great product! This makes our workflow so much easier.”
                </p>
              </div>
            </div>

            <p
              className={cn(
                hand.className,
                "absolute -bottom-8 left-8 text-[18px] font-semibold text-[#7C3AED] sm:left-16",
              )}
            >
              Happier customers. Brighter products.
            </p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-16 sm:px-6">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Trusted by innovative teams worldwide
        </p>
        <div className="mx-auto mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-5 text-slate-700">
          {TRUST_LOGOS.map(({ name, Mark }) => (
            <span
              key={name}
              className="inline-flex items-center gap-2.5 text-[16px] font-bold tracking-tight"
            >
              <Mark className="size-5 text-slate-800" />
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#EEF0FF]/80 to-[#E8EAFF]" />
        <svg
          className="absolute inset-x-0 top-0 h-16 w-full text-[#EEF0FF]"
          viewBox="0 0 1200 64"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 40C200 10 400 60 600 30S1000 0 1200 36V64H0Z"
            fill="currentColor"
          />
        </svg>
        <div className="relative flex flex-col items-center px-4 py-16 text-center sm:py-20">
          <p
            className={cn(
              hand.className,
              "mb-6 self-start text-[18px] font-semibold text-[#7C3AED] sm:absolute sm:left-8 sm:top-12 sm:mb-0 lg:left-16",
            )}
          >
            Feedback today. A brighter tomorrow.
          </p>
          <LoopMark className="size-12" />
          <BrandWord className="mt-3 text-2xl" />
          <p className="mt-2 text-sm font-medium text-slate-500">
            Build what matters.
          </p>
        </div>
      </div>
    </section>
  );
}
