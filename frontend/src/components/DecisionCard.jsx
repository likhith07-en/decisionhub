import { motion } from 'framer-motion';

export default function DecisionCard({ decision }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black tracking-tight text-slate-900">{decision.title}</h3>
          <p className="mt-2 text-sm text-slate-500">Status: {decision.status}</p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">Open</span>
      </div>
    </motion.article>
  );
}
