import { useLanguage } from "./LanguageContext";
import es from "../i18n/es.json";
import en from "../i18n/en.json";

const dictionaries = { es, en };

// ⬇⬇⬇ Aquí se añade soporte para claves anidadas ⬇⬇⬇
function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : null;
  }, obj);
}

export default function useTranslate() {
  const { language } = useLanguage();
  const dict = dictionaries[language] || dictionaries["es"];

  function t(key) {
    if (!key) return "";
    const value = getNestedValue(dict, key);
    return value !== null ? value : key; // si no existe, retorna la key
  }

  return { t, language };
}
