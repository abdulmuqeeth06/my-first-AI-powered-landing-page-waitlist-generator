"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";

export default function NewLandingPage() {
  const supabase = getSupabaseClient();

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [headline, setHeadline] = useState("");
  const [pricing, setPricing] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setError(null);
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("landing_pages").insert({
      user_id: user.id,
      product_name: productName,
      description,
      audience,
      headline,
      pricing,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      alert("Landing page saved");
      setProductName("");
      setDescription("");
      setAudience("");
      setHeadline("");
      setPricing("");
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 600 }}>
      <h1>New Landing Page</h1>

      <input
        placeholder="Product name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <br />

      <textarea
        placeholder="Short description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />

      <input
        placeholder="Target audience (e.g. Gen Z founders)"
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
      />
      <br />

      <input
        placeholder="Headline"
        value={headline}
        onChange={(e) => setHeadline(e.target.value)}
      />
      <br />

      <input
        placeholder="Pricing (e.g. Free, $29/mo, One-time $49)"
        value={pricing}
        onChange={(e) => setPricing(e.target.value)}
      />
      <br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
