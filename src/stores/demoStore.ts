import { create } from 'zustand'
import { projects as seedProjects, tasks as seedTasks } from '../mocks/data'
import type { Project, Task } from '../types'

type DemoState = {
  projects: Project[]
  tasks: Task[]
  addProject: (project: Project) => void
}

export const useDemoStore = create<DemoState>((set) => ({
  projects: seedProjects,
  tasks: seedTasks,
  addProject: (project) =>
    set((state) => ({ projects: [project, ...state.projects] })),
}))
