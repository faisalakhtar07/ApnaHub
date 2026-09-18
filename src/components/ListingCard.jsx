import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Heart } from "lucide-react";
import Card from "./ui/Card";
import Badge from "./ui/Badge";

export default function ListingCard({ l }) {
  const [fav, setFav] = useState(false);
  const navigate = useNavigate();
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 overflow-hidden cursor-pointer" onClick={() => navigate(`/buy-sell/${l.id}`)}>
        <img src={l.img} alt={l.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
        <button
          onClick={(e) => { e.stopPropagation(); setFav((f) => !f); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/80 backdrop-blur flex items-center justify-center transition-colors"
        >
          <Heart size={14} className={fav ? "fill-rose-500 text-rose-500" : "text-slate-500"} />
        </button>
        <Badge className="absolute bottom-3 left-3 !bg-white/90 dark:!bg-slate-900/80 backdrop-blur">{l.cond}</Badge>
      </div>
      <div className="p-5 cursor-pointer" onClick={() => navigate(`/buy-sell/${l.id}`)}>
        <p className="font-mono font-bold text-lg text-slate-900 dark:text-white">{l.price}</p>
        <h3 className="font-medium text-slate-700 dark:text-slate-200 text-sm mt-1 truncate">{l.title}</h3>
        <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
          <span className="flex items-center gap-1"><MapPin size={12} /> {l.loc}</span>
          <span>{l.seller}</span>
        </div>
      </div>
    </Card>
  );
}
