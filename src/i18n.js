import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ru from './locales/ru.json';
import kk from './locales/kk.json';

const resources = {
  en: { translation: en },
  ru: { translation: ru },
  kk: { translation: kk },
};

const savedLang = localStorage.getItem('lang');

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

const setDocumentLang = (lng) => {
  document.documentElement.lang = lng;
};

setDocumentLang(i18n.language);
i18n.on('languageChanged', setDocumentLang);

export default i18n;
