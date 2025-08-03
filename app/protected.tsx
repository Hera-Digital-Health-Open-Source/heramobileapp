// src/app/protected.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { session, profile, preparingProfile, preparingSession } = useAuth();
  const [status, setStatus] = useState<'undetermined' | 'denied' | 'allowed'>('undetermined');

  useEffect(() => {
    if(!preparingProfile && !preparingSession){
      if(session && profile){
        setStatus('allowed');
      } else {
        setStatus('denied');
      }
    }
  }, [preparingProfile, preparingSession]);
  // useEffect(() => {
  //   if(session && profile){
  //     setStatus('allowed');
  //   } else {
  //     setStatus('denied');
  //   }
  // }, [session, profile]);

  if (status === 'denied') {
    return <Redirect href="/auth/login" />;
  }

  return <>{children}</>;
};

export default Protected;
