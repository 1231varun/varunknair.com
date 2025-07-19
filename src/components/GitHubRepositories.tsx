import { useMemo, useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Star, GitFork, ExternalLink, Eye } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useGitHubProjects } from '@/hooks/useGitHubProjects'

interface GitHubRepositoriesProps {
  githubUrl?: string
  maxRepos?: number
  featuredRepos?: string[]
  className?: string
}

const GitHubRepositories = ({ 
  githubUrl, 
  maxRepos = 3, 
  featuredRepos = [],
  className = '' 
}: GitHubRepositoriesProps) => {
  const { t } = useTranslation()
  const componentRef = useRef(null)
  const isInView = useInView(componentRef, { once: true, amount: 0.2 })
  const { controls, animationCapability } = useScrollAnimation({ threshold: 0.2 })
  const [showFallback, setShowFallback] = useState(false)

  // Add this useEffect to handle initial visibility
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  // Early return check
  if (!githubUrl) {
    return null
  }

  // Properly memoize arrays to prevent re-renders
  const stableFeaturedRepos = useMemo(() => featuredRepos, [JSON.stringify(featuredRepos)])
  const stableManualProjects = useMemo(() => [], [])

  // Memoize the options with stable dependencies
  const githubOptions = useMemo(() => ({
    manualProjects: stableManualProjects,
    githubUrl,
    maxGitHubProjects: maxRepos,
    featuredRepos: stableFeaturedRepos,
    enableGitHubIntegration: !!githubUrl,
  }), [githubUrl, maxRepos, stableFeaturedRepos, stableManualProjects])

  const { projects: githubProjects, isLoading, error, retry, retryCount, hasAttempted } = useGitHubProjects(githubOptions)

  // Fallback timeout to prevent infinite loading
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        setShowFallback(true)
      }, 45000) // 45 seconds - longer than the hook's 30s timeout

      return () => {
        clearTimeout(timeout)
        setShowFallback(false)
      }
    } else {
      setShowFallback(false)
    }
  }, [isLoading])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  }

  // Extract GitHub username for link
  const getGitHubUsername = (url: string): string | null => {
    const match = url.match(/github\.com\/([^\/]+)/)
    return match ? match[1] : null
  }

  const githubUsername = githubUrl ? getGitHubUsername(githubUrl) : null

  // Determine what content to show
  const shouldShowLoading = isLoading && !showFallback
  const shouldShowFallback = showFallback
  const shouldShowError = error && !isLoading && hasAttempted && !showFallback
  const shouldShowRepos = !isLoading && !error && !showFallback && githubProjects.length > 0
  const shouldShowEmpty = !isLoading && !error && !showFallback && githubProjects.length === 0 && hasAttempted
  const shouldShowInitializing = !isLoading && !error && !showFallback && githubProjects.length === 0 && !hasAttempted

  // Use fallback only if animations aren't supported (reduced motion)
  if (animationCapability === 'none') {
    // Create a simplified non-animated version of this component
    return (
      <section id="github-repositories" className={`py-20 bg-gray-50 dark:bg-gray-800/50 ${className}`} ref={componentRef}>
        <div className="container-max-width section-padding">
          <div>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Github className="w-8 h-8 text-primary-600" />
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">{t('github.title')}</h2>
              </div>
              <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full" />
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
                {t('github.subtitle')}
              </p>
            </div>

            {/* Show appropriate content based on state */}
            {shouldShowLoading && (
              <div className="text-center py-16">
                <div className="inline-flex flex-col items-center gap-4 text-gray-600 dark:text-gray-400">
                  <div className="w-8 h-8 border-3 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                  <div className="text-center">
                    <p className="text-lg font-medium">{t('github.loading')}</p>
                  </div>
                </div>
              </div>
            )}

            {shouldShowRepos && githubProjects.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {githubProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg card-hover"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                        {project.title}
                      </h3>
                      <div className="flex gap-2 ml-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {project.description}
                    </p>

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
                        <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-sm">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(shouldShowEmpty || shouldShowError || shouldShowFallback) && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <Github className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {shouldShowError ? t('github.error') : t('github.noRepositories')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {shouldShowError ? error : t('github.noRepositoriesDescription')}
                  </p>
                  
                  {(shouldShowError || shouldShowFallback) && (
                    <button
                      onClick={retry}
                      className="btn-primary px-6 py-2 inline-flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      {t('github.tryAgain')}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section 
      id="github-repositories" 
      className={`py-20 bg-gray-50 dark:bg-gray-800/50 ${className}`} 
      ref={componentRef}
    >
      <div className="container-max-width section-padding">
        <motion.div
          variants={containerVariants}
          initial={isInView ? "visible" : "hidden"}
          animate={controls}
        >
          {/* Header - Always show */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Github className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">{t('github.title')}</h2>
            </div>
            <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full" />
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              {t('github.subtitle')}
            </p>
          </motion.div>

          {/* Content - Always render one of these states */}
          {shouldShowLoading && (
            <motion.div 
              className="text-center py-16"
              variants={itemVariants}
            >
              <div className="inline-flex flex-col items-center gap-4 text-gray-600 dark:text-gray-400">
                <div className="w-8 h-8 border-3 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-center">
                  <p className="text-lg font-medium">{t('github.loading')}</p>
                  {retryCount > 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      Retry attempt {retryCount}/2...
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {shouldShowFallback && (
            <motion.div 
              className="text-center py-12"
              variants={itemVariants}
            >
              <div className="max-w-md mx-auto">
                <Github className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t('github.unableToLoad')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {t('github.loadingTimeout')}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={retry}
                    className="btn-primary px-6 py-2 inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {t('github.tryAgain')}
                  </button>
                  
                  {githubUsername && (
                    <a
                      href={`https://github.com/${githubUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary px-6 py-2 inline-flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      {t('github.viewProfile')}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {shouldShowError && (
            <motion.div 
              className="text-center py-12"
              variants={itemVariants}
            >
              <div className="max-w-md mx-auto">
                <Github className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t('github.unableToLoad')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {error}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={retry}
                    className="btn-primary px-6 py-2 inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {t('github.tryAgain')}
                  </button>
                  
                  {githubUsername && (
                    <a
                      href={`https://github.com/${githubUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary px-6 py-2 inline-flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      {t('github.viewProfile')}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {shouldShowRepos && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {githubProjects.slice(0, maxRepos).map((repo) => (
                  <motion.div
                    key={repo.id}
                    variants={cardVariants}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg card-hover group flex flex-col h-full"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                        {repo.title}
                      </h3>
                      <Github className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
                      {repo.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {repo.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded text-xs">
                          +{repo.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Repository Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{t('github.stats.stars')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        <span>{t('github.stats.forks')}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {repo.githubUrl && (
                        <a
                          href={repo.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 btn-primary text-center text-sm py-2 flex items-center justify-center gap-1"
                        >
                          <Github className="w-4 h-4" />
                          {t('github.actions.code')}
                        </a>
                      )}
                      
                      {repo.projectUrl && (
                        <a
                          href={repo.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 btn-secondary text-center text-sm py-2 flex items-center justify-center gap-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {t('github.actions.demo')}
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* View More on GitHub Button */}
              <motion.div 
                className="text-center mt-12"
                variants={itemVariants}
              >
                {githubUsername && (
                  <a
                    href={`https://github.com/${githubUsername}?tab=repositories`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary px-8 py-3 inline-flex items-center gap-2"
                  >
                    <Eye className="w-5 h-5" />
                    {t('github.viewAll')}
                  </a>
                )}
              </motion.div>
            </>
          )}

          {shouldShowEmpty && (
            <motion.div 
              className="text-center py-12"
              variants={itemVariants}
            >
              <Github className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {t('github.noRepos')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('github.noReposDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={retry}
                  className="btn-secondary px-6 py-2 inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {t('github.refresh')}
                </button>
                <a
                  href={`https://github.com/${githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  {t('github.viewProfile')}
                </a>
              </div>
            </motion.div>
          )}

          {shouldShowInitializing && (
            <motion.div 
              className="text-center py-12"
              variants={itemVariants}
            >
              <div className="inline-flex flex-col items-center gap-4 text-gray-600 dark:text-gray-400">
                <div className="w-8 h-8 border-3 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-lg font-medium">{t('github.initializing')}</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default GitHubRepositories