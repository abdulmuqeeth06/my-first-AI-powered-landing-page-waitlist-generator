"use client";

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseBrowser";

export default function NewLandingPage() {
  const supabase = getSupabaseBrowserClient();

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [pricing, setPricing] = useState("one-time");
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Not authenticated");
      return;
    }

    const slug = productName.toLowerCase().replace(/\s+/g, "-");

    const { error } = await (supabase as any)
  .from("landing_pages")
  .insert([
    {
      user_id: user.id,
      product_name: productName,
      description,
      audience,
      pricing,
      slug,
      headline: "Coming soon",
      subheadline: "Launching shortly",
      benefits: ["Fast", "Simple", "AI-powered"],
    },
  ]);

    if (error) {
      setError(error.message);
    } else {
      alert("Landing page saved!");
    }
  }

  return (
    <main className="p-8 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Create landing page</h1>

      <input
        placeholder="Product name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="border p-2 w-full"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        placeholder="Audience"
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
        className="border p-2 w-full"
      />

      <select
        value={pricing}
        onChange={(e) => setPricing(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="one-time">One-time</option>
        <option value="subscription">Subscription</option>
      </select>

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white p-2 w-full"
      >
        Generate & Save
      </button>
    </main>
  );
}
