import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="rounded-2xl border border-dashed border-slate-800 p-10 text-center">
      <h1 className="text-xl font-bold">{t('notFound.title')}</h1>
      <p className="mt-2 text-sm text-slate-400">{t('notFound.text')}</p>
      <Link to="/" className="mt-4 inline-block text-emerald-400 hover:text-emerald-300">
        {t('notFound.home')}
      </Link>
    </div>
  )
}
