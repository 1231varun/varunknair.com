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
  // Based on research: iPhone Safari has memory management issues that prevent component rendering
  // Especially prevalent on iPhone 12/13/14 and when memory usage is high
  const needsAnimationFallback = (
    (isIOS && isMobile) ||               // iPhone Safari - memory management issues
    (isAndroid && isMobile && isChrome)  // Android Chrome mobile - IntersectionObserver issues
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
  const iPhoneInfo = getIPhoneInfo()
  
  if (deviceInfo.reducedMotion) {
    return 'none'
  }
  
  // iPhone 12/13/14 have severe memory management issues - more aggressive fallback
  if (iPhoneInfo.isOlderiPhone) {
    return 'limited'
  }
  
  // Other mobile devices with confirmed issues
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
  
  // iPhone Safari has memory management issues that prevent proper component rendering
  // Android Chrome mobile has confirmed IntersectionObserver issues
  if ((deviceInfo.isIOS && deviceInfo.isMobile) || 
      (deviceInfo.isAndroid && deviceInfo.isMobile && deviceInfo.isChrome)) {
    return false
  }
  
  return true
}

// Debug utility to log device detection results
export const logDeviceInfo = (): void => {
  if (typeof window === 'undefined') return
  
  const deviceInfo = getDeviceInfo()
  const iPhoneInfo = getIPhoneInfo()
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
  console.log('📱 iPhone Info:', {
    model: iPhoneInfo.model,
    isOlderiPhone: iPhoneInfo.isOlderiPhone,
    isNeweriPhone: iPhoneInfo.isNeweriPhone
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

// Get iPhone model information for targeted optimizations
export const getIPhoneInfo = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return { isOlderiPhone: false, isNeweriPhone: false, model: null }
  }

  const userAgent = navigator.userAgent
  
  // iPhone model detection via user agent
  // iPhone 12/13/14 have more severe memory management issues
  const olderIPhoneModels = /iPhone1[2-4],/i // iPhone 12, 13, 14 series
  const newerIPhoneModels = /iPhone1[5-9],|iPhone[2-9][0-9],/i // iPhone 15+ series
  
  const isOlderiPhone = olderIPhoneModels.test(userAgent)
  const isNeweriPhone = newerIPhoneModels.test(userAgent)
  
  let model = null
  if (isOlderiPhone) model = 'older' // 12/13/14 series
  else if (isNeweriPhone) model = 'newer' // 15+ series
  else if (userAgent.includes('iPhone')) model = 'unknown'
  
  return { isOlderiPhone, isNeweriPhone, model }
}

export default getDeviceInfo 