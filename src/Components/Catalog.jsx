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
            </div>
            <div className="game-info">
              <h3>{game.name}</h3>
              <p className="developer">{game.developer}</p>
              <p className="price">₡{game.price.toLocaleString()}</p>
              <div className="categories">
                {game.categories.map((cat, i) => (
                  <span key={i} className="category-tag">
                    {cat}
                  </span>
                ))}
              </div>
              <p className="description">{game.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
