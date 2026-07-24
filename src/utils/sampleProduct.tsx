export interface Product {
  id: string | number;
  title: string;
  sku: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  images: string[];
  sizes: (string | number)[];
  isSale?: boolean;
}

export const sampleProducts: Product[] = [
  {
    id: "at7485",
    title: "Pink Casual Sneaker For Women",
    sku: "AT7485",
    originalPrice: 5500,
    discountedPrice: 3800,
    discountPercentage: 31,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop",
    ],
    sizes: [36, 37, 38, 39, 40, 41],
  },
  {
    id: "fl8821",
    title: "Floral Printed Summer Kurti",
    sku: "FL8821",
    originalPrice: 4200,
    discountedPrice: 2950,
    discountPercentage: 30,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "lb4012",
    title: "Classic Leather Crossbody Bag",
    sku: "LB4012",
    originalPrice: 8900,
    discountedPrice: 6500,
    discountPercentage: 27,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=600&auto=format&fit=crop",
    ],
    sizes: ["Free Size"],
  },
  {
    id: "jw1092",
    title: "Handcrafted Brass Drop Earrings",
    sku: "JW1092",
    originalPrice: 2500,
    discountedPrice: 1800,
    discountPercentage: 28,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
    ],
    sizes: ["One Size"],
  },
  {
    id: "sh3301",
    title: "Minimalist White Running Shoes",
    sku: "SH3301",
    originalPrice: 7500,
    discountedPrice: 5250,
    discountPercentage: 30,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    ],
    sizes: [38, 39, 40, 41, 42, 43],
  },
  {
    id: "fg9022",
    title: "Oud Wood Eau De Parfum 100ml",
    sku: "FG9022",
    originalPrice: 12000,
    discountedPrice: 9600,
    discountPercentage: 20,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop",
    ],
    sizes: ["100ml"],
  },
  {
    id: "pt5110",
    title: "Ceramic Handcrafted Tea Mug Set",
    sku: "PT5110",
    originalPrice: 3400,
    discountedPrice: 2400,
    discountPercentage: 29,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
    ],
    sizes: ["Set of 2", "Set of 4"],
  },
  {
    id: "tx7743",
    title: "Handwoven Cotton Throw Blanket",
    sku: "TX7743",
    originalPrice: 6200,
    discountedPrice: 4500,
    discountPercentage: 27,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=600&auto=format&fit=crop",
    ],
    sizes: ["Standard"],
  },
  {
    id: "wa2219",
    title: "Bohemian Abstract Wall Canvas",
    sku: "WA2219",
    originalPrice: 4800,
    discountedPrice: 3200,
    discountPercentage: 33,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop",
    ],
    sizes: ["12x16", "18x24", "24x36"],
  },
  {
    id: "cd6044",
    title: "Scented Soy Wax Candle in Glass",
    sku: "CD6044",
    originalPrice: 2200,
    discountedPrice: 1650,
    discountPercentage: 25,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop",
    ],
    sizes: ["250g"],
  },
  {
    id: "lg8112",
    title: "Slim Leather Cardholder Wallet",
    sku: "LG8112",
    originalPrice: 2800,
    discountedPrice: 1950,
    discountPercentage: 30,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600&auto=format&fit=crop",
    ],
    sizes: ["Standard"],
  },
];

export const sampleProduct = sampleProducts[0];
