import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Star, Phone, MessageCircle, BadgeCheck } from "lucide-react";
import Breadcrumb from "../components/layout/Breadcrumb";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import { businessesApi } from "../lib/api";

export default function BusinessDetails() {
  const { id } = useParams();
  const [b, setB] = useState(null);
  const [tab, setTab] = useState("Overview");
  useEffect(() => { businessesApi.get(id).then(setB); }, [id]);

  if (!b) return <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 text-slate-400 text-sm">Loading business…</div>;

  return (
    <>
      <Breadcrumb items={["Home", "Businesses", b.name]} />
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
        <div className="rounded-3xl overflow-hidden h-64 sm:h-80 relative">
          <img src={b.img} className="w-full h-full object-cover" alt={b.name} />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mt-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">{b.name}</h1>
              <Badge tone="verified"><BadgeCheck size={12} /> Verified</Badge>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5 text-sm"><MapPin size={13} /> {b.loc}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex items-center gap-1 text-amber-500 font-mono text-sm font-semibold"><Star size={13} className="fill-current" /> {b.rating}</span>
              <span className="text-xs text-slate-400">({b.reviews} reviews)</span>
              <Badge tone={b.open ? "open" : "closed"}>{b.open ? "Open now" : "Closed"}</Badge>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Btn variant="outline" icon={Phone}>Call</Btn>
            <Btn variant="marigold" icon={MessageCircle}>WhatsApp</Btn>
          </div>
        </div>

        <div className="flex gap-1 mt-8 border-b border-slate-200 dark:border-white/10">
          {["Overview", "Reviews", "Photos"].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === t ? "border-indigo-600 text-indigo-600 dark:text-indigo-400" : "border-transparent text-slate-400"}`}>{t}</button>
          ))}
        </div>
        <div className="py-8 text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-2xl">
          {tab === "Overview" && `A trusted ${b.cat.toLowerCase()} in Aurangabad. Listed on APNAHUB since 2024.`}
          {tab === "Reviews" && `${b.reviews} customers have reviewed this business. Ratings and detailed reviews will appear here.`}
          {tab === "Photos" && "Photo gallery for this business will appear here."}
        </div>
      </div>
    </>
  );
}
