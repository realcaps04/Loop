import Link from "next/link";
import {
  BarChart3,
  FileText,
  Inbox,
  Layers3,
  MessageSquareText,
  Shield,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";
import Image from "next/image";
import { TRUST_LOGOS } from "@/components/marketing/logos";
import { AskLoopPreview, ASK_FEATURES } from "@/components/marketing/ask-loop-preview";
import { DashboardPreview } from "@/components/marketing/dashboard-preview";
import { BrandWord } from "@/components/brand/brand-word";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

export function TrustBar() {
  return (
    <section className="relative border-y border-indigo-50 bg-wash-mist py-12">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        Trusted by product-driven teams
      </p>
      <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6 text-slate-800">
        {TRUST_LOGOS.map(({ name, Mark }) => (
          <span
            key={name}
            className="inline-flex items-center gap-3 text-[18px] font-bold tracking-tight"
          >
            <Mark className="size-6 text-slate-900" />
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}

export function ValueGrid() {
  const items = [
    {
      title: "All Your Feedback In One Place",
      copy: "Ingest feedback from support tickets, app store reviews, surveys, sales calls and more.",
      icon: Layers3,
      tint: "bg-violet-100 text-violet-700",
    },
    {
      title: "AI-Powered Analysis",
      copy: "Automatically classify, cluster and analyze feedback using advanced AI.",
      icon: Sparkles,
      tint: "bg-amber-100 text-amber-700",
    },
    {
      title: "Actionable Insights",
      copy: "Discover trends, spot opportunities, and get clear recommendations.",
      icon: BarChart3,
      tint: "bg-sky-100 text-sky-700",
    },
    {
      title: "Build What Matters",
      copy: "Make confident, evidence-backed decisions and close the loop with your customers.",
      icon: Target,
      tint: "bg-emerald-100 text-emerald-700",
    },
  ];

  return (
    <section id="features" className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-wash-mist to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
          Why <BrandWord />
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl text-center font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Everything you need to understand your customers, in one place.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed text-ink-muted">
          From raw feedback to actionable insights — LOOP helps you close the
          loop with AI.
        </p>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={cn(
                  "lg:px-8",
                  index > 0 && "lg:border-l lg:border-slate-200/80",
                )}
              >
                <span
                  className={cn(
                    "inline-flex size-14 items-center justify-center rounded-2xl",
                    item.tint,
                  )}
                >
                  <Icon className="size-7" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-[17px] font-semibold leading-snug text-navy">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-ink-muted">
                  {item.copy}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function WorkflowSection() {
  const steps = [
    {
      n: "01",
      title: "Collect feedback",
      copy: "Import from multiple channels or add manually.",
    },
    {
      n: "02",
      title: "AI understanding",
      copy: "Classify, cluster and analyze automatically.",
    },
    {
      n: "03",
      title: "Discover insights",
      copy: "Explore trends, sentiment and emerging themes.",
    },
    {
      n: "04",
      title: "Take action",
      copy: "Make data-driven decisions and track progress.",
    },
  ];

  return (
    <section id="product" className="relative overflow-hidden bg-[#F5F6FA] py-24">
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-wash-lavender blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-wash-sky blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
            Product Line
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            From feedback to impact — in minutes.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
            LOOP turns scattered customer feedback into clear insights with the
            help of AI. Spend less time sorting, more time building.
          </p>
          <ol className="mt-8 space-y-5">
            {steps.map((step) => (
              <li key={step.n} className="flex gap-3.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#C7CBFF] bg-[#EEF0FF] text-[12px] font-semibold text-[#494AFD]">
                  {step.n}
                </span>
                <div>
                  <p className="font-semibold text-navy">{step.title}</p>
                  <p className="mt-0.5 text-sm text-ink-muted">{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-9 rounded-lg bg-[#494AFD] hover:bg-[#3B3CE8]",
            )}
          >
            See it in action
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="lg:col-span-7">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}

export function AskSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute -left-16 top-20 h-64 w-64 rounded-full bg-[#E0F2FE]/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-[#EEF0FF] blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF0FF] px-3 py-1 text-[12px] font-semibold text-[#494AFD] ring-1 ring-[#C7CBFF]">
            <Sparkles className="size-3.5" />
            Ask <BrandWord />
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl sm:leading-[1.15]">
            Ask <BrandWord /> anything about{" "}
            <span className="text-[#494AFD]">your customers.</span>
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
            Get instant, AI-powered answers from all your customer feedback. No
            complicated queries — just ask, and LOOP finds the insights for you.
          </p>

          <ul className="mt-8 space-y-5">
            {ASK_FEATURES.map(({ title, copy, Icon }) => (
              <li key={title} className="flex gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#494AFD]">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-semibold text-navy">{title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">
                    {copy}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <AskLoopPreview />
        </div>
      </div>
    </section>
  );
}

export function Capabilities() {
  const items = [
    {
      title: "Feedback Inbox",
      copy: "Capture and triage every signal in one place.",
      Icon: Inbox,
      tint: "bg-violet-100 text-violet-700",
    },
    {
      title: "Themes & Clusters",
      copy: "Group related feedback into clear themes.",
      Icon: Layers3,
      tint: "bg-sky-100 text-sky-700",
    },
    {
      title: "Trend Detection",
      copy: "Spot rising issues before they escalate.",
      Icon: TrendingUp,
      tint: "bg-amber-100 text-amber-700",
    },
    {
      title: "Voice of Customer",
      copy: "Turn quotes into reports your team trusts.",
      Icon: MessageSquareText,
      tint: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Team Collaboration",
      copy: "Align product, support, and leadership fast.",
      Icon: Users,
      tint: "bg-rose-100 text-rose-700",
    },
  ];

  return (
    <section className="relative bg-[#F5F6FA] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="mx-auto max-w-3xl text-center font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Built for every stage of your customer journey.
        </h2>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {items.map(({ title, copy, Icon, tint }) => (
            <div
              key={title}
              className="rounded-2xl bg-white px-5 py-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
            >
              <span
                className={cn(
                  "inline-flex size-12 items-center justify-center rounded-2xl",
                  tint,
                )}
              >
                <Icon className="size-6" strokeWidth={1.75} />
              </span>
              <p className="mt-4 text-[15px] font-semibold text-navy">{title}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                {copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const quotes = [
    {
      name: "Sarah Chen",
      role: "Product Manager, Acme",
      text: "LOOP transformed how we understand our customers. We now catch issues early and build with confidence.",
      image: "/marketing/avatar-sarah.jpg",
    },
    {
      name: "Marcus Lee",
      role: "Head of Product, Spiral",
      text: "The AI insights save us hours every week. It's like having a customer intelligence analyst on our team.",
      image: "/marketing/avatar-marcus.jpg",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
        <div className="relative lg:col-span-5">
          <div className="relative overflow-visible rounded-[28px]">
            <Image
              src="/marketing/loop-laptop-Photoroom.png"
              alt="LOOP dashboard on a laptop"
              width={900}
              height={700}
              className="h-auto w-full object-contain"
              priority={false}
            />
          </div>
          <div className="absolute bottom-5 left-5 right-5 max-w-[280px] rounded-2xl bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.14)] sm:left-auto sm:right-6 sm:bottom-8">
            <p className="text-[13px] font-medium leading-relaxed text-navy">
              “LOOP helps us stay close to our customers and build what matters.”
            </p>
            <div className="mt-3 flex items-center gap-2.5">
              <Image
                src="/marketing/avatar-sarah.jpg"
                alt="Sarah Chen"
                width={36}
                height={36}
                className="size-9 rounded-full object-cover"
              />
              <div>
                <p className="text-[13px] font-semibold text-navy">Sarah Chen</p>
                <p className="text-[11px] text-ink-muted">Product Manager, Acme</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
                Real Impact
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Loved by product-driven teams.
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
                See how teams use LOOP to make better decisions, faster.
              </p>
            </div>
            <div className="hidden shrink-0 items-center gap-3 sm:flex">
              <button
                type="button"
                aria-label="Previous testimonial"
                className="text-slate-900 transition hover:opacity-70"
              >
                <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
                  <path
                    d="M19 12H5M11 6l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                className="text-[#494AFD] transition hover:opacity-70"
              >
                <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {quotes.map((quote) => (
              <Quote key={quote.name} {...quote} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-7xl px-4 pt-10 sm:px-6">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-24 rounded-full bg-[#E8EEFF]/70 blur-3xl" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                value: "120+",
                label: "Feedback items (demo data)",
                Icon: FileText,
              },
              {
                value: "3",
                label: "User roles (Admin, Analyst, Viewer)",
                Icon: UserRound,
              },
              {
                value: "4 Weeks",
                label: "Build timeline",
                Icon: Timer,
              },
              {
                value: "50 / 100 →",
                label: "Project weight",
                Icon: Shield,
              },
            ].map(({ value, label, Icon }) => (
              <div key={label} className="flex items-center gap-3.5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#494AFD]">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-[22px] font-bold tracking-tight text-[#312E81]">
                    {value}
                  </p>
                  <p className="mt-0.5 text-[13px] leading-snug text-slate-500">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative shrink-0 self-end lg:self-center lg:pl-4">
            <p
              className={`${hand.className} -rotate-[8deg] text-[28px] font-semibold leading-tight text-[#494AFD] sm:text-[32px]`}
            >
              Build, Learn,
              <br />
              Make an impact.
            </p>
            <svg
              viewBox="0 0 140 48"
              className="ml-6 mt-1 h-10 w-[120px] text-[#494AFD]"
              fill="none"
              aria-hidden
            >
              <path
                d="M120 10 C 86 14, 42 28, 18 36"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="3 5.5"
              />
              <path
                d="M30 28 L 14 38 L 32 42"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function Quote({
  name,
  role,
  text,
  image,
}: {
  name: string;
  role: string;
  text: string;
  image: string;
}) {
  return (
    <figure className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
      <p className="flex-1 text-[14px] leading-relaxed text-ink-secondary">
        “{text}”
      </p>
      <figcaption className="mt-5 flex items-center gap-3">
        <Image
          src={image}
          alt={name}
          width={40}
          height={40}
          className="size-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-navy">{name}</p>
          <p className="text-[12px] text-ink-muted">{role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function FinalCta() {
  return (
    <section className="bg-white px-4 pb-24 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] px-6 py-16 text-center text-white shadow-[0_32px_80px_rgba(73,74,253,0.35)] sm:px-10 sm:py-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, #2A3FE0 0%, #3D52F5 28%, #494AFD 52%, #6B72F8 78%, #8E94F8 100%)",
          }}
        />
        <div className="pointer-events-none absolute -left-16 -top-20 h-72 w-72 rounded-full bg-[#B4B8FF]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <svg
            viewBox="0 0 800 360"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
          >
            <defs>
              <linearGradient id="cta-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#B4B8FF" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <ellipse
              cx="90"
              cy="280"
              rx="150"
              ry="150"
              fill="none"
              stroke="url(#cta-ring)"
              strokeWidth="18"
            />
            <ellipse
              cx="150"
              cy="280"
              rx="150"
              ry="150"
              fill="none"
              stroke="url(#cta-ring)"
              strokeWidth="18"
              opacity="0.55"
            />
            <ellipse
              cx="720"
              cy="90"
              rx="140"
              ry="140"
              fill="none"
              stroke="url(#cta-ring)"
              strokeWidth="16"
            />
            <ellipse
              cx="780"
              cy="90"
              rx="140"
              ry="140"
              fill="none"
              stroke="url(#cta-ring)"
              strokeWidth="16"
              opacity="0.5"
            />
          </svg>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/75">
            Ready to close the loop?
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl sm:leading-[1.15]">
            Start turning customer feedback into opportunities.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/80">
            Join the next generation of product teams using AI to build what
            matters.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-[15px] font-semibold text-[#494AFD] shadow-[0_10px_30px_rgba(15,23,42,0.18)] transition hover:bg-[#EEF0FF]"
            >
              Get Started Free
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-12 items-center gap-2.5 rounded-xl border border-white/45 bg-white/10 px-6 text-[15px] font-medium text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              <span className="flex size-6 items-center justify-center rounded-full border border-white/70">
                <svg viewBox="0 0 24 24" className="ml-0.5 size-3" aria-hidden>
                  <path fill="currentColor" d="M8.4 6.7c0-.54.58-.88 1.1-.62l8.05 4.7a.72.72 0 0 1 0 1.24l-8.06 4.7c-.51.3-1.09-.04-1.09-.62V6.7Z" />
                </svg>
              </span>
              Watch Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
