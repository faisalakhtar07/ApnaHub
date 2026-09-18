import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Bookmark } from "lucide-react";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Btn from "./ui/Btn";

export default function JobCard({ j }) {
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  return (
    <Card className="p-5 flex flex-col h-full">
      <div className="flex items-start gap-3 cursor-pointer" onClick={() => navigate(`/jobs/${j.id}`)}>
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center font-display font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
          {j.company.charAt(0)}
        </div>
        <div className="min-w-0">
          <h3 className="font-display font-semibold text-slate-900 dark:text-white leading-snug truncate">{j.title}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{j.company}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-4">
        <Badge>{j.type}</Badge>
        <Badge>{j.exp}</Badge>
      </div>
      <p className="font-mono text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-3">{j.salary}</p>
      <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-1"><MapPin size={12} /> {j.loc}</p>
      <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100 dark:border-white/10">
        <Btn variant="primary" size="sm" className="flex-1" onClick={() => navigate(`/jobs/${j.id}`)}>Apply now</Btn>
        <button
          onClick={() => setSaved((s) => !s)}
          className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors shrink-0 ${
            saved ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-200 dark:border-white/15 text-slate-400 hover:text-indigo-500"
          }`}
        >
          <Bookmark size={14} className={saved ? "fill-current" : ""} />
        </button>
      </div>
    </Card>
  );
}
