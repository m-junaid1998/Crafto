import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { sampleProducts } from '../utils/sampleProduct';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const data = sampleProducts.find((p) => String(p.id) === String(id));

  const images = data?.images || [];
  const colors = data?.colors || ['Standard'];
  const sizes = data?.sizes || [];

  const [selectedImg, setSelectedImg] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState<string | number>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (data) {
      setSelectedImg(images[0] || '');
      setSelectedColor(colors[0] || '');
      setSelectedSize(sizes[0] || '');
    }
  }, [id, data]);

  if (!data) return <div className="p-20 text-center text-xl font-bold">Product Not Found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans text-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {images.length > 1 && (
            <div className="flex sm:flex-col gap-2 overflow-auto max-h-[550px] shrink-0">
              {images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImg(img)} className={`w-16 h-20 border shrink-0 ${selectedImg === img ? 'border-gray-900 ring-1 ring-gray-900' : 'border-gray-200'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          <div className="w-full aspect-[3/4] bg-gray-100 relative border border-gray-100">
            <img src={selectedImg || images[0]} alt={data.title} className="w-full h-full object-cover" />
            {data.isSale && <span className="absolute top-0 right-0 bg-[#E6007E] text-white text-xs font-bold uppercase px-3 py-1">Sale</span>}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold">{data.title}</h1>
            <p className="text-xs text-gray-400 mt-1 uppercase">SKU: {data.sku}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 line-through text-sm">Rs.{data.originalPrice?.toLocaleString()}</span>
            <span className="text-xl font-bold text-[#055038]">Rs.{data.discountedPrice?.toLocaleString()}</span>
            <span className="text-[#E6007E] text-xs font-semibold">Save {data.discountPercentage}%</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">{data.description || "Premium quality product."}</p>
          <hr className="border-gray-100" />
          
          {colors.length > 0 && (
            <div>
              <label className="text-xs font-bold uppercase block mb-2">Color</label>
              <div className="flex gap-2">
                {colors.map((c) => (
                  <button key={c} onClick={() => setSelectedColor(c)} className={`px-4 py-1.5 text-xs border ${selectedColor === c ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300'}`}>{c}</button>
                ))}
              </div>
            </div>
          )}

    {sizes.length > 0 && (
  <div>
    <label className="text-xs font-bold uppercase block mb-2">Size</label>
    <div className="flex flex-wrap gap-2">
      {sizes.map((s) => (
        <button
          key={s}
          onClick={() => setSelectedSize(s)}
          className={`min-w-[36px] h-9 px-3 text-xs border rounded-sm transition-all whitespace-nowrap ${
            selectedSize === s
              ? 'bg-[#E6007E] text-white border-[#E6007E] font-bold'
              : 'border-gray-300 text-gray-700 hover:border-gray-900'
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  </div>
)}

          <div className="inline-flex items-center border border-gray-300 w-max rounded-sm">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-1 text-sm font-semibold">-</button>
            <span className="px-4 py-1 text-xs font-bold">{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-1 text-sm font-semibold">+</button>
          </div>

          <div className="flex flex-col gap-2.5 mt-2">
            <button className="w-full py-3 border-2 border-gray-900 text-xs font-bold uppercase hover:bg-gray-900 hover:text-white transition-colors">Add To Cart</button>
            <button className="w-full py-3 bg-[#E6007E] text-white text-xs font-bold uppercase hover:bg-[#c4006c] transition-colors">Buy It Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}