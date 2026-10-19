import { useMemo } from 'react'
import type { Task } from '../../../types'
import { useTasks } from './useTasks'

export function useProjectTasks(projectId: string | undefined): {
  data: Task[]
  isLoading: boolean
  isError: boolean
} {
  const { data: tasks, isLoading, isError } = useTasks()
  const data = useMemo(
    () => tasks.filter((task) => task.projectId === projectId),
    [tasks, projectId],
  )
  return { data, isLoading, isError }
}
