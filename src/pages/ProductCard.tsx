import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export interface Product {
  id: string | number; title: string; sku: string; originalPrice: number;
  discountedPrice: number; discountPercentage: number; images: string[];
  sizes: (string | number)[]; isSale?: boolean;
}

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0] || '');
  const [selectedSize, setSelectedSize] = useState<(string | number) | null>(null);

  return (
    <div className="flex flex-col items-center group w-full bg-white text-center font-sans p-2">
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50 mb-3">
        <img src={selectedImage} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {product.isSale && <span className="absolute top-0 right-0 bg-[#E6007E] text-white text-[11px] font-bold uppercase px-2.5 py-1">Sale</span>}
      </div>

      {product.images?.length > 1 && (
        <div className="flex flex-wrap gap-1.5 mb-3 justify-center max-h-20 overflow-y-auto px-1">
          {product.images.map((img, idx) => (
            <button key={idx} onClick={() => setSelectedImage(img)} className={`w-7 h-9 border p-0.5 overflow-hidden shrink-0 ${selectedImage === img ? 'border-gray-800' : 'border-gray-200 hover:border-gray-400'}`}>
              <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <NavLink to={`/product/${product.id}`} className="block mb-2">
        <h3 className="text-[12px] font-semibold text-gray-700 uppercase leading-snug hover:text-primary line-clamp-2">{product.title}</h3>
        <span className="text-[11px] font-medium text-gray-500 block">{product.sku}</span>
      </NavLink>

      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12px] mb-3">
       <span className="text-red-500 line-through font-medium">Rs.{product.originalPrice.toLocaleString()}</span>
       <span className="text-[#055038] font-bold">Rs.{product.discountedPrice.toLocaleString()}</span>
       <span className="w-full sm:w-auto text-pink-500 font-medium text-[11px]">Save {product.discountPercentage}%</span>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5 w-full">
        {product.sizes.map((s) => (
          <button key={s} onClick={() => setSelectedSize(s)} className={`min-w-[28px] h-7 px-2 text-[11px] border font-medium flex items-center justify-center whitespace-nowrap transition-colors ${selectedSize === s ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 text-gray-600 hover:border-gray-900'}`}>{s}</button>
        ))}
      </div>
    </div>
  );
};