import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';

export interface CartItem { id: string | number; title: string; price: number; quantity: number; image: string; }
interface CartDrawerProps { isOpen?: boolean; onClose?: () => void; }

const THRESHOLD = 3000, SHIPPING = 250;

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen = false, onClose = () => {} }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([
    { id: 1, title: 'Diamond Solitaire Ring', price: 400, quantity: 1, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=200' },
    { id: 2, title: 'Double Heart Gold Necklace', price: 100, quantity: 4, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=200' },
  ]);

  const updateQty = (id: string | number, delta: number) => setItems(p => p.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  const removeItem = (id: string | number) => setItems(p => p.filter(i => i.id !== id));

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const isFree = subtotal >= THRESHOLD;
  const remaining = THRESHOLD - subtotal;
  const totalQty = items.reduce((s, i) => s + i.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-all duration-300" onClick={onClose} />
      <aside className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[var(--color-bg-light)] text-[var(--color-text-dark)] z-50 flex flex-col justify-between shadow-2xl p-5 border-l border-[var(--color-border)]">
        <div>
          <div className="flex items-center justify-between pb-3.5 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center shadow-xs"><ShoppingBag size={16} /></div>
              <div><h2 className="text-base font-serif font-bold text-[var(--color-primary)] leading-none">Your Cart</h2><p className="text-[10px] font-bold text-[var(--color-muted)] mt-0.5">{totalQty} {totalQty === 1 ? 'item' : 'items'}</p></div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-card-bg)] text-[var(--color-primary)] flex items-center justify-center cursor-pointer transition-colors"><X size={15} /></button>
          </div>

          <div className="mt-4 p-3 bg-[var(--color-card-bg)] rounded-xl border border-[var(--color-border)] shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-dark)] mb-2">
              <Sparkles size={14} className="text-[var(--color-accent)] shrink-0 animate-pulse" />
              {isFree ? <span className="text-[var(--color-success)] font-bold">You unlocked FREE Shipping! 🎉</span> : <span>You're <strong className="text-[var(--color-accent)] font-bold">PKR {remaining.toLocaleString()}</strong> away from free shipping</span>}
            </div>
            <div className="w-full bg-[var(--color-border)] h-1.5 rounded-full overflow-hidden"><div className="bg-[var(--color-accent)] h-full transition-all duration-500 rounded-full" style={{ width: `${Math.min(100, (subtotal / THRESHOLD) * 100)}%` }} /></div>
          </div>

          <div className="mt-4 space-y-2.5 max-h-[44vh] overflow-y-auto no-scrollbar pr-0.5">
            {items.length === 0 ? <p className="text-center py-10 text-[var(--color-muted)] text-xs font-medium">Your bag is empty.</p> : items.map(i => (
              <div key={i.id} className="flex items-center gap-3 bg-[var(--color-card-bg)] p-2.5 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all">
                <img src={i.image} alt={i.title} className="w-14 h-14 object-cover rounded-lg shrink-0 bg-white border border-[var(--color-border)]" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start"><h3 className="text-xs font-serif font-bold text-[var(--color-text-dark)] truncate">{i.title}</h3><button onClick={() => removeItem(i.id)} className="text-[var(--color-muted)] hover:text-[var(--color-danger)] cursor-pointer transition-colors"><Trash2 size={13} /></button></div>
                  <p className="text-xs font-extrabold text-[var(--color-accent)] mt-0.5">PKR {i.price.toLocaleString()}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="inline-flex items-center border border-[var(--color-border)] rounded-full bg-[var(--color-bg-light)] px-1.5 py-0.5 shadow-2xs">
                      <button onClick={() => updateQty(i.id, -1)} className="text-[var(--color-muted)] hover:text-[var(--color-primary)] p-0.5 cursor-pointer"><Minus size={10} /></button>
                      <span className="text-[10px] font-bold px-2 text-[var(--color-primary)]">{i.quantity}</span>
                      <button onClick={() => updateQty(i.id, 1)} className="text-[var(--color-muted)] hover:text-[var(--color-primary)] p-0.5 cursor-pointer"><Plus size={10} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-[var(--color-border)] space-y-2.5">
          <div className="space-y-1 text-xs text-[var(--color-muted)] bg-[var(--color-card-bg)] p-2.5 rounded-xl border border-[var(--color-border)]">
            <div className="flex justify-between"><span>Subtotal</span><span className="font-bold text-[var(--color-text-dark)]">PKR {subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between items-center"><span>Delivery</span><span className={isFree ? 'bg-[var(--color-success)]/10 text-[var(--color-success)] font-bold text-[10px] px-2 py-0.5 rounded-full' : 'font-bold text-[var(--color-text-dark)]'}>{isFree ? 'FREE' : `PKR ${SHIPPING}`}</span></div>
          </div>
          <div className="flex items-center justify-between px-1"><span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">EST. TOTAL</span><span className="text-lg font-black text-[var(--color-accent)]">PKR {(subtotal + (isFree || subtotal === 0 ? 0 : SHIPPING)).toLocaleString()}</span></div>
          <button onClick={() => { onClose(); navigate('/checkout'); }} disabled={items.length === 0} className="w-full py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 group"><span>Proceed to Checkout</span><ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" /></button>
          <button onClick={onClose} className="w-full text-center text-xs font-semibold text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors cursor-pointer block">Continue Shopping</button>
        </div>
      </aside>
    </>
  );
};