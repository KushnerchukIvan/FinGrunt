import type { LucideIcon } from 'lucide-react'

type StatCardProps = {
  title: string
  value: number | string
  caption: string
  icon: LucideIcon
  color: 'emerald' | 'blue' | 'rose' | 'violet'
}

const colorStyle = {
  emerald: 'bg-emerald-500/10 text-emerald-400',
  blue: 'bg-blue-500/10 text-blue-400',
  rose: 'bg-rose-500/10 text-rose-400',
  violet: 'bg-violet-500/10 text-violet-400',
}

export default function StatCard({
  title,
  value,
  caption,
  icon: Icon,
  color,
}: StatCardProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-slate-400">{title}</p>
          <h3 className="mt-3 truncate text-2xl font-bold tracking-tight sm:text-3xl">
            {value}
          </h3>
        </div>
        <div className={`rounded-xl p-3 ${colorStyle[color]}`}>
          <Icon size={22} />
        </div>
      </div>

      <p className="mt-5 text-sm text-slate-500">{caption}</p>
    </article>
  )
}
