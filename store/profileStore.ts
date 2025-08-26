import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '@/interfaces/IUserProfile';
import { ClientResponse, useHttpClient } from '@/context/HttpClientContext';
import { useAuthStore } from './authStore';


export interface UserProfileState {
  // persisted


  // runtime-only
  userProfile: UserProfile | null;
  isHydrated: boolean;

  // actions
  setUserProfile: (newUserProfile: UserProfile | null) => void;
};

export const useProfileStore = create<UserProfileState>()(
  persist(
    (set, get) => ({
      isHydrated: false,
      userProfile: null,

      setUserProfile: (newUserProfile: UserProfile | null) => set({userProfile: newUserProfile})
    }),
    {
      name: 'user-profile-store', // storage key
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist what you need:
      // partialize: (state) => ({ 
      //   userProfile: state.userProfile,
      // }),
      // (Optional) bump this when you change shape and write a migrate()
      version: 1,
    }
  )
);

// Mark hydrated when rehydration finishes
useProfileStore.persist.onFinishHydration(() => {
  useProfileStore.setState({ isHydrated: true });
});