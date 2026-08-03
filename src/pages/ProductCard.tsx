import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Zap } from 'lucide-react';

export interface Product { id: string | number; title: string; sku: string; originalPrice: number; discountedPrice: number; discountPercentage: number; images: string[]; sizes: (string | number)[]; isSale?: boolean; }

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || '');
  const [selectedSize, setSelectedSize] = useState<(string | number) | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <article className="group flex flex-col items-center w-full bg-[var(--color-bg-light)] text-center font-sans p-3 border border-[var(--color-border)] hover:shadow-lg transition-all rounded-xl relative">
      <button type="button" aria-label="Add to Wishlist" onClick={() => setIsWishlisted(!isWishlisted)} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[var(--color-primary)] hover:text-[var(--color-danger)] transition-colors shadow-sm cursor-pointer">
        <Heart size={15} className={isWishlisted ? 'fill-[var(--color-danger)] text-[var(--color-danger)]' : ''} />
      </button>

      <button type="button" onClick={() => navigate(`/product/${product.id}`)} aria-label={`View ${product.title}`} className="relative w-full aspect-[3/4] overflow-hidden bg-[var(--color-card-bg)] mb-2.5 rounded-lg cursor-pointer">
        <img src={selectedImage} alt={product.title} loading="lazy" width="300" height="400" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {product.isSale && <span className="absolute top-2 left-2 bg-[var(--color-danger)] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">Sale</span>}
      </button>

      {product.images?.length > 1 && (
        <div className="flex flex-wrap gap-1 mb-2 justify-center max-h-16 overflow-y-auto no-scrollbar">
          {product.images.map((img, idx) => (
            <button key={idx} type="button" aria-label={`Select thumbnail ${idx + 1}`} onClick={(e) => { e.stopPropagation(); setSelectedImage(img); }} className={`w-7 h-9 border p-0.5 overflow-hidden shrink-0 rounded-xs transition-colors cursor-pointer ${selectedImage === img ? 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]' : 'border-[var(--color-border)] hover:border-[var(--color-muted)]'}`}>
              <img src={img} alt="" width="28" height="36" className="w-full h-full object-cover rounded-xs" />
            </button>
          ))}
        </div>
      )}

      <button type="button" onClick={() => navigate(`/product/${product.id}`)} className="cursor-pointer mb-1.5 text-center w-full">
        <h3 className="text-xs font-bold text-[var(--color-text-dark)] uppercase leading-snug hover:text-[var(--color-accent)] line-clamp-2 transition-colors">{product.title}</h3>
        <span className="text-[10px] font-semibold text-[var(--color-muted)] block mt-0.5">{product.sku}</span>
      </button>

      <div className="flex items-center justify-center gap-2 text-xs mb-2.5">
        <span className="text-[var(--color-muted)] line-through">Rs.{product.originalPrice?.toLocaleString()}</span>
        <span className="text-[var(--color-primary)] font-bold text-sm">Rs.{product.discountedPrice?.toLocaleString()}</span>
        <span className="text-[var(--color-accent)] font-bold text-[11px]">-{product.discountPercentage}%</span>
      </div>

      {product.sizes?.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1 w-full mb-2.5">
          {product.sizes.map((s) => (
            <button key={s} type="button" aria-label={`Select size ${s}`} onClick={() => setSelectedSize(s)} className={`min-w-[26px] h-6 px-1.5 text-[10px] border font-semibold flex items-center justify-center transition-colors rounded-xs cursor-pointer ${selectedSize === s ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white' : 'border-[var(--color-border)] text-[var(--color-text-dark)] hover:border-[var(--color-primary)]'}`}>{s}</button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 w-full pt-2 border-t border-[var(--color-border)]">
        <button type="button" onClick={(e) => { e.stopPropagation(); alert(`Added ${product.title} to cart`); }} className="w-full py-2 px-2 bg-[var(--color-card-bg)] hover:bg-[var(--color-border)] text-[var(--color-text-dark)] font-bold text-[10px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer">
          <ShoppingBag size={12} /><span>Cart</span>
        </button>
        <button type="button" onClick={(e) => { e.stopPropagation(); navigate('/checkout'); }} className="w-full py-2 px-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold text-[10px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1 transition-colors shadow-xs cursor-pointer">
          <Zap size={12} className="text-[var(--color-accent)]" /><span>Buy Now</span>
        </button>
      </div>
    </article>
  );
};