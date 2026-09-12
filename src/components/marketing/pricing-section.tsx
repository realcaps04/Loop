"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Calendar,
  Check,
  CreditCard,
  Headphones,
  Lock,
  Shield,
  Sprout,
  Users,
  Zap,
} from "lucide-react";
import { BrandWord, withBrandWord } from "@/components/brand/brand-word";
import { AcmeMark } from "@/components/marketing/logos";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

type Billing = "monthly" | "yearly";

const PLANS = [
  {
    id: "free",
    name: "Free",
    blurb: "Perfect for getting started.",
    Icon: Sprout,
    tint: "bg-violet-100 text-violet-600",
    check: "text-[#494AFD]",
    priceMonthly: 0,
    priceLabel: { monthly: "forever", yearly: "forever" },
    cta: "Get started free →",
    href: "/signup",
    popular: false,
    solid: false,
    features: [
      "Up to 3 team members",
      "1,000 feedback items / month",
      "Basic analytics",
      "Standard integrations",
      "Email support",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    blurb: "For small, growing teams.",
    Icon: Users,
    tint: "bg-emerald-100 text-emerald-600",
    check: "text-emerald-600",
    priceMonthly: 29,
    priceLabel: { monthly: "/ month", yearly: "/ month" },
    cta: "Start free trial →",
    href: "/signup",
    popular: false,
    solid: false,
    features: [
      "Up to 10 team members",
      "10,000 feedback items / month",
      "Advanced analytics",
      "Custom themes",
      "Priority email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    blurb: "For high-performing teams.",
    Icon: Zap,
    tint: "bg-violet-100 text-violet-600",
    check: "text-[#494AFD]",
    priceMonthly: 79,
    priceLabel: { monthly: "/ month", yearly: "/ month" },
    cta: "Start free trial →",
    href: "/signup",
    popular: true,
    solid: true,
    features: [
      "Up to 50 team members",
      "Unlimited feedback items",
      "AI-powered insights",
      "Advanced integrations",
      "Custom branding",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    blurb: "For large organizations.",
    Icon: Building2,
    tint: "bg-sky-100 text-sky-600",
    check: "text-sky-600",
    priceMonthly: null,
    priceLabel: { monthly: "", yearly: "" },
    cta: "Contact sales →",
    href: "/resources",
    popular: false,
    solid: false,
    features: [
      "Unlimited team members",
      "Unlimited feedback items",
      "Advanced security (SSO, SCIM)",
      "Dedicated success manager",
      "Custom integrations",
      "SLA & compliance support",
    ],
  },
];

const TRUST = [
  { label: "No credit card required", Icon: CreditCard },
  { label: "14-day free trial", Icon: Shield },
  { label: "Upgrade or cancel anytime", Icon: Calendar },
  { label: "Dedicated support", Icon: Headphones },
  { label: "Your data stays secure", Icon: Lock },
];

export function PricingSection() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F6FF] via-white to-white py-16 sm:py-20">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#EEF0FF] blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-40 h-80 w-80 rounded-full bg-[#F3E8FF]/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
            Pricing
          </p>
          <h1 className="mt-3 font-display text-3xl font-black tracking-tight text-navy sm:text-4xl sm:leading-[1.1]">
            Simple pricing for growing teams.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-muted sm:text-base">
            Choose the plan that fits your team. Start free, upgrade anytime,
            and unlock more possibilities with <BrandWord />.
          </p>
        </div>

        <div className="relative mt-8 flex flex-wrap items-center gap-4">
          <div className="inline-flex rounded-full bg-white p-1 shadow-sm ring-1 ring-slate-200">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                billing === "monthly"
                  ? "bg-[#494AFD] text-white"
                  : "text-slate-600 hover:text-navy",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
                billing === "yearly"
                  ? "bg-[#494AFD] text-white"
                  : "text-slate-600 hover:text-navy",
              )}
            >
              Yearly
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-bold",
                  billing === "yearly"
                    ? "bg-white/20 text-white"
                    : "bg-emerald-50 text-emerald-700",
                )}
              >
                Save 20%
              </span>
            </button>
          </div>
          <p
            className={cn(
              hand.className,
              "text-[20px] font-semibold text-[#7C3AED]",
            )}
          >
            Grow at your own pace.
          </p>
        </div>

        <div className="relative mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((plan) => {
            const yearlyPrice =
              plan.priceMonthly === null || plan.priceMonthly === 0
                ? plan.priceMonthly
                : Math.round(plan.priceMonthly * 0.8);
            const displayPrice =
              billing === "yearly" ? yearlyPrice : plan.priceMonthly;

            return (
              <article
                key={plan.id}
                className={cn(
                  "relative flex flex-col rounded-2xl bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.07)]",
                  plan.popular
                    ? "ring-2 ring-[#494AFD]"
                    : "ring-1 ring-slate-200/80",
                )}
              >
                {plan.popular ? (
                  <span className="absolute -top-3 right-5 rounded-full bg-[#494AFD] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Most popular
                  </span>
                ) : null}

                <span
                  className={cn(
                    "inline-flex size-11 items-center justify-center rounded-xl",
                    plan.tint,
                  )}
                >
                  <plan.Icon className="size-5" strokeWidth={2} />
                </span>

                <h2 className="mt-4 font-display text-xl font-bold text-navy">
                  {plan.name}
                </h2>
                <p className="mt-1 text-sm text-ink-muted">{plan.blurb}</p>

                <div className="mt-5">
                  {displayPrice === null ? (
                    <>
                      <p className="font-display text-2xl font-bold text-navy">
                        Custom pricing
                      </p>
                      <p className="mt-1 text-sm text-ink-muted">
                        Tailored to your needs.
                      </p>
                    </>
                  ) : (
                    <p className="flex items-baseline gap-1.5">
                      <span className="font-display text-4xl font-bold tracking-tight text-navy">
                        ${displayPrice}
                      </span>
                      <span className="text-sm text-ink-muted">
                        {plan.priceLabel[billing]}
                      </span>
                    </p>
                  )}
                </div>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <Check
                        className={cn("mt-0.5 size-4 shrink-0", plan.check)}
                        strokeWidth={2.5}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "mt-6 w-full rounded-full",
                    plan.solid
                      ? "bg-[#494AFD] text-white hover:bg-[#3839d4]"
                      : "border border-slate-200 bg-white text-[#494AFD] hover:border-[#C7CBFF] hover:bg-[#EEF0FF]/50",
                  )}
                >
                  {plan.cta}
                </Link>
              </article>
            );
          })}

          <p
            className={cn(
              hand.className,
              "pointer-events-none absolute -bottom-8 right-2 hidden text-right text-[18px] font-semibold text-[#7C3AED] xl:block",
            )}
          >
            More value. A brighter tomorrow.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {TRUST.map(({ label, Icon }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2 text-sm text-slate-600"
            >
              <Icon className="size-4 text-[#494AFD]" strokeWidth={2} />
              {label}
            </div>
          ))}
        </div>

        <div className="relative mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-[#EEF0FF] via-[#F5F3FF] to-[#F8F5FF] px-6 py-8 sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex max-w-sm items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                <Sprout className="size-5" />
              </span>
              <p className="font-display text-lg font-semibold leading-snug text-navy">
                Invest in what matters.{" "}
                <span className="text-[#494AFD]">Build better products.</span>
              </p>
            </div>

            <p className="max-w-md text-[15px] leading-relaxed text-slate-600">
              “{withBrandWord("LOOP has transformed the way we work. Incredible value for the price.")}”
            </p>

            <div className="flex items-center gap-3">
              <Image
                src="/marketing/avatar-sarah.jpg"
                alt="Sarah Kim"
                width={44}
                height={44}
                className="size-11 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-navy">Sarah Kim</p>
                <p className="text-xs text-ink-muted">
                  Product Manager, Acme
                </p>
              </div>
              <AcmeMark className="ml-1 size-5 text-slate-700" />
            </div>
          </div>

          <p
            className={cn(
              hand.className,
              "mt-5 text-[18px] font-semibold text-[#7C3AED] lg:absolute lg:bottom-4 lg:right-8 lg:mt-0",
            )}
          >
            Happier teams. Brighter products.
          </p>
        </div>
      </div>
    </section>
  );
}
