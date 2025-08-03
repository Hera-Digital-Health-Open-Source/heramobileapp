import React, { createContext, useContext, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import i18n from '@/i18n/config';
import { useStorageState } from '@/hooks/useStorageState';
import { useLoading } from './LoadingContext';
import RNRestart from 'react-native-restart';

const I18N_KEY = 'app_locale';

interface I18nContextType {
  locale: string;
  setAppLanguage: (lang: 'en' | 'ar' | 'tr') => Promise<void>;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  setAppLanguage: async () => {},
});

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [[preparingStorageData, locale], setLocale] = useStorageState(I18N_KEY); 
  const {setLoading} = useLoading();

  useEffect(() => {
    setLoading(preparingStorageData);
    if(!preparingStorageData){
      const currentLocale = locale ? locale as 'en' | 'ar' | 'tr' : 'en';
      setAppLanguage(currentLocale).catch(err => `Locale Error: ${console.log(err)}`);
    }
  }, [preparingStorageData]);

  const setAppLanguage = async (lang: 'en' | 'ar' | 'tr') => {
    const shouldBeRTL = lang === 'ar';

    if (I18nManager.isRTL !== shouldBeRTL) {
      // Change layout direction and reload app
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
      i18n.locale = lang;
      setLocale(lang);
      RNRestart.Restart();
      return;
    }
  
    // Otherwise just change the language normally
    i18n.locale = lang;
    setLocale(lang);
  };

  return (
    <I18nContext.Provider value={{ locale: locale ? locale : 'en', setAppLanguage }}>
      {!preparingStorageData && (children)}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
