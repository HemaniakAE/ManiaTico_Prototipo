import React, { useContext } from "react";
import { GameSelectionContext } from "../Context/GameSelectionContext";
import AddToCartButton from "./AddToCartButton";
import "./GameBanner.css";
import { TbShoppingCartCheck } from "react-icons/tb";

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
        src={`/assets/games/${selectedGame.image}`}
        alt={selectedGame.name}
        className="banner-image"
      />
    </div>
  );
}
