import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getExperience, getProfessionalProjects, getPersonalInfo } from '@/config/personal'

/**
 * Custom hook that provides language-aware data that updates when the language changes
 * This ensures components re-render with the correct language content
 */
export const useLanguageAwareData = () => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language
  const [experience, setExperience] = useState(getExperience())
  const [professionalProjects, setProfessionalProjects] = useState(getProfessionalProjects())
  const [personalData, setPersonalData] = useState(getPersonalInfo())

  useEffect(() => {
    const updateData = () => {
      setExperience(getExperience())
      setProfessionalProjects(getProfessionalProjects())
      // Get fresh personalInfo with current language
      setPersonalData(getPersonalInfo())
    }

    // Update data when language changes
    i18n.on('languageChanged', updateData)

    // Initial update
    updateData()

    return () => {
      i18n.off('languageChanged', updateData)
    }
  }, [i18n, currentLanguage]) // Added currentLanguage as dependency

  return {
    experience,
    professionalProjects,
    personalInfo: personalData,
  }
} 