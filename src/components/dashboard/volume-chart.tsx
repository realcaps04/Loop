"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardHeader } from "@/components/ui/card";
import type { VolumePoint } from "@/lib/types";

export function VolumeChart({ data }: { data: VolumePoint[] }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <Card className="h-full">
      <CardHeader
        title="Feedback volume"
        description="What arrived, and how the mix shifted."
      />
      <div className="h-[280px] px-2 pb-3 pt-2">
        {ready ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="loopNeg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C2410C" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="#C2410C" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="loopPos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0F766E" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#0F766E" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#F5F5F4" />
              <XAxis
                dataKey="label"
                tick={{ fill: "#A8A29A", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: "#A8A29A", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Tooltip content={<VolumeTooltip />} />
              <Area
                type="monotone"
                dataKey="negative"
                stackId="1"
                stroke="#C2410C"
                strokeWidth={1.5}
                fill="url(#loopNeg)"
                name="Negative"
              />
              <Area
                type="monotone"
                dataKey="neutral"
                stackId="1"
                stroke="#A8A29A"
                strokeWidth={1.5}
                fill="#F5F5F4"
                name="Neutral / mixed"
              />
              <Area
                type="monotone"
                dataKey="positive"
                stackId="1"
                stroke="#0F766E"
                strokeWidth={1.5}
                fill="url(#loopPos)"
                name="Positive"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : null}
      </div>
      <div className="flex gap-4 border-t border-line-subtle px-5 py-3 text-[11px] text-ink-muted">
        <LegendDot color="#C2410C" label="Negative" />
        <LegendDot color="#A8A29A" label="Neutral / mixed" />
        <LegendDot color="#0F766E" label="Positive" />
      </div>
    </Card>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="size-1.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function VolumeTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((sum, item) => sum + (item.value || 0), 0);
  return (
    <div className="rounded-md border border-line bg-white px-3 py-2 shadow-loop">
      <p className="text-[11px] text-ink-muted">{label}</p>
      <p className="mt-0.5 text-sm font-semibold tabular">{total} items</p>
      <div className="mt-1 space-y-0.5">
        {payload.map((item) => (
          <p key={item.name} className="text-[11px] text-ink-secondary">
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    </div>
  );
}
