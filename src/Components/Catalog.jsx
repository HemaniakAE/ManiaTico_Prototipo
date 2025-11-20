import React from "react";
import gamesData from "../data/games.json";
import GameCard from "./GameCard";
import "./Catalog.css";
import useTranslate from "../Context/useTranslate";

const Catalog = () => {
  const { t } = useTranslate();
  const featured = gamesData.find((g) => g.name === "Spirits of Irazú");
  const popular = gamesData.filter((g) => g.id <= 5 && g.name !== featured?.name);
  const rest = gamesData.filter((g) => g.id > 5);

  return (
    <div className="catalog-container">
      <h2 className="catalog-title">{t('catalogTitle')}</h2>

      {/* Featured */}
      <section className="featured-section">
        <h3>{t('featured')}</h3>
        <GameCard game={featured} variant="featured" />
      </section>

      {/* Populares */}
      <section className="popular-section">
        <h3>{t('popular')}</h3>
        <div className="catalog-grid popular-grid">
          {popular.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Todos los juegos */}
      <section className="all-section">
        <h3>{t('allGames')}</h3>
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
            <h3>{t('comingSoon')}</h3>
            <p>{t('newTitles')}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Catalog;