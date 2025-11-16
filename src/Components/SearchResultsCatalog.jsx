// src/Components/SearchResultsCatalog.jsx
import React, { useContext } from "react";
import gamesData from "../data/games.json";
import GameCard from "./GameCard";
import "./SearchResultsCatalog.css";
import { SearchContext } from "../Context/SearchContext";

const SearchResultsCatalog = () => {
  const { finalSearch } = useContext(SearchContext);

  const normalize = (str = "") =>
    String(str)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const matchesByTokens = (name, term) => {
    const nName = normalize(name);
    const nTerm = normalize(term);
    if (!nTerm) return false;
    const nameWords = nName.split(/\s+/);
    const tokens = nTerm.split(/\s+/);
    return tokens.every((token) =>
      nameWords.some((word) => word.startsWith(token))
    );
  };

  const filteredGames = gamesData.filter((g) =>
    matchesByTokens(g.name, finalSearch)
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
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default SearchResultsCatalog;
