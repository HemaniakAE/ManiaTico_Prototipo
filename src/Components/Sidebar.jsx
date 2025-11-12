import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Categorías</h2>
      <ul>
        <li className="category">Acción</li>
        <li className="subcategory">Shooter</li>
        <li className="subcategory">Beat 'em up</li>
        <li className="subcategory">Supervivencia</li>
        <li className="subcategory">Hack and Slash</li>

        <li className="category">Aventura</li>
        <li className="subcategory">Gráfica</li>
        <li className="subcategory">Mundo abierto</li>
        <li className="subcategory">Interactiva</li>

        <li className="category">Deportes</li>
        <li className="subcategory">Fútbol</li>
        <li className="subcategory">Baloncesto</li>
        <li className="subcategory">Carreras</li>
        <li className="subcategory">Skate</li>

        <li className="category">RPG</li>
        <li className="subcategory">Acción RPG</li>
        <li className="subcategory">JRPG</li>
        <li className="subcategory">MMORPG</li>
        <li className="subcategory">Estrategia RPG</li>

        <li className="category">Simulación</li>
        <li className="subcategory">Vida</li>
        <li className="subcategory">Negocios</li>
        <li className="subcategory">Vuelo</li>
        <li className="subcategory">Construcción</li>

        <li className="category">Estrategia</li>
        <li className="subcategory">RTS</li>
        <li className="subcategory">Turnos</li>
        <li className="subcategory">Cartas</li>
        <li className="subcategory">Táctico</li>

        <li className="category">Arcade</li>
        <li className="category">Plataformas</li>
        <li className="category">Música</li>
        <li className="category">Puzles</li>
      </ul>
    </aside>
  );
}

export default Sidebar;
