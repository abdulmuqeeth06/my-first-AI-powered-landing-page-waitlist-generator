"use client"

import { motion } from "framer-motion"

export default function PhaseShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl"
    >
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-white/50">{subtitle}</p>
      <div className="mt-10">{children}</div>
    </motion.div>
  )
}
