import { createServiceSupabaseClient } from "@/lib/supabaseServer";
import WaitlistForm from "./waitlist-form";
import Link from "next/link";

export default async function PublicLandingPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createServiceSupabaseClient();
  const { data: page } = await supabase
    .from("landing_pages")
    .select("*")
    .eq("slug", params.slug)
    .maybeSingle();

  if (!page) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-slate-400">Landing page not found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-white/5">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-sm font-semibold text-blue-300 ring-1 ring-blue-500/40">
              LF
            </span>
            <span className="text-sm font-semibold tracking-tight text-slate-100">
              {page.product_name}
            </span>
          </div>
          <Link
            href="/"
            className="text-xs text-slate-300 hover:text-white border border-white/10 rounded-full px-3 py-1.5"
          >
            Powered by LaunchFast
          </Link>
        </div>
      </header>

      <section className="container py-14 md:py-20 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-[11px] font-medium text-emerald-200">
            Built for {page.audience}
          </p>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight text-white">
              {page.headline}
            </h1>
            <p className="text-base text-slate-300">{page.subheadline}</p>
          </div>

          <div className="grid gap-3">
            {page.benefits?.map((b: string, idx: number) => (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100"
              >
                {b}
              </div>
            ))}
          </div>

          {page.faq && page.faq.length > 0 && (
            <div className="mt-6 space-y-3">
              <h2 className="text-sm font-semibold text-slate-200">FAQ</h2>
              {page.faq.map(
                (
                  f: { question: string; answer: string },
                  idx: number,
                ) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-white">
                      {f.question}
                    </p>
                    <p className="text-xs text-slate-300 mt-1">{f.answer}</p>
                  </div>
                ),
              )}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl shadow-slate-950/70">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-white">
              Join the waitlist
            </p>
            <p className="text-xs text-slate-400">
              Be first to know when {page.product_name} is live.
            </p>
          </div>
          <div className="mt-4">
            <WaitlistForm pageId={page.id} />
          </div>
          <div className="mt-4 text-[11px] text-slate-400">
            Pricing idea: {page.pricing}
          </div>
        </div>
      </section>
    </main>
  );
}

