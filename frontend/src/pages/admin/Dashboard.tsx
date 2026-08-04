import { DollarSign, ShoppingBag, Users, Package, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

const stats = [
  { title: "Total Revenue", value: "PKR 452,000", icon: DollarSign }, { title: "Total Orders", value: "324", icon: ShoppingBag },
  { title: "Active Customers", value: "1,240", icon: Users }, { title: "Total Products", value: "86", icon: Package }
];
const monthlySalesData = [
  { month: "Jan", sales: 120000 }, { month: "Feb", sales: 180000 }, { month: "Mar", sales: 150000 }, { month: "Apr", sales: 240000 },
  { month: "May", sales: 210000 }, { month: "Jun", sales: 320000 }, { month: "Jul", sales: 290000 }, { month: "Aug", sales: 452000 }
];
const categorySalesData = [
  { name: "Jewellery", percentage: 45, sales: "PKR 203,400" },
  { name: "Cosmetics", percentage: 35, sales: "PKR 158,200" },
  { name: "Purses", percentage: 20, sales: "PKR 90,400" }
];
const CATEGORY_COLORS = ["#c5a059", "#121212", "#737373"];
const topProducts = [
  { name: "Emerald Gold Necklace Set", category: "Jewellery", sales: 84, stock: 12 },
  { name: "Matte Velvet Lipstick - Ruby Red", category: "Cosmetics", sales: 62, stock: 45 },
  { name: "Luxury Leather Clutch", category: "Purses", sales: 41, stock: 8 }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ title, value, icon: Icon }) => (
          <div key={title} className="p-5 bg-white rounded-2xl border border-[var(--color-border)] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">{title}</span><div className="p-2.5 rounded-xl bg-[var(--color-card-bg)] text-[var(--color-primary)]"><Icon className="w-5 h-5" /></div></div>
            <p className="mt-4 text-2xl font-bold text-[var(--color-text-dark)]">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between"><h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-dark)]">Monthly Sales Overview</h2><span className="text-[10px] font-bold text-[var(--color-accent)] bg-[var(--color-card-bg)] px-2.5 py-1 rounded-md">2026</span></div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySalesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs><linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--color-accent, #c5a059)" stopOpacity={0.4}/><stop offset="95%" stopColor="var(--color-accent, #c5a059)" stopOpacity={0}/></linearGradient></defs>
                <XAxis dataKey="month" stroke="#737373" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#737373" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `k${val/1000}`} />
                <Tooltip formatter={(v: any) => [`PKR ${Number(v).toLocaleString()}`, "Revenue"]} contentStyle={{ backgroundColor: "#0a0a0a", borderRadius: "12px", border: "1px solid rgba(197,160,89,0.3)", color: "#fff", fontSize: "12px" }} />
                <Area type="monotone" dataKey="sales" stroke="var(--color-accent, #c5a059)" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between"><h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-dark)]">Category Performance</h2><span className="text-[10px] text-[var(--color-muted)] font-semibold uppercase">Share %</span></div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categorySalesData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#121212" fontSize={11} tickLine={false} axisLine={false} width={85} />
                <Tooltip cursor={{ fill: 'rgba(197, 160, 89, 0.08)' }} formatter={(v: any, _, item: any) => [`${v}% (${item.payload.sales})`, "Share & Revenue"]} contentStyle={{ backgroundColor: "#0a0a0a", borderRadius: "10px", border: "1px solid rgba(197,160,89,0.3)", color: "#fff", fontSize: "11px" }} itemStyle={{ color: "#c5a059" }} />
                <Bar dataKey="percentage" radius={[0, 8, 8, 0]} barSize={18}>{categorySalesData.map((_, i) => <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="border-t border-[var(--color-border)] pt-3 space-y-2">
            {categorySalesData.map((cat, idx) => (
              <div key={cat.name} className="flex items-center justify-between text-xs"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[idx] }} /><span className="font-semibold text-[var(--color-text-dark)]">{cat.name}</span></div><span className="font-bold text-[var(--color-muted)]">{cat.sales}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between"><h2 className="text-xs font-bold uppercase tracking-wider">Top Selling Products</h2><TrendingUp className="w-4 h-4 text-[var(--color-accent)]" /></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {topProducts.map((p) => (
            <div key={p.name} className="p-3.5 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)]/50 flex items-center justify-between">
              <div><h3 className="text-xs font-bold line-clamp-1">{p.name}</h3><p className="text-[10px] text-[var(--color-muted)] mt-0.5">{p.category} • {p.stock} in stock</p></div>
              <span className="text-xs font-bold text-[var(--color-accent)] shrink-0">{p.sales} sold</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}