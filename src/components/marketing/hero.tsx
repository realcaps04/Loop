import Link from "next/link";
import { SparkleIcon } from "@/components/marketing/logos";
import { buttonVariants } from "@/components/ui/button";
import { HeroMockup } from "@/components/marketing/hero-mockup";
import { cn } from "@/lib/cn";

export function MarketingHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-8%] h-[420px] w-[420px] rounded-full bg-wash-lavender/80 blur-3xl" />
        <div className="absolute right-[-6%] top-8 h-[480px] w-[480px] rounded-full bg-wash-sky blur-3xl" />
        <div className="absolute bottom-[-80px] left-[28%] h-48 w-[55%] rounded-full bg-indigo-50/80 blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-24">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-[12px] font-medium text-accent ring-1 ring-indigo-100">
            <SparkleIcon className="size-3.5 text-[#494AFD]" />
            AI-Powered Customer Intelligence
          </p>
          <h1 className="mt-5 font-display text-[2.85rem] font-black tracking-tight text-navy sm:text-[3.75rem] sm:leading-[1.06] sm:tracking-[-0.045em]">
            Turn customer feedback into
            <br />
            <span style={{ color: "#494AFD" }}>your next big move.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted">
            LOOP collects customer feedback from support tickets, app store
            reviews, surveys, sales calls and more — uses AI to understand what
            it means, and helps you uncover insights, trends, and opportunities to
            build what your customers actually want.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/signup"
              className={cn(buttonVariants({ size: "xl" }), "rounded-lg")}
            >
              Get Started Free
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="#product"
              className="inline-flex h-11 items-center gap-2.5 rounded-lg border border-indigo-200 bg-white px-5 text-[15px] font-medium text-accent shadow-loop-sm hover:bg-indigo-50/60"
            >
              <span className="relative grid size-8 place-items-center">
                <span className="absolute size-7 rounded-full bg-[#494AFD]/25 animate-play-ping" />
                <span className="absolute size-7 rounded-full bg-[#494AFD]/20 animate-play-ping [animation-delay:1s]" />
                <span className="relative z-[1] flex size-7 items-center justify-center rounded-full bg-[#494AFD] text-white">
                  <svg viewBox="0 0 24 24" className="ml-0.5 size-3.5" aria-hidden>
                    <path
                      fill="currentColor"
                      d="M8.4 6.7c0-.54.58-.88 1.1-.62l8.05 4.7a.72.72 0 0 1 0 1.24l-8.06 4.7c-.51.3-1.09-.04-1.09-.62V6.7Z"
                    />
                  </svg>
                </span>
              </span>
              Watch Demo
            </Link>
          </div>
          <p className="mt-4 text-[12px] text-ink-faint">
            No credit card required | Set up in minutes | Built for teams
          </p>
        </div>
        <div className="relative min-w-0">
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}
