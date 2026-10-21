import { z } from 'zod'
import {
  allCategories,
  expenseCategories,
  incomeCategories,
} from '../constants/categories'

export const transactionSchema = z
  .object({
    type: z.enum(['income', 'expense']),
    amount: z
      .number('transactions.form.errors.amountInvalid')
      .positive('transactions.form.errors.amountInvalid')
      .max(1_000_000_000, 'transactions.form.errors.amountTooLarge'),
    categoryId: z.enum(allCategories, 'transactions.form.errors.categoryRequired'),
    date: z.string().min(1, 'transactions.form.errors.dateRequired'),
    note: z.string().trim().max(100, 'transactions.form.errors.noteTooLong'),
  })
  .superRefine((value, context) => {
    const allowed: readonly string[] =
      value.type === 'income' ? incomeCategories : expenseCategories
    if (!allowed.includes(value.categoryId)) {
      context.addIssue({
        code: 'custom',
        path: ['categoryId'],
        message: 'transactions.form.errors.categoryRequired',
      })
    }
  })

export type TransactionFormValues = z.infer<typeof transactionSchema>
