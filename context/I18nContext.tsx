import React, { createContext, useContext, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import i18n from '@/i18n/config';
import { useStorageState, setStorageItemAsync } from '@/hooks/useStorageState';
import { useLoading } from './LoadingContext';
import RNRestart from 'react-native-restart';
import * as SecureStore from 'expo-secure-store';

const I18N_KEY = 'app_locale';
// The language we last restarted the app for, so a language change restarts the app only once
const RTL_RESTART_KEY = 'rtl_restart_for';
// I18nManager.forceRTL saves to disk in the background; RNRestart kills the app at once,
// so wait this long for the save to finish or the restarted app reads the old direction
const RTL_SAVE_DELAY_MS = 500;

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
    const currentIsRTL = I18nManager.isRTL;

    // Always update i18n locale first
    i18n.locale = lang;
    setLocale(lang);

    // If RTL direction needs to change, we must restart the app
    if (currentIsRTL !== shouldBeRTL) {
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);

      // Already restarted once for this language and the direction still didn't stick:
      // don't restart again (that loops); the direction is fixed on the next launch
      if (await SecureStore.getItemAsync(RTL_RESTART_KEY) === lang) {
        await setStorageItemAsync(RTL_RESTART_KEY, null);
        return;
      }

      await setStorageItemAsync(I18N_KEY, lang);
      await setStorageItemAsync(RTL_RESTART_KEY, lang);
      await new Promise(resolve => setTimeout(resolve, RTL_SAVE_DELAY_MS));
      RNRestart.Restart();
      return;
    }
  };

  return (
    <I18nContext.Provider value={{ locale: locale ? locale : 'en', setAppLanguage }}>
      {!preparingStorageData && (children)}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
