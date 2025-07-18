/**
 * Analytics utility for tracking user interactions
 * Privacy-focused with optional Google Analytics integration
 */

interface AnalyticsEvent {
  event: string
  category: string
  action: string
  label?: string
  value?: number
}

interface PageView {
  page_title: string
  page_location: string
  page_path: string
}

class Analytics {
  private isEnabled: boolean = false
  private gaTrackingId: string | null = null

  constructor() {
    // Analytics will be initialized when configure() is called
  }

  /**
   * Configure analytics with settings
   */
  configure(config: { googleAnalyticsId?: string; enableAnalytics: boolean }): void {
    this.gaTrackingId = config.googleAnalyticsId || null
    this.isEnabled = config.enableAnalytics && !!this.gaTrackingId && typeof window !== 'undefined'
    
    if (this.isEnabled) {
      this.initializeGA()
    }
  }

  /**
   * Initialize Google Analytics
   */
  private initializeGA(): void {
    if (!this.gaTrackingId) return

    // Load Google Analytics script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaTrackingId}`
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    
    gtag('js', new Date())
    gtag('config', this.gaTrackingId, {
      send_page_view: false, // We'll send page views manually
    })

    // Make gtag available globally
    window.gtag = gtag
  }

  /**
   * Track a page view
   */
  trackPageView(path: string = window.location.pathname): void {
    if (!this.isEnabled) return

    const pageView: PageView = {
      page_title: document.title,
      page_location: window.location.href,
      page_path: path,
    }

    if (window.gtag) {
      window.gtag('event', 'page_view', pageView)
    }

    // Console log for development (only if analytics debugging is enabled)
    if (!this.gaTrackingId) {
      console.log('📊 Page View (dev):', pageView)
    }
  }

  /**
   * Track a custom event
   */
  trackEvent({ event, category, action, label, value }: AnalyticsEvent): void {
    if (!this.isEnabled) return

    const eventData: any = {
      event_category: category,
      event_label: label,
      value: value,
    }

    if (window.gtag) {
      window.gtag('event', action, eventData)
    }

    // Console log for development (only if analytics debugging is enabled)
    if (!this.gaTrackingId) {
      console.log('📊 Event (dev):', { event, category, action, label, value })
    }
  }

  /**
   * Track resume downloads
   */
  trackResumeDownload(method: 'view' | 'download'): void {
    this.trackEvent({
      event: 'resume_download',
      category: 'engagement',
      action: method === 'view' ? 'resume_view' : 'resume_download',
      label: 'resume_pdf',
    })
  }

  /**
   * Track project interactions
   */
  trackProjectInteraction(projectId: string, action: 'view' | 'github' | 'demo'): void {
    this.trackEvent({
      event: 'project_interaction',
      category: 'projects',
      action: action,
      label: projectId,
    })
  }

  /**
   * Track contact form submissions
   */
  trackContactForm(action: 'submit' | 'success' | 'error'): void {
    this.trackEvent({
      event: 'contact_form',
      category: 'engagement',
      action: `form_${action}`,
      label: 'contact_form',
    })
  }

  /**
   * Track theme changes
   */
  trackThemeChange(theme: 'light' | 'dark'): void {
    this.trackEvent({
      event: 'theme_change',
      category: 'ui',
      action: 'theme_toggle',
      label: theme,
    })
  }

  /**
   * Track social link clicks
   */
  trackSocialClick(platform: string): void {
    this.trackEvent({
      event: 'social_click',
      category: 'engagement',
      action: 'social_link_click',
      label: platform,
    })
  }

  /**
   * Track navigation
   */
  trackNavigation(section: string, method: 'click' | 'scroll'): void {
    this.trackEvent({
      event: 'navigation',
      category: 'navigation',
      action: `nav_${method}`,
      label: section,
    })
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth(percentage: number): void {
    // Only track at specific milestones
    const milestones = [25, 50, 75, 100]
    if (milestones.includes(percentage)) {
      this.trackEvent({
        event: 'scroll_depth',
        category: 'engagement',
        action: 'scroll',
        label: `${percentage}%`,
        value: percentage,
      })
    }
  }

  /**
   * Track time on page
   */
  trackTimeOnPage(): void {
    const startTime = Date.now()
    
    const handleUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      
      this.trackEvent({
        event: 'time_on_page',
        category: 'engagement',
        action: 'time_spent',
        value: timeSpent,
      })
    }

    window.addEventListener('beforeunload', handleUnload)
    
    // Also track at intervals for single-page app
    const intervals = [30, 60, 120, 300] // 30s, 1m, 2m, 5m
    intervals.forEach(seconds => {
      setTimeout(() => {
        this.trackEvent({
          event: 'time_milestone',
          category: 'engagement',
          action: 'time_on_page',
          label: `${seconds}s`,
          value: seconds,
        })
      }, seconds * 1000)
    })
  }

  /**
   * Check if analytics is enabled
   */
  isAnalyticsEnabled(): boolean {
    return this.isEnabled
  }
}

// Create singleton instance
export const analytics = new Analytics()

/**
 * Initialize scroll tracking
 */
export const initializeScrollTracking = (): (() => void) => {
  let lastScrollDepth = 0
  
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrolled = window.scrollY
    const scrollDepth = Math.round((scrolled / scrollHeight) * 100)
    
    // Only track if we've scrolled significantly further
    if (scrollDepth > lastScrollDepth + 10) {
      analytics.trackScrollDepth(scrollDepth)
      lastScrollDepth = scrollDepth
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}

/**
 * Declare global gtag function for TypeScript
 */
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
} 