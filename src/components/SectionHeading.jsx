import React from "react";
import Reveal from "./ui/Reveal";

export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  const alignment = align === "left" ? "text-left items-start" : "text-center items-center mx-auto";
  return (
    <Reveal className={`flex flex-col ${alignment} max-w-2xl`}>
      {eyebrow && (
        <p className="mb-3 inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400 md:text-base">{subtitle}</p>}
    </Reveal>
  );
}
