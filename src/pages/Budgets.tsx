import { useMemo, useState } from 'react'
import { Pencil, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Modal from '../components/ui/Modal'
import NumberField from '../components/ui/NumberField'
import ProgressBar from '../components/ui/ProgressBar'
import {
  dangerButtonClass,
  iconButtonClass,
  primaryButtonClass,
  secondaryButtonClass,
} from '../components/ui/formStyles'
import { categoryColor, type ExpenseCategoryId } from '../constants/categories'
import { useBudgets, useSetBudget } from '../features/budgets/hooks'
import { useTransactions } from '../features/transactions/hooks'
import { useMoney } from '../hooks'
import { budgetTotals, getBudgetStatuses, type BudgetState } from '../utils/budgets'
import { currentMonthKey, formatMonthKey } from '../utils/date'
import { formatPercent } from '../utils/money'
import { parseNumber } from '../utils/number'

const barStyle: Record<BudgetState, string> = {
  ok: 'bg-emerald-500',
  warning: 'bg-amber-500',
  over: 'bg-rose-500',
}

export default function Budgets() {
  const { t, i18n } = useTranslation()
  const money = useMoney()
  const { data: budgets } = useBudgets()
  const { data: transactions } = useTransactions()
  const { mutate: setBudget } = useSetBudget()
  const [editing, setEditing] = useState<ExpenseCategoryId | null>(null)
  const [limitInput, setLimitInput] = useState('')
  const [error, setError] = useState(false)

  const monthKey = currentMonthKey()
  const statuses = useMemo(
    () => getBudgetStatuses(budgets, transactions, monthKey),
    [budgets, transactions, monthKey],
  )
  const totals = budgetTotals(statuses)

  const openDialog = (categoryId: ExpenseCategoryId, current: number | null) => {
    setEditing(categoryId)
    setLimitInput(current === null ? '' : String(current))
    setError(false)
  }

  const closeDialog = () => setEditing(null)

  const handleSave = () => {
    const value = parseNumber(limitInput)
    if (!Number.isFinite(value) || value <= 0) {
      setError(true)
      return
    }
    if (editing) setBudget({ categoryId: editing, limit: value })
    closeDialog()
  }

  const handleRemove = () => {
    if (editing) setBudget({ categoryId: editing, limit: null })
    closeDialog()
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('navigation.budgets')}</h1>
        <p className="mt-1 text-sm text-slate-400">
          {t('budgets.subtitle', { month: formatMonthKey(monthKey, i18n.language) })}
        </p>
      </div>

      <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
        {totals.count === 0 ? (
          <p className="text-sm text-slate-400">{t('budgets.noLimits')}</p>
        ) : (
          <>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-slate-400">
                {t('budgets.totalSummary', {
                  spent: money(totals.spent),
                  limit: money(totals.limit),
                })}
              </span>
              <span className="font-medium">
                {formatPercent(totals.limit > 0 ? totals.spent / totals.limit : 0, i18n.language)}
              </span>
            </div>
            <ProgressBar
              percent={Math.min(100, Math.round((totals.spent / totals.limit) * 100))}
              barClass={totals.spent > totals.limit ? 'bg-rose-500' : 'bg-emerald-500'}
              label={t('budgets.totalLabel')}
            />
          </>
        )}
      </section>

      <ul className="space-y-3">
        {statuses.map((status) => (
          <li
            key={status.categoryId}
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: categoryColor[status.categoryId] }}
                />
                <h3 className="truncate font-semibold">{t(`categories.${status.categoryId}`)}</h3>
              </div>
              {status.limit === null ? (
                <button
                  type="button"
                  onClick={() => openDialog(status.categoryId, null)}
                  aria-label={t('budgets.setLimitFor', { name: t(`categories.${status.categoryId}`) })}
                  className={secondaryButtonClass}
                >
                  <Plus size={16} />
                  {t('budgets.setLimit')}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => openDialog(status.categoryId, status.limit)}
                  aria-label={t('budgets.editLimitFor', { name: t(`categories.${status.categoryId}`) })}
                  className={iconButtonClass}
                >
                  <Pencil size={16} />
                </button>
              )}
            </div>

            {status.limit === null || status.state === null ? (
              <p className="mt-3 text-sm text-slate-500">
                {t('budgets.noLimitSpent', { spent: money(status.spent) })}
              </p>
            ) : (
              <div className="mt-3">
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className="text-slate-400">
                    {t('budgets.spentOf', { spent: money(status.spent), limit: money(status.limit) })}
                  </span>
                  <span
                    className={
                      status.state === 'over'
                        ? 'font-medium text-rose-400'
                        : status.state === 'warning'
                          ? 'font-medium text-amber-400'
                          : 'text-slate-400'
                    }
                  >
                    {status.remaining !== null && status.remaining < 0
                      ? t('budgets.over', { amount: money(Math.abs(status.remaining)) })
                      : t('budgets.left', { amount: money(status.remaining ?? 0) })}
                  </span>
                </div>
                <ProgressBar
                  percent={Math.min(100, Math.round((status.ratio ?? 0) * 100))}
                  barClass={barStyle[status.state]}
                  label={t('budgets.progressLabel', { name: t(`categories.${status.categoryId}`) })}
                />
              </div>
            )}
          </li>
        ))}
      </ul>

      <Modal
        open={editing !== null}
        title={
          editing
            ? t('budgets.dialogTitle', { name: t(`categories.${editing}`) })
            : t('budgets.setLimit')
        }
        closeLabel={t('common.close')}
        onClose={closeDialog}
      >
        <div className="space-y-4">
          <NumberField
            label={t('budgets.limitLabel')}
            value={limitInput}
            onChange={(value) => {
              setLimitInput(value)
              setError(false)
            }}
          />
          {error && (
            <p role="alert" className="text-xs text-rose-400">
              {t('budgets.invalidLimit')}
            </p>
          )}
          <div className="flex flex-wrap justify-end gap-3 pt-2">
            {editing && budgets[editing] !== undefined && (
              <button type="button" onClick={handleRemove} className={dangerButtonClass}>
                {t('budgets.removeLimit')}
              </button>
            )}
            <button type="button" onClick={closeDialog} className={secondaryButtonClass}>
              {t('confirm.cancel')}
            </button>
            <button type="button" onClick={handleSave} className={primaryButtonClass}>
              {t('budgets.save')}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
