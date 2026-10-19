import type { Task, TaskPriority, TaskStatus } from '../types'
import { toDateKey } from './date'

export const taskStatusStyle: Record<TaskStatus, string> = {
  todo: 'bg-slate-500/10 text-slate-400',
  in_progress: 'bg-blue-500/10 text-blue-400',
  done: 'bg-emerald-500/10 text-emerald-400',
}

export const taskPriorityStyle: Record<TaskPriority, string> = {
  low: 'bg-slate-500/10 text-slate-400',
  medium: 'bg-amber-500/10 text-amber-400',
  high: 'bg-rose-500/10 text-rose-400',
}

export function isTaskOverdue(task: Task, today: Date = new Date()): boolean {
  return task.status !== 'done' && task.dueDate < toDateKey(today)
}

export function sortTasksForList(tasks: Task[]): Task[] {
  return [...tasks].sort(
    (a, b) =>
      Number(a.status === 'done') - Number(b.status === 'done') ||
      a.dueDate.localeCompare(b.dueDate),
  )
}
