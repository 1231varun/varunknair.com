import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ExternalLink, Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ResumeInfo } from '@/types'

interface ResumePreviewProps {
  isOpen: boolean
  onClose: () => void
  resumeInfo: ResumeInfo
  personalInfo: { fullName: string }
}

const ResumePreview = ({ isOpen, onClose, resumeInfo, personalInfo }: ResumePreviewProps) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Convert Google Drive URLs to embed-friendly format
  const getEmbedUrl = (url: string): string => {
    if (!url || url === '#') return url

    // Google Drive view URL pattern: https://drive.google.com/file/d/FILE_ID/view
    const googleDriveMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)
    if (googleDriveMatch) {
      const fileId = googleDriveMatch[1]
      return `https://drive.google.com/file/d/${fileId}/preview`
    }

    // Google Drive direct link pattern: https://drive.google.com/open?id=FILE_ID
    const googleDriveOpenMatch = url.match(/[?&]id=([a-zA-Z0-9-_]+)/)
    if (googleDriveOpenMatch) {
      const fileId = googleDriveOpenMatch[1]
      return `https://drive.google.com/file/d/${fileId}/preview`
    }

    // Return original URL if not a Google Drive URL
    return url
  }

  const embedUrl = getEmbedUrl(resumeInfo.viewUrl || '')

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      setHasError(false)
    }
  }, [isOpen])

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleDownload = () => {
    if (resumeInfo.downloadUrl && resumeInfo.downloadUrl !== '#') {
      const link = document.createElement('a')
      link.href = resumeInfo.downloadUrl
      link.download = `${personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleExternalView = () => {
    if (resumeInfo.viewUrl && resumeInfo.viewUrl !== '#') {
      window.open(resumeInfo.viewUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  // Add timeout for iframe loading to catch cases where onError doesn't fire
  useEffect(() => {
    if (isLoading && isOpen) {
      const timeout = setTimeout(() => {
        setIsLoading(false)
        setHasError(true)
      }, 10000) // 10 second timeout

      return () => clearTimeout(timeout)
    }
  }, [isLoading, isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-preview-title"
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 gap-4">
            <div className="w-full sm:w-auto">
              <h3 id="resume-preview-title" className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                {t('resume.preview.title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {personalInfo.fullName} - {t('resume.preview.subtitle')}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
              {/* Download Button */}
              <motion.button
                onClick={handleDownload}
                className="btn-primary px-3 sm:px-4 py-2 text-sm inline-flex items-center gap-2 flex-1 sm:flex-none justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!resumeInfo.downloadUrl || resumeInfo.downloadUrl === '#'}
                aria-label={t('about.downloadResume')}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">{t('about.downloadResume')}</span>
                <span className="sm:hidden">Download</span>
              </motion.button>

              {/* External View Button */}
              <motion.button
                onClick={handleExternalView}
                className="btn-secondary px-3 sm:px-4 py-2 text-sm inline-flex items-center gap-2 flex-1 sm:flex-none justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!resumeInfo.viewUrl || resumeInfo.viewUrl === '#'}
                aria-label={t('resume.preview.openExternal')}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">{t('resume.preview.openExternal')}</span>
                <span className="sm:hidden">Open</span>
              </motion.button>

              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close resume preview"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 relative overflow-hidden">
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('resume.preview.loading')}
                  </p>
                </div>
              </div>
            )}

            {/* Error State */}
            {hasError && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ExternalLink className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {t('resume.preview.error.title')}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {t('resume.preview.error.description')}
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={handleExternalView}
                      className="btn-primary px-4 py-2 text-sm inline-flex items-center gap-2"
                      disabled={!resumeInfo.viewUrl || resumeInfo.viewUrl === '#'}
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('resume.preview.openExternal')}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="btn-secondary px-4 py-2 text-sm inline-flex items-center gap-2"
                      disabled={!resumeInfo.downloadUrl || resumeInfo.downloadUrl === '#'}
                    >
                      <Download className="w-4 h-4" />
                      {t('about.downloadResume')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Resume Iframe */}
            {embedUrl && embedUrl !== '#' && (
              <iframe
                src={embedUrl}
                className="w-full h-full border-0"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                title={`${personalInfo.fullName} Resume`}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                allow="autoplay; encrypted-media"
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ResumePreview