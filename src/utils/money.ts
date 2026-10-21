import type { CurrencyCode } from '../types'

export function formatMoney(
  amount: number,
  currency: CurrencyCode,
  locale: string,
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatPercent(ratio: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: 0,
  }).format(ratio)
}

export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}
