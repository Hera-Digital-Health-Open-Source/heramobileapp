import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import { useLoading } from './LoadingContext';


type LastMenstrualType = {
  date: Date;
  prentalVisitsNumber: number;
}

type RegistrationWeekType = {
  weekNumber: number;
  prentalVisitsNumber: number;
}

interface RegistrationContextProps {
  onBoardingProgress: string | null;
  setOnBoardingProgress: (onboardingprogress: string) => void;
  gender: 'MALE' | 'FEMALE' | undefined;
  setGender: (gender: 'MALE' | 'FEMALE' | undefined) => void;
  name: string | undefined;
  setName: (name: string) => void;
  dateOfBirth: Date | undefined;
  setDateOfBirth: (date: Date) => void;
  postData: () => void;
}

const RegistrationContext = createContext<RegistrationContextProps | undefined>(undefined);

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};

interface RegistrationProviderProps {
  children: ReactNode;
}

export const RegistrationProvider = ({ children }: RegistrationProviderProps) => {
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [[isDataLoading, onBoardingProgress], setOnBoardingProgress] = useStorageState('onBoardingProgress');
  const {setLoading} = useLoading();

  useEffect(() => {
    setLoading(isDataLoading);
  }, [isDataLoading]);

  return (
    <RegistrationContext.Provider 
      value={{ 
        onBoardingProgress,
        setOnBoardingProgress,
        gender,
        setGender,
        name,
        setName,
        dateOfBirth,
        setDateOfBirth,
        postData: () => {
          console.log('Post data');
        }
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};