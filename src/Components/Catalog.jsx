import React, { useContext } from "react";
import gamesData from "../data/games.json";
import GameCard from "./GameCard";
import "./Catalog.css";

const Catalog = () => {
  const featured = gamesData.find((g) => g.name === "Spirits of Irazú");
  const popular = gamesData.filter((g) => g.id <= 5 && g.name !== featured.name);
  const rest = gamesData.filter((g) => g.id > 5);

  return (
    <div className="catalog-container">
      <h2 className="catalog-title">Catálogo de Juegos</h2>

      {/* Featured */}
      <section className="featured-section">
        <h3>Destacado</h3>
        <GameCard game={featured} variant="featured" />
      </section>

      {/* Populares */}
      <section className="popular-section">
        <h3>Más Populares</h3>
        <div className="catalog-grid popular-grid">
          {popular.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Todos los juegos */}
      <section className="all-section">
        <h3>Todos los juegos</h3>
        <div className="catalog-grid">
          {rest.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Coming soon */}
      <section className="coming-soon-section">
        <div className="coming-soon-card">
          <div className="coming-soon-content">
            <h3>¡Próximamente más juegos...!</h3>
            <p>¡Se vienen nuevos títulos increíbles!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Catalog;
