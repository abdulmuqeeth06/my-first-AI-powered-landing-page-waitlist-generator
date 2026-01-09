"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase";

export default function DashboardPage() {
  const supabase = getSupabaseClient();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login");
      } else {
        setUserEmail(data.user.email ?? null);
      }
    });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>Logged in as: {userEmail}</p>
    </div>
  );
}
