import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import gu from './locales/gu.json';
import en from './locales/en.json';
import hi from './locales/hi.json';

export type SupportedLang = 'gu' | 'en' | 'hi';

export const SUPPORTED_LANGS: SupportedLang[] = ['gu', 'en', 'hi'];
export const DEFAULT_LANG: SupportedLang = 'gu';
export const LANG_STORAGE_KEY = 'patel_auto_lang';

export function isSupportedLang(value: string | undefined | null): value is SupportedLang {
  return value === 'gu' || value === 'en' || value === 'hi';
}

export function getInitialLanguage(): SupportedLang {
  if (typeof window !== 'undefined') {
    const pathSegment = window.location.pathname.split('/').filter(Boolean)[0];
    if (isSupportedLang(pathSegment)) {
      return pathSegment;
    }
    try {
      const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
      if (isSupportedLang(saved)) {
        return saved;
      }
    } catch {
      // Ignore storage errors in restricted environments
    }
  }
  return DEFAULT_LANG;
}

const initialLng = getInitialLanguage();

i18n.use(initReactI18next).init({
  resources: {
    gu: { translation: gu },
    en: { translation: en },
    hi: { translation: hi },
  },
  lng: initialLng,
  fallbackLng: DEFAULT_LANG,
  supportedLngs: SUPPORTED_LANGS,
  interpolation: {
    escapeValue: false,
  },
});

if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLng;
}

i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined' && isSupportedLang(lng)) {
    document.documentElement.lang = lng;
  }
  if (typeof window !== 'undefined' && isSupportedLang(lng)) {
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lng);
    } catch {
      // Ignore storage errors
    }
  }
});

export default i18n;
