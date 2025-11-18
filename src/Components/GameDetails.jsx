import React, { useContext } from "react";
import { GameSelectionContext } from "../Context/GameSelectionContext";
import "./GameDetails.css";

export default function GameDetails() {
  const { selectedGame } = useContext(GameSelectionContext);

  if (!selectedGame) return null;

  return (
    <div className="game-info-card">
      <h1 className="game-title">{selectedGame.name}</h1>

      <div className="tags">
        {selectedGame.categories?.map((cat, index) => (
          <span key={index} className="tag">{cat}</span>
        ))}
      </div>

      <p className="description">{selectedGame.description}</p>

      <div className="game-meta">
        <span>Desarrollador: </span>
        <strong>{selectedGame.developer}</strong>
      </div>
    </div>
  );
}
