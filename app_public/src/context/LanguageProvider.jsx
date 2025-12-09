// src/contexts/LanguageProvider.jsx
import { createContext, useContext, useState, useEffect } from "react";
import translations from "../data/translations";


const LanguageContext = createContext();

export default function LanguageProvider({ children }) {
  // idioma por defecto: inglés
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "es" : "en"));
  };

  const t = (key) => {
    return translations[lang]?.[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
