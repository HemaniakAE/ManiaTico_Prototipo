// src/Components/SearchResultsCatalog.jsx
import React, { useContext } from "react";
import gamesData from "../data/games.json";
import GameCard from "./GameCard";
import "./SearchResultsCatalog.css";
import { SearchContext } from "../Context/SearchContext";
import useTranslate from "../Context/useTranslate";

const SearchResultsCatalog = () => {
  const { finalSearch } = useContext(SearchContext);
  const { t } = useTranslate();

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

  // 🔥 Ahora busca por nombre Y por categorías
  const filteredGames = gamesData.filter((g) => {
  const search = normalize(finalSearch);
  if (!search) return false;

  // Filtrado por nombre (tokens)
  const matchName = matchesByTokens(g.name, search);

  // Filtrado por categoría (solo si el término es suficientemente largo)
  const matchCategory =
    search.length >= 3 &&
    g.categories.some((cat) => normalize(cat).startsWith(search));

  return matchName || matchCategory;
});


  return (
    <div className="search-results-catalog-container">
      <h2 className="search-results-catalog-title">
        {t('searchResults.title')} "{finalSearch}"
      </h2>

      {filteredGames.length === 0 ? (
        <p className="no-results-message">
          {t('searchResults.noResults')} "{finalSearch}"
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