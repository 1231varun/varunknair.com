/**
 * Cache utility for managing resume downloads and other assets
 * Implements cache-first strategy with fallback to network
 */

interface CacheItem<T> {
  data: T
  timestamp: number
  expiresIn: number
}

class CacheManager {
  private cache = new Map<string, CacheItem<any>>()
  private readonly DEFAULT_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours

  /**
   * Set an item in cache with optional expiry time
   */
  set<T>(key: string, data: T, expiresIn: number = this.DEFAULT_EXPIRY): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn,
    })
  }

  /**
   * Get an item from cache, returns null if expired or not found
   */
  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    
    if (!item) {
      return null
    }

    const isExpired = Date.now() - item.timestamp > item.expiresIn
    
    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  /**
   * Check if a cache key exists and is not expired
   */
  has(key: string): boolean {
    return this.get(key) !== null
  }

  /**
   * Remove an item from cache
   */
  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.cache.size
  }

  /**
   * Clean up expired entries
   */
  cleanup(): void {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.expiresIn) {
        this.cache.delete(key)
      }
    }
  }
}

// Create a singleton instance
export const cacheManager = new CacheManager()

/**
 * Cache a resume download with optimized expiry
 */
export const cacheResume = async (url: string): Promise<Blob | null> => {
  const cacheKey = `resume_${url}`
  
  // Check cache first
  const cachedResume = cacheManager.get<Blob>(cacheKey)
  if (cachedResume) {
    return cachedResume
  }

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch resume: ${response.statusText}`)
    }

    const blob = await response.blob()
    
    // Cache for 1 hour (resume downloads should be fresh)
    cacheManager.set(cacheKey, blob, 60 * 60 * 1000)
    
    return blob
  } catch (error) {
    console.error('Error caching resume:', error)
    return null
  }
}

/**
 * Pre-cache important assets on page load
 */
export const preloadAssets = async (resumeUrl: string): Promise<void> => {
  if (!resumeUrl || resumeUrl === '#') {
    return
  }

  try {
    // Pre-cache resume in the background
    await cacheResume(resumeUrl)
    console.log('Resume pre-cached successfully')
  } catch (error) {
    console.warn('Failed to pre-cache resume:', error)
  }
}

/**
 * Download a cached file with a given filename
 */
export const downloadCachedFile = async (
  url: string,
  filename: string
): Promise<boolean> => {
  try {
    const blob = await cacheResume(url)
    
    if (!blob) {
      throw new Error('Failed to get cached file')
    }

    const downloadUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(downloadUrl)

    return true
  } catch (error) {
    console.error('Error downloading cached file:', error)
    return false
  }
}

/**
 * Initialize cache cleanup interval
 */
export const initializeCacheCleanup = (): () => void => {
  // Clean up expired cache entries every hour
  const intervalId = setInterval(() => {
    cacheManager.cleanup()
  }, 60 * 60 * 1000)

  // Return cleanup function
  return () => {
    clearInterval(intervalId)
  }
}

/**
 * Get cache statistics for debugging
 */
export const getCacheStats = () => {
  return {
    size: cacheManager.size(),
    entries: Array.from(cacheManager['cache'].keys()),
  }
} 