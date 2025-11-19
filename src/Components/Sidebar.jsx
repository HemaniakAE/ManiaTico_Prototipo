import React, { useState, useContext } from "react";
import "./Sidebar.css";
import { SearchContext } from "../Context/SearchContext";
import { useNavigate } from "react-router-dom";

const categories = {
  "Acción": ["Acción", "Shooter", "Beat 'em up", "Supervivencia", "Hack and Slash"],
  "Aventura": ["Aventura", "Gráfica", "Mundo abierto", "Interactiva"],
  "Deportes": ["Deportes", "Fútbol", "Baloncesto", "Carreras", "Skate"],
  "RPG": ["RPG", "Acción RPG", "JRPG", "MMORPG", "Estrategia RPG"],
  "Simulación": ["Simulación", "Vida", "Negocios", "Vuelo", "Construcción"],
  "Estrategia": ["Estrategia", "RTS", "Turnos", "Cartas", "Táctico"],
  "Arcade": [],
  "Plataformas": [],
  "Música": [],
  "Puzles": [],
  "DLC´s": [],
};

export default function Sidebar() {
  const [open, setOpen] = useState(null);
  const { setFinalSearch } = useContext(SearchContext);
  const navigate = useNavigate();

  const normalize = (str = "") =>
    String(str)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const handleSelectCategory = (value) => {
    const cleaned = normalize(value);
    setFinalSearch(cleaned);
    navigate("/search");
  };

  return (
    <aside className="sidebar">
      <h2>Categorías</h2>

      <ul>
        {Object.keys(categories).map((cat) => (
          <li key={cat}>
            <div
              className="category"
              onClick={() => {
                setOpen(open === cat ? null : cat);
                handleSelectCategory(cat); // ← buscar por categoría
              }}
            >
              {cat}
            </div>

            {open === cat && (
              <ul>
                {categories[cat].map((sub) => (
                  <li
                    className="subcategory"
                    key={sub}
                    onClick={() => handleSelectCategory(sub)} // ← buscar por subcategoría
                  >
                    {sub}
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
