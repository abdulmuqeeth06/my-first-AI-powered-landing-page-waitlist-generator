import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <h1>LaunchFast</h1>
      <Link href="/login">Get Started</Link>
    </main>
  );
}
