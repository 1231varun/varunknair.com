import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import enTranslations from './locales/en.json'
import esTranslations from './locales/es.json'
import deTranslations from './locales/de.json'

const resources = {
  en: {
    translation: enTranslations,
  },
  es: {
    translation: esTranslations,
  },
  de: {
    translation: deTranslations,
  },
}

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Use English if detected language is not available
    debug: false, // Set to true for development debugging
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // Detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18n 