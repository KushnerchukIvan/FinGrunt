import { z } from 'zod'

export const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'projects.form.errors.nameRequired')
    .max(60, 'projects.form.errors.nameTooLong'),
  description: z
    .string()
    .trim()
    .max(200, 'projects.form.errors.descriptionTooLong'),
  status: z.enum(['planning', 'active', 'completed']),
  color: z.enum(['violet', 'emerald', 'blue', 'rose']),
  dueDate: z.string().min(1, 'projects.form.errors.dueDateRequired'),
})

export type ProjectFormValues = z.infer<typeof projectSchema>
