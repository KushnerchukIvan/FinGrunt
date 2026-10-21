import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import NumberField from '../ui/NumberField'
import ResultCard from './ResultCard'
import { useMoney } from '../../hooks'
import { loanPayment } from '../../utils/calculators'
import { formatPercent } from '../../utils/money'
import { parseNumber } from '../../utils/number'

export default function LoanCalculator() {
  const { t, i18n } = useTranslation()
  const money = useMoney()
  const [principal, setPrincipal] = useState('100000')
  const [rate, setRate] = useState('24')
  const [months, setMonths] = useState('12')

  const principalValue = parseNumber(principal)
  const rateValue = parseNumber(rate)
  const monthsValue = parseNumber(months)

  const valid =
    principalValue > 0 &&
    rateValue >= 0 &&
    rateValue <= 300 &&
    Number.isInteger(monthsValue) &&
    monthsValue >= 1 &&
    monthsValue <= 600

  const result = valid
    ? loanPayment({ principal: principalValue, annualRate: rateValue, months: monthsValue })
    : null

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <p className="text-sm text-slate-400">{t('tools.loan.description')}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField label={t('tools.loan.principal')} value={principal} onChange={setPrincipal} />
          <NumberField label={t('tools.annualRate')} value={rate} onChange={setRate} suffix="%" />
          <NumberField label={t('tools.loan.months')} value={months} onChange={setMonths} step="1" />
        </div>
      </div>
      {result ? (
        <ResultCard
          title={t('tools.result')}
          rows={[
            { label: t('tools.loan.monthly'), value: money(result.monthly), highlight: true },
            { label: t('tools.loan.total'), value: money(result.total) },
            { label: t('tools.loan.overpayment'), value: money(result.overpayment) },
            {
              label: t('tools.loan.overpaymentShare'),
              value: formatPercent(result.overpayment / principalValue, i18n.language),
            },
          ]}
        />
      ) : (
        <p role="status" className="text-sm text-amber-400">{t('tools.invalid')}</p>
      )}
    </div>
  )
}
