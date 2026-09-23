import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Phone, MessageCircle, BadgeCheck, Clock, Globe } from "lucide-react";
import Breadcrumb from "../components/layout/Breadcrumb";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import { businessesApi } from "../lib/api";

export default function BusinessDetails() {
  const { id } = useParams();
  const [b, setB] = useState(null);
  const [tab, setTab] = useState("Overview");
  const [activeImg, setActiveImg] = useState(0);
  useEffect(() => { businessesApi.get(id).then(setB); }, [id]);

  if (!b) return <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 text-slate-400 text-sm">Loading business…</div>;

  const gallery = b.images?.length ? b.images : b.coverImage ? [b.coverImage] : [];
  const location = [b.address, b.city, b.state, b.pincode].filter(Boolean).join(", ");

  return (
    <>
      <Breadcrumb items={["Home", "Businesses", b.name]} />
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
        <div className="rounded-3xl overflow-hidden h-64 sm:h-80 relative bg-slate-100 dark:bg-white/5">
          {gallery.length ? (
            <img src={gallery[activeImg]} className="w-full h-full object-cover" alt={b.name} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600 font-display font-bold text-5xl">{b.name?.charAt(0)}</div>
          )}
        </div>
        {gallery.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto">
            {gallery.map((src, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 ${i === activeImg ? "border-indigo-500" : "border-transparent"}`}>
                <img src={src} className="w-full h-full object-cover" alt={`${b.name} ${i + 1}`} />
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mt-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">{b.name}</h1>
              <Badge tone="verified"><BadgeCheck size={12} /> Verified</Badge>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">{b.category}{b.subcategory ? ` · ${b.subcategory}` : ""}</p>
            {location && <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5 text-sm"><MapPin size={13} /> {location}</p>}
            {(b.openTime || b.closeTime) && (
              <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5 text-sm">
                <Clock size={13} /> {b.openTime}{b.closeTime ? ` – ${b.closeTime}` : ""}{b.workingDays?.length ? ` · ${b.workingDays.join(", ")}` : ""}
              </p>
            )}
            {b.website && (
              <a href={b.website} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 mt-1 flex items-center gap-1.5 text-sm hover:underline">
                <Globe size={13} /> {b.website}
              </a>
            )}
          </div>
          <div className="flex gap-2 shrink-0">
            {b.phone && <Btn variant="outline" icon={Phone} onClick={() => window.open(`tel:${b.phone}`)}>Call</Btn>}
            {b.whatsapp && <Btn variant="marigold" icon={MessageCircle} onClick={() => window.open(`https://wa.me/${b.whatsapp.replace(/\D/g, "")}`, "_blank")}>WhatsApp</Btn>}
          </div>
        </div>

        <div className="flex gap-1 mt-8 border-b border-slate-200 dark:border-white/10">
          {["Overview", "Photos"].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === t ? "border-indigo-600 text-indigo-600 dark:text-indigo-400" : "border-transparent text-slate-400"}`}>{t}</button>
          ))}
        </div>
        <div className="py-8 text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-2xl">
          {tab === "Overview" && (b.description || `A trusted ${b.category?.toLowerCase()} in ${b.city || "Aurangabad"}.`)}
          {tab === "Overview" && b.additionalInfo && <p className="mt-3">{b.additionalInfo}</p>}
          {tab === "Photos" && (gallery.length ? "Browse the photo strip above." : "No additional photos yet.")}
        </div>
      </div>
    </>
  );
}
