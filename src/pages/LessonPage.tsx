import { ArrowLeft, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import Quiz from '../components/Quiz'
import { getLesson } from '../content/lessons'
import { useLessonProgress } from '../features/learn/hooks'
import { useLanguage } from '../hooks'

export default function LessonPage() {
  const { id } = useParams()
  const { t } = useTranslation()
  const language = useLanguage()
  const { data: progress } = useLessonProgress()
  const lesson = getLesson(id)

  const backLink = (
    <Link
      to="/learn"
      className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
    >
      <ArrowLeft size={16} />
      {t('learn.back')}
    </Link>
  )

  if (!lesson) {
    return (
      <div>
        {backLink}
        <div className="rounded-2xl border border-dashed border-slate-800 p-10 text-center">
          <h1 className="text-xl font-bold">{t('learn.notFoundTitle')}</h1>
          <p className="mt-2 text-sm text-slate-400">{t('learn.notFoundText')}</p>
        </div>
      </div>
    )
  }

  const content = lesson.content[language]
  const isCompleted = progress[lesson.id]?.completed

  return (
    <div className="max-w-3xl">
      {backLink}

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs">
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
          {isCompleted && (
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 font-medium text-emerald-400">
              {t('learn.completedBadge')}
            </span>
          )}
        </div>
        <h1 className="mt-4 text-3xl font-bold">{content.title}</h1>
        <p className="mt-2 text-slate-400">{content.summary}</p>
      </header>

      <div className="space-y-8">
        {content.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-3 text-xl font-semibold">{section.heading}</h2>
            <div className="space-y-3 text-slate-300">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="leading-7">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10">
        <Quiz key={`${lesson.id}-${language}`} lessonId={lesson.id} questions={content.quiz} />
      </div>

      <p className="mt-8 text-xs text-slate-500">{t('common.disclaimer')}</p>
    </div>
  )
}
