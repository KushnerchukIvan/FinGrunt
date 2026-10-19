import { PiggyBank, TrendingDown, TrendingUp, Wallet } from "lucide-react"
import { useTranslation } from "react-i18next"
import StatCard from "../components/StatCard"

const stats = [
  {
    id: 'balance',
    title: 'Total Balance',
    amount: '$12,450.00',
    change: 8.2,
    icon: Wallet,
    color: 'emerald',
  },
  {
    id: 'income',
    title: 'Total Income',
    amount: '$5,240.00',
    change: 12.5,
    icon: TrendingUp,
    color: 'blue',
  },
  {
    id: 'expenses',
    title: 'Total Expenses',
    amount: '$2,840.00',
    change: -3.4,
    icon: TrendingDown,
    color: 'rose',
  },
  {
    id: 'savings',
    title: 'Total Savings',
    amount: '$2,400.00',
    change: 6.8,
    icon: PiggyBank,
    color: 'violet',
  },
] as const

export default function Dashboard() {
  const {t} = useTranslation()
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">
          {t('paragraph.HereIsWhatIsHappeningWithYourMoney')}
        </p>
      </div>
      <section
        aria-label={t('common.financialOverview')}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat) => (
          <StatCard 
            key={stat.id}
            title={stat.title}
            amount={stat.amount}
            change={stat.change}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </section>
    </div>
  )
}