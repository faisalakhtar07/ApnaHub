import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Btn from "./ui/Btn";

export default function RoleCard({ icon: Icon, title, description, features, to, delay = 0 }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
      className="flex h-full flex-col rounded-[26px] border border-slate-100 dark:border-white/10 bg-white dark:bg-[#131B2E] p-7 shadow-[0_15px_45px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_55px_rgba(79,70,229,0.14)]"
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
      <ul className="mt-5 space-y-2.5 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Check size={15} className="text-emerald-500 shrink-0 mt-0.5" /> {f}
          </li>
        ))}
      </ul>
      <Btn variant="outline" className="mt-6 w-full" onClick={() => navigate(to)}>Get started</Btn>
    </motion.div>
  );
}
