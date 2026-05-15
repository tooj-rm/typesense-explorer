import { create } from "zustand";

interface PaginationStore {
  page: number;
  perPage: number;
  lastPage: number;
  search: string;

  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setTotal: (total: number) => void;
  reset: () => void;
}

export const usePaginationStore =
  create<PaginationStore>((set) => ({
      page: 1,
      perPage: 20,
      lastPage: 1,
      search: '*',

      setPage: (page) => set({ page }),

      setSearch: (search) =>
        set({
          search,
          page: 1,
        }),

      setTotal: (total) => set(state => ({ lastPage: Math.ceil(total / state.perPage) })),

      reset: () => set({
        page: 1,
        search: '*',
      })
    }
  ));