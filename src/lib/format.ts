import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { NOW } from "@/lib/data/demo";
import type { Channel, DateRangeKey, FeedbackStatus, Role } from "@/lib/types";

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatPercent(value: number, digits = 1) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}%`;
}

export function formatRelative(iso: string) {
  return formatDistanceToNowStrict(parseISO(iso), {
    addSuffix: true,
    roundingMethod: "floor",
  }).replace("hour", "hr").replace("hours", "hrs");
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(parseISO(iso));
}

export function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(parseISO(iso));
}

export function greetingForNow(date = NOW) {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: "Asia/Kolkata",
    }).format(date),
  );
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function rangeLabel(range: DateRangeKey) {
  switch (range) {
    case "7d":
      return "Last 7 days";
    case "30d":
      return "Last 30 days";
    case "90d":
      return "Last 90 days";
    default:
      return "Custom range";
  }
}

export function rangeDays(range: DateRangeKey) {
  if (range === "7d") return 7;
  if (range === "90d") return 90;
  return 30;
}

export function channelLabel(channel: Channel) {
  switch (channel) {
    case "support_ticket":
      return "Support";
    case "app_store":
      return "App Store";
    case "nps":
      return "NPS";
    case "sales_note":
      return "Sales";
    case "community":
      return "Community";
  }
}

export function statusLabel(status: FeedbackStatus) {
  if (status === "NEW") return "New";
  if (status === "REVIEWED") return "Reviewed";
  return "Actioned";
}

export function roleLabel(role: Role) {
  if (role === "ADMIN") return "Admin";
  if (role === "ANALYST") return "Analyst";
  return "Viewer";
}

export function canIngest(role: Role) {
  return role === "ADMIN" || role === "ANALYST";
}

export function canManageWorkspace(role: Role) {
  return role === "ADMIN";
}
