import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useTranslation } from 'react-i18next'
import { useMoney } from '../../hooks'
import { formatMonthKey } from '../../utils/date'
import type { MonthlyPoint } from '../../utils/transactions'
import { axisTick, tooltipStyle } from './chartStyles'

type MonthlyBarChartProps = {
  data: MonthlyPoint[]
}

export default function MonthlyBarChart({ data }: MonthlyBarChartProps) {
  const { t, i18n } = useTranslation()
  const money = useMoney()

  const chartData = data.map((point) => ({
    ...point,
    label: formatMonthKey(point.month, i18n.language, 'short'),
  }))

  return (
    <div role="img" aria-label={t('dashboard.charts.monthlyAria')} className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#1e293b" vertical={false} />
          <XAxis dataKey="label" tick={axisTick} axisLine={false} tickLine={false} />
          <YAxis
            tick={axisTick}
            axisLine={false}
            tickLine={false}
            width={48}
            tickFormatter={(value) => new Intl.NumberFormat(i18n.language, { notation: 'compact' }).format(value)}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ fill: '#1e293b55' }}
            formatter={(value) => money(Number(value))}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
          <Bar
            dataKey="income"
            name={t('dashboard.stats.income')}
            fill="#10b981"
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="expense"
            name={t('dashboard.stats.expenses')}
            fill="#f43f5e"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
