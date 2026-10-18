import {
  LayoutDashboard,
  ArrowLeftRight,
  ChartNoAxesCombined,
  Wallet,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router'

const navItems = [
  { key: 'navigation.dashboard', path: '/', icon: LayoutDashboard },
  { key: 'navigation.transactions', path: '/transactions', icon: ArrowLeftRight },
  { key: 'navigation.analytics', path: '/analytics', icon: ChartNoAxesCombined },
  { key: 'navigation.budgets', path: '/budgets', icon: Wallet },
]
export default function Sidebar(){
    const { t } = useTranslation()
    const location = useLocation()
    return (
        <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 p-5 text-white">
            <h1 className="mb-10 text-2xl font-bold">
                Mone<span className="text-emerald-400">trix</span>
            </h1>

            <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path

                return (
                    <Link
                    key={item.key}
                    to={item.path}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                        isActive
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                    }`}
                    >
                    <Icon size={20} strokeWidth={1.8} />
                    <span className="font-medium">{t(item.key)}</span>
                    </Link>
                )
                })}
            </nav>

            <div className="mt-auto rounded-xl bg-slate-900 p-4">
                <p className="text-sm font-medium">Pro tip</p>
                <p className="mt-2 text-xs leading-5 text-slate-400">
                    Track your expenses daily to reach your financial goals.
                </p>
            </div>
        </aside>
    )
}