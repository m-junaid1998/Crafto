import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

interface ProductDetailsProps {
  product?: {
    id: string;
    title: string;
    sku: string;
    originalPrice: number;
    discountedPrice: number;
    discountPercentage: number;
    description: string;
    colors: string[];
    sizes: (string | number)[];
    images: string[];
  };
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  // Sample fallback data if props are empty
  const defaultProduct = {
    id: 'wn4489',
    title: 'Blue Women Moccasin WN4489',
    sku: 'WN4489-12-36',
    originalPrice: 4800,
    discountedPrice: 1800,
    discountPercentage: 44,
    description: 'Cozy and stylish moccasin, offering a comfortable fit and timeless design for casual wear.',
    colors: ['Blue', 'Maroon'],
    sizes: [36, 37, 38, 39, 40, 41, 42],
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop',
    ],
  };

  const data = product || defaultProduct;
  const [selectedImg, setSelectedImg] = useState(data.images[0]);
  const [selectedColor, setSelectedColor] = useState(data.colors[0]);
  const [selectedSize, setSelectedSize] = useState<(string | number)>(data.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Vertical Thumbnails + Main Image */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Vertical Thumbnails */}
          <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto shrink-0 max-h-[550px]">
            {data.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(img)}
                className={`w-16 h-20 border overflow-hidden shrink-0 transition-all ${
                  selectedImg === img ? 'border-gray-900 ring-1 ring-gray-900' : 'border-gray-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Large Image */}
          <div className="w-full aspect-[3/4] bg-gray-100 overflow-hidden relative border border-gray-100">
            <img src={selectedImg} alt={data.title} className="w-full h-full object-cover" />
            <span className="absolute top-0 right-0 bg-[#E6007E] text-white text-xs font-bold uppercase px-3 py-1">
              Sale
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Information & Purchase Options */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{data.title}</h1>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">SKU: {data.sku}</p>
          </div>

          {/* Price & Discount */}
          <div className="flex items-center gap-3">
            <span className="text-gray-400 line-through text-sm">Rs.{data.originalPrice.toLocaleString()}</span>
            <span className="text-xl font-bold text-[#055038]">Rs.{data.discountedPrice.toLocaleString()}</span>
            <span className="text-[#E6007E] text-xs font-semibold">Save {data.discountPercentage}%</span>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">{data.description}</p>

          <hr className="border-gray-100" />

          {/* Color Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">Color</label>
            <div className="flex gap-2">
              {data.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-1.5 text-xs font-medium border transition-all ${
                    selectedColor === color ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 text-gray-700 hover:border-gray-900'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Size</label>
              <button className="text-xs text-gray-500 underline hover:text-gray-900">Size Chart 📏</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-9 h-9 text-xs border font-medium flex items-center justify-center transition-all ${
                    selectedSize === size ? 'border-[#E6007E] bg-[#E6007E] text-white font-bold' : 'border-gray-300 text-gray-700 hover:border-gray-900'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Counter */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">Quantity</label>
            <div className="inline-flex items-center border border-gray-300 rounded-sm">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-sm font-semibold hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 text-xs font-bold text-gray-800">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 text-sm font-semibold hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Stock Status */}
          <p className="text-xs text-emerald-600 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> In Stock, ready to ship
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 mt-2">
            <button className="w-full py-3 bg-white border-2 border-gray-900 text-gray-900 text-xs font-bold uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-colors">
              Add To Cart
            </button>
            <button className="w-full py-3 bg-[#E6007E] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#c4006c] transition-colors shadow-sm">
              Buy It Now
            </button>
          </div>

          {/* Trust Badge Box */}
          <div className="border border-pink-100 bg-pink-50/30 p-3 rounded-sm mt-2 text-xs text-gray-600 flex flex-col gap-1.5">
            <p className="font-semibold text-gray-800">🚚 Free Shipping on all Prepaid Orders</p>
            <p className="text-[11px] text-gray-500">Fast Delivery in 5 - 7 Business Days</p>
          </div>
        </div>

      </div>
    </div>
  );
};