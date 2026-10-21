export function parseNumber(value: string): number {
  if (value.trim() === '') return Number.NaN
  return Number(value.replace(',', '.'))
}
