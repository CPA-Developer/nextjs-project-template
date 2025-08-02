"use client"

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const { state } = useCart()
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
            Luxe Jewelry
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Home
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-gray-900 transition-colors font-medium relative">
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link href="/checkout" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Checkout
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
