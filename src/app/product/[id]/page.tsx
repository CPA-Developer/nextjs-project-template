"use client"

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getProductById } from '@/lib/products'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

export default function ProductPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  
  const product = getProductById(params.id as string)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
        <p className="text-gray-300 mb-8">The product you're looking for doesn't exist.</p>
        <Link 
          href="/" 
          className="holographic-btn px-6 py-3 rounded-lg text-black font-semibold transition-colors"
        >
          Back to Home
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors">Home</Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-white">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 lg:h-[600px] object-cover rounded-xl border border-cyan-400/20 group-hover:border-cyan-400/40 transition-all duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
            
            {/* Holographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.div>

        {/* Product Details */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div>
            <span className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm px-3 py-1 rounded-full mb-4 border border-purple-500/30">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold text-white mb-4">
              <span className="text-gradient">{product.name}</span>
            </h1>
            <p className="text-3xl font-bold neon-text mb-6">
              ${product.price.toLocaleString()}
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
            <p className="text-gray-300 leading-relaxed">{product.description}</p>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center space-x-4 mb-6">
              <label htmlFor="quantity" className="text-sm font-medium text-white">
                Quantity:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="glass border border-cyan-400/30 rounded-md px-3 py-2 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num} className="bg-gray-800 text-white">
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-4">
              <motion.button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                  addedToCart
                    ? 'bg-green-500 text-white glow'
                    : 'holographic-btn text-black hover:shadow-lg hover:shadow-cyan-400/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/cart"
                  className="flex-1 glass border border-cyan-400/30 text-cyan-400 py-3 px-6 rounded-lg font-medium hover:bg-cyan-400/10 transition-all duration-300 text-center inline-block"
                >
                  View Cart
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Product Features</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 glow"></span>
                Premium materials and craftsmanship
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 glow"></span>
                Lifetime warranty included
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-pink-400 rounded-full mr-3 glow"></span>
                Free shipping and returns
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 glow"></span>
                Comes with certificate of authenticity
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
