import React from "react";
import gamesData from "../data/games.json";
import "./Catalog.css";

const Catalog = () => {
  const featured = gamesData.find((g) => g.name === "Don Memo");
  const popular = gamesData.filter((g) => g.name !== "Don Memo" && g.id <= 5);
  const rest = gamesData.filter((g) => g.id > 5);

  return (
    <div className="catalog-container">
      <h2 className="catalog-title">Catálogo de Juegos</h2>

      {/* Sección de juego destacado */}
      <section className="featured-section">
        <h3>Destacado</h3>
        <div className="featured-image">
          <img
            src={`/src/assets/games/${featured.image}`}
            alt={featured.name}
          />
          <div className="featured-overlay">
            <h2>{featured.name}</h2>
            <p>{featured.description}</p>
            <span className="featured-price">
              ₡{featured.price.toLocaleString()}
            </span>
          </div>
        </div>
      </section>

      {/* Sección de populares */}
      <section className="popular-section">
        <h3>Más Populares</h3>
        <div className="catalog-grid popular-grid">
          {popular.map((game) => (
            <div key={game.id} className="game-card">
              <div className="image-wrapper">
                <img
                  src={`/src/assets/games/${game.image}`}
                  alt={game.name}
                  className="game-image"
                />
                <div className="price-tag">₡{game.price.toLocaleString()}</div>
              </div>
              <div className="game-info">
                <h3>{game.name}</h3>
                <p className="developer">{game.developer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección todos los juegos */}
      <section className="all-section">
        <h3>Todos los juegos</h3>
        <div className="catalog-grid">
          {rest.map((game) => (
            <div key={game.id} className="game-card">
              <div className="image-wrapper">
                <img
                  src={`/src/assets/games/${game.image}`}
                  alt={game.name}
                  className="game-image"
                />
                <div className="price-tag">₡{game.price.toLocaleString()}</div>
              </div>
              <div className="game-info">
                <h3>{game.name}</h3>
                <p className="developer">{game.developer}</p>
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
      </section>
      {/* ---------- COMING SOON ---------- */}
      <section className="coming-soon-section">
        <div className="coming-soon-card">
          <div className="coming-soon-content">
            <h3>¡Próximamente más juegos...!</h3>
            <p>
              Mantente atento a nuestro catálogo, ¡se vienen nuevos títulos
              increíbles!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Catalog;
