"use client"

import products from '@/lib/products'
import ProductCard from '@/components/ProductCard'

export default function HomePage() {
  const featuredProducts = products.slice(0, 6)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 bg-white rounded-lg shadow-sm mb-12">
        <div className="max-w-4xl mx-auto">
          <img 
            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/541a85fb-6eeb-4a91-9e17-12e99b54ed9f.png" 
            alt="Luxurious jewelry collection showcasing elegant diamonds, rings, necklaces and precious gemstones"
            className="w-full h-64 object-cover rounded-lg mb-8"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Exquisite Jewelry Collection
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover our handcrafted pieces that blend timeless elegance with modern sophistication
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors text-lg font-medium">
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 mt-16 bg-white rounded-lg shadow-sm">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Luxe Jewelry?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Premium Quality</h3>
              <p className="text-gray-600">Each piece is crafted with the finest materials and attention to detail</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Craftsmanship</h3>
              <p className="text-gray-600">Our skilled artisans bring decades of experience to every creation</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lifetime Warranty</h3>
              <p className="text-gray-600">We stand behind our jewelry with comprehensive warranty coverage</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
