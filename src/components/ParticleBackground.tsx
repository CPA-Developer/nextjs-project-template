"use client"

import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const createParticle = () => {
      if (!particlesRef.current) return

      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.animationDelay = Math.random() * 2 + 's'
      particle.style.animationDuration = (Math.random() * 4 + 8) + 's'
      
      particlesRef.current.appendChild(particle)

      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      }, 12000)
    }

    // Create initial particles
    for (let i = 0; i < 50; i++) {
      setTimeout(() => createParticle(), i * 100)
    }

    // Continue creating particles
    const interval = setInterval(createParticle, 200)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <div ref={particlesRef} className="particles" />
    </>
  )
}
