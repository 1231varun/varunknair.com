// Device and browser detection utilities for smart animation fallbacks

interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isIOS: boolean
  isAndroid: boolean
  isChrome: boolean
  isSafari: boolean
  isFirefox: boolean
  needsAnimationFallback: boolean
  reducedMotion: boolean
}

// Mobile detection regex - covers most mobile devices
const MOBILE_REGEX = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i
const TABLET_REGEX = /iPad|Tablet|PlayBook|Silk/i

// Browser detection
const CHROME_REGEX = /Chrome/i
const SAFARI_REGEX = /Safari/i
const FIREFOX_REGEX = /Firefox/i
const IOS_REGEX = /iPad|iPhone|iPod/i
const ANDROID_REGEX = /Android/i

export const getDeviceInfo = (): DeviceInfo => {
  // Ensure we're in browser environment
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isIOS: false,
      isAndroid: false,
      isChrome: false,
      isSafari: false,
      isFirefox: false,
      needsAnimationFallback: false,
      reducedMotion: false,
    }
  }

  const userAgent = navigator.userAgent
  
  // Device type detection
  const isMobile = MOBILE_REGEX.test(userAgent) && !TABLET_REGEX.test(userAgent)
  const isTablet = TABLET_REGEX.test(userAgent)
  const isDesktop = !isMobile && !isTablet
  
  // OS detection
  const isIOS = IOS_REGEX.test(userAgent)
  const isAndroid = ANDROID_REGEX.test(userAgent)
  
  // Browser detection
  const isChrome = CHROME_REGEX.test(userAgent)
  const isSafari = SAFARI_REGEX.test(userAgent) && !CHROME_REGEX.test(userAgent)
  const isFirefox = FIREFOX_REGEX.test(userAgent)
  
  // Check for reduced motion preference
  let reducedMotion = false
  try {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch (error) {
    console.warn('Reduced motion check failed:', error)
  }
  
  // Determine if device needs animation fallback
  // Only Android Chrome has confirmed IntersectionObserver issues on initial load
  // iOS devices generally work well with modern browsers
  const needsAnimationFallback = (
    (isAndroid && isMobile && isChrome) // Specifically Android Chrome mobile - known issues
  )
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    isIOS,
    isAndroid,
    isChrome,
    isSafari,
    isFirefox,
    needsAnimationFallback,
    reducedMotion,
  }
}

// Check if animations are likely to perform well
export const getAnimationCapability = (): 'full' | 'limited' | 'none' => {
  const deviceInfo = getDeviceInfo()
  
  if (deviceInfo.reducedMotion) {
    return 'none'
  }
  
  // Most modern mobile browsers handle animations well
  // Only limit for confirmed problematic combinations
  if (deviceInfo.needsAnimationFallback) {
    return 'limited'
  }
  
  return 'full'
}

// Check if IntersectionObserver is supported and likely to work properly
export const isIntersectionObserverReliable = (): boolean => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return false
  }
  
  const deviceInfo = getDeviceInfo()
  
  // Only Android Chrome mobile has confirmed IntersectionObserver issues
  if (deviceInfo.isAndroid && deviceInfo.isMobile && deviceInfo.isChrome) {
    return false
  }
  
  return true
}

// Debug utility to log device detection results
export const logDeviceInfo = (): void => {
  if (typeof window === 'undefined') return
  
  const deviceInfo = getDeviceInfo()
  const animationCapability = getAnimationCapability()
  const observerReliable = isIntersectionObserverReliable()
  
  console.group('🔍 Device Detection Debug')
  console.log('📱 Device Type:', {
    isMobile: deviceInfo.isMobile,
    isTablet: deviceInfo.isTablet,
    isDesktop: deviceInfo.isDesktop
  })
  console.log('🌐 Browser:', {
    isChrome: deviceInfo.isChrome,
    isSafari: deviceInfo.isSafari,
    isFirefox: deviceInfo.isFirefox
  })
  console.log('💻 Platform:', {
    isIOS: deviceInfo.isIOS,
    isAndroid: deviceInfo.isAndroid
  })
  console.log('🎨 Animation Settings:', {
    animationCapability,
    reducedMotion: deviceInfo.reducedMotion,
    needsAnimationFallback: deviceInfo.needsAnimationFallback,
    observerReliable
  })
  console.log('🔧 User Agent:', navigator.userAgent)
  console.groupEnd()
}

export default getDeviceInfo 