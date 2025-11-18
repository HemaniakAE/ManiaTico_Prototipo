import React, { useContext, useState, useEffect } from "react";
import CartContext from "../Context/CartContext";
import { GameSelectionContext } from "../Context/GameSelectionContext";
import { TbShoppingCartHeart, TbShoppingCartCheck } from "react-icons/tb";
import "./AddToCartButton.css";

export default function AddToCartButton() {
  const { selectedGame } = useContext(GameSelectionContext);
  const { items, addItem } = useContext(CartContext);

  const [pulse, setPulse] = useState(false);

  if (!selectedGame) return null;

  // Buscar si el juego ya está en el carrito
  const cartEntry = items.find((it) => it.id === selectedGame.id);
  const qty = cartEntry ? cartEntry.qty : 0;
  const isInCart = qty > 0;

  const handleAdd = () => {
    addItem(selectedGame, 1);
    // Feedback visual breve
    setPulse(true);
    setTimeout(() => setPulse(false), 400);
  };

  return (
    <button
      className={`add-cart-btn ${pulse ? "pulse" : ""}`}
      onClick={handleAdd}
      aria-pressed={isInCart}
      title={isInCart ? `Agregar otra unidad (${qty} en carrito)` : "Añadir al carrito"}
    >
      {isInCart ? (
        <TbShoppingCartCheck className="cart-icon" />
      ) : (
        <TbShoppingCartHeart className="cart-icon" />
      )}

      <span className="btn-text">{isInCart ? "Añadir" : "Añadir al carrito"}</span>

      {isInCart && <span className="qty-pill">{qty}</span>}
    </button>
  );
}
