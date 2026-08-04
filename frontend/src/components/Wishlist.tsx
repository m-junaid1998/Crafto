import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Heart, ArrowRight } from 'lucide-react';

interface WishlistItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
}

const initialWishlist: WishlistItem[] = [
  { id: '1', name: 'Sculptural Brass Candle Stand', category: 'Candle Stands', price: 4500, originalPrice: 5200, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600&auto=format&fit=crop', inStock: true },
  { id: '2', name: 'Oud Royal Eau de Parfum (100ml)', category: 'Luxury Perfumes', price: 8900, image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=600&auto=format&fit=crop', inStock: true },
  { id: '3', name: 'Minimalist Ceramic Vase Set', category: 'Home Decor', price: 3200, originalPrice: 3800, image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=600&auto=format&fit=crop', inStock: false },
];

const Wishlist: React.FC = () => {
  const [items, setItems] = useState<WishlistItem[]>(initialWishlist);

  const removeItem = (id: string) => setItems((prev) => prev.filter((item) => item.id !== id));
  const clearAll = () => setItems([]);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[var(--color-bg-light)] flex flex-col items-center justify-center text-center px-4 font-sans text-[var(--color-text-dark)]">
        <div className="w-20 h-20 rounded-full bg-[var(--color-card-bg)] border border-[var(--color-border)] flex items-center justify-center mb-6 text-[var(--color-muted)]">
          <Heart size={36} strokeWidth={1.5} />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-2">Your Wishlist is Empty</h2>
        <p className="text-[var(--color-muted)] text-xs sm:text-sm max-w-sm mb-8">Explore our home decor and luxury fragrance collections to save your favorite items.</p>
        <Link to="/shop" className="inline-flex items-center space-x-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all">
          <span>Explore Products</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] py-12 px-4 sm:px-6 lg:px-12 font-sans text-[var(--color-text-dark)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-[var(--color-border)]">
          <div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">My Wishlist</h1>
            <p className="text-[var(--color-muted)] text-xs sm:text-sm mt-1">Saved items ({items.length})</p>
          </div>
          <button onClick={clearAll} className="self-start sm:self-auto text-xs font-semibold text-[var(--color-muted)] hover:text-[var(--color-danger)] transition-colors flex items-center space-x-1">
            <Trash2 size={14} />
            <span>Clear Wishlist</span>
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group relative bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              {/* Image Container */}
              <div className="relative aspect-square w-full bg-[var(--color-card-bg)] overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                <button onClick={() => removeItem(item.id)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-[var(--color-border)] text-gray-600 hover:text-[var(--color-danger)] flex items-center justify-center transition-all shadow-sm">
                  <Trash2 size={14} />
                </button>
                {!item.inStock && (
                  <span className="absolute bottom-3 left-3 bg-black/75 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">Out of Stock</span>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--color-muted)] block mb-1">{item.category}</span>
                  <h3 className="text-sm font-bold text-[var(--color-text-dark)] line-clamp-1 mb-2">{item.name}</h3>
                  <div className="flex items-baseline space-x-2 mb-4">
                    <span className="text-sm font-bold text-[var(--color-text-dark)]">Rs. {item.price.toLocaleString()}</span>
                    {item.originalPrice && <span className="text-xs text-[var(--color-muted)] line-through">Rs. {item.originalPrice.toLocaleString()}</span>}
                  </div>
                </div>

                {/* Move to Cart Action */}
                <button disabled={!item.inStock} className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl flex items-center justify-center space-x-2 transition-all">
                  <ShoppingBag size={14} />
                  <span>{item.inStock ? 'Add to Cart' : 'Unavailable'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;