import { useMemo } from 'react'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import TaskRow from '../components/TaskRow'
import ProgressBar from '../components/ui/ProgressBar'
import { useProject } from '../features/projects/hooks/useProject'
import { useProjectTasks } from '../features/tasks/hooks/useProjectTasks'
import { formatDateKey, toDateKey } from '../utils/date'
import { getProjectProgress } from '../utils/projectProgress'
import { accentStyle, projectStatusStyle } from '../utils/projectStyles'
import { sortTasksForList } from '../utils/taskUtils'

export default function ProjectDetails() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const { data: project } = useProject(id)
  const { data: tasks } = useProjectTasks(id)

  const sortedTasks = useMemo(() => sortTasksForList(tasks), [tasks])

  const backLink = (
    <Link
      to="/projects"
      className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
    >
      <ArrowLeft size={16} />
      {t('projectDetails.back')}
    </Link>
  )

  if (!project) {
    return (
      <div>
        {backLink}
        <div className="rounded-2xl border border-dashed border-slate-800 p-10 text-center">
          <h1 className="text-xl font-bold">{t('projectDetails.notFoundTitle')}</h1>
          <p className="mt-2 text-sm text-slate-400">
            {t('projectDetails.notFoundText')}
          </p>
        </div>
      </div>
    )
  }

  const accent = accentStyle[project.color]
  const progress = getProjectProgress(project.id, tasks)
  const isOverdue =
    project.status !== 'completed' && project.dueDate < toDateKey(new Date())

  return (
    <div>
      {backLink}

      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden="true"
              className={`h-3.5 w-3.5 shrink-0 rounded-full ${accent.dot}`}
            />
            <h1 className="min-w-0 break-words text-2xl font-bold">{project.name}</h1>
          </div>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium ${projectStatusStyle[project.status]}`}
          >
            {t(`projects.status.${project.status}`)}
          </span>
        </div>

        {project.description && (
          <p className="mt-3 text-slate-400">{project.description}</p>
        )}

        <div
          className={`mt-4 flex items-center gap-2 text-sm ${
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

        <div className="mt-6">
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
      </section>

      <section aria-labelledby="project-tasks-title" className="mt-8">
        <h2 id="project-tasks-title" className="mb-4 text-lg font-semibold">
          {t('projectDetails.tasksTitle')}
        </h2>

        {sortedTasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-800 p-10 text-center text-slate-400">
            {t('projectDetails.noTasks')}
          </div>
        ) : (
          <ul className="space-y-3">
            {sortedTasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
