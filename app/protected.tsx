// src/app/protected.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { session, preparingStorageData, profile } = useAuth();
  const [flag, setFlag] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if(!preparingStorageData){
      if(!(session && profile)){
        setFlag(true);
      } else {
        setFlag(false);
      }
    }
  }, [preparingStorageData]);

  if (flag) {
    return <Redirect href="/auth/login" />;
  }

  if(!flag){
    return <>{children}</>;
  }
};

export default Protected;
