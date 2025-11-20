import React, { useState, useContext } from "react";
import "./Sidebar.css";
import { SearchContext } from "../Context/SearchContext";
import { useNavigate } from "react-router-dom";
import useTranslate from "../Context/useTranslate";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Sidebar() {
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setFinalSearch } = useContext(SearchContext);
  const navigate = useNavigate();
  const { t } = useTranslate();

  const categories = {
    action: ["action", "shooter", "beat", "survival", "hack"],
    adventure: ["adventure", "graphic", "openworld", "interactive"],
    sports: ["sports", "football", "basketball", "racing", "skate"],
    rpg: ["rpg", "actionrpg", "jrpg", "mmorpg", "strategyrpg"],
    simulation: ["simulation", "life", "business", "flight", "builder"],
    strategy: ["strategy", "rts", "turns", "cards", "tactical"],
    arcade: ["arcade"],
    platforms: ["platforms"],
    music: ["music"],
    puzzles: ["puzzles"],
    dlc: ["dlc"],
  };

  const normalize = (str = "") =>
    String(str)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const handleSelectCategory = (translationKey) => {
    const translatedText = t(translationKey);
    const cleaned = normalize(translatedText);
    setFinalSearch(cleaned);
    navigate("/search");
    setMobileOpen(false); // cerrar sidebar en móvil
  };

  const handleCategoryClick = (catKey) => {
    setOpen(open === catKey ? null : catKey);
    handleSelectCategory(catKey);
  };

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {mobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay */}
      <div
        className={`sidebar-overlay ${mobileOpen ? "active" : ""}`}
        onClick={closeMobileMenu}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <h2>{t("categories")}</h2>

        <ul>
          {Object.keys(categories).map((catKey) => (
            <li key={catKey}>
              <div
                className={`category ${open === catKey ? "active" : ""}`}
                onClick={() => handleCategoryClick(catKey)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleCategoryClick(catKey);
                  }
                }}
              >
                {t(catKey)}
              </div>

              {open === catKey && categories[catKey].length > 0 && (
                <div className="subcategory-container">
                  <ul>
                    {categories[catKey].map((subKey) => (
                      <li
                        className="subcategory"
                        key={subKey}
                        onClick={() => handleSelectCategory(subKey)}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleSelectCategory(subKey);
                          }
                        }}
                      >
                        {t(subKey)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
