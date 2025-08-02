"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'

interface FormData {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  cardNumber: string
  expiryDate: string
  cvv: string
  nameOnCard: string
}

export default function CheckoutPage() {
  const { state, clearCart } = useCart()
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  if (state.items.length === 0 && !orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
          <p className="text-gray-300 mb-8">Add some items to your cart before checking out.</p>
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.address) newErrors.address = 'Address is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.state) newErrors.state = 'State is required'
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required'
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required'
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required'
    if (!formData.cvv) newErrors.cvv = 'CVV is required'
    if (!formData.nameOnCard) newErrors.nameOnCard = 'Name on card is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    clearCart()
    setOrderComplete(true)
    setIsSubmitting(false)
  }

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div 
          className="max-w-md mx-auto glass-card rounded-xl p-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 glow">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            <span className="text-gradient">Order Confirmed!</span>
          </h1>
          <p className="text-gray-300 mb-6">
            Thank you for your purchase. Your order has been successfully placed and you will receive a confirmation email shortly.
          </p>
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

  const total = state.total * 1.08 // Including tax

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold text-white mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-gradient">Secure</span> <span className="neon-text">Checkout</span>
      </motion.h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <motion.div 
              className="glass-card rounded-xl p-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-xl font-bold text-white mb-4">
                <span className="text-gradient">Contact Information</span>
              </h2>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full glass border rounded-md px-3 py-2 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 ${
                    errors.email ? 'border-red-400' : 'border-cyan-300/25'
                  }`}
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
            </motion.div>

            {/* Shipping Address */}
            <motion.div 
              className="glass-card rounded-xl p-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold text-white mb-4">
                <span className="text-gradient">Shipping Address</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full glass border rounded-md px-3 py-2 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 ${
                      errors.firstName ? 'border-red-400' : 'border-cyan-300/25'
                    }`}
                  />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full glass border rounded-md px-3 py-2 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 ${
                      errors.lastName ? 'border-red-400' : 'border-cyan-300/25'
                    }`}
                  />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full glass border rounded-md px-3 py-2 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 ${
                    errors.address ? 'border-red-400' : 'border-cyan-300/25'
                  }`}
                />
                {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full glass border rounded-md px-3 py-2 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 ${
                      errors.city ? 'border-red-400' : 'border-cyan-300/25'
                    }`}
                  />
                  {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-1">
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full glass border rounded-md px-3 py-2 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 ${
                      errors.state ? 'border-red-400' : 'border-cyan-300/25'
                    }`}
                  >
                    <option value="" className="bg-gray-800 text-white">Select State</option>
                    <option value="CA" className="bg-gray-800 text-white">California</option>
                    <option value="NY" className="bg-gray-800 text-white">New York</option>
                    <option value="TX" className="bg-gray-800 text-white">Texas</option>
                    <option value="FL" className="bg-gray-800 text-white">Florida</option>
                    {/* Add more states as needed */}
                  </select>
                  {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-300 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={`w-full glass border rounded-md px-3 py-2 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 ${
                      errors.zipCode ? 'border-red-400' : 'border-cyan-300/25'
                    }`}
                  />
                  {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>}
                </div>
              </div>
            </motion.div>

            {/* Payment Information */}
            <motion.div 
              className="glass-card rounded-xl p-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-xl font-bold text-white mb-4">
                <span className="text-gradient">Payment Information</span>
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-300 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="nameOnCard"
                    name="nameOnCard"
                    value={formData.nameOnCard}
                    onChange={handleInputChange}
                    className={`w-full glass border rounded-md px-3 py-2 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 ${
                      errors.nameOnCard ? 'border-red-400' : 'border-cyan-300/25'
                    }`}
                  />
                  {errors.nameOnCard && <p className="text-red-400 text-sm mt-1">{errors.nameOnCard}</p>}
                </div>
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className={`w-full glass border rounded-md px-3 py-2 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 placeholder-gray-400 ${
                      errors.cardNumber ? 'border-red-400' : 'border-cyan-300/25'
                    }`}
                  />
                  {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-300 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className={`w-full glass border rounded-md px-3 py-2 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 placeholder-gray-400 ${
                        errors.expiryDate ? 'border-red-400' : 'border-cyan-300/25'
                      }`}
                    />
                    {errors.expiryDate && <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>}
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-300 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className={`w-full glass border rounded-md px-3 py-2 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 placeholder-gray-400 ${
                        errors.cvv ? 'border-red-400' : 'border-cyan-300/25'
                      }`}
                    />
                    {errors.cvv && <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                isSubmitting
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'holographic-btn text-black hover:shadow-lg hover:shadow-cyan-400/50'
              }`}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {isSubmitting ? 'Processing...' : `Complete Order - $${total.toLocaleString()}`}
            </motion.button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <motion.div 
            className="glass-card rounded-xl p-6 sticky top-24"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-white mb-4">
              <span className="text-gradient">Order Summary</span>
            </h2>
            
            <div className="space-y-4 mb-6">
              {state.items.map((item, index) => (
                <motion.div 
                  key={item.product.id} 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="relative group">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg border border-cyan-300/15 group-hover:border-cyan-300/30 transition-all duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{item.product.name}</p>
                    <p className="text-sm text-gray-300">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-white">${(item.product.price * item.quantity).toLocaleString()}</p>
                </motion.div>
              ))}
            </div>

            <div className="space-y-2 border-t border-cyan-300/15 pt-4">
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
              <div className="border-t border-cyan-300/15 pt-2">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-white">Total:</span>
                  <span className="text-lg font-bold neon-text">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
