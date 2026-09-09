import Image from "next/image";
import Link from "next/link";
import { BarChart3, Heart, Quote, Zap } from "lucide-react";
import { BrandWord, withBrandWord } from "@/components/brand/brand-word";
import { TRUST_LOGOS } from "@/components/marketing/logos";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

const STORIES: {
  quote: string;
  name: string;
  role: string;
  image?: string;
  initials?: string;
  quoteTint: string;
  statTint: string;
  StatIcon: typeof BarChart3;
  metric: string;
  metricLabel: string;
}[] = [
  {
    quote:
      "LOOP helped us bring clarity to thousands of customer conversations. It's now a core part of our product process.",
    name: "Sarah Chen",
    role: "Head of Product, Acme Inc.",
    image: "/marketing/avatar-sarah.jpg",
    quoteTint: "bg-[#EEF0FF] text-[#494AFD]",
    statTint: "bg-[#EEF0FF] text-[#494AFD]",
    StatIcon: BarChart3,
    metric: "+42%",
    metricLabel: "Faster decision making",
  },
  {
    quote:
      "The automatic theming and sentiment analysis saves us hours every week. We can finally focus on building, not sorting feedback.",
    name: "Marcus Lee",
    role: "Product Manager, NovaTech",
    image: "/marketing/avatar-marcus.jpg",
    quoteTint: "bg-emerald-50 text-emerald-600",
    statTint: "bg-emerald-50 text-emerald-700",
    StatIcon: Zap,
    metric: "10+ hours",
    metricLabel: "Saved per week",
  },
  {
    quote:
      "LOOP gives our entire team a single source of truth. From support to product, everyone is aligned and customer-focused.",
    name: "Emily Carter",
    role: "Director of Product, Brightly",
    initials: "EC",
    quoteTint: "bg-pink-50 text-pink-500",
    statTint: "bg-pink-50 text-pink-600",
    StatIcon: Heart,
    metric: "4.9/5",
    metricLabel: "Customer satisfaction",
  },
];

export function ProductStoriesSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]/80">
            Customer Stories
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl sm:leading-[1.15]">
            Loved by product teams{" "}
            <span className="text-[#7C3AED]">around the world.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted sm:text-base">
            See how modern teams use <BrandWord /> to turn customer feedback into
            meaningful progress.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STORIES.map((story) => (
            <article
              key={story.name}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.07)]"
            >
              <div
                className={cn(
                  "inline-flex size-9 items-center justify-center rounded-full",
                  story.quoteTint,
                )}
              >
                <Quote className="size-4 fill-current" strokeWidth={0} />
              </div>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-600">
                “{withBrandWord(story.quote)}”
              </p>
              <div className="mt-5 flex items-center gap-3">
                {story.image ? (
                  <Image
                    src={story.image}
                    alt={story.name}
                    width={44}
                    height={44}
                    className="size-11 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-sm font-semibold text-white">
                    {story.initials}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-navy">{story.name}</p>
                  <p className="text-xs text-ink-muted">{story.role}</p>
                </div>
              </div>
              <div
                className={cn(
                  "mt-5 flex items-center gap-2.5 rounded-xl px-3.5 py-3",
                  story.statTint,
                )}
              >
                <story.StatIcon className="size-4 shrink-0" strokeWidth={2.2} />
                <p className="text-sm">
                  <span className="font-bold">{story.metric}</span>{" "}
                  <span className="font-medium opacity-80">{story.metricLabel}</span>
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#494AFD]/70">
            Trusted by innovative teams
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

        <div className="relative mt-16 rounded-3xl bg-gradient-to-r from-[#EEF0FF] via-[#F3F0FF] to-[#F8F5FF] px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-lg">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
                Join thousands of teams
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-navy sm:text-[28px]">
                Turn feedback into{" "}
                <span className="text-[#7C3AED]">what&apos;s next.</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-[15px]">
                Get started with <BrandWord /> today and build better experiences,
                faster.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex flex-col items-start gap-2 sm:items-end">
                <Link
                  href="/signup"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full bg-[#494AFD] px-7 text-white shadow-[0_12px_28px_rgba(73,74,253,0.35)] hover:bg-[#3839d4]",
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
                    "max-w-[8.5rem] text-[20px] font-semibold leading-tight text-[#7C3AED]",
                  )}
                >
                  Better products start here.
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
