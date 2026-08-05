import React, { useState } from "react";
import { Lock, Truck, ShieldCheck} from "lucide-react";
import { z } from "zod";
import { FormInput } from "../components/FormInput";
import { Button } from "../components/Button";
import { Breadcrumb } from "../components/Breadcrumb";
import { toast } from "../utils/toast";
import { WhatsAppIcon } from "../utils/socialicons";

const checkoutSchema = z.object({
  fullName: z.string().min(1, "Full Name required"),
  phone: z.string().regex(/^((\+92)|(0092)|(0))?3[0-9]{9}$/, "Valid PK number required"),
  city: z.string().min(1, "City required"),
  area: z.string().min(1, "Area required"),
  address: z.string().min(5, "Address required"),
  postalCode: z.string().optional(),
  orderNotes: z.string().optional(),
});

export default function Checkout() {
  const [form, setForm] = useState({ fullName: "", phone: "", city: "", postalCode: "", area: "", address: "", orderNotes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([
    { id: 1, name: "Diamond Ring", price: 400, qty: 1, img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=60" },
    { id: 2, name: "Double Heart", price: 100, qty: 5, img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=60" },
  ]);

  const updateQty = (id: number, delta: number) => setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const totalAmount = subtotal + 200;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const res = checkoutSchema.safeParse(form);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach(i => { if (i.path[0]) errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return toast.error("Validation Error", res.error.issues[0].message);
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); toast.success("Order Placed!", `Total: PKR ${totalAmount}`); }, 1200);
  };

  const handleWhatsApp = () => {
    if (!validate()) return;
    const msg = `*NEW ORDER*\nName: ${form.fullName}\nPhone: ${form.phone}\nAddress: ${form.address}, ${form.area}, ${form.city}\nTotal: PKR ${totalAmount}`;
    window.open(`https://wa.me/923238224745?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const ReqLabel = ({ text }: { text: string }) => (
    <span>
      {text} <span className="text-red-500 font-bold ml-0.5">*</span>
    </span>
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] text-[var(--color-text-dark)] py-8 px-4 max-w-7xl mx-auto space-y-6">
      <Breadcrumb items={[{ label: "Home", link: "/" }, { label: "Checkout" }]} />
      <div className="text-center space-y-1"><span className="text-[10px] font-bold tracking-widest text-[var(--color-accent)] uppercase">SECURE CHECKOUT</span><h1 className="text-3xl sm:text-4xl font-bold font-serif">Complete Your Order</h1><p className="text-xs text-[var(--color-muted)] flex items-center justify-center gap-1"><Lock size={12}/> Your information is safe and used only for delivery</p></div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3"><h2 className="text-lg font-bold font-serif">Customer Information</h2><span className="text-[10px] font-bold text-[var(--color-muted)] tracking-widest uppercase">STEP 1</span></div>
            
            <FormInput label={<ReqLabel text="Full Name" />} name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} placeholder="Enter Full Name" className="!bg-[var(--color-card-bg)] !border-[var(--color-border)]" />
            <FormInput label={<ReqLabel text="Phone Number" />} name="phone" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="03001234567" className="!bg-[var(--color-card-bg)] !border-[var(--color-border)]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <FormInput label={<ReqLabel text="City" />} name="city" value={form.city} onChange={handleChange} error={errors.city} placeholder="Enter City" className="!bg-[var(--color-card-bg)] !border-[var(--color-border)]" />
              <FormInput label="Postal Code" name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Postal Code (Optional)" className="!bg-[var(--color-card-bg)] !border-[var(--color-border)]" />
            </div>
            <FormInput label={<ReqLabel text="Area / Town" />} name="area" value={form.area} onChange={handleChange} error={errors.area} placeholder="Enter Your Area/Town" className="!bg-[var(--color-card-bg)] !border-[var(--color-border)]" />
            <FormInput label={<ReqLabel text="Complete Delivery Address" />} name="address" value={form.address} onChange={handleChange} error={errors.address} placeholder="House #, Street, Landmark..." className="!bg-[var(--color-card-bg)] !border-[var(--color-border)]" />
            <textarea name="orderNotes" value={form.orderNotes} onChange={handleChange} rows={3} placeholder="Order Notes (optional)" className="w-full rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)] p-3 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] resize-none" />
          </div>
          <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 shadow-sm space-y-4"><div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3"><h2 className="text-lg font-bold font-serif">Shipping Method</h2><span className="text-[10px] font-bold text-[var(--color-muted)] tracking-widest uppercase">STEP 2</span></div><div className="flex items-start gap-3 p-4 rounded-xl border border-[var(--color-accent)]/40 bg-[var(--color-card-bg)]"><Truck className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" /><div><h4 className="text-xs font-bold">Standard Delivery</h4><p className="text-[11px] text-[var(--color-muted)]">Estimated delivery: 3–5 business days across Pakistan</p><p className="text-[10px] font-bold text-[var(--color-success)] mt-1">Free shipping on orders over PKR 3,000</p></div></div></div>
          <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 shadow-sm space-y-4"><div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3"><h2 className="text-lg font-bold font-serif">Payment Method</h2><span className="text-[10px] font-bold text-[var(--color-muted)] tracking-widest uppercase">STEP 3</span></div><div className="p-4 rounded-xl border border-[var(--color-accent)] bg-[var(--color-card-bg)] space-y-1.5"><div className="flex items-center gap-2"><h4 className="text-xs font-bold">Cash on Delivery (COD)</h4><span className="text-[9px] font-bold uppercase bg-[var(--color-accent)]/20 text-[var(--color-accent-hover)] px-2 py-0.5 rounded-md">Recommended</span></div><p className="text-[11px] text-[var(--color-muted)]">Pay in cash when your order arrives at your doorstep.</p><p className="text-[10px] text-[var(--color-text-dark)] font-medium flex items-center gap-1 pt-1"><ShieldCheck size={12} className="text-[var(--color-success)]" /> 100% secure — Inspect before payment</p></div></div>
        </div>
        <div className="lg:col-span-5">
          <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 shadow-sm sticky top-6 space-y-5">
            <h2 className="text-lg font-bold font-serif border-b border-[var(--color-border)] pb-3">Order Summary</h2>
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium text-center">Free delivery on all premium orders above PKR 3,000.</div>
            <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar divide-y divide-[var(--color-border)]">{items.map((i) => (<div key={i.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3"><div className="flex items-center gap-3"><img src={i.img} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-[var(--color-border)]" /><div><h4 className="text-xs font-bold text-[var(--color-text-dark)]">{i.name}</h4><p className="text-[11px] text-[var(--color-muted)]">PKR {i.price}</p></div></div><div className="flex items-center border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-card-bg)]"><button type="button" onClick={() => updateQty(i.id, -1)} className="px-2 py-1 text-xs font-bold hover:bg-gray-200">-</button><span className="px-2.5 text-xs font-bold">{i.qty}</span><button type="button" onClick={() => updateQty(i.id, 1)} className="px-2 py-1 text-xs font-bold hover:bg-gray-200">+</button></div></div>))}</div>
            <div className="border-t border-[var(--color-border)] pt-4 space-y-2 text-xs"><div className="flex justify-between text-[var(--color-muted)]"><span>Subtotal ({items.length} items)</span><span className="font-semibold text-[var(--color-text-dark)]">PKR {subtotal}</span></div><div className="flex justify-between text-[var(--color-muted)]"><span>Delivery Charges</span><span className="font-semibold text-[var(--color-text-dark)]">PKR 200</span></div><div className="flex justify-between border-t border-[var(--color-border)] pt-3 text-sm font-bold"><span>TOTAL AMOUNT</span><span className="text-[var(--color-accent)]">PKR {totalAmount}</span></div></div>
            <Button type="submit" disabled={loading} className="w-full !py-3.5 text-xs font-bold rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white shadow-md transition-all"><span className="inline-flex items-center justify-center gap-2 whitespace-nowrap"><Lock size={14} />{loading ? "PROCESSING..." : `PLACE ORDER • PKR ${totalAmount}`}</span></Button>
            <button type="button" onClick={handleWhatsApp} className="w-full py-3 px-4 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"><WhatsAppIcon size={14} /> ORDER VIA WHATSAPP</button>
          </div>
        </div>
      </form>
    </div>
  );
}