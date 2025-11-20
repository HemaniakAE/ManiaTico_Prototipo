import React, { useContext } from "react";
import { GameSelectionContext } from "../Context/GameSelectionContext";
import AddToCartButton from "./AddToCartButton";
import "./GameBanner.css";
import { TbShoppingCartCheck } from "react-icons/tb";
import useTranslate from "../Context/useTranslate";

export default function GameBanner() {
  const { selectedGame } = useContext(GameSelectionContext);
  const { t } = useTranslate();

  if (!selectedGame) {
    return (
      <div className="game-banner placeholder">
        <p>{t('gameBanner.noGameSelected')}</p>
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