import { create } from "zustand";

type Stage =
  | "landing"
  | "overview"
  | "entry"
  | "shelf"
  | "story";

interface AppStore {
  currentStage: Stage;

  setStage: (stage: Stage) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentStage: "landing",

  setStage: (stage) =>
    set({
      currentStage: stage,
    }),
}));