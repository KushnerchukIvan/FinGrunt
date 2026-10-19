import { useDemoStore } from '../../../stores/demoStore'
import type { Project } from '../../../types'

export function useProject(id: string | undefined): {
  data: Project | undefined
  isLoading: boolean
  isError: boolean
} {
  const data = useDemoStore((state) =>
    state.projects.find((project) => project.id === id),
  )
  return { data, isLoading: false, isError: false }
}
