"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { AuthFrame } from "@/components/auth/auth-frame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("maya@northstar.app");
  const [password, setPassword] = useState("northstar");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!email.includes("@") || password.length < 6) {
      setError("Check your email and password.");
      return;
    }
    setError("");
    setLoading(true);
    window.setTimeout(() => router.push("/dashboard"), 700);
  }

  return (
    <AuthFrame>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Sign in to LOOP
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            Northstar workspace · product, support, and founder access.
          </p>
        </div>
        <label className="block text-sm font-medium">
          Work email
          <Input
            className="mt-1.5"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
        </label>
        <label className="block text-sm font-medium">
          Password
          <span className="relative mt-1.5 block">
            <Input
              type={show ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-faint"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </span>
        </label>
        {error ? <p className="text-sm text-sentiment-negative">{error}</p> : null}
        <Button type="submit" className="w-full" loading={loading}>
          Continue
        </Button>
        <p className="text-sm text-ink-muted">
          New workspace?{" "}
          <Link href="/signup" className="font-medium text-accent">
            Create one
          </Link>
        </p>
      </form>
    </AuthFrame>
  );
}
