"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { state, removeItem, updateQuantity } = useCart()

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
          <p className="text-gray-300 mb-8">Add some beautiful jewelry to your cart to get started.</p>
          <Link 
            href="/" 
            className="holographic-btn px-6 py-3 rounded-lg text-black font-semibold transition-colors inline-block"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold text-white mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-gradient">Shopping</span> <span className="neon-text">Cart</span>
      </motion.h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item, index) => (
            <motion.div 
              key={item.product.id} 
              className="glass-card rounded-xl p-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl border border-cyan-400/20 group-hover:border-cyan-400/40 transition-all duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-1">
                  <Link 
                    href={`/product/${item.product.id}`}
                    className="text-lg font-semibold text-white hover:text-cyan-400 transition-colors"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-gray-300">{item.product.category}</p>
                  <p className="text-lg font-bold neon-text">
                    ${item.product.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <label htmlFor={`quantity-${item.product.id}`} className="text-sm text-gray-300">
                    Qty:
                  </label>
                  <select
                    id={`quantity-${item.product.id}`}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}
                    className="glass border border-cyan-400/30 rounded-md px-2 py-1 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num} className="bg-gray-800 text-white">
                        {num}
                      </option>
                    ))}
                  </select>
                  <motion.button
                    onClick={() => removeItem(item.product.id)}
                    className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Remove
                  </motion.button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-cyan-400/20 flex justify-between items-center">
                <span className="text-gray-300">Subtotal:</span>
                <span className="text-lg font-bold text-white">
                  ${(item.product.price * item.quantity).toLocaleString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <motion.div 
            className="glass-card rounded-xl p-6 sticky top-24"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-white mb-4">
              <span className="text-gradient">Order Summary</span>
            </h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-300">Subtotal:</span>
                <span className="font-medium text-white">${state.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Shipping:</span>
                <span className="font-medium text-green-400">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Tax:</span>
                <span className="font-medium text-white">${(state.total * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-cyan-400/20 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-white">Total:</span>
                  <span className="text-lg font-bold neon-text">
                    ${(state.total * 1.08).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/checkout"
                  className="w-full holographic-btn py-3 px-6 rounded-lg font-medium text-center block text-black"
                >
                  Proceed to Checkout
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/"
                  className="w-full glass border border-cyan-400/30 text-cyan-400 py-3 px-6 rounded-lg font-medium hover:bg-cyan-400/10 transition-all duration-300 text-center block"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            </div>

            <div className="mt-6 pt-6 border-t border-cyan-400/20">
              <h3 className="font-semibold text-white mb-2 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 glow"></span>
                Secure Checkout
              </h3>
              <p className="text-sm text-gray-300">
                Your payment information is encrypted and secure. We accept all major credit cards.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
