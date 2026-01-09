"use client";

import Sidebar from "@/components/ui/sidebar";
import StatCard from "@/components/ui/stat-card";
import GlassCard from "@/components/ui/glass-card";
import { stats, recentPage } from "@/lib/mock";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Sidebar />

      <main className="ml-[320px] p-12 space-y-12">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-semibold">Overview</h1>
          <p className="text-gray-400 mt-2">
            Everything you’re building, at a glance.
          </p>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* HERO CARD */}
        <GlassCard>
          <h2 className="text-xl font-semibold mb-4">Latest Landing Page</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg">{recentPage.name}</p>
              <p className="text-sm text-gray-400">
                Created {recentPage.createdAt}
              </p>
            </div>
            <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400">
              {recentPage.status}
            </span>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition">
              View
            </button>
            <button className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition">
              Edit
            </button>
            <button className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition">
              Share
            </button>
          </div>
        </GlassCard>
      </main>
    </div>
  );
}
