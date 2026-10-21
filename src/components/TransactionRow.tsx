import { Pencil, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { iconButtonClass } from './ui/formStyles'
import { categoryColor } from '../constants/categories'
import { useMoney } from '../hooks'
import type { Transaction } from '../types'
import { formatDateKey } from '../utils/date'

type TransactionRowProps = {
  transaction: Transaction
  onEdit?: (transaction: Transaction) => void
  onDelete?: (transaction: Transaction) => void
}

export default function TransactionRow({ transaction, onEdit, onDelete }: TransactionRowProps) {
  const { t, i18n } = useTranslation()
  const money = useMoney()
  const isIncome = transaction.type === 'income'
  const categoryName = t(`categories.${transaction.categoryId}`)

  return (
    <li className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
      <span
        aria-hidden="true"
        className="h-3 w-3 shrink-0 rounded-full"
        style={{ backgroundColor: categoryColor[transaction.categoryId] }}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{transaction.note || categoryName}</p>
        <p className="mt-0.5 truncate text-xs text-slate-500">
          {categoryName} · {formatDateKey(transaction.date, i18n.language)}
        </p>
      </div>
      <p
        className={`shrink-0 font-semibold ${isIncome ? 'text-emerald-400' : 'text-slate-100'}`}
      >
        {isIncome ? '+' : '−'}
        {money(transaction.amount)}
      </p>
      {onEdit && (
        <button
          type="button"
          onClick={() => onEdit(transaction)}
          aria-label={t('transactions.editLabel', { name: transaction.note || categoryName })}
          className={iconButtonClass}
        >
          <Pencil size={16} />
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          onClick={() => onDelete(transaction)}
          aria-label={t('transactions.deleteLabel', { name: transaction.note || categoryName })}
          className={`${iconButtonClass} hover:text-rose-400`}
        >
          <Trash2 size={16} />
        </button>
      )}
    </li>
  )
}
