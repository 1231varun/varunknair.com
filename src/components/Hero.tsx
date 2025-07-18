import { motion } from 'framer-motion'
import { ArrowDown, Download, Eye } from 'lucide-react'
import { PersonalInfo, SocialLinks, ResumeInfo } from '@/types'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface HeroProps {
  personalInfo: PersonalInfo
  socialLinks: SocialLinks
  resumeInfo: ResumeInfo
}

const Hero = ({ personalInfo, socialLinks: _socialLinks, resumeInfo }: HeroProps) => {
  const { ref, controls } = useScrollAnimation()

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleResumeView = () => {
    if (resumeInfo.viewUrl && resumeInfo.viewUrl !== '#') {
      window.open(resumeInfo.viewUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleResumeDownload = () => {
    if (resumeInfo.downloadUrl && resumeInfo.downloadUrl !== '#') {
      const link = document.createElement('a')
      link.href = resumeInfo.downloadUrl
      link.download = `${personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
      ref={ref}
    >
      <div className="container-max-width section-padding">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            variants={itemVariants}
          >
            Hi, I'm{' '}
            <span className="text-gradient">
              {personalInfo.fullName}
            </span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-medium"
            variants={itemVariants}
          >
            {personalInfo.tagline}
          </motion.p>

          <motion.p
            className="text-lg text-gray-700 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {personalInfo.bio}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <motion.button
              onClick={handleResumeView}
              className="btn-primary flex items-center gap-2 px-8 py-3 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!resumeInfo.viewUrl || resumeInfo.viewUrl === '#'}
            >
              <Eye className="w-5 h-5" />
              View Resume
            </motion.button>

            <motion.button
              onClick={handleResumeDownload}
              className="btn-secondary flex items-center gap-2 px-8 py-3 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!resumeInfo.downloadUrl || resumeInfo.downloadUrl === '#'}
            >
              <Download className="w-5 h-5" />
              Download Resume
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-16"
            variants={itemVariants}
          >
            <motion.button
              onClick={scrollToAbout}
              className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              aria-label="Scroll to about section"
            >
              <ArrowDown className="w-6 h-6 mx-auto" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200 dark:bg-primary-900 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    </section>
  )
}

export default Hero 