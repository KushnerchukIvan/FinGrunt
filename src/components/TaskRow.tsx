import { CalendarDays } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Task } from '../types'
import { formatDateKey } from '../utils/date'
import {
  isTaskOverdue,
  taskPriorityStyle,
  taskStatusStyle,
} from '../utils/taskUtils'

type TaskRowProps = {
  task: Task
}

export default function TaskRow({ task }: TaskRowProps) {
  const { t, i18n } = useTranslation()
  const isDone = task.status === 'done'
  const overdue = isTaskOverdue(task)

  return (
    <li className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3
          className={`min-w-0 font-semibold ${isDone ? 'text-slate-500 line-through' : ''}`}
        >
          {task.title}
        </h3>
        <div className="flex shrink-0 gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${taskPriorityStyle[task.priority]}`}
          >
            {t(`tasks.priority.${task.priority}`)}
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${taskStatusStyle[task.status]}`}
          >
            {t(`tasks.status.${task.status}`)}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="mt-2 line-clamp-2 text-sm text-slate-400">
          {task.description}
        </p>
      )}

      <div
        className={`mt-3 flex items-center gap-2 text-sm ${
          overdue ? 'text-rose-400' : 'text-slate-500'
        }`}
      >
        <CalendarDays size={16} />
        <span>
          {t('tasks.due', {
            date: formatDateKey(task.dueDate, i18n.language),
          })}
        </span>
      </div>
    </li>
  )
}
