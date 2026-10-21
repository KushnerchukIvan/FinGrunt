import { useAppStore } from '../../stores/useAppStore'
import type { CurrencyCode, Settings } from '../../types'

export function useSettings(): {
  data: Settings
  isLoading: boolean
  isError: boolean
} {
  const data = useAppStore((state) => state.settings)
  return { data, isLoading: false, isError: false }
}

export function useSetCurrency() {
  const setCurrency = useAppStore((state) => state.setCurrency)

  const mutate = (currency: CurrencyCode) => {
    setCurrency(currency)
  }

  return { mutate, isPending: false }
}

export function useResetData() {
  const loadDemoData = useAppStore((state) => state.loadDemoData)
  const clearAllData = useAppStore((state) => state.clearAllData)
  return { loadDemoData, clearAllData }
}
