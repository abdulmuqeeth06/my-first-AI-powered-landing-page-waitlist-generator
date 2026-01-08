import Link from "next/link";

export default function DashboardPage() {
  // Placeholder static dashboard shell; data wiring is added in server/client components later.
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
          <div className="flex items-center gap-3 text-xs">
            <button className="rounded-full border border-slate-700 px-3 py-1.5 text-slate-200 hover:border-slate-500">
              Sign out
            </button>
          </div>
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
      </section>
    </main>
  );
}


