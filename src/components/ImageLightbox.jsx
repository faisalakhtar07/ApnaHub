import React, { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

/** Distance between two touch points, for pinch-to-zoom. */
function touchDistance(touches) {
  const [a, b] = touches;
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

export default function ImageLightbox({ images, index, onClose, onIndexChange }) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const pinchStart = useRef(null);
  const dragStart = useRef(null);

  if (index == null) return null;

  const resetZoom = () => { setScale(1); setPos({ x: 0, y: 0 }); };

  const go = (dir) => {
    resetZoom();
    onIndexChange(((index + dir) % images.length + images.length) % images.length);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      pinchStart.current = { dist: touchDistance(e.touches), scale };
    } else if (e.touches.length === 1 && scale > 1) {
      dragStart.current = { x: e.touches[0].clientX - pos.x, y: e.touches[0].clientY - pos.y };
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && pinchStart.current) {
      e.preventDefault();
      const newDist = touchDistance(e.touches);
      const nextScale = Math.min(4, Math.max(1, pinchStart.current.scale * (newDist / pinchStart.current.dist)));
      setScale(nextScale);
    } else if (e.touches.length === 1 && dragStart.current) {
      e.preventDefault();
      setPos({ x: e.touches[0].clientX - dragStart.current.x, y: e.touches[0].clientY - dragStart.current.y });
    }
  };

  const handleTouchEnd = () => {
    pinchStart.current = null;
    dragStart.current = null;
    if (scale < 1.05) resetZoom();
  };

  const toggleDoubleTapZoom = () => {
    if (scale > 1) resetZoom();
    else setScale(2.2);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center touch-none" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center z-10">
        <X size={20} />
      </button>

      {images.length > 1 && (
        <>
          <button onClick={() => go(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center z-10">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => go(1)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center z-10">
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <img
          src={images[index]}
          alt=""
          draggable={false}
          onDoubleClick={toggleDoubleTapZoom}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`, transition: pinchStart.current || dragStart.current ? "none" : "transform 0.2s ease" }}
          className="max-w-full max-h-full object-contain select-none cursor-zoom-in"
        />
      </div>

      {scale === 1 && (
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs flex items-center gap-1.5">
          <ZoomIn size={13} /> Pinch or double-tap to zoom
        </p>
      )}
      {images.length > 1 && (
        <div className="absolute bottom-6 right-6 text-white/60 text-xs font-mono">{index + 1} / {images.length}</div>
      )}
    </div>
  );
}
