import i18n from '@/i18n/config';

export const useTranslation = () => {
  return {
    t: (key: string, config?: any) => i18n.t(key, config),
  };
};