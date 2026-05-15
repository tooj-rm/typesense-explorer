import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ConnectSettings {
  apiKey: string;
  host: string;
  setApiKey: (apiKey: string) => void;
  setHost: (host: string) => void;
  reset: () => void;
}

export const useConnectStore = create<ConnectSettings>()(
  persist(
    (set) => ({
      apiKey: '',
      host: '',
      setApiKey: (apiKey: string) => set({ apiKey }),
      setHost: (host: string) => set({ host }),
      reset: () => set({ apiKey: '', host: '' })
    }),
    {
      name: 'connect-settings',
    }
  )
);