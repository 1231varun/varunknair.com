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
  de: 'Ergebnisorientierter Senior Software Engineer mit fast 9 Jahren Erfahrung in der Entwicklung und Optimierung skalierbarer, hochperformanter Anwendungen mit JavaScript, React, Node.js, Python und cloud-nativen Technologien. Nachgewiesene Expertise in der Leitung von End-to-End-Projekten, Team-Mentoring und der Verbesserung von Entwicklungsprozessen zur Lieferung wirkungsvoller Lösungen.',
}

// Tagline data that changes with language  
const taglineData: Record<string, string> = {
  en: 'Senior Software Engineer | 9+ Years Building Scalable Applications',
  es: 'Ingeniero de Software Senior | 9+ Años Construyendo Aplicaciones Escalables',
  de: 'Senior Software Engineer | 9+ Jahre Entwicklung Skalierbarer Anwendungen',
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
        'Enhanced workflow efficiency through redesign and transition to Temporal from Orkes Conductor',
        'Led development of unified, reusable workflow from existing processes',
        'Achieved 50% team efficiency improvement by reducing integration timelines from 8 weeks to 4 weeks',
      ],
      technologies: ['Temporal', 'Orkes Conductor', 'Node.js', 'Python', 'Microservices', 'AWS', 'Azure'],
      current: true,
    },
    {
      id: 'normalyze',
      company: 'Normalyze.ai (Acquired by Proofpoint)',
      position: 'Senior Full Stack Engineer',
      duration: '10/2023 - 11/2024',
      location: 'Bengaluru, India',
      description: [
        'Designed scalable ad-hoc job workflow framework for diverse data workflows integration',
        'Built high-scale microservices and AWS Lambda functions for DSPM tools performance',
        'Led SaaS onboarding flow development and backend APIs',
        'Developed DataScan Overview page with Snowflake DBT for data aggregation',
        'Second hire for SaaS team, contributing to core DSPM platform architecture',
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
        'Led UI Development for Cisco Security Business Group (Umbrella/SSE) endpoint security',
        'Designed reusable React components increasing development velocity by 40%',
        'Built micro-frontends integrating with Cisco Secure Service Edge Dashboard',
        'Led Webex Instant Telehealth Connector for Epic EHR using WebRTC',
        'Won Innovation Day CTO Award for integration framework (reduced dev time from sprints to 20 min)',
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
        'Designed applications for 42Hertz customers and stakeholder communication',
        'Enhanced Rapid Sign Now with payment gateway integration and automated invoicing',
        'Built MVPs and demonstrated proof of concepts to clients',
        'Contributed to Cisco Webex Admin Controls Platform (Control Hub)',
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
        'Built mindfulness and EAP products SaaS platform for businesses',
        'Developed web application UX/UI and Backend RESTful APIs',
        'Created EAP platform from ideation to production',
        'Developed and deployed iOS/Android Tranquil Mindfulness App',
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
        'Mejoré eficiencia del flujo de trabajo mediante rediseño y transición a Temporal desde Orkes Conductor',
        'Lideré desarrollo de flujo de trabajo unificado y reutilizable desde procesos existentes',
        'Logré 50% mejora en eficiencia del equipo reduciendo tiempos de integración de 8 a 4 semanas',
      ],
      technologies: ['Temporal', 'Orkes Conductor', 'Node.js', 'Python', 'Microservicios', 'AWS', 'Azure'],
      current: true,
    },
    {
      id: 'normalyze',
      company: 'Normalyze.ai (Adquirida por Proofpoint)',
      position: 'Ingeniero Full Stack Senior',
      duration: '10/2023 - 11/2024',
      location: 'Bengaluru, India',
      description: [
        'Diseñé marco de flujo de trabajo ad-hoc escalable para integración de diversos flujos de datos',
        'Construí microservicios de alta escala y funciones AWS Lambda para rendimiento de herramientas DSPM',
        'Lideré desarrollo de flujo de incorporación SaaS y APIs backend',
        'Desarrollé página DataScan Overview con Snowflake DBT para agregación de datos',
        'Segunda contratación para equipo SaaS, contribuyendo a arquitectura central de plataforma DSPM',
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
        'Lideré desarrollo de UI para Cisco Security Business Group (Umbrella/SSE) seguridad de endpoints',
        'Diseñé componentes React reutilizables aumentando velocidad de desarrollo en 40%',
        'Construí micro-frontends integrando con Cisco Secure Service Edge Dashboard',
        'Lideré Conector de Telesalud Instantánea Webex para Epic EHR usando WebRTC',
        'Gané Premio CTO Día de Innovación por marco de integración (redujo tiempo dev de sprints a 20 min)',
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
        'Diseñé aplicaciones para clientes 42Hertz y comunicación con stakeholders',
        'Mejoré Rapid Sign Now con integración de pasarela de pagos y facturación automatizada',
        'Construí MVPs y demostré pruebas de concepto a clientes',
        'Contribuí a Plataforma de Controles de Administración Cisco Webex (Control Hub)',
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
        'Construí plataforma SaaS de productos mindfulness y EAP para empresas',
        'Desarrollé aplicación web UX/UI y APIs RESTful backend',
        'Creé plataforma EAP desde ideación hasta producción',
        'Desarrollé y desplegué App Tranquil Mindfulness para iOS/Android',
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Python', 'Android', 'iOS Swift', 'PHP'],
      current: false,
    }
  ],
  de: [
    {
      id: 'proofpoint',
      company: 'Proofpoint (Durch Normalyze-Übernahme)',
      position: 'Senior Software Engineer',
      duration: '11/2024 - Gegenwärtig',
      location: 'Bangalore, Indien',
      description: [
        'Workflow-Effizienz durch Neudesign und Übergang zu Temporal von Orkes Conductor',
        'Entwicklung eines einheitlichen, wiederverwendbaren Workflows aus bestehenden Prozessen',
        'Erreichte 50%ige Verbesserung der Team-Effizienz durch Reduzierung der Integrationstermine von 8 Wochen auf 4 Wochen',
      ],
      technologies: ['Temporal', 'Orkes Conductor', 'Node.js', 'Python', 'Microservices', 'AWS', 'Azure'],
      current: true,
    },
    {
      id: 'normalyze',
      company: 'Normalyze.ai (Durch Proofpoint erworben)',
      position: 'Senior Full Stack Engineer',
      duration: '10/2023 - 11/2024',
      location: 'Bengaluru, Indien',
      description: [
        'Entwurf eines skalierbaren Ad-hoc-Job-Workflow-Frameworks für die Integration unterschiedlicher Datenflüsse',
        'Aufbau hochskalierbarer Microservices und AWS Lambda-Funktionen für die Leistung von DSPM-Tools',
        'Leitung des SaaS-Onboarding-Flusses und Backend-APIs',
        'Entwicklung der DataScan-Übersichtsseite mit Snowflake DBT für die Datenaggregation',
        'Zweite Beschäftigung für das SaaS-Team, das zum Kern der DSPM-Plattformarchitektur beiträgt',
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
        'Leitung der UI-Entwicklung für die Cisco Security Business Group (Umbrella/SSE) Endpunktsicherheit',
        'Entwurf wiederverwendbarer React-Komponenten, die die Entwicklungsgeschwindigkeit um 40% erhöhen',
        'Aufbau von Micro-Frontends, die mit dem Cisco Secure Service Edge Dashboard integriert sind',
        'Leitung des Webex Instant Telehealth-Connectors für Epic EHR mit WebRTC',
        'Gewonnen CTO-Innovationspreis für das Integration-Framework (Verringerung der Entwicklungszeit von Sprints auf 20 Minuten)',
      ],
      technologies: ['React', 'Redux', 'Node.js', 'WebRTC', 'Microservices', 'TypeScript', 'Python', 'Angular', 'Express.js'],
      current: false,
    },
    {
      id: 'hertz',
      company: '42Hertz (Durch Cisco erworben)',
      position: 'Softwareentwickler',
      duration: '12/2017 - 08/2019',
      location: 'Bengaluru, Karnataka',
      description: [
        'Entwurf von Anwendungen für 42Hertz-Kunden und Stakeholder-Kommunikation',
        'Verbesserung von Rapid Sign Now mit Zahlungsgateway-Integration und automatischer Abrechnung',
        'Aufbau von MVPs und Demonstration von Konzepten von Kunden',
        'Beitrag zum Cisco Webex Admin-Steuerungsportal (Control Hub)',
      ],
      technologies: ['React', 'Redux', 'Node.js', 'Express.js', 'Python', 'Django', 'MongoDB', 'MySQL', 'Ruby on Rails'],
      current: false,
    },
    {
      id: 'silver-oak',
      company: 'Silver Oak Health',
      position: 'Produktentwickler',
      duration: '06/2016 - 12/2017',
      location: 'Bengaluru, Karnataka',
      description: [
        'Aufbau einer SaaS-Plattform für mindfulness- und EAP-Produkte für Unternehmen',
        'Entwicklung von Webanwendungen UX/UI und Backend-RESTful-APIs',
        'Erstellung einer EAP-Plattform vom Ideations- bis zum Produktionsprozess',
        'Entwicklung und Bereitstellung der iOS/Android-Tranquil-Mindfulness-App',
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
  de: [
    {
      id: 'proofpoint-dsmp',
      title: 'Proofpoint Data Security Posture Management Platform',
      description: 'Entwickelte umfassende DSPM-Plattform mit skalierbaren Microservices und AWS Lambda-Funktionen, verbesserte Teameffizienz um 50% durch Workflow-Optimierung.',
      longDescription: 'Als zweite Einstellung für das SaaS-Team bei Normalyze (jetzt Proofpoint) konzipierte und entwickelte ich eine umfassende Data Security Posture Management (DSMP) Plattform. Erstellte skalierbare Ad-hoc-Job-Workflow-Framework, implementierte hochskalierbare Microservices mit AWS Lambda-Funktionen und schuf Datenaggregations-Pipelines mit Snowflake DBT. Entwarf interaktive Dashboards und wiederverwendbare React-Komponenten für Datenvisualisierung.',
      technologies: ['React', 'Node.js', 'AWS Lambda', 'Snowflake', 'Python', 'Docker', 'PostgreSQL', 'Microservices', 'DBT', 'Sequelize'],
      imageUrl: '/projects/proofpoint-dspm.jpg',
      projectUrl: 'https://www.proofpoint.com/us/normalyze-is-now-proofpoint',
      githubUrl: '',
      featured: true,
      category: 'web',
    },
    {
      id: 'webex-telehealth-epic',
      title: 'Webex Instant Telehealth Connector für Epic EHR',
      description: 'Leitete UI-Entwicklung einer WebRTC-basierten Telehealth-Lösung, die Webex-Videoanrufe direkt in das Epic Electronic Health Records System integriert.',
      longDescription: 'Konzipierte und leitete die komplette UI-Entwicklung einer bahnbrechenden Telehealth-Lösung, die nahtlos Webex-Videoanruf-Funktionen in das Epic EHR-System integriert. Entwickelte die gesamte Web-Plattform mit WebRTC-Technologie, ermöglichte Gesundheitsdienstleistern sichere, HIPAA-konforme Videokonsultationen ohne ihr EHR-Workflow zu verlassen. Trug Kernfunktionalitäten zum Webex JS SDK bei und kümmerte sich um Authentifizierung, Sicherheit und Token-Brokering.',
      technologies: ['WebRTC', 'Webex SDK', 'React', 'Node.js', 'Epic Integration', 'HIPAA Compliance', 'TypeScript', 'Express.js'],
      imageUrl: '/projects/webex-epic.jpg',
      projectUrl: 'https://apphub.webex.com/applications/webex-telehealth-connector-for-epic',
      githubUrl: 'https://github.com/webex/webex-js-sdk',
      featured: true,
      category: 'web',
    },
    {
      id: 'cisco-sse-security',
      title: 'Cisco Security Service Edge (SSE) Plattform',
      description: 'Leitete Entwicklung von Endpoint Security Posture Konfigurationen für Cisco SSE, entwickelte moderne Micro-Frontends mit 40% verbesserter Entwicklungsgeschwindigkeit.',
      longDescription: 'Leitete die Frontend-Entwicklung von Ciscos Security Service Edge Plattform mit Fokus auf Endpoint Security Posture Management Konfigurationen. Entwarf und implementierte eine umfassende Komponentenbibliothek mit erweiterbaren und wiederverwendbaren React-Komponenten, verbesserte signifikant die Entwicklungseffizienz über mehrere Teams hinweg. Entwickelte moderne Micro-Frontends, die nahtlos mit dem Cisco Secure Service Edge Dashboard integrieren.',
      technologies: ['React', 'Redux', 'TypeScript', 'Microservices', 'Cisco APIs', 'Komponentenbibliothek', 'Security Dashboard'],
      imageUrl: '/projects/cisco-sse.jpg',
      projectUrl: 'https://www.cisco.com/site/in/en/solutions/security-service-edge-sse/index.html',
      githubUrl: '',
      featured: true,
      category: 'web',
    },
    {
      id: 'webex-integrations-hub',
      title: 'Webex Integrationen & App Hub',
      description: 'Entwickelte mehrere Webex-Integrationen einschließlich Bitmoji (Snapchat) und Eloqua-Konnektoren, plus Entwicklungsframework das Build-Zeit von Sprints auf 20 Minuten reduzierte.',
      longDescription: 'Leitete Entwicklung verschiedener Webex-Integrationen und trug zum App Hub Ökosystem bei. Entwickelte direkte Integration von Bitmojis von Snapchat in native Webex-Apps, entwickelte Webex App für Oracle Eloqua Marketing Automation und schuf ein Entwicklungsframework, das den Innovation Day CTO Award gewann. Das Framework reduzierte Integrations-Entwicklungszeit von 1-2 Sprints auf nur 20 Minuten.',
      technologies: ['React', 'Node.js', 'Webex SDK', 'OAuth', 'REST APIs', 'Integrations-Framework', 'JavaScript ES6'],
      imageUrl: '/projects/webex-integrations.jpg',
      projectUrl: 'https://apphub.webex.com/integrations',
      githubUrl: '',
      featured: true,
      category: 'web',
    },
    {
      id: 'silver-oak-tranquil',
      title: 'Silver Oak Health EAP & Tranquil Mindfulness Plattform',
      description: 'Entwickelte umfassende Employee Assistance Program Plattform und entwickelte iOS/Android Tranquil Mindfulness App von der Ideenfindung bis zur Produktion.',
      longDescription: 'Entwickelte eine komplette Suite von Mindfulness- und Employee Assistance Program-Produkten für Silver Oak Health, stellte eine SaaS-Plattform für Unternehmen bereit. Entwickelte die gesamte Webanwendung UX/UI, Backend RESTful APIs und die EAP-Plattform vom Konzept bis zur Produktion. Erstellte und deployierte die Tranquil Mindfulness Mobile App für iOS und Android Plattformen mit geführten Meditationen, Stresskontrollprogrammen und Wohlbefindens-Bewertungen.',
      technologies: ['React', 'Python', 'Django', 'iOS Swift', 'Android', 'RESTful APIs', 'SaaS Plattform', 'Mobile Entwicklung'],
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