import React, { createContext, useState, useContext, ReactNode } from 'react';

type LastMenstrualType = {
  date: Date;
  prentalVisitsNumber: number;
}

type PregnancyWeekType = {
  weekNumber: number;
  prentalVisitsNumber: number;
}

interface PregnancyContextProps {
  isPregnant: boolean | undefined;
  setIsPregnant: (isPregnant: boolean) => void;
  lastMenstrualDate: LastMenstrualType | undefined;
  setLastMenstrualDate: (data: LastMenstrualType) => void;
  pregnancyWeek: PregnancyWeekType | undefined;
  setPregnancyWeek: (data: PregnancyWeekType) => void;
  postData: () => void;
}

const PregnancyContext = createContext<PregnancyContextProps | undefined>(undefined);

export const usePregnancy = () => {
  const context = useContext(PregnancyContext);
  if (!context) {
    throw new Error('usePregnancy must be used within a PregnancyProvider');
  }
  return context;
};

interface PregnancyProviderProps {
  children: ReactNode;
}

export const PregnancyProvider = ({ children }: PregnancyProviderProps) => {
  const [isPregnant, setIsPregnant] = useState<boolean | undefined>(undefined);
  const [lastMenstrualDate, setLastMenstrualDate] = useState<LastMenstrualType | undefined>(undefined);
  const [pregnancyWeek, setPregnancyWeek] = useState<PregnancyWeekType | undefined>(undefined);

  return (
    <PregnancyContext.Provider 
      value={{ 
        isPregnant,
        setIsPregnant,
        lastMenstrualDate,
        setLastMenstrualDate,
        pregnancyWeek,
        setPregnancyWeek,
        postData: () => {
          console.log('Post data');
        }
      }}
    >
      {children}
    </PregnancyContext.Provider>
  );
};