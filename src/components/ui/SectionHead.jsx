import React from "react";
import Reveal from "./Reveal";

export default function SectionHead({ eyebrow, title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-indigo-600 dark:text-indigo-400 mb-3">{eyebrow}</p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white tracking-tight">{title}</h2>
        {subtitle && <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-xl">{subtitle}</p>}
      </Reveal>
      {action}
    </div>
  );
}
