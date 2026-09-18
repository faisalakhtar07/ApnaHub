import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationBar() {
  const [page, setPage] = useState(1);
  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="w-9 h-9 rounded-full border border-slate-200 dark:border-white/15 flex items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5"><ChevronLeft size={15} /></button>
      {[1, 2, 3].map((n) => (
        <button key={n} onClick={() => setPage(n)} className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${page === n ? "bg-indigo-600 text-white" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5"}`}>{n}</button>
      ))}
      <button onClick={() => setPage((p) => Math.min(3, p + 1))} className="w-9 h-9 rounded-full border border-slate-200 dark:border-white/15 flex items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5"><ChevronRight size={15} /></button>
    </div>
  );
}
