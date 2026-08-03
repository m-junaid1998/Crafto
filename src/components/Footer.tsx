import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon, TikTokIcon, TwitterIcon, WhatsAppIcon, MapPinIcon } from "../utils/socialicons";

const QUICK_LINKS = [
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Track Order", path: "/track-order" },
  { name: "Privacy Policy", path: "/privacy" },
];

const CATEGORIES = [
  { name: "Vases", path: "/category/vases" },
  { name: "Jewelry Boxes", path: "/category/jewelry-boxes" },
  { name: "Lamps", path: "/category/lamps" },
  { name: "Tables", path: "/category/tables" },
  { name: "Candle Stands", path: "/category/candle-stands" },
  { name: "Planters", path: "/category/planters" },
];

const SOCIAL_ICONS = [
  { icon: <InstagramIcon />, href: "#", label: "Instagram" },
  { icon: <WhatsAppIcon />, href: "#", label: "Whatsapp" },
  { icon: <FacebookIcon />, href: "#", label: "Facebook" },
  { icon: <TikTokIcon />, href: "#", label: "TikTok" },
  { icon: <TwitterIcon />, href: "#", label: "Twitter" },
  { icon: <MapPinIcon />, href: "#", label: "Location" },
];

export const Footer = () => {
  return (
    <footer className="bg-[var(--color-bg-light)] text-[var(--color-text-dark)] font-sans border-t border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16">
          
          {/* Brand Info */}
          <div className="md:col-span-5 lg:col-span-6 pr-0 lg:pr-12">
            <h2 className="font-serif text-3xl font-bold text-[var(--color-text-dark)] mb-4 tracking-tight">
              Crafto
            </h2>
            <p className="text-[var(--color-muted)] text-sm leading-relaxed max-w-md mb-6 font-normal">
              Crafto is Pakistan's premier boutique marketplace for high-end,
              authentic handicrafts. We curate the finest works from artisans
              across the nation.
            </p>

            <div className="flex items-center space-x-2.5">
              {SOCIAL_ICONS.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl border border-[var(--color-border)] bg-white text-[var(--color-primary)] flex items-center justify-center hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-200 shadow-xs"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="font-serif text-lg font-bold text-[var(--color-text-dark)] mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3.5 text-sm font-medium">
              {QUICK_LINKS.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="font-serif text-lg font-bold text-[var(--color-text-dark)] mb-5">
              Categories
            </h3>
            <ul className="space-y-3.5 text-sm font-medium">
              {CATEGORIES.map((cat, i) => (
                <li key={i}>
                  <Link
                    to={cat.path}
                    className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] pt-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-muted)] font-normal">
          <p>© {new Date().getFullYear()} Crafto. Authentic Craftsmanship from Pakistan.</p>
          <div className="flex items-center space-x-6 tracking-wider uppercase text-[11px] font-semibold text-[var(--color-muted)]">
            <Link
              to="/privacy"
              className="hover:text-[var(--color-text-dark)] transition-colors"
            >
              PRIVACY POLICY
            </Link>
            <Link 
              to="/terms" 
              className="hover:text-[var(--color-text-dark)] transition-colors"
            >
              TERMS OF SERVICE
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};