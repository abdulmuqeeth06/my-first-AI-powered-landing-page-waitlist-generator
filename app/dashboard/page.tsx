"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type LandingPage = {
  id: string;
  product_name: string;
  audience: string;
  pricing: string;
  created_at: string;
};

export default function DashboardPage() {
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) setEmail(user.email);

      const { data } = await supabase
        .from("landing_pages")
        .select("id, product_name, audience, pricing, created_at")
        .order("created_at", { ascending: false });

      if (data) setPages(data);
      setLoading(false);
    };

    load();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-8 py-10">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">
            Logged in as {email}
          </p>
        </div>

        <Link
          href="/dashboard/new"
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition"
        >
          + New landing page
        </Link>
      </header>

      {/* Content */}
      {loading ? (
        <p className="text-slate-400">Loading your landing pages…</p>
      ) : pages.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-8 text-center">
          <p className="text-lg font-medium">No landing pages yet</p>
          <p className="text-sm text-slate-400 mt-1">
            Create your first one to get started
          </p>

          <Link
            href="/dashboard/new"
            className="inline-block mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            Create landing page
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <div
              key={page.id}
              className="rounded-2xl border border-white/10 bg-slate-900 p-5 hover:border-blue-500/50 transition"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">
                  {page.product_name}
                </h3>
                <span className="rounded-md bg-blue-500/10 px-2 py-1 text-xs text-blue-300">
                  {page.pricing}
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-400">
                Audience: {page.audience}
              </p>

              <p className="mt-4 text-xs text-slate-500">
                Created{" "}
                {new Date(page.created_at).toLocaleDateString()}
              </p>

              <div className="mt-5 flex gap-3">
                <button className="flex-1 rounded-lg bg-white/5 py-2 text-sm hover:bg-white/10">
                  Preview
                </button>
                <button className="flex-1 rounded-lg bg-white/5 py-2 text-sm hover:bg-white/10">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
