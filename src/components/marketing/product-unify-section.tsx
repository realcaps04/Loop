import Image from "next/image";
import Link from "next/link";
import {
  Database,
  Inbox,
  MoreHorizontal,
  Plus,
  Search,
  Upload,
  Zap,
} from "lucide-react";
import { BrandWord } from "@/components/brand/brand-word";
import { LoopMark } from "@/components/brand/logo";
import {
  IntercomMark,
  SlackMark,
  TeamsMark,
  ZendeskMark,
  ZapierMark,
} from "@/components/marketing/logos";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const FEATURES = [
  {
    title: "Multi-channel collection",
    copy: "Pull feedback from support tickets, interviews, surveys, app stores, social media and more.",
    Icon: Inbox,
    tint: "bg-violet-100 text-violet-700",
  },
  {
    title: "Automatic ingestion",
    copy: "Save time with seamless, real-time collection. No manual work, no missed feedback.",
    Icon: Zap,
    tint: "bg-sky-100 text-sky-700",
  },
  {
    title: "A single source of truth",
    copy: "All your customer feedback organized, searchable and ready for analysis.",
    Icon: Database,
    tint: "bg-emerald-100 text-emerald-700",
  },
];

const ROWS = [
  {
    text: "Loving the product so far, but onboarding could be clearer…",
    channel: "App Store",
    sentiment: "Positive",
    sentimentClass: "bg-emerald-50 text-emerald-700",
    theme: "Onboarding",
    status: "New",
    statusClass: "bg-[#EEF0FF] text-[#494AFD]",
    date: "2h ago",
  },
  {
    text: "App keeps crashing when I export reports on mobile.",
    channel: "Support",
    sentiment: "Negative",
    sentimentClass: "bg-rose-50 text-rose-700",
    theme: "Performance",
    status: "Open",
    statusClass: "bg-amber-50 text-amber-700",
    date: "5h ago",
  },
  {
    text: "Would love Slack notifications for new themes.",
    channel: "NPS",
    sentiment: "Neutral",
    sentimentClass: "bg-slate-100 text-slate-600",
    theme: "Integrations",
    status: "Reviewed",
    statusClass: "bg-violet-50 text-violet-700",
    date: "1d ago",
  },
  {
    text: "Pricing feels high for our team size right now.",
    channel: "Sales Call",
    sentiment: "Negative",
    sentimentClass: "bg-rose-50 text-rose-700",
    theme: "Pricing",
    status: "Actioned",
    statusClass: "bg-emerald-50 text-emerald-700",
    date: "2d ago",
  },
  {
    text: "Setup was smooth after we connected Okta SSO.",
    channel: "Intercom",
    sentiment: "Positive",
    sentimentClass: "bg-emerald-50 text-emerald-700",
    theme: "Onboarding",
    status: "New",
    statusClass: "bg-[#EEF0FF] text-[#494AFD]",
    date: "3d ago",
  },
];

const INTEGRATIONS = [
  { name: "Slack", Mark: SlackMark },
  { name: "Zapier", Mark: ZapierMark },
  { name: "Intercom", Mark: IntercomMark },
  { name: "Teams", Mark: TeamsMark },
  { name: "Zendesk", Mark: ZendeskMark },
];

export function ProductUnifySection() {
  return (
    <section className="relative overflow-hidden bg-[#F7F8FC] pb-28 pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
            All your feedback, in one place
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Connect. Collect. Understand.{" "}
            <span className="text-[#494AFD]">All in one place.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
            Bring in customer feedback from every channel, automatically.{" "}
            <BrandWord /> unifies your feedback so you never miss what matters.
          </p>
        </div>

        <div className="relative mt-14 grid items-start gap-8 lg:grid-cols-12">
          <div className="relative hidden lg:col-span-1 lg:block">
            <div className="absolute left-1/2 top-8 bottom-16 w-px -translate-x-1/2 border-l border-dashed border-slate-300" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              {INTEGRATIONS.map(({ name, Mark }) => (
                <span
                  key={name}
                  title={name}
                  className="flex size-12 items-center justify-center rounded-2xl bg-white shadow-[0_10px_28px_rgba(15,23,42,0.08)] ring-1 ring-slate-100"
                >
                  <Mark className="size-5" />
                </span>
              ))}
              <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-[0_10px_28px_rgba(15,23,42,0.08)] ring-1 ring-slate-100">
                <MoreHorizontal className="size-5" />
              </span>
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <InboxPreview />
            <figure className="absolute -bottom-6 left-4 z-20 max-w-[280px] rounded-2xl bg-white p-4 shadow-[0_18px_44px_rgba(15,23,42,0.12)]">
              <p className="text-[13px] leading-relaxed text-navy">
                “<BrandWord /> helped us bring clarity to thousands of customer
                conversations.”
              </p>
              <figcaption className="mt-3 flex items-center gap-2.5">
                <Image
                  src="/marketing/avatar-sarah.jpg"
                  alt="Sarah Chen"
                  width={32}
                  height={32}
                  className="size-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-[12px] font-semibold text-navy">
                    Sarah Chen
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Head of Product, Acme Inc.
                  </p>
                </div>
              </figcaption>
            </figure>
          </div>

          <div className="lg:col-span-4 lg:pl-2">
            <ul className="space-y-6">
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
              href="/inbox"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 rounded-xl bg-[#494AFD] hover:bg-[#3B3CE8]",
              )}
            >
              Explore Feedback Inbox
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function InboxPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white bg-white shadow-[0_28px_70px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70">
      <div className="flex min-h-[420px]">
        <aside className="hidden w-[132px] shrink-0 border-r border-slate-100 p-3 sm:block">
          <div className="mb-4 flex items-center gap-1.5 px-1">
            <LoopMark className="size-4" />
            <BrandWord className="text-[12px] font-bold" />
          </div>
          <div className="space-y-0.5 text-[10px]">
            {["Overview", "Inbox", "Themes", "Trends", "Ask LOOP", "Reports"].map(
              (item, index) => (
                <p
                  key={item}
                  className={cn(
                    "rounded-md px-2 py-1.5",
                    index === 1
                      ? "bg-[#EEF0FF] font-medium text-[#494AFD]"
                      : "text-slate-500",
                  )}
                >
                  {item === "Ask LOOP" ? (
                    <>
                      Ask <BrandWord />
                    </>
                  ) : (
                    item
                  )}
                </p>
              ),
            )}
          </div>
        </aside>

        <div className="min-w-0 flex-1 bg-[#FAFBFC] p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-[16px] font-semibold text-navy">
                Customer Feedback
              </p>
              <p className="text-[11px] text-slate-500">
                Review, filter and act on customer feedback.
              </p>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] text-[#494AFD]">
                <Upload className="size-3" />
                Import CSV
              </span>
              <span className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#494AFD] px-2.5 text-[11px] font-medium text-white">
                <Plus className="size-3" />
                Add feedback
              </span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Any time", "Channel", "Sentiment", "Theme", "Status"].map(
              (filter) => (
                <span
                  key={filter}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] text-slate-500"
                >
                  {filter}
                </span>
              ),
            )}
            <span className="ml-auto hidden items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-400 sm:inline-flex">
              <Search className="size-3" />
              Search
            </span>
          </div>

          <div className="mt-3 overflow-hidden rounded-xl border border-slate-100 bg-white">
            <div className="grid grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr_0.55fr] gap-2 border-b border-slate-100 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-400">
              <span>Feedback</span>
              <span>Channel</span>
              <span>Sentiment</span>
              <span>Theme</span>
              <span>Status</span>
            </div>
            <ul>
              {ROWS.map((row) => (
                <li
                  key={row.text}
                  className="grid grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr_0.55fr] items-center gap-2 border-b border-slate-50 px-3 py-2.5 last:border-b-0"
                >
                  <p className="truncate text-[11px] text-slate-700">{row.text}</p>
                  <p className="truncate text-[10px] text-slate-500">
                    {row.channel}
                  </p>
                  <span
                    className={cn(
                      "inline-flex w-fit rounded-full px-1.5 py-0.5 text-[9px] font-medium",
                      row.sentimentClass,
                    )}
                  >
                    {row.sentiment}
                  </span>
                  <p className="truncate text-[10px] text-slate-600">{row.theme}</p>
                  <span
                    className={cn(
                      "inline-flex w-fit rounded-full px-1.5 py-0.5 text-[9px] font-medium",
                      row.statusClass,
                    )}
                  >
                    {row.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-2 text-[10px] text-slate-400">
            Showing 1–5 of 248 feedback items
          </p>
        </div>
      </div>
    </div>
  );
}
