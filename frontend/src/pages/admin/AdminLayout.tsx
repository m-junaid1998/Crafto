import { useState } from "react";
import { LayoutDashboard, ShoppingBag, Users, FolderTree, Package, Image, Settings, Menu, X, LogOut, ExternalLink } from "lucide-react";
import { Link, useLocation, Outlet } from "react-router-dom";

const navs = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard }, 
  { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
  { name: "Customers", path: "/admin/customers", icon: Users }, 
  { name: "Categories", path: "/admin/categories", icon: FolderTree },
  { name: "Products", path: "/admin/products", icon: Package }, 
  { name: "Media", path: "/admin/media", icon: Image },
  { name: "Settings", path: "/admin/settings", icon: Settings }
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[var(--color-bg-light)] text-[var(--color-text-dark)] font-sans">
      {open && <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden" onClick={() => setOpen(false)} />}
      
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[var(--color-primary)] text-white flex flex-col justify-between transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div>
          {/* Header - Single line store name */}
          <div className="h-20 flex items-center justify-between px-5 border-b border-white/10">
            <h1 className="font-serif text-sm font-bold tracking-wider uppercase whitespace-nowrap overflow-hidden text-ellipsis">
              Home N More <span className="text-[var(--color-accent)] italic font-normal">Studio</span>
            </h1>
            <button onClick={() => setOpen(false)} className="lg:hidden text-white/60 ml-2"><X className="w-5 h-5" /></button>
          </div>

          {/* Navigation with better spacing */}
          <nav className="p-4 space-y-2">
            {navs.map((item) => {
              const Icon = item.icon, active = pathname === item.path;
              return (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  onClick={() => setOpen(false)} 
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all ${
                    active ? "bg-[var(--color-accent)] text-black shadow-lg font-bold" : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" /> {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions with gap */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link to="/" target="_blank" className="flex items-center gap-3.5 px-4 py-3 text-xs uppercase tracking-widest font-semibold text-[var(--color-accent)] hover:bg-white/5 rounded-xl transition-all">
            <ExternalLink className="w-4 h-4 shrink-0" /> Store View
          </Link>
          <button className="flex items-center gap-3.5 w-full px-4 py-3 text-xs uppercase tracking-widest font-semibold text-red-400 hover:bg-white/5 rounded-xl transition-all cursor-pointer">
            <LogOut className="w-4 h-4 shrink-0" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-[var(--color-border)] px-4 sm:px-8 flex items-center justify-between shrink-0 z-30">
          <button onClick={() => setOpen(true)} className="lg:hidden p-2 hover:bg-[var(--color-card-bg)] rounded-lg"><Menu className="w-6 h-6" /></button>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] hidden sm:block">Admin Workspace</span>
          <div className="flex items-center gap-3 ml-auto">
            <Link to="/" target="_blank" className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--color-border)] rounded-lg text-xs font-semibold hover:border-[var(--color-accent)] transition-all">
              <ExternalLink className="w-3.5 h-3.5 text-[var(--color-accent)]" /> Live Store
            </Link>
            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-xs border border-[var(--color-accent)]">MJ</div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto"><Outlet /></main>
      </div>
    </div>
  );
}