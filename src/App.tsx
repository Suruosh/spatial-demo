import { create } from "zustand";

type Store = {
  stage: string;
  setStage: (s: string) => void;
};

const useStore = create<Store>((set) => ({
  stage: "landing",
  setStage: (s) => set({ stage: s }),
}));

function App() {
  const stage = useStore((s) => s.stage);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{stage}</h1>
    </div>
  );
}

export default App;