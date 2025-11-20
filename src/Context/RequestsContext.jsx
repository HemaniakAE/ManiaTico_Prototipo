import { createContext, useEffect, useState } from "react";
import gamesData from "../data/games.json";

export const RequestsContext = createContext();

export function RequestsProvider({ children }) {
  const [requestedGames, setRequestedGames] = useState([]);

  // Cargar localStorage al iniciar
  useEffect(() => {
    const raw = localStorage.getItem("mt_requests");
    setRequestedGames(raw ? JSON.parse(raw) : []);
  }, []);

  // Agregar juego solicitado
  const addRequestedGame = (game) => {
    setRequestedGames(prev => {
      const updated = [game, ...prev];
      localStorage.setItem("mt_requests", JSON.stringify(updated));
      return updated;
    });
  };

  // Combinar JSON + solicitados
  const allGames = [...gamesData, ...requestedGames];

  return (
    <RequestsContext.Provider
      value={{
        allGames,
        requestedGames,
        addRequestedGame,
      }}
    >
      {children}
    </RequestsContext.Provider>
  );
}

