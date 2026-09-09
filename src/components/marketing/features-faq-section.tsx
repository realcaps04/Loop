"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ChevronDown,
  Lightbulb,
  Mail,
  MessageCircle,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { BrandWord, withBrandWord } from "@/components/brand/brand-word";
import { LoopMark } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

const FAQS = [
  {
    q: "What is LOOP?",
    a: "LOOP is an AI-powered customer feedback platform that helps product teams collect, analyze, and act on feedback from multiple channels — all in one place.",
  },
  {
    q: "What feedback sources can I connect?",
    a: "Connect support tickets, surveys, app store reviews, Slack, Zendesk, Intercom, and more. Everything lands in one searchable inbox.",
  },
  {
    q: "Is there a free trial available?",
    a: "Yes. Start free with a 14-day trial — no credit card required. Explore themes, Ask LOOP, and reports before you commit.",
  },
  {
    q: "How does the AI analysis work?",
    a: "LOOP reads each piece of feedback, detects sentiment and themes, and writes a clear rationale — always linked back to the original customer quote.",
  },
  {
    q: "Can I share insights with my team?",
    a: "Absolutely. Assign owners, share theme summaries, and export Voice-of-Customer reports so product, support, and leadership stay aligned.",
  },
  {
    q: "What kind of support do you offer?",
    a: "Live chat, email, and a help center — plus real humans for onboarding, integrations, and anything in between.",
  },
];

const BUBBLES = [
  {
    q: "How do I get started?",
    Icon: Lightbulb,
    tint: "bg-amber-50 text-amber-600",
    className: "left-0 top-8 sm:-left-2",
  },
  {
    q: "Can I connect Slack?",
    Icon: Settings,
    tint: "bg-sky-50 text-sky-600",
    className: "right-0 top-16 sm:-right-2",
  },
  {
    q: "Who is this for?",
    Icon: Users,
    tint: "bg-violet-50 text-violet-600",
    className: "left-2 bottom-36 sm:left-0",
  },
  {
    q: "Is my data secure?",
    Icon: Shield,
    tint: "bg-emerald-50 text-emerald-600",
    className: "right-2 bottom-40 sm:right-0",
  },
];

export function FeaturesFaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl sm:leading-[1.15]">
              Got questions?{" "}
              <span className="text-[#494AFD]">We&apos;ve got answers.</span>
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
              Everything you need to know about <BrandWord /> — from getting
              started to advanced features.
            </p>

            <div className="mt-8 space-y-3">
              {FAQS.map((item, index) => {
                const isOpen = open === index;
                return (
                  <div
                    key={item.q}
                    className="rounded-2xl bg-[#F4F5F9] px-4 py-1 sm:px-5"
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : index)}
                      className="flex w-full items-start gap-3 py-3.5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="mt-0.5 inline-flex h-7 shrink-0 items-center justify-center rounded-lg bg-[#EEF0FF] px-2 text-[11px] font-bold text-[#494AFD]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1 pt-0.5 font-display text-[15px] font-semibold text-navy">
                        {withBrandWord(item.q)}
                      </span>
                      <ChevronDown
                        className={cn(
                          "mt-1 size-5 shrink-0 text-slate-400 transition-transform",
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
                        <p className="pb-4 pl-11 pr-8 text-sm leading-relaxed text-ink-muted">
                          {withBrandWord(item.a)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p
              className={cn(
                hand.className,
                "mt-6 text-[22px] font-semibold leading-tight text-[#7C3AED]",
              )}
            >
              Still have questions? We&apos;re here to help!
              <svg
                className="mt-1 h-8 w-12 text-[#7C3AED]"
                viewBox="0 0 48 32"
                fill="none"
                aria-hidden
              >
                <path
                  d="M12 28C16 18 20 10 24 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeDasharray="3 4"
                />
                <path
                  d="M18 8L24 4L28 10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <p
                className={cn(
                  hand.className,
                  "absolute right-0 top-0 z-20 max-w-[7.5rem] text-right text-[20px] font-semibold leading-tight text-[#7C3AED]",
                )}
              >
                Curious? Let&apos;s chat!
              </p>
              <svg
                className="absolute right-10 top-12 z-20 h-9 w-10 text-[#7C3AED]"
                viewBox="0 0 40 36"
                fill="none"
                aria-hidden
              >
                <path
                  d="M28 2C22 10 18 18 16 30"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeDasharray="3 4"
                />
                <path
                  d="M12 24L16 30L22 26"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="relative mx-auto aspect-square max-w-[380px]">
                <div className="absolute inset-10 rounded-full bg-gradient-to-br from-[#EEF0FF] via-[#E8EAFF] to-[#F3E8FF]" />
                <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-[2rem] bg-gradient-to-b from-[#5B5CFD] to-[#494AFD] shadow-[0_24px_60px_rgba(73,74,253,0.35)]">
                  <LoopMark className="size-16 text-white" />
                  <BrandWord inverted className="mt-3 text-xl" />
                  <p className="mt-1 text-[12px] font-medium text-white/80">
                    Happy to help
                  </p>
                </div>

                <span
                  className={cn(
                    hand.className,
                    "absolute left-1/2 top-6 -translate-x-1/2 text-[#60A5FA]",
                  )}
                  aria-hidden
                >
                  <span className="block text-lg leading-none">✦</span>
                  <span className="ml-3 block text-sm leading-none">✦</span>
                  <span className="ml-1 block text-base leading-none">✦</span>
                </span>

                {BUBBLES.map(({ q, Icon, tint, className }) => (
                  <div
                    key={q}
                    className={cn(
                      "absolute z-10 flex max-w-[160px] items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-[0_12px_32px_rgba(15,23,42,0.12)]",
                      className,
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex size-8 shrink-0 items-center justify-center rounded-xl",
                        tint,
                      )}
                    >
                      <Icon className="size-3.5" strokeWidth={2.2} />
                    </span>
                    <p className="text-[11px] font-semibold leading-snug text-navy">
                      {q}
                    </p>
                  </div>
                ))}
              </div>

              <div className="relative mt-6 rounded-2xl bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.1)] ring-1 ring-slate-100">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#494AFD]">
                  Need more help?
                </p>
                <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-navy">
                  We&apos;re just a message away.
                </h3>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    {
                      label: "Live Chat",
                      Icon: MessageCircle,
                      tint: "bg-violet-100 text-violet-600",
                    },
                    {
                      label: "Email Us",
                      Icon: Mail,
                      tint: "bg-sky-100 text-sky-600",
                    },
                    {
                      label: "Help Center",
                      Icon: BookOpen,
                      tint: "bg-indigo-100 text-indigo-600",
                    },
                  ].map(({ label, Icon, tint }) => (
                    <div key={label} className="text-center">
                      <span
                        className={cn(
                          "mx-auto inline-flex size-10 items-center justify-center rounded-xl",
                          tint,
                        )}
                      >
                        <Icon className="size-[18px]" />
                      </span>
                      <p className="mt-2 text-[12px] font-semibold text-navy">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  href="/resources"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "mt-6 w-full rounded-full bg-gradient-to-r from-[#494AFD] to-[#7C3AED] text-white hover:brightness-105",
                  )}
                >
                  Contact Support →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
