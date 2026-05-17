import { create } from "zustand";

type FilterByInput = { field: string; operator: string; value: string }[]

interface SearchStore {
  filterBy?: FilterByInput
  queryBy: string;
  search: string,

  setFilterBy: (filterBy: FilterByInput) => void;
  setQueryBy: (queryBy: string) => void;
  setSearch: (search: string) => void;
  filterByString: () => string;
  reset: () => void;
}

export const useSearchStore =
  create<SearchStore>((set, getState) => ({
      queryBy: '',
      search: '*',

      setFilterBy: (filterBy) => set({ filterBy }),
      setQueryBy: (queryBy) => set({ queryBy }),
      setSearch: (search) => set({ search }),

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