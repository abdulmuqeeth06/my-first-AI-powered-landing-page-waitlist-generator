"use client"

import { motion } from "framer-motion"

export default function IgnitionPhase() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        className="h-24 w-24 rounded-full border border-white/20"
      />

      <p className="text-white/60 tracking-wide">
        Composing your landing page…
      </p>

      <p className="text-xs uppercase tracking-widest text-white/30">
        This usually takes a few seconds
      </p>
    </div>
  )
}
