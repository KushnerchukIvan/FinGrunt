import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useTranslation } from 'react-i18next'
import { useMoney } from '../../hooks'
import type { GrowthPoint } from '../../utils/calculators'
import { axisTick, tooltipStyle } from './chartStyles'

type GrowthChartProps = {
  data: GrowthPoint[]
}

export default function GrowthChart({ data }: GrowthChartProps) {
  const { t, i18n } = useTranslation()
  const money = useMoney()

  return (
    <div role="img" aria-label={t('tools.compound.chartAria')} className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#1e293b" vertical={false} />
          <XAxis dataKey="year" tick={axisTick} axisLine={false} tickLine={false} />
          <YAxis
            tick={axisTick}
            axisLine={false}
            tickLine={false}
            width={56}
            tickFormatter={(value) => new Intl.NumberFormat(i18n.language, { notation: 'compact' }).format(value)}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelFormatter={(year) => t('tools.compound.yearLabel', { year })}
            formatter={(value) => money(Number(value))}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
          <Line
            type="monotone"
            dataKey="balance"
            name={t('tools.compound.balance')}
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="contributed"
            name={t('tools.compound.contributed')}
            stroke="#64748b"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
