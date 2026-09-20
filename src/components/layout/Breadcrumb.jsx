import React from "react";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items }) {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-6 flex items-center gap-1.5 text-xs text-slate-400 font-medium">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <ChevronRight size={12} />}
          <span className={i === items.length - 1 ? "text-slate-700 dark:text-slate-200" : ""}>{it}</span>
        </React.Fragment>
      ))}
    </div>
  );
}
