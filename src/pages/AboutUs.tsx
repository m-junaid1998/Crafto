import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Heart, Sparkles, MapPin, ArrowRight } from 'lucide-react';

const stats = [{ label: 'Happy Customers', value: '10k+' }, { label: 'Curated Products', value: '500+' }, { label: 'Craftsman Partners', value: '50+' }, { label: 'Quality Guarantee', value: '100%' }];
const values = [
  { icon: Award, title: 'Uncompromised Quality', desc: 'Crafted with premium materials and painstaking attention to detail.' },
  { icon: ShieldCheck, title: 'Authentic Heritage', desc: 'Inspired by timeless aesthetic traditions blended with contemporary luxury.' },
  { icon: Heart, title: 'Customer First', desc: 'Dedicated to offering a seamless shopping experience and dedicated support.' },
  { icon: Sparkles, title: 'Artisanal Design', desc: 'Unique, elegant pieces curated to elevate your living spaces and lifestyle.' },
];

export const AboutUs: React.FC = () => (
  <div className="min-h-screen bg-[var(--color-bg-light)] text-[var(--color-text-dark)] font-sans">
    <section className="py-16 px-4 bg-[var(--color-card-bg)] border-b border-[var(--color-border)] text-center">
      <div className="max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest font-bold text-[var(--color-accent)]">Our Story</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold">Crafting Elegance for Every Space</h1>
        <p className="text-[var(--color-muted)] text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">Welcome to Home N More. We bring together timeless craftsmanship, modern aesthetic, and unmatched quality to turn your home into a masterpiece.</p>
      </div>
    </section>

    <section className="py-12 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="rounded-2xl overflow-hidden aspect-4/3 border border-[var(--color-border)] shadow-sm">
        <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop" alt="Interior Decor" className="w-full h-full object-cover" />
      </div>
      <div className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">Passion & Perfection</span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold">Curated with Passion, Built for Elegance</h2>
        <p className="text-[var(--color-muted)] text-xs sm:text-sm leading-relaxed">Redefining luxury lifestyle in Pakistan with premium candle stands, artisanal home decor, and signature fragrances curated to bring warmth and sophistication to your sanctuary.</p>
        <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--color-primary)]"><MapPin size={16} /><span>Shanghai Plaza, China Market, Rawalpindi</span></div>
      </div>
    </section>

    <section className="py-10 bg-[var(--color-primary)] text-white px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.label}><div className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-accent)]">{s.value}</div><div className="text-[10px] uppercase tracking-wider font-semibold opacity-80">{s.label}</div></div>
        ))}
      </div>
    </section>

    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="font-serif text-2xl font-bold text-center mb-8">Why Choose Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white p-6 rounded-2xl border border-[var(--color-border)] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-card-bg)] text-[var(--color-primary)] flex items-center justify-center mb-3"><Icon size={20} /></div>
            <h3 className="font-bold text-xs mb-1">{title}</h3>
            <p className="text-[var(--color-muted)] text-[11px] leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="py-10 px-4 bg-[var(--color-card-bg)] border-t border-[var(--color-border)] text-center space-y-4">
      <h2 className="font-serif text-xl sm:text-2xl font-bold">Ready to Transform Your Space?</h2>
      <div className="flex justify-center gap-4">
        <Link to="/shop" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all inline-flex items-center space-x-2"><span>Shop Now</span><ArrowRight size={14} /></Link>
        <Link to="/contact" className="border border-[var(--color-border)] bg-white text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all">Contact Us</Link>
      </div>
    </section>
  </div>
);

export default AboutUs;