import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import uk from './locales/uk.json'
import en from './locales/en.json'

const storageKey = 'fingrunt-language'

function getInitialLanguage(): string {
  try {
    const saved = localStorage.getItem(storageKey)
    if (saved === 'uk' || saved === 'en') return saved
  } catch {
    return 'uk'
  }
  return 'uk'
}

i18n.use(initReactI18next).init({
  resources: {
    uk: { translation: uk },
    en: { translation: en },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

document.documentElement.lang = i18n.language

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language
  try {
    localStorage.setItem(storageKey, language)
  } catch {
    return
  }
})

export default i18n
