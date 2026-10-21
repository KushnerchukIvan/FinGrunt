import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import NumberField from '../ui/NumberField'
import ResultCard from './ResultCard'
import { useMoney } from '../../hooks'
import { inflationImpact } from '../../utils/calculators'
import { formatPercent } from '../../utils/money'
import { parseNumber } from '../../utils/number'

export default function InflationCalculator() {
  const { t, i18n } = useTranslation()
  const money = useMoney()
  const [amount, setAmount] = useState('100000')
  const [inflation, setInflation] = useState('10')
  const [years, setYears] = useState('5')

  const amountValue = parseNumber(amount)
  const inflationValue = parseNumber(inflation)
  const yearsValue = parseNumber(years)

  const valid =
    amountValue > 0 &&
    inflationValue >= 0 &&
    inflationValue <= 200 &&
    Number.isInteger(yearsValue) &&
    yearsValue >= 1 &&
    yearsValue <= 60

  const result = valid
    ? inflationImpact({ amount: amountValue, annualInflation: inflationValue, years: yearsValue })
    : null

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <p className="text-sm text-slate-400">{t('tools.inflation.description')}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField label={t('tools.inflation.amount')} value={amount} onChange={setAmount} />
          <NumberField label={t('tools.inflation.rate')} value={inflation} onChange={setInflation} suffix="%" />
          <NumberField label={t('tools.inflation.years')} value={years} onChange={setYears} step="1" />
        </div>
      </div>
      {result ? (
        <ResultCard
          title={t('tools.result')}
          rows={[
            {
              label: t('tools.inflation.purchasingPower'),
              value: money(result.purchasingPower),
              highlight: true,
            },
            {
              label: t('tools.inflation.lostShare'),
              value: formatPercent(result.lostShare, i18n.language),
            },
            { label: t('tools.inflation.futurePrice'), value: money(result.futurePrice) },
          ]}
        />
      ) : (
        <p role="status" className="text-sm text-amber-400">{t('tools.invalid')}</p>
      )}
    </div>
  )
}
