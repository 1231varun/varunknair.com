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
      technologies: ['Temporal', 'Orkes Conductor', 'Node.js', 'Python', 'Microservices', 'AWS'],
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
        'Second hire for the SaaS team, contributing to core DSPM platform architecture and scalability',
      ],
      technologies: ['React', 'Node.js', 'AWS Lambda', 'Snowflake', 'Python', 'Docker', 'PostgreSQL', 'Sequelize', 'Netflix Conductor'],
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
        'Built react based micro-frontends that integrate with Cisco Secure Service Edge Dashboard',
        'Led the effort on building the Webex Instant Telehealth Connector for Epic EHR using WebRTC',
        'Led UI development for 1st and 3rd party integrations like Box, Bitmoji (Snapchat) for Cisco Webex',
        'Mentored junior engineers enabling them to achieve professional growth and personal goals',
        'Won Innovation Day CTO Award for Webex integration development framework reducing development time from 1-2 sprints to 20 minutes',
      ],
      technologies: ['React', 'Redux', 'Node.js', 'WebRTC', 'Microservices', 'TypeScript', 'Python', 'Angular', 'Express.js'],
      current: false,
    },
    {
      id: 'hertz',
      company: '42Hertz (Acquired by Cisco)',
      position: 'Software Developer',
      duration: '12/2017 - 08/2019',
      location: 'Bengaluru, Karnataka',
      description: [
        'Responsible for designing and developing applications for 42Hertz customers and communicating with stakeholders',
        'Enhanced Rapid Sign Now by integrating payment gateway and improved their payment module with automated invoicing',
        'Built minimal viable products for customers and demonstrated proof of concepts to clients',
        'Contributed to Cisco Webex Admin Controls Platform (Control Hub) development',
        'Optimized applications for maximum speed and scalability',
      ],
      technologies: ['React', 'Redux', 'Node.js', 'Express.js', 'Python', 'Django', 'MongoDB', 'MySQL', 'Ruby on Rails'],
      current: false,
    },
    {
      id: 'silver-oak',
      company: 'Silver Oak Health',
      position: 'Product Engineer',
      duration: '06/2016 - 12/2017',
      location: 'Bengaluru, Karnataka',
      description: [
        'Built a suite of mindfulness and EAP products providing SaaS Platform for businesses and customers',
        'Responsible for building the web application UX/UI and Backend RESTful APIs',
        'Built the EAP platform from ideation to production and maintenance',
        'Developed, designed and deployed the iOS and Android Tranquil Mindfulness App',
        'Created Stress Control Online and Employee Wellbeing and Assistance Program',
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Python', 'Android', 'iOS Swift', 'PHP'],
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
      technologies: ['Temporal', 'Orkes Conductor', 'Node.js', 'Python', 'Microservicios', 'AWS'],
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
        'Segunda contratación para el equipo SaaS, contribuyendo a la arquitectura central de la plataforma DSPM y escalabilidad',
      ],
      technologies: ['React', 'Node.js', 'AWS Lambda', 'Snowflake', 'Python', 'Docker', 'PostgreSQL', 'Sequelize', 'Netflix Conductor'],
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
        'Construí micro-frontends basados en react que se integran con Cisco Secure Service Edge Dashboard',
        'Lideré el esfuerzo en construir el Conector de Telesalud Instantánea Webex para Epic EHR usando WebRTC',
        'Lideré el desarrollo de UI para integraciones de 1ra y 3ra parte como Box, Bitmoji (Snapchat) para Cisco Webex',
        'Mentoré ingenieros junior permitiéndoles lograr crecimiento profesional y objetivos personales',
        'Gané el Premio CTO del Día de Innovación por el marco de desarrollo de integraciones Webex reduciendo el tiempo de desarrollo de 1-2 sprints a 20 minutos',
      ],
      technologies: ['React', 'Redux', 'Node.js', 'WebRTC', 'Microservicios', 'TypeScript', 'Python', 'Angular', 'Express.js'],
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
        'Mejoré Rapid Sign Now integrando pasarela de pagos y mejoré su módulo de pagos con facturación automatizada',
        'Construí productos mínimos viables para clientes y demostré pruebas de concepto a clientes',
        'Contribuí al desarrollo de la Plataforma de Controles de Administración de Cisco Webex (Control Hub)',
        'Optimicé aplicaciones para máxima velocidad y escalabilidad',
      ],
      technologies: ['React', 'Redux', 'Node.js', 'Express.js', 'Python', 'Django', 'MongoDB', 'MySQL', 'Ruby on Rails'],
      current: false,
    },
    {
      id: 'silver-oak',
      company: 'Silver Oak Health',
      position: 'Ingeniero de Producto',
      duration: '06/2016 - 12/2017',
      location: 'Bengaluru, Karnataka',
      description: [
        'Construí un conjunto de productos de mindfulness y EAP proporcionando Plataforma SaaS para empresas y clientes',
        'Responsable de construir la aplicación web UX/UI y APIs RESTful backend',
        'Construí la plataforma EAP desde la ideación hasta la producción y mantenimiento',
        'Desarrollé, diseñé y desplegué la App de Mindfulness Tranquil para iOS y Android',
        'Creé Stress Control Online y Programa de Bienestar y Asistencia al Empleado',
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Python', 'Android', 'iOS Swift', 'PHP'],
      current: false,
    }
  ],
}

// Multi-language projects data
const projectsData: Record<string, Project[]> = {
  en: [
    {
      id: 'proofpoint-dsmp',
      title: 'Proofpoint Data Security Posture Management Platform',
      description: 'Built comprehensive DSPM platform with scalable microservices and AWS Lambda functions, improving team efficiency by 50% through workflow optimization.',
      longDescription: 'As the second hire for the SaaS team at Normalyze (now Proofpoint), architected and developed a comprehensive Data Security Posture Management (DSPM) platform. Built scalable ad-hoc job workflow framework, implemented high-scale microservices with AWS Lambda functions, and created data aggregation pipelines using Snowflake DBT. Designed interactive dashboards and reusable React components for data visualization.',
      technologies: ['React', 'Node.js', 'AWS Lambda', 'Snowflake', 'Python', 'Docker', 'PostgreSQL', 'Microservices', 'DBT', 'Sequelize'],
      imageUrl: '/projects/proofpoint-dspm.jpg',
      projectUrl: 'https://www.proofpoint.com/us/normalyze-is-now-proofpoint',
      githubUrl: '',
      featured: true,
      category: 'web',
    },
    {
      id: 'webex-telehealth-epic',
      title: 'Webex Instant Telehealth Connector for Epic EHR',
      description: 'Led UI development of WebRTC-based telehealth solution integrating Webex video calling directly into Epic Electronic Health Records system.',
      longDescription: 'Architected and led the complete UI development of a groundbreaking telehealth solution that seamlessly integrates Webex video calling capabilities into Epic EHR system. Built the entire web platform with WebRTC technology, enabling healthcare providers to conduct secure, HIPAA-compliant video consultations without leaving their EHR workflow. Contributed core functionalities to Webex JS SDK and handled authentication, security, and token brokering.',
      technologies: ['WebRTC', 'Webex SDK', 'React', 'Node.js', 'Epic Integration', 'HIPAA Compliance', 'TypeScript', 'Express.js'],
      imageUrl: '/projects/webex-epic.jpg',
      projectUrl: 'https://apphub.webex.com/applications/webex-telehealth-connector-for-epic',
      githubUrl: 'https://github.com/webex/webex-js-sdk',
      featured: true,
      category: 'web',
    },
    {
      id: 'cisco-sse-security',
      title: 'Cisco Security Service Edge (SSE) Platform',
      description: 'Led development of Endpoint Security Posture configurations for Cisco SSE, building modern micro-frontends with 40% improved development velocity.',
      longDescription: 'Led the frontend development of Cisco\'s Security Service Edge platform, focusing on endpoint security posture management configurations. Designed and implemented a comprehensive component library with extendable and reusable React components, significantly improving development efficiency across multiple teams. Built modern micro-frontends that integrate seamlessly with Cisco Secure Service Edge Dashboard.',
      technologies: ['React', 'Redux', 'TypeScript', 'Microservices', 'Cisco APIs', 'Component Library', 'Security Dashboard'],
      imageUrl: '/projects/cisco-sse.jpg',
      projectUrl: 'https://www.cisco.com/site/in/en/solutions/security-service-edge-sse/index.html',
      githubUrl: '',
      featured: true,
      category: 'web',
    },
    {
      id: 'webex-integrations-hub',
      title: 'Webex Integrations & App Hub',
      description: 'Built multiple Webex integrations including Bitmoji (Snapchat) and Eloqua connectors, plus development framework reducing build time from sprints to 20 minutes.',
      longDescription: 'Led development of various Webex integrations and contributed to the App Hub ecosystem. Built direct integration of Bitmojis from Snapchat into Webex native apps, developed Webex App for Oracle Eloqua Marketing Automation, and created a development framework that won the Innovation Day CTO Award. The framework reduced integration development time from 1-2 sprints to just 20 minutes.',
      technologies: ['React', 'Node.js', 'Webex SDK', 'OAuth', 'REST APIs', 'Integration Framework', 'JavaScript ES6'],
      imageUrl: '/projects/webex-integrations.jpg',
      projectUrl: 'https://apphub.webex.com/integrations',
      githubUrl: '',
      featured: true,
      category: 'web',
    },
    {
      id: 'silver-oak-tranquil',
      title: 'Silver Oak Health EAP & Tranquil Mindfulness Platform',
      description: 'Built comprehensive Employee Assistance Program platform and developed iOS/Android Tranquil Mindfulness app from ideation to production.',
      longDescription: 'Developed a complete suite of mindfulness and Employee Assistance Program products for Silver Oak Health, providing a SaaS platform for businesses. Built the entire web application UX/UI, backend RESTful APIs, and the EAP platform from concept to production. Created and deployed the Tranquil Mindfulness mobile app for both iOS and Android platforms, featuring guided meditations, stress control programs, and wellbeing assessments.',
      technologies: ['React', 'Python', 'Django', 'iOS Swift', 'Android', 'RESTful APIs', 'SaaS Platform', 'Mobile Development'],
      imageUrl: '/projects/silver-oak-tranquil.jpg',
      projectUrl: 'https://web.silveroakhealth.com/app-and-portal',
      githubUrl: '',
      featured: false,
      category: 'web',
    }
  ],
  es: [
    {
      id: 'proofpoint-dsmp',
      title: 'Plataforma de Gestión de Postura de Seguridad de Datos Proofpoint',
      description: 'Construí plataforma DSPM integral con microservicios escalables y funciones AWS Lambda, mejorando la eficiencia del equipo en un 50% a través de optimización de flujos de trabajo.',
      longDescription: 'Como la segunda contratación para el equipo SaaS en Normalyze (ahora Proofpoint), arquitecté y desarrollé una plataforma integral de Gestión de Postura de Seguridad de Datos (DSPM). Construí marco de flujo de trabajo ad-hoc escalable, implementé microservicios de alta escala con funciones AWS Lambda, y creé pipelines de agregación de datos usando Snowflake DBT. Diseñé dashboards interactivos y componentes React reutilizables para visualización de datos.',
      technologies: ['React', 'Node.js', 'AWS Lambda', 'Snowflake', 'Python', 'Docker', 'PostgreSQL', 'Microservicios', 'DBT', 'Sequelize'],
      imageUrl: '/projects/proofpoint-dspm.jpg',
      projectUrl: 'https://www.proofpoint.com/us/normalyze-is-now-proofpoint',
      githubUrl: '',
      featured: true,
      category: 'web',
    },
    {
      id: 'webex-telehealth-epic',
      title: 'Conector de Telesalud Instantánea Webex para Epic EHR',
      description: 'Lideré el desarrollo de UI de solución de telesalud basada en WebRTC integrando videollamadas Webex directamente en el sistema Epic Electronic Health Records.',
      longDescription: 'Arquitecté y lideré el desarrollo completo de UI de una solución revolucionaria de telesalud que integra sin problemas las capacidades de videollamadas Webex en el sistema Epic EHR. Construí toda la plataforma web con tecnología WebRTC, permitiendo a proveedores de atención médica realizar consultas de video seguras y compatibles con HIPAA sin salir de su flujo de trabajo EHR. Contribuí funcionalidades core al Webex JS SDK y manejé autenticación, seguridad y token brokering.',
      technologies: ['WebRTC', 'Webex SDK', 'React', 'Node.js', 'Integración Epic', 'Cumplimiento HIPAA', 'TypeScript', 'Express.js'],
      imageUrl: '/projects/webex-epic.jpg',
      projectUrl: 'https://apphub.webex.com/applications/webex-telehealth-connector-for-epic',
      githubUrl: 'https://github.com/webex/webex-js-sdk',
      featured: true,
      category: 'web',
    },
    {
      id: 'cisco-sse-security',
      title: 'Plataforma Cisco Security Service Edge (SSE)',
      description: 'Lideré el desarrollo de configuraciones de Postura de Seguridad de Endpoints para Cisco SSE, construyendo micro-frontends modernos con 40% de mejora en velocidad de desarrollo.',
      longDescription: 'Lideré el desarrollo frontend de la plataforma Security Service Edge de Cisco, enfocándome en configuraciones de gestión de postura de seguridad de endpoints. Diseñé e implementé una biblioteca integral de componentes con componentes React extensibles y reutilizables, mejorando significativamente la eficiencia de desarrollo en múltiples equipos. Construí micro-frontends modernos que se integran sin problemas con Cisco Secure Service Edge Dashboard.',
      technologies: ['React', 'Redux', 'TypeScript', 'Microservicios', 'APIs Cisco', 'Biblioteca de Componentes', 'Panel de Seguridad'],
      imageUrl: '/projects/cisco-sse.jpg',
      projectUrl: 'https://www.cisco.com/site/in/en/solutions/security-service-edge-sse/index.html',
      githubUrl: '',
      featured: true,
      category: 'web',
    },
    {
      id: 'webex-integrations-hub',
      title: 'Integraciones Webex y App Hub',
      description: 'Construí múltiples integraciones Webex incluyendo conectores Bitmoji (Snapchat) y Eloqua, más marco de desarrollo reduciendo tiempo de construcción de sprints a 20 minutos.',
      longDescription: 'Lideré el desarrollo de varias integraciones Webex y contribuí al ecosistema App Hub. Construí integración directa de Bitmojis de Snapchat en apps nativas Webex, desarrollé Webex App para Oracle Eloqua Marketing Automation, y creé un marco de desarrollo que ganó el Premio CTO del Día de Innovación. El marco redujo el tiempo de desarrollo de integraciones de 1-2 sprints a solo 20 minutos.',
      technologies: ['React', 'Node.js', 'Webex SDK', 'OAuth', 'REST APIs', 'Marco de Integración', 'JavaScript ES6'],
      imageUrl: '/projects/webex-integrations.jpg',
      projectUrl: 'https://apphub.webex.com/integrations',
      githubUrl: '',
      featured: true,
      category: 'web',
    },
    {
      id: 'silver-oak-tranquil',
      title: 'Plataforma EAP Silver Oak Health y Tranquil Mindfulness',
      description: 'Construí plataforma integral de Programa de Asistencia al Empleado y desarrollé app Tranquil Mindfulness para iOS/Android desde ideación hasta producción.',
      longDescription: 'Desarrollé un conjunto completo de productos de mindfulness y Programa de Asistencia al Empleado para Silver Oak Health, proporcionando una plataforma SaaS para empresas. Construí toda la aplicación web UX/UI, APIs RESTful backend, y la plataforma EAP desde concepto hasta producción. Creé y desplegué la app móvil Tranquil Mindfulness para plataformas iOS y Android, con meditaciones guiadas, programas de control de estrés y evaluaciones de bienestar.',
      technologies: ['React', 'Python', 'Django', 'iOS Swift', 'Android', 'APIs RESTful', 'Plataforma SaaS', 'Desarrollo Móvil'],
      imageUrl: '/projects/silver-oak-tranquil.jpg',
      projectUrl: 'https://web.silveroakhealth.com/app-and-portal',
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