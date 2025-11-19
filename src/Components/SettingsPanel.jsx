import { useState } from "react";
import { FaCog, FaQuestionCircle } from "react-icons/fa";
import { useLanguage } from "../Context/LanguageContext";
import "./SettingsPanel.css";

export default function SettingsPanel() {
  const { language, setLanguage } = useLanguage();
  console.log("IDIOMA ACTUAL =>", language);

  const [openMenu, setOpenMenu] = useState(false);
  const [toast, setToast] = useState(null);

  // Lista de mensajes emergentes
  const easterEggs = [
    "Segun uno de los creadores, nada le gana al bubblesort",
    
  ];

  function handleHelp() {
    const random = easterEggs[Math.floor(Math.random() * easterEggs.length)];
    setToast(random);

    setTimeout(() => setToast(null), 2500);
  }

  return (
    <>
      <div className="settings-panel-fixed">
        <button
          className="settings-btn"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <FaCog />
        </button>

        <button
          className="settings-btn"
          onClick={handleHelp}
        >
          <FaQuestionCircle />
        </button>
      </div>

      {openMenu && (
        <div className="settings-dropdown">
          <button
            className={
              language === "es" ? "lang-option active" : "lang-option"
            }
            onClick={() => setLanguage("es")}
          >
            🇪🇸 Español
          </button>

          <button
            className={
              language === "en" ? "lang-option active" : "lang-option"
            }
            onClick={() => setLanguage("en")}
          >
            🇺🇸 English
          </button>
        </div>
      )}

      {toast && (
        <div className="help-toast">
          {toast}
        </div>
      )}
    </>
  );
}
