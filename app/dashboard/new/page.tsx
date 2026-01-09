"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

type GeneratedCopy = {
  headline: string;
  subheadline: string;
  benefits: string[];
  cta: string;
  faq?: { question: string; answer: string }[];
};

export default function NewLandingPage() {
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [pricing, setPricing] = useState<
    "free" | "one-time" | "subscription" | "undecided"
  >("undecided");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      router.replace("/login");
      return;
    }
    const userId = sessionData.session.user.id;

    try {
      const resp = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          description,
          audience,
          pricing,
        }),
      });
      const payload = await resp.json();
      if (!resp.ok) {
        throw new Error(payload.error || "Failed to generate copy");
      }
      const copy = payload.copy as GeneratedCopy;

      const slug =
        productName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "") || `page-${Date.now()}`;

      const { error: insertError } = await supabase.from("landing_pages").insert({
        user_id: userId,
        product_name: productName,
        description,
        audience,
        pricing,
        slug,
        headline: copy.headline,
        subheadline: copy.subheadline,
        benefits: copy.benefits,
        cta: copy.cta,
        faq: copy.faq || null,
      });

      if (insertError) {
        throw new Error(insertError.message);
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="container py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">
            Create a landing page
          </h1>
          <p className="text-sm text-slate-400">
            Four inputs to generate copy, layout, and waitlist.
          </p>
        </div>

        <form
          onSubmit={handleGenerate}
          className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
        >
          <div>
            <label className="text-xs text-slate-300">Product name</label>
            <input
              className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-xs text-slate-300">Short description</label>
            <textarea
              className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-xs text-slate-300">Target audience</label>
            <input
              className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-xs text-slate-300">Pricing idea</label>
            <select
              className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
              value={pricing}
              onChange={(e) =>
                setPricing(
                  e.target.value as
                    | "free"
                    | "one-time"
                    | "subscription"
                    | "undecided",
                )
              }
            >
              <option value="free">Free</option>
              <option value="one-time">One-time</option>
              <option value="subscription">Subscription</option>
              <option value="undecided">Undecided</option>
            </select>
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? "Generating..." : "Generate & save"}
            </Button>
            <button
              type="button"
              className="text-sm text-slate-300 hover:text-white"
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

