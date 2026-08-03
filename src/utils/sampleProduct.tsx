export interface Product {
  id: string | number;
  title: string;
  sku: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  colors?: string[];
  description?: string;
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
    colors: ["Pink", "White", "Black"],
    description:
      "Comfortable casual sneakers with a lightweight sole and breathable mesh upper. Perfect for daily wear, travel, and casual outings.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop",
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
    colors: ["Blue", "Pink", "Yellow"],
    description:
      "Soft cotton summer kurti featuring vibrant floral prints with a relaxed fit for everyday comfort.",
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop",
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
    colors: ["Brown", "Black", "Tan", "Red"],
    description:
      "Premium leather crossbody bag with spacious compartments and an adjustable shoulder strap.",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
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
    colors: ["Gold", "Rose Gold", "Silver"],
    description:
      "Elegant handcrafted brass earrings with a timeless drop design suitable for both casual and formal occasions.",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=600&auto=format&fit=crop",
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
    colors: ["White", "Gray", "Black"],
    description:
      "Lightweight running shoes designed with cushioned support and breathable fabric for maximum comfort.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop",
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
    colors: ["Black Bottle", "Amber Bottle"],
    description:
      "Luxury oud fragrance featuring warm woody notes with a long-lasting premium scent.",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=600&auto=format&fit=crop",
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
    colors: ["White", "Blue", "Green"],
    description:
      "Handcrafted ceramic mugs with a smooth glazed finish, perfect for tea and coffee lovers.",
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop",
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
    colors: ["Beige", "Gray", "Mustard"],
    description:
      "Soft handwoven cotton blanket that adds warmth and texture to your bedroom or living room.",
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format&fit=crop",
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
    colors: ["Multicolor"],
    description:
      "Modern abstract canvas artwork that enhances living rooms, bedrooms, and office interiors.",
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
    colors: ["White", "Cream", "Amber"],
    description:
      "Natural soy wax candle with a soothing fragrance in an elegant reusable glass jar.",
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602874801006-79d1e92c5f7c?q=80&w=600&auto=format&fit=crop",
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
    colors: ["Black", "Brown", "Tan"],
    description:
      "Compact genuine leather cardholder wallet with multiple card slots and a minimalist design.",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop",
    ],
    sizes: ["Standard"],
  },
];

export const sampleProduct = sampleProducts[0];