 "use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

type LandingPage = {
  id: string;
  user_id: string;
  product_name: string;
  description: string;
  audience: string;
  pricing: string;
  slug: string;
  headline: string;
  subheadline: string;
  benefits: string[];
  cta: string;
  faq: { question: string; answer: string }[] | null;
  stripe_price_id?: string | null;
  created_at?: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        router.replace("/login");
        return;
      }
      const userId = sessionData.session.user.id;
      const { data, error } = await supabase
        .from("landing_pages")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) {
        setError(error.message);
      } else {
        setPages(data || []);
      }
      setLoading(false);
    };
    load();
  }, [router, supabase]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-xs font-semibold text-blue-300 ring-1 ring-blue-500/40">
              LF
            </span>
            <span className="text-sm font-semibold tracking-tight text-slate-100">
              LaunchFast
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              await supabase.auth.signOut();
              router.replace("/login");
            }}
          >
            Sign out
          </Button>
        </div>
      </header>

      <section className="container py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-50 md:text-2xl">
              Your landing pages
            </h1>
            <p className="mt-1 text-xs text-slate-400 md:text-sm">
              Capture demand as soon as the idea appears. Generate a new page in
              under a minute.
            </p>
          </div>
          <Link
            href="/dashboard/new"
            className="inline-flex items-center justify-center rounded-full bg-blue-500 px-4 py-2 text-xs font-medium text-slate-50 shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 md:text-sm"
          >
            New landing page
          </Link>
        </div>

        {loading ? (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center text-sm text-slate-300">
            Loading your pages...
          </div>
        ) : error ? (
          <div className="mt-8 rounded-2xl border border-red-500/40 bg-red-500/10 p-6 text-center text-sm text-red-200">
            {error}
          </div>
        ) : pages.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-6 text-center">
            <p className="text-sm font-medium text-slate-100">
              No landing pages yet
            </p>
            <p className="mt-1 text-xs text-slate-400 md:text-sm">
              Start with one idea, one page, and a simple waitlist. Everything
              else comes later.
            </p>
            <Link
              href="/dashboard/new"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-blue-500 px-4 py-2 text-xs font-medium text-slate-50 shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
            >
              Create your first page
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {pages.map((page) => (
              <div
                key={page.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-blue-300">
                      {page.pricing}
                    </p>
                    <h2 className="text-lg font-semibold text-white">
                      {page.product_name}
                    </h2>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {page.subheadline}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Link
                      href={`/l/${page.slug}`}
                      className="text-xs text-blue-300 hover:text-blue-200"
                    >
                      View page
                    </Link>
                    <Link
                      href={`/dashboard/waitlist/${page.id}`}
                      className="text-xs text-slate-300 hover:text-white"
                    >
                      Waitlist
                    </Link>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-300">
                  {page.benefits?.slice(0, 4).map((b, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-slate-700 px-2 py-1"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400">
                  <span
                    className={clsx(
                      "inline-flex h-2 w-2 rounded-full",
                      page.stripe_price_id ? "bg-emerald-400" : "bg-slate-500",
                    )}
                  />
                  {page.stripe_price_id
                    ? "Stripe checkout enabled"
                    : "Stripe not configured"}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
