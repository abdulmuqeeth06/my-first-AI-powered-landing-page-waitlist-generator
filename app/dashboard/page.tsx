"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NewLandingPage() {
  const [product, setProduct] = useState("");
  const [desc, setDesc] = useState("");
  const [audience, setAudience] = useState("");
  const [pricing, setPricing] = useState("one-time");
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Not logged in");
      return;
    }

    const slug = product.toLowerCase().replace(/\s+/g, "-");

    const { error } = await supabase
      .from("landing_pages")
      .insert([
        {
          user_id: user.id,
          product_name: product,
          description: desc,
          audience,
          pricing,
          slug,
          headline: "Coming soon",
          subheadline: "Launching shortly",
          benefits: ["Fast", "Simple"],
        },
      ]);

    if (error) {
      setError(error.message);
    } else {
      alert("Saved successfully");
    }
  }

  return (
    <main style={{ padding: 40 }}>
      <h2>Create landing page</h2>

      <input placeholder="Product" onChange={e => setProduct(e.target.value)} />
      <br />

      <textarea placeholder="Description" onChange={e => setDesc(e.target.value)} />
      <br />

      <input placeholder="Audience" onChange={e => setAudience(e.target.value)} />
      <br />

      <select onChange={e => setPricing(e.target.value)}>
        <option value="one-time">One-time</option>
        <option value="subscription">Subscription</option>
      </select>

      <br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={save}>Generate & Save</button>
    </main>
  );
}
