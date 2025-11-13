import React from "react";
import gamesData from "../data/games.json";
import "./Catalog.css";

const images = import.meta.glob("../assets/games/*", { eager: true, import: "default" });

const Catalog = () => {
  return (
    <div className="catalog-container">
      <h2 className="catalog-title">Catálogo de Juegos</h2>
      <div className="catalog-grid">
        {gamesData.map((game) => (
          <div key={game.id} className="game-card">
            <div className="image-wrapper">
              <img
                src={images[`../assets/games/${game.image}`]}
                alt={game.name}
                className="game-image"
              />
              <span className="price-tag">₡{game.price.toLocaleString()}</span>
            </div>
            <div className="game-info">
              <h3>{game.name}</h3>
              <div className="categories">
                {game.categories.map((cat, i) => (
                  <span key={i} className="category-tag">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
