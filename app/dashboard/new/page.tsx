"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";

export default function NewLandingPage() {
  const supabase = getSupabaseClient();

  const [productName, setProductName] = useState("");
  const [headline, setHeadline] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Not authenticated");
      return;
    }

    const { error } = await supabase.from("landing_pages").insert({
      user_id: user.id,
      product_name: productName,
      headline,
    });

    if (error) {
      setError(error.message);
    } else {
      alert("Saved");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>New Landing Page</h1>

      <input
        placeholder="Product name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <br />

      <input
        placeholder="Headline"
        value={headline}
        onChange={(e) => setHeadline(e.target.value)}
      />
      <br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleSave}>Save</button>
    </div>
  );
}
