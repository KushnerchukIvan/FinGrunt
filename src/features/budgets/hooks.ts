import { useAppStore } from '../../stores/useAppStore'
import type { Budgets, ExpenseCategoryId } from '../../types'

export function useBudgets(): {
  data: Budgets
  isLoading: boolean
  isError: boolean
} {
  const data = useAppStore((state) => state.budgets)
  return { data, isLoading: false, isError: false }
}

export function useSetBudget() {
  const setBudget = useAppStore((state) => state.setBudget)

  const mutate = (input: { categoryId: ExpenseCategoryId; limit: number | null }) => {
    setBudget(input.categoryId, input.limit)
  }

  return { mutate, isPending: false }
}
