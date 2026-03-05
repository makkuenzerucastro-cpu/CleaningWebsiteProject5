import React, { useEffect, useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

export default function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const [zoom, setZoom] = useState(1);
  const touchStartX = useRef(null);

  const prev = () => { setZoom(1); setCurrent((c) => (c - 1 + images.length) % images.length); };
  const next = () => { setZoom(1); setCurrent((c) => (c + 1) % images.length); };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white bg-white/10 hover:bg-white/25 rounded-full p-2 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Zoom controls */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        <button
          onClick={() => setZoom((z) => Math.max(1, z - 0.5))}
          className="text-white bg-white/10 hover:bg-white/25 rounded-full p-2 transition-colors"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <span className="text-white text-sm flex items-center px-2">{Math.round(zoom * 100)}%</span>
        <button
          onClick={() => setZoom((z) => Math.min(3, z + 0.5))}
          className="text-white bg-white/10 hover:bg-white/25 rounded-full p-2 transition-colors"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-3 sm:left-6 text-white bg-white/10 hover:bg-white/25 rounded-full p-3 transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Image */}
      <div className="overflow-auto max-w-full max-h-full flex items-center justify-center px-16">
        <img
          key={current}
          src={images[current]}
          alt=""
          style={{ transform: `scale(${zoom})`, transition: "transform 0.2s ease" }}
          className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg shadow-2xl animate-fade-in"
        />
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={next}
          className="absolute right-3 sm:right-6 text-white bg-white/10 hover:bg-white/25 rounded-full p-3 transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
        {current + 1} / {images.length}
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: scale(${zoom * 0.95}); } to { opacity: 1; transform: scale(${zoom}); } }
        .animate-fade-in { animation: fade-in 0.2s ease; }
      `}</style>
    </div>
  );
}