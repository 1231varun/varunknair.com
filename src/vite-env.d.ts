/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Sensitive personal information (from .env, not committed)
  readonly VITE_FULL_NAME: string
  readonly VITE_EMAIL: string
  readonly VITE_PHONE: string
  readonly VITE_LOCATION: string
  readonly VITE_TAGLINE: string
  readonly VITE_BIO: string
  readonly VITE_PROFILE_IMAGE_URL: string
  
  // Social links (potentially sensitive)
  readonly VITE_GITHUB_URL: string
  readonly VITE_LINKEDIN_URL: string
  readonly VITE_TWITTER_URL: string
  readonly VITE_WEBSITE_URL: string
  
  // Resume links (sensitive)
  readonly VITE_RESUME_URL: string
  readonly VITE_RESUME_DOWNLOAD_URL: string
  
  // Analytics (optional)
  readonly VITE_GA_TRACKING_ID: string
  readonly VITE_ENABLE_ANALYTICS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 