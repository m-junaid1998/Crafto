import React, { useState } from 'react';
import { Search, Heart, Phone, MapPin, Lock, AlignJustify } from 'lucide-react';
import ShoppingBagIcon from './ShoppingBagIcon';

interface NavLinkItem { name: string; href: string; active?: boolean; }

const NAV_LINKS: NavLinkItem[] = [
  { name: 'Home', href: '#', active: true },
  { name: 'Shop', href: '#' },
  { name: 'About', href: '#' },
  { name: 'Contact', href: '#' },
  { name: 'Track Order', href: '#' },
];

const LogoIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 23 23">
    <path d="M12 2C10.5 2 9 3.5 9 5c0 1.5 1 2.5 1.5 3.5C9 9.5 8 11 8 13c0 3 2 5 4 5s4-2 4-5c0-2-1-3.5-2.5-4.5C14 7.5 15 6.5 15 5c0-1.5-1.5-3-3-3zm0 2c.8 0 1 .5 1 1s-.5 1.5-1 2c-.5-.5-1-1.5-1-2s.2-1 1-1z" />
  </svg>
);

export const Navbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#FAF8F5] text-[#055038] px-4 md:px-12 py-3 shadow-sm relative z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => setIsDrawerOpen(true)} className="md:hidden w-10 h-10 rounded-full bg-[#055038] text-white flex items-center justify-center shadow-md active:scale-95" aria-label="Open Menu">
            <AlignJustify size={23} strokeWidth={1.8} />
          </button>

          <div className="hidden md:flex cursor-pointer font-serif text-2xl font-bold tracking-widest uppercase">
            CRAF<span className="text-[#D4A359]">T</span>O
          </div>

          <div className="flex md:hidden flex-col items-center cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-[#055038] text-white flex items-center justify-center mb-1"><LogoIcon /></div>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase">CRAFTO</span>
          </div>

          <div className="hidden md:flex space-x-8 text-sm font-semibold tracking-wide">
            {NAV_LINKS.map(({ name, href, active }) => (
              <a key={name} href={href} className={`transition-colors hover:text-[#D4A359] ${active ? 'text-[#D4A359]' : ''}`}>{name}</a>
            ))}
          </div>

          <div className="flex items-center space-x-3 md:space-x-5">
            <button className="hidden md:block hover:text-[#D4A359] p-1" aria-label="Search"><Search size={26} strokeWidth={1.8} /></button>
            <button className="hidden md:block hover:text-[#D4A359] p-1" aria-label="Wishlist"><Heart size={26} strokeWidth={1.8} /></button>
            <button className="w-10 h-10 md:w-auto md:h-auto rounded-full bg-[#055038] md:bg-transparent text-white md:text-[#055038] flex items-center justify-center shadow-md md:shadow-none hover:text-[#D4A359]" aria-label="Cart">
              <ShoppingBagIcon size={24} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </nav>

      <button className="fixed bottom-4 left-4 z-40 w-11 h-11 rounded-full bg-[#055038] text-white flex items-center justify-center shadow-lg active:scale-95 md:hidden" aria-label="Wishlist"><Heart size={24} strokeWidth={2} /></button>
      <button className="fixed bottom-4 right-4 z-40 w-11 h-11 rounded-full bg-[#055038] text-white flex items-center justify-center shadow-lg active:scale-95 md:hidden" aria-label="Search"><Search size={24} strokeWidth={2} /></button>

      {isDrawerOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden cursor-pointer" onClick={() => setIsDrawerOpen(false)} />}

      <aside className={`fixed top-0 left-0 bottom-0 w-[280px] bg-[#FAF8F5] z-50 transform transition-transform duration-300 md:hidden flex flex-col justify-between shadow-2xl ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          <div className="bg-[#055038] text-white px-5 py-4 flex items-center space-x-3">
            <div className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center"><LogoIcon className="w-4 h-4" /></div>
            <span className="font-bold tracking-widest uppercase text-base">CRAFTO</span>
          </div>
          <div className="px-6 pt-6 flex flex-col space-y-9">
            {NAV_LINKS.map(({ name, href, active }) => (
              <a key={name} href={href} onClick={() => setIsDrawerOpen(false)} className={`text-sm font-bold tracking-wide transition-colors ${active ? 'text-[#D4A359]' : 'text-[#2C3E35] hover:text-[#D4A359]'}`}>{name}</a>
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 pt-4 space-y-4">
          <div className="border-t border-gray-200 pt-4" />
          <a href="tel:" className="w-full bg-[#055038] text-white py-3 px-4 rounded-full flex items-center justify-center space-x-2 font-bold text-sm shadow-md hover:bg-[#033b29]"><Phone size={16} className="fill-current" /><span>Call Us Now</span></a>
          <div className="flex items-start space-x-2 text-xs text-gray-600 leading-snug pt-1"><MapPin size={18} className="text-gray-700 shrink-0 mt-0.5" /><span>Shop No 1, First Floor, Shanghai Plaza, China Market, Rawalpindi</span></div>
          <a href="#" className="flex items-center space-x-2 text-xs font-semibold text-[#055038] hover:underline pt-1"><Lock size={14} /><span>Privacy Policy</span></a>
        </div>
      </aside>
    </>
  );
};