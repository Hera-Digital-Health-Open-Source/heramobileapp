import React from 'react';
import { AuthProvider } from './AuthContext';
import HttpClientProvider from './HttpClientContext';
import { RegistrationProvider } from './RegistrationContext';
import { PregnancyProvider } from './PregnancyContext';
import { LoadingProvider } from './LoadingContext';
import { Auth0Provider } from 'react-native-auth0';


export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Auth0Provider domain={"dev-apc5lc1lhv0fk5hp.us.auth0.com"} clientId={"X6PereqNM4m5SPoT9giirIZHRZsqIwsZ"}>
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
    </Auth0Provider>
  );
};
