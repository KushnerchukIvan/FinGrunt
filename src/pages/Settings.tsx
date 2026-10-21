import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import {
  dangerButtonClass,
  inputClass,
  labelClass,
  secondaryButtonClass,
} from '../components/ui/formStyles'
import { useResetData, useSetCurrency, useSettings } from '../features/settings/hooks'
import type { CurrencyCode } from '../types'

const currencies: CurrencyCode[] = ['UAH', 'USD', 'EUR']

type DataDialog = 'demo' | 'clear' | null

export default function Settings() {
  const { t } = useTranslation()
  const { data: settings } = useSettings()
  const { mutate: setCurrency } = useSetCurrency()
  const { loadDemoData, clearAllData } = useResetData()
  const [dialog, setDialog] = useState<DataDialog>(null)

  const handleConfirm = () => {
    if (dialog === 'demo') loadDemoData()
    if (dialog === 'clear') clearAllData()
    setDialog(null)
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('navigation.settings')}</h1>
        <p className="mt-1 text-sm text-slate-400">{t('settings.subtitle')}</p>
      </div>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
        <h2 className="mb-4 text-lg font-semibold">{t('settings.preferences')}</h2>
        <label htmlFor="settings-currency" className={labelClass}>
          {t('settings.currency')}
        </label>
        <select
          id="settings-currency"
          value={settings.currency}
          onChange={(event) => setCurrency(event.target.value as CurrencyCode)}
          className={inputClass}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {t(`settings.currencies.${currency}`)}
            </option>
          ))}
        </select>
        <p className="mt-2 text-xs text-slate-500">{t('settings.currencyHint')}</p>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
        <h2 className="mb-1 text-lg font-semibold">{t('settings.data')}</h2>
        <p className="mb-4 text-sm text-slate-400">{t('settings.dataHint')}</p>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => setDialog('demo')} className={secondaryButtonClass}>
            {t('settings.loadDemo')}
          </button>
          <button type="button" onClick={() => setDialog('clear')} className={dangerButtonClass}>
            {t('settings.clearAll')}
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
        <h2 className="mb-2 text-lg font-semibold">{t('settings.about')}</h2>
        <p className="text-sm text-slate-400">{t('common.disclaimer')}</p>
      </section>

      <ConfirmDialog
        open={dialog !== null}
        title={dialog === 'clear' ? t('settings.clearConfirm.title') : t('settings.demoConfirm.title')}
        message={dialog === 'clear' ? t('settings.clearConfirm.message') : t('settings.demoConfirm.message')}
        confirmLabel={dialog === 'clear' ? t('settings.clearConfirm.confirm') : t('settings.demoConfirm.confirm')}
        onConfirm={handleConfirm}
        onCancel={() => setDialog(null)}
      />
    </div>
  )
}
