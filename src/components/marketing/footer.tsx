"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Github, Linkedin, Youtube } from "lucide-react";
import { Logo } from "@/components/brand/logo";

const PRODUCT = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Use Cases", href: "/solutions" },
  { label: "Roadmap", href: "/product" },
];

const RESOURCES = [
  { label: "Documentation", href: "/resources" },
  { label: "Blog", href: "/resources" },
  { label: "Guides", href: "/resources" },
  { label: "Support", href: "/resources" },
];

const COMPANY = [
  { label: "About", href: "/how-it-works" },
  { label: "Careers", href: "/resources" },
  { label: "Contact", href: "/resources" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="flex items-center gap-2 text-[13px] font-semibold text-navy">
        <span className="h-px w-3 bg-[#C7CBFF]" aria-hidden />
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="text-[14px] text-slate-500 transition hover:text-[#494AFD]"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M17.3 3.2h2.8l-6.1 7 7.2 10.6h-5.6l-4.4-6.4-5 6.4H3.4l6.5-7.4L3 3.2h5.8l4 5.8 4.5-5.8Zm-1 16h1.5L7.8 4.9H6.1L16.3 19.2Z" />
    </svg>
  );
}

export function MarketingFooter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="relative overflow-hidden border-t border-[#E8EAFF] bg-[#F7F8FC]">
      <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[#B4B8FF]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-[#494AFD]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <Logo />
          <p className="mt-4 max-w-[220px] text-[14px] leading-relaxed text-slate-500">
            Close the loop on customer feedback.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
          <FooterColumn title="Product" links={PRODUCT} />
          <FooterColumn title="Resources" links={RESOURCES} />
          <FooterColumn title="Company" links={COMPANY} />
        </div>

        <div className="lg:col-span-4">
          <p className="text-[15px] font-semibold text-navy">Stay in the loop</p>
          <p className="mt-1 text-[13px] text-slate-500">
            Get product updates and insights.
          </p>
          {done ? (
            <p className="mt-4 rounded-xl bg-white px-4 py-3 text-sm text-slate-600 shadow-[0_8px_24px_rgba(73,74,253,0.08)]">
              You&apos;re on the list. We&apos;ll write when there&apos;s something worth
              closing the loop on.
            </p>
          ) : (
            <form
              className="mt-4 flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                if (email.includes("@")) setDone(true);
              }}
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 min-w-0 flex-1 rounded-xl border border-[#DDE1F5] bg-white px-3.5 text-[14px] text-navy outline-none ring-[#494AFD]/25 placeholder:text-slate-400 focus:border-[#494AFD] focus:ring-2"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#494AFD] to-[#2A3FE0] text-white shadow-[0_10px_24px_rgba(73,74,253,0.35)] transition hover:brightness-110"
              >
                <ArrowRight className="size-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="relative border-t border-[#E8EAFF]/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-[12px] text-slate-400">
            © {new Date().getFullYear()}{" "}
            <span className="font-brand text-[#494AFD]">LOOP</span>. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" aria-label="LinkedIn" className="transition hover:text-[#494AFD]">
              <Linkedin className="size-4" />
            </a>
            <a href="#" aria-label="X" className="transition hover:text-[#494AFD]">
              <XIcon className="size-4" />
            </a>
            <a href="#" aria-label="GitHub" className="transition hover:text-[#494AFD]">
              <Github className="size-4" />
            </a>
            <a href="#" aria-label="YouTube" className="transition hover:text-[#494AFD]">
              <Youtube className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
