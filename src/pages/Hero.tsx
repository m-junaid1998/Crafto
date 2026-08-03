import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const slides = [
  { id: 1, title: 'Elevate Living with', highlightText: 'Elegance', description: 'Explore premium home decor and artisanal candle stands designed to redefine luxury spaces.', buttonText: 'SHOP DECOR', buttonLink: '/shop', imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1920&auto=format&fit=crop' },
  { id: 2, title: 'Exquisite & Artisanal', highlightText: 'Fragrances', description: 'Immerse in long-lasting luxury perfumes, attars, and room diffusers curated for perfection.', buttonText: 'EXPLORE SCENTS', buttonLink: '/shop', imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1920&auto=format&fit=crop' },
  { id: 3, title: 'Luxury Touch for', highlightText: 'Every Corner', description: 'Discover hand-picked statement pieces and signature fragrances crafted for modern living.', buttonText: 'DISCOVER MORE', buttonLink: '/about', imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1920&auto=format&fit=crop' },
];

export const Hero: React.FC = () => {
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurr((p) => (p + 1) % slides.length), 8000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[curr];

  return (
    <section 
      aria-label="Hero Carousel" 
      aria-roledescription="carousel" 
      className="relative w-full h-[80vh] min-h-[500px] max-h-[700px] overflow-hidden bg-[var(--color-primary)] text-white select-none"
    >
      {slides.map((s, i) => (
        <div 
          key={s.id} 
          aria-hidden={i !== curr}
          aria-roledescription="slide"
          aria-label={`Slide ${i + 1} of ${slides.length}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === curr ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img 
            src={s.imageUrl} 
            alt={s.title} 
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            className="w-full h-full object-cover object-center scale-105" 
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      <div className="relative z-20 max-w-7xl h-full mx-auto px-6 md:px-12 flex items-center">
        <div className="max-w-lg w-full p-6 sm:p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            {slide.title} <span className="text-[var(--color-accent)] italic font-serif font-normal block sm:inline">{slide.highlightText}</span>
          </h1>
          <p className="text-gray-200 text-xs sm:text-sm leading-relaxed mb-6 font-light">{slide.description}</p>
          <NavLink 
            to={slide.buttonLink} 
            aria-label={`${slide.buttonText} - ${slide.title}`}
            className="inline-block bg-white text-[var(--color-primary)] hover:bg-[var(--color-accent)] hover:text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {slide.buttonText}
          </NavLink>
        </div>
      </div>

      {[-1, 1].map((step) => (
        <button 
          key={step} 
          type="button"
          aria-label={step === -1 ? "Previous slide" : "Next slide"}
          onClick={() => setCurr((p) => (p + step + slides.length) % slides.length)} 
          className={`hidden md:flex absolute ${step === -1 ? 'left-6' : 'right-6'} top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 hover:bg-[var(--color-accent)] text-white backdrop-blur-md border border-white/10 transition-all cursor-pointer items-center justify-center`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d={step === -1 ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} /></svg>
        </button>
      ))}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2.5">
        {slides.map((_, i) => (
          <button 
            key={i} 
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === curr ? "true" : "false"}
            onClick={() => setCurr(i)} 
            className={`h-2 rounded-full transition-all duration-300 ${i === curr ? 'w-8 bg-[var(--color-accent)]' : 'w-2 bg-white/50 hover:bg-white'}`} 
          />
        ))}
      </div>
    </section>
  );
};