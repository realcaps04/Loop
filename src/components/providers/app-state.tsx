"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { loadOrCreateSession } from "@/lib/auth/session-loader";
import { signOut } from "@/lib/auth/queries";
import type { Feedback, Session } from "@/lib/types";

type ToastTone = "success" | "error" | "info";

export type Toast = {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
};

type AppState = {
  session: Session | null;
  sessionLoading: boolean;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
  extraFeedback: Feedback[];
  allFeedback: Feedback[];
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  addFeedbackOpen: boolean;
  setAddFeedbackOpen: (open: boolean) => void;
  selectedFeedbackId: string | null;
  setSelectedFeedbackId: (id: string | null) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  toasts: Toast[];
  notify: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;
  addFeedbackItem: (item: Feedback) => void;
};

const AppStateContext = createContext<AppState | null>(null);

const APP_PREFIXES = [
  "/dashboard",
  "/inbox",
  "/themes",
  "/trends",
  "/ask",
  "/reports",
  "/settings",
  "/analysis",
  "/actions",
  "/people",
  "/integrations",
];

function isAppPath(pathname: string) {
  return APP_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [extraFeedback, setExtraFeedback] = useState<Feedback[]>([]);
  const [commandOpen, setCommandOpen] = useState(false);
  const [addFeedbackOpen, setAddFeedbackOpen] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(
    null,
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const refreshSession = useCallback(async () => {
    setSessionLoading(true);
    try {
      const next = await loadOrCreateSession();
      setSession(next);
      if (!next && isAppPath(pathname)) {
        router.replace("/login");
      }
    } catch {
      setSession(null);
      if (isAppPath(pathname)) router.replace("/login");
    } finally {
      setSessionLoading(false);
    }
  }, [pathname, router]);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const logout = useCallback(async () => {
    await signOut();
    setSession(null);
    setExtraFeedback([]);
    router.push("/login");
    router.refresh();
  }, [router]);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback((toast: Omit<Toast, "id">) => {
    const id = `toast_${Date.now()}`;
    setToasts((current) => [...current, { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 3600);
  }, []);

  const addFeedbackItem = useCallback((item: Feedback) => {
    setExtraFeedback((current) => [item, ...current]);
  }, []);

  const allFeedback = useMemo(
    () =>
      [...extraFeedback].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [extraFeedback],
  );

  const value = useMemo(
    () => ({
      session,
      sessionLoading,
      refreshSession,
      logout,
      extraFeedback,
      allFeedback,
      commandOpen,
      setCommandOpen,
      addFeedbackOpen,
      setAddFeedbackOpen,
      selectedFeedbackId,
      setSelectedFeedbackId,
      mobileNavOpen,
      setMobileNavOpen,
      toasts,
      notify,
      dismissToast,
      addFeedbackItem,
    }),
    [
      session,
      sessionLoading,
      refreshSession,
      logout,
      extraFeedback,
      allFeedback,
      commandOpen,
      addFeedbackOpen,
      selectedFeedbackId,
      mobileNavOpen,
      toasts,
      notify,
      dismissToast,
      addFeedbackItem,
    ],
  );

  return (
    <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}

/** Session guaranteed after auth gate — use inside (app) shell only. */
export function useRequiredSession() {
  const { session, sessionLoading } = useAppState();
  if (sessionLoading) return { session: null, sessionLoading: true as const };
  if (!session) return { session: null, sessionLoading: false as const };
  return { session, sessionLoading: false as const };
}
