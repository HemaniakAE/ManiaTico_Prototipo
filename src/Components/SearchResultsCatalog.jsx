import React, { useContext } from "react";
import gamesData from "../data/games.json";
import "./SearchResultsCatalog.css";
import { SearchContext } from "../Context/SearchContext";

const SearchResultsCatalog = () => {
  const { finalSearch } = useContext(SearchContext);

  const filteredGames = gamesData.filter((g) =>
    g.name.toLowerCase().includes(finalSearch.toLowerCase())
  );

  return (
    <div className="search-results-catalog-container">
      <h2 className="search-results-catalog-title">
        Resultados de búsqueda: "{finalSearch}"
      </h2>

      {filteredGames.length === 0 ? (
        <p className="no-results-message">
          No se encontraron juegos con "{finalSearch}"
        </p>
      ) : (
        <section className="all-section">
          <div className="search-results-catalog-grid">
            {filteredGames.map((game) => (
              <div key={game.id} className="game-card">
                <div className="image-wrapper">
                  <img
                    src={`/src/assets/games/${game.image}`}
                    alt={game.name}
                    className="game-image"
                  />
                  <div className="price-tag">
                    ₡{game.price.toLocaleString()}
                  </div>
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
      )}
    </div>
  );
};

export default SearchResultsCatalog;
