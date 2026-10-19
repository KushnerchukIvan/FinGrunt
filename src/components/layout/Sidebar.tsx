import {
  LayoutDashboard,
  FolderKanban,
  ListChecks,
  CalendarDays,
  ChartNoAxesCombined,
  Settings,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'

const navItems = [
  { key: 'navigation.dashboard', path: '/', icon: LayoutDashboard },
  { key: 'navigation.projects', path: '/projects', icon: FolderKanban },
  { key: 'navigation.tasks', path: '/tasks', icon: ListChecks },
  { key: 'navigation.calendar', path: '/calendar', icon: CalendarDays },
  { key: 'navigation.analytics', path: '/analytics', icon: ChartNoAxesCombined },
  { key: 'navigation.settings', path: '/settings', icon: Settings },
]

export default function Sidebar() {
  const { t } = useTranslation()

  return (
    <aside className="sticky top-0 flex h-dvh w-16 shrink-0 flex-col border-r border-slate-800 bg-slate-950 p-2 text-white md:w-64 md:p-5">
      <h1 className="mb-8 hidden text-2xl font-bold md:mb-10 md:block">
        Fin<span className="text-emerald-400">Grunt</span>
      </h1>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.key}
              to={item.path}
              end={item.path === '/'}
              title={t(item.key)}
              aria-label={t(item.key)}
              className={({ isActive }) =>
                `flex items-center justify-center gap-3 rounded-xl px-2 py-3 transition md:justify-start md:px-4 ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`
              }
            >
              <Icon size={20} strokeWidth={1.8} />
              <span className="hidden font-medium md:inline">{t(item.key)}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-auto hidden rounded-xl bg-slate-900 p-4 md:block">
        <p className="text-sm font-medium">{t('paragraph.proTip')}</p>
        <p className="mt-2 text-xs leading-5 text-slate-400">
          {t('paragraph.breakBigProjectsIntoSmallTasks')}
        </p>
      </div>
    </aside>
  )
}
