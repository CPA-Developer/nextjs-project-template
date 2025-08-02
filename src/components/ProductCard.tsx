"use client"

import Link from 'next/link'
import { Product } from '@/lib/products'
import { useCart } from '@/context/CartContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/product/${product.id}`}>
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </Link>
      <div className="p-6">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-gray-700 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toLocaleString()}
          </span>
          <div className="flex space-x-2">
            <Link 
              href={`/product/${product.id}`}
              className="bg-gray-100 text-gray-900 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
            >
              View Details
            </Link>
            <button 
              onClick={handleAddToCart}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
