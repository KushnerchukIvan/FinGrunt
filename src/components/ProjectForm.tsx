import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import {
  projectSchema,
  type ProjectFormValues,
} from '../schemas/projectSchema'
import type { ProjectColor, ProjectStatus } from '../types'

type ProjectFormProps = {
  onSubmit: (values: ProjectFormValues) => void
  onCancel: () => void
}

const statuses: ProjectStatus[] = ['planning', 'active', 'completed']
const colors: ProjectColor[] = ['violet', 'emerald', 'blue', 'rose']

const swatchStyle: Record<ProjectColor, string> = {
  violet: 'bg-violet-500',
  emerald: 'bg-emerald-500',
  blue: 'bg-blue-500',
  rose: 'bg-rose-500',
}

const inputClass =
  'w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none aria-[invalid=true]:border-rose-500'

export default function ProjectForm({ onSubmit, onCancel }: ProjectFormProps) {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
      status: 'planning',
      color: 'violet',
      dueDate: '',
    },
  })

  const errorText = (message?: string) => (message ? t(message) : null)

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <label htmlFor="project-name" className="mb-1.5 block text-sm font-medium">
          {t('projects.form.name')}
        </label>
        <input
          id="project-name"
          type="text"
          autoComplete="off"
          placeholder={t('projects.form.namePlaceholder')}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'project-name-error' : undefined}
          className={inputClass}
          {...register('name')}
        />
        {errors.name && (
          <p id="project-name-error" role="alert" className="mt-1 text-xs text-rose-400">
            {errorText(errors.name.message)}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="project-description" className="mb-1.5 block text-sm font-medium">
          {t('projects.form.description')}
        </label>
        <textarea
          id="project-description"
          rows={3}
          placeholder={t('projects.form.descriptionPlaceholder')}
          aria-invalid={errors.description ? true : undefined}
          aria-describedby={errors.description ? 'project-description-error' : undefined}
          className={`${inputClass} resize-none`}
          {...register('description')}
        />
        {errors.description && (
          <p id="project-description-error" role="alert" className="mt-1 text-xs text-rose-400">
            {errorText(errors.description.message)}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="project-status" className="mb-1.5 block text-sm font-medium">
            {t('projects.form.status')}
          </label>
          <select id="project-status" className={inputClass} {...register('status')}>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {t(`projects.status.${status}`)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="project-due-date" className="mb-1.5 block text-sm font-medium">
            {t('projects.form.dueDate')}
          </label>
          <input
            id="project-due-date"
            type="date"
            aria-invalid={errors.dueDate ? true : undefined}
            aria-describedby={errors.dueDate ? 'project-due-date-error' : undefined}
            className={inputClass}
            {...register('dueDate')}
          />
          {errors.dueDate && (
            <p id="project-due-date-error" role="alert" className="mt-1 text-xs text-rose-400">
              {errorText(errors.dueDate.message)}
            </p>
          )}
        </div>
      </div>

      <fieldset>
        <legend className="mb-1.5 text-sm font-medium">{t('projects.form.color')}</legend>
        <div className="flex gap-3">
          {colors.map((color) => (
            <label key={color} className="cursor-pointer">
              <input
                type="radio"
                value={color}
                className="peer sr-only"
                {...register('color')}
              />
              <span
                className={`block h-8 w-8 rounded-full ring-offset-2 ring-offset-slate-900 peer-checked:ring-2 peer-checked:ring-white peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400 ${swatchStyle[color]}`}
              />
              <span className="sr-only">{t(`projects.colors.${color}`)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-800 px-4 py-2.5 text-sm font-medium transition hover:bg-slate-800"
        >
          {t('projects.form.cancel')}
        </button>
        <button
          type="submit"
          className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          {t('projects.form.create')}
        </button>
      </div>
    </form>
  )
}
