import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-50">
      <header className="border-b border-white/5">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-sm font-semibold text-blue-300 ring-1 ring-blue-500/40">
              LF
            </span>
            <span className="text-sm font-semibold tracking-tight text-slate-100">
              LaunchFast
            </span>
          </div>
          <nav className="flex items-center gap-4 text-sm text-slate-300">
            <Link
              href="/dashboard"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-50 shadow-sm transition hover:bg-white/10"
            >
              Go to dashboard
            </Link>
          </nav>
        </div>
      </header>

      <section className="flex flex-1 items-center">
        <div className="container grid gap-12 py-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:py-24">
          <div className="space-y-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs font-medium text-emerald-200">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Launch landing pages in minutes, not weeks.
            </p>
            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-50 md:text-5xl">
                Ship a polished landing page and waitlist before the idea goes
                cold.
              </h1>
              <p className="max-w-xl text-pretty text-sm text-slate-300 md:text-base">
                LaunchFast turns a few sentences about your product into a
                conversion-ready landing page, complete with email waitlist and
                optional Stripe checkout link—ready to share today.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full bg-blue-500 px-5 py-2.5 text-sm font-medium text-slate-50 shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
              >
                Start for free
              </Link>
              <span className="text-xs text-slate-400">
                No designers, no copywriters, no fuss.
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-500/10 via-emerald-400/5 to-transparent blur-3xl" />
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-2xl shadow-slate-950/80 backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div>
                  <p className="text-xs font-medium text-slate-200">
                    Example launch page
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Generated from 4 short inputs
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  Live preview
                </span>
              </div>
              <div className="space-y-3 pt-4 text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
                  Focus
                </p>
                <p className="text-sm font-semibold text-slate-50">
                  Clear copy, tight layout, zero friction.
                </p>
                <p className="text-xs text-slate-300">
                  LaunchFast writes the headline, bullets, CTA, and waitlist
                  form so you can focus on validating the idea instead of
                  polishing the page.
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-200">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>Conversion-minded copy tuned for SaaS and tools.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>Clean, responsive layout with a single clear CTA.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>Email waitlist wired into your dashboard.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


