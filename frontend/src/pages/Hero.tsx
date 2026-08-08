import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useMedia } from "../hooks/useMedia";

export const Hero: React.FC = () => {
  const [curr, setCurr] = useState(0);
  const { mediaList, isLoadingMedia } = useMedia({ key: "carousel" });

  // Single effect for reset & auto-slide timer
  useEffect(() => {
    if (!mediaList || mediaList.length === 0) return;

    setCurr((prev) => (prev >= mediaList.length ? 0 : prev));

    if (mediaList.length > 1) {
      const timer = setInterval(() => {
        setCurr((prev) => (prev + 1) % mediaList.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [mediaList]);

  if (isLoadingMedia) {
    return (
      <div className="w-full px-4 sm:px-8 py-4 bg-[var(--color-bg-light)]">
        <div className="w-full max-w-7xl mx-auto h-[380px] sm:h-[480px] md:h-[520px] rounded-3xl bg-[var(--color-card-bg)] animate-pulse border border-[var(--color-border)]" />
      </div>
    );
  }

  if (!mediaList || mediaList.length === 0) {
    return (
      <div className="w-full px-4 sm:px-8 py-4 bg-[var(--color-bg-light)]">
        <div className="w-full max-w-7xl mx-auto h-[380px] sm:h-[480px] md:h-[520px] rounded-3xl bg-[var(--color-card-bg)] border border-[var(--color-border)] flex items-center justify-center">
          <p className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">
            No Carousel Banners Uploaded
          </p>
        </div>
      </div>
    );
  }

  const currentSlide = mediaList[curr];

  return (
    <div className="w-full px-4 sm:px-8 py-4 bg-[var(--color-bg-light)]">
      <section className="relative w-full max-w-7xl mx-auto h-[380px] sm:h-[480px] md:h-[520px] rounded-3xl overflow-hidden shadow-lg select-none bg-[var(--color-primary)]">
        {mediaList.map((item: any, i: number) => (
          <div
            key={item._id || i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === curr ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {item.mediaType === "video" ? (
              <video
                src={item.mediaUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <img
                src={item.mediaUrl}
                alt={item.title || "Hero Banner"}
                className="w-full h-full object-cover object-center"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          </div>
        ))}

        {/* Content Box */}
        <div className="relative z-20 h-full flex flex-col justify-center px-8 sm:px-16 max-w-xl text-white">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wider leading-none mb-3 uppercase font-sans">
            {currentSlide?.title || "LUXURY COLLECTION"}
          </h1>

          <p className="text-xs sm:text-sm font-medium text-gray-200 mb-6 tracking-wide">
            {currentSlide?.key
              ? `Curated Section • ${currentSlide.key.toUpperCase()}`
              : "Discover Our Exclusive Products"}
          </p>

          <div>
            <NavLink
              to="/shop"
              className="inline-block bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-500 hover:to-amber-600 text-white font-bold text-xs sm:text-sm px-8 py-2.5 sm:py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 uppercase tracking-widest"
            >
              Shop Collection
            </NavLink>
          </div>
        </div>

        {/* Capsule Dots */}
        {mediaList.length > 1 && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            {mediaList.map((_: any, i: number) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setCurr(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === curr ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};