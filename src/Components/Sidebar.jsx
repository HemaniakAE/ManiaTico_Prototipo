import React, { useState } from "react";
import "./Sidebar.css";

const categories = {
  "Acción": ["Acción","Shooter", "Beat 'em up", "Supervivencia", "Hack and Slash"],
  "Aventura": ["Aventura", "Gráfica", "Mundo abierto", "Interactiva"],
  "Deportes": ["Deportes","Fútbol", "Baloncesto", "Carreras", "Skate"],
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

  return (
    <aside className="sidebar">
      <h2>Categorías</h2>

      <ul>
        {Object.keys(categories).map((cat) => (
          <li key={cat}>
            <div
              className="category"
              onClick={() => setOpen(open === cat ? null : cat)}
            >
              {cat} {categories[cat].length > 0}
            </div>

            {open === cat && (
              <ul>
                {categories[cat].map((sub) => (
                  <li className="subcategory" key={sub}>
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
