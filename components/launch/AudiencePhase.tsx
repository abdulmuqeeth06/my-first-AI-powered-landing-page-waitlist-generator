"use client"

import PhaseShell from "./PhaseShell"

export default function AudiencePhase({ onNext }: { onNext: () => void }) {
  return (
    <PhaseShell
      title="Who is this inevitable for?"
      subtitle="Precision creates power."
    >
      <textarea
        rows={3}
        placeholder="Indie founders and solo SaaS builders"
        className="w-full resize-none rounded-xl border border-white/10 bg-transparent p-4 text-lg outline-none placeholder:text-white/30"
      />

      <button
        onClick={onNext}
        className="mt-10 text-sm uppercase tracking-widest text-white/60 hover:text-white transition"
      >
        Continue →
      </button>
    </PhaseShell>
  )
}
