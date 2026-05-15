import { Documents } from "@typesense_inspector/core";
import { create } from "zustand";

interface DocumentStore {
  documents?: Documents;
  setDocuments: (documents: Documents) => void;
}

export const useDocumentStore =
  create<DocumentStore>((set) => ({
      documents: undefined,
      setDocuments: (documents) => set({ documents })
    }
  ));