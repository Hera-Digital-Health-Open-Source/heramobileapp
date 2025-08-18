import i18n from '@/i18n/config';
import { useI18n } from '@/context/I18nContext';

export const useTranslation = () => {
  const { locale } = useI18n(); // Subscribe to locale changes to force re-render
  
  return {
    t: (key: string, config?: any) => i18n.t(key, config),
    locale, // Expose current locale
  };
};