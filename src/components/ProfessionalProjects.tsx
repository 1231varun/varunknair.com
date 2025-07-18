import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ChevronDown, ChevronUp, Briefcase } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Project } from '@/types'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface ProfessionalProjectsProps {
  projects: Project[]
  initialShowCount?: number
}

const ProfessionalProjects = ({ projects, initialShowCount = 3 }: ProfessionalProjectsProps) => {
  const { ref, controls } = useScrollAnimation({ threshold: 0.2 })
  const { t } = useTranslation()
  const [showAll, setShowAll] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Filter and sort projects - show featured first, then others
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })

  const displayedProjects = showAll ? sortedProjects : sortedProjects.slice(0, initialShowCount)



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  if (projects.length === 0) return null

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900" ref={ref}>
      <div className="container-max-width section-padding">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
                          <div className="flex items-center justify-center gap-3 mb-4">
                <Briefcase className="w-8 h-8 text-primary-600" />
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">{t('projects.title')}</h2>
              </div>
            <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full" />
                          <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
                {t('projects.subtitle')}
              </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProjects.map((project, _) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="group bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg card-hover cursor-pointer"
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary-400 to-blue-600 overflow-hidden">
                    <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400 font-medium text-center p-4">
                        {project.title}
                      </span>
                    </div>
                    
                    {/* Company badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 dark:bg-gray-900/90 px-2 py-1 rounded text-xs font-medium text-gray-700 dark:text-gray-300">
                        {t('projects.professional')}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium">{t('projects.viewDetails')}</span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-sm font-medium">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {project.projectUrl && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 btn-primary text-center text-sm py-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4 inline mr-1" />
                          {t('projects.view')}
                        </a>
                      )}
                      
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 btn-secondary text-center text-sm py-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-4 h-4 inline mr-1" />
                          {t('projects.code')}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

                  {/* Show More/Less Button */}
        {sortedProjects.length > initialShowCount && (
            <motion.div
              className="text-center mt-12"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => setShowAll(!showAll)}
                className="btn-secondary px-8 py-3 flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showAll ? (
                  <>
                    <ChevronUp className="w-5 h-5" />
                    {t('projects.showLess')}
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-5 h-5" />
                    {t('projects.showMoreProjects')} ({sortedProjects.length - initialShowCount} {t('projects.more')})
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {selectedProject.title}
                </h3>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      {t('projects.technologiesUsed')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      {t('projects.category')}
                    </h4>
                    <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium capitalize">
                      {selectedProject.category}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  {selectedProject.projectUrl && (
                    <a
                      href={selectedProject.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center gap-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      {t('projects.viewProject')}
                    </a>
                  )}
                  
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center gap-2"
                    >
                      <Github className="w-5 h-5" />
                      {t('projects.sourceCode')}
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="btn-secondary"
                  >
                    {t('projects.close')}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ProfessionalProjects 