// src/app/protected.tsx
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href="/auth/login" />;
  }

  return <>{children}</>;
};

export default Protected;
