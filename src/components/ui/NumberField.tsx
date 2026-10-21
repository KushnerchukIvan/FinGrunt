import { useId } from 'react'
import { inputClass, labelClass } from './formStyles'

type NumberFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  suffix?: string
  step?: string
}

export default function NumberField({
  label,
  value,
  onChange,
  suffix,
  step = 'any',
}: NumberFieldProps) {
  const id = useId()

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          min="0"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClass} ${suffix ? 'pr-12' : ''}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-slate-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}
