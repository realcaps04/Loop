import Link from "next/link";
import {
  MoreHorizontal,
  RefreshCw,
  Shield,
  Zap,
} from "lucide-react";
import { BrandWord } from "@/components/brand/brand-word";
import { LoopMark } from "@/components/brand/logo";
import {
  IntercomMark,
  SalesforceMark,
  SlackMark,
  TeamsMark,
  ZendeskMark,
  ZapierMark,
} from "@/components/marketing/logos";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

type HubItem = {
  name: string;
  copy: string;
  Mark?: typeof SlackMark;
  fallback?: string;
  fallbackClass?: string;
  style: string;
};

const HUB: HubItem[] = [
  {
    name: "Slack",
    copy: "Get feedback where you work.",
    Mark: SlackMark,
    style: "left-[8%] top-[6%]",
  },
  {
    name: "Notion",
    copy: "Turn insights into plans.",
    fallback: "N",
    fallbackClass: "bg-slate-900 text-white",
    style: "right-[10%] top-[4%]",
  },
  {
    name: "Figma",
    copy: "Build with real user insights.",
    fallback: "F",
    fallbackClass: "bg-pink-500 text-white",
    style: "right-0 top-[28%]",
  },
  {
    name: "Zendesk",
    copy: "Centralize support feedback.",
    Mark: ZendeskMark,
    style: "right-[4%] top-[54%]",
  },
  {
    name: "Salesforce",
    copy: "Sync feedback with your CRM.",
    Mark: SalesforceMark,
    style: "right-[12%] bottom-[6%]",
  },
  {
    name: "And more",
    copy: "Connect with 100+ tools.",
    style: "left-[42%] bottom-0",
  },
  {
    name: "Teams",
    copy: "Keep everyone in the loop.",
    Mark: TeamsMark,
    style: "left-[8%] bottom-[8%]",
  },
  {
    name: "Jira",
    copy: "Turn feedback into action items.",
    fallback: "J",
    fallbackClass: "bg-sky-600 text-white",
    style: "left-0 top-[54%]",
  },
  {
    name: "Google Drive",
    copy: "Keep research and reports in sync.",
    fallback: "G",
    fallbackClass: "bg-emerald-600 text-white",
    style: "left-0 top-[28%]",
  },
  {
    name: "Intercom",
    copy: "Capture customer conversations.",
    Mark: IntercomMark,
    style: "left-[38%] top-0",
  },
];

const BENEFITS = [
  {
    title: "Quick setup",
    copy: "Connect in minutes with secure OAuth.",
    Icon: Zap,
    wash: "bg-[#F5F3FF]",
    tint: "bg-violet-100 text-violet-600",
  },
  {
    title: "Enterprise-grade security",
    copy: "Your data stays protected at every step.",
    Icon: Shield,
    wash: "bg-[#ECFDF5]",
    tint: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Always in sync",
    copy: "Keep feedback flowing automatically.",
    Icon: RefreshCw,
    wash: "bg-[#FFF1F2]",
    tint: "bg-rose-100 text-rose-500",
  },
];

const ROW_MARKS = [
  { name: "Slack", Mark: SlackMark },
  { name: "Zendesk", Mark: ZendeskMark },
  { name: "Intercom", Mark: IntercomMark },
  { name: "Teams", Mark: TeamsMark },
  { name: "Salesforce", Mark: SalesforceMark },
  { name: "Zapier", Mark: ZapierMark },
];

export function SolutionsIntegrationsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute -left-16 top-24 h-72 w-72 rounded-full bg-[#EEF0FF] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-[#F3E8FF]/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
              Integrations
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl sm:leading-[1.15]">
              Works with the tools your team{" "}
              <span className="text-[#494AFD]">already loves.</span>
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
              Connect <BrandWord /> with your favorite tools and bring all your
              customer feedback into one place. No disruption to your workflow —
              just more value from the tools you already use.
            </p>
          </div>

          <div className="relative lg:col-span-7">
            <p
              className={cn(
                hand.className,
                "absolute -top-1 right-0 z-20 max-w-[10rem] text-right text-[20px] font-semibold leading-tight text-[#7C3AED] sm:right-4",
              )}
            >
              Seamless integrations. A more connected team.
            </p>

            <div className="relative mx-auto mt-8 aspect-square max-w-[480px] sm:mt-4">
              {/* dashed spokes */}
              <svg
                className="pointer-events-none absolute inset-[18%] text-slate-200"
                viewBox="0 0 100 100"
                aria-hidden
              >
                {Array.from({ length: 10 }).map((_, i) => {
                  const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
                  const x2 = 50 + Math.cos(angle) * 48;
                  const y2 = 50 + Math.sin(angle) * 48;
                  return (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={x2}
                      y2={y2}
                      stroke="currentColor"
                      strokeWidth="0.6"
                      strokeDasharray="2 2"
                    />
                  );
                })}
              </svg>

              <div className="absolute left-1/2 top-1/2 z-10 flex w-[120px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-2xl bg-white p-4 shadow-[0_16px_40px_rgba(73,74,253,0.18)] ring-1 ring-[#C7CBFF]/60 sm:w-[140px]">
                <LoopMark className="size-10" />
                <BrandWord className="mt-2 text-sm" />
              </div>

              {HUB.map((item) => (
                <div
                  key={item.name}
                  className={cn(
                    "absolute z-10 flex w-[108px] items-center gap-2 rounded-xl bg-white p-2 shadow-[0_10px_28px_rgba(15,23,42,0.1)] ring-1 ring-slate-100 sm:w-[120px]",
                    item.style,
                  )}
                >
                  {item.Mark ? (
                    <item.Mark className="size-6 shrink-0" />
                  ) : item.fallback ? (
                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold",
                        item.fallbackClass,
                      )}
                    >
                      {item.fallback}
                    </span>
                  ) : (
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-400">
                      <MoreHorizontal className="size-3.5" />
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-semibold text-navy">
                      {item.name}
                    </p>
                    <p className="truncate text-[9px] text-slate-500">
                      {item.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {BENEFITS.map(({ title, copy, Icon, wash, tint }) => (
            <article
              key={title}
              className={cn("rounded-2xl p-5 sm:p-6", wash)}
            >
              <span
                className={cn(
                  "inline-flex size-11 items-center justify-center rounded-full",
                  tint,
                )}
              >
                <Icon className="size-5" strokeWidth={2} />
              </span>
              <h3 className="mt-4 font-display text-[16px] font-semibold text-navy">
                {title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                {copy}
              </p>
            </article>
          ))}
        </div>

        <div className="relative mt-16 rounded-3xl border border-slate-200 bg-[#F8F9FC] p-6 sm:p-8 lg:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
                100+ integrations
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-navy sm:text-[28px]">
                More connections. Greater possibilities.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                From project management to CRM, <BrandWord /> fits right into
                your ecosystem.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                  {ROW_MARKS.map(({ name, Mark }) => (
                    <span
                      key={name}
                      className="inline-flex size-11 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-100"
                      title={name}
                    >
                      <Mark className="size-6" />
                    </span>
                  ))}
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-slate-50 text-slate-400 ring-1 ring-slate-100">
                    <MoreHorizontal className="size-5" />
                  </span>
                </div>
                <p className="mt-4 text-center text-[13px] text-slate-500">
                  And 100+ more integrations
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center">
            <Link
              href="/resources"
              className={cn(
                buttonVariants({ size: "xl" }),
                "rounded-full bg-gradient-to-r from-[#494AFD] to-[#7C3AED] px-8 text-white shadow-[0_12px_30px_rgba(73,74,253,0.3)] hover:brightness-105",
              )}
            >
              Explore integrations →
            </Link>
            <p
              className={cn(
                hand.className,
                "mt-4 text-[20px] font-semibold text-[#7C3AED]",
              )}
            >
              Plug in. Power up. Do more together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
