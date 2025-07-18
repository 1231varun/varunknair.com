import { useEffect } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { useLanguageAwareData } from '@/hooks/useLanguageAwareData'
// Import personal configuration directly
import { 
  socialLinks, 
  resumeInfo, 
  education,
  analyticsConfig 
} from '@/config/personal'
import { analytics } from '@/utils/analytics'

// Import the new components
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import ProfessionalProjects from '@/components/ProfessionalProjects'
import GitHubRepositories from '@/components/GitHubRepositories'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

function App() {
  const { theme, toggleTheme } = useTheme()
  const { experience, professionalProjects, personalInfo: languageAwarePersonalInfo } = useLanguageAwareData()

  // Initialize analytics
  useEffect(() => {
    analytics.configure(analyticsConfig)
  }, [])

  // Create a config object from personal data
  const appConfig = {
    personalInfo: languageAwarePersonalInfo,
    socialLinks,
    resumeInfo,
    experience,
    education,
    skills: [
      // Frontend
      { name: 'React', level: 95, category: 'frontend' as const },
      { name: 'Redux', level: 92, category: 'frontend' as const },
      { name: 'JavaScript ES6+', level: 95, category: 'frontend' as const },
      { name: 'HTML5', level: 95, category: 'frontend' as const },
      { name: 'CSS3', level: 95, category: 'frontend' as const },
      { name: 'Angular', level: 80, category: 'frontend' as const },
      { name: 'TypeScript', level: 88, category: 'frontend' as const },
      { name: 'React Hooks', level: 95, category: 'frontend' as const },
      { name: 'Redux Toolkit', level: 90, category: 'frontend' as const },
      { name: 'Tailwind CSS', level: 92, category: 'frontend' as const },
      { name: 'Sass/SCSS', level: 88, category: 'frontend' as const },

      // Backend
      { name: 'Node.js', level: 92, category: 'backend' as const },
      { name: 'Express.js', level: 90, category: 'backend' as const },
      { name: 'Python', level: 85, category: 'backend' as const },
      { name: 'Django', level: 80, category: 'backend' as const },
      { name: 'REST APIs', level: 95, category: 'backend' as const },
      { name: 'GraphQL', level: 75, category: 'backend' as const },
      { name: 'WebRTC', level: 85, category: 'backend' as const },
      { name: 'Microservices', level: 88, category: 'backend' as const },

      // Database
      { name: 'PostgreSQL', level: 88, category: 'database' as const },
      { name: 'MySQL', level: 85, category: 'database' as const },
      { name: 'MongoDB', level: 82, category: 'database' as const },
      { name: 'Redis', level: 78, category: 'database' as const },
      { name: 'Snowflake', level: 75, category: 'database' as const },

      // Tools & Others
      { name: 'Docker', level: 85, category: 'tools' as const },
      { name: 'AWS', level: 82, category: 'tools' as const },
      { name: 'Git', level: 95, category: 'tools' as const },
      { name: 'CI/CD', level: 80, category: 'tools' as const },
      { name: 'Webpack', level: 82, category: 'tools' as const },
      { name: 'Vite', level: 88, category: 'tools' as const },
      { name: 'Jest', level: 85, category: 'tools' as const },
      { name: 'Cypress', level: 78, category: 'tools' as const },
    ],
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header 
        theme={theme}
        toggleTheme={toggleTheme}
        personalInfo={appConfig.personalInfo}
        socialLinks={appConfig.socialLinks}
      />
      
      <main>
        <Hero 
          personalInfo={appConfig.personalInfo}
          socialLinks={appConfig.socialLinks}
          resumeInfo={appConfig.resumeInfo}
        />
        <About 
          personalInfo={appConfig.personalInfo}
          socialLinks={appConfig.socialLinks}
        />
        <Skills skills={appConfig.skills} />
        <Experience experience={experience} />
        <ProfessionalProjects projects={professionalProjects} />
        <GitHubRepositories githubUrl={socialLinks.github} />
        <Contact personalInfo={appConfig.personalInfo} />
      </main>
      
      <Footer 
        personalInfo={appConfig.personalInfo}
        socialLinks={appConfig.socialLinks}
      />
    </div>
  )
}

export default App 