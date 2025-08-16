import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useLoadingStore } from './loadingStore';


export interface UserProfile {
  name: string;
  gender: 'MALE' | 'FEMALE';
  date_of_birth: string;
  language_code: 'en' | 'ar' | 'tr';
  time_zone: string;
};


export interface AuthState {
  // persisted
  session: string | null;
  userProfile: UserProfile | null;
  userId: number | null;

  // runtime-only
  isHydrated: boolean;
  errorMessage: string | null;
  fullMobileNumber: string | null;

  // actions
  // signIn: (token: string, profile: UserProfile, userId: string) => void;
  signOut: () => void;
  setFullMobileNumber: (fullMobileNumber: string) => void;
  setSession: (newSession: string) => void;
  setUserProfile: (newUserProfile: UserProfile) => void;
  setUserId: (newUserId: number) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      userProfile: null,
      userId: null,

      isHydrated: false,
      errorMessage: null,
      fullMobileNumber: null,

      // signIn: (token, profile, userId) => set({ session: token, userProfile: profile, userId: userId }),
      signOut: () => set({ 
        session: null, 
        userProfile: null,
        userId: null,
        isHydrated: false
      }),
      setFullMobileNumber: (fullMobileNumber: string) => set({ fullMobileNumber: fullMobileNumber}),
      setSession: (newSession: string) => (set({session: newSession})),
      setUserProfile: (newUserProfile: UserProfile) => set({userProfile: newUserProfile}),
      setUserId: (newUserId: number) => set({ userId: newUserId})
    }),
    {
      name: 'auth-store', // storage key
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist what you need:
      partialize: (state) => ({ 
        session: state.session,
        userProfile: state.userProfile,
        userId: state.userId
      }),
      // (Optional) bump this when you change shape and write a migrate()
      version: 1,
    }
  )
);

// Mark hydrated when rehydration finishes
useAuthStore.persist.onFinishHydration(() => {
  useAuthStore.setState({ isHydrated: true });
});
