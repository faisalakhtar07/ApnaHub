import React from "react";
import { SlidersHorizontal } from "lucide-react";

export default function FilterBar({ tabs, active, setActive }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-8">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setActive(t)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            active === t ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
          }`}
        >
          {t}
        </button>
      ))}
      <button className="ml-auto flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 dark:border-white/15 text-sm text-slate-500 dark:text-slate-300 shrink-0">
        <SlidersHorizontal size={14} /> Filters
      </button>
    </div>
  );
}
