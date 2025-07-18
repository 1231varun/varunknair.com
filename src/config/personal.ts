import { PersonalInfo, SocialLinks, ResumeInfo, Experience, Education, Project } from '@/types'
import i18n from '@/i18n'

/**
 * Varun K. Nair's Portfolio Configuration - Multi-language Support
 * 
 * SENSITIVE DATA: Uses environment variables (.env file, not committed)
 * PROFESSIONAL DATA: Language-aware content switching (committed to repo)
 */

// Helper function to get current language
const getCurrentLanguage = (): string => {
  // Access the current language from the i18n instance
  return i18n.language || i18n.resolvedLanguage || 'en'
}

// Bio data that changes with language
const bioData: Record<string, string> = {
  en: 'Results-driven Senior Software Engineer with close to 9 years of experience building and optimizing scalable, high-performance applications using JavaScript, React, Node.js, Python and cloud-native technologies. Proven expertise in leading end-to-end projects, mentoring teams, and improving development processes to deliver impactful solutions.',
  es: 'Ingeniero de Software Senior orientado a resultados con cerca de 9 años de experiencia construyendo y optimizando aplicaciones escalables y de alto rendimiento usando JavaScript, React, Node.js, Python y tecnologías cloud-nativas. Experiencia comprobada liderando proyectos end-to-end, mentoreando equipos, y mejorando procesos de desarrollo para entregar soluciones impactantes.',
}

// Tagline data that changes with language  
const taglineData: Record<string, string> = {
  en: 'Senior Software Engineer | 9+ Years Building Scalable Applications',
  es: 'Ingeniero de Software Senior | 9+ Años Construyendo Aplicaciones Escalables',
}

// Get language-aware bio and tagline
const getLanguageAwareBio = (): string => {
  const currentLang = getCurrentLanguage()
  return bioData[currentLang] || bioData.en
}

const getLanguageAwareTagline = (): string => {
  const currentLang = getCurrentLanguage()
  return taglineData[currentLang] || taglineData.en
}

// Function to get fresh personalInfo with current language
export const getPersonalInfo = (): PersonalInfo => {
  return {
    fullName: import.meta.env.VITE_FULL_NAME || 'Varun K Nair',
    email: import.meta.env.VITE_EMAIL || 'your.email@example.com',
    phone: import.meta.env.VITE_PHONE || '+1-234-567-8900',
    location: import.meta.env.VITE_LOCATION || 'Bengaluru, India',
    tagline: getLanguageAwareTagline(),
    bio: getLanguageAwareBio(),
    profileImageUrl: import.meta.env.VITE_PROFILE_IMAGE_URL || '',
    yearsOfExperience: 9,
  }
}

// Static personal information from environment variables (language-independent)
// NOTE: This is kept for backward compatibility, but use getPersonalInfo() for reactive data
export const personalInfo: PersonalInfo = {
  fullName: import.meta.env.VITE_FULL_NAME || 'Varun K Nair',
  email: import.meta.env.VITE_EMAIL || 'your.email@example.com',
  phone: import.meta.env.VITE_PHONE || '+1-234-567-8900',
  location: import.meta.env.VITE_LOCATION || 'Bengaluru, India',
  tagline: getLanguageAwareTagline(),
  bio: getLanguageAwareBio(),
  profileImageUrl: import.meta.env.VITE_PROFILE_IMAGE_URL || '',
  yearsOfExperience: 9,
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

// Multi-language experience data
const experienceData: Record<string, Experience[]> = {
  en: [
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
  ],
  es: [
    {
      id: 'proofpoint',
      company: 'Proofpoint (A través de adquisición de Normalyze)',
      position: 'Ingeniero de Software Senior',
      duration: '11/2024 - Presente',
      location: 'Bangalore, India',
      description: [
        'Mejoré la eficiencia del flujo de trabajo mediante el rediseño y transición a Temporal desde Orkes Conductor',
        'Lideré y contribuí al desarrollo de un flujo de trabajo unificado y reutilizable a partir de procesos existentes',
        'Logré una mejora del 50% en la eficiencia del equipo al acortar los tiempos de integración de ocho semanas a cuatro semanas',
      ],
      technologies: ['Temporal', 'Orkes Conductor', 'Node.js', 'Python', 'Microservicios'],
      current: true,
    },
    {
      id: 'normalyze',
      company: 'Normalyze.ai (Adquirida por Proofpoint)',
      position: 'Ingeniero Full Stack Senior',
      duration: '10/2023 - 11/2024',
      location: 'Bengaluru, India',
      description: [
        'Diseñé e implementé un marco de flujo de trabajo ad-hoc escalable para integrar diversos flujos de trabajo para actualizaciones de datos sin problemas',
        'Construí y optimicé microservicios de alta escala y funciones AWS Lambda para mejorar el rendimiento de las herramientas DSPM',
        'Lideré el diseño, desarrollo y mantenimiento de componentes de flujo de incorporación de aplicaciones SaaS y APIs backend',
        'Desarrollé la página de resumen DataScan SaaS utilizando Snowflake DBT para agregación de datos',
        'Construí componentes ReactJS reutilizables para visualización de datos, mejorando la interfaz web de la plataforma con insights valiosos',
      ],
      technologies: ['React', 'Node.js', 'AWS Lambda', 'Snowflake', 'Python', 'Docker', 'PostgreSQL'],
      current: false,
    },
    {
      id: 'cisco',
      company: 'Cisco Systems India Private Limited',
      position: 'Ingeniero de Software Senior',
      duration: '09/2019 - 10/2023',
      location: 'Bangalore, Karnataka',
      description: [
        'Lideré el desarrollo de UI para configuraciones de postura de seguridad de endpoints para Cisco Security Business Group (Umbrella/Secure Service Edge)',
        'Lideré la planificación y diseño para el equipo frontend y desempeñé el rol de scrum master',
        'Lideré el diseño técnico e implementación de componentes react extensibles y reutilizables que aumentaron la velocidad de desarrollo en un 40%',
        'Mentoré ingenieros junior permitiéndoles lograr crecimiento profesional y objetivos personales',
        'Construí micro-frontends basados en react que se integran con Cisco Secure Service Edge Dashboard',
        'Lideré el esfuerzo en construir el Conector de Telesalud Instantánea Webex para Epic EHR usando WebRTC',
      ],
      technologies: ['React', 'Redux', 'Node.js', 'WebRTC', 'Microservicios', 'TypeScript', 'Python'],
      current: false,
    },
    {
      id: 'hertz',
      company: '42Hertz (Adquirida por Cisco)',
      position: 'Desarrollador de Software',
      duration: '12/2017 - 08/2019',
      location: 'Bengaluru, Karnataka',
      description: [
        'Responsable de diseñar y desarrollar aplicaciones para clientes de 42Hertz y comunicarse con stakeholders',
        'Mejoré Rapid Sign Now integrando pasarela de pagos y mejoré su módulo de pagos',
        'Construí productos mínimos viables para clientes y demostré pruebas de concepto a clientes',
        'Optimicé aplicaciones para máxima velocidad y escalabilidad',
      ],
      technologies: ['React', 'Redux', 'Node.js', 'Express.js', 'Python', 'Django', 'MongoDB', 'MySQL'],
      current: false,
    },
    {
      id: 'silver-oak',
      company: 'Silver Oak Health',
      position: 'Ingeniero de Producto',
      duration: '06/2016 - 12/2017',
      location: 'Bengaluru, Karnataka',
      description: [
        'Construí un conjunto de productos de mindfulness y EAP para Silver Oak Health proporcionando Plataforma SaaS para empresas',
        'Responsable de construir la aplicación web UX/UI y APIs RESTful backend',
        'Construí la plataforma EAP desde la ideación hasta la producción y mantenimiento',
        'Desarrollé, diseñé y desplegué la App de Mindfulness Tranquil para iOS y Android',
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Python', 'Android', 'iOS Swift', 'PHP'],
      current: false,
    }
  ],
}

// Multi-language projects data
const projectsData: Record<string, Project[]> = {
  en: [
    {
      id: 'normalyze-dspm',
      title: 'Normalyze Data Security Posture Management Platform',
      description: 'Built scalable microservices and AWS Lambda functions for Data Security Posture Management tools, improving team efficiency by 50%.',
      longDescription: 'Designed and implemented a comprehensive Data Security Posture Management (DSPM) platform that helps organizations discover, classify, and protect sensitive data across multi-cloud environments. Built scalable microservices architecture with AWS Lambda functions, implemented data aggregation pipelines using Snowflake DBT, and created interactive dashboards for security insights.',
      technologies: ['React', 'Node.js', 'AWS Lambda', 'Snowflake', 'Python', 'Docker', 'PostgreSQL', 'Microservices', 'DBT'],
      imageUrl: '/projects/normalyze-dspm.jpg',
      projectUrl: 'https://normalyze.ai',
      githubUrl: '',
      featured: true,
      category: 'web',
    },
    {
      id: 'webex-telehealth',
      title: 'Webex Instant Telehealth Connector for Epic EHR',
      description: 'Led the development of Webex integration into Epic EHR using WebRTC, enabling seamless telehealth consultations for healthcare providers.',
      longDescription: 'Architected and developed a comprehensive telehealth solution that integrates Webex video calling capabilities directly into Epic Electronic Health Records system. This groundbreaking solution enables healthcare providers to conduct secure, HIPAA-compliant video consultations with patients without leaving their EHR workflow.',
      technologies: ['WebRTC', 'Webex SDK', 'React', 'Node.js', 'Epic Integration', 'HIPAA Compliance'],
      imageUrl: '/projects/webex-telehealth.jpg',
      projectUrl: 'https://www.cisco.com/products/collaboration-endpoints/webex-healthcare.html',
      githubUrl: '',
      featured: true,
      category: 'web',
    },
    {
      id: 'cisco-umbrella-ui',
      title: 'Cisco Umbrella Security Dashboard',
      description: 'Built reusable React components for Cisco Umbrella Security Dashboard, increasing development velocity by 40%.',
      longDescription: 'Led the frontend development of Cisco Umbrella Security Dashboard, focusing on endpoint security posture configurations. Designed and implemented a comprehensive component library with reusable React components that significantly improved development efficiency across multiple teams.',
      technologies: ['React', 'Redux', 'TypeScript', 'Cisco APIs', 'Component Library', 'Security Dashboard'],
      imageUrl: '/projects/cisco-umbrella.jpg',
      projectUrl: 'https://umbrella.cisco.com',
      githubUrl: '',
      featured: true,
      category: 'web',
    },
    {
      id: 'rapid-sign-now',
      title: 'Rapid Sign Now - Digital Signature Platform',
      description: 'Enhanced digital signature platform by integrating payment gateway and improving payment processing modules.',
      longDescription: 'Developed and enhanced a comprehensive digital signature platform that streamlines document signing workflows. Integrated secure payment processing, improved user experience, and built scalable backend APIs to handle high-volume document processing.',
      technologies: ['React', 'Node.js', 'Payment Gateway Integration', 'Digital Signatures', 'Express.js', 'MongoDB'],
      imageUrl: '/projects/rapid-sign-now.jpg',
      projectUrl: '',
      githubUrl: '',
      featured: false,
      category: 'web',
    },
    {
      id: 'silver-oak-mindfulness',
      title: 'Silver Oak Mindfulness & EAP Platform',
      description: 'Built a comprehensive mindfulness and Employee Assistance Program (EAP) SaaS platform with mobile applications.',
      longDescription: 'Developed a complete suite of mindfulness and Employee Assistance Program products for Silver Oak Health. Built the platform from ideation to production, including web application, mobile apps for iOS and Android, and comprehensive backend APIs for business clients.',
      technologies: ['React', 'Python', 'Django', 'iOS Swift', 'Android', 'RESTful APIs', 'SaaS Platform'],
      imageUrl: '/projects/silver-oak-mindfulness.jpg',
      projectUrl: '',
      githubUrl: '',
      featured: false,
      category: 'web',
    },
  ],
  es: [
    {
      id: 'normalyze-dspm',
      title: 'Plataforma de Gestión de Postura de Seguridad de Datos Normalyze',
      description: 'Construí microservicios escalables y funciones AWS Lambda para herramientas de Gestión de Postura de Seguridad de Datos, mejorando la eficiencia del equipo en un 50%.',
      longDescription: 'Diseñé e implementé una plataforma integral de Gestión de Postura de Seguridad de Datos (DSPM) que ayuda a las organizaciones a descubrir, clasificar y proteger datos sensibles en entornos multi-nube. Construí arquitectura de microservicios escalable con funciones AWS Lambda, implementé pipelines de agregación de datos usando Snowflake DBT, y creé dashboards interactivos para insights de seguridad.',
      technologies: ['React', 'Node.js', 'AWS Lambda', 'Snowflake', 'Python', 'Docker', 'PostgreSQL', 'Microservicios', 'DBT'],
      imageUrl: '/projects/normalyze-dspm.jpg',
      projectUrl: 'https://normalyze.ai',
      githubUrl: '',
      featured: true,
      category: 'web',
    },
    {
      id: 'webex-telehealth',
      title: 'Conector de Telesalud Instantánea Webex para Epic EHR',
      description: 'Lideré el desarrollo de la integración de Webex en Epic EHR usando WebRTC, permitiendo consultas de telesalud sin problemas para proveedores de atención médica.',
      longDescription: 'Arquitecté y desarrollé una solución integral de telesalud que integra las capacidades de videollamadas de Webex directamente en el sistema Epic Electronic Health Records. Esta solución revolucionaria permite a los proveedores de atención médica realizar consultas de video seguras y compatibles con HIPAA con pacientes sin salir de su flujo de trabajo EHR.',
      technologies: ['WebRTC', 'Webex SDK', 'React', 'Node.js', 'Integración Epic', 'Cumplimiento HIPAA'],
      imageUrl: '/projects/webex-telehealth.jpg',
      projectUrl: 'https://www.cisco.com/products/collaboration-endpoints/webex-healthcare.html',
      githubUrl: '',
      featured: true,
      category: 'web',
    },
    {
      id: 'cisco-umbrella-ui',
      title: 'Panel de Seguridad Cisco Umbrella',
      description: 'Construí componentes React reutilizables para el Panel de Seguridad Cisco Umbrella, aumentando la velocidad de desarrollo en un 40%.',
      longDescription: 'Lideré el desarrollo frontend del Panel de Seguridad Cisco Umbrella, enfocándome en configuraciones de postura de seguridad de endpoints. Diseñé e implementé una biblioteca integral de componentes con componentes React reutilizables que mejoraron significativamente la eficiencia de desarrollo en múltiples equipos.',
      technologies: ['React', 'Redux', 'TypeScript', 'APIs Cisco', 'Biblioteca de Componentes', 'Panel de Seguridad'],
      imageUrl: '/projects/cisco-umbrella.jpg',
      projectUrl: 'https://umbrella.cisco.com',
      githubUrl: '',
      featured: true,
      category: 'web',
    },
    {
      id: 'rapid-sign-now',
      title: 'Rapid Sign Now - Plataforma de Firma Digital',
      description: 'Mejoré la plataforma de firma digital integrando pasarela de pagos y mejorando los módulos de procesamiento de pagos.',
      longDescription: 'Desarrollé y mejoré una plataforma integral de firma digital que agiliza los flujos de trabajo de firma de documentos. Integré procesamiento seguro de pagos, mejoré la experiencia del usuario y construí APIs backend escalables para manejar procesamiento de documentos de alto volumen.',
      technologies: ['React', 'Node.js', 'Integración Pasarela de Pagos', 'Firmas Digitales', 'Express.js', 'MongoDB'],
      imageUrl: '/projects/rapid-sign-now.jpg',
      projectUrl: '',
      githubUrl: '',
      featured: false,
      category: 'web',
    },
    {
      id: 'silver-oak-mindfulness',
      title: 'Plataforma de Mindfulness y EAP Silver Oak',
      description: 'Construí una plataforma SaaS integral de mindfulness y Programa de Asistencia al Empleado (EAP) con aplicaciones móviles.',
      longDescription: 'Desarrollé un conjunto completo de productos de mindfulness y Programa de Asistencia al Empleado para Silver Oak Health. Construí la plataforma desde la ideación hasta la producción, incluyendo aplicación web, apps móviles para iOS y Android, y APIs backend integrales para clientes empresariales.',
      technologies: ['React', 'Python', 'Django', 'iOS Swift', 'Android', 'APIs RESTful', 'Plataforma SaaS'],
      imageUrl: '/projects/silver-oak-mindfulness.jpg',
      projectUrl: '',
      githubUrl: '',
      featured: false,
      category: 'web',
    }
  ],
}

// Language-aware exports that switch based on current language
export const getExperience = (): Experience[] => {
  const currentLang = getCurrentLanguage()
  return experienceData[currentLang] || experienceData.en
}

export const getProfessionalProjects = (): Project[] => {
  const currentLang = getCurrentLanguage()
  return projectsData[currentLang] || projectsData.en
}

// Static exports for convenience (these will need to be reactive)
export const experience = getExperience()
export const professionalProjects = getProfessionalProjects()

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