"use client"

import { motion } from 'framer-motion'

interface FuturisticLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export default function FuturisticLoader({ size = 'md', text }: FuturisticLoaderProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <motion.div
          className={`${sizeClasses[size]} border-2 border-transparent rounded-full`}
          style={{
            background: 'linear-gradient(45deg, #00ffff, #8b5cf6, #ec4899, #00ffff)',
            backgroundSize: '300% 300%'
          }}
          animate={{
            rotate: 360,
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
            backgroundPosition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          <div className={`${sizeClasses[size]} bg-background rounded-full m-0.5 flex items-center justify-center`}>
            <motion.div
              className="w-2 h-2 bg-cyan-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </div>
        </motion.div>
        
        {/* Outer ring */}
        <motion.div
          className={`absolute inset-0 ${sizeClasses[size]} border border-cyan-400/30 rounded-full`}
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      
      {text && (
        <motion.p
          className="text-cyan-400 text-sm font-mono"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}
