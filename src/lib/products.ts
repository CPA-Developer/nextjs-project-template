export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Diamond Engagement Ring",
    description: "A stunning brilliant cut diamond engagement ring set in platinum. This timeless piece features a 1.5-carat center stone with exceptional clarity and sparkle, perfect for your special moment.",
    price: 2499,
    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9dca2270-26fd-49e4-ace2-eed925cb7873.png",
    category: "Rings",
    inStock: true
  },
  {
    id: "2",
    name: "Sapphire Necklace",
    description: "An exquisite 18k gold necklace featuring a beautiful blue sapphire pendant. The deep blue gemstone is surrounded by delicate diamonds, creating a piece that's both elegant and eye-catching.",
    price: 1299,
    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fda5a991-206e-498f-8149-d2ca8836e166.png",
    category: "Necklaces",
    inStock: true
  },
  {
    id: "3",
    name: "Pearl Drop Earrings",
    description: "Classic cultured pearl drop earrings with 14k gold accents. These timeless earrings feature lustrous pearls that add sophistication to any outfit, perfect for both formal and casual occasions.",
    price: 599,
    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e36ee804-c8db-4ef4-a274-585587ced229.png",
    category: "Earrings",
    inStock: true
  },
  {
    id: "4",
    name: "Ruby Tennis Bracelet",
    description: "A luxurious tennis bracelet featuring alternating rubies and diamonds set in 18k gold. This stunning piece showcases the deep red beauty of rubies complemented by sparkling diamonds.",
    price: 3299,
    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/53398520-2218-4c5e-9962-e7dd29585618.png",
    category: "Bracelets",
    inStock: true
  },
  {
    id: "5",
    name: "Emerald Cocktail Ring",
    description: "A vintage-inspired emerald cocktail ring featuring a large center emerald surrounded by a halo of diamonds. This statement piece is perfect for special occasions and formal events.",
    price: 1899,
    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/04e877df-4aa4-4b58-a5bd-f9cbe368a439.png",
    category: "Rings",
    inStock: true
  },
  {
    id: "6",
    name: "Gold Chain Necklace",
    description: "A minimalist 18k gold chain necklace with a delicate pendant. This versatile piece can be worn alone or layered with other necklaces for a modern, sophisticated look.",
    price: 799,
    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c3afeaf6-3cfb-42fb-868a-8a2422617807.png",
    category: "Necklaces",
    inStock: true
  },
  {
    id: "7",
    name: "Diamond Stud Earrings",
    description: "Classic diamond stud earrings featuring perfectly matched round brilliant diamonds in 14k white gold settings. These timeless earrings are perfect for everyday elegance.",
    price: 899,
    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4d11f334-6da0-4057-8401-777d52b9e0ba.png",
    category: "Earrings",
    inStock: true
  },
  {
    id: "8",
    name: "Rose Gold Wedding Band",
    description: "An elegant rose gold wedding band with a comfort fit design. This beautiful band features a subtle brushed finish and is perfect for everyday wear.",
    price: 649,
    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0f24294a-7f60-48dc-8faf-8500e4150a49.png",
    category: "Rings",
    inStock: true
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}

export default products;
