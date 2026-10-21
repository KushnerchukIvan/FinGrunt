export const expenseCategories = [
  'food',
  'housing',
  'transport',
  'utilities',
  'health',
  'education',
  'entertainment',
  'shopping',
  'other_expense',
] as const

export const incomeCategories = [
  'salary',
  'freelance',
  'gift',
  'other_income',
] as const

export const allCategories = [...expenseCategories, ...incomeCategories] as const

export type ExpenseCategoryId = (typeof expenseCategories)[number]
export type IncomeCategoryId = (typeof incomeCategories)[number]
export type CategoryId = ExpenseCategoryId | IncomeCategoryId

export const categoryColor: Record<CategoryId, string> = {
  food: '#f97316',
  housing: '#6366f1',
  transport: '#0ea5e9',
  utilities: '#eab308',
  health: '#ef4444',
  education: '#8b5cf6',
  entertainment: '#ec4899',
  shopping: '#14b8a6',
  other_expense: '#64748b',
  salary: '#10b981',
  freelance: '#22c55e',
  gift: '#f59e0b',
  other_income: '#94a3b8',
}
