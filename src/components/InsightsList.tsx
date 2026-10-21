import { CircleCheck, Info, Lightbulb, TriangleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { useMoney } from '../hooks'
import type { Insight, InsightTone } from '../utils/insights'
import { formatPercent } from '../utils/money'

type InsightsListProps = {
  insights: Insight[]
}

const toneStyle: Record<InsightTone, { icon: typeof Info; className: string }> = {
  warning: { icon: TriangleAlert, className: 'bg-amber-500/10 text-amber-400' },
  tip: { icon: Lightbulb, className: 'bg-blue-500/10 text-blue-400' },
  success: { icon: CircleCheck, className: 'bg-emerald-500/10 text-emerald-400' },
  info: { icon: Info, className: 'bg-slate-500/10 text-slate-400' },
}

export default function InsightsList({ insights }: InsightsListProps) {
  const { t, i18n } = useTranslation()
  const money = useMoney()

  return (
    <ul className="space-y-3">
      {insights.map((insight) => {
        const { icon: Icon, className } = toneStyle[insight.tone]
        const params = insight.params ?? {}

        return (
          <li key={insight.id} className="flex items-start gap-3">
            <span className={`mt-0.5 shrink-0 rounded-lg p-1.5 ${className}`}>
              <Icon size={16} />
            </span>
            <div className="min-w-0 text-sm">
              <p className="text-slate-200">
                {t(insight.messageKey, {
                  category: params.categoryId ? t(`categories.${params.categoryId}`) : '',
                  spent: params.spent !== undefined ? money(params.spent) : '',
                  limit: params.limit !== undefined ? money(params.limit) : '',
                  amount: params.amount !== undefined ? money(params.amount) : '',
                  rate: params.rate !== undefined ? formatPercent(params.rate, i18n.language) : '',
                  share: params.share !== undefined ? formatPercent(params.share, i18n.language) : '',
                })}
              </p>
              {insight.lessonId && (
                <Link
                  to={`/learn/${insight.lessonId}`}
                  className="mt-1 inline-block text-emerald-400 transition hover:text-emerald-300"
                >
                  {t('insights.readLesson')}
                </Link>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
