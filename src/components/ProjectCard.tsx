import { CalendarDays } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import type { Project } from '../types'
import { formatDateKey, toDateKey } from '../utils/date'
import type { ProjectProgress } from '../utils/projectProgress'
import { accentStyle, projectStatusStyle } from '../utils/projectStyles'
import ProgressBar from './ui/ProgressBar'

type ProjectCardProps = {
  project: Project
  progress: ProjectProgress
}

export default function ProjectCard({ project, progress }: ProjectCardProps) {
  const { t, i18n } = useTranslation()
  const accent = accentStyle[project.color]
  const isOverdue =
    project.status !== 'completed' && project.dueDate < toDateKey(new Date())

  return (
    <article className="relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-slate-700 hover:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className={`h-3 w-3 shrink-0 rounded-full ${accent.dot}`}
          />
          <h3 className="truncate text-lg font-semibold">
            <Link
              to={`/projects/${project.id}`}
              className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-emerald-400"
            >
              {project.name}
            </Link>
          </h3>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${projectStatusStyle[project.status]}`}
        >
          {t(`projects.status.${project.status}`)}
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-slate-400">
        {project.description}
      </p>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-400">
            {progress.total === 0
              ? t('projects.noTasks')
              : t('projects.tasksDone', {
                  done: progress.done,
                  total: progress.total,
                })}
          </span>
          <span className="font-medium">{progress.percent}%</span>
        </div>
        <ProgressBar
          percent={progress.percent}
          barClass={accent.bar}
          label={t('projects.progress')}
        />
      </div>

      <div
        className={`mt-5 flex items-center gap-2 text-sm ${
          isOverdue ? 'text-rose-400' : 'text-slate-500'
        }`}
      >
        <CalendarDays size={16} />
        <span>
          {t('projects.due', {
            date: formatDateKey(project.dueDate, i18n.language),
          })}
        </span>
      </div>
    </article>
  )
}
