import { useState, useEffect } from 'react'
import { Project } from '@/types'
import { getProjectsWithGitHub } from '@/services/github'

interface UseGitHubProjectsOptions {
  manualProjects: Project[]
  githubUrl?: string
  maxGitHubProjects?: number
  featuredRepos?: string[]
  enableGitHubIntegration?: boolean
}

export const useGitHubProjects = ({
  manualProjects,
  githubUrl,
  maxGitHubProjects = 6,
  featuredRepos = [],
  enableGitHubIntegration = true,
}: UseGitHubProjectsOptions) => {
  const [projects, setProjects] = useState<Project[]>(manualProjects)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadProjects = async () => {
      if (!enableGitHubIntegration || !githubUrl) {
        if (isMounted) {
          setProjects(manualProjects)
          setIsLoading(false)
        }
        return
      }

      if (isMounted) {
        setIsLoading(true)
        setError(null)
      }

      try {
        const allProjects = await getProjectsWithGitHub(
          manualProjects,
          githubUrl,
          {
            maxGitHubProjects,
            featuredRepos,
          }
        )
        if (isMounted) {
          setProjects(allProjects)
        }
      } catch (err) {
        console.error('Error loading GitHub projects:', err)
        if (isMounted) {
          setError('Failed to load GitHub projects')
          setProjects(manualProjects) // Fallback to manual projects
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadProjects()

    return () => {
      isMounted = false
    }
  }, [githubUrl, maxGitHubProjects, enableGitHubIntegration, featuredRepos, manualProjects])

  return {
    projects,
    isLoading,
    error,
  }
} 