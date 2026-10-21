import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import NumberField from '../ui/NumberField'
import ProgressBar from '../ui/ProgressBar'
import ResultCard from './ResultCard'
import { inputClass, labelClass } from '../ui/formStyles'
import { useMoney } from '../../hooks'
import { emergencyFund } from '../../utils/calculators'
import { parseNumber } from '../../utils/number'

const monthOptions = [3, 6, 9, 12]

export default function EmergencyFundCalculator() {
  const { t, i18n } = useTranslation()
  const money = useMoney()
  const [expenses, setExpenses] = useState('20000')
  const [months, setMonths] = useState('6')
  const [saved, setSaved] = useState('15000')

  const expensesValue = parseNumber(expenses)
  const savedValue = parseNumber(saved)
  const valid = expensesValue > 0 && savedValue >= 0

  const result = valid
    ? emergencyFund({ monthlyExpenses: expensesValue, months: Number(months), saved: savedValue })
    : null

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <p className="text-sm text-slate-400">{t('tools.emergency.description')}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField label={t('tools.emergency.expenses')} value={expenses} onChange={setExpenses} />
          <NumberField label={t('tools.emergency.saved')} value={saved} onChange={setSaved} />
          <div>
            <label htmlFor="emergency-months" className={labelClass}>
              {t('tools.emergency.months')}
            </label>
            <select
              id="emergency-months"
              value={months}
              onChange={(event) => setMonths(event.target.value)}
              className={inputClass}
            >
              {monthOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {result ? (
        <div className="space-y-4">
          <ResultCard
            title={t('tools.result')}
            rows={[
              { label: t('tools.emergency.target'), value: money(result.target), highlight: true },
              { label: t('tools.emergency.gap'), value: money(result.gap) },
              {
                label: t('tools.emergency.coverage'),
                value: t('tools.emergency.coverageValue', {
                  value: new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 1 }).format(
                    result.coverageMonths,
                  ),
                }),
              },
            ]}
          />
          <ProgressBar
            percent={Math.round(result.progress * 100)}
            barClass="bg-emerald-500"
            label={t('tools.emergency.progress')}
          />
        </div>
      ) : (
        <p role="status" className="text-sm text-amber-400">{t('tools.invalid')}</p>
      )}
    </div>
  )
}
