"use client"

import PhaseShell from "./PhaseShell"

export default function ValuePhase({ onNext }: { onNext: () => void }) {
  return (
    <PhaseShell
      title="Why does this exist?"
      subtitle="Describe the outcome, not the features."
    >
      <textarea
        rows={4}
        placeholder="Launch a high-converting waitlist page in minutes, not weeks."
        className="w-full resize-none rounded-xl border border-white/10 bg-transparent p-4 text-lg outline-none placeholder:text-white/30"
      />

      <button
        onClick={onNext}
        className="mt-10 text-sm uppercase tracking-widest text-white/60 hover:text-white transition"
      >
        Initiate →
      </button>
    </PhaseShell>
  )
}
