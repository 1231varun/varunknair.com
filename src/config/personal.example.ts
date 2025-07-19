import { PersonalInfo, SocialLinks, ResumeInfo, Experience, Education, Project } from '@/types'

/**
 * Portfolio Configuration Template
 * 
 * HYBRID APPROACH:
 * - Sensitive data (contact info, resume) → Environment variables (.env file)
 * - Professional content (experience, projects) → Hardcoded below
 * 
 * SETUP:
 * 1. Create .env file with your sensitive information
 * 2. Replace the professional content below with your own experience/projects
 * 3. Commit this file - others can fork and replace the content
 */

// Sensitive personal information from environment variables
export const personalInfo: PersonalInfo = {
  fullName: import.meta.env.VITE_FULL_NAME || 'Your Full Name',
  email: import.meta.env.VITE_EMAIL || 'your.email@example.com',
  phone: import.meta.env.VITE_PHONE || '+1-234-567-8900',
  location: import.meta.env.VITE_LOCATION || 'Your City, Country',
  tagline: import.meta.env.VITE_TAGLINE || 'Your Professional Tagline | Full-Stack Developer',
  bio: import.meta.env.VITE_BIO || 'Passionate developer with X years of experience building scalable applications and elegant user experiences. Skilled in modern web technologies and passionate about creating impactful solutions.',
  personalStory: import.meta.env.VITE_PERSONAL_STORY || 'Share your personal story here! Talk about your hobbies, family, interests, and what makes you unique beyond your technical skills. This appears in the About Me section to help people connect with you as a person.',
  profileImageUrl: import.meta.env.VITE_PROFILE_IMAGE_URL || '',
  yearsOfExperience: 5, // Update this with your actual years of experience
}

export const socialLinks: SocialLinks = {
  github: import.meta.env.VITE_GITHUB_URL || 'https://github.com/yourusername',
  linkedin: import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/yourusername',
  twitter: import.meta.env.VITE_TWITTER_URL || 'https://twitter.com/yourusername',
  website: import.meta.env.VITE_WEBSITE_URL || 'https://yourwebsite.com',
}

export const resumeInfo: ResumeInfo = {
  viewUrl: import.meta.env.VITE_RESUME_URL || 'https://drive.google.com/file/d/your-resume-file-id/view',
  downloadUrl: import.meta.env.VITE_RESUME_DOWNLOAD_URL || 'https://drive.google.com/uc?export=download&id=your-resume-file-id',
}

// Professional content (REPLACE THIS with your own experience and projects)
export const experience: Experience[] = [
  {
    id: 'current-job',
    company: 'Your Current Company',
    position: 'Senior Software Engineer',
    duration: '2022 - Present',
    location: 'City, Country',
    description: [
      'Led development of key features that improved user engagement by 40%',
      'Architected and implemented scalable microservices handling 1M+ requests daily',
      'Mentored junior developers and established coding best practices',
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
    current: true,
  },
  {
    id: 'previous-job',
    company: 'Previous Company',
    position: 'Software Engineer',
    duration: '2020 - 2022',
    location: 'City, Country',
    description: [
      'Developed and maintained web applications serving 100K+ users',
      'Collaborated with cross-functional teams to deliver features on time',
      'Optimized application performance resulting in 30% faster load times',
    ],
    technologies: ['React', 'Express.js', 'MongoDB', 'Docker'],
    current: false,
  },
  // Add more experiences...
]

export const education: Education[] = [
  {
    id: 'university',
    institution: 'Your University',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    duration: '2016 - 2020',
    location: 'City, Country',
    gpa: '3.8/4.0',
    description: 'Graduated with honors, focusing on software engineering fundamentals, algorithms, and system design.',
  },
]

/**
 * Professional Projects from your work experience
 * REPLACE THIS section with your own projects
 */
export const professionalProjects: Project[] = [
  {
    id: 'professional-1',
    title: 'E-Commerce Platform Redesign',
    description: 'Led the complete redesign of a major e-commerce platform, improving user experience and increasing conversion rates.',
    longDescription: 'Spearheaded the end-to-end redesign of a high-traffic e-commerce platform serving over 500K customers. Implemented modern React architecture with server-side rendering, integrated payment gateways, and optimized for mobile-first experience. The project resulted in a 45% increase in conversion rates and 60% improvement in page load speeds.',
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    imageUrl: '/projects/ecommerce-platform.jpg',
    projectUrl: 'https://company.com/case-study',
    githubUrl: '',
    featured: true,
    category: 'web',
  },
  {
    id: 'professional-2',
    title: 'Real-time Analytics Dashboard',
    description: 'Built a comprehensive analytics dashboard for monitoring business metrics in real-time.',
    longDescription: 'Designed and developed a real-time analytics dashboard that provides actionable insights for business stakeholders. Implemented data visualization components, real-time data streaming, and automated report generation.',
    technologies: ['React', 'D3.js', 'WebSocket', 'Python', 'PostgreSQL', 'Docker'],
    imageUrl: '/projects/analytics-dashboard.jpg',
    projectUrl: 'https://company.com/analytics',
    githubUrl: '',
    featured: true,
    category: 'web',
  },
  {
    id: 'professional-3',
    title: 'Mobile API Gateway',
    description: 'Architected and implemented a scalable API gateway to serve multiple mobile applications.',
    longDescription: 'Built a robust API gateway that serves as the backbone for multiple mobile applications. Implemented authentication, rate limiting, request routing, and comprehensive logging.',
    technologies: ['Node.js', 'Express.js', 'Redis', 'JWT', 'Docker', 'Kubernetes'],
    imageUrl: '/projects/api-gateway.jpg',
    projectUrl: '',
    githubUrl: '',
    featured: true,
    category: 'api',
  },
]

/**
 * Certifications and Achievements
 */
export const certifications: string[] = [
  'AWS Certified Solutions Architect',
  'Certified Kubernetes Administrator (CKA)',
  'MongoDB Certified Developer',
  'Outstanding Employee Award 2023',
]

/**
 * Analytics Configuration
 */
export const analyticsConfig = {
  googleAnalyticsId: import.meta.env.VITE_GA_TRACKING_ID || '',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
}

/*
ENVIRONMENT VARIABLES NEEDED (.env file):

# Personal Information
VITE_FULL_NAME="Your Full Name"
VITE_EMAIL="your.email@example.com"
VITE_PHONE="+1-234-567-8900"
VITE_LOCATION="Your City, Country"
VITE_TAGLINE="Your Professional Tagline"
VITE_BIO="Your professional bio..."
VITE_PROFILE_IMAGE_URL="https://example.com/your-photo.jpg"

# Social Links
VITE_GITHUB_URL="https://github.com/yourusername"
VITE_LINKEDIN_URL="https://linkedin.com/in/yourusername"
VITE_TWITTER_URL="https://twitter.com/yourusername"
VITE_WEBSITE_URL="https://yourwebsite.com"

# Resume
VITE_RESUME_URL="https://drive.google.com/file/d/your-resume-file-id/view"
VITE_RESUME_DOWNLOAD_URL="https://drive.google.com/uc?export=download&id=your-resume-file-id"

# Analytics (optional)
VITE_GA_TRACKING_ID="G-XXXXXXXXXX"
VITE_ENABLE_ANALYTICS="false"
*/ 