import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import {
  errorClass,
  inputClass,
  labelClass,
  primaryButtonClass,
  secondaryButtonClass,
} from './ui/formStyles'
import { expenseCategories, incomeCategories } from '../constants/categories'
import {
  transactionSchema,
  type TransactionFormValues,
} from '../schemas/transactionSchema'
import { toDateKey } from '../utils/date'

type TransactionFormProps = {
  onSubmit: (values: TransactionFormValues) => void
  onCancel: () => void
  defaultValues?: Partial<TransactionFormValues>
  submitLabel: string
}

export default function TransactionForm({
  onSubmit,
  onCancel,
  defaultValues,
  submitLabel,
}: TransactionFormProps) {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'expense',
      note: '',
      date: toDateKey(new Date()),
      ...defaultValues,
    },
  })

  const type = useWatch({ control, name: 'type' })
  const categories = type === 'income' ? incomeCategories : expenseCategories
  const errorText = (message?: string) => (message ? t(message) : null)

  const typeRegistration = register('type', {
    onChange: () => {
      const current: string = getValues('categoryId') ?? ''
      const nextType = getValues('type')
      const allowed: readonly string[] =
        nextType === 'income' ? incomeCategories : expenseCategories
      if (!allowed.includes(current)) {
        setValue('categoryId', '' as TransactionFormValues['categoryId'])
      }
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <fieldset>
        <legend className={labelClass}>{t('transactions.form.type')}</legend>
        <div className="grid grid-cols-2 gap-2">
          {(['expense', 'income'] as const).map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                value={option}
                className="peer sr-only"
                {...typeRegistration}
              />
              <span
                className={`block rounded-xl border px-4 py-2.5 text-center text-sm font-medium transition peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400 ${
                  type === option
                    ? option === 'income'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                      : 'border-rose-500 bg-rose-500/10 text-rose-400'
                    : 'border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {t(`transactions.${option}`)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="transaction-amount" className={labelClass}>
            {t('transactions.form.amount')}
          </label>
          <input
            id="transaction-amount"
            type="number"
            inputMode="decimal"
            step="any"
            min="0"
            aria-invalid={errors.amount ? true : undefined}
            aria-describedby={errors.amount ? 'transaction-amount-error' : undefined}
            className={inputClass}
            {...register('amount', { valueAsNumber: true })}
          />
          {errors.amount && (
            <p id="transaction-amount-error" role="alert" className={errorClass}>
              {errorText(errors.amount.message)}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="transaction-date" className={labelClass}>
            {t('transactions.form.date')}
          </label>
          <input
            id="transaction-date"
            type="date"
            aria-invalid={errors.date ? true : undefined}
            aria-describedby={errors.date ? 'transaction-date-error' : undefined}
            className={inputClass}
            {...register('date')}
          />
          {errors.date && (
            <p id="transaction-date-error" role="alert" className={errorClass}>
              {errorText(errors.date.message)}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="transaction-category" className={labelClass}>
          {t('transactions.form.category')}
        </label>
        <select
          id="transaction-category"
          aria-invalid={errors.categoryId ? true : undefined}
          aria-describedby={errors.categoryId ? 'transaction-category-error' : undefined}
          className={inputClass}
          {...register('categoryId')}
        >
          <option value="">{t('transactions.form.categoryPlaceholder')}</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {t(`categories.${category}`)}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p id="transaction-category-error" role="alert" className={errorClass}>
            {errorText(errors.categoryId.message)}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="transaction-note" className={labelClass}>
          {t('transactions.form.note')}
        </label>
        <input
          id="transaction-note"
          type="text"
          autoComplete="off"
          placeholder={t('transactions.form.notePlaceholder')}
          aria-invalid={errors.note ? true : undefined}
          aria-describedby={errors.note ? 'transaction-note-error' : undefined}
          className={inputClass}
          {...register('note')}
        />
        {errors.note && (
          <p id="transaction-note-error" role="alert" className={errorClass}>
            {errorText(errors.note.message)}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className={secondaryButtonClass}>
          {t('confirm.cancel')}
        </button>
        <button type="submit" className={primaryButtonClass}>
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
