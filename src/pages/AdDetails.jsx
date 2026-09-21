import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Phone, MessageCircle, Volume2, VolumeX } from "lucide-react";
import Breadcrumb from "../components/layout/Breadcrumb";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import { adsApi } from "../lib/api";

export default function AdDetails() {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [muted, setMuted] = useState(true);

  useEffect(() => { adsApi.get(id).then(setAd); }, [id]);

  if (!ad) return <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 text-slate-400 text-sm">Loading advertisement…</div>;

  const hasVideo = ad.videos?.length > 0;

  return (
    <>
      <Breadcrumb items={["Home", ad.category, ad.title]} />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8 grid sm:grid-cols-2 gap-8">
        <div>
          <div className="relative rounded-3xl overflow-hidden h-72 sm:h-96 bg-slate-900">
            {hasVideo ? (
              <>
                <video src={ad.videos[0]} className="w-full h-full object-cover" autoPlay muted={muted} loop playsInline />
                <button onClick={() => setMuted((m) => !m)} className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white">
                  {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </>
            ) : ad.images?.length ? (
              <img src={ad.images[activeImg]} className="w-full h-full object-cover" alt={ad.title} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">No photo yet</div>
            )}
          </div>
          {!hasVideo && ad.images?.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {ad.images.map((src, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 ${i === activeImg ? "border-indigo-500" : "border-transparent"}`}>
                  <img src={src} className="w-full h-full object-cover" alt={`${ad.title} ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <Badge>{ad.category}</Badge>
          <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-white mt-3">{ad.title}</h1>
          {ad.price != null && <p className="font-mono font-bold text-3xl text-indigo-600 dark:text-indigo-400 mt-2">₹{Number(ad.price).toLocaleString("en-IN")}</p>}
          {ad.description && <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">{ad.description}</p>}
          {(ad.location || ad.city) && <p className="flex items-center gap-1.5 text-sm text-slate-400 mt-3"><MapPin size={13} /> {[ad.location, ad.city, ad.state].filter(Boolean).join(", ")}</p>}
          <div className="flex gap-3 mt-6">
            {ad.phone && <Btn variant="outline" icon={Phone} className="flex-1" onClick={() => window.open(`tel:${ad.phone}`)}>Call</Btn>}
            {ad.whatsapp && <Btn variant="marigold" icon={MessageCircle} className="flex-1" onClick={() => window.open(`https://wa.me/${ad.whatsapp.replace(/\D/g, "")}`, "_blank")}>WhatsApp</Btn>}
          </div>
        </div>
      </div>
    </>
  );
}
