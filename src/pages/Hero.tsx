import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const slides = [
  { id: 1, title: 'Handicraft with', highlightText: 'Passion', description: 'Discover unique home décor and handicrafts meticulously created by skilled Pakistani artisans who preserve centuries of heritage.', buttonText: 'SHOP NOW', buttonLink: '/shop', imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1920&auto=format&fit=crop' },
  { id: 2, title: 'Timeless Brass &', highlightText: 'Pottery', description: 'Elevate your living spaces with hand-carved brass ornaments and traditional pottery crafted with extraordinary precision.', buttonText: 'EXPLORE COLLECTION', buttonLink: '/shop', imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1920&auto=format&fit=crop' },
  { id: 3, title: 'Authentic Heritage', highlightText: 'Art', description: 'Support local artisans and bring home authentic Pakistani cultural masterpieces designed to last generations.', buttonText: 'DISCOVER MORE', buttonLink: '/about', imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1920&auto=format&fit=crop' },
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 10000);
    return () => clearInterval(timer);
  }, []);

  const changeSlide = (step: number) => {
    setCurrentSlide((prev) => (prev + step + slides.length) % slides.length);
  };

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative w-full h-[85vh] min-h-[550px] max-h-[750px] overflow-hidden select-none bg-primary">
      {/* Background Images Cross-Fade */}
      {slides.map((slide, index) => (
        <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover object-center scale-105" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl h-full mx-auto px-4 md:px-12 flex items-center justify-start">
        <div className="max-w-xl w-full p-8 md:p-10 rounded-2xl bg-black/35 backdrop-blur-md border border-white/15 shadow-2xl">
          <h1 className="font-serif text-3xl md:text-5xl font-semibold text-white tracking-wide leading-tight mb-4">
            {activeSlide.title} <span className="text-accent italic font-normal">{activeSlide.highlightText}</span>
          </h1>
          <p className="text-gray-200 text-xs md:text-sm leading-relaxed mb-8 tracking-wide font-light">{activeSlide.description}</p>
          <NavLink to={activeSlide.buttonLink} className="inline-block bg-primary hover:bg-primary-hover text-white text-xs md:text-sm font-bold tracking-wider px-7 py-3.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
            {activeSlide.buttonText}
          </NavLink>
        </div>
      </div>

      {/* Navigation Arrows (Desktop Only) */}
      {[-1, 1].map((step) => (
        <button key={step} onClick={() => changeSlide(step)} aria-label={step === -1 ? "Previous Slide" : "Next Slide"} className={`hidden md:flex absolute ${step === -1 ? 'left-8' : 'right-8'} top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 hover:bg-primary text-accent hover:text-white backdrop-blur-md border border-white/10 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer items-center justify-center`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d={step === -1 ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
          </svg>
        </button>
      ))}

      {/* Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-3">
        {slides.map((_, index) => (
          <button key={index} onClick={() => setCurrentSlide(index)} aria-label={`Go to slide ${index + 1}`} className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${index === currentSlide ? 'w-8 bg-accent' : 'w-2.5 bg-white/50 hover:bg-white/80'}`} />
        ))}
      </div>
    </section>
  );
};