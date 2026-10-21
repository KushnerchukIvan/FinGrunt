import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createDemoBudgets, createDemoTransactions } from '../mocks/seed'
import type {
  Budgets,
  CurrencyCode,
  ExpenseCategoryId,
  LessonProgress,
  Settings,
  Transaction,
} from '../types'

type AppState = {
  transactions: Transaction[]
  budgets: Budgets
  lessonProgress: Record<string, LessonProgress>
  settings: Settings
  addTransaction: (transaction: Transaction) => void
  updateTransaction: (id: string, changes: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  setBudget: (categoryId: ExpenseCategoryId, limit: number | null) => void
  recordQuiz: (lessonId: string, score: number, passed: boolean) => void
  setCurrency: (currency: CurrencyCode) => void
  loadDemoData: () => void
  clearAllData: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      transactions: createDemoTransactions(),
      budgets: createDemoBudgets(),
      lessonProgress: {},
      settings: { currency: 'UAH' },
      addTransaction: (transaction) =>
        set((state) => ({ transactions: [transaction, ...state.transactions] })),
      updateTransaction: (id, changes) =>
        set((state) => ({
          transactions: state.transactions.map((item) =>
            item.id === id ? { ...item, ...changes } : item,
          ),
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((item) => item.id !== id),
        })),
      setBudget: (categoryId, limit) =>
        set((state) => {
          const budgets = { ...state.budgets }
          if (limit === null) {
            delete budgets[categoryId]
          } else {
            budgets[categoryId] = limit
          }
          return { budgets }
        }),
      recordQuiz: (lessonId, score, passed) =>
        set((state) => {
          const previous = state.lessonProgress[lessonId]
          return {
            lessonProgress: {
              ...state.lessonProgress,
              [lessonId]: {
                completed: (previous?.completed ?? false) || passed,
                bestScore: Math.max(previous?.bestScore ?? 0, score),
                attempts: (previous?.attempts ?? 0) + 1,
              },
            },
          }
        }),
      setCurrency: (currency) => set((state) => ({ settings: { ...state.settings, currency } })),
      loadDemoData: () =>
        set({ transactions: createDemoTransactions(), budgets: createDemoBudgets() }),
      clearAllData: () => set({ transactions: [], budgets: {}, lessonProgress: {} }),
    }),
    {
      name: 'fingrunt-data',
      version: 1,
      partialize: (state) => ({
        transactions: state.transactions,
        budgets: state.budgets,
        lessonProgress: state.lessonProgress,
        settings: state.settings,
      }),
    },
  ),
)
