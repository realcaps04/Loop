"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/cn";

export const MARKETING_NAV = [
  { href: "/product", label: "Product" },
  { href: "/features", label: "Features" },
  { href: "/solutions", label: "Solutions" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/resources", label: "Resources" },
];

export function MarketingNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-indigo-50/80 bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" onClick={() => setOpen(false)} aria-label="LOOP home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {MARKETING_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-[14px] font-medium text-ink-secondary transition-colors hover:text-[#494AFD]",
                pathname === item.href &&
                  "text-[#494AFD] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-[#494AFD]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className="text-[14px] font-medium text-ink-secondary hover:text-ink"
          >
            Sign in
          </Link>
          <Link href="/signup" className={buttonVariants({ size: "md" })}>
            Get Started
            <span aria-hidden>→</span>
          </Link>
        </div>

        <IconButton
          label={open ? "Close menu" : "Open menu"}
          className="lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </IconButton>
      </div>

      {open ? (
        <div className="border-t border-line bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {MARKETING_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-2 py-2 text-sm font-medium text-ink-secondary transition-colors hover:bg-[#EEF0FF] hover:text-[#494AFD]",
                  pathname === item.href && "bg-[#EEF0FF] text-[#494AFD]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex gap-2">
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "secondary" }), "flex-1")}
            >
              Sign in
            </Link>
            <Link href="/signup" className={cn(buttonVariants(), "flex-1")}>
              Get Started
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
