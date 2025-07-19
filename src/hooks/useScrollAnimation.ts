import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getDeviceInfo, getAnimationCapability, isIntersectionObserverReliable, getIPhoneInfo } from '../utils/deviceDetection'

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
  const iPhoneInfo = getIPhoneInfo()
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
      
      // Targeted fallback based on device-specific issues:
      // iPhone 12/13/14: Severe memory issues - immediate fallback
      // Other iPhones: Moderate memory issues - 0.5s fallback  
      // Android Chrome: IntersectionObserver issues - 1.5s fallback
      if (!hasTriggered) {
        let fallbackTimeout = 1500 // Default for Android Chrome
        
        if (deviceInfo.isIOS) {
          fallbackTimeout = iPhoneInfo.isOlderiPhone ? 100 : 500 // 0.1s for iPhone 12/13/14, 0.5s for others
        }
        
        const fallbackTimer = setTimeout(() => {
          controls.start('visible')
          setHasTriggered(true)
        }, fallbackTimeout)
        
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