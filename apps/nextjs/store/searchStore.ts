import { create } from "zustand";

interface PaginationStore {
  filterBy: string;
  queryBy: string;
  search: string,

  setFilterBy: (filterBy: string) => void;
  setQueryBy: (queryBy: string) => void;
  setSearch: (search: string) => void;
  reset: () => void;
}

export const useSearchStore =
  create<PaginationStore>((set) => ({
      filterBy: '',
      queryBy: '',
      search: '*',

      setFilterBy: (filterBy) => set({ filterBy }),
      setQueryBy: (queryBy) => set({ queryBy }),
      setSearch: (search) => set({ search }),

      reset: () => set({
        filterBy: '',
        queryBy: ''
      })
    }
  ));