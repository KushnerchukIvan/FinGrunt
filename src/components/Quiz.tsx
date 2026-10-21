import { useState } from 'react'
import { CircleCheck, CircleX, RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { primaryButtonClass, secondaryButtonClass } from './ui/formStyles'
import { passScore, type QuizQuestion } from '../content/lessons'
import { useRecordQuiz } from '../features/learn/hooks'

type QuizProps = {
  lessonId: string
  questions: QuizQuestion[]
}

export default function Quiz({ lessonId, questions }: QuizProps) {
  const { t } = useTranslation()
  const { mutate: recordQuiz } = useRecordQuiz()
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((answer) => answer !== null)
  const score = answers.filter((answer, index) => answer === questions[index].correct).length
  const passed = score >= passScore

  const handleSubmit = () => {
    setSubmitted(true)
    recordQuiz({ lessonId, score, passed })
  }

  const handleRetry = () => {
    setAnswers(questions.map(() => null))
    setSubmitted(false)
  }

  return (
    <section aria-labelledby="quiz-title" className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
      <h2 id="quiz-title" className="text-lg font-semibold">
        {t('learn.quiz.title')}
      </h2>
      <p className="mt-1 text-sm text-slate-400">
        {t('learn.quiz.subtitle', { pass: passScore, total: questions.length })}
      </p>

      <div className="mt-6 space-y-6">
        {questions.map((question, questionIndex) => {
          const selected = answers[questionIndex]
          const isCorrect = selected === question.correct

          return (
            <fieldset key={questionIndex} disabled={submitted}>
              <legend className="mb-3 font-medium">
                {questionIndex + 1}. {question.question}
              </legend>
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selected === optionIndex
                  const showCorrect = submitted && optionIndex === question.correct
                  const showWrong = submitted && isSelected && !isCorrect

                  return (
                    <label
                      key={optionIndex}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                        showCorrect
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : showWrong
                            ? 'border-rose-500 bg-rose-500/10'
                            : isSelected
                              ? 'border-emerald-500/60 bg-slate-800'
                              : 'border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        checked={isSelected}
                        onChange={() =>
                          setAnswers((current) =>
                            current.map((value, index) =>
                              index === questionIndex ? optionIndex : value,
                            ),
                          )
                        }
                        className="accent-emerald-500"
                      />
                      <span className="flex-1">{option}</span>
                      {showCorrect && <CircleCheck size={18} className="text-emerald-400" />}
                      {showWrong && <CircleX size={18} className="text-rose-400" />}
                    </label>
                  )
                })}
              </div>
              {submitted && (
                <p className="mt-3 text-sm text-slate-400">{question.explanation}</p>
              )}
            </fieldset>
          )
        })}
      </div>

      {submitted ? (
        <div
          role="status"
          className={`mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl p-4 ${
            passed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
          }`}
        >
          <div>
            <p className="font-semibold">
              {t('learn.quiz.score', { score, total: questions.length })}
            </p>
            <p className="text-sm">
              {passed ? t('learn.quiz.passed') : t('learn.quiz.failed', { pass: passScore })}
            </p>
          </div>
          <button type="button" onClick={handleRetry} className={secondaryButtonClass}>
            <RotateCcw size={16} />
            {t('learn.quiz.retry')}
          </button>
        </div>
      ) : (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`${primaryButtonClass} disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {t('learn.quiz.submit')}
          </button>
        </div>
      )}
    </section>
  )
}
