import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import vn from '@/locales/vn.json';

export default createI18n({
  locale: 'en', // standard locale
  fallbackLocale: 'en', // prevent return empty page when not match a lacale
  messages: {
    en,
    vn,
  },
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD',
      },
    },
    vn: {
      currency: {
        style: 'currency',
        currency: 'VND',
      },
    },
  },
});
