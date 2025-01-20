import React from 'react';
import { AuthProvider } from './AuthContext';
import HttpClientProvider from './HttpClientContext';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <HttpClientProvider>
      <AuthProvider>{children}</AuthProvider>
    </HttpClientProvider>
  );
};
