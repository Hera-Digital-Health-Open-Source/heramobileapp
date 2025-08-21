import React from 'react';
import HttpClientProvider from './HttpClientContext';
import { RegistrationProvider } from './RegistrationContext';
import { PregnancyProvider } from './PregnancyContext';
import { LoadingProvider } from './LoadingContext';
import { Auth0Provider } from 'react-native-auth0';
import { I18nProvider } from './I18nContext';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Auth0Provider domain={"heradigitalhealth.eu.auth0.com"} clientId={"ZQyw1Cm4ht1Gpccd7aA12LgeIdfMGF99"}>
      <LoadingProvider>
        <I18nProvider>
            <HttpClientProvider>
              {/* <AuthProvider> */}
                <RegistrationProvider>
                  <PregnancyProvider>
                    {children}
                  </PregnancyProvider>
                </RegistrationProvider>
              {/* </AuthProvider> */}
            </HttpClientProvider>
        </I18nProvider>
      </LoadingProvider>
    </Auth0Provider>
  );
};
