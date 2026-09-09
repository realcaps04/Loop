import Link from "next/link";
import {
  BarChart3,
  Bell,
  Database,
  Lightbulb,
  MessageSquare,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { BrandWord } from "@/components/brand/brand-word";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

const FEATURES = [
  {
    title: "Multi-channel collection",
    copy: "Gather feedback from support tickets, surveys, app stores, social media and more.",
    Icon: MessageSquare,
    tint: "bg-violet-100 text-violet-600",
  },
  {
    title: "Automatic ingestion",
    copy: "Save time with real-time collection. No manual work, no missed feedback.",
    Icon: Database,
    tint: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "AI-powered analysis",
    copy: "Detect sentiment, identify key themes, and surface meaningful insights instantly.",
    Icon: Lightbulb,
    tint: "bg-sky-100 text-sky-600",
  },
  {
    title: "Trends & themes",
    copy: "Spot what's rising, what's declining, and what matters most to your customers.",
    Icon: TrendingUp,
    tint: "bg-rose-100 text-rose-600",
  },
  {
    title: "Team collaboration",
    copy: "Share insights, assign owners, and work together to drive change.",
    Icon: Users,
    tint: "bg-amber-100 text-amber-600",
  },
  {
    title: "Actionable insights",
    copy: "Get clear recommendations and next steps backed by real customer feedback.",
    Icon: Target,
    tint: "bg-pink-100 text-pink-600",
  },
  {
    title: "Smart alerts",
    copy: "Be the first to know about emerging issues or opportunities that need attention.",
    Icon: Bell,
    tint: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Custom reports",
    copy: "Create and share beautiful reports with the insights that matter.",
    Icon: BarChart3,
    tint: "bg-violet-100 text-violet-600",
  },
];

export function ProductFeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]/80">
            Key Features
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl sm:leading-[1.15]">
            Everything you need to turn feedback{" "}
            <span className="bg-gradient-to-r from-[#494AFD] to-[#A855F7] bg-clip-text text-transparent">
              into progress.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted sm:text-base">
            <BrandWord /> combines powerful features and AI to help you collect,
            analyse, and act on customer feedback — all in one place.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ title, copy, Icon, tint }) => (
            <article
              key={title}
              className="rounded-2xl bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.07)]"
            >
              <div
                className={cn(
                  "inline-flex size-11 items-center justify-center rounded-xl",
                  tint,
                )}
              >
                <Icon className="size-5" strokeWidth={2} />
              </div>
              <h3 className="mt-4 font-display text-[17px] font-semibold tracking-tight text-navy">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {copy}
              </p>
              <Link
                href="/signup"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#494AFD] transition hover:text-[#3839d4]"
              >
                Learn more
                <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="relative mt-16 rounded-3xl bg-gradient-to-r from-[#EEF0FF] via-[#F5F3FF] to-[#F8F5FF] px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <h3 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-[28px]">
                Ready to listen smarter?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-[15px]">
                Join hundreds of product teams using <BrandWord /> to build
                better experiences.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex flex-col items-start gap-2 sm:items-end">
                <Link
                  href="/signup"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full bg-gradient-to-r from-[#494AFD] to-[#7C3AED] px-7 text-white shadow-[0_12px_28px_rgba(73,74,253,0.35)] hover:from-[#3839d4] hover:to-[#6D28D9]",
                  )}
                >
                  Get started free →
                </Link>
                <p className="text-xs text-ink-muted">No credit card required</p>
              </div>

              <div className="pointer-events-none hidden shrink-0 xl:block">
                <p
                  className={cn(
                    hand.className,
                    "max-w-[9rem] text-[20px] font-semibold leading-tight text-navy/80",
                  )}
                >
                  Turn feedback into what&apos;s next.
                </p>
                <svg
                  className="-ml-2 mt-0.5 h-9 w-14 -scale-x-100 text-[#7C3AED]"
                  viewBox="0 0 56 36"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M48 6C32 12 16 18 8 28"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeDasharray="3 4"
                  />
                  <path
                    d="M14 22L8 28L16 30"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
