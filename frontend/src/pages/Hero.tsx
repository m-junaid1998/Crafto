import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const slides = [
  {
    id: 1,
    badge: 'Up To 40% Off Luxury Home Decor',
    title: 'ELEGANT',
    subTitle: 'HOME',
    buttonText: 'Shop Decor',
    buttonLink: '/shop',
    imageUrl:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 2,
    badge: 'Premium Fragrances For Every Occasion',
    title: 'SIGNATURE',
    subTitle: 'SCENTS',
    buttonText: 'Shop Perfumes',
    buttonLink: '/shop',
    imageUrl:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 3,
    badge: 'Modern Living Starts Here',
    title: 'MODERN',
    subTitle: 'LIVING',
    buttonText: 'Explore Collection',
    buttonLink: '/shop',
    imageUrl:
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 4,
    badge: 'Luxury Scents Crafted To Inspire',
    title: 'LUXURY',
    subTitle: 'PERFUME',
    buttonText: 'Discover Now',
    buttonLink: '/shop',
    imageUrl:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1920&auto=format&fit=crop',
  },
];

export const Hero: React.FC = () => {
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurr((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full px-4 sm:px-8 py-4 bg-[var(--color-bg-light)]">
      <section className="relative w-full max-w-7xl mx-auto h-[380px] sm:h-[480px] md:h-[520px] rounded-3xl overflow-hidden shadow-lg select-none">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${i === curr ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          </div>
        ))}

        {/* Content Box */}
        <div className="relative z-20 h-full flex flex-col justify-center px-8 sm:px-16 max-w-xl text-white">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-wider leading-none mb-3 uppercase">
            {slides[curr].title}
            <span className="block text-[var(--color-accent)] font-black text-3xl sm:text-5xl md:text-6xl mt-1">
              {slides[curr].subTitle}
            </span>
          </h1>

          <p className="text-xs sm:text-sm font-medium text-gray-200 mb-6 tracking-wide">
            {slides[curr].badge}
          </p>

          <div>
            <NavLink
              to={slides[curr].buttonLink}
              className="inline-block bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-500 hover:to-amber-600 text-white font-bold text-xs sm:text-sm px-8 py-2.5 sm:py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 uppercase tracking-widest"
            >
              {slides[curr].buttonText}
            </NavLink>
          </div>
        </div>

        {/* Bottom Capsule Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setCurr(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === curr ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};