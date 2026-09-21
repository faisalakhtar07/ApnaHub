import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, MapPin } from "lucide-react";
import { adsApi, platformSettingsApi } from "../lib/api";

export default function AdvertisementHub() {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [settings, setSettings] = useState(null);
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [direction, setDirection] = useState(1); // 1 = advancing (slides in from the right), -1 = going back
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    Promise.all([adsApi.list(), platformSettingsApi.get()]).then(([adList, s]) => {
      setAds(adList);
      setSettings(s);
    });
  }, []);

  const current = ads[index];
  const isVideo = current?.videos?.length > 0;

  const goTo = (i, dir) => {
    setDirection(dir);
    setIndex(((i % ads.length) + ads.length) % ads.length);
  };
  const next = () => goTo(index + 1, 1);
  const prev = () => goTo(index - 1, -1);

  // Auto-advance: photos advance after adSlideDurationSeconds; videos advance when they finish.
  useEffect(() => {
    if (!settings || !ads.length || !settings.adAutoSlide) return undefined;
    if (isVideo) return undefined; // video's own onEnded handles advancing

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(next, (settings.adSlideDurationSeconds || 9) * 1000);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, ads.length, settings, isVideo]);

  if (!ads.length) return null; // nothing live yet — keep the homepage clean rather than showing an empty banner

  return (
    <section className="relative w-full h-[280px] sm:h-[380px] md:h-[440px] overflow-hidden bg-slate-900">
      <div key={index} className={`absolute inset-0 ${direction === 1 ? "animate-slideInRight" : "animate-slideInLeft"}`}>
        {isVideo ? (
          <video
            ref={videoRef}
            src={current.videos[0]}
            className="w-full h-full object-cover"
            autoPlay={settings?.adVideoAutoplay !== false}
            muted={muted}
            playsInline
            onEnded={next}
          />
        ) : (
          <img src={current.images?.[0]} alt={current.title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 flex items-end justify-between gap-4">
          <div className="min-w-0 cursor-pointer" onClick={() => navigate(`/ads/${current._id}`)}>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-400 mb-1">{current.category}</p>
            <h3 className="font-display text-lg sm:text-2xl font-bold text-white truncate max-w-md">{current.title}</h3>
            {current.location && <p className="flex items-center gap-1 text-xs text-white/70 mt-1"><MapPin size={12} /> {current.location}</p>}
          </div>
          {isVideo && (
            <button onClick={() => setMuted((m) => !m)} className="w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white shrink-0">
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          )}
        </div>
      </div>

      {ads.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white hover:bg-white/25 transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white hover:bg-white/25 transition-colors">
            <ChevronRight size={16} />
          </button>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {ads.map((_, i) => (
              <button key={i} onClick={() => goTo(i, i > index ? 1 : -1)} className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/40"}`} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
