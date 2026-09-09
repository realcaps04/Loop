import Link from "next/link";
import { Box, CheckCircle2, Code2, Megaphone, PenTool } from "lucide-react";
import { cn } from "@/lib/cn";

const TEAMS = [
  {
    title: "For Product Teams",
    copy: "Turn customer feedback into your roadmap.",
    href: "/solutions#product",
    Icon: Box,
    wash: "bg-[#F5F3FF]",
    tint: "bg-violet-100 text-violet-600",
    check: "text-[#494AFD]",
    items: [
      "Prioritize what matters",
      "Validate ideas with real feedback",
      "Build products customers love",
    ],
  },
  {
    title: "For Engineering Teams",
    copy: "Understand user issues and build with confidence.",
    href: "/solutions#engineering",
    Icon: Code2,
    wash: "bg-[#ECFDF5]",
    tint: "bg-emerald-100 text-emerald-600",
    check: "text-emerald-600",
    items: [
      "Spot bugs and frictions early",
      "Get technical context from feedback",
      "Reduce support load",
    ],
  },
  {
    title: "For Design Teams",
    copy: "Create better experiences with user insights.",
    href: "/solutions#design",
    Icon: PenTool,
    wash: "bg-[#FFF1F2]",
    tint: "bg-pink-100 text-pink-600",
    check: "text-pink-500",
    items: [
      "Discover usability issues",
      "Validate design decisions",
      "Understand user needs at scale",
    ],
  },
  {
    title: "For Marketing Teams",
    copy: "Capture what customers love and amplify it.",
    href: "/solutions#marketing",
    Icon: Megaphone,
    wash: "bg-[#FFFBEB]",
    tint: "bg-amber-100 text-amber-600",
    check: "text-amber-600",
    items: [
      "Find your biggest advocates",
      "Identify key messaging themes",
      "Share customer insights across teams",
    ],
  },
];

export function SolutionsTeamsSection() {
  return (
    <section className="bg-white pb-24 pt-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAMS.map((team) => (
            <article
              key={team.title}
              id={team.href.split("#")[1]}
              className={cn(
                "flex scroll-mt-24 flex-col rounded-2xl p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]",
                team.wash,
              )}
            >
              <span
                className={cn(
                  "inline-flex size-11 items-center justify-center rounded-xl",
                  team.tint,
                )}
              >
                <team.Icon className="size-5" strokeWidth={2} />
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold tracking-tight text-navy">
                {team.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                {team.copy}
              </p>
              <ul className="mt-4 flex-1 space-y-2.5">
                {team.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <CheckCircle2
                      className={cn("mt-0.5 size-4 shrink-0", team.check)}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={team.href}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#494AFD] transition hover:text-[#3839d4]"
              >
                Learn more
                <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center">
          <div className="flex w-full max-w-xl items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <p className="shrink-0 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Teams that listen, build a brighter tomorrow.
            </p>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <Link
            href="#product"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-gradient-to-r from-[#494AFD] to-[#7C3AED] px-8 text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(73,74,253,0.3)] hover:brightness-105"
          >
            Explore all solutions →
          </Link>
        </div>
      </div>
    </section>
  );
}
