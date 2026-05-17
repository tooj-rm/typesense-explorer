import { create } from "zustand";

interface PaginationStore {
  page: number;
  perPage: number;
  lastPage: number;

  setPage: (page: number) => void;
  setTotal: (total: number) => void;
  reset: () => void;
}

export const usePaginationStore =
  create<PaginationStore>((set) => ({
      page: 1,
      perPage: 20,
      lastPage: 1,

      setPage: (page) => set({ page }),

      setTotal: (total) => set(state => ({ lastPage: Math.ceil(total / state.perPage) })),
      reset: () => set({ page: 1, lastPage: 1 }),
    }
  ));