import type {
  CategoryId,
  ExpenseCategoryId,
  Transaction,
  TransactionType,
} from '../types'
import { expenseCategories } from '../constants/categories'
import { monthKeyOf } from './date'
import { round2 } from './money'

export type TransactionFilters = {
  type: TransactionType | 'all'
  categoryId: CategoryId | 'all'
  month: string
  query: string
}

export const defaultTransactionFilters: TransactionFilters = {
  type: 'all',
  categoryId: 'all',
  month: 'all',
  query: '',
}

export type Summary = {
  income: number
  expense: number
  balance: number
  savingsRate: number | null
}

export type CategoryTotal = {
  categoryId: ExpenseCategoryId
  total: number
}

export type MonthlyPoint = {
  month: string
  income: number
  expense: number
}

export function sortTransactions(transactions: Transaction[]): Transaction[] {
  return [...transactions].sort(
    (a, b) =>
      b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt),
  )
}

export function filterTransactions(
  transactions: Transaction[],
  filters: TransactionFilters,
  categoryName: (id: CategoryId) => string = (id) => id,
): Transaction[] {
  const query = filters.query.trim().toLowerCase()

  return sortTransactions(
    transactions.filter(
      (item) =>
        (filters.type === 'all' || item.type === filters.type) &&
        (filters.categoryId === 'all' || item.categoryId === filters.categoryId) &&
        (filters.month === 'all' || monthKeyOf(item.date) === filters.month) &&
        (query === '' ||
          item.note.toLowerCase().includes(query) ||
          categoryName(item.categoryId).toLowerCase().includes(query)),
    ),
  )
}

export function summarize(transactions: Transaction[]): Summary {
  const income = round2(
    transactions
      .filter((item) => item.type === 'income')
      .reduce((sum, item) => sum + item.amount, 0),
  )
  const expense = round2(
    transactions
      .filter((item) => item.type === 'expense')
      .reduce((sum, item) => sum + item.amount, 0),
  )

  return {
    income,
    expense,
    balance: round2(income - expense),
    savingsRate: income > 0 ? (income - expense) / income : null,
  }
}

export function transactionsInMonth(
  transactions: Transaction[],
  monthKey: string,
): Transaction[] {
  return transactions.filter((item) => monthKeyOf(item.date) === monthKey)
}

export function expensesByCategory(
  transactions: Transaction[],
  monthKey: string,
): CategoryTotal[] {
  const totals = new Map<ExpenseCategoryId, number>()

  for (const item of transactionsInMonth(transactions, monthKey)) {
    if (item.type !== 'expense') continue
    if (!(expenseCategories as readonly string[]).includes(item.categoryId)) continue
    const id = item.categoryId as ExpenseCategoryId
    totals.set(id, (totals.get(id) ?? 0) + item.amount)
  }

  return [...totals.entries()]
    .map(([categoryId, total]) => ({ categoryId, total: round2(total) }))
    .filter((item) => item.total > 0)
    .sort((a, b) => b.total - a.total)
}

export function monthlySeries(
  transactions: Transaction[],
  monthKeys: string[],
): MonthlyPoint[] {
  return monthKeys.map((month) => {
    const { income, expense } = summarize(transactionsInMonth(transactions, month))
    return { month, income, expense }
  })
}

export function availableMonths(transactions: Transaction[]): string[] {
  return [...new Set(transactions.map((item) => monthKeyOf(item.date)))].sort((a, b) =>
    b.localeCompare(a),
  )
}
