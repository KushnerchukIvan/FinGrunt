type ProgressBarProps = {
  percent: number
  barClass: string
  label: string
}

export default function ProgressBar({ percent, barClass, label }: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className="h-2 overflow-hidden rounded-full bg-slate-800"
    >
      <div
        className={`h-full rounded-full transition-all ${barClass}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
