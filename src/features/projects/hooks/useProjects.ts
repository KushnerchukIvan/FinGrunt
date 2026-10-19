import { useDemoStore } from '../../../stores/demoStore'
import type { Project } from '../../../types'

export function useProjects(): {
  data: Project[]
  isLoading: boolean
  isError: boolean
} {
  const data = useDemoStore((state) => state.projects)
  return { data, isLoading: false, isError: false }
}
