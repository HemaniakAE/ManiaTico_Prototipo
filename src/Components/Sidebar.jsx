import React, { useState } from "react";
import "./Sidebar.css";
import useTranslate from "../Context/useTranslate";

const categories = {
  "action": ["action", "shooter", "beat", "survival", "hack"],
  "adventure": ["adventure", "graphic", "openworld", "interactive"],
  "sports": ["sports", "football", "basketball", "racing", "skate"],
  "rpg": ["rpg", "actionrpg", "jrpg", "mmorpg", "strategyrpg"],
  "simulation": ["simulation", "life", "business", "flight", "builder"],
  "strategy": ["strategy", "rts", "turns", "cards", "tactical"],
  "arcade": ["arcade"],
  "platforms": ["platforms"],
  "music": ["music"],
  "puzzles": ["puzzles"],
  "dlc": ["dlc"],
};

export default function Sidebar() {
  const [open, setOpen] = useState(null);
  const { t } = useTranslate();

  return (
    <aside className="sidebar">
      <h2>{t('categories')}</h2>

      <ul>
        {Object.keys(categories).map((catKey) => (
          <li key={catKey}>
            <div
              className="category"
              onClick={() => setOpen(open === catKey ? null : catKey)}
            >
              {t(catKey)}
              {categories[catKey].length > 0}
            </div>

            {open === catKey && (
              <ul>
                {categories[catKey].map((subKey) => (
                  <li className="subcategory" key={subKey}>
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