"use client"

import PhaseShell from "./PhaseShell"

export default function SignalPhase({ onNext }: { onNext: () => void }) {
  return (
    <PhaseShell
      title="What are you launching?"
      subtitle="Name the signal you’re about to send into the market."
    >
      <input
        placeholder="LaunchFast"
        className="w-full bg-transparent border-b border-white/20 py-4 text-2xl outline-none placeholder:text-white/30"
      />

      <button
        onClick={onNext}
        className="mt-12 text-sm uppercase tracking-widest text-white/60 hover:text-white transition"
      >
        Continue →
      </button>
    </PhaseShell>
  )
}
