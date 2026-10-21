export function toDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function formatDateKey(dateKey: string, locale: string): string {
  const [year, month, day] = dateKey.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function monthKeyOf(dateKey: string): string {
  return dateKey.slice(0, 7)
}

export function currentMonthKey(today: Date = new Date()): string {
  return toDateKey(today).slice(0, 7)
}

export function shiftMonthKey(monthKey: string, delta: number): string {
  const [year, month] = monthKey.split('-').map(Number)
  const date = new Date(year, month - 1 + delta, 1)
  return toDateKey(date).slice(0, 7)
}

export function lastMonthKeys(count: number, today: Date = new Date()): string[] {
  const current = currentMonthKey(today)
  return Array.from({ length: count }, (_, index) =>
    shiftMonthKey(current, index - (count - 1)),
  )
}

export function formatMonthKey(
  monthKey: string,
  locale: string,
  style: 'long' | 'short' = 'long',
): string {
  const [year, month] = monthKey.split('-').map(Number)
  return new Date(year, month - 1, 1).toLocaleDateString(locale, {
    month: style,
    year: style === 'long' ? 'numeric' : undefined,
  })
}
