import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  FolderTree,
  Package,
  Image,
  Settings,
  Menu,
  X,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Button } from "../../components/Button";

const navs = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
  { name: "Customers", path: "/admin/customers", icon: Users },
  { name: "Categories", path: "/admin/categories", icon: FolderTree },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Media", path: "/admin/media", icon: Image },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[var(--color-bg-light)] text-[var(--color-text-dark)] font-sans">
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[var(--color-primary)] text-white flex flex-col justify-between transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div>
          <div className="h-20 flex items-center justify-between px-5 border-b border-white/10">
            <h1 className="font-serif text-sm font-bold tracking-wider uppercase truncate">
              Home N More{" "}
              <span className="text-[var(--color-accent)] italic font-normal">
                Studio
              </span>
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="lg:hidden text-white/60 !p-1"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <nav className="p-4 space-y-2">
            {navs.map(({ name, path, icon: Icon }) => (
              <Link
                key={name}
                to={path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all ${pathname === path ? "bg-[var(--color-accent)] shadow-lg font-bold" : "text-white/70 hover:bg-white/5 hover:text-white"}`}
              >
                <Icon className="w-4 h-4 shrink-0" /> {name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-3.5 px-4 py-3 text-xs uppercase tracking-widest font-semibold text-[var(--color-accent)] rounded-xl transition-all duration-200 hover:bg-[var(--color-accent)] hover:text-white"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            Store View
          </Link>

          <Button
            variant="ghost"
            size="sm"
            leftIcon={<LogOut className="w-4 h-4 shrink-0" />}
            className="inline-flex items-center gap-3.5 px-4 py-3 text-xs uppercase tracking-widest font-semibold text-red-400 rounded-xl transition-all duration-200 hover:bg-red-500 hover:text-white w-fit"
          >
            Logout
          </Button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-[var(--color-border)] px-4 sm:px-8 flex items-center justify-between shrink-0 z-30">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(true)}
            className="lg:hidden !p-2"
          >
            <Menu className="w-6 h-6" />
          </Button>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] hidden sm:block">
            Admin Workspace
          </span>
          <div className="flex items-center gap-3 ml-auto">
            <Link to="/" target="_blank" className="hidden sm:inline-block">
              <Button
                variant="outline"
                size="sm"
                leftIcon={
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                }
              >
                Live Store
              </Button>
            </Link>
            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-xs border border-[var(--color-accent)]">
           HN
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
