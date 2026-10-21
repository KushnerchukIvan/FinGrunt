import { useTranslation } from 'react-i18next'
import { useSettings } from './features/settings/hooks'
import { formatMoney } from './utils/money'
import type { Language } from './content/lessons'

export function useMoney() {
  const { i18n } = useTranslation()
  const { data } = useSettings()
  return (amount: number) => formatMoney(amount, data.currency, i18n.language)
}

export function useLanguage(): Language {
  const { i18n } = useTranslation()
  return i18n.language.startsWith('uk') ? 'uk' : 'en'
}
