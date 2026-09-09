import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Brain,
  Cable,
  MessageSquare,
  Shield,
  Star,
  Target,
  Users,
} from "lucide-react";
import { BrandWord, withBrandWord } from "@/components/brand/brand-word";
import { LoopMark } from "@/components/brand/logo";
import { AcmeMark, LuminaMark, SpiralMark } from "@/components/marketing/logos";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

const FEATURES = [
  {
    title: "All feedback in one place",
    copy: "Collect feedback from surveys, chats, support tickets, and more — without the chaos.",
    Icon: MessageSquare,
    tint: "bg-violet-100 text-violet-600",
  },
  {
    title: "AI-powered insights",
    copy: "Automatically detect trends, sentiment, and key themes to uncover what matters most.",
    Icon: Brain,
    tint: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Built for every team",
    copy: "Product, engineering, design, marketing — everyone gets the insights they need.",
    Icon: Users,
    tint: "bg-rose-100 text-rose-500",
  },
  {
    title: "Turn insights into action",
    copy: "Prioritize, assign, and track feedback with clear next steps and real progress.",
    Icon: BarChart3,
    tint: "bg-sky-100 text-sky-600",
  },
  {
    title: "Integrates with your tools",
    copy: "Works seamlessly with the tools your team already uses.",
    Icon: Cable,
    tint: "bg-amber-100 text-amber-600",
  },
  {
    title: "Enterprise-ready & secure",
    copy: "Your data stays safe with industry-leading security and compliance standards.",
    Icon: Shield,
    tint: "bg-pink-100 text-pink-600",
  },
];

const ACTIONS = [
  {
    item: "Dark mode support",
    team: "Design",
    priority: "High",
    pTone: "bg-rose-50 text-rose-600",
    status: "In progress",
    sTone: "bg-sky-50 text-sky-700",
  },
  {
    item: "Faster dashboard load times",
    team: "Engineering",
    priority: "High",
    pTone: "bg-rose-50 text-rose-600",
    status: "Todo",
    sTone: "bg-slate-100 text-slate-600",
  },
  {
    item: "Improve onboarding checklist",
    team: "Product",
    priority: "Medium",
    pTone: "bg-amber-50 text-amber-700",
    status: "In progress",
    sTone: "bg-sky-50 text-sky-700",
  },
  {
    item: "Clarify pricing page copy",
    team: "Marketing",
    priority: "Low",
    pTone: "bg-emerald-50 text-emerald-700",
    status: "Completed",
    sTone: "bg-emerald-50 text-emerald-700",
  },
  {
    item: "Mobile app crash reports",
    team: "Engineering",
    priority: "High",
    pTone: "bg-rose-50 text-rose-600",
    status: "Todo",
    sTone: "bg-slate-100 text-slate-600",
  },
];

const NAV = [
  "Overview",
  "Feedback",
  "Analysis",
  "Themes",
  "People",
  "Actions",
  "Reports",
];

const QUOTES = [
  {
    quote: "LOOP has transformed the way we work. We finally hear our customers clearly.",
    name: "Sarah Kim",
    role: "Product Manager, Acme",
    image: "/marketing/avatar-sarah.jpg",
    Mark: AcmeMark,
  },
  {
    quote: "The insights we get from LOOP directly influence our roadmap. It's a must-have.",
    name: "James Miller",
    role: "CTO, Spiral",
    image: "/marketing/avatar-marcus.jpg",
    Mark: SpiralMark,
  },
  {
    quote: "It's simple, powerful, and loved by our entire team. LOOP just works.",
    name: "Priya Shah",
    role: "Head of Product, Lumina",
    image: null as string | null,
    initials: "PS",
    Mark: LuminaMark,
  },
];

export function HowWhySection() {
  return (
    <>
      <section className="relative overflow-hidden bg-white py-24">
        <div className="pointer-events-none absolute -right-20 top-24 h-80 w-80 rounded-full bg-[#EEF0FF] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
              Why choose <BrandWord />
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl sm:leading-[1.15]">
              One platform.{" "}
              <span className="text-[#494AFD]">Endless possibilities.</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
              Everything your team needs to turn customer feedback into better
              products, faster and together.
            </p>
          </div>

          <div className="relative mt-14 grid items-start gap-8 lg:grid-cols-12">
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
              {FEATURES.map(({ title, copy, Icon, tint }) => (
                <article
                  key={title}
                  className="rounded-2xl bg-white p-5 shadow-[0_14px_36px_rgba(15,23,42,0.06)] ring-1 ring-slate-100/80"
                >
                  <span
                    className={cn(
                      "inline-flex size-10 items-center justify-center rounded-xl",
                      tint,
                    )}
                  >
                    <Icon className="size-[18px]" strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-3 font-display text-[15px] font-semibold text-navy">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {copy}
                  </p>
                </article>
              ))}
            </div>

            <div className="relative lg:col-span-6">
              <p
                className={cn(
                  hand.className,
                  "absolute -top-2 right-2 z-20 max-w-[10rem] text-right text-[20px] font-semibold leading-tight text-[#7C3AED] sm:right-6",
                )}
              >
                More than feedback. A smarter way forward.
              </p>
              <span
                className={cn(
                  hand.className,
                  "absolute left-2 top-8 z-20 text-[#7C3AED]",
                )}
                aria-hidden
              >
                <span className="block text-lg leading-none">✦</span>
                <span className="ml-2 block text-sm leading-none">✦</span>
              </span>

              <div className="relative mx-auto max-w-[520px] pt-10 lg:ml-auto">
                <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-[#494AFD]/10 blur-2xl" />
                <ActionsDashboardMock />
              </div>

              <p
                className={cn(
                  hand.className,
                  "mt-4 text-right text-[18px] font-semibold text-[#7C3AED] sm:absolute sm:bottom-0 sm:right-4 sm:mt-0",
                )}
              >
                Ideas today. Better products tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F6FF] via-[#F8F9FF] to-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
                What our customers say
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Real teams. Real results.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                <BrandWord /> helps teams around the world build what their
                customers love.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-1 xl:grid-cols-3">
              {QUOTES.map((q) => (
                <article
                  key={q.name}
                  className="flex flex-col rounded-2xl bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.07)]"
                >
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-3.5 fill-current"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-slate-600">
                    “{withBrandWord(q.quote)}”
                  </p>
                  <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                    {q.image ? (
                      <Image
                        src={q.image}
                        alt={q.name}
                        width={36}
                        height={36}
                        className="size-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-[#494AFD] to-[#7C3AED] text-[10px] font-semibold text-white">
                        {q.initials}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-navy">
                        {q.name}
                      </p>
                      <p className="truncate text-[11px] text-ink-muted">
                        {q.role}
                      </p>
                    </div>
                    <q.Mark className="size-5 shrink-0 text-slate-700" />
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/solutions"
              className={cn(
                buttonVariants({ size: "xl" }),
                "rounded-full bg-[#494AFD] px-8 text-white shadow-[0_12px_30px_rgba(73,74,253,0.3)] hover:bg-[#3839d4]",
              )}
            >
              See customer stories →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ActionsDashboardMock() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_28px_80px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/70">
      <div className="flex min-h-[340px]">
        <aside className="hidden w-[110px] shrink-0 border-r border-slate-100 p-2.5 sm:block">
          <div className="mb-3 flex items-center gap-1.5 px-1">
            <LoopMark className="size-4" />
            <BrandWord className="text-[11px] font-bold" />
          </div>
          <nav className="space-y-0.5">
            {NAV.map((label) => (
              <div
                key={label}
                className={cn(
                  "rounded-lg px-1.5 py-1.5 text-[10px]",
                  label === "Actions"
                    ? "bg-[#EEF0FF] font-medium text-[#494AFD]"
                    : "text-slate-500",
                )}
              >
                {label}
              </div>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1 bg-[#FAFBFC] p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="font-display text-[13px] font-semibold text-navy">
              Actions
            </p>
            <Target className="size-3.5 text-[#494AFD]" />
          </div>

          <div className="mt-2.5 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
            <div className="grid grid-cols-[1.4fr_0.7fr_0.7fr_0.8fr] gap-1 border-b border-slate-100 px-2.5 py-2 text-[8px] font-semibold uppercase tracking-wide text-slate-400">
              <span>Opportunity</span>
              <span>Team</span>
              <span>Priority</span>
              <span>Status</span>
            </div>
            {ACTIONS.map((row) => (
              <div
                key={row.item}
                className="grid grid-cols-[1.4fr_0.7fr_0.7fr_0.8fr] items-center gap-1 border-b border-slate-50 px-2.5 py-2 last:border-0"
              >
                <span className="truncate text-[10px] font-medium text-navy">
                  {row.item}
                </span>
                <span className="truncate text-[10px] text-slate-500">
                  {row.team}
                </span>
                <span
                  className={cn(
                    "inline-flex w-fit rounded-full px-1.5 py-0.5 text-[8px] font-semibold",
                    row.pTone,
                  )}
                >
                  {row.priority}
                </span>
                <span
                  className={cn(
                    "inline-flex w-fit rounded-full px-1.5 py-0.5 text-[8px] font-semibold",
                    row.sTone,
                  )}
                >
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
