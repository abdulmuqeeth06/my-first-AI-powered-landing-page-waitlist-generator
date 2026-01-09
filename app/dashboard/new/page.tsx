"use client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabaseBrowser";

export default function NewPage() {
  async function save() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Not logged in");
      return;
    }

    const { error } = await supabase.from("landing_pages").insert([
      {
        user_id: user.id,
        product_name: "Test",
        description: "Test",
        audience: "Test",
        pricing: "one-time",
        slug: "test-" + Date.now(),
        headline: "Coming soon",
        subheadline: "Launching shortly",
        benefits: ["Fast"],
      },
    ]);

    if (error) alert(error.message);
    else alert("Saved");
  }

  return <button onClick={save}>Save</button>;
}
