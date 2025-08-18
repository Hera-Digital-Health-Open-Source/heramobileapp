import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface PregnancyState {
  // persisted
  pregnancyChecks: string[] | null;

  // runtime only
  isHydrated: boolean;

  // actions
  addPregnancyCheck: (date: string) => void;
};

export const usePregnancyStore = create<PregnancyState>()(
  persist(
    (set, get) => ({
      pregnancyChecks: null,
      isHydrated: false,

      addPregnancyCheck: (date: string) => set((state) => {
        if(!state.pregnancyChecks){
          state.pregnancyChecks = [];
        }
        state.pregnancyChecks.push(date);
        return state;
      }),
    }),
    {
      name: 'pregnancy-store', // storage key
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist what you need:
      partialize: (state) => ({ 
        pregnancyChecks: state.pregnancyChecks,
      }),
      // (Optional) bump this when you change shape and write a migrate()
      version: 1,
    }
  )
);

// Mark hydrated when rehydration finishes
usePregnancyStore.persist.onFinishHydration(() => {
  usePregnancyStore.setState({ isHydrated: true });
});
