import {create} from "zustand";

interface AssessmentState {
  topic: string;
  questions: any[];
  currentQuestion: number;
  selectedAnswer: number | null;
  answers: (number | null)[];
  timer: number;
  completed: boolean;
  setTopic: (topic: string) => void;
  setQuestions: (questions: any[]) => void;
  setCurrentQuestion: (index: number) => void;
  setSelectedAnswer: (answer: number | null) => void;
  setAnswerAt: (index: number, answer: number | null) => void;
  resetTimer: () => void;
  decrementTimer: () => void;
  setCompleted: (completed: boolean) => void;
  resetAssessment: () => void;
}

export const useAssessmentStore = create<AssessmentState>((set) => ({
  topic: "",
  questions: [],
  currentQuestion: 0,
  selectedAnswer: null,
  answers: [],
  timer: 30,
  completed: false,
  setTopic: (topic) => set({ topic }),
  setQuestions: (questions) => set({ questions, answers: new Array(questions.length).fill(null) }),
  setCurrentQuestion: (index) => set({ currentQuestion: index }),
  setSelectedAnswer: (answer) => set({ selectedAnswer: answer }),
  setAnswerAt: (index, answer) =>
    set((state) => {
      const newAnswers = [...state.answers];
      newAnswers[index] = answer;
      return { answers: newAnswers };
    }),
  resetTimer: () => set({ timer: 30 }),
  decrementTimer: () =>
    set((state) => ({ timer: state.timer - 1 })),
  setCompleted: (completed) => set({ completed }),
  resetAssessment: () =>
    set({
      questions: [],
      currentQuestion: 0,
      selectedAnswer: null,
      answers: [],
      timer: 30,
      completed: false,
      topic: "",
    }),
}));
