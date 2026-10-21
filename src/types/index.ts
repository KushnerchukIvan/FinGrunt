import type { CategoryId, ExpenseCategoryId } from '../constants/categories'

export type {
  CategoryId,
  ExpenseCategoryId,
  IncomeCategoryId,
} from '../constants/categories'

export type TransactionType = 'income' | 'expense'
export type CurrencyCode = 'UAH' | 'USD' | 'EUR'

export type Transaction = {
  id: string
  type: TransactionType
  amount: number
  categoryId: CategoryId
  date: string
  note: string
  createdAt: string
}

export type Budgets = Partial<Record<ExpenseCategoryId, number>>

export type LessonProgress = {
  completed: boolean
  bestScore: number
  attempts: number
}

export type Settings = {
  currency: CurrencyCode
}
