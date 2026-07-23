import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import HeaderLogo from '../assets/images/headerlogo.png';
import { Search, Heart, Phone, MapPin, Lock, AlignJustify } from 'lucide-react';
import ShoppingBagIcon from './ShoppingBagIcon';

interface NavLinkItem { name: string; path: string; }

const NAV_LINKS: NavLinkItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Track Order', path: '/track-order' },
];

export const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <nav className="bg-bg-light text-primary px-4 md:px-12 py-3 md:py-3.5 min-h-[68px] md:min-h-[76px] flex items-center shadow-sm relative z-30">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <button onClick={() => setIsDrawerOpen(true)} className="md:hidden w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md active:scale-95" aria-label="Open Menu">
            <AlignJustify size={23} strokeWidth={1.8} />
          </button>

          <NavLink to="/" className="hidden md:flex items-center cursor-pointer">
            <img src={HeaderLogo} alt="Logo" className="h-10 w-auto object-contain" />
          </NavLink>

          <NavLink to="/" className="flex md:hidden items-center cursor-pointer">
            <img src={HeaderLogo} alt="Logo" className="h-8 w-auto object-contain" />
          </NavLink>

          <div className="hidden md:flex space-x-9 text-sm font-semibold tracking-wide">
            {NAV_LINKS.map(({ name, path }) => (
              <NavLink key={name} to={path} className={({ isActive }) => `transition-colors hover:text-accent ${isActive ? 'text-accent' : ''}`}>{name}</NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-3 md:space-x-5">
            <button className="hidden md:block hover:text-accent p-1 transition-colors" aria-label="Search"><Search size={25} strokeWidth={1.8} /></button>
            <button className="hidden md:block hover:text-accent p-1 transition-colors" aria-label="Wishlist"><Heart size={25} strokeWidth={1.8} /></button>
            <button className="w-10 h-10 md:w-auto md:h-auto rounded-full bg-primary md:bg-transparent text-white md:text-primary flex items-center justify-center shadow-md md:shadow-none hover:text-accent transition-colors" aria-label="Cart">
              <ShoppingBagIcon size={23} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </nav>

      <button className="fixed bottom-4 left-4 z-40 w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center shadow-lg active:scale-95 md:hidden" aria-label="Wishlist"><Heart size={24} strokeWidth={2} /></button>
      <button className="fixed bottom-4 right-4 z-40 w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center shadow-lg active:scale-95 md:hidden" aria-label="Search"><Search size={24} strokeWidth={2} /></button>

      {isDrawerOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden cursor-pointer" onClick={() => setIsDrawerOpen(false)} />}

      <aside className={`fixed top-0 left-0 bottom-0 w-[280px] bg-bg-light z-50 transform transition-transform duration-300 md:hidden flex flex-col justify-between shadow-2xl ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          <div className="bg-primary text-white px-5 py-5 flex items-center justify-start">
            <img src={HeaderLogo} alt="Logo" className="h-8 w-auto object-contain brightness-0 invert" />
          </div>

          <div className="px-6 pt-6 flex flex-col space-y-9">
            {NAV_LINKS.map(({ name, path }) => (
              <NavLink key={name} to={path} onClick={() => setIsDrawerOpen(false)} className={({ isActive }) => `text-sm font-bold tracking-wide transition-colors ${isActive ? 'text-accent' : 'text-text-dark hover:text-accent'}`}>{name}</NavLink>
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 pt-4 space-y-4">
          <div className="border-t border-gray-200 pt-4" />
          <a href="tel:" className="w-full bg-primary text-white py-3 px-4 rounded-full flex items-center justify-center space-x-2 font-bold text-sm shadow-md hover:bg-primary-hover"><Phone size={16} className="fill-current" /><span>Call Us Now</span></a>
          <div className="flex items-start space-x-2 text-xs text-gray-600 leading-snug pt-1"><MapPin size={18} className="text-gray-700 shrink-0 mt-0.5" /><span>Shop No 1, First Floor, Shanghai Plaza, China Market, Rawalpindi</span></div>
          <NavLink to="/privacy-policy" onClick={() => setIsDrawerOpen(false)} className="flex items-center space-x-2 text-xs font-semibold text-primary hover:underline pt-1"><Lock size={14} /><span>Privacy Policy</span></NavLink>
        </div>
      </aside>
    </>
  );
};