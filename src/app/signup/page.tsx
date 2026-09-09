"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthFrame } from "@/components/auth/auth-frame";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <AuthFrame>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          setLoading(true);
          window.setTimeout(() => router.push("/dashboard"), 800);
        }}
      >
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Create your workspace
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            Invite your team. Start understanding your customers.
          </p>
        </div>
        <label className="block text-sm font-medium">
          Workspace name
          <Input className="mt-1.5" defaultValue="Northstar" />
        </label>
        <label className="block text-sm font-medium">
          Your name
          <Input className="mt-1.5" defaultValue="Maya Chen" />
        </label>
        <label className="block text-sm font-medium">
          Work email
          <Input className="mt-1.5" type="email" defaultValue="maya@northstar.app" />
        </label>
        <label className="block text-sm font-medium">
          Password
          <Input className="mt-1.5" type="password" defaultValue="northstar" />
        </label>
        <Button type="submit" className="w-full" loading={loading}>
          Create workspace
        </Button>
        <p className="text-sm text-ink-muted">
          Already have access?{" "}
          <Link href="/login" className="font-medium text-accent">
            Sign in
          </Link>
        </p>
      </form>
    </AuthFrame>
  );
}
