import { create } from "zustand";

type FilterByInput = { field: string; operator: string; value: string }[]

interface SearchStore {
  filterBy?: FilterByInput
  queryBy: string;
  search: string,
  sortBy: string;

  setFilterBy: (filterBy: FilterByInput) => void;
  setQueryBy: (queryBy: string) => void;
  setSearch: (search: string) => void;
  setSortBy: (sortBy: string) => void;
  filterByString: () => string;
  reset: () => void;
}

export const useSearchStore =
  create<SearchStore>((set, getState) => ({
      queryBy: '',
      search: '*',
      sortBy: '',

      setFilterBy: (filterBy) => set({ filterBy }),
      setQueryBy: (queryBy) => set({ queryBy }),
      setSearch: (search) => set({ search }),
      setSortBy: (sortBy) => set({ sortBy }),

      filterByString: () => getState()
        .filterBy
        ?.map(({ field, operator, value }) => `${field}:${operator}${value}`)
        .join('&&') ?? '',

      reset: () => set({
        filterBy: undefined,
        queryBy: ''
      })
    }
  ));