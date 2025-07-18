import { Project } from '@/types'

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
  size: number
  archived: boolean
  disabled: boolean
  fork: boolean
  private: boolean
}

interface GitHubLanguage {
  [language: string]: number
}

class GitHubService {
  private baseUrl = 'https://api.github.com'
  private cache = new Map<string, { data: any; timestamp: number }>()
  private readonly CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

  /**
   * Get cached data or fetch from API
   */
  private async getCachedData<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cached = this.cache.get(key)
    const now = Date.now()

    if (cached && now - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    try {
      const data = await fetcher()
      this.cache.set(key, { data, timestamp: now })
      return data
    } catch (error) {
      // Return cached data if available, even if expired
      if (cached) {
        console.warn('Using expired cache due to API error:', error)
        return cached.data
      }
      throw error
    }
  }

  /**
   * Fetch user repositories from GitHub API
   */
  async fetchUserRepos(username: string): Promise<GitHubRepo[]> {
    return this.getCachedData(`repos_${username}`, async () => {
      const response = await fetch(
        `${this.baseUrl}/users/${username}/repos?type=public&sort=updated&per_page=100`
      )

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
      }

      return response.json()
    })
  }

  /**
   * Fetch languages for a specific repository
   */
  async fetchRepoLanguages(username: string, repoName: string): Promise<GitHubLanguage> {
    return this.getCachedData(`languages_${username}_${repoName}`, async () => {
      const response = await fetch(`${this.baseUrl}/repos/${username}/${repoName}/languages`)

      if (!response.ok) {
        return {}
      }

      return response.json()
    })
  }

  /**
   * Convert GitHub repositories to portfolio projects
   */
  async convertReposToProjects(
    username: string,
    options: {
      maxProjects?: number
      includeForked?: boolean
      minStars?: number
      excludeArchived?: boolean
      featuredRepos?: string[]
    } = {}
  ): Promise<Project[]> {
    const {
      maxProjects = 6,
      includeForked = false,
      minStars = 0,
      excludeArchived = true,
      featuredRepos = [],
    } = options

    try {
      const repos = await this.fetchUserRepos(username)

      // Filter repositories
      const filteredRepos = repos.filter(repo => {
        if (!includeForked && repo.fork) return false
        if (excludeArchived && repo.archived) return false
        if (repo.stargazers_count < minStars) return false
        if (repo.disabled) return false
        return true
      })

      // Sort by priority: featured repos first, then by stars + recency
      const sortedRepos = filteredRepos.sort((a, b) => {
        const aIsFeatured = featuredRepos.includes(a.name)
        const bIsFeatured = featuredRepos.includes(b.name)

        if (aIsFeatured && !bIsFeatured) return -1
        if (!aIsFeatured && bIsFeatured) return 1

        // Score based on stars, forks, and recency
        const getScore = (repo: GitHubRepo) => {
          const daysSinceUpdate = (Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24)
          const recencyBonus = Math.max(0, 365 - daysSinceUpdate) / 365 // Bonus for recent activity
          return repo.stargazers_count * 2 + repo.forks_count + recencyBonus * 10
        }

        return getScore(b) - getScore(a)
      })

      // Take top repositories
      const topRepos = sortedRepos.slice(0, maxProjects)

      // Convert to Project format with language information
      const projects: Project[] = await Promise.all(
        topRepos.map(async (repo, index) => {
          let technologies: string[] = []

          try {
            const languages = await this.fetchRepoLanguages(username, repo.name)
            technologies = Object.keys(languages).slice(0, 5) // Top 5 languages
          } catch (error) {
            console.warn(`Failed to fetch languages for ${repo.name}:`, error)
            if (repo.language) {
              technologies = [repo.language]
            }
          }

          // Add topics as additional technologies
          if (repo.topics && repo.topics.length > 0) {
            const relevantTopics = repo.topics
              .filter(topic => topic.length < 20) // Filter out very long topics
              .slice(0, 3) // Max 3 topics
            technologies = [...technologies, ...relevantTopics]
          }

          // Remove duplicates and limit
          technologies = [...new Set(technologies)].slice(0, 6)

          const project: Project = {
            id: `github-${repo.id}`,
            title: this.formatRepoName(repo.name),
            description: repo.description || 'A GitHub repository showcasing development skills.',
            longDescription: this.generateLongDescription(repo),
            technologies,
            imageUrl: `/projects/github-${repo.name}.jpg`, // Placeholder, can be customized
            projectUrl: repo.homepage || undefined,
            githubUrl: repo.html_url,
            featured: featuredRepos.includes(repo.name) || index < 3,
            category: this.determineCategory(technologies, repo.topics || []),
          }

          return project
        })
      )

      return projects
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error)
      return []
    }
  }

  /**
   * Format repository name for display
   */
  private formatRepoName(name: string): string {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  /**
   * Generate a longer description based on repo data
   */
  private generateLongDescription(repo: GitHubRepo): string {
    const parts = []

    if (repo.description) {
      parts.push(repo.description)
    }

    if (repo.stargazers_count > 0) {
      parts.push(`This project has gained ${repo.stargazers_count} stars on GitHub.`)
    }

    if (repo.forks_count > 0) {
      parts.push(`It has been forked ${repo.forks_count} times by the community.`)
    }

    if (repo.topics && repo.topics.length > 0) {
      parts.push(`Technologies and topics include: ${repo.topics.slice(0, 5).join(', ')}.`)
    }

    return parts.join(' ') || 'A GitHub repository showcasing development expertise and problem-solving skills.'
  }

  /**
   * Determine project category based on technologies and topics
   */
  private determineCategory(
    technologies: string[],
    topics: string[]
  ): Project['category'] {
    const allTerms = [...technologies, ...topics].map(term => term.toLowerCase())

    if (allTerms.some(term => ['react', 'vue', 'angular', 'frontend', 'web', 'html', 'css'].includes(term))) {
      return 'web'
    }

    if (allTerms.some(term => ['mobile', 'ios', 'android', 'react-native', 'flutter', 'swift', 'kotlin'].includes(term))) {
      return 'mobile'
    }

    if (allTerms.some(term => ['api', 'backend', 'server', 'node', 'express', 'fastapi', 'django'].includes(term))) {
      return 'api'
    }

    if (allTerms.some(term => ['desktop', 'electron', 'tauri', 'native'].includes(term))) {
      return 'desktop'
    }

    return 'other'
  }

  /**
   * Get GitHub username from environment or URL
   */
  static extractUsernameFromGitHubUrl(url: string): string | null {
    const match = url.match(/github\.com\/([^\/]+)/)
    return match ? match[1] : null
  }
}

export const githubService = new GitHubService()

/**
 * Helper function to fetch and merge GitHub projects with manual projects
 */
export const getProjectsWithGitHub = async (
  manualProjects: Project[],
  githubUrl?: string,
  options?: {
    maxGitHubProjects?: number
    featuredRepos?: string[]
  }
): Promise<Project[]> => {
  if (!githubUrl) {
    return manualProjects
  }

  const username = GitHubService.extractUsernameFromGitHubUrl(githubUrl)
  
  if (!username) {
    console.warn('Could not extract username from GitHub URL:', githubUrl)
    return manualProjects
  }

  try {
    const githubProjects = await githubService.convertReposToProjects(username, {
      maxProjects: options?.maxGitHubProjects || 6,
      featuredRepos: options?.featuredRepos || [],
      minStars: 0, // Include all public repos
      excludeArchived: true,
    })

    // Merge projects, prioritizing manual projects
    const allProjects = [...manualProjects, ...githubProjects]

    // Remove duplicates (if manual project has same GitHub URL)
    const uniqueProjects = allProjects.filter((project, index, arr) => {
      return index === arr.findIndex(p => p.githubUrl === project.githubUrl)
    })

    return uniqueProjects
  } catch (error) {
    console.error('Error fetching GitHub projects:', error)
    return manualProjects
  }
} 