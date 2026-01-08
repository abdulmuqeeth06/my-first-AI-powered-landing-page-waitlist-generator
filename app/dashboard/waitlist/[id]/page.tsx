import { createServiceSupabaseClient } from "@/lib/supabaseServer";
import Link from "next/link";

export default async function WaitlistPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServiceSupabaseClient();
  const { data: page, error: pageError } = await supabase
    .from("landing_pages")
    .select("id, product_name, slug")
    .eq("id", params.id)
    .maybeSingle();

  const { data: signups } = await supabase
    .from("waitlist_signups")
    .select("*")
    .eq("landing_page_id", params.id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="container py-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Waitlist</p>
            <h1 className="text-2xl font-semibold text-white">
              {page?.product_name || "Landing page"}
            </h1>
          </div>
          <Link
            href={`/l/${page?.slug || ""}`}
            className="text-sm text-blue-300 hover:text-blue-200"
          >
            View public page
          </Link>
        </div>

        {pageError ? (
          <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
            {pageError.message}
          </div>
        ) : signups && signups.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-sm">
              <thead className="bg-slate-900/80 text-slate-300">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Email</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {signups.map((s) => (
                  <tr key={s.id} className="border-t border-slate-800">
                    <td className="px-4 py-3 text-slate-100">{s.email}</td>
                    <td className="px-4 py-3 text-slate-400">
                      {s.created_at
                        ? new Date(s.created_at).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-300">
            No waitlist signups yet.
          </div>
        )}
      </div>
    </main>
  );
}

