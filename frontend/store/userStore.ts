import { create } from "zustand"

export interface AssessmentState {
  topic: string | null
  setTopic: (topic: string) => void
}

const useAssessmentStore = create<AssessmentState>((set) => ({
  topic: null,
  setTopic: (topic) => set({ topic }),
}))

export default useAssessmentStore
