import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import HeaderLogo from '../assets/images/logo.png';
import { Search, Heart, Phone, MapPin, Lock, AlignJustify, X, User } from 'lucide-react';
import { ShoppingBagIcon } from '../utils/socialicons';
import { CartDrawer } from './CartDrawer';

const NAV_MENU = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'About', path: '/aboutus' },
  { name: 'Contact', path: '/contact' },
  { name: 'Track Order', path: '/track-order' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount] = useState(3);
  const navigate = useNavigate();

  return (
    <>
      <nav className="sticky top-0 z-40 bg-[var(--color-bg-light)] text-[var(--color-primary)] px-4 md:px-12 py-3 min-h-[68px] flex items-center shadow-xs">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <button onClick={() => setIsOpen(true)} className="md:hidden w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shadow-md active:scale-95 cursor-pointer" aria-label="Open Menu">
            <AlignJustify size={22} strokeWidth={2} />
          </button>

          <NavLink to="/" className="flex items-center cursor-pointer">
            <img src={HeaderLogo} alt="Logo" className="h-10 w-auto object-contain" />
          </NavLink>

          <div className="hidden md:flex space-x-8 text-sm font-semibold tracking-wide">
            {NAV_MENU.map(({ name, path }) => (
              <NavLink key={name} to={path} className={({ isActive }) => `transition-colors hover:text-[var(--color-accent)] hover:underline hover:underline-offset-4 ${isActive ? 'text-[var(--color-accent)]' : ''}`}>{name}</NavLink>
            ))}
          </div>

          <div className="flex items-center md:space-x-4">
            <button className="hidden md:block hover:text-[var(--color-accent)] p-1 transition-colors cursor-pointer" aria-label="Search"><Search size={22} strokeWidth={2} /></button>
            <button onClick={() => navigate('/wishlist')} className="hidden md:block hover:text-[var(--color-accent)] p-1 transition-colors cursor-pointer" aria-label="Wishlist"><Heart size={22} strokeWidth={2} /></button>
            
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="relative w-10 h-10 md:w-auto md:h-auto  flex items-center justify-center  cursor-pointer" 
              aria-label="Open Cart"
            >
              <ShoppingBagIcon size={22} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-[0.2px] -right-[0.2px]  md:-top-2 md:-right-2 bg-[var(--color-discount-bg)] text-[var(--color-discount-text)] text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => navigate('/myprofile')} className="hover:text-[var(--color-accent)] p-1 transition-colors cursor-pointer" aria-label="Wishlist"><User size={22} strokeWidth={2} /></button>
          </div>
        </div>
      </nav>

      <button onClick={() => navigate('/wishlist')} className="fixed bottom-5 left-5 z-30 w-11 h-11 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg active:scale-95 md:hidden cursor-pointer" aria-label="Wishlist"><Heart size={22} strokeWidth={2} /></button>
      <button className="fixed bottom-5 right-5 z-30 w-11 h-11 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg active:scale-95 md:hidden cursor-pointer" aria-label="Search"><Search size={22} strokeWidth={2} /></button>

      {isOpen && <div className="fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity" onClick={() => setIsOpen(false)} />}

      <aside className={`fixed top-0 left-0 bottom-0 w-[280px] bg-[var(--color-bg-light)] z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between shadow-2xl overflow-y-auto no-scrollbar ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          <div className="bg-[var(--color-primary)] text-white px-5 py-4 flex items-center justify-between shadow-sm">
            <img src={HeaderLogo} alt="Logo" className="h-10 w-auto object-contain brightness-0 invert" />
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer" aria-label="Close Menu"><X size={22} strokeWidth={2} /></button>
          </div>

          <div className="px-6 pt-6 flex flex-col space-y-6">
            {NAV_MENU.map(({ name, path }) => (
              <NavLink key={name} to={path} onClick={() => setIsOpen(false)} className={({ isActive }) => `text-sm font-bold tracking-wide transition-colors ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-dark)] hover:text-[var(--color-accent)]'}`}>{name}</NavLink>
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 pt-4 space-y-4">
          <div className="border-t border-[var(--color-border)]" />
          <a href="tel:03359115702" className="w-full bg-[var(--color-primary)] text-white py-3 px-4 rounded-full flex items-center justify-center space-x-2 font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[var(--color-primary-hover)] transition-colors"><Phone size={15} className="fill-current" /><span>Call Us Now</span></a>
          <div className="flex items-start space-x-2 text-[11px] text-[var(--color-muted)] leading-snug"><MapPin size={16} className="text-[var(--color-primary)] shrink-0 mt-0.5" /><span>Shop No 1, First Floor, Shanghai Plaza, China Market, Rawalpindi</span></div>
          <NavLink to="/privacy" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 text-xs font-semibold text-[var(--color-primary)] hover:underline"><Lock size={13} /><span>Privacy Policy</span></NavLink>
        </div>
      </aside>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};