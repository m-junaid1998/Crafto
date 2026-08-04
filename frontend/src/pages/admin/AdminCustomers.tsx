import { useState, useMemo, useEffect } from "react";
import { Search, Phone, Star } from "lucide-react";
import { DataTable, type Column } from "../../components/DataTable";
import { Button } from "../../components/Button";
import { FormSelect, type SelectOption } from "../../components/FormSelect";
import { TableSkeleton } from "../../components/TableSkeleton";
import { WhatsAppIcon } from "../../utils/socialicons";

interface Customer { id: string; name: string; initials: string; phone: string; city: string; ordersCount: number; totalSpent: number; }

const sampleCustomers: Customer[] = [
  { id: "1", name: "Hania Ahmed", initials: "HA", phone: "03521867825", city: "Karachi", ordersCount: 1, totalSpent: 650 },
  { id: "2", name: "Mubashir Irfan", initials: "MU", phone: "03326699876", city: "Karachi", ordersCount: 1, totalSpent: 30000 },
  { id: "3", name: "Junaid Irfan", initials: "JU", phone: "+923323399238", city: "Karachi", ordersCount: 5, totalSpent: 404300 },
  { id: "4", name: "Hiba Ahmed", initials: "HI", phone: "+92332339569263", city: "Karachi", ordersCount: 1, totalSpent: 4000 },
  { id: "5", name: "Marium", initials: "MA", phone: "03368976543", city: "Multan", ordersCount: 1, totalSpent: 160800 },
];

const cityOpts: SelectOption[] = [{ label: "All Cities", value: "ALL" }, { label: "Karachi", value: "Karachi" }, { label: "Multan", value: "Multan" }];
const PAGE_SIZE = 3;

export default function AdminCustomers() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", city: "ALL" });

  const handleFilter = (k: keyof typeof filters, v: string) => { setFilters((p) => ({ ...p, [k]: v })); setPage(1); };
  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 800); return () => clearTimeout(t); }, []);

  const totalCustomers = sampleCustomers.length;
  const repeatBuyers = useMemo(() => sampleCustomers.filter((c) => c.ordersCount > 1).length, []);

  const filtered = useMemo(() => sampleCustomers.filter((c) => {
    const mSearch = c.name.toLowerCase().includes(filters.search.toLowerCase()) || c.phone.includes(filters.search) || c.city.toLowerCase().includes(filters.search.toLowerCase());
    return mSearch && (filters.city === "ALL" || c.city === filters.city);
  }), [filters]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginatedData = useMemo(() => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [filtered, page]);

  const columns: Column<Customer>[] = [
    { header: "Customer", render: (r) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-bold text-xs flex items-center justify-center shrink-0">{r.initials}</div>
        <div>
          <span className="font-bold text-[var(--color-text-dark)] block leading-tight">{r.name}</span>
          {r.ordersCount > 1 && <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--color-accent)] mt-0.5"><Star className="w-3 h-3 fill-[var(--color-accent)]" />Repeat customer</span>}
        </div>
      </div>
    )},
    { header: "Phone", accessorKey: "phone", className: "text-[var(--color-muted)] font-medium" },
    { header: "City", accessorKey: "city", className: "text-[var(--color-muted)]" },
    { header: "Orders", accessorKey: "ordersCount", className: "font-semibold" },
    { header: "Total Spent", render: (r) => <span className="font-bold text-[var(--color-text-dark)]">PKR {r.totalSpent.toLocaleString()}</span> },
    { header: "Contact", className: "text-right", render: (r) => (
      <div className="flex items-center gap-1.5 justify-end">
        <Button variant="ghost" size="sm" onClick={() => window.open(`tel:${r.phone}`)} className="!p-1.5 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-accent)]"><Phone className="w-3.5 h-3.5" /></Button>
        <Button variant="ghost" size="sm" onClick={() => window.open(`https://wa.me/${r.phone.replace(/[^0-9]/g, "")}`)} className="!p-1.5 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] hover:text-emerald-500"><WhatsAppIcon className="w-3.5 h-3.5" /></Button>
      </div>
    )},
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-sm">
        <div>
          <h1 className="text-base font-bold tracking-wider text-[var(--color-text-dark)] uppercase">Customer Directory</h1>
          <p className="text-xs font-semibold text-[var(--color-accent)] mt-0.5">{totalCustomers} customers <span className="mx-1 text-[var(--color-muted)]">•</span> {repeatBuyers} repeat {repeatBuyers === 1 ? "buyer" : "buyers"}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)] pointer-events-none" />
            <input type="text" placeholder="Search customer..." value={filters.search} onChange={(e) => handleFilter("search", e.target.value)} className="w-full h-10 pl-10 pr-4 text-xs bg-[var(--color-card-bg)] rounded-lg border border-[var(--color-border)] text-[var(--color-text-dark)] focus:outline-none focus:border-[var(--color-accent)] transition-all" />
          </div>
          <FormSelect options={cityOpts} value={filters.city} onChange={(e) => handleFilter("city", e.target.value)} containerClassName="!w-36" className="!py-2 text-xs !rounded-lg" />
        </div>
      </div>
      {isLoading ? <TableSkeleton rows={5} columns={6} /> : <DataTable columns={columns} data={paginatedData} keyExtractor={(i) => i.id} currentPage={page} totalPages={totalPages} onPageChange={setPage} emptyMessage="No customers found." />}
    </div>
  );
}