
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, UserRound, ChevronDown, Check } from 'lucide-react'

const languages = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'uk', label: 'Ukrainian', nativeLabel: 'Українська' },
]

export default function Header() {
  const { t, i18n } = useTranslation()
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)

  const currentLanguage =
    languages.find((language) => language.code === i18n.language) ??
    languages[0]

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode)
    setIsLanguageMenuOpen(false)
  }

  return (
    <header className="mb-6 flex min-w-0 items-start justify-between gap-2 px-3 py-3 sm:mb-8 sm:items-center sm:px-6">
      <div>
        <h2 className="text-2xl font-bold">{t('header.welcome')}</h2>
        <p className="mt-1 text-sm text-slate-400">
          {t('header.description')}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsLanguageMenuOpen((open) => !open)}
            aria-expanded={isLanguageMenuOpen}
            aria-haspopup="menu"
            className="flex items-center gap-2 rounded-xl border border-slate-800 px-4 py-2 text-sm hover:bg-slate-900"
          >
            <Globe size={18} />
            {currentLanguage.code.toUpperCase()}
            <ChevronDown
              size={16}
              className={`transition-transform ${
                isLanguageMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isLanguageMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-slate-800 bg-slate-950 p-1 shadow-xl"
            >
              {languages.map((language) => {
                const isActive = currentLanguage.code === language.code

                return (
                  <button
                    key={language.code}
                    type="button"
                    role="menuitem"
                    onClick={() => changeLanguage(language.code)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <span>{language.nativeLabel}</span>
                    {isActive && <Check size={16} />}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <button
          type="button"
          aria-label={t('common.profile')}
          className="rounded-xl border border-slate-800 p-2 hover:bg-slate-900"
        >
          <UserRound size={20} />
        </button>
      </div>
    </header>
  )
}
