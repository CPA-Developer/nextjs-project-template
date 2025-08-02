"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Product } from '@/lib/products'
import { useCart } from '@/context/CartContext'
import { useState, useRef } from 'react'

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setMousePosition({ x, y })
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0
    }
  }

  const imageVariants = {
    hover: {
      scale: 1.1,
      rotateY: 5
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className="glass-card rounded-xl overflow-hidden interactive-card float group relative"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${(mousePosition.y - 150) * 0.05}deg) rotateY(${(mousePosition.x - 150) * 0.05}deg) translateZ(20px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
      }}
    >
      {/* Holographic overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
      
      <Link href={`/product/${product.id}`}>
        <motion.div 
          className="relative overflow-hidden"
          variants={imageVariants}
          whileHover="hover"
        >
          <img 
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          
          
          {/* Stock indicator */}
          <div className="absolute top-4 right-4">
            <motion.div
              className="w-3 h-3 rounded-full bg-green-400 glow"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </Link>
      
      <div className="p-6 relative">
        <Link href={`/product/${product.id}`}>
          <motion.h3 
            className="text-xl font-semibold text-white mb-2 hover:text-cyan-400 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            {product.name}
          </motion.h3>
        </Link>
        
        <p className="text-gray-300 mb-4 line-clamp-2 text-sm">{product.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <motion.span 
            className="text-2xl font-bold text-gradient"
            whileHover={{ scale: 1.05 }}
          >
            ${product.price.toLocaleString()}
          </motion.span>
          
          {/* AI recommendation badge */}
          <motion.div
            className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-xs text-purple-300 border border-purple-500/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            AI Recommended
          </motion.div>
        </div>
        
        <div className="flex space-x-3">
          <motion.div 
            className="flex-1"
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href={`/product/${product.id}`}
              className="w-full glass px-4 py-2 rounded-lg text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/10 transition-all duration-300 text-center text-sm font-medium block"
            >
              View Details
            </Link>
          </motion.div>
          
          <motion.button 
            onClick={handleAddToCart}
            className="flex-1 holographic-btn px-4 py-2 rounded-lg text-black font-semibold text-sm relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: [0, 100, -100, 0] }}
              transition={{ duration: 0.6 }}
            >
              Add to Cart
            </motion.span>
          </motion.button>
        </div>
        
        {/* Interactive particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                initial={{ 
                  x: mousePosition.x, 
                  y: mousePosition.y,
                  opacity: 1 
                }}
                animate={{ 
                  x: mousePosition.x + (Math.random() - 0.5) * 100,
                  y: mousePosition.y + (Math.random() - 0.5) * 100,
                  opacity: 0 
                }}
                transition={{ duration: 1 }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
