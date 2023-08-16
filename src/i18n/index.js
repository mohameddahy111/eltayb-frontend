import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './languages/ar.json';
import en from './languages/en.json';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  enUS: {
    translation: en,
  },
  arEG: {
    translation: ar,
  }
};
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.i18nextLn? JSON.parse(localStorage.i18nextLn):'enUS',

    interpolation: {
      escapeValue: false,
    },
    
  });

export default i18n;