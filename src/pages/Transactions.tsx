import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import TransactionDialogs, { type TransactionDialogState } from '../components/TransactionDialogs'
import TransactionRow from '../components/TransactionRow'
import { inputClass, primaryButtonClass } from '../components/ui/formStyles'
import { expenseCategories, incomeCategories, type CategoryId } from '../constants/categories'
import { useTransactions } from '../features/transactions/hooks'
import { useMoney } from '../hooks'
import type { TransactionType } from '../types'
import { formatMonthKey } from '../utils/date'
import {
  availableMonths,
  defaultTransactionFilters,
  filterTransactions,
  summarize,
  type TransactionFilters,
} from '../utils/transactions'

export default function Transactions() {
  const { t, i18n } = useTranslation()
  const money = useMoney()
  const { data: transactions } = useTransactions()
  const [filters, setFilters] = useState<TransactionFilters>(defaultTransactionFilters)
  const [dialog, setDialog] = useState<TransactionDialogState>(null)

  const months = useMemo(() => availableMonths(transactions), [transactions])
  const visible = useMemo(
    () =>
      filterTransactions(transactions, filters, (id) => t(`categories.${id}`)),
    [transactions, filters, t],
  )
  const summary = useMemo(() => summarize(visible), [visible])

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t('navigation.transactions')}</h1>
          <p className="mt-1 text-sm text-slate-400">{t('transactions.subtitle')}</p>
        </div>
        <button
          type="button"
          onClick={() => setDialog({ type: 'create' })}
          className={primaryButtonClass}
        >
          <Plus size={18} />
          {t('transactions.new')}
        </button>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input
          type="search"
          value={filters.query}
          onChange={(event) => setFilters({ ...filters, query: event.target.value })}
          aria-label={t('transactions.searchLabel')}
          placeholder={t('transactions.searchPlaceholder')}
          className={inputClass}
        />
        <select
          value={filters.type}
          onChange={(event) =>
            setFilters({
              ...filters,
              type: event.target.value as TransactionType | 'all',
              categoryId: 'all',
            })
          }
          aria-label={t('transactions.filterType')}
          className={inputClass}
        >
          <option value="all">{t('transactions.allTypes')}</option>
          <option value="income">{t('transactions.income')}</option>
          <option value="expense">{t('transactions.expense')}</option>
        </select>
        <select
          value={filters.categoryId}
          onChange={(event) =>
            setFilters({ ...filters, categoryId: event.target.value as CategoryId | 'all' })
          }
          aria-label={t('transactions.filterCategory')}
          className={inputClass}
        >
          <option value="all">{t('transactions.allCategories')}</option>
          {filters.type !== 'income' && (
            <optgroup label={t('transactions.expense')}>
              {expenseCategories.map((id) => (
                <option key={id} value={id}>
                  {t(`categories.${id}`)}
                </option>
              ))}
            </optgroup>
          )}
          {filters.type !== 'expense' && (
            <optgroup label={t('transactions.income')}>
              {incomeCategories.map((id) => (
                <option key={id} value={id}>
                  {t(`categories.${id}`)}
                </option>
              ))}
            </optgroup>
          )}
        </select>
        <select
          value={filters.month}
          onChange={(event) => setFilters({ ...filters, month: event.target.value })}
          aria-label={t('transactions.filterMonth')}
          className={inputClass}
        >
          <option value="all">{t('transactions.allMonths')}</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {formatMonthKey(month, i18n.language)}
            </option>
          ))}
        </select>
      </div>

      <dl className="mb-6 grid grid-cols-3 gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-sm">
        <div>
          <dt className="text-slate-400">{t('transactions.income')}</dt>
          <dd className="mt-1 font-semibold text-emerald-400">{money(summary.income)}</dd>
        </div>
        <div>
          <dt className="text-slate-400">{t('transactions.expense')}</dt>
          <dd className="mt-1 font-semibold">{money(summary.expense)}</dd>
        </div>
        <div>
          <dt className="text-slate-400">{t('transactions.net')}</dt>
          <dd
            className={`mt-1 font-semibold ${summary.balance < 0 ? 'text-rose-400' : 'text-slate-100'}`}
          >
            {money(summary.balance)}
          </dd>
        </div>
      </dl>

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-800 p-10 text-center text-slate-400">
          {transactions.length === 0 ? t('transactions.emptyAll') : t('transactions.empty')}
        </div>
      ) : (
        <ul className="space-y-3">
          {visible.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              onEdit={(item) => setDialog({ type: 'edit', transaction: item })}
              onDelete={(item) => setDialog({ type: 'delete', transaction: item })}
            />
          ))}
        </ul>
      )}

      <TransactionDialogs dialog={dialog} onClose={() => setDialog(null)} />
    </div>
  )
}
