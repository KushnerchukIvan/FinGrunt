import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ProjectCard from '../components/ProjectCard'
import ProjectForm from '../components/ProjectForm'
import Modal from '../components/ui/Modal'
import { useCreateProject } from '../features/projects/hooks/useCreateProject'
import { useProjects } from '../features/projects/hooks/useProjects'
import { useTasks } from '../features/tasks/hooks/useTasks'
import type { ProjectFormValues } from '../schemas/projectSchema'
import { getProjectProgress } from '../utils/projectProgress'

export default function Projects() {
  const { t } = useTranslation()
  const { data: projects } = useProjects()
  const { data: tasks } = useTasks()
  const { mutate: createProject } = useCreateProject()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const progressById = useMemo(
    () =>
      new Map(
        projects.map((project) => [
          project.id,
          getProjectProgress(project.id, tasks),
        ]),
      ),
    [projects, tasks],
  )

  const handleCreate = (values: ProjectFormValues) => {
    createProject(values)
    setIsModalOpen(false)
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t('navigation.projects')}</h1>
          <p className="mt-1 text-sm text-slate-400">{t('projects.subtitle')}</p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          <Plus size={18} />
          {t('projects.new')}
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-800 p-10 text-center text-slate-400">
          {t('projects.empty')}
        </div>
      ) : (
        <section
          aria-label={t('navigation.projects')}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              progress={progressById.get(project.id)!}
            />
          ))}
        </section>
      )}

      <Modal
        open={isModalOpen}
        title={t('projects.form.title')}
        closeLabel={t('common.close')}
        onClose={() => setIsModalOpen(false)}
      >
        <ProjectForm
          onSubmit={handleCreate}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}
