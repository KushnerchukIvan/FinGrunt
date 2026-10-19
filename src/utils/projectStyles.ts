import type { ProjectColor, ProjectStatus } from '../types'

export const accentStyle: Record<ProjectColor, { dot: string; bar: string }> = {
  violet: { dot: 'bg-violet-400', bar: 'bg-violet-500' },
  emerald: { dot: 'bg-emerald-400', bar: 'bg-emerald-500' },
  blue: { dot: 'bg-blue-400', bar: 'bg-blue-500' },
  rose: { dot: 'bg-rose-400', bar: 'bg-rose-500' },
}

export const projectStatusStyle: Record<ProjectStatus, string> = {
  planning: 'bg-amber-500/10 text-amber-400',
  active: 'bg-emerald-500/10 text-emerald-400',
  completed: 'bg-slate-500/10 text-slate-400',
}
