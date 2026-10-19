import { currentUser } from '../../../mocks/data'
import type { ProjectFormValues } from '../../../schemas/projectSchema'
import { useDemoStore } from '../../../stores/demoStore'

export function useCreateProject() {
  const addProject = useDemoStore((state) => state.addProject)

  const mutate = (values: ProjectFormValues) => {
    addProject({
      id: crypto.randomUUID(),
      ownerId: currentUser.id,
      createdAt: new Date().toISOString(),
      ...values,
    })
  }

  return { mutate, isPending: false }
}
