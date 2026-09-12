"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  Sparkles,
  Star,
  UserRound,
  Users,
} from "lucide-react";
import { BrandWord } from "@/components/brand/brand-word";
import { Logo, LoopMark } from "@/components/brand/logo";
import { LuminaMark, SlackMark, TRUST_LOGOS } from "@/components/marketing/logos";
import { buttonVariants } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth/google";
import { signInWithMicrosoft, signUpWithEmail } from "@/lib/auth/queries";
import { cn } from "@/lib/cn";
import { hand } from "@/lib/fonts";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [workspace, setWorkspace] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "azure" | null>(
    null,
  );
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim() || !email.includes("@") || password.length < 6) {
      setError("Enter your name, a valid email, and a password (6+ characters).");
      return;
    }
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const { data, error: signUpError } = await signUpWithEmail({
        email,
        password,
        fullName: name,
        workspaceName: workspace,
      });
      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }
      if (data.session) {
        router.push("/dashboard");
        router.refresh();
        return;
      }
      setMessage("Check your email to confirm your account, then sign in.");
      setLoading(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setMessage("");
    setOauthLoading("google");
    try {
      await signInWithGoogle();
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Google sign-up failed. Try again.",
      );
      setOauthLoading(null);
    }
  }

  async function handleMicrosoft() {
    setError("");
    setMessage("");
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
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex flex-col bg-white px-6 py-8 sm:px-10 lg:px-14 lg:py-10">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="LOOP home">
            <Logo />
          </Link>
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#494AFD] hover:text-[#3839d4]"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#494AFD]">
            Get started
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-navy">
            Create your <BrandWord /> workspace
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Invite your team. Start turning customer feedback into action.
          </p>

          <div className="mt-8 space-y-3">
            <button
              type="button"
              disabled={!!oauthLoading || loading}
              onClick={handleGoogle}
              className="flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-navy transition hover:border-[#C7CBFF] hover:bg-[#F8F9FC] disabled:opacity-60"
            >
              <GoogleMark />
              {oauthLoading === "google"
                ? "Signing in..."
                : "Continue with Google"}
            </button>
            <button
              type="button"
              disabled={!!oauthLoading || loading}
              onClick={handleMicrosoft}
              className="flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-navy transition hover:border-[#C7CBFF] hover:bg-[#F8F9FC] disabled:opacity-60"
            >
              <MicrosoftMark />
              {oauthLoading === "azure"
                ? "Redirecting..."
                : "Continue with Microsoft"}
            </button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Or
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={submit} className="space-y-4">
            <label className="block text-sm font-medium text-navy">
              Your name
              <span className="relative mt-1.5 block">
                <UserRound className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  placeholder="Maya Chen"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none ring-[#494AFD]/30 placeholder:text-slate-400 focus:ring-2"
                />
              </span>
            </label>

            <label className="block text-sm font-medium text-navy">
              Workspace name
              <span className="relative mt-1.5 block">
                <input
                  type="text"
                  value={workspace}
                  onChange={(e) => setWorkspace(e.target.value)}
                  placeholder="Northstar"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none ring-[#494AFD]/30 placeholder:text-slate-400 focus:ring-2"
                />
              </span>
            </label>

            <label className="block text-sm font-medium text-navy">
              Work email
              <span className="relative mt-1.5 block">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none ring-[#494AFD]/30 placeholder:text-slate-400 focus:ring-2"
                />
              </span>
            </label>

            <label className="block text-sm font-medium text-navy">
              Password
              <span className="relative mt-1.5 block">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  placeholder="At least 6 characters"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm outline-none ring-[#494AFD]/30 placeholder:text-slate-400 focus:ring-2"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </span>
            </label>

            {error ? <p className="text-sm text-rose-600">{error}</p> : null}
            {message ? (
              <p className="text-sm text-emerald-600">{message}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 w-full rounded-xl bg-[#494AFD] text-white hover:bg-[#3839d4] disabled:opacity-60",
              )}
            >
              {loading ? "Creating workspace..." : "Create workspace →"}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Trusted by innovative teams worldwide
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-slate-600">
              {TRUST_LOGOS.slice(0, 4).map(({ name: n, Mark }) => (
                <span
                  key={n}
                  className="inline-flex items-center gap-2 text-[13px] font-bold"
                >
                  <Mark className="size-4" />
                  {n}
                </span>
              ))}
              <span className="inline-flex items-center gap-2 text-[13px] font-bold">
                <SlackMark className="size-4" />
                Slack
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#EEF0FF] via-[#F5F3FF] to-[#E8EAFF] lg:flex lg:flex-col lg:justify-between lg:px-10 lg:py-10 xl:px-14">
        <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-[#C7CBFF]/40 blur-3xl" />
        <div className="relative">
          <p
            className={cn(
              hand.className,
              "absolute right-0 top-0 max-w-[9rem] text-right text-[20px] font-semibold leading-tight text-[#7C3AED]",
            )}
          >
            Start free. Build smarter.
          </p>
          <h2 className="max-w-md font-display text-3xl font-bold tracking-tight text-navy xl:text-4xl">
            Feedback in.{" "}
            <span className="text-[#494AFD]">Progress out.</span>
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
            Create a workspace in minutes and invite your team to close the loop
            on customer feedback.
          </p>
        </div>

        <div className="relative mx-auto my-8 w-full max-w-lg">
          <div className="overflow-hidden rounded-2xl bg-white p-5 shadow-[0_28px_80px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/70">
            <div className="flex items-center gap-2">
              <LoopMark className="size-6" />
              <BrandWord className="text-sm" />
            </div>
            <p className="mt-4 font-display text-lg font-semibold text-navy">
              Your first workspace awaits.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Sparkles className="size-4 text-[#494AFD]" /> AI insights from day one
              </li>
              <li className="flex items-center gap-2">
                <Users className="size-4 text-[#494AFD]" /> Invite product, eng, and design
              </li>
              <li className="flex items-center gap-2">
                <BarChart3 className="size-4 text-[#494AFD]" /> Themes, trends, and reports
              </li>
            </ul>
          </div>
        </div>

        <div className="relative space-y-6">
          <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-white backdrop-blur">
            <div className="flex gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" strokeWidth={0} />
              ))}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              “We set up <BrandWord /> in an afternoon. The whole product team
              was in the same feedback loop by Friday.”
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-[#494AFD] to-[#7C3AED] text-[10px] font-bold text-white">
                PS
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-navy">Priya Shah</p>
                <p className="text-[11px] text-ink-muted">
                  Head of Product, Lumina
                </p>
              </div>
              <LuminaMark className="size-5 text-slate-700" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Enterprise-grade security", Icon: Shield },
              { label: "No credit card required", Icon: Users },
              { label: "14-day free trial", Icon: BarChart3 },
            ].map(({ label, Icon }) => (
              <div key={label} className="text-center">
                <span className="mx-auto inline-flex size-9 items-center justify-center rounded-xl bg-white/80 text-[#494AFD] shadow-sm">
                  <Icon className="size-4" />
                </span>
                <p className="mt-2 text-[11px] font-medium leading-snug text-slate-600">
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

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path
        fill="#4285F4"
        d="M21.1 12c0-.6-.1-1.1-.2-1.7H12v3.6h5.1c-.2 1.2-1 2.3-2.1 3l2.8 2.2c1.7-1.5 2.3-3.8 2.3-7.1Z"
      />
      <path
        fill="#34A853"
        d="M12 21.2c2.4 0 4.4-.8 5.9-2.1l-2.8-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8l-3 2.3c1.5 3 4.5 4.9 8.1 4.9Z"
      />
      <path
        fill="#FBBC05"
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
