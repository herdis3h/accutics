import { Field } from "@/types/types";
import { create } from "zustand";

interface StoreState {
  data: Field[];
  setData: (data: Field[]) => void;
}

const useStore = create<StoreState>((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));

export default useStore;
export type { StoreState };
