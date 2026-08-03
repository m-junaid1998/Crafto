import React, { useState } from 'react';

interface Review { id: string; name: string; rating: number; title: string; comment: string; date: string; }
const initialReviews: Review[] = [
  { id: '1', name: 'Ayesha K.', rating: 5, title: 'Absolutely stunning', comment: 'The craftsmanship is exquisite. Packaging felt premium.', date: 'Jul 25, 2026' },
  { id: '2', name: 'Hina M.', rating: 4, title: 'Beautiful piece', comment: 'Looks exactly like the pictures. Quality is excellent.', date: 'Jul 12, 2026' },
];

export const CustomerReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [form, setForm] = useState({ isOpen: false, rating: 0, hover: 0, name: '', title: '', comment: '' });

  const total = reviews.length;
  const avg = total ? (reviews.reduce((a, b) => a + b.rating, 0) / total).toFixed(1) : '0.0';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.rating || !form.name || !form.comment) return;
    const newRev = { id: Date.now().toString(), name: form.name, rating: form.rating, title: form.title, comment: form.comment, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
    setReviews([newRev, ...reviews]);
    setForm({ isOpen: false, rating: 0, hover: 0, name: '', title: '', comment: '' });
  };

  const renderStars = (count: number, interactive = false) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button key={s} type={interactive ? 'button' : 'submit'} disabled={!interactive} onClick={() => interactive && setForm((p) => ({ ...p, rating: s }))} onMouseEnter={() => interactive && setForm((p) => ({ ...p, hover: s }))} onMouseLeave={() => interactive && setForm((p) => ({ ...p, hover: 0 }))} className={`${interactive ? 'cursor-pointer text-xl' : 'cursor-default text-xs'} ${s <= (form.hover || count) ? 'text-[var(--color-accent)]' : 'text-gray-300'}`}>★</button>
      ))}
    </div>
  );

  return (
    <div className="w-full py-6 font-sans text-[var(--color-text-dark)]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-serif text-[var(--color-text-dark)] mb-1">Customer Reviews</h2>
          <div className="flex items-center gap-2 text-xs">{renderStars(Math.round(Number(avg)))}{avg} out of 5 <span className="text-gray-500">({total} reviews)</span></div>
        </div>
        <button onClick={() => setForm((p) => ({ ...p, isOpen: !p.isOpen }))} className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all">{form.isOpen ? 'Cancel' : 'Write a review'}</button>
      </div>

      <div className="space-y-2 mb-8 max-w-lg">
        {[5, 4, 3, 2, 1].map((s) => (
          <div key={s} className="flex items-center gap-3 text-xs text-gray-500 font-medium">
            <span className="w-10 shrink-0">{s} star</span>
            <div className="flex-1 h-2 bg-gray-200/60 rounded-full overflow-hidden"><div className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-300" style={{ width: `${total ? (reviews.filter((r) => r.rating === s).length / total) * 100 : 0}%` }} /></div>
            <span className="w-4 text-right font-bold text-[var(--color-text-dark)]">{reviews.filter((r) => r.rating === s).length}</span>
          </div>
        ))}
      </div>

      {form.isOpen && (
        <form onSubmit={handleSubmit} className="border-t border-gray-200/60 pt-6 mb-8 bg-[var(--color-bg-light)] p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-serif text-[var(--color-text-dark)]">Share your experience</h3>
          <div><label className="text-xs font-bold uppercase tracking-wider text-gray-600 block mb-1">Your Rating</label>{renderStars(form.rating, true)}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-[var(--color-text-dark)] focus:outline-none focus:border-[var(--color-primary)]" />
            <input type="text" placeholder="Review Title (Optional)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-[var(--color-text-dark)] focus:outline-none focus:border-[var(--color-primary)]" />
          </div>
          <textarea required rows={4} placeholder="Tell us what you loved..." value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-[var(--color-text-dark)] focus:outline-none focus:border-[var(--color-primary)] resize-y" />
          <div className="flex justify-end"><button type="submit" className="px-6 py-3 bg-[var(--color-primary)] text-white text-xs font-bold uppercase tracking-wider rounded-xl">Submit review</button></div>
        </form>
      )}

      <div className="divide-y divide-gray-200/60 border-t border-gray-200/60">
        {reviews.map((rev) => (
          <div key={rev.id} className="py-5 flex gap-4">
            <div className="w-9 h-9 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center text-xs font-bold shrink-0">{rev.name.split(' ').map((n) => n[0]).join('').toUpperCase()}</div>
            <div className="flex-1">
              <div className="flex justify-between items-baseline"><h4 className="text-xs font-bold text-[var(--color-text-dark)]">{rev.name}</h4><span className="text-[11px] font-medium text-gray-400">{rev.date}</span></div>
              <div className="my-1">{renderStars(rev.rating)}</div>
              {rev.title && <h5 className="text-xs font-bold text-[var(--color-text-dark)] mt-1">{rev.title}</h5>}
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{rev.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};