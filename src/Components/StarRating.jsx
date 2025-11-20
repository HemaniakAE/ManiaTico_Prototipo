import React, { useEffect, useState } from "react";
import "./StarRating.css";
import { BsStar, BsStarFill } from "react-icons/bs";
import games from "../data/games.json";
import useTranslate from "../Context/useTranslate";

export default function StarRating({ gameId }) {
  const game = games.find((g) => g.id === gameId);
  const rate = game ? game.rate : 0;

  const [rating, setRating] = useState(rate);
  const [hover, setHover] = useState(null);
  const [canRate, setCanRate] = useState(false);
  const { t } = useTranslate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mt_library");
      const library = raw ? JSON.parse(raw) : [];
      const owns = library.some((g) => g.id === gameId);
      setCanRate(owns);
    } catch (e) {
      setCanRate(false);
    }
  }, [gameId]);

  const updateRating = (value) => {
    if (!canRate) return;
    setRating(value);

    try {
      const raw = localStorage.getItem("mt_ratings");
      const ratings = raw ? JSON.parse(raw) : {};
      ratings[gameId] = value;
      localStorage.setItem("mt_ratings", JSON.stringify(ratings));
    } catch (e) {}
  };

  return (
    <div className="rating-container">
      <h2 className="rating-title">{t('starRating.ratings')}</h2>

      <p className="rating-value">
        {t('starRating.gameRating')} <span>{rate.toFixed(1)}</span>/5
      </p>

      <div
        className={`star-rating ${canRate ? "enabled" : "disabled"}`}
        onMouseLeave={() => canRate && setHover(null)}
      >
        {[1, 2, 3, 4, 5].map((value) => {
          const filled = hover ? value <= hover : value <= rating;

          return (
            <span
              key={value}
              className="star"
              onMouseEnter={() => canRate && setHover(value)}
              onClick={() => canRate && updateRating(value)}
            >
              {filled ? <BsStarFill /> : <BsStar />}
            </span>
          );
        })}
      </div>

      {!canRate && (
        <p className="locked-msg">{t('starRating.buyToRate')}</p>
      )}
    </div>
  );
}