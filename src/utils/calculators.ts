import { round2 } from './money'

export function splitBudget(
  income: number,
  needsPct = 50,
  wantsPct = 30,
  savingsPct = 20,
) {
  return {
    needs: round2((income * needsPct) / 100),
    wants: round2((income * wantsPct) / 100),
    savings: round2((income * savingsPct) / 100),
  }
}

export function monthsToGoal(input: {
  goal: number
  saved: number
  monthly: number
  annualRate: number
}): number | null {
  const { goal, saved, monthly, annualRate } = input
  if (saved >= goal) return 0
  if (monthly <= 0 && annualRate <= 0) return null

  const monthlyRate = annualRate / 100 / 12
  let balance = saved

  for (let month = 1; month <= 1200; month++) {
    balance = balance * (1 + monthlyRate) + monthly
    if (balance >= goal) return month
  }

  return null
}

export function requiredMonthly(input: {
  goal: number
  saved: number
  months: number
  annualRate: number
}): number {
  const { goal, saved, months, annualRate } = input
  if (months <= 0) return Math.max(0, round2(goal - saved))

  const monthlyRate = annualRate / 100 / 12

  if (monthlyRate === 0) {
    return Math.max(0, round2((goal - saved) / months))
  }

  const growth = Math.pow(1 + monthlyRate, months)
  const needed = ((goal - saved * growth) * monthlyRate) / (growth - 1)
  return Math.max(0, round2(needed))
}

export type GrowthPoint = {
  year: number
  balance: number
  contributed: number
}

export function compoundGrowth(input: {
  initial: number
  monthly: number
  annualRate: number
  years: number
}) {
  const { initial, monthly, annualRate, years } = input
  const monthlyRate = annualRate / 100 / 12
  const series: GrowthPoint[] = [{ year: 0, balance: round2(initial), contributed: round2(initial) }]
  let balance = initial

  for (let month = 1; month <= years * 12; month++) {
    balance = balance * (1 + monthlyRate) + monthly
    if (month % 12 === 0) {
      series.push({
        year: month / 12,
        balance: round2(balance),
        contributed: round2(initial + monthly * month),
      })
    }
  }

  const contributed = round2(initial + monthly * years * 12)
  const final = round2(balance)

  return { series, final, contributed, interest: round2(final - contributed) }
}

export function loanPayment(input: {
  principal: number
  annualRate: number
  months: number
}) {
  const { principal, annualRate, months } = input
  const monthlyRate = annualRate / 100 / 12

  const monthly =
    monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))

  const total = monthly * months

  return {
    monthly: round2(monthly),
    total: round2(total),
    overpayment: round2(total - principal),
  }
}

export function inflationImpact(input: {
  amount: number
  annualInflation: number
  years: number
}) {
  const { amount, annualInflation, years } = input
  const factor = Math.pow(1 + annualInflation / 100, years)

  return {
    purchasingPower: round2(amount / factor),
    lostShare: 1 - 1 / factor,
    futurePrice: round2(amount * factor),
  }
}

export function emergencyFund(input: {
  monthlyExpenses: number
  months: number
  saved: number
}) {
  const { monthlyExpenses, months, saved } = input
  const target = round2(monthlyExpenses * months)

  return {
    target,
    gap: Math.max(0, round2(target - saved)),
    coverageMonths: monthlyExpenses > 0 ? saved / monthlyExpenses : 0,
    progress: target > 0 ? Math.min(1, saved / target) : 0,
  }
}
