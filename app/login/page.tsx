"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabaseBrowser";

export default function LoginPage() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const fn =
      mode === "signup"
        ? supabase.auth.signUp
        : supabase.auth.signInWithPassword;

    const { error } = await fn({ email, password });

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard/new");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-96 space-y-4">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button className="bg-black text-white p-2 w-full">
          {mode === "signup" ? "Sign up" : "Login"}
        </button>

        <button
          type="button"
          className="text-sm underline"
          onClick={() =>
            setMode(mode === "signup" ? "login" : "signup")
          }
        >
          Switch to {mode === "signup" ? "login" : "signup"}
        </button>
      </form>
    </main>
  );
}
