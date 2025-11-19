import { useLanguage } from "./LanguageContext";
import es from "../i18n/es.json";
import en from "../i18n/en.json";

const translations = { es, en };

export default function useTranslate() {
  const { language } = useLanguage();

  function t(key) {
    return translations[language][key] || key;
  }

  return { t, language };
}
