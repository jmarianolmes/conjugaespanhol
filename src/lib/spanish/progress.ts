import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PersonId, TenseId } from "./types";

export interface Attempt {
  at: number;
  verbId: string;
  tense: TenseId;
  person: PersonId | "forma";
  given: string;
  expected: string;
  ok: boolean;
}

interface Tally {
  correct: number;
  wrong: number;
}

interface ProgressState {
  totalCorrect: number;
  totalWrong: number;
  streak: number;
  bestStreak: number;
  lastDay: string | null;
  byKey: Record<string, Tally>;
  recent: Attempt[];
  record: (attempt: Attempt) => void;
  reset: () => void;
}

function todayStamp(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function keyOf(verbId: string, tense: TenseId): string {
  return `${tense}:${verbId}`;
}

const empty = {
  totalCorrect: 0,
  totalWrong: 0,
  streak: 0,
  bestStreak: 0,
  lastDay: null as string | null,
  byKey: {} as Record<string, Tally>,
  recent: [] as Attempt[],
};

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...empty,
      record: (attempt) => {
        const state = get();
        const key = keyOf(attempt.verbId, attempt.tense);
        const prev = state.byKey[key] ?? { correct: 0, wrong: 0 };
        const nextTally = attempt.ok
          ? { correct: prev.correct + 1, wrong: prev.wrong }
          : { correct: prev.correct, wrong: prev.wrong + 1 };
        const streak = attempt.ok ? state.streak + 1 : 0;
        set({
          totalCorrect: state.totalCorrect + (attempt.ok ? 1 : 0),
          totalWrong: state.totalWrong + (attempt.ok ? 0 : 1),
          streak,
          bestStreak: Math.max(state.bestStreak, streak),
          lastDay: todayStamp(),
          byKey: { ...state.byKey, [key]: nextTally },
          recent: [attempt, ...state.recent].slice(0, 40),
        });
      },
      reset: () => set({ ...empty }),
    }),
    { name: "conjuga-progress-v1" },
  ),
);

export function comboKey(verbId: string, tense: TenseId): string {
  return keyOf(verbId, tense);
}

export function accuracy(correct: number, wrong: number): number {
  const total = correct + wrong;
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}
