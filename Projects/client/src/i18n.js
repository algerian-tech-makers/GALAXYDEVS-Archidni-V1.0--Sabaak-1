import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "ar"],
    debug: true,
    fallbackLng: "en",
    detection: {
      order: ["cookie", "localStorage", "htmlTag", "path", "subdomain"],
      caches: ["cookie", "localStorage"],
    },
    backend: {
      //   loadPath: "/client/public/assets/locales/",
      loadPath: "assets/locales/{{lng}}/translation.json",
    },
  });

export default i18n;
