import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { sampleProducts } from '../utils/sampleProduct';
import { Breadcrumb } from '../components/Breadcrumb';
import { CustomerReviews } from '../components/CustomerReviews';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const data = sampleProducts.find((p) => String(p.id) === String(id));

  const [state, setState] = useState({ img: '', color: '', size: '' as string | number, qty: 1, showDesc: true });

  useEffect(() => {
    if (data) setState({ img: data.images?.[0] || '', color: data.colors?.[0] || '', size: data.sizes?.[0] || '', qty: 1, showDesc: true });
  }, [id, data]);

  if (!data) return <div className="p-20 text-center text-xl font-bold font-serif text-[var(--color-text-dark)]">Product Not Found</div>;

  const { images = [], colors = [], sizes = [] } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 font-sans text-[var(--color-text-dark)]">
      <div className="mb-6"><Breadcrumb items={[{ label: 'Home', link: '/' }, { label: 'Shop', link: '/shop' }, { label: data.title }]} /></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Section: Thumbnails & Main Image */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {images.length > 1 && (
            <div className="flex sm:flex-col gap-3 overflow-auto max-h-[580px] shrink-0 no-scrollbar">
              {images.map((img, i) => (
                <button key={i} onClick={() => setState((p) => ({ ...p, img }))} className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl border overflow-hidden shrink-0 ${state.img === img ? 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]' : 'border-gray-200'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          <div className="w-full aspect-square sm:aspect-[4/5] bg-[var(--color-bg-light)] rounded-2xl relative overflow-hidden">
            {data.isSale && <span className="absolute top-4 left-4 bg-[var(--color-accent)] text-white text-xs font-bold uppercase px-3 py-1.5 rounded-full z-10">Sale</span>}
            <img src={state.img || images[0]} alt={data.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right Section: Details */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div>
            <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">SKU: {data.sku}</span>
            <h1 className="text-3xl font-serif font-bold text-[var(--color-text-dark)] mt-1">{data.title}</h1>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-[var(--color-text-dark)]">Rs.{data.discountedPrice.toLocaleString()}</span>
            {data.originalPrice > data.discountedPrice && (
              <>
                <span className="text-gray-400 line-through text-base font-medium">Rs.{data.originalPrice.toLocaleString()}</span>
                <span className="bg-[var(--color-accent)]/15 text-[var(--color-primary)] text-xs font-bold px-2.5 py-1 rounded-full">Save {data.discountPercentage}%</span>
              </>
            )}
          </div>

          {colors.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-2"><label className="text-xs font-bold uppercase tracking-wider text-gray-600">Color</label><span className="text-xs font-semibold">{state.color}</span></div>
              <div className="flex flex-wrap gap-2.5">{colors.map((c) => (<button key={c} onClick={() => setState((p) => ({ ...p, color: c }))} className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${state.color === c ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white' : 'border-gray-200 text-[var(--color-text-dark)] bg-white'}`}>{c}</button>))}</div>
            </div>
          )}

          {sizes.length > 0 && (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block mb-2">Size</label>
              <div className="flex flex-wrap gap-2">{sizes.map((s) => (<button key={s} onClick={() => setState((p) => ({ ...p, size: s }))} className={`min-w-[42px] h-10 px-3 text-xs font-bold rounded-lg border transition-all ${state.size === s ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white' : 'border-gray-200 text-[var(--color-text-dark)] bg-white'}`}>{s}</button>))}</div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block mb-2">Quantity</label>
            <div className="flex gap-3">
              <div className="inline-flex items-center border border-gray-200 rounded-xl bg-[var(--color-bg-light)] p-1">
                <button onClick={() => setState((p) => ({ ...p, qty: Math.max(1, p.qty - 1) }))} className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-white rounded-lg">-</button>
                <span className="w-10 text-center text-xs font-bold text-[var(--color-text-dark)]">{state.qty}</span>
                <button onClick={() => setState((p) => ({ ...p, qty: p.qty + 1 }))} className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-white rounded-lg">+</button>
              </div>
              <button className="flex-1 py-3 px-6 bg-[var(--color-primary)] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[var(--color-primary-hover)] transition-colors">Add to Cart</button>
            </div>
          </div>

          <button className="w-full py-3.5 bg-[var(--color-accent)] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:opacity-90 transition-opacity">Buy it now</button>

          {data.description && (
            <div className="border-t border-gray-200/60 pt-3 mt-2">
              <button onClick={() => setState((p) => ({ ...p, showDesc: !p.showDesc }))} className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[var(--color-text-dark)]">
                <span>Description</span><span>{state.showDesc ? '−' : '+'}</span>
              </button>
              {state.showDesc && <p className="text-xs text-gray-600 leading-relaxed mt-2.5">{data.description}</p>}
            </div>
          )}
        </div>
      </div>

      <CustomerReviews />
    </div>
  );
}