"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function WaitlistForm({ pageId }: { pageId: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const resp = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageId, email }),
    });
    const data = await resp.json();
    if (!resp.ok) {
      setError(data.error || "Failed to join waitlist");
      setStatus("error");
      return;
    }
    setStatus("done");
    setEmail("");
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
      />
      {error && (
        <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
          {error}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {status === "done"
          ? "Added to waitlist"
          : status === "loading"
            ? "Saving..."
            : "Join waitlist"}
      </Button>
      <p className="text-[11px] text-slate-400">
        No spam. One email when we launch.
      </p>
    </form>
  );
}

