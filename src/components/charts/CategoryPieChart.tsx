import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useTranslation } from 'react-i18next'
import { categoryColor } from '../../constants/categories'
import { useMoney } from '../../hooks'
import type { CategoryTotal } from '../../utils/transactions'
import { formatPercent } from '../../utils/money'
import { tooltipStyle } from './chartStyles'

type CategoryPieChartProps = {
  data: CategoryTotal[]
}

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
  const { t, i18n } = useTranslation()
  const money = useMoney()
  const total = data.reduce((sum, item) => sum + item.total, 0)

  return (
    <div>
      <div role="img" aria-label={t('dashboard.charts.categoriesAria')} className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="categoryId"
              innerRadius="60%"
              outerRadius="90%"
              paddingAngle={2}
              stroke="none"
            >
              {data.map((item) => (
                <Cell key={item.categoryId} fill={categoryColor[item.categoryId]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
              itemStyle={{ color: '#f8fafc' }}
              formatter={(value, name) => [
                money(Number(value)),
                t(`categories.${String(name)}`),
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className="mt-4 space-y-2">
        {data.map((item) => (
          <li key={item.categoryId} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex min-w-0 items-center gap-2">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: categoryColor[item.categoryId] }}
              />
              <span className="truncate">{t(`categories.${item.categoryId}`)}</span>
            </span>
            <span className="shrink-0 text-slate-400">
              {money(item.total)} · {formatPercent(item.total / total, i18n.language)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
