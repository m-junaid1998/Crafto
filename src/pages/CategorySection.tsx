import React from 'react';
import { NavLink } from 'react-router-dom';

const categories = [
  { id: 1, label: 'Bags Sale', link: '/shop?category=bags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop' },
  { id: 2, label: 'Fragrances', link: '/shop?category=fragrances', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=400&auto=format&fit=crop' },
  { id: 3, label: 'Pottery', link: '/shop?category=pottery', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400&auto=format&fit=crop' },
  { id: 4, label: 'Brass Decor', link: '/shop?category=brass', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400&auto=format&fit=crop' },
  { id: 5, label: 'Wall Art', link: '/shop?category=wall-art', image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=400&auto=format&fit=crop' },
  { id: 6, label: 'Wood Craft', link: '/shop?category=wood-craft', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=400&auto=format&fit=crop' },
  { id: 7, label: 'Jewelry', link: '/shop?category=jewelry', image: 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?q=80&w=400&auto=format&fit=crop' },
  { id: 8, label: 'Tableware', link: '/shop?category=tableware', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400&auto=format&fit=crop' },
  { id: 9, label: 'Textiles', link: '/shop?category=textiles', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=400&auto=format&fit=crop' },
  { id: 10, label: 'Rugs & Carpets', link: '/shop?category=rugs', image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=400&auto=format&fit=crop' },
  { id: 11, label: 'Candles', link: '/shop?category=candles', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=400&auto=format&fit=crop' },
  { id: 12, label: 'Leather Goods', link: '/shop?category=leather', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop' },
  { id: 13, label: 'Lighting', link: '/shop?category=lighting', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=400&auto=format&fit=crop' },
  { id: 14, label: 'Gift Sets', link: '/shop?category=gifts', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400&auto=format&fit=crop' },
];

export const CategorySection: React.FC = () => (
  <section className="py-8 bg-white border-b border-gray-100">
    <div className="w-full overflow-x-auto no-scrollbar px-4 sm:px-8">
      <div className="flex items-center gap-6 sm:gap-8 w-max mx-auto py-2">
        {categories.map((item) => (
          <NavLink key={item.id} to={item.link} className="flex flex-col items-center group shrink-0 transition-transform duration-300 hover:scale-105">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-sm mb-2.5 p-[1.5px] border border-transparent group-hover:border-[#D4A359] group-hover:ring-2 group-hover:ring-[#D4A359]/50 group-hover:shadow-[0_0_16px_rgba(212,163,89,0.5)] transition-all duration-300">
              <img src={item.image} alt={item.label} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#D4A359] transition-colors text-center">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  </section>
);