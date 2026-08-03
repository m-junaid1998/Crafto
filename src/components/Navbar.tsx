import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import HeaderLogo from '../assets/images/logo.webp';
import { Search, Heart, Phone, MapPin, Lock, AlignJustify, X } from 'lucide-react';
import { ShoppingBagIcon } from '../utils/socialicons';

interface NavLinkItem { name: string; path: string; }

const navmenu: NavLinkItem[] = [
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
      <nav className="sticky top-0 z-40 bg-[var(--color-bg-light)] text-[var(--color-primary)] px-4 md:px-12 py-3 min-h-[68px] flex items-center shadow-sm">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <button onClick={() => setIsDrawerOpen(true)} className="md:hidden w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shadow-md active:scale-95" aria-label="Open Menu">
            <AlignJustify size={22} strokeWidth={2} />
          </button>

          <NavLink to="/" className="flex items-center cursor-pointer">
            <img src={HeaderLogo} alt="Logo" className="h-8 md:h-10 w-auto object-contain" />
          </NavLink>

          <div className="hidden md:flex space-x-8 text-sm font-semibold tracking-wide">
            {navmenu.map(({ name, path }) => (
              <NavLink key={name} to={path} className={({ isActive }) => `transition-colors hover:text-[var(--color-accent)] hover:underline hover:underline-offset-4 ${isActive ? 'text-[var(--color-accent)]' : ''}`}>{name}</NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-3 md:space-x-5">
            <button className="hidden md:block hover:text-[var(--color-accent)] p-1 transition-colors" aria-label="Search"><Search size={22} strokeWidth={2} /></button>
            <button className="hidden md:block hover:text-[var(--color-accent)] p-1 transition-colors" aria-label="Wishlist"><Heart size={22} strokeWidth={2} /></button>
            <button className="w-10 h-10 md:w-auto md:h-auto rounded-full bg-[var(--color-primary)] md:bg-transparent text-white md:text-[var(--color-primary)] flex items-center justify-center shadow-md md:shadow-none hover:text-[var(--color-accent)] transition-colors" aria-label="Cart">
              <ShoppingBagIcon size={22} strokeWidth={2} />
            </button>
          </div>
        </div>
      </nav>

      {/* Floating Action Buttons for Mobile */}
      <button className="fixed bottom-5 left-5 z-30 w-11 h-11 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg active:scale-95 md:hidden" aria-label="Wishlist"><Heart size={22} strokeWidth={2} /></button>
      <button className="fixed bottom-5 right-5 z-30 w-11 h-11 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg active:scale-95 md:hidden" aria-label="Search"><Search size={22} strokeWidth={2} /></button>

      {/* Overlay */}
      {isDrawerOpen && <div className="fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity" onClick={() => setIsDrawerOpen(false)} />}

      {/* Mobile Drawer Sidebar */}
      <aside className={`fixed top-0 left-0 bottom-0 w-[280px] bg-[var(--color-bg-light)] z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between shadow-2xl overflow-y-auto no-scrollbar ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          {/* Drawer Header with Close Button */}
          <div className="bg-[var(--color-primary)] text-white px-5 py-4 flex items-center justify-between shadow-sm">
            <img src={HeaderLogo} alt="Logo" className="h-7 w-auto object-contain brightness-0 invert" />
            <button onClick={() => setIsDrawerOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors" aria-label="Close Menu">
              <X size={22} strokeWidth={2} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-6 pt-6 flex flex-col space-y-6">
            {navmenu.map(({ name, path }) => (
              <NavLink key={name} to={path} onClick={() => setIsDrawerOpen(false)} className={({ isActive }) => `text-sm font-bold tracking-wide transition-colors ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-dark)] hover:text-[var(--color-accent)]'}`}>
                {name}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Footer info & Call Button */}
        <div className="px-6 pb-6 pt-4 space-y-4">
          <div className="border-t border-gray-200/80" />
          <a href="tel:" className="w-full bg-[var(--color-primary)] text-white py-3 px-4 rounded-full flex items-center justify-center space-x-2 font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[var(--color-primary-hover)] transition-colors">
            <Phone size={15} className="fill-current" />
            <span>Call Us Now</span>
          </a>
          <div className="flex items-start space-x-2 text-[11px] text-gray-600 leading-snug">
            <MapPin size={16} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
            <span>Shop No 1, First Floor, Shanghai Plaza, China Market, Rawalpindi</span>
          </div>
          <NavLink to="/privacy-policy" onClick={() => setIsDrawerOpen(false)} className="flex items-center space-x-2 text-xs font-semibold text-[var(--color-primary)] hover:underline">
            <Lock size={13} />
            <span>Privacy Policy</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};