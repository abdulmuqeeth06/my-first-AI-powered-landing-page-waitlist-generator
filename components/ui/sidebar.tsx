"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Layers, Users, DollarSign, Settings } from "lucide-react";

const items = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: Layers, label: "Landing Pages" },
  { icon: Users, label: "Waitlists" },
  { icon: DollarSign, label: "Revenue" },
];

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-6 top-6 bottom-6 w-64 glass rounded-3xl p-6"
    >
      <h1 className="text-xl font-semibold mb-10 tracking-wide">LaunchFast</h1>

      <nav className="space-y-4">
        {items.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-white/10 transition"
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <button className="group flex items-center gap-3 w-full px-4 py-3 rounded-xl
           hover:bg-white/10 transition
           hover:scale-[1.02]
           hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
>
          <Settings size={18} />
          Settings
        </button>
      </div>
    </motion.aside>
  );
}
