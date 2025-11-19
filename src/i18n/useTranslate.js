import es from "./es.json";
import en from "./en.json";
import { useLanguage } from "../Context/LanguageContext";

export default function useTranslate() {
  const { language } = useLanguage();

  const translations = {
    es,
    en,
  };

  function t(key) {
    return translations[language][key] || key;
  }

  return { t, language };
}
