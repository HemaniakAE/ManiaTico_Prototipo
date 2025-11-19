import { useLanguage } from "./LanguageContext";
import es from "../i18n/es.json";
import en from "../i18n/en.json";

export function useTranslate() {
  const { language } = useLanguage();

  const translations = language === "es" ? es : en;

  return function t(key) {
    const parts = key.split(".");
    let current = translations;

    for (let part of parts) {
      current = current[part];
      if (!current) return key;
    }

    return current;
  };
}
