import React, { useActionState } from "react";
import { X } from "lucide-react";
import { FormSelect, type SelectOption } from "../../components/FormSelect";
import { Button } from "../../components/Button";

export type ItemStatus = 
  | "Pending" 
  | "In Progress" 
  | "Resolved" 
  | "Confirmed" 
  | "Processing" 
  | "Shipped" 
  | "Delivered" 
  | "Cancelled";

export interface OrderItemLog {
  id: string;
  title: string;
  qty: number;
  unitPrice: number;
  image?: string;
}

export type ModalData =
  | {
      id: string; 
      type: "QUERY";
      title: string;
      subtitle: string;
      senderName: string;
      senderEmail: string;
      clientMessage: string;
      status: ItemStatus;
      statusOptions: SelectOption[];
      notes?: string;
      onSaveAction?: (formData: FormData) => Promise<void>;
    }
  | {
      id: string; 
      type: "ORDER";
      title: string;
      subtitle: string;
      status: ItemStatus;
      statusOptions: SelectOption[];
      customerName: string;
      phone: string;
      address: string;
      items: OrderItemLog[];
      subtotal: number;
      shippingFee: number | "FREE";
      grandTotal: number;
      onStatusChange?: (id: string, status: string) => void;
    };

const STYLES: Record<ItemStatus, string> = {
  Pending: "border-amber-500/30 text-amber-600 bg-amber-50/50",
  "In Progress": "border-blue-500/30 text-blue-600 bg-blue-50/50",
  Confirmed: "border-indigo-500/30 text-indigo-600 bg-indigo-50/50",
  Processing: "border-purple-500/30 text-purple-600 bg-purple-50/50",
  Shipped: "border-cyan-500/30 text-cyan-600 bg-cyan-50/50",
  Resolved: "border-[var(--color-success)]/30 text-[var(--color-success)] bg-emerald-50/50",
  Delivered: "border-[var(--color-success)]/30 text-[var(--color-success)] bg-emerald-50/50",
  Cancelled: "border-[var(--color-danger)]/30 text-[var(--color-danger)] bg-red-50/50",
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ModalData | null;
}

export const AdminDetailModal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  const [_, formAction, isPending] = useActionState(async (_: unknown, formData: FormData) => {
    if (data?.type === "QUERY" && data.onSaveAction) {
      await data.onSaveAction(formData);
      onClose();
    }
  }, null);

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
  
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto no-scrollbar rounded-2xl bg-white border border-[var(--color-border)] p-6 shadow-xl z-10 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-serif font-bold text-[var(--color-text-dark)]">{data.title}</h2>
            <p className="text-xs text-[var(--color-muted)]">{data.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--color-muted)] hover:bg-[var(--color-card-bg)] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {data.type === "QUERY" ? (
          <form action={formAction} className="space-y-4">
        
            <div className="p-4 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)] space-y-1">
              <p className="text-[10px] font-bold text-[var(--color-muted)] uppercase">Sender Profile</p>
              <h3 className="text-sm font-bold text-[var(--color-text-dark)]">{data.senderName}</h3>
              <p className="text-xs text-[var(--color-accent)] font-medium">{data.senderEmail}</p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)] space-y-1">
              <p className="text-[10px] font-bold text-[var(--color-muted)] uppercase">Client Message</p>
              <p className="text-xs italic text-[var(--color-text-dark)]">"{data.clientMessage}"</p>
            </div>

            <div className="border-t border-[var(--color-border)] pt-2 flex items-center justify-between">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border ${STYLES[data.status] || "border-gray-200"}`}>
                {data.status}
              </span>
              <FormSelect
                name="status"
                options={data.statusOptions}
                defaultValue={data.status}
                containerClassName="!w-40"
                className="!py-2 text-xs border-[var(--color-accent)]"
              />
            </div>

            {/* Admin Notes */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[var(--color-text-dark)]">Internal Admin Notes</label>
              <textarea
                name="adminNotes"
                rows={3}
                defaultValue={data.notes}
                className="w-full p-3 text-xs bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl outline-none resize-none focus:border-[var(--color-accent)]"
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 text-xs font-bold rounded-xl"
            >
              {isPending ? "Saving..." : "Save Query Changes"}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">

            <div className="p-4 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)] flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-[var(--color-muted)] uppercase mb-1">Current Status</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border ${STYLES[data.status] || "border-gray-200"}`}>
                  {data.status}
                </span>
              </div>
              <FormSelect
                options={data.statusOptions}
                value={data.status}
                onChange={(e) => data.onStatusChange?.(data.id, e.target.value)}
                containerClassName="!w-36"
                className="!py-1.5 text-xs border-[var(--color-accent)]"
              />
            </div>

            {/* Customer Details */}
            <div className="p-4 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)] space-y-1">
              <p className="text-[10px] font-bold text-[var(--color-muted)] uppercase">Delivery Details</p>
              <h3 className="text-sm font-bold text-[var(--color-text-dark)]">{data.customerName}</h3>
              <p className="text-xs text-[var(--color-muted)]">{data.phone} • {data.address}</p>
            </div>

            {/* Items Breakdown */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-[var(--color-muted)] uppercase">Items Log</p>
              <div className="divide-y divide-[var(--color-border)]">
                {data.items.map((item) => (
                  <div key={item.id} className="py-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img src={item.image} alt={item.title} className="w-10 h-10 rounded-lg object-cover border" />
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-[var(--color-text-dark)]">{item.title}</h4>
                        <p className="text-[11px] text-[var(--color-muted)]">Qty {item.qty} × PKR {item.unitPrice.toLocaleString()}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[var(--color-text-dark)]">
                      PKR {(item.qty * item.unitPrice).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Calculation */}
            <div className="p-4 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)] space-y-2 text-xs">
              <div className="flex justify-between text-[var(--color-muted)]">
                <span>Subtotal</span>
                <span className="font-bold text-[var(--color-text-dark)]">PKR {data.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-[var(--color-muted)]">
                <span>Shipping Fee</span>
                {data.shippingFee === "FREE" ? (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-[var(--color-success)] rounded border">FREE</span>
                ) : (
                  <span className="font-bold text-[var(--color-text-dark)]">PKR {data.shippingFee.toLocaleString()}</span>
                )}
              </div>
              <div className="flex justify-between font-bold text-sm border-t border-[var(--color-border)] pt-2 text-[var(--color-text-dark)]">
                <span>Grand Total</span>
                <span className="text-[var(--color-accent)] font-serif text-base">PKR {data.grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};