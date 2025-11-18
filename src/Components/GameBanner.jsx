import React, { useContext } from "react";
import { GameSelectionContext } from "../Context/GameSelectionContext";
import "./GameBanner.css";

export default function GameBanner() {
  const { selectedGame } = useContext(GameSelectionContext);

  if (!selectedGame) {
    return (
      <div className="game-banner placeholder">
        <p>No hay juego seleccionado</p>
      </div>
    );
  }

  return (
    <div className="game-banner">
      <img
        src={`/src/assets/games/${selectedGame.image}`}
        alt={selectedGame.name}
        className="banner-image"
      />
    </div>
  );
}
