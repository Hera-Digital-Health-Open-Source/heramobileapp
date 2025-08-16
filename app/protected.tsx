// src/app/protected.tsx
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Redirect } from 'expo-router';

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { session, userProfile } = useAuthStore();
  const [status, setStatus] = useState<'undetermined' | 'denied' | 'allowed'>('undetermined');

  // useEffect(() => {
  //   if(!preparingProfile && !preparingSession){
  //     if(session && profile){
  //       setStatus('allowed');
  //     } else {
  //       setStatus('denied');
  //     }
  //   }
  // }, [preparingProfile, preparingSession]);

  useEffect(() => {
    if(session && userProfile){
      setStatus('allowed');
    } else {
      setStatus('denied');
    }
  }, [session, userProfile]);

  if (status === 'denied') {
    return <Redirect href="/auth/login" />;
  }

  return <>{children}</>;
};

export default Protected;
