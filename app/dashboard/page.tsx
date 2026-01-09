"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabase";

type LandingPage = {
  id: string;
  product_name: string;
  created_at: string;
};

export default function DashboardPage() {
  const supabase = getSupabaseClient();
  const router = useRouter();

  const [email, setEmail] = useState<string | null>(null);
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setEmail(user.email ?? null);

      const { data } = await supabase
        .from("landing_pages")
        .select("id, product_name, created_at")
        .order("created_at", { ascending: false });

      setPages(data ?? []);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return <div style={{ padding: 40 }}>Loading dashboard...</div>;
  }

  return (
    <div style={{ padding: 40, maxWidth: 900 }}>
      <h1>Dashboard</h1>
      <p>Logged in as: {email}</p>

      <div style={{ marginTop: 20 }}>
        <Link href="/dashboard/new">
          <button>Create new landing page</button>
        </Link>
      </div>

      <hr style={{ margin: "30px 0" }} />

      {pages.length === 0 ? (
        <p>No landing pages yet.</p>
      ) : (
        <ul>
          {pages.map((page) => (
            <li key={page.id} style={{ marginBottom: 10 }}>
              <strong>{page.product_name}</strong>
              <br />
              <small>
                Created: {new Date(page.created_at).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
