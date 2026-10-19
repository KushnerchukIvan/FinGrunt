import { useDemoStore } from '../../../stores/demoStore'
import type { Task } from '../../../types'

export function useTasks(): {
  data: Task[]
  isLoading: boolean
  isError: boolean
} {
  const data = useDemoStore((state) => state.tasks)
  return { data, isLoading: false, isError: false }
}
