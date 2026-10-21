import { useState, type ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import BudgetRuleCalculator from '../components/calculators/BudgetRuleCalculator'
import CompoundInterestCalculator from '../components/calculators/CompoundInterestCalculator'
import EmergencyFundCalculator from '../components/calculators/EmergencyFundCalculator'
import InflationCalculator from '../components/calculators/InflationCalculator'
import LoanCalculator from '../components/calculators/LoanCalculator'
import SavingsGoalCalculator from '../components/calculators/SavingsGoalCalculator'

const tools = [
  { id: 'budgetRule', component: BudgetRuleCalculator },
  { id: 'savingsGoal', component: SavingsGoalCalculator },
  { id: 'compound', component: CompoundInterestCalculator },
  { id: 'loan', component: LoanCalculator },
  { id: 'inflation', component: InflationCalculator },
  { id: 'emergency', component: EmergencyFundCalculator },
] satisfies { id: string; component: ComponentType }[]

export default function Tools() {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState<string>(tools[0].id)
  const Active = tools.find((tool) => tool.id === activeId)!.component

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('navigation.tools')}</h1>
        <p className="mt-1 text-sm text-slate-400">{t('tools.subtitle')}</p>
      </div>

      <div role="group" aria-label={t('tools.pickerLabel')} className="mb-6 flex flex-wrap gap-2">
        {tools.map((tool) => (
          <button
            key={tool.id}
            type="button"
            aria-pressed={activeId === tool.id}
            onClick={() => setActiveId(tool.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              activeId === tool.id
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            {t(`tools.${tool.id}.name`)}
          </button>
        ))}
      </div>

      <section
        aria-label={t(`tools.${activeId}.name`)}
        className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
      >
        <h2 className="mb-5 text-lg font-semibold">{t(`tools.${activeId}.name`)}</h2>
        <Active />
      </section>

      <p className="mt-6 text-xs text-slate-500">{t('common.disclaimer')}</p>
    </div>
  )
}
