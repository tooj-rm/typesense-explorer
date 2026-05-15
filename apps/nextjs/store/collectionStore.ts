import { create } from "zustand";
import { Collection } from "@typesense_inspector/core";

interface CollectionQueryStore {
  selected?: Collection;
  collections: Collection[];

  setSelected: (collection?: Collection) => void;
  setCollections: (collections: Collection[]) => void;
}

export const useCollectionStore =
  create<CollectionQueryStore>((set) => ({
      selected: undefined,
      collections: [],

      setSelected: (collection) => set({ selected: collection }),
      setCollections: (collections) => set({ collections }),
    })
  );