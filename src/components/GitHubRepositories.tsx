import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Github, Star, GitFork, ExternalLink, Eye } from 'lucide-react'
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
  const { ref, controls } = useScrollAnimation({ threshold: 0.2 })

  // Memoize arrays to prevent re-renders - ensure arrays are always defined
  const memoizedFeaturedRepos = useMemo(() => featuredRepos || [], [featuredRepos])
  const memoizedManualProjects = useMemo(() => [], [])

  // Memoize the options to prevent unnecessary re-renders
  const githubOptions = useMemo(() => ({
    manualProjects: memoizedManualProjects,
    githubUrl,
    maxGitHubProjects: maxRepos,
    featuredRepos: memoizedFeaturedRepos,
    enableGitHubIntegration: !!githubUrl,
  }), [githubUrl, maxRepos, memoizedFeaturedRepos, memoizedManualProjects])

  const { projects: githubProjects, isLoading, error } = useGitHubProjects(githubOptions)



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

  // Don't render if no GitHub URL provided
  if (!githubUrl) {
    return null
  }

  return (
    <section id="github-repositories" className={`py-20 bg-gray-50 dark:bg-gray-800/50 ${className}`} ref={ref}>
      <div className="container-max-width section-padding">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Github className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl sm:text-4xl font-bold">GitHub Repositories</h2>
            </div>
            <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full" />
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              A selection of my open-source projects and contributions
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <motion.div 
              className="text-center py-12"
              variants={itemVariants}
            >
              <div className="inline-flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                Loading repositories...
              </div>
            </motion.div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <motion.div 
              className="text-center py-12"
              variants={itemVariants}
            >
              <div className="text-yellow-600 dark:text-yellow-400 mb-4">
                <Github className="w-12 h-12 mx-auto mb-2" />
                <p>{error}</p>
              </div>
              {githubUsername && (
                <a
                  href={`https://github.com/${githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                </a>
              )}
            </motion.div>
          )}

          {/* Repositories Grid */}
          {!isLoading && !error && githubProjects.length > 0 && (
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
                        <span>Stars</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        <span>Forks</span>
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
                          Code
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
                          Demo
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
                    View All Repositories on GitHub
                  </a>
                )}
              </motion.div>
            </>
          )}

          {/* Empty State */}
          {!isLoading && !error && githubProjects.length === 0 && githubUsername && (
            <motion.div 
              className="text-center py-12"
              variants={itemVariants}
            >
              <Github className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No Public Repositories
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                No public repositories found or they don't meet the criteria.
              </p>
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                View GitHub Profile
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default GitHubRepositories 