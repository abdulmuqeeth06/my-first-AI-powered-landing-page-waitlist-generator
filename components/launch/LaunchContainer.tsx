"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import SignalPhase from "./SignalPhase"
import AudiencePhase from "./AudiencePhase"
import ValuePhase from "./ValuePhase"
import IgnitionPhase from "./IgnitionPhase"

const phases = ["Signal", "Audience", "Value", "Ignition"]

export default function LaunchContainer() {
  const [phase, setPhase] = useState(0)

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 blur-3xl" />

      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-white/40">
        Phase {phase + 1} — {phases[phase]}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 flex h-full items-center justify-center"
        >
          {phase === 0 && <SignalPhase onNext={() => setPhase(1)} />}
          {phase === 1 && <AudiencePhase onNext={() => setPhase(2)} />}
          {phase === 2 && <ValuePhase onNext={() => setPhase(3)} />}
          {phase === 3 && <IgnitionPhase />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
