import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import backend from 'i18next-http-backend';
import languagedetector from 'i18next-browser-languagedetector';
import resources from './translations';

i18n
    // .use(backend)
    // .use(languagedetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.usrLocale ? localStorage.usrLocale : "en",
        fallbackLng: 'en',
        debug: true,

        keySeparator: false,

        interpolation: {
            escapeValue: false,
        }
    });

    export default i18n;
