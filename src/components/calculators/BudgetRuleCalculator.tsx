import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import NumberField from '../ui/NumberField'
import ResultCard from './ResultCard'
import { useMoney } from '../../hooks'
import { splitBudget } from '../../utils/calculators'
import { parseNumber } from '../../utils/number'

export default function BudgetRuleCalculator() {
  const { t } = useTranslation()
  const money = useMoney()
  const [income, setIncome] = useState('30000')

  const value = parseNumber(income)
  const valid = Number.isFinite(value) && value > 0
  const split = valid ? splitBudget(value) : null

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <p className="text-sm text-slate-400">{t('tools.budgetRule.description')}</p>
        <NumberField label={t('tools.budgetRule.income')} value={income} onChange={setIncome} />
      </div>
      {split ? (
        <ResultCard
          title={t('tools.result')}
          rows={[
            { label: t('tools.budgetRule.needs'), value: money(split.needs) },
            { label: t('tools.budgetRule.wants'), value: money(split.wants) },
            { label: t('tools.budgetRule.savings'), value: money(split.savings), highlight: true },
          ]}
        />
      ) : (
        <p role="status" className="text-sm text-amber-400">{t('tools.invalid')}</p>
      )}
    </div>
  )
}
