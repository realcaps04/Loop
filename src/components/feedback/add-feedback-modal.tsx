"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/components/providers/app-state";
import { createClient } from "@/lib/supabase/client";
import { canIngest } from "@/lib/format";
import type { Channel, Feedback, Sentiment } from "@/lib/types";

function guessSentiment(text: string): Sentiment {
  const lower = text.toLowerCase();
  const negative = ["bug", "slow", "broken", "hate", "frustrated", "crash", "issue"];
  const positive = ["love", "great", "amazing", "helpful", "awesome", "perfect"];
  if (negative.some((w) => lower.includes(w))) return "negative";
  if (positive.some((w) => lower.includes(w))) return "positive";
  return "neutral";
}

function initials(label: string) {
  const parts = label.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return (label.slice(0, 2) || "C").toUpperCase();
}

export function AddFeedbackModal() {
  const {
    addFeedbackOpen,
    setAddFeedbackOpen,
    addFeedbackItem,
    notify,
    session,
  } = useAppState();
  const ingest = session ? canIngest(session.user.role) : false;
  const [content, setContent] = useState("");
  const [channel, setChannel] = useState<Channel>("support_ticket");
  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [saving, setSaving] = useState(false);

  function reset() {
    setContent("");
    setCustomer("");
    setEmail("");
    setSource("");
    setChannel("support_ticket");
    setSaving(false);
  }

  async function commit() {
    if (!session || !ingest) return;
    if (content.trim().length < 8) {
      notify({
        tone: "error",
        title: "Feedback is too short",
        description: "Add the original customer wording.",
      });
      return;
    }

    setSaving(true);
    const label = customer.trim() || "Customer";
    const sentiment = guessSentiment(content);
    const supabase = createClient();

    const { data, error } = await supabase
      .from("feedback")
      .insert({
        workspace_id: session.workspace.id,
        content: content.trim(),
        customer_label: label,
        customer_initials: initials(label),
        customer_email: email.trim(),
        sentiment,
        channel,
        source_ref: source.trim(),
        created_by: session.user.id,
        assignee_id: session.user.id,
      })
      .select("id, content, created_at")
      .single();

    if (error) {
      setSaving(false);
      notify({
        tone: "error",
        title: "Could not save feedback",
        description: error.message,
      });
      return;
    }

    await supabase.from("feedback_activity").insert({
      feedback_id: data.id,
      workspace_id: session.workspace.id,
      actor_id: session.user.id,
      action: "created",
      detail: "added this feedback",
    });

    setSaving(false);

    const local: Feedback = {
      id: data.id,
      content: data.content,
      channel,
      sourceRef: source.trim() || "manual",
      customerLabel: label,
      sentiment,
      sentimentScore: sentiment === "positive" ? 0.8 : sentiment === "negative" ? 0.2 : 0.5,
      status: "NEW",
      createdAt: data.created_at,
      workspaceId: session.workspace.id,
      themeIds: [],
      featureArea: "",
      aiRationale: "Saved to your workspace.",
    };

    addFeedbackItem(local);
    notify({
      tone: "success",
      title: "Feedback added",
      description: "It now appears in your Overview and Feedback inbox.",
    });
    setAddFeedbackOpen(false);
    reset();
  }

  if (!session) return null;

  return (
    <Modal
      open={addFeedbackOpen}
      onOpenChange={(open) => {
        setAddFeedbackOpen(open);
        if (!open) reset();
      }}
      title="Collect feedback"
      description="Paste original customer wording into this workspace."
    >
      {!ingest ? (
        <p className="rounded-md bg-line-subtle px-3 py-2 text-sm text-ink-secondary">
          Only analysts and admins can ingest feedback.
        </p>
      ) : (
        <div className="space-y-3">
          <label className="block text-[13px] font-medium">
            Feedback content
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={5}
              placeholder="What did the customer actually say?"
              className="mt-1.5 w-full rounded-xl border border-line px-3 py-2 text-sm outline-none focus:border-accent focus:ring-4 focus:ring-accent/15"
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-[13px] font-medium">
              Channel
              <select
                value={channel}
                onChange={(event) => setChannel(event.target.value as Channel)}
                className="mt-1.5 h-10 w-full rounded-xl border border-line bg-white px-3 text-sm"
              >
                <option value="support_ticket">Support ticket</option>
                <option value="app_store">App Store</option>
                <option value="nps">NPS</option>
                <option value="sales_note">Sales note</option>
                <option value="community">Community</option>
              </select>
            </label>
            <label className="text-[13px] font-medium">
              Customer
              <input
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                placeholder="Jordan Lee"
                className="mt-1.5 h-10 w-full rounded-xl border border-line px-3 text-sm outline-none focus:border-accent focus:ring-4 focus:ring-accent/15"
              />
            </label>
            <label className="text-[13px] font-medium">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jordan@company.com"
                className="mt-1.5 h-10 w-full rounded-xl border border-line px-3 text-sm outline-none focus:border-accent focus:ring-4 focus:ring-accent/15"
              />
            </label>
          </div>
          <label className="block text-[13px] font-medium">
            Source reference
            <input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Ticket #1842"
              className="mt-1.5 h-10 w-full rounded-xl border border-line px-3 text-sm outline-none focus:border-accent focus:ring-4 focus:ring-accent/15"
            />
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="secondary"
              onClick={() => setAddFeedbackOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => void commit()} disabled={saving}>
              {saving ? "Saving…" : "Save feedback"}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
