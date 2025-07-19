import { motion } from 'framer-motion'
import { Calendar, MapPin, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Experience as ExperienceType } from '@/types'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface ExperienceProps {
  experience: ExperienceType[]
}

const Experience = ({ experience }: ExperienceProps) => {
  const { ref, controls, animationCapability } = useScrollAnimation({ threshold: 0.2 })
  const { t } = useTranslation()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  // Fallback render without animations for mobile Chrome and reduced motion
  const renderExperienceFallback = () => (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800/50" ref={ref}>
      <div className="container-max-width section-padding">
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t('experience.title')}</h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full" />
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              {t('experience.subtitle')}
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800" />

            <div className="space-y-12">
              {experience.map((job, index) => (
                <div
                  key={job.id}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-gray-900 z-10" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'} md:w-1/2`}>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg card-hover">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            {job.position}
                          </h3>
                          <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold mt-1">
                            <ExternalLink className="w-4 h-4" />
                            {job.company}
                          </div>
                        </div>
                        {job.current && (
                          <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                            {t('experience.current')}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {job.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {job.description.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                          {t('experience.technologies')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {job.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  // Use fallback only if animations aren't supported (reduced motion)
  if (animationCapability === 'none') {
    return renderExperienceFallback()
  }

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800/50 no-overflow" ref={ref}>
      <div className="container-max-width section-padding mobile-safe">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t('experience.title')}</h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full" />
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              {t('experience.subtitle')}
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800" />

            <div className="space-y-12">
              {experience.map((job, index) => (
                <motion.div
                  key={job.id}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  variants={itemVariants}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-gray-900 z-10" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'} md:w-1/2`}>
                    <motion.div
                      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg card-hover"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            {job.position}
                          </h3>
                          <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold mt-1">
                            <ExternalLink className="w-4 h-4" />
                            {job.company}
                          </div>
                        </div>
                        {job.current && (
                          <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                            {t('experience.current')}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {job.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {job.description.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                          {t('experience.technologies')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {job.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
export { Experience as Experience } 