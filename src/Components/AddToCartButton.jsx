import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../Context/CartContext";
import { GameSelectionContext } from "../Context/GameSelectionContext";
import { AuthContext } from "../Context/AuthContext";
import { TbShoppingCartHeart, TbShoppingCartCheck, TbLock } from "react-icons/tb";
import "./AddToCartButton.css";

export default function AddToCartButton() {
  const { selectedGame } = useContext(GameSelectionContext);
  const { items, addItem } = useContext(CartContext);
  const { isLoggedIn, isClient, user } = useContext(AuthContext);
  const navigate = useNavigate();

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

  // Si no está logueado
  if (!isLoggedIn()) {
    return (
      <button
        className="add-cart-btn locked"
        onClick={() => navigate("/auth")}
        title="Inicia sesión para comprar"
      >
        <TbLock className="cart-icon" />
        <span className="btn-text">Inicia sesión</span>
      </button>
    );
  }

  // Si es desarrollador (no puede comprar)
  if (isLoggedIn() && !isClient()) {
    return (
      <button
        className="add-cart-btn disabled"
        disabled
        title="Los desarrolladores no pueden comprar juegos"
      >
        <TbLock className="cart-icon" />
        <span className="btn-text">Desarrolladores no pueden comprar</span>
      </button>
    );
  }

  // Usuario cliente normal
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
            ? `Agregar otra copia (${qty} en carrito)`
            : "Ya lo compraste — agregar copia adicional"
          : isInCart
          ? `Agregar otra unidad (${qty} en carrito)`
          : "Añadir al carrito"
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
        {owned ? (isInCart ? "Añadir copia" : "Comprado") : isInCart ? "Añadir" : "Añadir al carrito"}
      </span>

      {isInCart && <span className="qty-pill">{qty}</span>}
    </button>
  );
}