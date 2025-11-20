// src/Components/GameCard.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./GameCard.css";
import { GameSelectionContext } from "../Context/GameSelectionContext";
import useTranslate from "../Context/useTranslate";

export default function GameCard({ game, variant = "default", onClick }) {
    const navigate = useNavigate();
    const { setSelectedGame } = useContext(GameSelectionContext);
    const { t } = useTranslate();
    
    const gameCardClick = () => {
        setSelectedGame(game);
        navigate("/gameview");
    }

  return (
    <div
      className={`game-card ${variant === "featured" ? "featured-card" : ""}`}
      onClick={gameCardClick}
    >
      <div className="image-wrapper">
        <img
          src={`/assets/games/${game.image}`}
          alt={game.name}
          className="game-image"
        />

        {variant !== "featured" && (
          <div className="price-tag">₡{game.price.toLocaleString()}</div>
        )}
      </div>

      <div className="game-info">
        <h3>{game.name}</h3>

        {variant !== "featured" && (
          <p className="developer">{game.developer}</p>
        )}

        <div className="categories">
          {game.categories?.map((cat, i) => (
            <span key={i} className="category-tag">
              {t(cat)}
            </span>
          ))}
        </div>

        {variant === "featured" && (
          <span className="featured-price">
            ₡{game.price.toLocaleString()}
          </span>
        )}
      </div>

      {variant === "featured" && (
        <div className="featured-overlay">
          <p className="featured-description">{t(`gameDescriptions.${game.id}`)}</p>
        </div>
      )}
    </div>
  );
}