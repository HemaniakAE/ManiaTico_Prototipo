import React, { useEffect, useState } from "react";
import "./StarRating.css";
import { BsStar, BsStarFill } from "react-icons/bs";

export default function StarRating({ gameId, initialRating = 0 }) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(null);
  const [canRate, setCanRate] = useState(false);

  // Verificar si el usuario posee el juego
  useEffect(() => {
    try {
      const raw = localStorage.getItem("mt_library");
      const library = raw ? JSON.parse(raw) : [];

      const owns = library.some((g) => g.id === gameId);
      setCanRate(owns);

      // Cargar rating previo del usuario
      const rawRatings = localStorage.getItem("mt_ratings");
      const userRatings = rawRatings ? JSON.parse(rawRatings) : {};

      if (userRatings[gameId]) {
        setRating(userRatings[gameId]);
      }
    } catch (e) {
      console.warn(e);
    }
  }, [gameId]);

  // Guardar rating
  const updateRating = (value) => {
    if (!canRate) return;

    setRating(value);

    try {
      const raw = localStorage.getItem("mt_ratings");
      const ratings = raw ? JSON.parse(raw) : {};

      ratings[gameId] = value;
      localStorage.setItem("mt_ratings", JSON.stringify(ratings));
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="rating-container">
      <h2 className="rating-title">Calificaciones</h2>

      <p className="rating-value">
        Calificación del juego: <span>{rating.toFixed(1)}</span>/5
      </p>

      <div
        className={`star-rating ${canRate ? "enabled" : "disabled"}`}
        onMouseLeave={() => canRate && setHover(null)} // ← limpieza suave
      >
        {[1, 2, 3, 4, 5].map((value) => {
          const filled = hover ? value <= hover : value <= rating;

          return (
            <span
              key={value}
              className="star"
              onMouseEnter={() => canRate && setHover(value)} // ← solo esto
              onClick={() => updateRating(value)}
            >
              {filled ? <BsStarFill /> : <BsStar />}
            </span>
          );
        })}
      </div>

      {!canRate && (
        <p className="locked-msg">Compra el juego para poder calificarlo</p>
      )}
    </div>
  );
}
