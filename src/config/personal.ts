import { PersonalInfo, SocialLinks, ResumeInfo, Experience, Education, Project } from '@/types'

/**
 * Varun K. Nair's Portfolio Configuration
 * 
 * SENSITIVE DATA: Uses environment variables (.env file, not committed)
 * PROFESSIONAL DATA: Hardcoded below (committed to repo, others can replace)
 */

// Sensitive personal information from environment variables
export const personalInfo: PersonalInfo = {
  fullName: import.meta.env.VITE_FULL_NAME || 'Varun K Nair',
  email: import.meta.env.VITE_EMAIL || 'your.email@example.com',
  phone: import.meta.env.VITE_PHONE || '+1-234-567-8900',
  location: import.meta.env.VITE_LOCATION || 'Bengaluru, India',
  tagline: import.meta.env.VITE_TAGLINE || 'Senior Software Engineer | 9+ Years Building Scalable Applications',
  bio: import.meta.env.VITE_BIO || 'Results-driven Senior Software Engineer with close to 9 years of experience building and optimizing scalable, high-performance applications using JavaScript, React, Node.js, Python and cloud-native technologies. Proven expertise in leading end-to-end projects, mentoring teams, and improving development processes to deliver impactful solutions.',
  profileImageUrl: import.meta.env.VITE_PROFILE_IMAGE_URL || '',
  yearsOfExperience: 9, // Update this as needed
}

export const socialLinks: SocialLinks = {
  github: import.meta.env.VITE_GITHUB_URL || 'https://github.com/1231varun',
  linkedin: import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/varun-k-nair-422a03120/',
  twitter: import.meta.env.VITE_TWITTER_URL || 'https://x.com/1231varun',
  website: import.meta.env.VITE_WEBSITE_URL || 'https://varunknair.com',
}

export const resumeInfo: ResumeInfo = {
  viewUrl: import.meta.env.VITE_RESUME_URL || 'https://drive.google.com/file/d/your-resume-file-id/view',
  downloadUrl: import.meta.env.VITE_RESUME_DOWNLOAD_URL || 'https://drive.google.com/uc?export=download&id=your-resume-file-id',
}

// Professional content (hardcoded, safe to commit)
export const experience: Experience[] = [
  {
    id: 'proofpoint',
    company: 'Proofpoint (Through Normalyze acquisition)',
    position: 'Senior Software Engineer',
    duration: '11/2024 - Present',
    location: 'Bangalore, India',
    description: [
      'Enhanced workflow efficiency through the redesign and transition to Temporal from Orkes Conductor',
      'Led and contributed to the development of a unified, reusable workflow from existing processes',
      'Achieved a 50% improvement in team efficiency by shortening integration timelines from eight weeks down to four weeks',
    ],
    technologies: ['Temporal', 'Orkes Conductor', 'Node.js', 'Python', 'Microservices'],
    current: true,
  },
  {
    id: 'normalyze',
    company: 'Normalyze.ai (Acquired by Proofpoint)',
    position: 'Senior Full Stack Engineer',
    duration: '10/2023 - 11/2024',
    location: 'Bengaluru, India',
    description: [
      'Designed and implemented a scalable ad-hoc job workflow framework to integrate diverse workflows for seamless data updates',
      'Built and optimized high-scale microservices and AWS Lambda functions to enhance DSPM tools performance',
      'Led the design, development, and maintenance of SaaS application onboarding flow components and backend APIs',
      'Developed the SaaS DataScan Overview page utilizing Snowflake DBT for data aggregation',
      'Built reusable ReactJS components for data visualization, enhancing the platform\'s web UI with valuable insights',
    ],
    technologies: ['React', 'Node.js', 'AWS Lambda', 'Snowflake', 'Python', 'Docker', 'PostgreSQL'],
    current: false,
  },
  {
    id: 'cisco',
    company: 'Cisco Systems India Private Limited',
    position: 'Senior Software Engineer',
    duration: '09/2019 - 10/2023',
    location: 'Bangalore, Karnataka',
    description: [
      'Led UI Development of Endpoint Security Posture configurations for Cisco Security Business Group (Umbrella/Secure Service Edge)',
      'Led planning and design for the frontend team and performed the role of scrum master',
      'Led the technical design and implementation of extendable and reusable react components that increased development velocity by 40%',
      'Mentored junior engineers enabling them to achieve professional growth and personal goals',
      'Built react based micro-frontends that integrate with Cisco Secure Service Edge Dashboard',
      'Led the effort on building the Webex Instant Telehealth Connector for Epic EHR using WebRTC',
    ],
    technologies: ['React', 'Redux', 'Node.js', 'WebRTC', 'Microservices', 'TypeScript', 'Python'],
    current: false,
  },
  {
    id: 'hertz',
    company: '42Hertz (Acquired by Cisco)',
    position: 'Software Developer',
    duration: '12/2017 - 08/2019',
    location: 'Bengaluru, Karnataka',
    description: [
      'Responsible for designing and developing applications for 42Hertz Customers and communicating with stakeholders',
      'Enhanced Rapid Sign Now by integrating payment gateway and improved their payment module',
      'Built minimal viable products for customers and demonstrated proof of concepts to clients',
      'Optimized applications for maximum speed and scalability',
    ],
    technologies: ['React', 'Redux', 'Node.js', 'Express.js', 'Python', 'Django', 'MongoDB', 'MySQL'],
    current: false,
  },
  {
    id: 'silver-oak',
    company: 'Silver Oak Health',
    position: 'Product Engineer',
    duration: '06/2016 - 12/2017',
    location: 'Bengaluru, Karnataka',
    description: [
      'Built a suite of mindfulness and EAP products for Silver Oak Health providing SaaS Platform for businesses',
      'Responsible for building the web application UX/UI and Backend RESTful APIs',
      'Built the EAP platform from ideation to production and maintenance',
      'Developed, designed and deployed the iOS and Android Tranquil Mindfulness App',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Python', 'Android', 'iOS Swift', 'PHP'],
    current: false,
  },
]

export const education: Education[] = [
  {
    id: 'hkbk-engineering',
    institution: 'HKBK College Of Engineering (VTU)',
    degree: 'Bachelor of Engineering',
    field: 'Information Science',
    duration: '2012 - 2016',
    location: 'Bengaluru, Karnataka',
    gpa: 'First Class',
    description: 'Graduated with First Class honors, focusing on software engineering fundamentals, data structures, algorithms, and computer science principles.',
  },
]



/**
 * Professional Projects from work experience
 * These are detailed projects from your professional career
 */
export const professionalProjects: Project[] = [
  {
    id: 'webex-telehealth',
    title: 'Webex Instant Telehealth Connector for Epic EHR',
    description: 'Led the development of Webex integration into Epic EHR using WebRTC, enabling seamless telehealth consultations for healthcare providers.',
    longDescription: 'Architected and developed a comprehensive telehealth solution that integrates Webex video calling capabilities directly into Epic Electronic Health Records system. This groundbreaking solution enables healthcare providers to conduct secure, HIPAA-compliant video consultations with patients without leaving their EHR workflow. The project involved complex WebRTC implementations, custom healthcare APIs, and seamless integration with Epic\'s ecosystem. This innovation significantly improved patient care delivery and reduced consultation setup time from minutes to seconds.',
    technologies: ['WebRTC', 'Webex SDK', 'React', 'Node.js', 'Epic Integration', 'HIPAA Compliance'],
    imageUrl: '/projects/webex-telehealth.jpg',
    projectUrl: 'https://www.cisco.com/products/collaboration-endpoints/webex-healthcare.html',
    githubUrl: '',
    featured: true,
    category: 'web',
  },
  {
    id: 'normalyze-dspm',
    title: 'Normalyze Data Security Posture Management Platform',
    description: 'Built scalable microservices and AWS Lambda functions for Data Security Posture Management tools, improving team efficiency by 50%.',
    longDescription: 'Designed and implemented a comprehensive Data Security Posture Management (DSPM) platform that helps organizations discover, classify, and protect sensitive data across multi-cloud environments. Built scalable microservices architecture with AWS Lambda functions, implemented data aggregation pipelines using Snowflake DBT, and created interactive dashboards for security insights. The platform processes petabytes of data and provides real-time security posture insights. Achieved 50% improvement in team efficiency through optimized workflows and reduced integration timelines from 8 weeks to 4 weeks.',
    technologies: ['React', 'Node.js', 'AWS Lambda', 'Snowflake', 'Python', 'Docker', 'PostgreSQL', 'Microservices', 'DBT'],
    imageUrl: '/projects/normalyze-dspm.jpg',
    projectUrl: 'https://normalyze.ai',
    githubUrl: '',
    featured: true,
    category: 'web',
  },
  {
    id: 'cisco-security-dashboard',
    title: 'Cisco Security Service Edge Dashboard',
    description: 'Led UI development for endpoint security configurations and built reusable React components, increasing development velocity by 40%.',
    longDescription: 'Spearheaded the frontend development of Cisco\'s Security Service Edge Dashboard, focusing on endpoint security posture configurations. Built a comprehensive micro-frontend architecture using React and Redux, created reusable component library that increased team development velocity by 40%. Implemented real-time security monitoring, policy management interfaces, and integrated with Cisco\'s Umbrella security platform. The dashboard serves thousands of enterprise customers and processes millions of security events daily.',
    technologies: ['React', 'Redux', 'Microservices', 'TypeScript', 'Node.js', 'Cisco APIs', 'Security Protocols', 'Micro-frontends'],
    imageUrl: '/projects/cisco-security.jpg',
    projectUrl: 'https://umbrella.cisco.com',
    githubUrl: '',
    featured: true,
    category: 'web',
  },
  {
    id: 'cisco-webex-integrations',
    title: 'Cisco Webex Third-Party Integrations',
    description: 'Led UI development for first and third-party integrations including Box, Bitmoji (Snapchat), and Oracle Eloqua for Cisco Webex.',
    longDescription: 'Architected and developed multiple high-impact integrations for Cisco Webex collaboration platform. Led the UI development for Box file sharing integration, Bitmoji (Snapchat) for enhanced communication, and Oracle Eloqua marketing automation integration. These integrations expanded Webex\'s ecosystem and improved user engagement significantly. Implemented OAuth flows, real-time synchronization, and seamless user experiences across different platforms.',
    technologies: ['React', 'Redux', 'OAuth', 'REST APIs', 'WebRTC', 'Real-time sync', 'Third-party SDKs'],
    imageUrl: '/projects/webex-integrations.jpg',
    projectUrl: 'https://www.webex.com/integrations/',
    githubUrl: '',
    featured: true,
    category: 'web',
  },
  {
    id: 'silver-oak-eap',
    title: 'Employee Assistance Program Platform',
    description: 'Built a comprehensive EAP platform from ideation to production, including web application, mobile apps, and backend APIs.',
    longDescription: 'Designed and developed a complete Employee Assistance Program (EAP) platform for Silver Oak Health, providing mental health and wellness services to businesses. Built the entire stack from ideation to production including web application UX/UI, backend RESTful APIs, and mobile applications for iOS and Android. The platform includes stress management tools, mindfulness programs, counseling booking systems, and analytics dashboards. Successfully launched and maintained the platform serving multiple enterprise clients.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Python', 'Android', 'iOS Swift', 'PHP', 'RESTful APIs'],
    imageUrl: '/projects/silver-oak-eap.jpg',
    projectUrl: '',
    githubUrl: '',
    featured: false,
    category: 'web',
  },
]

/**
 * Certifications and Achievements
 */
export const certifications: string[] = [
  'Uplimit Synthetic Data Generation for Fine-tuning AI Model certification',
  'Uplimit AI & ChatGPT for Everyone Certification',
  'Innovation Day CTO Award - Webex Integration Development Framework',
]

/**
 * Analytics Configuration
 */
export const analyticsConfig = {
  googleAnalyticsId: import.meta.env.VITE_GA_TRACKING_ID || '',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
} 