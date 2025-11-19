import { useLanguage } from "./LanguageContext";
import es from "../i18n/es.json";
import en from "../i18n/en.json";

export default function useTranslate() {
  const { language } = useLanguage();

  const dictionary = {
    es,
    en,
  };

  function t(key) {
    return dictionary[language]?.[key] || key;
  }

  return { t, language };
}
