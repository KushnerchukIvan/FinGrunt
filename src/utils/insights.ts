import type { Budgets, ExpenseCategoryId, Transaction } from '../types'
import { getBudgetStatuses } from './budgets'
import { expensesByCategory, summarize, transactionsInMonth } from './transactions'

export type InsightTone = 'warning' | 'tip' | 'success' | 'info'

export type Insight = {
  id: string
  tone: InsightTone
  messageKey: string
  params?: {
    categoryId?: ExpenseCategoryId
    spent?: number
    limit?: number
    amount?: number
    rate?: number
    share?: number
  }
  lessonId?: string
}

export function getInsights(
  transactions: Transaction[],
  budgets: Budgets,
  monthKey: string,
): Insight[] {
  const monthTransactions = transactionsInMonth(transactions, monthKey)

  if (monthTransactions.length === 0) {
    return [
      {
        id: 'no-data',
        tone: 'info',
        messageKey: 'insights.noData',
        lessonId: 'budgeting-basics',
      },
    ]
  }

  const insights: Insight[] = []
  const { income, expense, savingsRate } = summarize(monthTransactions)

  if (expense > income) {
    insights.push({
      id: 'overspending',
      tone: 'warning',
      messageKey: 'insights.overspending',
      params: { amount: expense - income },
      lessonId: 'budgeting-basics',
    })
  } else if (savingsRate !== null && savingsRate >= 0.2) {
    insights.push({
      id: 'good-savings',
      tone: 'success',
      messageKey: 'insights.goodSavings',
      params: { rate: savingsRate },
    })
  } else if (savingsRate !== null && savingsRate < 0.1) {
    insights.push({
      id: 'low-savings',
      tone: 'tip',
      messageKey: 'insights.lowSavings',
      params: { rate: savingsRate },
      lessonId: 'pay-yourself-first',
    })
  }

  for (const status of getBudgetStatuses(budgets, transactions, monthKey)) {
    if (status.state === 'over' && status.limit !== null) {
      insights.push({
        id: `over-${status.categoryId}`,
        tone: 'warning',
        messageKey: 'insights.overBudget',
        params: {
          categoryId: status.categoryId,
          spent: status.spent,
          limit: status.limit,
        },
        lessonId: 'budgeting-basics',
      })
    }
  }

  const top = expensesByCategory(transactions, monthKey)[0]
  if (top && expense > 0 && top.categoryId !== 'housing' && top.total / expense > 0.4) {
    insights.push({
      id: 'top-category',
      tone: 'tip',
      messageKey: 'insights.topCategory',
      params: { categoryId: top.categoryId, share: top.total / expense },
      lessonId: 'budgeting-basics',
    })
  }

  if (Object.keys(budgets).length === 0) {
    insights.push({
      id: 'no-budgets',
      tone: 'tip',
      messageKey: 'insights.noBudgets',
      lessonId: 'budgeting-basics',
    })
  }

  return insights.slice(0, 5)
}
