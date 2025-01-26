import React from 'react';
import { AuthProvider } from './AuthContext';
import HttpClientProvider from './HttpClientContext';
import { RegistrationProvider } from './RegistrationContext';
import { PregnancyProvider } from './PregnancyContext';
import { LoadingProvider } from './LoadingContext';


export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LoadingProvider>
      <HttpClientProvider>
        <AuthProvider>
          <RegistrationProvider>
            <PregnancyProvider>
              {children}
            </PregnancyProvider>
          </RegistrationProvider>
        </AuthProvider>
      </HttpClientProvider>
    </LoadingProvider>
  );
};
