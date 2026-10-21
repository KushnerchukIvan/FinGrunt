import type { Budgets, ExpenseCategoryId, Transaction } from '../types'
import { expenseCategories } from '../constants/categories'
import { round2 } from './money'
import { expensesByCategory } from './transactions'

export type BudgetState = 'ok' | 'warning' | 'over'

export type BudgetStatus = {
  categoryId: ExpenseCategoryId
  limit: number | null
  spent: number
  remaining: number | null
  ratio: number | null
  state: BudgetState | null
}

export const warningThreshold = 0.8

export function getBudgetStatuses(
  budgets: Budgets,
  transactions: Transaction[],
  monthKey: string,
): BudgetStatus[] {
  const spentById = new Map(
    expensesByCategory(transactions, monthKey).map((item) => [item.categoryId, item.total]),
  )

  return expenseCategories.map((categoryId) => {
    const limit = budgets[categoryId] ?? null
    const spent = spentById.get(categoryId) ?? 0

    if (limit === null || limit <= 0) {
      return { categoryId, limit: null, spent, remaining: null, ratio: null, state: null }
    }

    const ratio = spent / limit
    const state: BudgetState =
      ratio > 1 ? 'over' : ratio >= warningThreshold ? 'warning' : 'ok'

    return {
      categoryId,
      limit,
      spent,
      remaining: round2(limit - spent),
      ratio,
      state,
    }
  })
}

export function budgetTotals(statuses: BudgetStatus[]) {
  const withLimit = statuses.filter((item) => item.limit !== null)
  return {
    limit: round2(withLimit.reduce((sum, item) => sum + (item.limit ?? 0), 0)),
    spent: round2(withLimit.reduce((sum, item) => sum + item.spent, 0)),
    count: withLimit.length,
  }
}
