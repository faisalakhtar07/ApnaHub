import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, MessageCircle, Heart, BadgeCheck } from "lucide-react";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Btn from "./ui/Btn";

export default function BusinessCard({ b }) {
  const navigate = useNavigate();
  const cover = b.coverImage || b.images?.[0] || b.logo;
  const location = [b.address, b.city].filter(Boolean).join(", ") || b.city || b.state;

  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 overflow-hidden cursor-pointer bg-slate-100 dark:bg-white/5" onClick={() => navigate(`/businesses/${b.id}`)}>
        {cover ? (
          <img src={cover} alt={b.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600 font-display font-bold text-3xl">{b.name?.charAt(0)}</div>
        )}
        <Badge tone="verified" className="absolute top-3 left-3 !bg-white/90 dark:!bg-slate-900/80 backdrop-blur">
          <BadgeCheck size={12} /> Verified
        </Badge>
        <button onClick={(e) => e.stopPropagation()} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/80 backdrop-blur flex items-center justify-center text-slate-500 hover:text-rose-500 transition-colors">
          <Heart size={14} />
        </button>
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-slate-900 dark:text-white leading-snug">{b.name}</h3>
        <p className="text-xs text-slate-400 mt-1">{b.category}{b.subcategory ? ` · ${b.subcategory}` : ""}</p>
        {location && <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-2"><MapPin size={12} /> {location}</p>}
        <div className="flex items-center gap-2 mt-4">
          <Btn variant="outline" size="sm" icon={Phone} className="flex-1 !px-3" onClick={(e) => { e.stopPropagation(); b.phone && window.open(`tel:${b.phone}`); }}>Call</Btn>
          <Btn variant="marigold" size="sm" icon={MessageCircle} className="flex-1 !px-3" onClick={(e) => { e.stopPropagation(); b.whatsapp && window.open(`https://wa.me/${b.whatsapp.replace(/\D/g, "")}`, "_blank"); }}>WhatsApp</Btn>
        </div>
        <Btn variant="link" size="sm" className="mt-3 text-xs" iconRight onClick={() => navigate(`/businesses/${b.id}`)}>View details</Btn>
      </div>
    </Card>
  );
}
