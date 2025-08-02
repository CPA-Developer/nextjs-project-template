"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import { useState, useEffect } from 'react'

export default function Header() {
  const { state } = useCart()
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-card border-b border-cyan-400/30' 
          : 'bg-transparent border-b border-cyan-400/10'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="text-2xl font-bold neon-text hover:neon-text-purple transition-all duration-300">
              <span className="text-gradient">ISHARA</span>
            </Link>
          </motion.div>
          
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-white hover:text-cyan-400 transition-colors font-medium relative group px-2 py-1"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <div className="relative">
              <Link 
                href="/cart" 
                className="text-white hover:text-cyan-400 transition-colors font-medium relative group px-2 py-1"
              >
                Cart
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
            
            <Link 
              href="/checkout" 
              className="holographic-btn px-6 py-2 rounded-lg text-black font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/50"
            >
              Checkout
            </Link>
          </div>
        </nav>
      </div>
      
      {/* Animated border */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </motion.header>
  )
}
