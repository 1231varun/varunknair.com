import { useState, useEffect, useCallback, useRef } from 'react'
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
  // Initialize loading as true if GitHub integration is enabled to prevent empty state on reload
  const [isLoading, setIsLoading] = useState(enableGitHubIntegration && !!githubUrl)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  // Initialize hasAttempted as true to immediately allow state rendering
  const [hasAttempted, setHasAttempted] = useState(true)
  const abortControllerRef = useRef<AbortController | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const loadProjects = useCallback(async (isRetry = false) => {
    // Cancel any ongoing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (!enableGitHubIntegration || !githubUrl) {
      setProjects(manualProjects)
      setIsLoading(false)
      return
    }

    // hasAttempted is already initialized as true

    setIsLoading(true)
    setError(null)

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController()
    
    // Set a timeout to prevent infinite loading (30 seconds)
    timeoutRef.current = setTimeout(() => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      setIsLoading(false)
      setError('Request timed out. Please try again.')
      setProjects(manualProjects)
    }, 30000)

    try {
      // Add minimum loading time to ensure loading state is visible
      const [allProjects] = await Promise.all([
        getProjectsWithGitHub(manualProjects, githubUrl, {
          maxGitHubProjects,
          featuredRepos,
        }),
        new Promise(resolve => setTimeout(resolve, 800)) // Minimum 800ms loading
      ])

      // Check if request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return
      }

      setProjects(allProjects)
      setRetryCount(0) // Reset retry count on success
      setError(null)
    } catch (err) {
      // Check if request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return
      }

      console.error('Error loading GitHub projects:', err)
      
      // Use the specific error message from the service if available
      let errorMessage = 'Failed to load GitHub repositories'
      if (err instanceof Error) {
        // Use the specific error message from the GitHub service
        errorMessage = err.message
      }
      
      setError(errorMessage)
      setProjects(manualProjects) // Fallback to manual projects
      
      // Auto-retry up to 2 times with exponential backoff
      if (retryCount < 2 && !isRetry) {
        const retryDelay = Math.pow(2, retryCount) * 1000 // 1s, 2s, 4s
        setTimeout(() => {
          setRetryCount(prev => prev + 1)
          loadProjects(true)
        }, retryDelay)
      }
    } finally {
      setIsLoading(false)
      // Clear the timeout if the request completed
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [githubUrl, maxGitHubProjects, enableGitHubIntegration, featuredRepos, manualProjects, retryCount])

  const retry = useCallback(() => {
    setRetryCount(0)
    loadProjects(false)
  }, [loadProjects])

  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      loadProjects()
    }

    return () => {
      isMounted = false
      // Cancel ongoing requests when component unmounts
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      // Clear timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [
    githubUrl, 
    maxGitHubProjects, 
    enableGitHubIntegration, 
    JSON.stringify(featuredRepos), 
    JSON.stringify(manualProjects)
  ])

  return {
    projects,
    isLoading,
    error,
    retry,
    retryCount,
    hasAttempted,
  }
} 