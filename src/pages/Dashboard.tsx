import { useMemo } from 'react'
import { ArrowRight, Percent, TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import CategoryPieChart from '../components/charts/CategoryPieChart'
import MonthlyBarChart from '../components/charts/MonthlyBarChart'
import InsightsList from '../components/InsightsList'
import StatCard from '../components/StatCard'
import TransactionRow from '../components/TransactionRow'
import ProgressBar from '../components/ui/ProgressBar'
import { lessons } from '../content/lessons'
import { useBudgets } from '../features/budgets/hooks'
import { useLessonProgress } from '../features/learn/hooks'
import { useTransactions } from '../features/transactions/hooks'
import { useLanguage, useMoney } from '../hooks'
import { getBudgetStatuses } from '../utils/budgets'
import { currentMonthKey, formatMonthKey, lastMonthKeys } from '../utils/date'
import { getInsights } from '../utils/insights'
import { formatPercent } from '../utils/money'
import {
  expensesByCategory,
  monthlySeries,
  sortTransactions,
  summarize,
  transactionsInMonth,
} from '../utils/transactions'

const cardClass = 'rounded-2xl border border-slate-800 bg-slate-900/50 p-5'

export default function Dashboard() {
  const { t, i18n } = useTranslation()
  const money = useMoney()
  const language = useLanguage()
  const { data: transactions } = useTransactions()
  const { data: budgets } = useBudgets()
  const { data: progress } = useLessonProgress()

  const monthKey = currentMonthKey()

  const overview = useMemo(() => {
    const monthSummary = summarize(transactionsInMonth(transactions, monthKey))
    return {
      total: summarize(transactions),
      month: monthSummary,
      categories: expensesByCategory(transactions, monthKey),
      series: monthlySeries(transactions, lastMonthKeys(6)),
      insights: getInsights(transactions, budgets, monthKey),
      budgetStatuses: getBudgetStatuses(budgets, transactions, monthKey)
        .filter((status) => status.limit !== null)
        .sort((a, b) => (b.ratio ?? 0) - (a.ratio ?? 0))
        .slice(0, 3),
      recent: sortTransactions(transactions).slice(0, 5),
    }
  }, [transactions, budgets, monthKey])

  const completedLessons = lessons.filter((lesson) => progress[lesson.id]?.completed).length
  const nextLesson = lessons.find((lesson) => !progress[lesson.id]?.completed)
  const monthLabel = formatMonthKey(monthKey, i18n.language)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('navigation.dashboard')}</h1>
        <p className="mt-1 text-sm text-slate-400">{t('dashboard.subtitle')}</p>
      </div>

      <section
        aria-label={t('dashboard.overview')}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          title={t('dashboard.stats.balance')}
          value={money(overview.total.balance)}
          caption={t('dashboard.captions.allTime')}
          icon={Wallet}
          color="violet"
        />
        <StatCard
          title={t('dashboard.stats.income')}
          value={money(overview.month.income)}
          caption={monthLabel}
          icon={TrendingUp}
          color="emerald"
        />
        <StatCard
          title={t('dashboard.stats.expenses')}
          value={money(overview.month.expense)}
          caption={monthLabel}
          icon={TrendingDown}
          color="rose"
        />
        <StatCard
          title={t('dashboard.stats.savingsRate')}
          value={
            overview.month.savingsRate === null
              ? '—'
              : formatPercent(overview.month.savingsRate, i18n.language)
          }
          caption={t('dashboard.captions.savingsGoal')}
          icon={Percent}
          color="blue"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className={cardClass}>
          <h2 className="mb-4 text-lg font-semibold">{t('dashboard.charts.categories')}</h2>
          {overview.categories.length === 0 ? (
            <p className="text-sm text-slate-400">{t('dashboard.charts.noExpenses')}</p>
          ) : (
            <CategoryPieChart data={overview.categories} />
          )}
        </div>
        <div className={cardClass}>
          <h2 className="mb-4 text-lg font-semibold">{t('dashboard.charts.monthly')}</h2>
          <MonthlyBarChart data={overview.series} />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className={cardClass}>
          <h2 className="mb-4 text-lg font-semibold">{t('dashboard.insights')}</h2>
          <InsightsList insights={overview.insights} />
        </div>

        <div className={cardClass}>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">{t('dashboard.budgets')}</h2>
            <Link to="/budgets" className="text-sm text-emerald-400 hover:text-emerald-300">
              {t('dashboard.manage')}
            </Link>
          </div>
          {overview.budgetStatuses.length === 0 ? (
            <p className="text-sm text-slate-400">{t('dashboard.noBudgets')}</p>
          ) : (
            <ul className="space-y-4">
              {overview.budgetStatuses.map((status) => (
                <li key={status.categoryId}>
                  <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                    <span>{t(`categories.${status.categoryId}`)}</span>
                    <span className="text-slate-400">
                      {money(status.spent)} / {money(status.limit ?? 0)}
                    </span>
                  </div>
                  <ProgressBar
                    percent={Math.min(100, Math.round((status.ratio ?? 0) * 100))}
                    barClass={
                      status.state === 'over'
                        ? 'bg-rose-500'
                        : status.state === 'warning'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                    }
                    label={t('budgets.progressLabel', { name: t(`categories.${status.categoryId}`) })}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={cardClass}>
          <h2 className="mb-4 text-lg font-semibold">{t('dashboard.learning')}</h2>
          <p className="mb-2 text-sm text-slate-400">
            {t('learn.progress', { done: completedLessons, total: lessons.length })}
          </p>
          <ProgressBar
            percent={Math.round((completedLessons / lessons.length) * 100)}
            barClass="bg-emerald-500"
            label={t('learn.progressLabel')}
          />
          {nextLesson ? (
            <Link
              to={`/learn/${nextLesson.id}`}
              className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-slate-800 p-4 transition hover:bg-slate-800"
            >
              <span className="min-w-0">
                <span className="block text-xs text-slate-500">{t('dashboard.nextLesson')}</span>
                <span className="mt-1 block truncate font-medium">
                  {nextLesson.content[language].title}
                </span>
              </span>
              <ArrowRight size={18} className="shrink-0 text-emerald-400" />
            </Link>
          ) : (
            <p className="mt-5 text-sm text-emerald-400">{t('dashboard.allLessonsDone')}</p>
          )}
        </div>
      </section>

      <section className={cardClass}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">{t('dashboard.recent')}</h2>
          <Link to="/transactions" className="text-sm text-emerald-400 hover:text-emerald-300">
            {t('dashboard.viewAll')}
          </Link>
        </div>
        {overview.recent.length === 0 ? (
          <p className="text-sm text-slate-400">{t('transactions.emptyAll')}</p>
        ) : (
          <ul className="space-y-3">
            {overview.recent.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
