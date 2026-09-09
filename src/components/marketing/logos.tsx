import { cn } from "@/lib/cn";

type MarkProps = { className?: string };

export function SalesforceMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-6", className)} aria-hidden>
      <path
        fill="#00A1E0"
        d="M8.6 17.8h7.7c1.8 0 3.4-1.4 3.4-3.3 0-1.5-1.1-2.9-2.6-3.2-.2-2-1.9-3.6-4.1-3.6-1.3 0-2.6.6-3.5 1.6-.7-1.2-2-2-3.5-2C3.8 7.3 2 9 2 11.2c0 1.8 1.2 3.3 2.9 3.8.2 1.6 1.6 2.8 3.3 2.8h.4Z"
      />
    </svg>
  );
}

export function SlackMark({ className }: MarkProps) {
  return (
    <svg viewBox="-1 -1 26 26" className={cn("size-6", className)} aria-hidden>
      <path
        fill="#E01E5A"
        d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"
      />
      <path fill="#36C5F0" d="M8.834 5.042a2.527 2.527 0 0 1-2.521-2.52A2.527 2.527 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834Zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312Z" />
      <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834Zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312Z" />
      <path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.528 0 0 1-2.52-2.522v-2.522h2.52Zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313Z" />
    </svg>
  );
}

export function TeamsMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-6", className)} aria-hidden>
      <rect x="2" y="5" width="14.5" height="14.5" rx="3.2" fill="#5059C9" />
      <path
        fill="#fff"
        d="M8.1 9.1h2.3c1.6 0 2.6.8 2.6 2.2 0 1-.5 1.6-1.3 1.9l1.5 2.7h-1.9l-1.3-2.5H9.6v2.5H8.1V9.1Zm1.5 1.2v1.7h.7c.7 0 1.1-.3 1.1-.9s-.4-.8-1.1-.8h-.7Z"
      />
      <circle cx="18.2" cy="9.4" r="2.35" fill="#7B83EB" />
      <path fill="#7B83EB" d="M14.8 19.2c.5-2.1 2.2-3.3 4.1-3.3 2 0 3.6 1.2 4.1 3.3v.6h-8.2v-.6Z" />
    </svg>
  );
}

export function ZendeskMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-6", className)} aria-hidden>
      <path
        fill="#03363D"
        d="M12 2.2 4.4 8.4v7.2L12 21.8l7.6-6.2V8.4L12 2.2Zm0 3.4 4.7 3.8v5.2L12 18.4 7.3 14.6V9.4L12 5.6Z"
      />
      <path fill="#03363D" d="M12 9.2 9.2 12l2.8 2.8 2.8-2.8-2.8-2.8Z" />
    </svg>
  );
}

export function IntercomMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-6", className)} aria-hidden>
      <rect x="2" y="3.2" width="20" height="17.6" rx="5.2" fill="#1F8DED" />
      <circle cx="8" cy="11.2" r="1.15" fill="#fff" />
      <circle cx="12" cy="11.2" r="1.15" fill="#fff" />
      <circle cx="16" cy="11.2" r="1.15" fill="#fff" />
    </svg>
  );
}

export function ZapierMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-6", className)} aria-hidden>
      <path
        fill="#FF4A00"
        d="M12 2.1c.4 2.6 1.3 4.6 2.8 6.1 1.5 1.5 3.5 2.4 6.1 2.8-.4.4-2.6 1.3-6.1 2.8-1.5 1.5-2.4 3.5-2.8 6.1-.4-2.6-1.3-4.6-2.8-6.1C7.7 12.3 7.2 11.2 3.1 11c2.6-.4 4.6-1.3 6.1-2.8C10.7 6.7 11.6 4.7 12 2.1Z"
      />
    </svg>
  );
}

export function AcmeMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden>
      <path fill="currentColor" d="M12 3.2 21 20.2H3L12 3.2Zm0 5.4L7.3 18.2h9.4L12 8.6Z" />
    </svg>
  );
}

export function SpiralMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} fill="none" aria-hidden>
      <path
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="M12 19.5c-4.1 0-7-2.8-7-6.4 0-4.4 3.8-6.6 7-6.6 2.9 0 5.2 1.6 5.2 4.1 0 2.6-2.1 3.8-4.4 3.8-1.9 0-3.2-1-3.2-2.6 0-1.5 1.2-2.3 2.6-2.3"
      />
    </svg>
  );
}

export function RaveMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden>
      {Array.from({ length: 9 }).map((_, i) => (
        <circle
          key={i}
          cx={6.5 + (i % 3) * 5.5}
          cy={6.5 + Math.floor(i / 3) * 5.5}
          r="1.45"
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

export function LuminaMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3.2" fill="currentColor" />
      <circle cx="12" cy="12" r="7.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        d="M12 2.8v2.2M12 19v2.2M2.8 12h2.2M19 12h2.2"
      />
    </svg>
  );
}

export function CloudixMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden>
      <path
        fill="currentColor"
        d="M8.2 18.2h9.1c2.3 0 4.1-1.8 4.1-4.1 0-2-1.5-3.7-3.4-4-.5-2.5-2.7-4.4-5.4-4.4-2.2 0-4.1 1.3-5 3.2-2.3.3-4.1 2.2-4.1 4.6 0 2.6 2.1 4.7 4.7 4.7Z"
      />
    </svg>
  );
}

export function NimbusMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

export const TRUST_LOGOS = [
  { name: "Acme", Mark: AcmeMark },
  { name: "Spiral", Mark: SpiralMark },
  { name: "Rave", Mark: RaveMark },
  { name: "Lumina", Mark: LuminaMark },
  { name: "Cloudix", Mark: CloudixMark },
  { name: "Nimbus", Mark: NimbusMark },
] as const;

export const INTEGRATIONS = [
  { name: "Zapier", Mark: ZapierMark },
  { name: "Salesforce", Mark: SalesforceMark },
  { name: "Intercom", Mark: IntercomMark },
  { name: "Microsoft Teams", Mark: TeamsMark },
  { name: "Slack", Mark: SlackMark },
  { name: "Zendesk", Mark: ZendeskMark },
] as const;

export function IconBulb({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} fill="none" aria-hidden>
      <path
        stroke="currentColor"
        strokeWidth="1.7"
        d="M8.4 14.4a5.6 5.6 0 1 1 7.2 0c-.8.7-1.3 1.6-1.4 2.6H9.8c-.1-1-.6-1.9-1.4-2.6Z"
      />
      <path stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" d="M10 20h4M10.6 22h2.8" />
    </svg>
  );
}

export function SparkleIcon({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 16 16" className={cn("size-3.5", className)} aria-hidden>
      <path
        fill="currentColor"
        d="M8 1.2 9.1 6 14 7.2 9.1 8.4 8 13.2 6.9 8.4 2 7.2 6.9 6 8 1.2Z"
      />
    </svg>
  );
}

export function IconInbox({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} fill="none" aria-hidden>
      <path
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        d="M3.8 13.2 5.4 5.8A2 2 0 0 1 7.4 4.3h9.2a2 2 0 0 1 2 1.5l1.6 7.4"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        d="M3.8 13.2h4.1l.7 1.6h6.8l.7-1.6h4.1V18a2 2 0 0 1-2 2H5.8a2 2 0 0 1-2-2v-4.8Z"
      />
    </svg>
  );
}

export function IconBolt({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden>
      <path
        fill="currentColor"
        d="M13.2 3 6 13.2h5.1L9.6 21 18 10.6h-5.2L13.2 3Z"
      />
    </svg>
  );
}

export function IconBars({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden>
      <path fill="currentColor" d="M5 18.5V11h2.4v7.5H5Zm5.8 0V6h2.4v12.5h-2.4Zm5.8 0V13H19v5.5h-2.4Z" />
    </svg>
  );
}

export function IconTarget({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function IconLayers({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} fill="none" aria-hidden>
      <path stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" d="m12 4 8 4.2-8 4.2L4 8.2 12 4Z" />
      <path stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" d="m5.2 12.4 6.8 3.6 6.8-3.6M5.2 15.8 12 19.4l6.8-3.6" />
    </svg>
  );
}

export function IconTrend({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} fill="none" aria-hidden>
      <path stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" d="M4 16.5 9.2 11l3.4 3.2L20 7.5" />
      <path stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" d="M14.5 7.5H20v5.4" />
    </svg>
  );
}

export function IconReport({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} fill="none" aria-hidden>
      <path stroke="currentColor" strokeWidth="1.7" d="M7.2 4.5h7.2L20 9.8V19a1.5 1.5 0 0 1-1.5 1.5H7.2A1.5 1.5 0 0 1 5.7 19V6a1.5 1.5 0 0 1 1.5-1.5Z" />
      <path stroke="currentColor" strokeWidth="1.7" d="M14.4 4.5V9h4.8M8.6 13h6.8M8.6 16.2h4.4" />
    </svg>
  );
}

export function IconUsers({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} fill="none" aria-hidden>
      <circle cx="9" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.7" />
      <path stroke="currentColor" strokeWidth="1.7" d="M4.8 19c.4-2.6 2.4-4 4.2-4s3.8 1.4 4.2 4" />
      <circle cx="16.2" cy="9.4" r="2.1" stroke="currentColor" strokeWidth="1.7" />
      <path stroke="currentColor" strokeWidth="1.7" d="M15.4 15.2c1.8.2 3.4 1.4 3.8 3.8" />
    </svg>
  );
}
