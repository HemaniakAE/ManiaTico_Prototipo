import React, { useContext, useState, useEffect } from "react";
import CartContext from "../Context/CartContext";
import { GameSelectionContext } from "../Context/GameSelectionContext";
import { TbShoppingCartHeart, TbShoppingCartCheck } from "react-icons/tb";
import "./AddToCartButton.css";
import useTranslate from "../Context/useTranslate";

export default function AddToCartButton() {
  const { selectedGame } = useContext(GameSelectionContext);
  const { items, addItem } = useContext(CartContext);
  const { t } = useTranslate();

  const [pulse, setPulse] = useState(false);
  const [owned, setOwned] = useState(false);

  // Verificar si el juego ya fue comprado
  useEffect(() => {
    try {
      const raw = localStorage.getItem("mt_library");
      const library = raw ? JSON.parse(raw) : [];
      const hasGame = library.some((g) => g.id === selectedGame.id);
      setOwned(hasGame);
    } catch {
      setOwned(false);
    }
  }, [selectedGame]);

  if (!selectedGame) return null;

  const cartEntry = items.find((it) => it.id === selectedGame.id);
  const qty = cartEntry ? cartEntry.qty : 0;
  const isInCart = qty > 0;

  const handleAdd = () => {
    addItem(selectedGame, 1);
    setPulse(true);
    setTimeout(() => setPulse(false), 400);
  };

  return (
    <button
      className={`add-cart-btn ${pulse ? "pulse" : ""}`}
      onClick={handleAdd}
      aria-pressed={isInCart}
      title={
        owned
          ? isInCart
            ? `${t('cartButton.addAnotherCopy')} (${qty} ${t('cartButton.inCart')})`
            : t('cartButton.alreadyPurchased')
          : isInCart
          ? `${t('cartButton.addAnotherUnit')} (${qty} ${t('cartButton.inCart')})`
          : t('cartButton.addToCart')
      }
    >
      {owned ? (
        <TbShoppingCartCheck className="cart-icon" />
      ) : isInCart ? (
        <TbShoppingCartCheck className="cart-icon" />
      ) : (
        <TbShoppingCartHeart className="cart-icon" />
      )}

      <span className="btn-text">
        {owned ? (isInCart ? t('cartButton.addCopy') : t('cartButton.purchased')) : isInCart ? t('cartButton.add') : t('cartButton.addToCart')}
      </span>

      {isInCart && <span className="qty-pill">{qty}</span>}
    </button>
  );
}