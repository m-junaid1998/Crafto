import { useState } from "react";
import { LayoutDashboard, ShoppingBag, Users, FolderTree, Package, Image,
Settings, Menu, LogOut, ExternalLink, Inbox, PanelLeftClose, PanelLeftOpen} from "lucide-react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";

const NAVS = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
  { name: "Customers", path: "/admin/customers", icon: Users },
  { name: "Categories", path: "/admin/categories", icon: FolderTree },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Contact", path: "/admin/contact", icon: Inbox },
  { name: "Media", path: "/admin/media", icon: Image },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const initials = `${user?.firstname?.[0] || ""}${user?.lastname?.[0] || ""}`.toUpperCase();
  const [open, setOpen] = useState(true);
  const { pathname } = useLocation();
  


  return (
    <div className="h-dvh w-full flex overflow-hidden bg-[var(--color-bg-light)] text-[var(--color-text-dark)] font-sans">
     
      {open && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setOpen(false)} />}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 bg-[var(--color-primary)] text-white flex flex-col justify-between transition-all duration-300 ${open ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"}`}>
        <div>
          <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
            {open && <h1 className="font-serif text-sm font-bold uppercase truncate">Home N More <span className="text-[var(--color-accent)] italic font-normal">Studio</span></h1>}
            <button onClick={() => setOpen(!open)} className="p-2 rounded-lg hover:bg-white/10 ml-auto cursor-pointer text-white/80 hover:text-white">
              {open ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
            </button>
          </div>

          <nav className="p-4 space-y-3">
            {NAVS.map(({ name, path, icon: Icon }) => (
              <Link key={name} to={path} title={!open ? name : ""} className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-colors ${pathname === path ? "bg-[var(--color-accent)] text-white" : "text-white/70 hover:bg-white/10 hover:text-white"} ${!open ? "justify-center" : ""}`}>
                <Icon className="w-5 h-5 shrink-0" />
                {open && <span className="truncate">{name}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-3 border-t border-white/10 space-y-1">
          <Link to="/" title={!open ? "Store View" : ""} className={`flex items-center gap-3.5 px-3 py-2.5 text-xs uppercase font-semibold text-[var(--color-accent)] rounded-xl hover:bg-[var(--color-accent)] hover:text-white ${!open ? "justify-center" : ""}`}>
            <ExternalLink className="w-5 h-5 shrink-0" /> {open && <span>Store View</span>}
          </Link>
          <button onClick={() => dispatch(logout())} title={!open ? "Logout" : ""} className={`w-full flex items-center gap-3.5 px-3 py-2.5 text-xs uppercase font-semibold text-red-400 rounded-xl hover:bg-red-500 hover:text-white cursor-pointer ${!open ? "justify-center" : ""}`}>
            <LogOut className="w-5 h-5 shrink-0" /> {open && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-[var(--color-border)] px-4 flex items-center justify-between shrink-0 z-30">
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-gray-700">
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] hidden sm:block">Admin Workspace</span>
          <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-xs border border-[var(--color-accent)] ml-auto">{initials || "AD"}</div>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}