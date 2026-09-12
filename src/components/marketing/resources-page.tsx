"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Box,
  Code2,
  Download,
  FileText,
  Library,
  Megaphone,
  Newspaper,
  PenTool,
  Play,
  Search,
  Users,
  Video,
} from "lucide-react";
import { BrandWord } from "@/components/brand/brand-word";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

const TOPICS = [
  "Product Strategy",
  "Customer Feedback",
  "Team Collaboration",
  "Integrations",
  "Best Practices",
];

const CATEGORIES = [
  {
    id: "all",
    label: "All Resources",
    copy: "Everything in one place",
    Icon: Library,
  },
  {
    id: "guides",
    label: "Guides",
    copy: "Step-by-step learning",
    Icon: BookOpen,
  },
  {
    id: "blog",
    label: "Blog",
    copy: "Product insights",
    Icon: Newspaper,
  },
  {
    id: "webinars",
    label: "Webinars",
    copy: "Learn from experts",
    Icon: Play,
  },
  {
    id: "templates",
    label: "Templates",
    copy: "Ready-to-use tools",
    Icon: Download,
  },
  {
    id: "stories",
    label: "Customer Stories",
    copy: "Real-world success",
    Icon: Users,
  },
];

const FEATURED = [
  {
    type: "guides",
    badge: "Guide",
    badgeTone: "bg-[#EEF0FF] text-[#494AFD]",
    title: "The complete guide to customer feedback",
    meta: "5 min read",
    href: "/how-it-works",
    visual: "guide" as const,
  },
  {
    type: "blog",
    badge: "Blog",
    badgeTone: "bg-[#EEF0FF] text-[#494AFD]",
    title: "5 ways high-performing teams use customer feedback",
    meta: "7 min read",
    href: "/product",
    visual: "blog" as const,
  },
  {
    type: "webinars",
    badge: "Webinar",
    badgeTone: "bg-[#EEF0FF] text-[#494AFD]",
    extra: "On-demand",
    title: "From feedback to product growth (Webinar)",
    meta: "45 min",
    href: "/features",
    visual: "webinar" as const,
  },
  {
    type: "templates",
    badge: "Template",
    badgeTone: "bg-emerald-50 text-emerald-700",
    title: "Product feedback template",
    meta: "Free download",
    href: "/dashboard",
    visual: "template" as const,
  },
];

const ROLES = [
  { title: "For Product Teams", count: 12, Icon: Box, href: "/solutions#product" },
  {
    title: "For Engineering Teams",
    count: 10,
    Icon: Code2,
    href: "/solutions#engineering",
  },
  { title: "For Design Teams", count: 8, Icon: PenTool, href: "/solutions#design" },
  {
    title: "For Marketing Teams",
    count: 8,
    Icon: Megaphone,
    href: "/solutions#marketing",
  },
  { title: "For Leaders", count: 11, Icon: Users, href: "/solutions" },
];

export function ResourcesPageContent() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const featured = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FEATURED.filter((item) => {
      const catOk = category === "all" || item.type === category || (category === "stories" && false);
      const qOk =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [category, query]);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F6FF] via-white to-white py-14 sm:py-20">
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#EEF0FF] blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-32 h-80 w-80 rounded-full bg-[#F3E8FF]/50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
              Resources
            </p>
            <h1 className="mt-3 font-display text-[2.4rem] font-black tracking-tight text-navy sm:text-[3rem] sm:leading-[1.08]">
              Learn. Build. Grow together.
            </h1>
            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-ink-muted">
              Guides, templates, and expert insights to help your team turn
              customer feedback into better products.
            </p>

            <form
              className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search guides, templates, webinars..."
                  className="h-12 w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 text-sm text-navy shadow-sm outline-none ring-[#494AFD]/30 placeholder:text-slate-400 focus:ring-2"
                />
              </label>
              <button
                type="submit"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 shrink-0 rounded-full bg-[#494AFD] px-6 text-white hover:bg-[#3839d4]",
                )}
              >
                Search
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-2">
              {TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setQuery(topic)}
                  className="rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-slate-600 shadow-sm ring-1 ring-slate-200 transition hover:text-[#494AFD] hover:ring-[#C7CBFF]"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <p
              className={cn(
                hand.className,
                "absolute -top-2 right-2 z-20 max-w-[10rem] text-right text-[20px] font-semibold leading-tight text-[#7C3AED] sm:right-6",
              )}
            >
              Knowledge today. Better products tomorrow.
            </p>

            <div className="relative mx-auto max-w-[480px] pt-8">
              <div className="pointer-events-none absolute -inset-4 rounded-[32px] bg-[#494AFD]/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[28px] bg-[#1e1b4b] shadow-[0_28px_80px_rgba(15,23,42,0.18)]">
                <Image
                  src="/marketing/loop-laptop-Photoroom.png"
                  alt="LOOP on a laptop"
                  width={900}
                  height={700}
                  className="h-auto w-full object-contain opacity-95"
                />
              </div>

              <div className="absolute -left-2 top-16 z-10 flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-[0_12px_32px_rgba(15,23,42,0.12)] sm:-left-6">
                <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#494AFD]">
                  <BookOpen className="size-4" />
                </span>
                <p className="text-[12px] font-semibold text-navy">
                  100+ Articles & Guides
                </p>
              </div>
              <div className="absolute -right-1 top-36 z-10 flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-[0_12px_32px_rgba(15,23,42,0.12)] sm:-right-4">
                <span className="inline-flex size-8 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                  <Video className="size-4" />
                </span>
                <p className="text-[12px] font-semibold text-navy">
                  Webinars & Videos
                </p>
              </div>
              <div className="absolute bottom-8 left-4 z-10 flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-[0_12px_32px_rgba(15,23,42,0.12)] sm:left-8">
                <span className="inline-flex size-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <FileText className="size-4" />
                </span>
                <p className="text-[12px] font-semibold text-navy">
                  Templates & Resources
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {CATEGORIES.map(({ id, label, copy, Icon }) => {
              const active = category === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCategory(id)}
                  className={cn(
                    "rounded-2xl p-4 text-left transition",
                    active
                      ? "bg-[#EEF0FF] ring-2 ring-[#494AFD]"
                      : "bg-white shadow-sm ring-1 ring-slate-200 hover:ring-[#C7CBFF]",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex size-9 items-center justify-center rounded-xl",
                      active
                        ? "bg-white text-[#494AFD]"
                        : "bg-[#F4F5F9] text-slate-600",
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <p
                    className={cn(
                      "mt-3 text-sm font-semibold",
                      active ? "text-[#494AFD]" : "text-navy",
                    )}
                  >
                    {label}
                  </p>
                  <p className="mt-0.5 text-[12px] text-ink-muted">{copy}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                Featured resources
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                Handpicked content to help you get the most out of <BrandWord />.
              </p>
            </div>
            <Link
              href="#explore"
              className="text-sm font-semibold text-[#494AFD] hover:text-[#3839d4]"
            >
              View all resources →
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.length === 0 ? (
              <p className="col-span-full text-sm text-ink-muted">
                No resources match your search. Try another topic.
              </p>
            ) : (
              featured.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_16px_40px_rgba(15,23,42,0.07)] ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(15,23,42,0.1)]"
                >
                  <FeaturedVisual kind={item.visual} />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                          item.badgeTone,
                        )}
                      >
                        {item.badge}
                      </span>
                      {item.extra ? (
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600">
                          {item.extra}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-3 font-display text-[15px] font-semibold leading-snug text-navy group-hover:text-[#494AFD]">
                      {item.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-between pt-4 text-[13px] text-ink-muted">
                      <span>{item.meta}</span>
                      <ArrowRight className="size-4 text-[#494AFD] transition group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <section id="explore" className="scroll-mt-20 bg-[#F8F9FC] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                More to explore
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                Dive deeper with content tailored to your role.
              </p>
            </div>
            <p
              className={cn(
                hand.className,
                "text-[20px] font-semibold text-[#7C3AED]",
              )}
            >
              Smarter teams. Brighter tomorrow.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {ROLES.map(({ title, count, Icon, href }) => (
              <Link
                key={title}
                href={href}
                className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition hover:ring-[#C7CBFF]"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#494AFD]">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy">
                    {title}
                  </p>
                  <p className="text-[12px] text-ink-muted">
                    {count} resources
                  </p>
                </div>
                <ArrowRight className="size-4 shrink-0 text-[#494AFD]" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-[#EEF0FF] via-[#F3F0FF] to-[#F8F5FF] px-6 py-10 sm:px-10 sm:py-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-md">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-white text-[#494AFD] shadow-sm">
                  <Library className="size-5" />
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-navy sm:text-[28px]">
                  Stay in the loop.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Subscribe for new guides, templates, and product insights —
                  no fluff.
                </p>
              </div>

              <form
                className="w-full max-w-md"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="h-12 min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-5 text-sm outline-none ring-[#494AFD]/30 placeholder:text-slate-400 focus:ring-2"
                  />
                  <button
                    type="submit"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "h-12 shrink-0 rounded-full bg-[#494AFD] px-6 text-white hover:bg-[#3839d4]",
                    )}
                  >
                    Subscribe →
                  </button>
                </div>
                <p className="mt-2 text-center text-[12px] text-slate-500 sm:text-left">
                  No spam. Just the good stuff.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FeaturedVisual({
  kind,
}: {
  kind: "guide" | "blog" | "webinar" | "template";
}) {
  if (kind === "blog") {
    return (
      <div className="relative h-36 overflow-hidden bg-slate-200">
        <Image
          src="/marketing/avatar-marcus.jpg"
          alt=""
          fill
          className="object-cover object-top scale-150"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
      </div>
    );
  }

  if (kind === "webinar") {
    return (
      <div className="flex h-36 items-center justify-center gap-2 bg-gradient-to-br from-[#494AFD] to-[#7C3AED] px-4">
        {["/marketing/avatar-sarah.jpg", "/marketing/avatar-marcus.jpg"].map(
          (src) => (
            <Image
              key={src}
              src={src}
              alt=""
              width={48}
              height={48}
              className="size-12 rounded-full object-cover ring-2 ring-white/40"
            />
          ),
        )}
        <div className="flex size-12 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white ring-2 ring-white/40">
          +1
        </div>
      </div>
    );
  }

  if (kind === "template") {
    return (
      <div className="flex h-36 flex-col justify-center gap-1.5 bg-[#ECFDF5] px-5">
        {["Theme", "Volume", "Owner", "Status"].map((row, i) => (
          <div
            key={row}
            className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 text-[10px] shadow-sm"
          >
            <span className="font-semibold text-navy">{row}</span>
            <span className="ml-auto h-1.5 w-12 rounded-full bg-emerald-200" />
            <span className="text-slate-400">{i + 1}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-36 flex-col justify-center gap-1.5 bg-[#EEF0FF] px-5">
      {["Product Feedback", "Roadmap", "Themes", "Ask LOOP"].map((row) => (
        <div
          key={row}
          className="rounded-lg bg-white px-3 py-1.5 text-[11px] font-medium text-navy shadow-sm"
        >
          {row === "Ask LOOP" ? (
            <>
              Ask <BrandWord className="text-[11px]" />
            </>
          ) : (
            row
          )}
        </div>
      ))}
    </div>
  );
}
