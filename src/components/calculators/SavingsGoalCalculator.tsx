import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import NumberField from '../ui/NumberField'
import ResultCard from './ResultCard'
import { useMoney } from '../../hooks'
import { monthsToGoal, requiredMonthly } from '../../utils/calculators'
import { parseNumber } from '../../utils/number'

export default function SavingsGoalCalculator() {
  const { t } = useTranslation()
  const money = useMoney()
  const [goal, setGoal] = useState('100000')
  const [saved, setSaved] = useState('10000')
  const [monthly, setMonthly] = useState('5000')
  const [rate, setRate] = useState('0')
  const [targetMonths, setTargetMonths] = useState('12')

  const goalValue = parseNumber(goal)
  const savedValue = parseNumber(saved)
  const monthlyValue = parseNumber(monthly)
  const rateValue = parseNumber(rate)
  const targetValue = parseNumber(targetMonths)

  const valid =
    goalValue > 0 &&
    savedValue >= 0 &&
    monthlyValue >= 0 &&
    rateValue >= 0 &&
    rateValue <= 100

  const months = valid
    ? monthsToGoal({ goal: goalValue, saved: savedValue, monthly: monthlyValue, annualRate: rateValue })
    : null
  const required =
    valid && Number.isInteger(targetValue) && targetValue > 0
      ? requiredMonthly({ goal: goalValue, saved: savedValue, months: targetValue, annualRate: rateValue })
      : null

  const duration =
    months === null
      ? t('tools.savingsGoal.unreachable')
      : months === 0
        ? t('tools.savingsGoal.reached')
        : t('tools.duration', { years: Math.floor(months / 12), months: months % 12 })

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField label={t('tools.savingsGoal.goal')} value={goal} onChange={setGoal} />
        <NumberField label={t('tools.savingsGoal.saved')} value={saved} onChange={setSaved} />
        <NumberField label={t('tools.savingsGoal.monthly')} value={monthly} onChange={setMonthly} />
        <NumberField label={t('tools.annualRate')} value={rate} onChange={setRate} suffix="%" />
        <NumberField
          label={t('tools.savingsGoal.targetMonths')}
          value={targetMonths}
          onChange={setTargetMonths}
          step="1"
        />
      </div>
      {valid ? (
        <ResultCard
          title={t('tools.result')}
          rows={[
            { label: t('tools.savingsGoal.timeNeeded'), value: duration, highlight: true },
            ...(required !== null
              ? [
                  {
                    label: t('tools.savingsGoal.requiredMonthly', { months: targetValue }),
                    value: money(required),
                  },
                ]
              : []),
          ]}
        />
      ) : (
        <p role="status" className="text-sm text-amber-400">{t('tools.invalid')}</p>
      )}
    </div>
  )
}
