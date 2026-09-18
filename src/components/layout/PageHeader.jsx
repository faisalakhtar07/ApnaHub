import React from "react";

export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="bg-gradient-to-b from-indigo-50/60 to-white dark:from-[#131B2E] dark:to-[#0B1120] pt-14 pb-10 border-b border-slate-100 dark:border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-indigo-600 dark:text-indigo-400 mb-2">{eyebrow}</p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white">{title}</h1>
        {subtitle && <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xl">{subtitle}</p>}
      </div>
    </div>
  );
}
