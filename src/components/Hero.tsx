import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Eye } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PersonalInfo, SocialLinks, ResumeInfo } from '@/types'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import ResumePreview from './ResumePreview'

interface HeroProps {
  personalInfo: PersonalInfo
  socialLinks: SocialLinks
  resumeInfo: ResumeInfo
}

const Hero = ({ personalInfo, socialLinks: _socialLinks, resumeInfo }: HeroProps) => {
  const { t } = useTranslation()
  const { ref, controls } = useScrollAnimation()
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false)
  const { animationCapability } = useScrollAnimation({ threshold: 0.2 })

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleResumeView = () => {
    setIsResumePreviewOpen(true)
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

  // Use fallback only if animations aren't supported (reduced motion)
  if (animationCapability === 'none') {
    return (
      <>
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20"
          ref={ref}
        >
          <div className="container-max-width section-padding">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4 sm:px-0">
                <span className="block text-lg sm:text-xl md:text-2xl font-normal text-gray-600 dark:text-gray-400 mb-2">
                  {t('hero.greeting')}
                </span>
                <span className="text-gradient">
                  {personalInfo.fullName}
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 font-medium px-4 sm:px-0">
                {personalInfo.tagline}
              </p>

              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
                {personalInfo.bio}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={handleResumeView}
                  className="btn-primary flex items-center gap-2 px-8 py-3 text-lg"
                  disabled={!resumeInfo.viewUrl || resumeInfo.viewUrl === '#'}
                >
                  <Eye className="w-5 h-5" />
                  {t('about.viewResume')}
                </button>

                <button
                  onClick={handleResumeDownload}
                  className="btn-secondary flex items-center gap-2 px-8 py-3 text-lg"
                  disabled={!resumeInfo.downloadUrl || resumeInfo.downloadUrl === '#'}
                >
                  <Download className="w-5 h-5" />
                  {t('about.downloadResume')}
                </button>
              </div>

              <div className="mt-16">
                <button
                  onClick={scrollToAbout}
                  className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  aria-label="Scroll to about section"
                >
                  <ArrowDown className="w-6 h-6 mx-auto" />
                </button>
              </div>
            </div>
          </div>

          {/* Background Elements - simplified for fallback */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200 dark:bg-primary-900 rounded-full opacity-20 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20 blur-3xl" />
          </div>
        </section>

        {/* Resume Preview Modal */}
        <ResumePreview
          isOpen={isResumePreviewOpen}
          onClose={() => setIsResumePreviewOpen(false)}
          resumeInfo={resumeInfo}
          personalInfo={personalInfo}
        />
      </>
    )
  }

  return (
    <>
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20"
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4 sm:px-0"
              variants={itemVariants}
            >
              <span className="block text-lg sm:text-xl md:text-2xl font-normal text-gray-600 dark:text-gray-400 mb-2">
                {t('hero.greeting')}
              </span>
              <span className="text-gradient">
                {personalInfo.fullName}
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 font-medium px-4 sm:px-0"
              variants={itemVariants}
            >
              {personalInfo.tagline}
            </motion.p>

            <motion.p
              className="text-base sm:text-lg text-gray-700 dark:text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0"
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
                {t('about.viewResume')}
              </motion.button>

              <motion.button
                onClick={handleResumeDownload}
                className="btn-secondary flex items-center gap-2 px-8 py-3 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!resumeInfo.downloadUrl || resumeInfo.downloadUrl === '#'}
              >
                <Download className="w-5 h-5" />
                {t('about.downloadResume')}
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

      {/* Resume Preview Modal */}
      <ResumePreview
        isOpen={isResumePreviewOpen}
        onClose={() => setIsResumePreviewOpen(false)}
        resumeInfo={resumeInfo}
        personalInfo={personalInfo}
      />
    </>
  )
}

export default Hero 