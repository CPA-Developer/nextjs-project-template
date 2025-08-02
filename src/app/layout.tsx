import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/Header'
import ParticleBackground from '@/components/ParticleBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ISHARA - Futuristic Premium Jewelry Experience',
  description: 'Experience the future of luxury jewelry shopping with our cutting-edge collection and immersive digital experience.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <ParticleBackground />
          <Header />
          <main className="min-h-screen relative z-10">
            {children}
          </main>
          <footer className="relative z-10 glass-card border-t border-cyan-400/20 py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h3 className="neon-text text-xl font-bold mb-4">ISHARA</h3>
                  <p className="text-gray-300 text-sm">
                    Experience the future of luxury jewelry with cutting-edge technology and timeless elegance.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/" className="text-gray-300 hover:text-cyan-400 transition-colors">Home</a></li>
                    <li><a href="/cart" className="text-gray-300 hover:text-cyan-400 transition-colors">Cart</a></li>
                    <li><a href="/checkout" className="text-gray-300 hover:text-cyan-400 transition-colors">Checkout</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Collections</h4>
                  <ul className="space-y-2 text-sm">
                    <li><span className="text-gray-300">Rings</span></li>
                    <li><span className="text-gray-300">Necklaces</span></li>
                    <li><span className="text-gray-300">Earrings</span></li>
                    <li><span className="text-gray-300">Bracelets</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Connect</h4>
                  <div className="flex space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <span className="text-xs font-bold">F</span>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <span className="text-xs font-bold">T</span>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <span className="text-xs font-bold">I</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-cyan-400/20 pt-8 text-center">
                <p className="text-gray-300 text-sm">
                  &copy; 2024 ISHARA. All rights reserved. | Powered by Future Tech
                </p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}
