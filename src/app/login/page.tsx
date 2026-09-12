"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Eye,
  EyeOff,
  Inbox,
  Layers3,
  LayoutDashboard,
  Lock,
  Mail,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { BrandWord } from "@/components/brand/brand-word";
import { Logo, LoopMark } from "@/components/brand/logo";
import { LuminaMark, TRUST_LOGOS } from "@/components/marketing/logos";
import { buttonVariants } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth/google";
import { signInWithEmail, signInWithMicrosoft } from "@/lib/auth/queries";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "azure" | null>(
    null,
  );
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "auth") {
      const message = params.get("message");
      setError(
        message
          ? decodeURIComponent(message)
          : "Authentication failed. Please try again.",
      );
    }
  }, []);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!email.includes("@") || password.length < 6) {
      setError("Check your email and password.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { error: signInError } = await signInWithEmail(email, password);
      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setOauthLoading("google");
    try {
      await signInWithGoogle();
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Google sign-in failed. Try again.",
      );
      setOauthLoading(null);
    }
  }

  async function handleMicrosoft() {
    setError("");
    setOauthLoading("azure");
    try {
      const { error: oauthError } = await signInWithMicrosoft();
      if (oauthError) {
        setError(oauthError.message);
        setOauthLoading(null);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setOauthLoading(null);
    }
  }

  return (
    <div className="h-svh max-h-svh overflow-hidden lg:grid lg:grid-cols-2">
      {/* Left — form */}
      <div className="flex h-full min-h-0 flex-col overflow-y-auto bg-white px-5 py-4 sm:px-8 lg:overflow-hidden lg:px-10 lg:py-5">
        <div className="flex shrink-0 items-center justify-between">
          <Link href="/" aria-label="LOOP home">
            <Logo />
          </Link>
          <p className="text-[13px] text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#494AFD] hover:text-[#3839d4]"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-3 lg:py-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
            Welcome back
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-navy lg:text-[1.75rem]">
            Sign in to <BrandWord />
          </h1>
          <p className="mt-1 text-[13px] leading-snug text-ink-muted">
            Continue your journey to turn customer feedback into real impact.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={!!oauthLoading || loading}
              onClick={handleGoogle}
              className="flex h-9 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-[12px] font-semibold text-navy transition hover:border-[#C7CBFF] hover:bg-[#F8F9FC] disabled:opacity-60"
            >
              <GoogleMark />
              {oauthLoading === "google" ? "..." : "Google"}
            </button>
            <button
              type="button"
              disabled={!!oauthLoading || loading}
              onClick={handleMicrosoft}
              className="flex h-9 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-[12px] font-semibold text-navy transition hover:border-[#C7CBFF] hover:bg-[#F8F9FC] disabled:opacity-60"
            >
              <MicrosoftMark />
              {oauthLoading === "azure" ? "..." : "Microsoft"}
            </button>
          </div>

          <div className="my-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Or
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={submit} className="space-y-2.5">
            <label className="block text-[13px] font-medium text-navy">
              Email address
              <span className="relative mt-1 block">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none ring-[#494AFD]/30 placeholder:text-slate-400 focus:ring-2"
                />
              </span>
            </label>

            <label className="block text-[13px] font-medium text-navy">
              Password
              <span className="relative mt-1 block">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-9 text-sm outline-none ring-[#494AFD]/30 placeholder:text-slate-400 focus:ring-2"
                />
                <button
                  type="button"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? (
                    <EyeOff className="size-3.5" />
                  ) : (
                    <Eye className="size-3.5" />
                  )}
                </button>
              </span>
            </label>

            <div className="flex justify-end">
              <Link
                href="/login"
                className="text-[12px] font-semibold text-[#494AFD] hover:text-[#3839d4]"
              >
                Forgot password?
              </Link>
            </div>

            {error ? (
              <p className="text-[12px] text-rose-600">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                buttonVariants({ size: "md" }),
                "h-9 w-full rounded-xl bg-[#494AFD] text-white hover:bg-[#3839d4] disabled:opacity-60",
              )}
            >
              {loading ? "Signing in..." : "Sign in →"}
            </button>

            <div className="flex items-center justify-between gap-3">
              <label className="inline-flex cursor-pointer items-center gap-1.5 text-[12px] text-slate-600">
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  className="size-3.5 rounded border-slate-300 text-[#494AFD] accent-[#494AFD]"
                />
                Keep me signed in
              </label>
              <Link
                href="/login"
                className="text-[12px] font-semibold text-[#494AFD] hover:text-[#3839d4]"
              >
                Sign in with SSO
              </Link>
            </div>
          </form>

          <div className="mt-4 shrink-0 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Trusted by innovative teams
            </p>
            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-slate-600">
              {TRUST_LOGOS.slice(0, 4).map(({ name, Mark }) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-2 text-[14px] font-bold"
                >
                  <Mark className="size-5" />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right — marketing */}
      <div className="relative hidden h-full min-h-0 overflow-hidden bg-gradient-to-br from-[#EEF0FF] via-[#F5F3FF] to-[#E8EAFF] lg:flex lg:flex-col lg:justify-between lg:px-8 lg:py-5 xl:px-10">
        <div className="pointer-events-none absolute -right-20 top-10 h-56 w-56 rounded-full bg-[#C7CBFF]/40 blur-3xl" />

        <div className="relative shrink-0">
          <p
            className={cn(
              hand.className,
              "absolute right-0 top-0 max-w-[8rem] text-right text-[16px] font-semibold leading-tight text-[#7C3AED]",
            )}
          >
            Better feedback. Brighter products.
          </p>
          <h2 className="max-w-md font-display text-2xl font-bold tracking-tight text-navy xl:text-[1.75rem]">
            Ideas. Feedback.{" "}
            <span className="text-[#494AFD]">Progress.</span>
          </h2>
          <p className="mt-1.5 max-w-sm text-[13px] leading-snug text-ink-muted">
            <BrandWord /> helps teams turn customer feedback into meaningful
            action.
          </p>
        </div>

        <div className="relative mx-auto my-2 flex w-full max-w-lg min-h-0 flex-1 items-center">
          <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-[#494AFD]/12 blur-2xl" />
          <div className="absolute -left-2 top-2 z-10 flex items-center gap-1.5 rounded-xl bg-white px-2.5 py-1.5 shadow-md ring-1 ring-slate-100">
            <span className="inline-flex size-6 items-center justify-center rounded-md bg-violet-50 text-violet-600">
              <BarChart3 className="size-3" />
            </span>
            <p className="text-[10px] font-semibold text-navy">
              Turn feedback into growth
            </p>
          </div>
          <SignInDashboardMock />
        </div>

        <div className="relative shrink-0 space-y-3">
          <div className="rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-white backdrop-blur">
            <div className="flex gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3 fill-current" strokeWidth={0} />
              ))}
            </div>
            <p className="mt-1.5 text-[12px] leading-snug text-slate-600">
              “<BrandWord /> has completely changed the way we work. Simple,
              powerful, and our entire team loves it.”
            </p>
            <div className="mt-2 flex items-center gap-2.5">
              <Image
                src="/marketing/avatar-sarah.jpg"
                alt="Priya Shah"
                width={28}
                height={28}
                className="size-7 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold text-navy">Priya Shah</p>
                <p className="text-[10px] text-ink-muted">
                  Head of Product, Lumina
                </p>
              </div>
              <LuminaMark className="size-4 text-slate-700" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Enterprise security", Icon: Shield },
              { label: "1M+ builders", Icon: Users },
              { label: "14-day free trial", Icon: BarChart3 },
            ].map(({ label, Icon }) => (
              <div key={label} className="text-center">
                <span className="mx-auto inline-flex size-7 items-center justify-center rounded-lg bg-white/80 text-[#494AFD] shadow-sm">
                  <Icon className="size-3.5" />
                </span>
                <p className="mt-1 text-[10px] font-medium leading-tight text-slate-600">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const SIGNIN_NAV = [
  { label: "Overview", Icon: LayoutDashboard, active: true },
  { label: "Feedback", Icon: Inbox },
  { label: "Analysis", Icon: Sparkles },
  { label: "Themes", Icon: Layers3 },
] as const;

const SIGNIN_KPIS = [
  { label: "Total feedback", value: "1,248", delta: "+12%" },
  { label: "Positive", value: "76%", delta: "+18%" },
  { label: "Opportunities", value: "12", delta: "+3" },
] as const;

function SignInDashboardMock() {
  return (
    <div className="relative w-full origin-center overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/80 lg:rotate-[-1.5deg]">
      <div className="flex h-[220px] xl:h-[240px]">
        <aside className="flex w-[112px] shrink-0 flex-col border-r border-slate-100 bg-white p-2.5">
          <div className="mb-3 flex items-center gap-1.5 px-1">
            <LoopMark className="size-4 shrink-0" />
            <BrandWord className="text-[11px] font-bold tracking-tight" />
          </div>
          <nav className="space-y-0.5">
            {SIGNIN_NAV.map((item) => {
              const { label, Icon } = item;
              const active = "active" in item && item.active;
              return (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-1.5 py-1.5 text-[10px]",
                  active
                    ? "bg-[#EEF0FF] font-medium text-[#494AFD]"
                    : "text-slate-500",
                )}
              >
                <Icon className="size-3 shrink-0" strokeWidth={1.75} />
                {label}
              </div>
              );
            })}
          </nav>
          <div className="mt-auto border-t border-slate-100 pt-2">
            <p className="px-1.5 text-[9px] text-slate-400">Settings</p>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col bg-[#FAFBFC] p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-display text-[13px] font-semibold leading-tight text-navy xl:text-[14px]">
                Good morning, Alex
              </p>
              <p className="mt-0.5 truncate text-[10px] text-slate-500">
                Here&apos;s what changed in your feedback.
              </p>
            </div>
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#494AFD] text-[9px] font-semibold text-white">
              AS
            </span>
          </div>

          <div className="mt-2.5 grid grid-cols-3 gap-1.5">
            {SIGNIN_KPIS.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-xl border border-slate-100 bg-white px-2 py-1.5 shadow-sm"
              >
                <p className="truncate text-[9px] font-medium text-slate-500">
                  {kpi.label}
                </p>
                <p className="mt-0.5 font-display text-[14px] font-bold tabular-nums tracking-tight text-navy">
                  {kpi.value}
                </p>
                <p className="text-[9px] font-semibold text-emerald-600">
                  {kpi.delta}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2 min-h-0 flex-1 rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] font-semibold text-navy">
                Feedback trend
              </p>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600">
                <TrendingUp className="size-3" strokeWidth={2.25} />
                +32%
              </span>
            </div>
            <svg
              className="mt-1.5 h-[52px] w-full text-[#494AFD]"
              viewBox="0 0 240 52"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="signinTrendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 40C28 38 42 32 72 34S120 18 150 16 198 22 240 8V52H0Z"
                fill="url(#signinTrendFill)"
              />
              <path
                d="M0 40C28 38 42 32 72 34S120 18 150 16 198 22 240 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.5-5.1 3.5-3.1 0-5.6-2.5-5.6-5.6S8.9 6.1 12 6.1c1.7 0 2.9.7 3.6 1.4l2.4-2.4C16.5 3.7 14.5 2.8 12 2.8 6.9 2.8 2.8 6.9 2.8 12S6.9 21.2 12 21.2c5.5 0 9.1-3.9 9.1-9.3 0-.6-.1-1.1-.2-1.7H12Z"
      />
      <path
        fill="#34A853"
        d="M3.9 7.9 6.9 10c.8-1.5 2.2-2.6 4-3.2L8.4 4.4C6.3 5.3 4.7 6.4 3.9 7.9Z"
        opacity="0"
      />
      <path
        fill="#FBBC05"
        d="M12 21.2c2.4 0 4.4-.8 5.9-2.1l-2.8-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8l-3 2.3c1.5 3 4.5 4.9 8.1 4.9Z"
      />
      <path
        fill="#4285F4"
        d="M21.1 12c0-.6-.1-1.1-.2-1.7H12v3.6h5.1c-.2 1.2-1 2.3-2.1 3l2.8 2.2c1.7-1.5 2.3-3.8 2.3-7.1Z"
      />
      <path
        fill="#34A853"
        d="M6.9 14c-.2-.5-.3-1.1-.3-1.7s.1-1.2.3-1.7L3.9 8.3C3.3 9.4 3 10.7 3 12s.3 2.6.9 3.7L6.9 14Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.4c1.3 0 2.5.5 3.4 1.3l2.5-2.5C16.5 3.7 14.5 2.8 12 2.8 8.4 2.8 5.4 4.7 3.9 7.7l3 2.3C7.6 8 9.6 6.4 12 6.4Z"
      />
    </svg>
  );
}

function MicrosoftMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path fill="#F25022" d="M3 3h8.5v8.5H3V3Z" />
      <path fill="#7FBA00" d="M12.5 3H21v8.5h-8.5V3Z" />
      <path fill="#00A4EF" d="M3 12.5h8.5V21H3v-8.5Z" />
      <path fill="#FFB900" d="M12.5 12.5H21V21h-8.5v-8.5Z" />
    </svg>
  );
}
