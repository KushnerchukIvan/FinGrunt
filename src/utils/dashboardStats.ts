import type { Project, Task } from '../types'
import { toDateKey } from './date'

export type DashboardStats = {
  totalProjects: number
  activeProjects: number
  completedTasks: number
  overdueTasks: number
  projectsCreatedThisMonth: number
  tasksCompletedThisMonth: number
}

function isSameMonth(isoDate: string, reference: Date): boolean {
  const date = new Date(isoDate)
  return (
    date.getFullYear() === reference.getFullYear() &&
    date.getMonth() === reference.getMonth()
  )
}

export function getDashboardStats(
  projects: Project[],
  tasks: Task[],
  today: Date = new Date(),
): DashboardStats {
  const todayKey = toDateKey(today)

  const isOverdue = (task: Task) =>
    task.status !== 'done' && task.dueDate < todayKey

  const completedTasks = tasks.filter((task) => task.status === 'done')

  return {
    totalProjects: projects.length,
    activeProjects: projects.filter((p) => p.status === 'active').length,
    completedTasks: completedTasks.length,
    overdueTasks: tasks.filter(isOverdue).length,
    projectsCreatedThisMonth: projects.filter((p) =>
      isSameMonth(p.createdAt, today),
    ).length,
    tasksCompletedThisMonth: completedTasks.filter((task) =>
      isSameMonth(task.updatedAt, today),
    ).length,
  }
}
