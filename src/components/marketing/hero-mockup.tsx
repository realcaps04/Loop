import {
  AcmeMark,
  IconBulb,
  IntercomMark,
  SalesforceMark,
  SlackMark,
  TeamsMark,
  ZendeskMark,
  ZapierMark,
  RaveMark,
  SpiralMark,
  LuminaMark,
  CloudixMark,
} from "@/components/marketing/logos";
import { hand } from "@/lib/fonts";

const TODAY = [
  {
    company: "Acme",
    Mark: AcmeMark,
    person: "Marley D.",
    snippet: "SSO never asked during setup. We lost two days in support.",
  },
  {
    company: "Spiral",
    Mark: SpiralMark,
    person: "April K.",
    snippet: "Approvals timeout at 9am — exactly when the ops team is in.",
  },
  {
    company: "Rave",
    Mark: RaveMark,
    person: "Jamie L.",
    snippet: "Walkthrough is nicer, still skips SSO and who approves what.",
  },
];

const YESTERDAY = [
  {
    company: "Lumina",
    Mark: LuminaMark,
    person: "Nora P.",
    snippet: "Onboarding emails land after the trial window closes.",
  },
  {
    company: "Cloudix",
    Mark: CloudixMark,
    person: "Evan R.",
    snippet: "Export stalls on accounts with more than 2k tickets.",
  },
];

const ICON = 48;
const CARD_X = 118;
const AVATAR_X = CARD_X + 20;

const RAIL = [
  {
    name: "Zapier",
    Mark: ZapierMark,
    x: 18,
    y: 20,
    endX: AVATAR_X,
    endY: 54,
  },
  {
    name: "Salesforce",
    Mark: SalesforceMark,
    x: 2,
    y: 92,
    endX: AVATAR_X,
    endY: 186,
  },
  {
    name: "Intercom",
    Mark: IntercomMark,
    x: 22,
    y: 158,
    endX: AVATAR_X,
    endY: 198,
  },
  {
    name: "Microsoft Teams",
    Mark: TeamsMark,
    x: 4,
    y: 226,
    endX: AVATAR_X,
    endY: 254,
  },
  {
    name: "Slack",
    Mark: SlackMark,
    x: 20,
    y: 292,
    endX: AVATAR_X,
    endY: 322,
  },
  {
    name: "Zendesk",
    Mark: ZendeskMark,
    x: 4,
    y: 358,
    endX: AVATAR_X,
    endY: 334,
  },
] as const;

function flowPath(item: (typeof RAIL)[number]) {
  const sx = item.x + ICON;
  const sy = item.y + ICON / 2;
  const dist = Math.hypot(item.endX - sx, item.endY - sy);
  const radius = Math.max(dist * 0.92, 48);
  const sweep = sy < item.endY ? 1 : 0;
  return `M ${sx} ${sy} A ${radius} ${radius} 0 0 ${sweep} ${item.endX} ${item.endY}`;
}

export function HeroMockup() {
  return (
    <div className="relative mx-auto h-[620px] w-full max-w-[640px] overflow-hidden sm:overflow-visible">
      <div className="pointer-events-none absolute -right-6 -top-8 h-[280px] w-[280px] rounded-full bg-[#E0F2FE] blur-3xl" />
      <div className="pointer-events-none absolute -left-10 top-10 h-[240px] w-[260px] rounded-[48%] bg-[#EDE9FE] blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-[18%] h-[240px] w-[180px]">
        <div className="absolute left-8 top-0 h-[180px] w-[140px] rounded-[78%_62%_68%_74%] bg-[#EDE9FE]" />
        <div className="absolute left-0 top-[52px] h-[168px] w-[148px] rounded-[64%_78%_70%_60%] bg-[#E8E4FD]" />
      </div>
      <div className="pointer-events-none absolute bottom-0 right-6 h-36 w-40 rounded-full bg-[#C7D2FE]/50 blur-2xl" />

      <div className="absolute left-[108px] right-2 top-3 h-[520px] sm:left-[118px] sm:right-[100px]">
        <div className="flex h-full flex-col rounded-[24px] border border-white bg-white p-5 shadow-[0_24px_70px_rgba(73,74,253,0.14)] ring-1 ring-[#494AFD]/10">
          <div className="flex h-[52px] items-center justify-between gap-3">
            <div>
              <p className="text-[11px] text-ink-faint">Customer Feedback</p>
              <p className="text-sm font-semibold text-navy">Assigned to me</p>
            </div>
            <div className="flex h-8 w-[118px] items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 text-[11px] text-ink-faint">
              <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
                <circle cx="7" cy="7" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="m10.4 10.4 3 3" />
              </svg>
              Search
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {["Any time", "Tier 1 customers", "Unprocessed"].map((filter) => (
              <span
                key={filter}
                className="rounded-full bg-[#EEF0FF] px-2.5 py-1 text-[11px] font-medium text-[#494AFD]"
              >
                {filter}
              </span>
            ))}
          </div>

          <p className="mb-2 mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Today
          </p>
          <ul className="space-y-3">
            {TODAY.map((item) => {
              const Mark = item.Mark;
              return (
                <li key={item.person} className="flex h-[56px] items-start gap-3">
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-900 ring-1 ring-slate-200">
                    <Mark className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-bold text-slate-900">
                      {item.company}
                      <span className="ml-1.5 font-normal text-ink-muted">
                        {item.person}
                      </span>
                      <span className="ml-1.5 rounded-full bg-[#EEF0FF] px-1.5 py-0.5 text-[10px] font-medium text-[#494AFD]">
                        Tier 1 customers
                      </span>
                    </p>
                    <p className="mt-0.5 truncate text-[12px] leading-relaxed text-ink-muted">
                      {item.snippet}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mb-2 mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Yesterday
          </p>
          <ul className="space-y-3">
            {YESTERDAY.map((item) => {
              const Mark = item.Mark;
              return (
                <li key={item.person} className="flex h-[56px] items-start gap-3">
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-900 ring-1 ring-slate-200">
                    <Mark className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-bold text-slate-900">
                      {item.company}
                      <span className="ml-1.5 font-normal text-ink-muted">
                        {item.person}
                      </span>
                      <span className="ml-1.5 rounded-full bg-[#EEF0FF] px-1.5 py-0.5 text-[10px] font-medium text-[#494AFD]">
                        Tier 1 customers
                      </span>
                    </p>
                    <p className="mt-0.5 truncate text-[12px] leading-relaxed text-ink-muted">
                      {item.snippet}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <svg
        className="pointer-events-none absolute inset-0 z-[5] hidden sm:block"
        viewBox="0 0 560 580"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden
      >
        {RAIL.map((item) => (
          <path
            key={item.name}
            d={flowPath(item)}
            stroke="#C5CDD6"
            strokeDasharray="0.9 5.2"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        ))}
      </svg>

      <div className="absolute inset-y-0 left-0 z-10 hidden sm:block">
        {RAIL.map((item) => {
          const Mark = item.Mark;
          return (
            <div
              key={item.name}
              className="absolute flex size-12 items-center justify-center rounded-full border border-white bg-white shadow-[0_10px_28px_rgba(15,23,42,0.10)]"
              style={{ top: item.y, left: item.x }}
              title={item.name}
            >
              <Mark className="size-5" />
            </div>
          );
        })}
      </div>

      <div className="pointer-events-none absolute right-0 top-2 z-20 hidden h-[120px] w-[140px] sm:block">
        <span className="absolute left-0 top-5 z-10 flex size-11 items-center justify-center rounded-full bg-white text-[#312E81] shadow-[0_0_0_8px_rgba(49,46,129,0.14)]">
          <IconBulb className="size-[22px]" />
        </span>
        <p
          className={`${hand.className} absolute left-[50px] top-1 w-[96px] origin-left rotate-[10deg] text-[21px] font-bold leading-[1.05] text-[#312E81]`}
        >
          Feedback in.
          <br />
          Insights out.
        </p>
        <svg
          viewBox="0 0 90 52"
          className="absolute left-[24px] top-[30px] h-12 w-[80px]"
          fill="none"
          aria-hidden
        >
          <defs>
            <marker
              id="note-arrow-top"
              markerWidth="9"
              markerHeight="9"
              refX="6.5"
              refY="4.5"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path
                d="M1 1 L7.5 4.5 L1 8"
                fill="none"
                stroke="#312E81"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>
          <path
            d="M80 8 C 62 14, 40 34, 14 34"
            stroke="#312E81"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="2.6 5.2"
            markerEnd="url(#note-arrow-top)"
          />
        </svg>
      </div>

      <div className="pointer-events-none absolute bottom-[118px] right-0 z-20 hidden w-[128px] sm:block">
        <svg
          viewBox="0 0 120 70"
          className="absolute -left-[84px] top-0 h-16 w-[104px]"
          fill="none"
          aria-hidden
        >
          <defs>
            <marker
              id="note-arrow-bottom"
              markerWidth="9"
              markerHeight="9"
              refX="6.5"
              refY="4.5"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path
                d="M1 1 L7.5 4.5 L1 8"
                fill="none"
                stroke="#312E81"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>
          <path
            d="M108 58 C 78 56, 42 28, 16 12"
            stroke="#312E81"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="2.6 5.4"
            markerEnd="url(#note-arrow-bottom)"
          />
        </svg>
        <p
          className={`${hand.className} -rotate-[8deg] text-[17px] font-bold leading-[1.12] text-[#312E81]`}
        >
          <span className="block whitespace-nowrap">Understand what your</span>
          <span className="block whitespace-nowrap">customers really want.</span>
        </p>
      </div>
    </div>
  );
}
