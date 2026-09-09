"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Headphones,
  MessageCircle,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { BrandWord, withBrandWord } from "@/components/brand/brand-word";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

const FAQS = [
  {
    q: "What is LOOP?",
    a: "LOOP is an AI-powered customer feedback platform that helps product teams collect, analyze, and act on feedback from multiple channels — all in one place.",
    tint: "bg-[#EEF0FF] text-[#494AFD]",
  },
  {
    q: "What feedback sources can I connect?",
    a: "Connect support tickets, surveys, app store reviews, sales notes, Slack, Zendesk, Intercom, and more. LOOP unifies every channel into one inbox.",
    tint: "bg-sky-100 text-sky-700",
  },
  {
    q: "Is there a free trial available?",
    a: "Yes. You can start free with no credit card required. Explore themes, Ask LOOP, and reports before you commit to a plan.",
    tint: "bg-emerald-100 text-emerald-700",
  },
  {
    q: "How does the AI analysis work?",
    a: "LOOP reads each piece of feedback, detects sentiment and themes, and writes a clear rationale — always linked back to the original customer quote.",
    tint: "bg-pink-100 text-pink-600",
  },
  {
    q: "Can I share insights with my team?",
    a: "Absolutely. Assign owners, share theme summaries, and export Voice-of-Customer reports so product, support, and leadership stay aligned.",
    tint: "bg-amber-100 text-amber-700",
  },
  {
    q: "What kind of support do you offer?",
    a: "You get in-app help plus real human support from our team. We're here for onboarding questions, integrations, and anything in between.",
    tint: "bg-indigo-100 text-indigo-700",
  },
];

export function ProductFaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]/80">
            Frequently Asked Questions
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl sm:leading-[1.15]">
            Got questions?{" "}
            <span className="text-[#7C3AED]">We&apos;ve got answers.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted sm:text-base">
            Everything you need to know about <BrandWord /> — from getting
            started to advanced features.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-3 lg:col-span-6">
            {FAQS.map((item, index) => {
              const isOpen = open === index;
              return (
                <div
                  key={item.q}
                  className="rounded-2xl bg-white shadow-[0_14px_36px_rgba(15,23,42,0.07)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    className="flex w-full items-start gap-3 px-4 py-4 text-left sm:gap-4 sm:px-5"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={cn(
                        "mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold",
                        item.tint,
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 pt-1.5 font-display text-[15px] font-semibold text-navy sm:text-base">
                      {withBrandWord(item.q)}
                    </span>
                    <ChevronDown
                      className={cn(
                        "mt-1.5 size-5 shrink-0 text-slate-400 transition-transform",
                        isOpen && "rotate-180 text-[#494AFD]",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-5 pl-[3.75rem] text-sm leading-relaxed text-ink-muted sm:px-5 sm:pl-[4.25rem]">
                        {withBrandWord(item.a)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <p
                className={cn(
                  hand.className,
                  "absolute -top-1 right-2 z-20 max-w-[8rem] text-right text-[22px] font-semibold leading-tight text-[#7C3AED] sm:right-6",
                )}
              >
                Still have questions?
              </p>
              <svg
                className="absolute right-16 top-10 z-20 h-10 w-12 text-[#7C3AED] sm:right-24"
                viewBox="0 0 48 40"
                fill="none"
                aria-hidden
              >
                <path
                  d="M36 4C24 10 14 18 10 32"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeDasharray="3 4"
                />
                <path
                  d="M16 26L10 32L18 34"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="relative mx-auto aspect-[4/5] max-w-[380px]">
                <div className="absolute inset-x-6 bottom-8 top-16 rounded-[45%_55%_50%_50%/55%_45%_55%_45%] bg-gradient-to-br from-[#E8EAFF] via-[#F3E8FF] to-[#EEF0FF]" />

                <div className="absolute bottom-6 left-1/2 w-[88%] -translate-x-1/2">
                  <div className="relative overflow-hidden rounded-[28px] bg-white/40 shadow-[0_24px_60px_rgba(73,74,253,0.18)]">
                    <Image
                      src="/marketing/avatar-sarah.jpg"
                      alt="LOOP support specialist"
                      width={480}
                      height={560}
                      className="h-[340px] w-full object-cover object-top sm:h-[380px]"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#EEF0FF]/90 to-transparent" />
                  </div>
                </div>

                <div className="absolute left-0 top-24 z-10 flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-[0_12px_32px_rgba(15,23,42,0.12)] sm:-left-2">
                  <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#494AFD]">
                    <MessageCircle className="size-4" />
                  </span>
                  <p className="text-[13px] font-semibold text-navy">
                    We&apos;re here to help!
                  </p>
                </div>

                <div className="absolute right-0 top-36 z-10 flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-[0_12px_32px_rgba(15,23,42,0.12)] sm:-right-1">
                  <span className="inline-flex size-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Zap className="size-4" fill="currentColor" />
                  </span>
                  <p className="text-[13px] font-semibold text-navy">
                    Fast support
                  </p>
                </div>

                <div className="absolute bottom-28 right-0 z-10 flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-[0_12px_32px_rgba(15,23,42,0.12)] sm:-right-1">
                  <span className="inline-flex size-8 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
                    <Users className="size-4" />
                  </span>
                  <p className="text-[13px] font-semibold text-navy">
                    Real humans
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#494AFD]">
                    <Headphones className="size-5" />
                  </span>
                  <p className="text-sm leading-snug text-slate-600">
                    <span className="font-semibold text-navy">Still need help?</span>{" "}
                    Our team is here for you.
                  </p>
                </div>
                <Link
                  href="/resources"
                  className={cn(
                    buttonVariants({ size: "md" }),
                    "shrink-0 rounded-xl bg-gradient-to-r from-[#494AFD] to-[#7C3AED] px-5 text-white hover:from-[#3839d4] hover:to-[#6D28D9]",
                  )}
                >
                  Contact Support →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-16 overflow-hidden rounded-3xl bg-[#494AFD] px-6 py-10 sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="absolute -left-10 top-0 h-40 w-72 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -right-8 bottom-0 h-48 w-80 rounded-full bg-[#A78BFA]/40 blur-3xl" />
            <svg
              className="absolute inset-0 h-full w-full text-white/10"
              preserveAspectRatio="none"
              viewBox="0 0 800 200"
              aria-hidden
            >
              <path
                d="M0 120C120 80 200 160 320 120S520 40 640 100 760 160 800 120V200H0Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex size-9 items-center justify-center rounded-full bg-white/15 text-white">
                <Sparkles className="size-4" />
              </div>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75">
                Ready to get started?
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-[28px] sm:leading-snug">
                Turn customer feedback into real progress.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80 sm:text-[15px]">
                Join thousands of product teams using <BrandWord inverted /> to
                build better experiences.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex flex-col items-start gap-2 sm:items-end">
                <Link
                  href="/signup"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full bg-white px-7 text-navy shadow-lg hover:bg-slate-50",
                  )}
                >
                  Get started free →
                </Link>
                <p className="text-xs text-white/75">No credit card required</p>
              </div>

              <div className="pointer-events-none hidden shrink-0 xl:block">
                <p
                  className={cn(
                    hand.className,
                    "max-w-[8.5rem] text-[20px] font-semibold leading-tight text-white",
                  )}
                >
                  A smarter product starts here.
                </p>
                <svg
                  className="-ml-2 mt-0.5 h-9 w-14 -scale-x-100 text-white/90"
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
