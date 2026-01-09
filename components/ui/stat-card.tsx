import { motion } from "framer-motion";

export default function StatCard({ label, value }: { label: string; value: any }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="glass rounded-2xl p-6 glow"
    >
      <p className="text-sm text-gray-400">{label}</p>
      <h3 className="text-2xl font-semibold mt-2">{value}</h3>
    </motion.div>
  );
}
