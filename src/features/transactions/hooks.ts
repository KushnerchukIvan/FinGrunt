import type { TransactionFormValues } from '../../schemas/transactionSchema'
import { useAppStore } from '../../stores/useAppStore'
import type { Transaction } from '../../types'

export function useTransactions(): {
  data: Transaction[]
  isLoading: boolean
  isError: boolean
} {
  const data = useAppStore((state) => state.transactions)
  return { data, isLoading: false, isError: false }
}

export function useCreateTransaction() {
  const addTransaction = useAppStore((state) => state.addTransaction)

  const mutate = (values: TransactionFormValues) => {
    addTransaction({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...values,
    })
  }

  return { mutate, isPending: false }
}

export function useUpdateTransaction() {
  const updateTransaction = useAppStore((state) => state.updateTransaction)

  const mutate = (input: { id: string; changes: TransactionFormValues }) => {
    updateTransaction(input.id, input.changes)
  }

  return { mutate, isPending: false }
}

export function useDeleteTransaction() {
  const deleteTransaction = useAppStore((state) => state.deleteTransaction)

  const mutate = (id: string) => {
    deleteTransaction(id)
  }

  return { mutate, isPending: false }
}
