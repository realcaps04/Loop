import Image from "next/image";
import Link from "next/link";
import { Globe, Heart, Quote, Smile, Users } from "lucide-react";
import { BrandWord, withBrandWord } from "@/components/brand/brand-word";
import {
  AcmeMark,
  LuminaMark,
  SpiralMark,
  TRUST_LOGOS,
} from "@/components/marketing/logos";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

const QUOTES = [
  {
    quote:
      "LOOP completely changed how we prioritize our roadmap. We finally know what customers actually care about.",
    name: "Emily Carter",
    role: "Product Manager",
    company: "Acme",
    Mark: AcmeMark,
    image: null as string | null,
    initials: "EC",
    tag: "Product",
    quoteTint: "bg-[#EEF0FF] text-[#494AFD]",
    tagTint: "bg-[#EEF0FF] text-[#494AFD]",
  },
  {
    quote:
      "The AI analysis saves our eng team hours every week. Themes and trends just show up — ready to act on.",
    name: "Daniel Park",
    role: "CTO",
    company: "Spiral",
    Mark: SpiralMark,
    image: "/marketing/avatar-marcus.jpg",
    initials: null,
    tag: "Engineering",
    quoteTint: "bg-emerald-50 text-emerald-600",
    tagTint: "bg-emerald-50 text-emerald-700",
  },
  {
    quote:
      "Design and product finally share the same evidence. LOOP makes customer voice impossible to ignore.",
    name: "Sophia Lee",
    role: "Lead Designer",
    company: "Lumina",
    Mark: LuminaMark,
    image: "/marketing/avatar-sarah.jpg",
    initials: null,
    tag: "Design",
    quoteTint: "bg-sky-50 text-sky-600",
    tagTint: "bg-sky-50 text-sky-700",
  },
];

const STATS = [
  {
    value: "10,000+",
    label: "Product teams",
    Icon: Users,
    tint: "bg-violet-100 text-violet-600",
  },
  {
    value: "4.9/5",
    label: "Customer satisfaction",
    Icon: Smile,
    tint: "bg-emerald-100 text-emerald-600",
  },
  {
    value: "50+",
    label: "Countries",
    Icon: Globe,
    tint: "bg-sky-100 text-sky-600",
  },
  {
    value: "1M+",
    label: "Feedback collected",
    Icon: Heart,
    tint: "bg-pink-100 text-pink-600",
  },
];

export function FeaturesSocialSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative mx-auto max-w-3xl text-center">
          <span
            className={cn(
              hand.className,
              "pointer-events-none absolute -left-2 top-8 hidden text-[#7C3AED] sm:block lg:-left-8",
            )}
            aria-hidden
          >
            <span className="block text-lg leading-none">✦</span>
            <span className="ml-2 block text-sm leading-none">✦</span>
            <span className="ml-1 block text-base leading-none">✦</span>
          </span>

          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]/80">
            Customers love <BrandWord />
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl sm:leading-[1.15]">
            Real teams.{" "}
            <span className="text-[#494AFD]">Real results.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink-muted">
            See how product teams around the world use <BrandWord /> to turn
            customer feedback into better products.
          </p>

          <div
            className={cn(
              hand.className,
              "pointer-events-none absolute -right-4 top-0 hidden max-w-[8rem] text-right text-[20px] font-semibold leading-tight text-[#7C3AED] sm:block lg:-right-16",
            )}
          >
            Real feedback. Real impact.
            <svg
              className="ml-auto mt-1 h-8 w-10 text-[#7C3AED]"
              viewBox="0 0 40 32"
              fill="none"
              aria-hidden
            >
              <path
                d="M20 2C18 10 16 18 14 28"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray="3 4"
              />
              <path
                d="M10 22L14 28L20 24"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {QUOTES.map((item) => (
            <article
              key={item.name}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.07)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={cn(
                    "inline-flex size-9 items-center justify-center rounded-full",
                    item.quoteTint,
                  )}
                >
                  <Quote className="size-4 fill-current" strokeWidth={0} />
                </span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                    item.tagTint,
                  )}
                >
                  {item.tag}
                </span>
              </div>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-600">
                “{withBrandWord(item.quote)}”
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="size-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#494AFD] to-[#7C3AED] text-xs font-semibold text-white">
                    {item.initials}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-navy">{item.name}</p>
                  <p className="truncate text-xs text-ink-muted">
                    {item.role}, {item.company}
                  </p>
                </div>
                <item.Mark className="size-6 shrink-0 text-slate-700" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-[#F4F5F9] px-4 py-6 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "flex items-center gap-3 lg:justify-center lg:px-4",
                  index > 0 && "lg:border-l lg:border-slate-200/80",
                )}
              >
                <span
                  className={cn(
                    "inline-flex size-11 shrink-0 items-center justify-center rounded-xl",
                    stat.tint,
                  )}
                >
                  <stat.Icon className="size-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="font-display text-xl font-bold tracking-tight text-navy sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="text-sm text-ink-muted">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Trusted by innovative companies worldwide
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

        <div className="relative mt-14 flex flex-col items-center">
          <p
            className={cn(
              hand.className,
              "mb-4 hidden text-[20px] font-semibold text-[#7C3AED] sm:absolute sm:left-0 sm:top-1/2 sm:mb-0 sm:block sm:-translate-y-1/2 sm:text-left",
            )}
          >
            Loved by product teams globally.
            <svg
              className="mt-1 h-8 w-14 text-[#7C3AED]"
              viewBox="0 0 56 32"
              fill="none"
              aria-hidden
            >
              <path
                d="M4 8C16 12 32 16 48 20"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray="3 4"
              />
              <path
                d="M40 14L48 20L42 26"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>

          <Link
            href="/signup"
            className={cn(
              buttonVariants({ size: "xl" }),
              "rounded-full bg-[#494AFD] px-8 text-white shadow-[0_12px_30px_rgba(73,74,253,0.3)] hover:bg-[#3839d4]",
            )}
          >
            Join thousands of teams →
          </Link>
          <p className="mt-3 text-[13px] text-slate-500">
            No credit card required · 14-day free trial
          </p>
        </div>
      </div>
    </section>
  );
}
