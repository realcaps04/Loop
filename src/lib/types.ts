export type Role = "ADMIN" | "ANALYST" | "VIEWER";

export type Sentiment = "positive" | "negative" | "neutral" | "mixed";

export type FeedbackStatus = "NEW" | "REVIEWED" | "ACTIONED";

export type Channel =
  | "support_ticket"
  | "app_store"
  | "nps"
  | "sales_note"
  | "community";

export type DateRangeKey = "7d" | "30d" | "90d" | "custom";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  title: string;
  initials: string;
};

export type Workspace = {
  id: string;
  name: string;
  slug: string;
  details: string;
};

export type Theme = {
  id: string;
  name: string;
  description: string;
  color: string;
  workspaceId: string;
};

export type Feedback = {
  id: string;
  content: string;
  channel: Channel;
  sourceRef: string;
  customerLabel: string;
  sentiment: Sentiment;
  sentimentScore: number;
  status: FeedbackStatus;
  createdAt: string;
  workspaceId: string;
  themeIds: string[];
  featureArea: string;
  aiRationale: string;
};

export type Report = {
  id: string;
  title: string;
  periodStart: string;
  periodEnd: string;
  createdAt: string;
  generatedBy: string;
  status: "ready" | "generating";
};

export type Session = {
  user: User;
  workspace: Workspace;
};

export type Kpi = {
  key: string;
  label: string;
  value: number;
  format: "number" | "percent";
  delta: number;
  hint: string;
  tone?: "default" | "negative" | "positive" | "accent";
};

export type VolumePoint = {
  date: string;
  label: string;
  total: number;
  positive: number;
  negative: number;
  neutral: number;
};

export type ThemeStat = {
  theme: Theme;
  count: number;
  previousCount: number;
  delta: number;
  sentiment: Sentiment;
  trend: "up" | "down" | "flat";
};

export type EmergingSignal = {
  id: string;
  title: string;
  detail: string;
  kind: "spike" | "shift" | "volume" | "concern";
  themeId?: string;
  delta?: number;
};

export type DashboardData = {
  range: DateRangeKey;
  greetingName: string;
  kpis: Kpi[];
  volume: VolumePoint[];
  sentiment: {
    positive: number;
    negative: number;
    neutral: number;
    mixed: number;
    total: number;
    dominant: Sentiment;
  };
  topThemes: ThemeStat[];
  signals: EmergingSignal[];
  recent: Feedback[];
  empty: boolean;
};
