import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getDeviceInfo, getAnimationCapability, isIntersectionObserverReliable } from '../utils/deviceDetection'

interface UseScrollAnimationOptions {
  threshold?: number
  triggerOnce?: boolean
  delay?: number
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, triggerOnce = true, delay = 0 } = options
  const controls = useAnimation()
  const [hasTriggered, setHasTriggered] = useState(false)
  
  // Get device and animation capability info
  const deviceInfo = getDeviceInfo()
  const animationCapability = getAnimationCapability()
  const observerReliable = isIntersectionObserverReliable()
  
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
    fallbackInView: true, // Always visible if IntersectionObserver isn't supported
  })

  useEffect(() => {
    // If reduced motion, trigger immediately
    if (animationCapability === 'none') {
      controls.start('visible')
      setHasTriggered(true)
      return
    }
    
    // For desktop or when observer is reliable, use normal behavior
    if (deviceInfo.isDesktop || observerReliable) {
      if (inView && !hasTriggered) {
        const timer = setTimeout(() => {
          controls.start('visible')
          setHasTriggered(true)
        }, delay)
        
        return () => clearTimeout(timer)
      } else if (!triggerOnce && !inView) {
        controls.start('hidden')
      }
      return
    }
    
    // For mobile devices with unreliable observers, use smart fallback
    if (deviceInfo.needsAnimationFallback) {
      // Try intersection observer first
      if (inView && !hasTriggered) {
        const timer = setTimeout(() => {
          controls.start('visible')
          setHasTriggered(true)
        }, delay)
        
        return () => clearTimeout(timer)
      }
      
      // Fallback timer for mobile devices only - much shorter timeout
      if (!hasTriggered) {
        const fallbackTimer = setTimeout(() => {
          controls.start('visible')
          setHasTriggered(true)
        }, 1500) // 1.5 seconds fallback for mobile only
        
        return () => clearTimeout(fallbackTimer)
      }
    }
  }, [controls, inView, delay, triggerOnce, hasTriggered, deviceInfo, animationCapability, observerReliable])

  return { 
    ref, 
    controls, 
    inView,
    deviceInfo, // Expose device info for components that need it
    animationCapability 
  }
} 