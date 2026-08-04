import { useState, useMemo, useEffect } from "react";
import { Eye, Search, ShoppingBag, Clock, CheckSquare, Activity, Truck, Package, XCircle, DollarSign } from "lucide-react";
import { DataTable, type Column } from "../../components/DataTable";
import { Button } from "../../components/Button";
import { FormSelect, type SelectOption } from "../../components/FormSelect";
import { TableSkeleton } from "../../components/TableSkeleton";

interface Order { id: string; customer: string; phone: string; items: number; total: number; status: "CONFIRMED" | "DELIVERED" | "PENDING" | "CANCELLED"; createdAt: string; }

const sampleOrders: Order[] = [
  { id: "BMB-22013932", customer: "Muhammad Ahmed Amir", phone: "03082464060", items: 1, total: 5000, status: "CONFIRMED", createdAt: new Date().toISOString().split("T")[0] },
  { id: "BMB-94480336", customer: "Fatima Zehra", phone: "+923323399139", items: 20, total: 155500, status: "DELIVERED", createdAt: "2026-08-01" },
  { id: "BMB-93671574", customer: "Ahmed Amir", phone: "03323366532", items: 7, total: 14800, status: "PENDING", createdAt: "2026-07-28" },
  { id: "BMB-88291026", customer: "zarkish", phone: "03343567854", items: 1, total: 25000, status: "CONFIRMED", createdAt: "2026-07-10" },
];

const dateOpts: SelectOption[] = [{ label: "All Time", value: "ALL" }, { label: "Today", value: "TODAY" }, { label: "Last 7 Days", value: "7_DAYS" }, { label: "Last 30 Days", value: "30_DAYS" }];
const statusOpts: SelectOption[] = [{ label: "All Status", value: "ALL" }, { label: "Confirmed", value: "CONFIRMED" }, { label: "Delivered", value: "DELIVERED" }, { label: "Pending", value: "PENDING" }, { label: "Cancelled", value: "CANCELLED" }];
const PAGE_SIZE = 2;

const statsConfig = [
  { label: "TOTAL ORDERS", value: "19", icon: ShoppingBag },
  { label: "PENDING", value: "7", icon: Clock },
  { label: "CONFIRMED", value: "5", icon: CheckSquare },
  { label: "PROCESSING", value: "1", icon: Activity },
  { label: "SHIPPED", value: "1", icon: Truck },
  { label: "DELIVERED", value: "4", icon: Package },
  { label: "CANCELLED", value: "1", icon: XCircle },
  { label: "REVENUE", value: "PKR 1,075,700", icon: DollarSign },
];

export default function AdminOrders() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Nested useState for Filters
  const [filters, setFilters] = useState({
    search: "",
    status: "ALL",
    date: "ALL",
  });

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 800); return () => clearTimeout(t); }, []);

  const renderStatus = (status: Order["status"]) => {
    const styles = { CONFIRMED: "border-blue-500/30 text-blue-600 bg-blue-50/50", DELIVERED: "border-[var(--color-success)]/30 text-[var(--color-success)] bg-emerald-50/50", PENDING: "border-amber-500/30 text-amber-600 bg-amber-50/50", CANCELLED: "border-[var(--color-danger)]/30 text-[var(--color-danger)] bg-red-50/50" }[status];
    return <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider border ${styles}`}><span className="w-1.5 h-1.5 rounded-full bg-current" />{status}</span>;
  };

  const filtered = useMemo(() => sampleOrders.filter((o) => {
    const mSearch = o.id.toLowerCase().includes(filters.search.toLowerCase()) || o.customer.toLowerCase().includes(filters.search.toLowerCase()) || o.phone.includes(filters.search);
    const mStatus = filters.status === "ALL" || o.status === filters.status;
    let mDate = true;
    if (filters.date !== "ALL") {
      const diff = (Date.now() - new Date(o.createdAt).getTime()) / (1000 * 3600 * 24);
      mDate = filters.date === "TODAY" ? diff < 1 : filters.date === "7_DAYS" ? diff <= 7 : diff <= 30;
    }
    return mSearch && mStatus && mDate;
  }), [filters]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginatedData = useMemo(() => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [filtered, page]);

  const columns: Column<Order>[] = [
    { header: "Order", accessorKey: "id", render: (r) => <span className="font-semibold text-[var(--color-accent)]">{r.id}</span> },
    { header: "Customer", accessorKey: "customer", className: "font-bold text-[var(--color-text-dark)]" },
    { header: "Phone Number", accessorKey: "phone", className: "text-[var(--color-muted)]" },
    { header: "Items", accessorKey: "items" },
    { header: "Total", render: (r) => <span className="font-bold">PKR {r.total.toLocaleString()}</span> },
    { header: "Status", render: (r) => renderStatus(r.status) },
    { header: "Actions", className: "text-right", render: () => (
      <div className="flex items-center justify-center">
        <Button variant="ghost" size="sm" className="!p-1.5 text-[var(--color-muted)] hover:text-[var(--color-accent)]"><Eye className="w-4 h-4" /></Button>
      </div>
    )},
  ];

  return (
    <div className="p-6 space-y-6">
      {/* 8 Stats Grid Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statsConfig.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="p-4 rounded-2xl bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-[10px] font-bold tracking-widest text-[var(--color-muted)] uppercase">{stat.label}</p>
              <h2 className="text-xl font-bold text-[var(--color-text-dark)]">{stat.value}</h2>
            </div>
          );
        })}
      </div>

      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-sm">
        <div><h1 className="text-base font-bold tracking-wider text-[var(--color-text-dark)] uppercase">Order Management</h1><p className="text-xs text-[var(--color-muted)] mt-0.5">Manage, search & filter customer orders</p></div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)] pointer-events-none" />
            <input type="text" placeholder="Search..." value={filters.search} onChange={(e) => handleFilterChange("search", e.target.value)} className="w-full h-10 pl-10 pr-4 text-xs bg-[var(--color-card-bg)] rounded-lg border border-[var(--color-border)] text-[var(--color-text-dark)] focus:outline-none focus:border-[var(--color-accent)] transition-all" />
          </div>
          <FormSelect options={dateOpts} value={filters.date} onChange={(e) => handleFilterChange("date", e.target.value)} containerClassName="!w-36" className="!py-2 text-xs !rounded-lg" />
          <FormSelect options={statusOpts} value={filters.status} onChange={(e) => handleFilterChange("status", e.target.value)} containerClassName="!w-36" className="!py-2 text-xs !rounded-lg" />
        </div>
      </div>

      {/* Table Section */}
      {isLoading ? <TableSkeleton rows={3} columns={7} /> : <DataTable columns={columns} data={paginatedData} keyExtractor={(i) => i.id} currentPage={page} totalPages={totalPages} onPageChange={setPage} emptyMessage="No matching orders found." />}
    </div>
  );
}