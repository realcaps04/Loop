import type { ReactNode } from "react";
import {
  Bell,
  Frown,
  Headphones,
  Meh,
  MessageSquare,
  MoreHorizontal,
  Puzzle,
  Rocket,
  Smile,
  Sparkles,
  Tag,
  Users,
  Zap,
} from "lucide-react";
import {
  IntercomMark,
  SlackMark,
  TeamsMark,
  ZendeskMark,
  ZapierMark,
} from "@/components/marketing/logos";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

export function FeaturesShowcaseSection() {
  return (
    <section id="all-features" className="scroll-mt-20 bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl sm:leading-[1.15]">
            Everything your product team{" "}
            <span className="text-[#494AFD]">needs.</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
            Six surfaces that turn scattered customer feedback into clarity your
            whole team can act on.
          </p>
        </div>

        <div className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Feedback Collection"
            copy="Capture reactions and comments from every channel your customers use."
            Icon={MessageSquare}
            tint="bg-violet-100 text-violet-600"
            wash="bg-[#F5F3FF]"
          >
            <div className="relative rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
              <span
                className={cn(
                  hand.className,
                  "absolute -right-1 -top-3 text-[#7C3AED]",
                )}
                aria-hidden
              >
                ✦
              </span>
              <div className="flex justify-between gap-1">
                {[
                  { Face: Smile, color: "text-emerald-500 bg-emerald-50" },
                  { Face: Smile, color: "text-lime-500 bg-lime-50" },
                  { Face: Meh, color: "text-amber-500 bg-amber-50" },
                  { Face: Frown, color: "text-orange-500 bg-orange-50" },
                  { Face: Frown, color: "text-rose-500 bg-rose-50" },
                ].map(({ Face, color }, i) => (
                  <span
                    key={i}
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full",
                      color,
                      i === 0 && "ring-2 ring-[#494AFD] ring-offset-1",
                    )}
                  >
                    <Face className="size-4" />
                  </span>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <div className="flex-1 rounded-lg border border-slate-200 px-2.5 py-2 text-[11px] text-slate-400">
                  Tell us more...
                </div>
                <button
                  type="button"
                  className="rounded-lg bg-[#494AFD] px-3 text-[11px] font-semibold text-white"
                >
                  Send
                </button>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard
            title="AI-Powered Analysis"
            copy="Detect sentiment and surface what matters — with evidence attached."
            Icon={Zap}
            tint="bg-emerald-100 text-emerald-600"
            wash="bg-[#ECFDF5]"
            badge="✨ AI Insights"
          >
            <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
              <p className="text-[11px] font-semibold text-navy">
                Sentiment Analysis
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="relative size-[72px] shrink-0">
                  <div
                    className="size-full rounded-full"
                    style={{
                      background:
                        "conic-gradient(#22C55E 0 62%, #60A5FA 62% 86%, #F472B6 86% 100%)",
                    }}
                  />
                  <div className="absolute inset-[16%] flex flex-col items-center justify-center rounded-full bg-white text-center">
                    <span className="text-[13px] font-bold text-navy">62%</span>
                    <span className="text-[8px] text-slate-500">Positive</span>
                  </div>
                </div>
                <ul className="min-w-0 flex-1 space-y-1.5 text-[11px]">
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    Positive
                    <span className="ml-auto font-semibold text-navy">62%</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="size-2 rounded-full bg-sky-400" />
                    Neutral
                    <span className="ml-auto font-semibold text-navy">24%</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="size-2 rounded-full bg-pink-400" />
                    Negative
                    <span className="ml-auto font-semibold text-navy">14%</span>
                  </li>
                </ul>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard
            title="Smart Themes"
            copy="Cluster thousands of comments into themes ranked by volume and heat."
            Icon={Tag}
            tint="bg-sky-100 text-sky-600"
            wash="bg-[#EFF6FF]"
            link="View all →"
          >
            <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
              <p className="text-[11px] font-semibold text-navy">Top themes</p>
              <ul className="mt-2.5 space-y-2">
                {[
                  { name: "Onboarding", count: 342, pct: 92, Icon: Rocket },
                  { name: "Performance", count: 286, pct: 78, Icon: Zap },
                  { name: "Pricing", count: 198, pct: 54, Icon: Tag },
                  { name: "Support", count: 164, pct: 44, Icon: Headphones },
                ].map(({ name, count, pct, Icon: RowIcon }) => (
                  <li key={name}>
                    <div className="flex items-center gap-2 text-[11px]">
                      <RowIcon className="size-3 text-sky-500" />
                      <span className="font-medium text-navy">{name}</span>
                      <span className="ml-auto tabular-nums text-slate-500">
                        {count}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-sky-400"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </FeatureCard>

          <FeatureCard
            title="Team Collaboration"
            copy="Discuss insights, assign owners, and keep product and support aligned."
            Icon={Users}
            tint="bg-amber-100 text-amber-600"
            wash="bg-[#FFFBEB]"
          >
            <div className="space-y-2.5 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
              {[
                {
                  initials: "JD",
                  name: "Jane Doe",
                  time: "2h ago",
                  text: "This is a great suggestion. Let's prioritize this for the next sprint.",
                  color: "bg-[#494AFD]",
                },
                {
                  initials: "MG",
                  name: "Mike Green",
                  time: "4h ago",
                  text: "I'm seeing this feedback come up often. Adding to our roadmap.",
                  color: "bg-emerald-500",
                },
              ].map((msg) => (
                <div key={msg.name} className="flex gap-2">
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white",
                      msg.color,
                    )}
                  >
                    {msg.initials}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <p className="text-[11px] font-semibold text-navy">
                        {msg.name}
                      </p>
                      <p className="text-[9px] text-slate-400">{msg.time}</p>
                    </div>
                    <p className="mt-0.5 text-[11px] leading-snug text-slate-600">
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FeatureCard>

          <FeatureCard
            title="Custom Notifications"
            copy="Get alerted when themes spike, sentiment shifts, or new feedback lands."
            Icon={Bell}
            tint="bg-rose-100 text-rose-600"
            wash="bg-[#FFF1F2]"
          >
            <div className="space-y-2 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
              {[
                {
                  label: "New feedback received",
                  time: "2m ago",
                  Icon: MessageSquare,
                  tint: "bg-violet-50 text-violet-600",
                },
                {
                  label: "Trending theme detected",
                  time: "1h ago",
                  Icon: Sparkles,
                  tint: "bg-sky-50 text-sky-600",
                },
                {
                  label: "Negative feedback spike",
                  time: "3h ago",
                  Icon: Zap,
                  tint: "bg-rose-50 text-rose-600",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 rounded-lg bg-slate-50/80 px-2 py-2"
                >
                  <span
                    className={cn(
                      "inline-flex size-7 shrink-0 items-center justify-center rounded-lg",
                      item.tint,
                    )}
                  >
                    <item.Icon className="size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-semibold text-navy">
                      {item.label}
                    </p>
                    <p className="text-[9px] text-slate-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </FeatureCard>

          <FeatureCard
            title="Integrations"
            copy="Connect the tools your team already lives in — Slack, Zendesk, and more."
            Icon={Puzzle}
            tint="bg-indigo-100 text-indigo-600"
            wash="bg-[#EEF0FF]"
          >
            <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
              <div className="grid grid-cols-4 gap-2">
                {[
                  { Mark: SlackMark, label: "Slack" },
                  { Mark: ZendeskMark, label: "Zendesk" },
                  { Mark: IntercomMark, label: "Intercom" },
                  { Mark: TeamsMark, label: "Teams" },
                  { Mark: ZapierMark, label: "Zapier" },
                  {
                    Mark: null,
                    label: "Notion",
                    fallback: "N",
                    color: "bg-slate-900 text-white",
                  },
                  {
                    Mark: null,
                    label: "Jira",
                    fallback: "J",
                    color: "bg-sky-600 text-white",
                  },
                  {
                    Mark: null,
                    label: "More",
                    fallback: null,
                    color: "bg-slate-100 text-slate-500",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex aspect-square items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-100"
                    title={item.label}
                  >
                    {item.Mark ? (
                      <item.Mark className="size-5" />
                    ) : item.fallback ? (
                      <span
                        className={cn(
                          "flex size-7 items-center justify-center rounded-lg text-[11px] font-bold",
                          item.color,
                        )}
                      >
                        {item.fallback}
                      </span>
                    ) : (
                      <MoreHorizontal className="size-4 text-slate-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FeatureCard>

          <p
            className={cn(
              hand.className,
              "pointer-events-none absolute -bottom-8 right-2 hidden text-right text-[22px] font-semibold leading-tight text-[#7C3AED] lg:block",
            )}
          >
            Works with your favourite tools.
            <svg
              className="ml-auto mt-1 h-8 w-12 text-[#7C3AED]"
              viewBox="0 0 48 32"
              fill="none"
              aria-hidden
            >
              <path
                d="M40 4C28 10 16 16 8 26"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray="3 4"
              />
              <path
                d="M14 20L8 26L16 28"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  copy,
  Icon,
  tint,
  wash,
  badge,
  link,
  children,
}: {
  title: string;
  copy: string;
  Icon: typeof MessageSquare;
  tint: string;
  wash: string;
  badge?: string;
  link?: string;
  children: ReactNode;
}) {
  return (
    <article
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:p-6",
        wash,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-xl",
            tint,
          )}
        >
          <Icon className="size-5" strokeWidth={2} />
        </span>
        {badge ? (
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#494AFD] shadow-sm ring-1 ring-[#C7CBFF]/60">
            {badge}
          </span>
        ) : null}
        {link ? (
          <span className="text-[12px] font-semibold text-[#494AFD]">{link}</span>
        ) : null}
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-navy">
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{copy}</p>
      <div className="mt-4 flex-1">{children}</div>
    </article>
  );
}
