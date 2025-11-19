import React, { useState, useContext } from "react";
import "./Sidebar.css";
import { SearchContext } from "../Context/SearchContext";
import { useNavigate } from "react-router-dom";
import useTranslate from "../Context/useTranslate";

export default function Sidebar() {
  const [open, setOpen] = useState(null);
  const { setFinalSearch } = useContext(SearchContext);
  const navigate = useNavigate();
  const { t } = useTranslate();

  // Definir categorías usando las keys de traducción
  const categories = {
    action: ["action", "shooter", "beat", "survival", "hack"],
    adventure: ["adventure", "graphic", "openworld", "interactive"],
    sports: ["sports", "football", "basketball", "racing", "skate"],
    rpg: ["rpg", "actionrpg", "jrpg", "mmorpg", "strategyrpg"],
    simulation: ["simulation", "life", "business", "flight", "builder"],
    strategy: ["strategy", "rts", "turns", "cards", "tactical"],
    arcade: [],
    platforms: [],
    music: [],
    puzzles: [],
    dlc: [],
  };

  const normalize = (str = "") =>
    String(str)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const handleSelectCategory = (translationKey) => {
    // Obtener el texto traducido y normalizarlo
    const translatedText = t(translationKey);
    const cleaned = normalize(translatedText);
    setFinalSearch(cleaned);
    navigate("/search");
  };

  return (
    <aside className="sidebar">
      <h2>{t("categories")}</h2>

      <ul>
        {Object.keys(categories).map((catKey) => (
          <li key={catKey}>
            <div
              className="category"
              onClick={() => {
                setOpen(open === catKey ? null : catKey);
                handleSelectCategory(catKey);
              }}
            >
              {t(catKey)}
            </div>

            {open === catKey && categories[catKey].length > 0 && (
              <ul>
                {categories[catKey].map((subKey) => (
                  <li
                    className="subcategory"
                    key={subKey}
                    onClick={() => handleSelectCategory(subKey)}
                  >
                    {t(subKey)}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}