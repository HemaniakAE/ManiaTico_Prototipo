import { useState, useRef, useEffect } from "react";
import { FaCog, FaQuestionCircle } from "react-icons/fa";
import { useLanguage } from "../Context/LanguageContext";
import "./SettingsPanel.css";

export default function SettingsPanel() {
  const { language, setLanguage } = useLanguage();
  const [openMenu, setOpenMenu] = useState(false);
  const [toast, setToast] = useState(null);

  const menuRef = useRef(null);      // ← referencia al dropdown
  const buttonsRef = useRef(null);   // ← referencia a los botones de settings/help

  const easterEggs = [
    "Desarrollado por Team ManiaTico y Bubblesort",
  ];

  function handleHelp() {
    const random = easterEggs[Math.floor(Math.random() * easterEggs.length)];
    setToast(random);

    setTimeout(() => setToast(null), 2500);
  }

  // ⬇️ Detecta clic fuera y cierra el menú
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        openMenu &&
        menuRef.current &&
        !menuRef.current.contains(e.target) && // clic fuera del menú
        !buttonsRef.current.contains(e.target) // y fuera de los botones
      ) {
        setOpenMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

  return (
    <>
      <div className="settings-panel-fixed" ref={buttonsRef}>
        <button className="settings-btn" onClick={() => setOpenMenu(!openMenu)}>
          <FaCog />
        </button>

        <button className="settings-btn" onClick={handleHelp}>
          <FaQuestionCircle />
        </button>
      </div>

      {openMenu && (
        <div className="settings-dropdown" ref={menuRef}>
          <button
            className={language === "es" ? "lang-option active" : "lang-option"}
            onClick={() => setLanguage("es")}
          >
            🇪🇸 Español
          </button>

          <button
            className={language === "en" ? "lang-option active" : "lang-option"}
            onClick={() => setLanguage("en")}
          >
            🇺🇸 English
          </button>
        </div>
      )}

      {toast && <div className="help-toast">{toast}</div>}
    </>
  );
}
