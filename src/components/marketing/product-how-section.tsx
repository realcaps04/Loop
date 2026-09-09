import {
  FileText,
  Inbox,
  Layers3,
  Quote,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { BrandWord } from "@/components/brand/brand-word";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

const STAGES = [
  {
    title: "Raw feedback",
    copy: "Tickets, reviews, surveys and notes, in the customer's own words.",
    Icon: Inbox,
    tint: "bg-violet-100 text-violet-600",
  },
  {
    title: "AI understanding",
    copy: "Sentiment, theme and feature area — with a written rationale.",
    Icon: Sparkles,
    tint: "bg-sky-100 text-sky-600",
  },
  {
    title: "Themes",
    copy: "The topics customers keep returning to, ranked by volume and heat.",
    Icon: Layers3,
    tint: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Trends",
    copy: "What accelerated, what cooled, and what just appeared.",
    Icon: TrendingUp,
    tint: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Evidence",
    copy: "Every claim opens the original quote. Nothing invented.",
    Icon: Quote,
    tint: "bg-amber-100 text-amber-700",
  },
  {
    title: "Decisions",
    copy: "Voice-of-Customer reports your leadership can actually use.",
    Icon: FileText,
    tint: "bg-rose-100 text-rose-600",
  },
];

export function ProductHowSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F6FF] via-white to-white py-24">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#EEF0FF] blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-[#F3E8FF]/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]/80">
            How <BrandWord /> works
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl sm:leading-[1.15]">
            From raw feedback to decisions{" "}
            <span className="bg-gradient-to-r from-[#494AFD] to-[#A855F7] bg-clip-text text-transparent">
              your team can trust.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted sm:text-base">
            Six clear steps from messy customer signal to decisions you can
            defend — always backed by the original words.
          </p>
        </div>

        {/* Flow rail */}
        <div className="mx-auto mt-10 hidden max-w-4xl items-center justify-between md:flex">
          {STAGES.map((stage, index) => (
            <div key={stage.title} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <span
                  className={cn(
                    "inline-flex size-10 items-center justify-center rounded-full text-[12px] font-bold shadow-sm",
                    stage.tint,
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="max-w-[5.5rem] text-center text-[11px] font-medium leading-tight text-slate-500">
                  {stage.title}
                </span>
              </div>
              {index < STAGES.length - 1 && (
                <div className="mx-1 mb-6 h-px flex-1 bg-gradient-to-r from-[#C7CBFF] to-[#DDD6FE]" />
              )}
            </div>
          ))}
        </div>

        <p
          className={cn(
            hand.className,
            "mt-6 text-center text-[22px] font-semibold text-[#7C3AED]",
          )}
        >
          Noise → Clarity → Action
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STAGES.map((stage, index) => {
            const { title, copy, Icon, tint } = stage;
            return (
              <article
                key={title}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(15,23,42,0.1)]"
              >
                <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-gradient-to-br from-[#EEF0FF] to-transparent opacity-80 transition group-hover:opacity-100" />
                <div className="relative flex items-start justify-between gap-3">
                  <div
                    className={cn(
                      "inline-flex size-11 items-center justify-center rounded-xl",
                      tint,
                    )}
                  >
                    <Icon className="size-5" strokeWidth={2} />
                  </div>
                  <span
                    className={cn(
                      "inline-flex size-8 items-center justify-center rounded-full text-[11px] font-bold",
                      tint,
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="relative mt-4 font-display text-lg font-semibold tracking-tight text-navy">
                  {title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-ink-muted">
                  {copy}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
