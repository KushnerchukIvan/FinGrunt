import type { Budgets, Transaction } from '../types'
import type { CategoryId } from '../constants/categories'
import { toDateKey } from '../utils/date'

type Template = {
  type: Transaction['type']
  categoryId: CategoryId
  day: number
  amount: number
  note: string
}

const templates: Template[] = [
  { type: 'income', categoryId: 'salary', day: 5, amount: 32000, note: 'Salary' },
  { type: 'income', categoryId: 'freelance', day: 18, amount: 6000, note: 'Freelance project' },
  { type: 'expense', categoryId: 'housing', day: 3, amount: 9000, note: 'Rent' },
  { type: 'expense', categoryId: 'transport', day: 4, amount: 900, note: 'Monthly pass' },
  { type: 'expense', categoryId: 'food', day: 2, amount: 1800, note: 'Groceries' },
  { type: 'expense', categoryId: 'utilities', day: 7, amount: 2200, note: 'Utilities and internet' },
  { type: 'expense', categoryId: 'entertainment', day: 8, amount: 800, note: 'Cinema' },
  { type: 'expense', categoryId: 'food', day: 9, amount: 2400, note: 'Groceries' },
  { type: 'expense', categoryId: 'health', day: 11, amount: 650, note: 'Pharmacy' },
  { type: 'expense', categoryId: 'education', day: 13, amount: 1200, note: 'Online course' },
  { type: 'expense', categoryId: 'shopping', day: 14, amount: 2800, note: 'Clothes' },
  { type: 'expense', categoryId: 'transport', day: 15, amount: 700, note: 'Taxi' },
  { type: 'expense', categoryId: 'food', day: 16, amount: 2100, note: 'Groceries' },
  { type: 'expense', categoryId: 'entertainment', day: 20, amount: 1500, note: 'Dinner with friends' },
  { type: 'expense', categoryId: 'food', day: 23, amount: 2600, note: 'Groceries' },
  { type: 'expense', categoryId: 'transport', day: 25, amount: 1100, note: 'Fuel' },
  { type: 'expense', categoryId: 'shopping', day: 27, amount: 1900, note: 'Home goods' },
]

const monthFactors = [1, 0.95, 1.08]

export function createDemoTransactions(today: Date = new Date()): Transaction[] {
  const result: Transaction[] = []

  monthFactors.forEach((factor, offset) => {
    const monthDate = new Date(today.getFullYear(), today.getMonth() - offset, 1)
    const lastDay = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate()

    templates.forEach((template, index) => {
      if (offset === 0 && template.day > today.getDate()) return

      const date = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth(),
        Math.min(template.day, lastDay),
      )
      const amount =
        template.categoryId === 'salary'
          ? template.amount
          : Math.round((template.amount * factor) / 10) * 10

      result.push({
        id: `demo-${offset}-${index}`,
        type: template.type,
        categoryId: template.categoryId,
        amount,
        date: toDateKey(date),
        note: template.note,
        createdAt: `${toDateKey(date)}T09:00:00.000Z`,
      })
    })
  })

  return result
}

export function createDemoBudgets(): Budgets {
  return {
    food: 7000,
    housing: 9500,
    transport: 2500,
    entertainment: 2000,
    shopping: 3500,
  }
}
