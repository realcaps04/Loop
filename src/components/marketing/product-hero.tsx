import Image from "next/image";
import Link from "next/link";
import { Check, Layers3, Play, Sparkles } from "lucide-react";
import { BrandWord } from "@/components/brand/brand-word";
import { IntercomMark, SlackMark, ZendeskMark } from "@/components/marketing/logos";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const TRUST = [
  "No credit card required",
  "Set up in minutes",
  "Loved by product teams",
];

const STATS = [
  { value: "500+", label: "Product teams" },
  { value: "2M+", label: "Feedback analyzed" },
  { value: "4.9/5", label: "Customer satisfaction" },
];

export function ProductHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F4F5FF] via-white to-white">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#B4B8FF]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-32 h-80 w-80 rounded-full bg-[#C7CBFF]/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-5">
          <p className="text-[13px] text-slate-400">
            <Link href="/" className="hover:text-[#494AFD]">
              Home
            </Link>
            <span className="mx-1.5">›</span>
            <span className="text-slate-600">Product</span>
          </p>

          <p className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#EEF0FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#494AFD] ring-1 ring-[#C7CBFF]">
            <Layers3 className="size-3.5" />
            Product
          </p>

          <h1 className="mt-5 font-display text-[2.6rem] font-black tracking-tight text-navy sm:text-[3.25rem] sm:leading-[1.08]">
            A smarter way to understand{" "}
            <span className="bg-gradient-to-r from-[#494AFD] to-[#7B7DFD] bg-clip-text text-transparent">
              your customers.
            </span>
          </h1>

          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-muted">
            <BrandWord /> brings all your customer feedback together, uses AI to
            find what matters, and helps you turn insights into action — faster
            than ever.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: "xl" }),
                "rounded-xl bg-gradient-to-r from-[#494AFD] to-[#6B72F8] shadow-[0_12px_30px_rgba(73,74,253,0.28)] hover:brightness-105",
              )}
            >
              Get started free
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-12 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-5 text-[15px] font-medium text-navy shadow-sm hover:border-[#C7CBFF] hover:text-[#494AFD]"
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-[#EEF0FF] text-[#494AFD]">
                <Play className="ml-0.5 size-3.5 fill-current" />
              </span>
              Watch demo
            </Link>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
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

          <div className="mt-10 flex flex-wrap gap-8 border-t border-slate-100 pt-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold tracking-tight text-navy">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[13px] text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <ProductHeroVisual />
        </div>
      </div>
    </section>
  );
}

function ProductHeroVisual() {
  return (
    <div className="relative mx-auto min-h-[420px] w-full max-w-[620px] sm:min-h-[520px]">
      <div className="absolute left-1/2 top-10 w-[88%] -translate-x-1/2 sm:top-6">
        <Image
          src="/marketing/loop-laptop-Photoroom.png"
          alt="LOOP product dashboard on a laptop"
          width={900}
          height={700}
          className="h-auto w-full drop-shadow-[0_30px_60px_rgba(15,23,42,0.18)]"
          priority
        />
      </div>

      <div className="absolute left-0 top-0 z-10 hidden w-[200px] rounded-2xl bg-white p-3.5 shadow-[0_18px_40px_rgba(15,23,42,0.12)] sm:block">
        <p className="text-[12px] font-semibold text-navy">
          Feedback from everywhere
        </p>
        <div className="mt-2.5 flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-slate-50 ring-1 ring-slate-100">
            <SlackMark className="size-4" />
          </span>
          <span className="flex size-8 items-center justify-center rounded-full bg-slate-50 ring-1 ring-slate-100">
            <IntercomMark className="size-4" />
          </span>
          <span className="flex size-8 items-center justify-center rounded-full bg-slate-50 ring-1 ring-slate-100">
            <ZendeskMark className="size-4" />
          </span>
          <span className="flex size-8 items-center justify-center rounded-full bg-[#EEF0FF] text-[10px] font-bold text-[#494AFD] ring-1 ring-[#C7CBFF]">
            +12
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 120 60"
        className="pointer-events-none absolute left-[170px] top-[52px] hidden h-12 w-24 text-slate-900 sm:block"
        fill="none"
        aria-hidden
      >
        <path
          d="M8 40 C 36 8, 70 6, 108 18"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="2.5 4.5"
        />
        <path
          d="M96 10 L 112 18 L 98 28"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="absolute right-0 top-2 z-10 hidden w-[210px] rounded-2xl bg-white p-3.5 shadow-[0_18px_40px_rgba(15,23,42,0.12)] sm:block">
        <p className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-navy">
          <Sparkles className="size-3.5 text-[#494AFD]" />
          AI turns feedback into insights
        </p>
        <div className="mt-2.5 space-y-1.5">
          <div className="h-2 w-full rounded-full bg-slate-100" />
          <div className="h-2 w-[78%] rounded-full bg-slate-100" />
          <div className="h-2 w-[58%] rounded-full bg-[#EEF0FF]" />
        </div>
      </div>

      <div className="absolute bottom-[72px] left-2 z-10 hidden max-w-[200px] rounded-2xl bg-white p-3 shadow-[0_18px_40px_rgba(15,23,42,0.12)] sm:block">
        <div className="flex items-start gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#494AFD]">
            <Layers3 className="size-4" />
          </span>
          <p className="text-[12px] font-semibold leading-snug text-navy">
            From feedback to your next big move
          </p>
        </div>
      </div>

      <svg
        viewBox="0 0 100 50"
        className="pointer-events-none absolute bottom-[110px] right-[150px] hidden h-10 w-20 text-[#494AFD] sm:block"
        fill="none"
        aria-hidden
      >
        <path
          d="M10 10 C 30 40, 60 42, 90 28"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="2.5 4.5"
        />
        <path
          d="M78 20 L 94 28 L 80 36"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="absolute bottom-8 right-0 z-10 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 shadow-[0_14px_36px_rgba(15,23,42,0.12)]">
        <span className="flex size-5 items-center justify-center rounded-full bg-[#EEF0FF] text-[#494AFD]">
          <Check className="size-3" strokeWidth={3} />
        </span>
        <p className="text-[12px] font-semibold text-navy">
          Insight <span className="text-[#494AFD]">→</span> Action{" "}
          <span className="text-[#494AFD]">→</span> Impact
        </p>
      </div>
    </div>
  );
}
