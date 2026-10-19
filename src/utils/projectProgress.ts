import type { Task } from '../types'

export type ProjectProgress = {
  total: number
  done: number
  percent: number
}

export function getProjectProgress(
  projectId: string,
  tasks: Task[],
): ProjectProgress {
  const projectTasks = tasks.filter((task) => task.projectId === projectId)
  const done = projectTasks.filter((task) => task.status === 'done').length
  const total = projectTasks.length

  return {
    total,
    done,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
  }
}
