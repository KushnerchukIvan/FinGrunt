import { useAppStore } from '../../stores/useAppStore'
import type { LessonProgress } from '../../types'

export function useLessonProgress(): {
  data: Record<string, LessonProgress>
  isLoading: boolean
  isError: boolean
} {
  const data = useAppStore((state) => state.lessonProgress)
  return { data, isLoading: false, isError: false }
}

export function useRecordQuiz() {
  const recordQuiz = useAppStore((state) => state.recordQuiz)

  const mutate = (input: { lessonId: string; score: number; passed: boolean }) => {
    recordQuiz(input.lessonId, input.score, input.passed)
  }

  return { mutate, isPending: false }
}
