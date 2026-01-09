"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
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
    <form onSubmit={submit} style={{ padding: 40 }}>
      <h2>{mode === "signup" ? "Sign up" : "Login"}</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">
        {mode === "signup" ? "Create account" : "Login"}
      </button>

      <br />

      <button
        type="button"
        onClick={() =>
          setMode(mode === "signup" ? "login" : "signup")
        }
      >
        Switch to {mode === "signup" ? "login" : "signup"}
      </button>
    </form>
  );
}
