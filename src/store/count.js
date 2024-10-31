import { create } from "zustand";

export const useCount = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  asyncIncrement: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({ count: state.count + 1 }));
  }
}));