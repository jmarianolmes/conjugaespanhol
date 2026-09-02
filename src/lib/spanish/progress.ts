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

export interface ProfileStats {
  name: string;
  totalCorrect: number;
  totalWrong: number;
  streak: number;
  bestStreak: number;
  lastDay: string | null;
  byKey: Record<string, Tally>;
  recent: Attempt[];
}

interface ProgressState {
  activeId: string;
  profiles: Record<string, ProfileStats>;
  record: (attempt: Attempt) => void;
  reset: () => void;
  addPerson: (name: string) => string;
  setActive: (id: string) => void;
  removePerson: (id: string) => void;
}

function todayStamp(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function keyOf(verbId: string, tense: TenseId): string {
  return `${tense}:${verbId}`;
}

function slugName(name: string): string {
  const base = name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return base || "pessoa";
}

export function emptyProfile(name: string): ProfileStats {
  return {
    name,
    totalCorrect: 0,
    totalWrong: 0,
    streak: 0,
    bestStreak: 0,
    lastDay: null,
    byKey: {},
    recent: [],
  };
}

const DEFAULT_ID = "eu";

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      activeId: DEFAULT_ID,
      profiles: { [DEFAULT_ID]: emptyProfile("Eu") },
      record: (attempt) => {
        const { activeId, profiles } = get();
        const current = profiles[activeId] ?? emptyProfile("Eu");
        const key = keyOf(attempt.verbId, attempt.tense);
        const prev = current.byKey[key] ?? { correct: 0, wrong: 0 };
        const nextTally = attempt.ok
          ? { correct: prev.correct + 1, wrong: prev.wrong }
          : { correct: prev.correct, wrong: prev.wrong + 1 };
        const streak = attempt.ok ? current.streak + 1 : 0;
        set({
          profiles: {
            ...profiles,
            [activeId]: {
              ...current,
              totalCorrect: current.totalCorrect + (attempt.ok ? 1 : 0),
              totalWrong: current.totalWrong + (attempt.ok ? 0 : 1),
              streak,
              bestStreak: Math.max(current.bestStreak, streak),
              lastDay: todayStamp(),
              byKey: { ...current.byKey, [key]: nextTally },
              recent: [attempt, ...current.recent].slice(0, 40),
            },
          },
        });
      },
      reset: () => {
        const { activeId, profiles } = get();
        const current = profiles[activeId];
        set({
          profiles: {
            ...profiles,
            [activeId]: emptyProfile(current?.name ?? "Eu"),
          },
        });
      },
      addPerson: (name) => {
        const trimmed = name.trim() || "Alguém";
        let id = slugName(trimmed);
        const { profiles } = get();
        if (profiles[id]) id = `${id}-${Date.now().toString(36)}`;
        set({
          activeId: id,
          profiles: { ...profiles, [id]: emptyProfile(trimmed) },
        });
        return id;
      },
      setActive: (id) => {
        if (get().profiles[id]) set({ activeId: id });
      },
      removePerson: (id) => {
        const { profiles, activeId } = get();
        const ids = Object.keys(profiles);
        if (ids.length <= 1 || !profiles[id]) return;
        const next = { ...profiles };
        delete next[id];
        const nextActive = activeId === id ? Object.keys(next)[0] : activeId;
        set({ profiles: next, activeId: nextActive ?? DEFAULT_ID });
      },
    }),
    {
      name: "conjuga-progress-v1",
      version: 2,
      migrate: (persisted) => {
        const raw = persisted as Record<string, unknown> | null;
        if (raw && raw.profiles && raw.activeId) {
          return raw as unknown as ProgressState;
        }
        const legacy = raw as Partial<ProfileStats> | null;
        return {
          activeId: DEFAULT_ID,
          profiles: {
            [DEFAULT_ID]: {
              ...emptyProfile("Eu"),
              totalCorrect: legacy?.totalCorrect ?? 0,
              totalWrong: legacy?.totalWrong ?? 0,
              streak: legacy?.streak ?? 0,
              bestStreak: legacy?.bestStreak ?? 0,
              lastDay: legacy?.lastDay ?? null,
              byKey: legacy?.byKey ?? {},
              recent: legacy?.recent ?? [],
            },
          },
        };
      },
    },
  ),
);

export function useActiveProfile(): ProfileStats {
  return useProgress((s) => s.profiles[s.activeId] ?? emptyProfile("Eu"));
}

export function comboKey(verbId: string, tense: TenseId): string {
  return keyOf(verbId, tense);
}

export function accuracy(correct: number, wrong: number): number {
  const total = correct + wrong;
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}
