export type TaskStatus = 'todo' | 'in_progress' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'
export type ProjectStatus = 'planning' | 'active' | 'completed'
export type ProjectColor = 'violet' | 'emerald' | 'blue' | 'rose'

export type User = {
  id: string
  name: string
  email: string
  avatarUrl?: string
  createdAt: string
}

export type Project = {
  id: string
  name: string
  description: string
  status: ProjectStatus
  color: ProjectColor
  ownerId: string
  dueDate: string
  createdAt: string
}

export type Task = {
  id: string
  projectId: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assigneeId: string
  dueDate: string
  createdAt: string
  updatedAt: string
}
