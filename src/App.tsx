import { useEffect } from 'react'
import { useTheme } from '@/hooks/useTheme'
// Import personal configuration directly
import { 
  personalInfo, 
  socialLinks, 
  resumeInfo, 
  experience, 
  education,
  professionalProjects,
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

  // Initialize analytics
  useEffect(() => {
    analytics.configure(analyticsConfig)
  }, [])

  // Create a config object from personal data
  const appConfig = {
    personalInfo,
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
      
      // Backend
      { name: 'Node.js', level: 95, category: 'backend' as const },
      { name: 'Express.js', level: 92, category: 'backend' as const },
      { name: 'NestJS', level: 85, category: 'backend' as const },
      { name: 'Python', level: 85, category: 'backend' as const },
      { name: 'FastAPI', level: 80, category: 'backend' as const },
      { name: 'REST APIs', level: 95, category: 'backend' as const },
      { name: 'Microservices', level: 90, category: 'backend' as const },
      { name: 'WebRTC', level: 85, category: 'backend' as const },
      { name: 'WebSockets', level: 88, category: 'backend' as const },
      
      // Database
      { name: 'PostgreSQL', level: 88, category: 'database' as const },
      { name: 'MongoDB', level: 85, category: 'database' as const },
      { name: 'MySQL', level: 85, category: 'database' as const },
      { name: 'Snowflake', level: 82, category: 'database' as const },
      
      // DevOps & Cloud
      { name: 'AWS', level: 88, category: 'devops' as const },
      { name: 'Docker', level: 90, category: 'devops' as const },
      { name: 'Google Cloud', level: 78, category: 'devops' as const },
      { name: 'Azure', level: 75, category: 'devops' as const },
      { name: 'AWS Lambda', level: 85, category: 'devops' as const },
      { name: 'CI/CD', level: 82, category: 'devops' as const },
      
      // Tools & Testing
      { name: 'Jest', level: 90, category: 'tools' as const },
      { name: 'React Testing Library', level: 88, category: 'tools' as const },
      { name: 'Mocha', level: 85, category: 'tools' as const },
      { name: 'Chai', level: 85, category: 'tools' as const },
      { name: 'PyTest', level: 80, category: 'tools' as const },
      { name: 'Git', level: 95, category: 'tools' as const },
      { name: 'System Design', level: 90, category: 'tools' as const },
      { name: 'Agile Leadership', level: 92, category: 'tools' as const },
    ],
    features: {
      enableAnimations: true,
      enableDarkMode: true,
      enableContactForm: true,
    },
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme}
        personalInfo={personalInfo}
        socialLinks={socialLinks}
      />
      <main>
        <Hero personalInfo={personalInfo} socialLinks={socialLinks} resumeInfo={resumeInfo} />
        <About personalInfo={personalInfo} socialLinks={socialLinks} />
        <Skills skills={appConfig.skills} />
        <Experience experience={experience} />
        <ProfessionalProjects projects={professionalProjects} />
        <GitHubRepositories 
          githubUrl={socialLinks.github} 
          featuredRepos={[]} 
        />
        {appConfig.features.enableContactForm && (
          <Contact personalInfo={personalInfo} />
        )}
      </main>
      <Footer personalInfo={personalInfo} socialLinks={socialLinks} />
    </div>
  )
}

export default App 