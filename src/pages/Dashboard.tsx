import { useMemo } from 'react'
import { Activity, AlarmClock, CircleCheck, FolderKanban } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import StatCard from '../components/StatCard'
import { useProjects } from '../features/projects/hooks/useProjects'
import { useTasks } from '../features/tasks/hooks/useTasks'
import { getDashboardStats } from '../utils/dashboardStats'

export default function Dashboard() {
  const { t } = useTranslation()
  const { data: projects } = useProjects()
  const { data: tasks } = useTasks()

  const stats = useMemo(
    () => getDashboardStats(projects, tasks),
    [projects, tasks],
  )

  const cards = [
    {
      id: 'totalProjects',
      title: t('dashboard.stats.totalProjects'),
      value: stats.totalProjects,
      caption: t('dashboard.captions.createdThisMonth', {
        value: stats.projectsCreatedThisMonth,
      }),
      icon: FolderKanban,
      color: 'violet',
    },
    {
      id: 'activeProjects',
      title: t('dashboard.stats.activeProjects'),
      value: stats.activeProjects,
      caption: t('dashboard.captions.inProgress'),
      icon: Activity,
      color: 'blue',
    },
    {
      id: 'completedTasks',
      title: t('dashboard.stats.completedTasks'),
      value: stats.completedTasks,
      caption: t('dashboard.captions.completedThisMonth', {
        value: stats.tasksCompletedThisMonth,
      }),
      icon: CircleCheck,
      color: 'emerald',
    },
    {
      id: 'overdueTasks',
      title: t('dashboard.stats.overdueTasks'),
      value: stats.overdueTasks,
      caption:
        stats.overdueTasks > 0
          ? t('dashboard.captions.needsAttention')
          : t('dashboard.captions.allOnTrack'),
      icon: AlarmClock,
      color: 'rose',
    },
  ] as const

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('navigation.dashboard')}</h1>
        <p className="mt-1 text-sm text-slate-400">
          {t('dashboard.subtitle')}
        </p>
      </div>

      <section
        aria-label={t('dashboard.overview')}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {cards.map((card) => (
          <StatCard
            key={card.id}
            title={card.title}
            value={card.value}
            caption={card.caption}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </section>
    </div>
  )
}
