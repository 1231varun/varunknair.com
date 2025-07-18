export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  tagline: string
  bio: string
  profileImageUrl?: string
  yearsOfExperience?: number
}

export interface AnalyticsConfig {
  googleAnalyticsId?: string
  enableAnalytics: boolean
}

export interface SocialLinks {
  github?: string
  linkedin?: string
  twitter?: string
  website?: string
}

export interface ResumeInfo {
  viewUrl: string
  downloadUrl: string
}

export interface Skill {
  name: string
  level: number
  category: 'frontend' | 'backend' | 'devops' | 'tools' | 'database'
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  imageUrl: string
  projectUrl?: string
  githubUrl?: string
  featured: boolean
  category: 'web' | 'mobile' | 'desktop' | 'api' | 'other'
}

export interface Experience {
  id: string
  company: string
  position: string
  duration: string
  location: string
  description: string[]
  technologies: string[]
  current: boolean
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  duration: string
  location: string
  gpa?: string
  description?: string
}

export interface Config {
  personalInfo: PersonalInfo
  socialLinks: SocialLinks
  resumeInfo: ResumeInfo
  skills: Skill[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
  features: {
    enableAnimations: boolean
    enableDarkMode: boolean
    enableContactForm: boolean
  }
}

export type Theme = 'light' | 'dark'

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
} 