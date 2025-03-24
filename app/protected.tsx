// src/app/protected.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { session, preparingStorageData } = useAuth();
  const [flag, setFlag] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if(!preparingStorageData){
      setFlag(!session)
    }
  }, [preparingStorageData]);

  // if (!session) {
  //   return <Redirect href="/auth/login" />;
  // }

  if (flag) {
    return <Redirect href="/auth/login" />;
  }

  if(!flag){
    return <>{children}</>;
  }
};

export default Protected;
