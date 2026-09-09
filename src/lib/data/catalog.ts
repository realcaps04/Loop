import type { Channel, Role, Sentiment, Theme } from "@/lib/types";

export const NOW = new Date("2026-09-09T02:34:00.000Z");

export const WORKSPACE = {
  id: "ws_northstar",
  name: "Northstar",
  slug: "northstar",
  details: "Operations workflow platform used by mid-market ops, CS, and finance teams.",
};

export const USERS = [
  {
    id: "user_maya",
    name: "Maya Chen",
    email: "maya@northstar.app",
    role: "ADMIN" as Role,
    title: "Head of Product",
    initials: "MC",
  },
  {
    id: "user_jordan",
    name: "Jordan Hale",
    email: "jordan@northstar.app",
    role: "ANALYST" as Role,
    title: "Support Lead",
    initials: "JH",
  },
  {
    id: "user_priya",
    name: "Priya Shah",
    email: "priya@northstar.app",
    role: "VIEWER" as Role,
    title: "Founder & CEO",
    initials: "PS",
  },
] as const;

export const THEMES: Theme[] = [
  {
    id: "theme_onboarding",
    name: "Onboarding",
    description: "First-run setup, invites, SSO, and time-to-value for new workspaces.",
    color: "#494AFD",
    workspaceId: WORKSPACE.id,
  },
  {
    id: "theme_billing",
    name: "Billing",
    description: "Invoices, seat changes, upgrades, and unexpected charges.",
    color: "#57534E",
    workspaceId: WORKSPACE.id,
  },
  {
    id: "theme_performance",
    name: "Performance",
    description: "Load times, timeouts, and perceived slowness in daily workflows.",
    color: "#0F766E",
    workspaceId: WORKSPACE.id,
  },
  {
    id: "theme_mobile",
    name: "Mobile Experience",
    description: "iOS and Android reliability, especially around reports and approvals.",
    color: "#C2410C",
    workspaceId: WORKSPACE.id,
  },
  {
    id: "theme_integrations",
    name: "Integrations",
    description: "Slack, Salesforce, Okta, and export connectors that keep Northstar in the stack.",
    color: "#1D4ED8",
    workspaceId: WORKSPACE.id,
  },
  {
    id: "theme_authentication",
    name: "Authentication",
    description: "SSO, session expiry, MFA prompts, and login recovery.",
    color: "#7C3AED",
    workspaceId: WORKSPACE.id,
  },
  {
    id: "theme_reporting",
    name: "Reporting",
    description: "Saved views, scheduled reports, and executive-ready summaries.",
    color: "#0F766E",
    workspaceId: WORKSPACE.id,
  },
  {
    id: "theme_export",
    name: "Export",
    description: "CSV / PDF exports, column mapping, and incomplete downloads.",
    color: "#A16207",
    workspaceId: WORKSPACE.id,
  },
  {
    id: "theme_support",
    name: "Support",
    description: "Response times, handoffs, and whether issues actually get resolved.",
    color: "#44403C",
    workspaceId: WORKSPACE.id,
  },
];

export const CUSTOMERS = [
  "Harbor Health",
  "Brightline Retail",
  "Cobalt Finance",
  "Atlas Freight",
  "Nimbus Labs",
  "Westbrook Legal",
  "Rivermark",
  "Pine & Co",
  "Copperfield",
  "Lumen Hospitality",
  "Oak & Binder",
  "Vesper Insurance",
  "Fieldnote",
  "Kite Logistics",
  "Meridian Clinics",
  "Sable Bank",
  "Northwind Ops",
  "Paperlane",
  "Helio Energy",
  "Cinder Records",
];

export const CHANNEL_LABEL: Record<Channel, string> = {
  support_ticket: "Support ticket",
  app_store: "App Store review",
  nps: "NPS survey",
  sales_note: "Sales call note",
  community: "Community post",
};

type Quote = {
  content: string;
  themeId: string;
  sentiment: Sentiment;
  score: number;
  featureArea: string;
  rationale: string;
  preferredChannel?: Channel;
};

export const QUOTES: Quote[] = [
  {
    themeId: "theme_onboarding",
    sentiment: "negative",
    score: 0.18,
    featureArea: "Setup wizard",
    preferredChannel: "support_ticket",
    content:
      "The setup wizard never asked about SSO. We spent two days in a support thread just to get our Okta tenant connected.",
    rationale:
      "Mentions a blocked first-run path and delayed time-to-value around SSO, which LOOP maps to Onboarding.",
  },
  {
    themeId: "theme_onboarding",
    sentiment: "negative",
    score: 0.22,
    featureArea: "Invites",
    content:
      "Inviting the rest of the ops team should be step one, not buried under Workspace → Members → Advanced.",
    rationale:
      "The customer is describing friction in the first-week invite flow, a core onboarding failure.",
  },
  {
    themeId: "theme_onboarding",
    sentiment: "negative",
    score: 0.16,
    featureArea: "Empty states",
    preferredChannel: "nps",
    content:
      "We finished setup and landed on a blank dashboard. No sample workflow, no suggested next step. Felt unfinished.",
    rationale:
      "Empty first-run experience and missing guidance are classified as Onboarding with negative sentiment.",
  },
  {
    themeId: "theme_onboarding",
    sentiment: "mixed",
    score: 0.48,
    featureArea: "Templates",
    preferredChannel: "sales_note",
    content:
      "Templates got us moving, but every customer still has to rebuild approval routing from scratch. That's the drop-off.",
    rationale:
      "Acknowledges a useful starting point while calling out a remaining onboarding gap in routing setup.",
  },
  {
    themeId: "theme_onboarding",
    sentiment: "positive",
    score: 0.84,
    featureArea: "Checklist",
    preferredChannel: "nps",
    content:
      "The new checklist actually told us what 'done' looks like. We were routing invoices the same afternoon.",
    rationale:
      "Clear time-to-value language and a completed first job-to-be-done, scored as positive Onboarding.",
  },
  {
    themeId: "theme_onboarding",
    sentiment: "negative",
    score: 0.2,
    featureArea: "Permissions",
    content:
      "Our admin finished setup, then nobody else could see the workspace until we re-invited everyone. Silent failure.",
    rationale:
      "Post-setup access failure is treated as onboarding because it blocks activation, not later usage.",
  },
  {
    themeId: "theme_onboarding",
    sentiment: "negative",
    score: 0.14,
    featureArea: "Data import",
    preferredChannel: "community",
    content:
      "CSV import during setup rejected our employee file with no row numbers. We had to guess which 12 people failed.",
    rationale:
      "Import errors during first-run are Onboarding; the tone is frustrated and blocked.",
  },
  {
    themeId: "theme_onboarding",
    sentiment: "mixed",
    score: 0.51,
    featureArea: "Walkthrough",
    preferredChannel: "app_store",
    content:
      "Walkthrough is nicer than last year, still skips the parts that matter: SSO and who approves what.",
    rationale:
      "Partial improvement with remaining first-run gaps keeps this as mixed Onboarding.",
  },
  {
    themeId: "theme_billing",
    sentiment: "negative",
    score: 0.12,
    featureArea: "Invoices",
    preferredChannel: "support_ticket",
    content:
      "We were billed twice after moving to the Business seat count. Finance noticed before the product did.",
    rationale:
      "Unexpected duplicate charge language is a high-confidence Billing / negative classification.",
  },
  {
    themeId: "theme_billing",
    sentiment: "negative",
    score: 0.2,
    featureArea: "Seat management",
    content:
      "Deactivating a user does not release the seat until the following month. That's a surprise in the contract.",
    rationale:
      "Seat-proration confusion is Billing; sentiment is negative because the customer feels misled.",
  },
  {
    themeId: "theme_billing",
    sentiment: "negative",
    score: 0.18,
    featureArea: "Upgrade flow",
    preferredChannel: "sales_note",
    content:
      "Upgrade confirmation showed one number, invoice arrived with another. Hard to take procurement through that.",
    rationale:
      "Mismatch between quoted and invoiced amounts is Billing with clear negative intent.",
  },
  {
    themeId: "theme_billing",
    sentiment: "mixed",
    score: 0.46,
    featureArea: "Usage",
    content:
      "Usage page is finally readable, but we still cannot tell which team is driving overage until export.",
    rationale:
      "Recognizes a UI improvement while flagging remaining cost transparency issues.",
  },
  {
    themeId: "theme_billing",
    sentiment: "positive",
    score: 0.8,
    featureArea: "Receipts",
    preferredChannel: "nps",
    content:
      "Monthly receipts now match what finance expected. That used to be a 40-minute Slack thread.",
    rationale:
      "Explicit relief about invoice accuracy maps to positive Billing.",
  },
  {
    themeId: "theme_billing",
    sentiment: "negative",
    score: 0.22,
    featureArea: "Credits",
    preferredChannel: "support_ticket",
    content:
      "Promised onboarding credit never appeared. We have the email. The invoice does not.",
    rationale:
      "Missing credit against an invoice is Billing and unresolved, hence negative.",
  },
  {
    themeId: "theme_billing",
    sentiment: "neutral",
    score: 0.52,
    featureArea: "Tax",
    content:
      "Need a VAT ID field on the invoice before we can keep the workspace. Not angry, just blocked.",
    rationale:
      "Factual, blocked language without blame is classified as neutral Billing.",
  },
  {
    themeId: "theme_performance",
    sentiment: "negative",
    score: 0.15,
    featureArea: "Workflow list",
    preferredChannel: "app_store",
    content:
      "Opening the workflow list with 2,000 items takes long enough that people alt-tab away. That's daily pain.",
    rationale:
      "Slow core list performance with daily impact is Performance / negative.",
  },
  {
    themeId: "theme_performance",
    sentiment: "negative",
    score: 0.19,
    featureArea: "Search",
    content:
      "Search spins, then returns nothing, then the results appear after we've already typed a ticket to support.",
    rationale:
      "Latency and delayed results on search are Performance issues with frustrated tone.",
  },
  {
    themeId: "theme_performance",
    sentiment: "negative",
    score: 0.17,
    featureArea: "Approvals",
    preferredChannel: "support_ticket",
    content:
      "Approvals timeout around 9am when the whole ops team is in. That's exactly when we need it.",
    rationale:
      "Peak-hour timeouts on a critical path are Performance / negative.",
  },
  {
    themeId: "theme_performance",
    sentiment: "mixed",
    score: 0.49,
    featureArea: "Reports",
    content:
      "Reports are faster than Q1, still choke if anyone adds more than two filters.",
    rationale:
      "Acknowledges improvement with remaining filter performance issues — mixed Performance.",
  },
  {
    themeId: "theme_performance",
    sentiment: "positive",
    score: 0.82,
    featureArea: "Home",
    preferredChannel: "nps",
    content:
      "Home used to feel heavy. This month it opens immediately. Small thing, changes whether people live in the product.",
    rationale:
      "Clear before/after praise of load time is positive Performance.",
  },
  {
    themeId: "theme_performance",
    sentiment: "negative",
    score: 0.21,
    featureArea: "Bulk actions",
    preferredChannel: "community",
    content:
      "Bulk-assigning 80 items froze the tab. Had to refresh and lost the selection. Happened twice this week.",
    rationale:
      "Freeze and lost work during bulk actions is Performance with high-confidence negative score.",
  },
  {
    themeId: "theme_mobile",
    sentiment: "negative",
    score: 0.11,
    featureArea: "iOS reports",
    preferredChannel: "app_store",
    content:
      "iOS 17.5 — reports crash the moment I pinch to zoom. Unusable on the train, which is when I actually review them.",
    rationale:
      "Crash on a specific mobile surface is Mobile Experience / strongly negative.",
  },
  {
    themeId: "theme_mobile",
    sentiment: "negative",
    score: 0.18,
    featureArea: "Push",
    preferredChannel: "app_store",
    content:
      "Push notifications arrive, I tap, and land on login instead of the approval. Then the approval has expired.",
    rationale:
      "Broken deep links from push into an auth wall is Mobile, with operational harm.",
  },
  {
    themeId: "theme_mobile",
    sentiment: "negative",
    score: 0.2,
    featureArea: "Android scan",
    preferredChannel: "support_ticket",
    content:
      "Android receipt capture blurs in low light. Field managers have gone back to emailing photos.",
    rationale:
      "Core mobile capture failure causing workaround behavior is negative Mobile Experience.",
  },
  {
    themeId: "theme_mobile",
    sentiment: "mixed",
    score: 0.5,
    featureArea: "Approvals",
    content:
      "Approving from the phone is convenient until an attachment is involved. Then I need a laptop anyway.",
    rationale:
      "Partial usefulness with a blocking attachment gap is mixed Mobile.",
  },
  {
    themeId: "theme_mobile",
    sentiment: "positive",
    score: 0.78,
    featureArea: "Biometrics",
    preferredChannel: "nps",
    content:
      "Face ID login on iOS is the first time the app has felt like it belongs on a phone.",
    rationale:
      "Direct praise of a mobile auth convenience is positive Mobile Experience.",
  },
  {
    themeId: "theme_mobile",
    sentiment: "negative",
    score: 0.16,
    featureArea: "Offline",
    content:
      "Offline mode claims to queue approvals. They vanish when I reconnect in the warehouse.",
    rationale:
      "Lost queued work is a reliability issue on mobile, classified negative.",
  },
  {
    themeId: "theme_integrations",
    sentiment: "negative",
    score: 0.19,
    featureArea: "Salesforce",
    preferredChannel: "sales_note",
    content:
      "Salesforce sync silently dropped 30 accounts last week. No alert. CS found it in a QBR.",
    rationale:
      "Silent sync failure with customer impact is Integrations / negative.",
  },
  {
    themeId: "theme_integrations",
    sentiment: "negative",
    score: 0.21,
    featureArea: "Slack",
    preferredChannel: "community",
    content:
      "Slack alerts fire three times for the same approval. People started muting the channel, which defeats the point.",
    rationale:
      "Noisy integration causing mute behavior is Integrations with negative sentiment.",
  },
  {
    themeId: "theme_integrations",
    sentiment: "mixed",
    score: 0.47,
    featureArea: "Okta",
    content:
      "Okta works, until someone is added to a new group. Provisioning lags overnight and they think they don't have access.",
    rationale:
      "Working baseline with a delayed provisioning gap is mixed Integrations.",
  },
  {
    themeId: "theme_integrations",
    sentiment: "negative",
    score: 0.17,
    featureArea: "Webhooks",
    preferredChannel: "support_ticket",
    content:
      "Webhook retries stopped after 3 attempts with no dead-letter. We lost a day's worth of closed tickets.",
    rationale:
      "Lost events from webhook handling is Integrations / negative.",
  },
  {
    themeId: "theme_integrations",
    sentiment: "positive",
    score: 0.86,
    featureArea: "Slack",
    preferredChannel: "nps",
    content:
      "Approving from Slack without opening Northstar is the reason our regional managers actually use this.",
    rationale:
      "Clear job-to-be-done praise for a Slack action is positive Integrations.",
  },
  {
    themeId: "theme_integrations",
    sentiment: "negative",
    score: 0.23,
    featureArea: "Zapier",
    content:
      "The Zapier connector still cannot read custom fields. Every implementation starts with a workaround spreadsheet.",
    rationale:
      "Missing custom field support forcing workarounds is negative Integrations.",
  },
  {
    themeId: "theme_authentication",
    sentiment: "negative",
    score: 0.1,
    featureArea: "SSO",
    preferredChannel: "support_ticket",
    content:
      "SSO started failing Tuesday morning. Half the company is stuck in a redirect loop between Okta and Northstar.",
    rationale:
      "Login loop and widespread blockage is Authentication with a very low (negative) score.",
  },
  {
    themeId: "theme_authentication",
    sentiment: "negative",
    score: 0.13,
    featureArea: "Session",
    preferredChannel: "app_store",
    content:
      "I get signed out every 20 minutes now. I used to stay in for the day. Something changed in the last release.",
    rationale:
      "Sudden session expiry after a release is Authentication / negative, and a likely spike driver.",
  },
  {
    themeId: "theme_authentication",
    sentiment: "negative",
    score: 0.15,
    featureArea: "MFA",
    preferredChannel: "support_ticket",
    content:
      "MFA prompt appears twice, then rejects a valid code. We have three tickets from finance this week alone.",
    rationale:
      "Repeated MFA failure with ticket volume is Authentication / negative.",
  },
  {
    themeId: "theme_authentication",
    sentiment: "negative",
    score: 0.18,
    featureArea: "Password reset",
    content:
      "Password reset emails take 15 minutes or never arrive. People are creating duplicate accounts to get work done.",
    rationale:
      "Broken recovery driving duplicate accounts is Authentication with operational harm.",
  },
  {
    themeId: "theme_authentication",
    sentiment: "negative",
    score: 0.12,
    featureArea: "SSO",
    preferredChannel: "community",
    content:
      "Anyone on a custom SAML mapping is broken after the cert rotation. Docs still show the old ACS URL.",
    rationale:
      "SAML breakage after cert rotation plus stale docs is Authentication / negative.",
  },
  {
    themeId: "theme_authentication",
    sentiment: "negative",
    score: 0.16,
    featureArea: "Session",
    preferredChannel: "sales_note",
    content:
      "Champion at Cobalt said login reliability is now a procurement risk. They asked if we 'changed identity vendors.'",
    rationale:
      "Login reliability framed as buying risk is a high-severity Authentication signal.",
  },
  {
    themeId: "theme_authentication",
    sentiment: "mixed",
    score: 0.44,
    featureArea: "SSO",
    content:
      "SSO itself is fine when it works. The new 'verify your device' step is what keeps trapping people.",
    rationale:
      "Conditional praise with a new friction step keeps this mixed, still Authentication.",
  },
  {
    themeId: "theme_authentication",
    sentiment: "positive",
    score: 0.81,
    featureArea: "Passkeys",
    preferredChannel: "nps",
    content:
      "Passkeys for the admins who have them are excellent. Please make that the default, not a hidden flag.",
    rationale:
      "Praise plus a product request around passkeys is positive Authentication.",
  },
  {
    themeId: "theme_reporting",
    sentiment: "positive",
    score: 0.88,
    featureArea: "Saved views",
    preferredChannel: "nps",
    content:
      "Saved views for weekly ops review mean I stopped rebuilding the same filters every Monday. That's the product.",
    rationale:
      "Strong value language around a reporting workflow is positive Reporting.",
  },
  {
    themeId: "theme_reporting",
    sentiment: "negative",
    score: 0.24,
    featureArea: "Scheduling",
    preferredChannel: "support_ticket",
    content:
      "Scheduled PDF to leadership still arrives with last week's numbers. We've stopped trusting it.",
    rationale:
      "Stale scheduled report destroying trust is Reporting / negative.",
  },
  {
    themeId: "theme_reporting",
    sentiment: "mixed",
    score: 0.5,
    featureArea: "Filters",
    content:
      "Filters are powerful, but 'this quarter' still disagrees with our fiscal calendar. Finance will not use it.",
    rationale:
      "Capability exists but fiscal-calendar mismatch blocks a key audience — mixed Reporting.",
  },
  {
    themeId: "theme_reporting",
    sentiment: "negative",
    score: 0.22,
    featureArea: "Sharing",
    content:
      "Sharing a report with a viewer still requires them to have a full seat. That's why we screenshot Slack.",
    rationale:
      "Sharing restricted by seating is Reporting (with billing adjacency), negative tone.",
  },
  {
    themeId: "theme_reporting",
    sentiment: "positive",
    score: 0.8,
    featureArea: "Narrative",
    preferredChannel: "sales_note",
    content:
      "The narrative summary on the monthly pack is what our COO actually reads. Keep that.",
    rationale:
      "Executive consumption of narrative reporting is positive Reporting.",
  },
  {
    themeId: "theme_export",
    sentiment: "negative",
    score: 0.2,
    featureArea: "CSV",
    preferredChannel: "support_ticket",
    content:
      "CSV export truncates notes at 255 characters. The thing we need in the spreadsheet is in the truncated part.",
    rationale:
      "Incomplete export of the needed field is Export / negative.",
  },
  {
    themeId: "theme_export",
    sentiment: "negative",
    score: 0.19,
    featureArea: "PDF",
    preferredChannel: "community",
    content:
      "PDF export drops the last page of comments. Happens on anything over ~12 threads.",
    rationale:
      "Systematic missing pages on PDF is Export / negative.",
  },
  {
    themeId: "theme_export",
    sentiment: "mixed",
    score: 0.48,
    featureArea: "Columns",
    content:
      "Column picker is better, still cannot persist a default set per team. We remap it every Friday.",
    rationale:
      "Improvement with remaining persistence gap is mixed Export.",
  },
  {
    themeId: "theme_export",
    sentiment: "positive",
    score: 0.77,
    featureArea: "CSV",
    preferredChannel: "nps",
    content:
      "UTF-8 exports finally keep our customer names intact. That used to embarrass us in board packs.",
    rationale:
      "Specific encoding fix with business impact is positive Export.",
  },
  {
    themeId: "theme_export",
    sentiment: "negative",
    score: 0.17,
    featureArea: "Permissions",
    content:
      "Viewers can click Export, wait, then get a permissions error. Don't offer the button if it will fail.",
    rationale:
      "False affordance on export is Export / negative, and a clear UX defect.",
  },
  {
    themeId: "theme_support",
    sentiment: "negative",
    score: 0.18,
    featureArea: "Response time",
    preferredChannel: "nps",
    content:
      "P1 on billing sat for 11 hours with no update. We didn't need a fix in 11 hours. We needed a sentence.",
    rationale:
      "Silence on a high-severity ticket is Support / negative.",
  },
  {
    themeId: "theme_support",
    sentiment: "mixed",
    score: 0.49,
    featureArea: "Handoff",
    preferredChannel: "support_ticket",
    content:
      "Agent was excellent. Then it was reassigned and we repeated the entire SSO story to a new person.",
    rationale:
      "Praise for an agent plus a painful handoff is mixed Support.",
  },
  {
    themeId: "theme_support",
    sentiment: "positive",
    score: 0.9,
    featureArea: "Resolution",
    preferredChannel: "nps",
    content:
      "Jordan on support walked our admin through SAML until it worked, then sent a recap we could file. That's rare.",
    rationale:
      "Named, specific praise for resolution quality is strongly positive Support.",
  },
  {
    themeId: "theme_support",
    sentiment: "negative",
    score: 0.21,
    featureArea: "Status",
    preferredChannel: "community",
    content:
      "Status page said operational while login was down for us. Trust took a hit more than the outage itself.",
    rationale:
      "Mismatch between status communication and customer reality is Support / negative.",
  },
  {
    themeId: "theme_support",
    sentiment: "negative",
    score: 0.23,
    featureArea: "Macros",
    content:
      "Got a macro about 'clearing cache' on an invoice discrepancy. Felt like nobody read the ticket.",
    rationale:
      "Irrelevant canned response is Support / negative.",
  },
  {
    themeId: "theme_support",
    sentiment: "positive",
    score: 0.83,
    featureArea: "Follow-up",
    preferredChannel: "sales_note",
    content:
      "They followed up a week later to confirm the Salesforce mapping still held. That's why we expanded seats.",
    rationale:
      "Proactive follow-up tied to expansion is positive Support.",
  },
];
