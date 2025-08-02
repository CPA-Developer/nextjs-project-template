"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import products from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import FuturisticLoader from '@/components/FuturisticLoader'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const featuredProducts = products.slice(0, 6)
  const [isLoading, setIsLoading] = useState(true)
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FuturisticLoader size="lg" text="Initializing Luxury Experience..." />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Hero Section */}
      <motion.section 
        className="text-center py-20 glass-card rounded-2xl mb-16 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-400/10 to-purple-500/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-500/10 to-blue-500/10 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            className="relative mb-8 group"
            whileHover={{ scale: 1.02 }}
          >
            <img 
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/541a85fb-6eeb-4a91-9e17-12e99b54ed9f.png" 
              alt="Luxurious jewelry collection showcasing elegant diamonds, rings, necklaces and precious gemstones"
              className="w-full h-80 object-cover rounded-xl border border-cyan-400/20 group-hover:border-cyan-400/40 transition-all duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl" />
            
            {/* Holographic overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ 
                background: [
                  'linear-gradient(45deg, rgba(0,255,255,0.2), transparent, rgba(139,92,246,0.2))',
                  'linear-gradient(90deg, rgba(139,92,246,0.2), transparent, rgba(236,72,153,0.2))',
                  'linear-gradient(135deg, rgba(236,72,153,0.2), transparent, rgba(0,255,255,0.2))'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          <motion.h1 
            className="text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="text-gradient">ISHARA</span>{' '}
            <span className="neon-text">Jewelry</span>{' '}
            <span className="neon-text-purple">Collection</span>
          </motion.h1>

          <motion.p 
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Experience the future of luxury with our AI-curated collection of handcrafted pieces that blend 
            <span className="text-cyan-400"> timeless elegance</span> with 
            <span className="text-purple-400"> cutting-edge technology</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.button 
              className="holographic-btn px-10 py-4 rounded-xl text-black font-bold text-lg relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Explore Collection</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>

            <motion.button 
              className="glass px-10 py-4 rounded-xl text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/10 transition-all duration-300 font-semibold text-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,255,255,0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              Virtual Try-On
            </motion.button>
          </motion.div>

          {/* AI Status Indicator */}
          <motion.div
            className="mt-8 flex items-center justify-center space-x-2 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span>AI Recommendation Engine Active</span>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gradient">Featured</span>{' '}
            <span className="neon-text">Collection</span>
          </h2>
          <p className="text-gray-300 text-lg">Curated by AI, crafted by masters</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-20 mt-20 glass-card rounded-2xl relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto text-center px-6 relative z-10">
          <motion.h2 
            className="text-4xl font-bold mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-gradient">Why Choose</span>{' '}
            <span className="neon-text">ISHARA?</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Curation",
                description: "Our advanced AI analyzes your preferences to recommend the perfect pieces",
                icon: "🤖",
                delay: 0.3
              },
              {
                title: "Quantum Craftsmanship",
                description: "Precision engineering meets traditional artistry in every creation",
                icon: "⚡",
                delay: 0.5
              },
              {
                title: "Holographic Warranty",
                description: "Blockchain-secured lifetime warranty with immutable authenticity",
                icon: "🔮",
                delay: 0.7
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card p-8 rounded-xl hover:border-cyan-400/40 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay, duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div
                  className="text-4xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Background animation */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 50%, cyan 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, purple 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, pink 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, cyan 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </motion.section>
    </div>
  )
}
