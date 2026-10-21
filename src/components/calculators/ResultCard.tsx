type ResultRow = {
  label: string
  value: string
  highlight?: boolean
}

type ResultCardProps = {
  title: string
  rows: ResultRow[]
}

export default function ResultCard({ title, rows }: ResultCardProps) {
  return (
    <div role="status" className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
      <h3 className="mb-4 text-sm font-medium text-slate-400">{title}</h3>
      <dl className="space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4">
            <dt className="text-sm text-slate-400">{row.label}</dt>
            <dd
              className={`text-right font-semibold ${
                row.highlight ? 'text-xl text-emerald-400' : 'text-slate-100'
              }`}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
