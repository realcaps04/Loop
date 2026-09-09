"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { FEEDBACK } from "@/lib/data/demo";
import { CURRENT_SESSION } from "@/lib/session";
import type { Feedback, Session } from "@/lib/types";

type ToastTone = "success" | "error" | "info";

export type Toast = {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
};

type AppState = {
  session: Session;
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

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [extraFeedback, setExtraFeedback] = useState<Feedback[]>([]);
  const [commandOpen, setCommandOpen] = useState(false);
  const [addFeedbackOpen, setAddFeedbackOpen] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(
    null,
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

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
      [...extraFeedback, ...FEEDBACK].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [extraFeedback],
  );

  const value = useMemo(
    () => ({
      session: CURRENT_SESSION,
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
