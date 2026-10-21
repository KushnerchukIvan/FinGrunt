import { Award, BookOpen, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import ProgressBar from '../components/ui/ProgressBar'
import { lessons } from '../content/lessons'
import { useLessonProgress } from '../features/learn/hooks'
import { useLanguage } from '../hooks'

export default function Learn() {
  const { t } = useTranslation()
  const language = useLanguage()
  const { data: progress } = useLessonProgress()

  const completed = lessons.filter((lesson) => progress[lesson.id]?.completed).length
  const percent = Math.round((completed / lessons.length) * 100)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('navigation.learn')}</h1>
        <p className="mt-1 text-sm text-slate-400">{t('learn.subtitle')}</p>
      </div>

      <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-400">
            {t('learn.progress', { done: completed, total: lessons.length })}
          </span>
          <span className="font-medium">{percent}%</span>
        </div>
        <ProgressBar percent={percent} barClass="bg-emerald-500" label={t('learn.progressLabel')} />
      </section>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {lessons.map((lesson) => {
          const lessonProgress = progress[lesson.id]
          const content = lesson.content[language]
          const total = content.quiz.length

          return (
            <li
              key={lesson.id}
              className="relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-slate-700 hover:bg-slate-900"
            >
              <div className="flex items-center justify-between gap-2 text-xs">
                <span
                  className={`rounded-full px-2.5 py-1 font-medium ${
                    lesson.level === 'beginner'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-blue-500/10 text-blue-400'
                  }`}
                >
                  {t(`learn.levels.${lesson.level}`)}
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <Clock size={14} />
                  {t('learn.minutes', { minutes: lesson.minutes })}
                </span>
              </div>

              <h2 className="mt-4 text-lg font-semibold">
                <Link
                  to={`/learn/${lesson.id}`}
                  className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-emerald-400"
                >
                  {content.title}
                </Link>
              </h2>
              <p className="mt-2 flex-1 text-sm text-slate-400">{content.summary}</p>

              <div className="mt-5 flex items-center gap-2 text-sm">
                {lessonProgress?.completed ? (
                  <span className="flex items-center gap-2 text-emerald-400">
                    <Award size={16} />
                    {t('learn.completed', { score: lessonProgress.bestScore, total })}
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-slate-500">
                    <BookOpen size={16} />
                    {t('learn.notStarted')}
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      <p className="mt-8 text-xs text-slate-500">{t('common.disclaimer')}</p>
    </div>
  )
}
