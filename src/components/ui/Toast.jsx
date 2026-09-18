import React from "react";
import { CheckCircle2, X } from "lucide-react";

export default function Toast({ toast, onClose }) {
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-fadeUp">
      <div className="flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-3.5 rounded-2xl shadow-2xl">
        <CheckCircle2 size={18} className="text-emerald-400 dark:text-emerald-500 shrink-0" />
        <span className="text-sm font-medium">{toast}</span>
        <button onClick={onClose} className="opacity-60 hover:opacity-100 ml-2"><X size={15} /></button>
      </div>
    </div>
  );
}
