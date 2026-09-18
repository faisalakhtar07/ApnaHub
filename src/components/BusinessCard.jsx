import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, Phone, MessageCircle, Heart } from "lucide-react";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Btn from "./ui/Btn";

export default function BusinessCard({ b }) {
  const navigate = useNavigate();
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 overflow-hidden cursor-pointer" onClick={() => navigate(`/businesses/${b.id}`)}>
        <img src={b.img} alt={b.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
        <Badge tone={b.open ? "open" : "closed"} className="absolute top-3 left-3 !bg-white/90 dark:!bg-slate-900/80 backdrop-blur">
          {b.open ? "Open now" : "Closed"}
        </Badge>
        <button onClick={(e) => e.stopPropagation()} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/80 backdrop-blur flex items-center justify-center text-slate-500 hover:text-rose-500 transition-colors">
          <Heart size={14} />
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold text-slate-900 dark:text-white leading-snug">{b.name}</h3>
          <div className="flex items-center gap-1 text-xs font-mono font-semibold text-amber-500 shrink-0 mt-0.5">
            <Star size={12} className="fill-current" /> {b.rating}
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-1">{b.cat} · {b.reviews} reviews</p>
        <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-2"><MapPin size={12} /> {b.loc}</p>
        <div className="flex items-center gap-2 mt-4">
          <Btn variant="outline" size="sm" icon={Phone} className="flex-1 !px-3">Call</Btn>
          <Btn variant="marigold" size="sm" icon={MessageCircle} className="flex-1 !px-3">WhatsApp</Btn>
        </div>
        <Btn variant="link" size="sm" className="mt-3 text-xs" iconRight onClick={() => navigate(`/businesses/${b.id}`)}>View details</Btn>
      </div>
    </Card>
  );
}
