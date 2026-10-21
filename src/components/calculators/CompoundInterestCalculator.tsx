import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import GrowthChart from '../charts/GrowthChart'
import NumberField from '../ui/NumberField'
import ResultCard from './ResultCard'
import { useMoney } from '../../hooks'
import { compoundGrowth } from '../../utils/calculators'
import { parseNumber } from '../../utils/number'

export default function CompoundInterestCalculator() {
  const { t } = useTranslation()
  const money = useMoney()
  const [initial, setInitial] = useState('10000')
  const [monthly, setMonthly] = useState('2000')
  const [rate, setRate] = useState('8')
  const [years, setYears] = useState('10')

  const initialValue = parseNumber(initial)
  const monthlyValue = parseNumber(monthly)
  const rateValue = parseNumber(rate)
  const yearsValue = parseNumber(years)

  const valid =
    initialValue >= 0 &&
    monthlyValue >= 0 &&
    rateValue >= 0 &&
    rateValue <= 100 &&
    Number.isInteger(yearsValue) &&
    yearsValue >= 1 &&
    yearsValue <= 60

  const result = valid
    ? compoundGrowth({
        initial: initialValue,
        monthly: monthlyValue,
        annualRate: rateValue,
        years: yearsValue,
      })
    : null

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField label={t('tools.compound.initial')} value={initial} onChange={setInitial} />
          <NumberField label={t('tools.compound.monthly')} value={monthly} onChange={setMonthly} />
          <NumberField label={t('tools.annualRate')} value={rate} onChange={setRate} suffix="%" />
          <NumberField label={t('tools.compound.years')} value={years} onChange={setYears} step="1" />
        </div>
        {result ? (
          <ResultCard
            title={t('tools.result')}
            rows={[
              { label: t('tools.compound.final'), value: money(result.final), highlight: true },
              { label: t('tools.compound.contributed'), value: money(result.contributed) },
              { label: t('tools.compound.interest'), value: money(result.interest) },
            ]}
          />
        ) : (
          <p role="status" className="text-sm text-amber-400">{t('tools.invalid')}</p>
        )}
      </div>
      {result && <GrowthChart data={result.series} />}
    </div>
  )
}
